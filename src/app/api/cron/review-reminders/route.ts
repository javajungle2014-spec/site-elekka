import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function generateToken(): string {
  return randomBytes(24).toString("hex");
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function reviewEmail({ firstName, orderNumber, token, round }: {
  firstName: string; orderNumber: string; token: string; round: 1 | 2;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace("http://localhost:3000", "https://elekka-sellier.fr") ?? "https://elekka-sellier.fr";
  const link = `${siteUrl}/avis?token=${token}`;
  const subject = round === 1
    ? "Comment s'est passée votre commande Elekka ?"
    : "Toujours satisfait de votre filet Elekka ?";
  const intro = round === 1
    ? "Votre commande a été livrée il y a quelques jours. Nous espérons que votre cheval apprécie son nouveau filet !"
    : "Cela fait maintenant deux mois que vous avez reçu votre commande. Nous serions ravis d'avoir votre retour d'expérience.";

  return {
    subject,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Votre avis</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Bonjour ${firstName}.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 24px;line-height:1.7">${intro}</p>
      <p style="color:#737373;font-size:14px;margin:0 0 32px;line-height:1.7">
        Laisser un avis ne prend que 2 minutes — et en remerciement, vous recevrez un code de <strong>-25 € sur votre prochain filet</strong>.
      </p>

      <a href="${link}" style="display:inline-block;background:#0a0a0a;color:#fafaf9;text-decoration:none;padding:16px 32px;font-size:13px;letter-spacing:.05em;margin-bottom:32px">
        Donner mon avis →
      </a>

      <p style="font-size:12px;color:#a3a3a3;margin:0">
        Commande ${orderNumber} · Ce lien est personnel et à usage unique.
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>`,
  };
}

export async function GET(req: Request) {
  // Sécurité : vérifier le header Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace("http://localhost:3000", "https://elekka-sellier.fr") ?? "https://elekka-sellier.fr";

  let sent = 0;

  // J+5 — premier email
  const { data: orders5 } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "livree")
    .eq("review_email_1_sent", false)
    .lt("delivered_at", daysAgo(5))
    .not("delivered_at", "is", null);

  for (const order of orders5 ?? []) {
    const email = order.shipping_address?.email;
    const firstName = order.shipping_address?.firstName;
    if (!email || !firstName) continue;

    const token = generateToken();
    await supabase.from("review_tokens").insert({
      token,
      order_id: order.id,
      email,
      first_name: firstName,
      order_number: order.order_number,
    });

    const { subject, html } = reviewEmail({ firstName, orderNumber: order.order_number, token, round: 1 });
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject,
      html,
    });

    await supabase.from("orders").update({ review_email_1_sent: true }).eq("id", order.id);
    sent++;
  }

  // J+60 — deuxième email
  const { data: orders60 } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "livree")
    .eq("review_email_2_sent", false)
    .lt("delivered_at", daysAgo(60))
    .not("delivered_at", "is", null);

  for (const order of orders60 ?? []) {
    const email = order.shipping_address?.email;
    const firstName = order.shipping_address?.firstName;
    if (!email || !firstName) continue;

    const token = generateToken();
    await supabase.from("review_tokens").insert({
      token,
      order_id: order.id,
      email,
      first_name: firstName,
      order_number: order.order_number,
    });

    const { subject, html } = reviewEmail({ firstName, orderNumber: order.order_number, token, round: 2 });
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject,
      html,
    });

    await supabase.from("orders").update({ review_email_2_sent: true }).eq("id", order.id);
    sent++;
  }

  return NextResponse.json({ success: true, sent });
}
