import { NextResponse } from "next/server";
import { createOrderAndGetNumber, sendOrderEmails, incrementPromoUsage } from "@/lib/order-emails";
import { priceCart } from "@/lib/checkout-pricing";
import type { OrderItem, OrderAddress } from "@/lib/order-emails";
import { alertAdmin } from "@/lib/alert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { orderId, items, address, userId, promoCode, referralCode } = await req.json() as {
      orderId: string;
      items: OrderItem[];
      address: OrderAddress;
      userId: string | null;
      promoCode?: string;
      referralCode?: string;
    };

    if (!orderId) {
      return NextResponse.json({ error: "Order ID manquant" }, { status: 400 });
    }

    // Prix et réductions recalculés côté serveur
    const cart = await priceCart({ items, promoCode, referralCode, userId });
    const validatedItems: OrderItem[] = cart.items;
    const totalEUR = cart.totalEUR;

    const accessToken = await getAccessToken();

    // Avant de capturer : le montant de la commande PayPal doit correspondre au panier recalculé
    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const order = await orderRes.json();
    const unit = order?.purchase_units?.[0]?.amount;
    if (!orderRes.ok || unit?.currency_code !== "EUR" || Math.abs(Number(unit?.value) - totalEUR) > 0.01) {
      await alertAdmin("PayPal — montant incohérent, capture refusée", {
        paypal_order_id: orderId,
        montant_paypal: unit ? `${unit.value} ${unit.currency_code}` : "inconnu",
        montant_attendu: `${totalEUR.toFixed(2)} EUR`,
      });
      return NextResponse.json({ error: "Le montant de la commande ne correspond pas au panier. Aucun paiement n'a été prélevé." }, { status: 400 });
    }

    const res = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== "COMPLETED") {
      console.error("PayPal capture error:", data?.name, data?.message);
      await alertAdmin("PayPal — échec capture paiement", { paypal_order_id: orderId, erreur: data?.message ?? data?.name ?? "Statut non COMPLETED", statut: data?.status ?? "inconnu" });
      return NextResponse.json(
        { error: data.message ?? "Erreur de capture PayPal" },
        { status: 500 }
      );
    }

    if (cart.promoCode) await incrementPromoUsage(cart.promoCode);

    const orderNumber = await createOrderAndGetNumber({ userId, items: validatedItems, address, totalEUR, referralCode: cart.referralCode });

    if (address?.email) {
      await sendOrderEmails({ orderNumber, items: validatedItems, address, totalEUR });
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("PayPal capture:", message);
    await alertAdmin("PayPal — erreur inattendue capture", { erreur: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
