import { NextResponse } from "next/server";
import { getServerPrice } from "@/lib/prices";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { items, address, userId, promoCode, discountEUR = 0, referralCode } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Validation et remplacement des prix côté serveur
    const validatedItems = items.map((item: { slug: string; priceEUR: number; quantity: number; name: string; colourLabel: string; size: string; colour: string; colourSwatch: string }) => {
      const serverPrice = getServerPrice(item.slug);
      if (!serverPrice) throw new Error(`Produit inconnu : ${item.slug}`);
      return { ...item, priceEUR: serverPrice };
    });

    const siteUrl = "https://elekka-sellier.fr";
    const secretKey = process.env.STRIPE_SECRET_KEY!;

    const originalTotal = validatedItems.reduce(
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
      `metadata[items]=${encodeURIComponent(JSON.stringify(validatedItems))}`,
      `metadata[shippingAddress]=${encodeURIComponent(JSON.stringify(address))}`,
      `metadata[promoCode]=${encodeURIComponent(promoCode ?? "")}`,
      `metadata[discountEUR]=${discountEUR}`,
      `metadata[referralCode]=${encodeURIComponent(referralCode ?? "")}`,
    ];

    if (discountEUR > 0) {
      // Commande avec réduction : un seul article au total remisé
      const promoLabel = promoCode ? ` (code ${promoCode})` : "";
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
