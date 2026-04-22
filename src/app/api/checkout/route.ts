import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  maxNetworkRetries: 0,
  timeout: 8000,
});

export async function POST(req: Request) {
  try {
    const { items, address, userId } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lineItems = items.map((item: {
      name: string; colourLabel: string; size: string; priceEUR: number; quantity: number;
    }) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description: `${item.colourLabel} · Taille ${item.size}`,
        },
        unit_amount: Math.round(item.priceEUR * 100),
      },
      quantity: item.quantity,
    }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elekka-sellier.fr";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: address.email,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      metadata: {
        userId: userId ?? "",
        items: JSON.stringify(items),
        shippingAddress: JSON.stringify(address),
        customerEmail: address.email,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
