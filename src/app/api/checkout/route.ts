import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const body = [
    "mode=payment",
    "success_url=https://elekka-sellier.fr/checkout/success",
    "cancel_url=https://elekka-sellier.fr/checkout",
    "line_items[0][price_data][currency]=eur",
    "line_items[0][price_data][product_data][name]=Test",
    "line_items[0][price_data][unit_amount]=9000",
    "line_items[0][quantity]=1",
  ].join("&");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  return NextResponse.json({
    status: res.status,
    ok: res.ok,
    url: data.url ?? null,
    error: data.error ?? null,
  });
}

export async function POST(req: Request) {
  try {
    const { items, address, userId, promoCode, discountEUR = 0 } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const siteUrl = "https://elekka-sellier.fr";
    const secretKey = process.env.STRIPE_SECRET_KEY!;

    const originalTotal = items.reduce(
      (sum: number, item: { priceEUR: number; quantity: number }) => sum + item.priceEUR * item.quantity,
      0
    );
    const discountedTotal = Math.max(0, originalTotal - discountEUR);

    const parts: string[] = [
      "mode=payment",
      `customer_email=${encodeURIComponent(address.email)}`,
      `success_url=${encodeURIComponent(`${siteUrl}/checkout/success`)}`,
      `cancel_url=${encodeURIComponent(`${siteUrl}/checkout`)}`,
      `metadata[userId]=${encodeURIComponent(userId ?? "")}`,
      `metadata[customerEmail]=${encodeURIComponent(address.email)}`,
      `metadata[items]=${encodeURIComponent(JSON.stringify(items))}`,
      `metadata[shippingAddress]=${encodeURIComponent(JSON.stringify(address))}`,
      `metadata[promoCode]=${encodeURIComponent(promoCode ?? "")}`,
      `metadata[discountEUR]=${discountEUR}`,
    ];

    if (discountEUR > 0) {
      // Commande avec réduction : un seul article au total remisé
      const promoLabel = promoCode ? ` (code ${promoCode})` : "";
      parts.push(`line_items[0][price_data][currency]=eur`);
      parts.push(`line_items[0][price_data][product_data][name]=${encodeURIComponent(`Commande Elekka${promoLabel}`)}`);
      parts.push(`line_items[0][price_data][unit_amount]=${Math.round(discountedTotal * 100)}`);
      parts.push(`line_items[0][quantity]=1`);
    } else {
      items.forEach((item: {
        name: string; colourLabel: string; size: string; priceEUR: number; quantity: number;
      }, i: number) => {
        parts.push(`line_items[${i}][price_data][currency]=eur`);
        parts.push(`line_items[${i}][price_data][product_data][name]=${encodeURIComponent(item.name)}`);
        parts.push(`line_items[${i}][price_data][product_data][description]=${encodeURIComponent(`${item.colourLabel} - Taille ${item.size}`)}`);
        parts.push(`line_items[${i}][price_data][unit_amount]=${Math.round(item.priceEUR * 100)}`);
        parts.push(`line_items[${i}][quantity]=${item.quantity}`);
      });
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: parts.join("&"),
    });

    const data = await res.json();
    console.log("Stripe response:", res.status, JSON.stringify(data.error ?? "ok"));

    if (!res.ok || !data.url) {
      return NextResponse.json({ error: data.error?.message ?? "Erreur Stripe" }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
