import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function checkAuth(req: Request): boolean {
  const auth = req.headers.get("Authorization") ?? "";
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { orderId, status, trackingNumber } = await req.json();

    const supabase = supabaseAdmin();

    // Récupérer la commande avant mise à jour
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    // Mettre à jour la commande
    const updates: Record<string, string> = { status };
    if (trackingNumber) updates.tracking_number = trackingNumber;

    await supabase.from("orders").update(updates).eq("id", orderId);

    // Envoyer email si passage en statut "expédiée"
    const wasShipped = order.status !== "expediee" && status === "expediee";
    if (wasShipped && order.shipping_address?.email && trackingNumber) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Elekka <contact@elekka-sellier.fr>",
        replyTo: "elekka.sellier@gmail.com",
        to: order.shipping_address.email,
        subject: `Votre commande ${order.order_number} est expédiée`,
        html: shippingEmail({
          orderNumber: order.order_number,
          firstName: order.shipping_address.firstName,
          trackingNumber,
          address: order.shipping_address,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function shippingEmail({ orderNumber, firstName, trackingNumber, address }: {
  orderNumber: string; firstName: string; trackingNumber: string;
  address: { line1: string; line2?: string; postalCode: string; city: string; country: string };
}) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Votre commande est en route</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Votre commande est expédiée.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px">Bonjour ${firstName}, votre commande ${orderNumber} est en chemin.</p>

      <div style="background:#f2f1ef;padding:24px;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 10px">Numéro de suivi</p>
        <p style="font-size:20px;font-weight:700;font-family:monospace;margin:0">${trackingNumber}</p>
      </div>

      <div style="margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 10px">Adresse de livraison</p>
        <p style="font-size:14px;line-height:1.7;margin:0;color:#737373">
          ${address.line1}${address.line2 ? "<br>" + address.line2 : ""}<br>
          ${address.postalCode} ${address.city}<br>
          ${address.country}
        </p>
      </div>

      <p style="font-size:14px;color:#737373;line-height:1.7;margin:0">
        Pour toute question : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>`;
}
