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

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("customer_email", address.email);
    params.append("success_url", `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${siteUrl}/checkout`);
    params.append("metadata[userId]", userId ?? "");
    params.append("metadata[customerEmail]", address.email);
    params.append("metadata[items]", JSON.stringify(items));
    params.append("metadata[shippingAddress]", JSON.stringify(address));

    items.forEach((item: {
      name: string; colourLabel: string; size: string; priceEUR: number; quantity: number;
    }, i: number) => {
      params.append(`line_items[${i}][price_data][currency]`, "eur");
      params.append(`line_items[${i}][price_data][product_data][name]`, item.name);
      params.append(`line_items[${i}][price_data][product_data][description]`, `${item.colourLabel} · Taille ${item.size}`);
      params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(item.priceEUR * 100)));
      params.append(`line_items[${i}][quantity]`, String(item.quantity));
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
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
