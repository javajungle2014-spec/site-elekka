import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { alertAdmin } from "@/lib/alert";

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
    const { orderId, status, trackingNumber, carrier } = await req.json();

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
    const updates: Record<string, string | null> = { status };
    if (trackingNumber) updates.tracking_number = trackingNumber;
    if (carrier) updates.carrier = carrier;
    if (status === "livree" && order.status !== "livree") {
      updates.delivered_at = new Date().toISOString();
    }

    await supabase.from("orders").update(updates).eq("id", orderId);

    // Envoyer email si passage en statut "expédiée"
    let emailSent = false;
    const wasShipped = order.status !== "expediee" && status === "expediee";
    if (wasShipped && order.shipping_address?.email && trackingNumber) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "Elekka <contact@elekka-sellier.fr>",
          replyTo: "elekka.sellier@gmail.com",
          to: order.shipping_address.email,
          subject: `Votre commande ${order.order_number} est expédiée`,
          html: shippingEmail({
            orderNumber: order.order_number,
            firstName: order.shipping_address.firstName,
            trackingNumber,
            carrier: carrier ?? null,
            address: order.shipping_address,
          }),
        });
        emailSent = true;
      } catch (emailErr) {
        const msg = emailErr instanceof Error ? emailErr.message : "Erreur inconnue";
        await alertAdmin("Email expédition — échec envoi", {
          commande: order.order_number,
          client: order.shipping_address.email,
          erreur: msg,
        });
      }
    }

    return NextResponse.json({ success: true, emailSent: wasShipped ? emailSent : null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function easterSunday(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function frenchHolidays(year: number): Set<string> {
  const easter = easterSunday(year);
  const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

  return new Set([
    key(new Date(year, 0, 1)),   // Jour de l'An
    key(addDays(easter, 1)),      // Lundi de Pâques
    key(new Date(year, 4, 1)),   // Fête du Travail
    key(new Date(year, 4, 8)),   // Victoire 1945
    key(addDays(easter, 39)),    // Ascension
    key(addDays(easter, 50)),    // Lundi de Pentecôte
    key(new Date(year, 6, 14)),  // Fête Nationale
    key(new Date(year, 7, 15)),  // Assomption
    key(new Date(year, 10, 1)),  // Toussaint
    key(new Date(year, 10, 11)), // Armistice
    key(new Date(year, 11, 25)), // Noël
  ]);
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow === 0 || dow === 6) continue;
    const holidays = frenchHolidays(result.getFullYear());
    const key = `${result.getFullYear()}-${result.getMonth()}-${result.getDate()}`;
    if (!holidays.has(key)) added++;
  }
  return result;
}

function formatDateFR(d: Date) {
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

const CARRIER_DELAYS: Record<string, [number, number]> = {
  colissimo: [2, 3],
  chronopost: [1, 2],
  dpd: [2, 3],
  "mondial-relay": [3, 5],
  ups: [2, 3],
  fedex: [1, 2],
};

const CARRIER_LABELS: Record<string, string> = {
  colissimo: "La Poste — Colissimo",
  chronopost: "Chronopost",
  dpd: "DPD",
  "mondial-relay": "Mondial Relay",
  ups: "UPS",
  fedex: "FedEx",
};

const CARRIER_URLS: Record<string, string> = {
  colissimo: `https://www.laposte.fr/outils/suivre-vos-envois?code=`,
  chronopost: `https://www.chronopost.fr/tracking-no-cms/suivi-numero?listeNumerosLT=`,
  dpd: `https://www.dpd.fr/trace/`,
  "mondial-relay": `https://www.mondialrelay.fr/suivi-de-colis/?numero=`,
  ups: `https://www.ups.com/track?tracknum=`,
  fedex: `https://www.fedex.com/fedextrack/?trknbr=`,
};

function shippingEmail({ orderNumber, firstName, trackingNumber, carrier, address }: {
  orderNumber: string; firstName: string; trackingNumber: string; carrier: string | null;
  address: { line1: string; line2?: string; postalCode: string; city: string; country: string };
}) {
  const carrierLabel = carrier ? (CARRIER_LABELS[carrier] ?? carrier) : null;
  const trackingUrl = carrier && CARRIER_URLS[carrier]
    ? `${CARRIER_URLS[carrier]}${encodeURIComponent(trackingNumber)}`
    : null;
  const delays = carrier ? CARRIER_DELAYS[carrier] : null;
  const deliveryRange = delays
    ? `${formatDateFR(addBusinessDays(new Date(), delays[0]))} — ${formatDateFR(addBusinessDays(new Date(), delays[1]))}`
    : null;

  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Votre commande est en route</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Votre commande est expédiée.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px">Bonjour ${firstName}, votre commande ${orderNumber} est en chemin.</p>

      <div style="background:#f2f1ef;padding:24px;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 10px">Numéro de suivi</p>
        <p style="font-size:20px;font-weight:700;font-family:monospace;margin:0 0 8px">${trackingNumber}</p>
        ${carrierLabel ? `<p style="font-size:13px;color:#737373;margin:0 0 4px">Transporteur : ${carrierLabel}</p>` : ""}
        ${deliveryRange ? `<p style="font-size:13px;color:#737373;margin:0 0 16px">Livraison estimée : ${deliveryRange}</p>` : ""}
        ${trackingUrl ? `<a href="${trackingUrl}" style="display:inline-block;background:#0a0a0a;color:#fafaf9;text-decoration:none;padding:12px 24px;font-size:13px;font-weight:600;letter-spacing:.04em">Suivre mon colis →</a>` : ""}
      </div>

      <div style="border:1px solid #e5e5e5;padding:24px;margin-bottom:32px">
        <p style="font-size:13px;font-weight:700;margin:0 0 8px">Suivre votre commande sur elekka-sellier.fr</p>
        <p style="font-size:13px;color:#737373;line-height:1.7;margin:0 0 16px">
          Créez un compte Elekka et renseignez votre numéro de commande <strong>${orderNumber}</strong> pour retrouver l'état et le suivi de votre colis directement sur notre site.
        </p>
        <a href="https://elekka-sellier.fr/compte" style="display:inline-block;border:1px solid #0a0a0a;color:#0a0a0a;text-decoration:none;padding:10px 20px;font-size:13px;font-weight:600;letter-spacing:.04em">Créer mon compte →</a>
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
