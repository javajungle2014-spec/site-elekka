import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrderAndGetNumber, sendOrderEmails, incrementPromoUsage } from "@/lib/order-emails";
import type { OrderItem, OrderAddress } from "@/lib/order-emails";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Idempotence : ignorer si session déjà traitée
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: existing } = await supabase.from("orders").select("id").eq("stripe_session_id", session.id).maybeSingle();
    if (existing) return NextResponse.json({ received: true });

    const { userId, items: itemsJson, shippingAddress: addressJson, customerEmail, promoCode, referralCode } =
      session.metadata ?? {};

    let items: OrderItem[];
    let address: OrderAddress;
    try {
      items = JSON.parse(itemsJson ?? "[]") as OrderItem[];
      address = JSON.parse(addressJson ?? "{}") as OrderAddress;
    } catch {
      console.error("Webhook Stripe : métadonnées invalides", session.id);
      return NextResponse.json({ received: true });
    }

    if (customerEmail) address.email = customerEmail;

    // Validation adresse minimale
    if (!address.email || !address.firstName || !address.lastName) {
      console.error("Webhook Stripe : adresse incomplète", session.id);
      return NextResponse.json({ received: true });
    }

    const totalEUR = (session.amount_total ?? 0) / 100;

    let orderNumber: string;
    try {
      orderNumber = await createOrderAndGetNumber({
        userId: userId || null,
        items,
        address,
        totalEUR,
        referralCode: referralCode || null,
        stripeSessionId: session.id,
      });
    } catch (err) {
      console.error("Webhook Stripe : createOrder failed", err);
      return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }

    if (promoCode) {
      try { await incrementPromoUsage(promoCode); } catch { /* non-bloquant */ }
    }

    if (address.email) {
      await sendOrderEmails({ orderNumber, items, address, totalEUR });
    }
  }

  return NextResponse.json({ received: true });
}
