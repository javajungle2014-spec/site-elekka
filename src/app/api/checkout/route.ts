import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: address.email,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    metadata: {
      userId: userId ?? "",
      items: JSON.stringify(items),
      shippingAddress: JSON.stringify(address),
      customerEmail: address.email,
    },
  });

  return NextResponse.json({ url: session.url });
}
