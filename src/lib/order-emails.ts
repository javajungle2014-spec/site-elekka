import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export type OrderItem = {
  slug: string; name: string; colourLabel: string;
  size: string; quantity: number; priceEUR: number;
};

export type OrderAddress = {
  firstName: string; lastName: string; email: string; phone?: string;
  line1: string; line2?: string; city: string; postalCode: string; country: string;
};

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function createOrderAndGetNumber({
  userId, items, address, totalEUR, referralCode,
}: {
  userId: string | null;
  items: OrderItem[];
  address: OrderAddress;
  totalEUR: number;
  referralCode?: string | null;
}): Promise<string> {
  const supabase = supabaseAdmin();

  const { data } = await supabase
    .from("orders")
    .insert({
      user_id: userId ?? null,
      status: "en_preparation",
      total_eur: totalEUR,
      shipping_address: address,
      items: items.map((i) => ({
        slug: i.slug, name: i.name, colourLabel: i.colourLabel,
        size: i.size, qty: i.quantity, priceEUR: i.priceEUR,
      })),
    })
    .select("id")
    .single();

  const orderNumber = data ? `ELK-${data.id + 79}` : `ELK-${80 + Math.floor(Math.random() * 9)}`;

  if (data) {
    await supabase.from("orders").update({ order_number: orderNumber }).eq("id", data.id);
  }

  // Récompenser le parrain si applicable
  if (referralCode && data) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace("http://localhost:3000", "https://elekka-sellier.fr") ?? "https://elekka-sellier.fr";
    fetch(`${siteUrl}/api/referral/reward`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referralCode, orderId: data.id }),
    }).catch(() => {});
    // Supprimer le code de parrainage utilisé côté client se fait dans le checkout
  }

  // Déduire le stock automatiquement
  for (const item of items) {
    const { data: model } = await supabase
      .from("stock_models")
      .select("id")
      .eq("slug", item.slug)
      .single();
    if (model) {
      await supabase.rpc("deduct_stock", {
        p_model_id: model.id,
        p_colour: item.colourLabel,
        p_size: item.size,
        p_qty: item.quantity,
      });
    }
  }

  return orderNumber;
}

export async function incrementPromoUsage(code: string) {
  if (!code) return;
  const supabase = supabaseAdmin();
  await supabase.rpc("increment_promo_usage", { promo_code: code });
}

export async function sendOrderEmails({
  orderNumber, items, address, totalEUR,
}: {
  orderNumber: string;
  items: OrderItem[];
  address: OrderAddress;
  totalEUR: number;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await Promise.all([
    resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: address.email,
      subject: `Commande ${orderNumber} confirmée — Elekka`,
      html: confirmationEmail({ orderNumber, items, address, totalEUR }),
    }),
    resend.emails.send({
      from: "Elekka Boutique <contact@elekka-sellier.fr>",
      to: "elekka.sellier@gmail.com",
      replyTo: address.email,
      subject: `Nouvelle commande ${orderNumber} — ${address.firstName} ${address.lastName} — ${totalEUR.toFixed(0)} €`,
      html: notificationEmail({ orderNumber, items, address, totalEUR }),
    }),
  ]);
}

// ── Templates ─────────────────────────────────────────────────────────────────

function confirmationEmail({ orderNumber, items, address, totalEUR }: {
  orderNumber: string; items: OrderItem[]; address: OrderAddress; totalEUR: number;
}) {
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
      <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 6px">Numéro de commande</p>
      <p style="font-size:20px;font-weight:700;font-family:monospace;margin:0 0 32px">${orderNumber}</p>

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
        Pour toute question, mentionnez le numéro <strong>${orderNumber}</strong> : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>`;
}

function notificationEmail({ orderNumber, items, address, totalEUR }: {
  orderNumber: string; items: OrderItem[]; address: OrderAddress; totalEUR: number;
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
      <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 6px">Numéro de commande</p>
      <p style="font-size:20px;font-weight:700;font-family:monospace;margin:0 0 24px">${orderNumber}</p>

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
        <p style="font-size:14px;margin:0"><a href="mailto:${address.email}" style="color:#0a0a0a">${address.email}</a></p>
      </div>

      <a href="mailto:${address.email}" style="display:inline-block;background:#0a0a0a;color:#fafaf9;text-decoration:none;padding:14px 28px;font-size:13px;letter-spacing:.05em">
        Répondre au client
      </a>
    </div>
  </div>`;
}
