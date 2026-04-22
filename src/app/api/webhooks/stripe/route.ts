import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, items: itemsJson, shippingAddress: addressJson, customerEmail } =
      session.metadata ?? {};

    const items = JSON.parse(itemsJson ?? "[]");
    const address = JSON.parse(addressJson ?? "{}");
    const totalEUR = (session.amount_total ?? 0) / 100;

    // Créer la commande dans Supabase si l'utilisateur est connecté
    if (userId) {
      const supabase = supabaseAdmin();
      await supabase.from("orders").insert({
        user_id: userId,
        status: "en_preparation",
        total_eur: totalEUR,
        shipping_address: address,
        items: items.map((i: {
          slug: string; name: string; colourLabel: string;
          size: string; quantity: number; priceEUR: number;
        }) => ({
          slug: i.slug,
          name: i.name,
          colourLabel: i.colourLabel,
          size: i.size,
          qty: i.quantity,
          priceEUR: i.priceEUR,
        })),
      });
    }

    // Email de confirmation au client
    if (customerEmail) {
      await resend.emails.send({
        from: "Elekka <onboarding@resend.dev>",
        to: customerEmail,
        subject: "Votre commande Elekka est confirmée",
        html: confirmationEmail({ items, address, totalEUR }),
      });
    }

    // Notification interne
    await resend.emails.send({
      from: "Elekka Boutique <onboarding@resend.dev>",
      to: "elekka.sellier@gmail.com",
      replyTo: customerEmail ?? undefined,
      subject: `Nouvelle commande — ${address.firstName} ${address.lastName} — ${totalEUR.toFixed(0)} €`,
      html: notificationEmail({ items, address, totalEUR, customerEmail: customerEmail ?? "" }),
    });
  }

  return NextResponse.json({ received: true });
}

// ── Templates email ───────────────────────────────────────────────────────────

type Item = { name: string; colourLabel: string; size: string; quantity: number; priceEUR: number };
type Address = {
  firstName: string; lastName: string; line1: string;
  line2?: string; city: string; postalCode: string; country: string;
};

function confirmationEmail({ items, address, totalEUR }: { items: Item[]; address: Address; totalEUR: number }) {
  const rows = items.map((i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-size:14px;line-height:1.5">
        ${i.name}<br>
        <span style="font-size:12px;color:#737373">${i.colourLabel} · Taille ${i.size} · Qté ${i.quantity}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-size:14px;text-align:right;font-family:monospace">
        ${(i.priceEUR * i.quantity).toFixed(0)} €
      </td>
    </tr>`).join("");

  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Confirmation de commande</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Merci pour votre commande.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px">Bonjour ${address.firstName}, votre commande est confirmée et en cours de préparation.</p>

      <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 12px">Articles commandés</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        ${rows}
        <tr>
          <td style="padding:16px 0 0;font-size:14px;font-weight:700">Total</td>
          <td style="padding:16px 0 0;font-size:14px;font-weight:700;text-align:right;font-family:monospace">${totalEUR.toFixed(0)} €</td>
        </tr>
      </table>

      <div style="background:#f2f1ef;padding:20px;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 10px">Adresse de livraison</p>
        <p style="font-size:14px;line-height:1.7;margin:0">
          ${address.firstName} ${address.lastName}<br>
          ${address.line1}${address.line2 ? "<br>" + address.line2 : ""}<br>
          ${address.postalCode} ${address.city}<br>
          ${address.country}
        </p>
      </div>

      <p style="font-size:14px;color:#737373;line-height:1.7;margin:0">
        Vous recevrez un email avec votre numéro de suivi dès l'expédition.<br>
        Pour toute question : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>`;
}

function notificationEmail({ items, address, totalEUR, customerEmail }: {
  items: Item[]; address: Address; totalEUR: number; customerEmail: string;
}) {
  const rows = items.map((i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px">
        ${i.name} — ${i.colourLabel} · ${i.size} · ×${i.quantity}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;text-align:right;font-family:monospace">
        ${(i.priceEUR * i.quantity).toFixed(0)} €
      </td>
    </tr>`).join("");

  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Nouvelle commande</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:20px;font-weight:700;margin:0 0 24px">${address.firstName} ${address.lastName} — ${totalEUR.toFixed(0)} €</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">${rows}</table>
      <div style="margin-bottom:20px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 8px">Livraison</p>
        <p style="font-size:14px;line-height:1.7;margin:0">
          ${address.firstName} ${address.lastName}<br>
          ${address.line1}${address.line2 ? "<br>" + address.line2 : ""}<br>
          ${address.postalCode} ${address.city}, ${address.country}
        </p>
      </div>
      <div style="margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 8px">Contact client</p>
        <p style="font-size:14px;margin:0"><a href="mailto:${customerEmail}" style="color:#0a0a0a">${customerEmail}</a></p>
      </div>
      <a href="mailto:${customerEmail}" style="display:inline-block;background:#0a0a0a;color:#fafaf9;text-decoration:none;padding:14px 28px;font-size:13px;letter-spacing:.05em">
        Répondre au client
      </a>
    </div>
  </div>`;
}
