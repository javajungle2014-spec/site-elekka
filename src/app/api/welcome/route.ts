import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function generateWelcomeCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "BIENVENUE-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateParrainCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PARRAIN-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateReferralCode(firstName: string): string {
  const clean = firstName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `${clean}-${suffix}`;
}

async function insertUniqueCode(
  supabase: ReturnType<typeof supabaseAdmin>,
  generate: () => string,
  discountValue: number
): Promise<string> {
  let code = generate();
  for (let i = 0; i < 5; i++) {
    const { data } = await supabase.from("promo_codes").select("code").eq("code", code).single();
    if (!data) break;
    code = generate();
  }
  await supabase.from("promo_codes").insert({
    code,
    discount_type: "percent",
    discount_value: discountValue,
    max_uses: 1,
    used_count: 0,
    active: true,
  });
  return code;
}

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, phone, userId, referralCode } = await req.json();
    if (!email) return NextResponse.json({ error: "Email manquant" }, { status: 400 });

    const supabase = supabaseAdmin();

    // Sauvegarder profil avec client admin (bypasse RLS)
    if (userId) {
      const updates: Record<string, string> = {};
      if (phone) updates.phone = phone;
      if (lastName) updates.last_name = lastName;
      if (firstName) {
        updates.first_name = firstName;
        updates.referral_code = generateReferralCode(firstName);
      }
      if (Object.keys(updates).length > 0) {
        await supabase.from("profiles").update(updates).eq("id", userId);
      }
    }

    // Générer code bienvenue -15% dans promo_codes + user_promotions
    const welcomeCode = await insertUniqueCode(supabase, generateWelcomeCode, 15);
    if (userId) {
      await supabase.from("user_promotions").insert({
        user_id: userId,
        code: welcomeCode,
        label: "Cadeau de bienvenue",
        discount_type: "percent",
        discount_value: 15,
      });
    }

    // Générer code parrainage -20% si applicable
    let parrainCode: string | null = null;
    if (referralCode && userId) {
      parrainCode = await insertUniqueCode(supabase, generateParrainCode, 20);
      await supabase.from("user_promotions").insert({
        user_id: userId,
        code: parrainCode,
        label: "Offert par votre parrain",
        discount_type: "percent",
        discount_value: 20,
      });
    }

    // Email de bienvenue avec le code -15%
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject: "Bienvenue chez Elekka — votre cadeau de bienvenue",
      html: welcomeEmail({ firstName: firstName || "vous", welcomeCode }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Welcome route:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function welcomeEmail({ firstName, welcomeCode }: { firstName: string; welcomeCode: string }) {
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Bienvenue</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Bienvenue, ${firstName}.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px;line-height:1.7">
        Votre compte Elekka est créé. Pour vous accueillir, voici un code de réduction de <strong>−15 %</strong> sur votre première commande.
      </p>
      <div style="background:#f2f1ef;padding:24px;text-align:center;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 12px">Votre code de bienvenue</p>
        <p style="font-size:28px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0">${welcomeCode}</p>
        <p style="font-size:12px;color:#737373;margin:12px 0 0">−15 % · Valable une fois · À saisir au moment du paiement</p>
      </div>
      <p style="font-size:14px;color:#737373;line-height:1.7;margin:0">
        Pour toute question : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${date}</p>
    </div>
  </div>`;
}
