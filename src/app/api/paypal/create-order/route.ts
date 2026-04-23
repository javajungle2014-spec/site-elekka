import { NextResponse } from "next/server";

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
    const { items, address, userId, promoCode, discountEUR = 0 } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const originalTotal = items.reduce(
      (sum: number, item: { priceEUR: number; quantity: number }) =>
        sum + item.priceEUR * item.quantity,
      0
    );
    const itemTotal = Math.max(0, originalTotal - discountEUR);
    const promoLabel = promoCode ? ` (code ${promoCode})` : "";

    const orderItems = items.map(
      (item: {
        name: string;
        colourLabel: string;
        size: string;
        priceEUR: number;
        quantity: number;
      }) => ({
        name: item.name,
        description: `${item.colourLabel} - Taille ${item.size}`,
        quantity: String(item.quantity),
        unit_amount: {
          currency_code: "EUR",
          value: item.priceEUR.toFixed(2),
        },
        category: "PHYSICAL_GOODS",
      })
    );

    const orderBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: userId ?? "",
          description: `Elekka - Commande de ${address.firstName} ${address.lastName}${promoLabel}`,
          amount: {
            currency_code: "EUR",
            value: itemTotal.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: itemTotal.toFixed(2),
              },
            },
          },
          items: orderItems,
          shipping: {
            name: { full_name: `${address.firstName} ${address.lastName}` },
            address: {
              address_line_1: address.line1,
              ...(address.line2 ? { address_line_2: address.line2 } : {}),
              admin_area_2: address.city,
              postal_code: address.postalCode,
              country_code: "FR",
            },
          },
        },
      ],
      payer: {
        email_address: address.email,
        name: { given_name: address.firstName, surname: address.lastName },
      },
    };

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderBody),
    });

    const data = await res.json();

    if (!res.ok || !data.id) {
      console.error("PayPal create-order error:", data);
      return NextResponse.json(
        { error: data.message ?? "Erreur PayPal" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("PayPal create-order:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
