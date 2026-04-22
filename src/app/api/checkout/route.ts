import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { items, address, userId } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elekka-sellier.fr";
    const secretKey = process.env.STRIPE_SECRET_KEY!;

    const successUrl = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/checkout`;

    const parts: string[] = [
      `mode=payment`,
      `customer_email=${encodeURIComponent(address.email)}`,
      `success_url=${encodeURIComponent(successUrl).replace(/%7B/g, "{").replace(/%7D/g, "}")}`,
      `cancel_url=${encodeURIComponent(cancelUrl)}`,
      `metadata[userId]=${encodeURIComponent(userId ?? "")}`,
      `metadata[customerEmail]=${encodeURIComponent(address.email)}`,
      `metadata[items]=${encodeURIComponent(JSON.stringify(items))}`,
      `metadata[shippingAddress]=${encodeURIComponent(JSON.stringify(address))}`,
    ];

    items.forEach((item: {
      name: string; colourLabel: string; size: string; priceEUR: number; quantity: number;
    }, i: number) => {
      parts.push(`line_items[${i}][price_data][currency]=eur`);
      parts.push(`line_items[${i}][price_data][product_data][name]=${encodeURIComponent(item.name)}`);
      parts.push(`line_items[${i}][price_data][product_data][description]=${encodeURIComponent(`${item.colourLabel} · Taille ${item.size}`)}`);
      parts.push(`line_items[${i}][price_data][unit_amount]=${Math.round(item.priceEUR * 100)}`);
      parts.push(`line_items[${i}][quantity]=${item.quantity}`);
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: parts.join("&"),
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      console.error("Stripe error:", data.error);
      return NextResponse.json({ error: data.error?.message ?? "Erreur Stripe" }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
