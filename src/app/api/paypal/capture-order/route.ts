import { NextResponse } from "next/server";
import { createOrderAndGetNumber, sendOrderEmails, incrementPromoUsage } from "@/lib/order-emails";
import type { OrderItem, OrderAddress } from "@/lib/order-emails";

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
    const { orderId, items, address, userId, discountEUR = 0, promoCode } = await req.json() as {
      orderId: string;
      items: OrderItem[];
      address: OrderAddress;
      userId: string | null;
      discountEUR?: number;
      promoCode?: string;
    };

    if (!orderId) {
      return NextResponse.json({ error: "Order ID manquant" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

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
      console.error("PayPal capture error:", data);
      return NextResponse.json(
        { error: data.message ?? "Erreur de capture PayPal" },
        { status: 500 }
      );
    }

    const totalEUR = Math.max(
      0,
      items.reduce((sum, item) => sum + item.priceEUR * item.quantity, 0) - discountEUR
    );

    if (promoCode) await incrementPromoUsage(promoCode);

    const orderNumber = await createOrderAndGetNumber({ userId, items, address, totalEUR });

    if (address?.email) {
      await sendOrderEmails({ orderNumber, items, address, totalEUR });
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("PayPal capture:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
