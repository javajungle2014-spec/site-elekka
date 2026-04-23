import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrderAndGetNumber, sendOrderEmails, incrementPromoUsage } from "@/lib/order-emails";
import type { OrderItem, OrderAddress } from "@/lib/order-emails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
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
    const { userId, items: itemsJson, shippingAddress: addressJson, customerEmail, promoCode } =
      session.metadata ?? {};

    const items = JSON.parse(itemsJson ?? "[]") as OrderItem[];
    const address = JSON.parse(addressJson ?? "{}") as OrderAddress;
    if (customerEmail) address.email = customerEmail;
    const totalEUR = (session.amount_total ?? 0) / 100;

    const orderNumber = await createOrderAndGetNumber({
      userId: userId || null,
      items,
      address,
      totalEUR,
    });

    if (promoCode) await incrementPromoUsage(promoCode);

    if (address.email) {
      await sendOrderEmails({ orderNumber, items, address, totalEUR });
    }
  }

  return NextResponse.json({ received: true });
}
