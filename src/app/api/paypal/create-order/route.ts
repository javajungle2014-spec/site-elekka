import { NextResponse } from "next/server";
import { priceCart } from "@/lib/checkout-pricing";
import { SITE_URL } from "@/lib/site";

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
    const { items, address, userId, promoCode, referralCode } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Prix et réductions recalculés côté serveur (le montant envoyé par le navigateur est ignoré)
    const cart = await priceCart({ items, promoCode, referralCode, userId });
    const validatedItems = cart.items;

    // Vérification stock avant création order PayPal
    const siteUrl = SITE_URL;
    for (const item of validatedItems) {
      const res = await fetch(`${siteUrl}/api/stock/check?slug=${item.slug}&colour=${encodeURIComponent(item.colourLabel)}&size=${encodeURIComponent(item.size)}`);
      const stock = await res.json();
      if (stock.quantity === 0) {
        return NextResponse.json({ error: `${item.name} est en rupture de stock` }, { status: 400 });
      }
    }

    const accessToken = await getAccessToken();

    const itemTotal = cart.totalEUR;
    const promoLabel = cart.promoCode ? ` (code ${cart.promoCode})` : "";

    const orderItems = validatedItems.map(
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
          custom_id: JSON.stringify({ userId: userId ?? "", referralCode: cart.referralCode ?? "" }),
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
      console.error("PayPal create-order error:", data?.name, data?.message);
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
