import { NextResponse } from "next/server";
import { priceCart } from "@/lib/checkout-pricing";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { items, address, userId, promoCode, referralCode } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Prix et réductions recalculés côté serveur (le montant envoyé par le navigateur est ignoré)
    const cart = await priceCart({ items, promoCode, referralCode, userId });
    const validatedItems = cart.items;
    const discountEUR = cart.discountEUR;

    // Vérification stock avant création session
    const siteUrl = SITE_URL;
    for (const item of validatedItems) {
      const res = await fetch(`${siteUrl}/api/stock/check?slug=${item.slug}&colour=${encodeURIComponent(item.colourLabel)}&size=${encodeURIComponent(item.size)}`);
      const stock = await res.json();
      if (stock.quantity === 0) {
        return NextResponse.json({ error: `${item.name} est en rupture de stock` }, { status: 400 });
      }
    }

    const secretKey = process.env.STRIPE_SECRET_KEY!;

    const discountedTotal = cart.totalEUR;

    const parts: string[] = [
      "mode=payment",
      `customer_email=${encodeURIComponent(address.email)}`,
      `success_url=${encodeURIComponent(`${siteUrl}/checkout/success`)}`,
      `cancel_url=${encodeURIComponent(`${siteUrl}/checkout`)}`,
      `metadata[userId]=${encodeURIComponent(userId ?? "")}`,
      `metadata[customerEmail]=${encodeURIComponent(address.email)}`,
      `metadata[items]=${encodeURIComponent(JSON.stringify(validatedItems))}`,
      `metadata[shippingAddress]=${encodeURIComponent(JSON.stringify(address))}`,
      `metadata[promoCode]=${encodeURIComponent(cart.promoCode ?? "")}`,
      `metadata[discountEUR]=${discountEUR}`,
      `metadata[referralCode]=${encodeURIComponent(cart.referralCode ?? "")}`,
    ];

    if (discountEUR > 0) {
      // Commande avec réduction : un seul article au total remisé
      const promoLabel = cart.promoCode ? ` (code ${cart.promoCode})` : "";
      parts.push(`line_items[0][price_data][currency]=eur`);
      parts.push(`line_items[0][price_data][product_data][name]=${encodeURIComponent(`Commande Elekka${promoLabel}`)}`);
      parts.push(`line_items[0][price_data][unit_amount]=${Math.round(discountedTotal * 100)}`);
      parts.push(`line_items[0][quantity]=1`);
    } else {
      validatedItems.forEach((item: {
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
    if (!res.ok) console.error("Stripe error:", res.status, data.error?.code);

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
