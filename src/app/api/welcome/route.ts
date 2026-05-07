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

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "BIENVENUE-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateReferralCode(firstName: string): string {
  const clean = firstName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `${clean}-${suffix}`;
}

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, phone, userId, referralCode } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email manquant" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Sauvegarder téléphone + code de parrainage avec le client admin (bypasse RLS)
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

    // Générer le code de bienvenue -15%
    let code = generateCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data } = await supabase.from("promo_codes").select("code").eq("code", code).single();
      if (!data) break;
      code = generateCode();
      attempts++;
    }
    await supabase.from("promo_codes").insert({
      code,
      discount_type: "percent",
      discount_value: 15,
      max_uses: 1,
      used_count: 0,
      active: true,
    });

    // Générer le code parrainage -20% si applicable
    let referralPromoCode: string | null = null;
    if (referralCode) {
      let rCode = `PARRAIN-${generateCode().slice(9)}`;
      let rAttempts = 0;
      while (rAttempts < 5) {
        const { data } = await supabase.from("promo_codes").select("code").eq("code", rCode).single();
        if (!data) break;
        rCode = `PARRAIN-${generateCode().slice(9)}`;
        rAttempts++;
      }
      const { error: rErr } = await supabase.from("promo_codes").insert({
        code: rCode,
        discount_type: "percent",
        discount_value: 20,
        max_uses: 1,
        used_count: 0,
        active: true,
      });
      if (!rErr) referralPromoCode = rCode;
    }

    // Envoyer l'email de bienvenue
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject: referralPromoCode
        ? "Bienvenue chez Elekka — vos codes de réduction"
        : "Bienvenue chez Elekka — votre cadeau de bienvenue",
      html: welcomeEmail({ firstName: firstName || "vous", code, referralPromoCode }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("Welcome route:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function welcomeEmail({ firstName, code, referralPromoCode }: { firstName: string; code: string; referralPromoCode?: string | null }) {
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Bienvenue</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Bienvenue, ${firstName}.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px;line-height:1.7">
        Votre compte Elekka est créé. Voici ${referralPromoCode ? "vos codes de réduction" : "votre cadeau de bienvenue"}.
      </p>

      ${referralPromoCode ? `
      <div style="background:#0a0a0a;padding:24px;text-align:center;margin-bottom:16px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a3a3a3;margin:0 0 8px">Code parrainage — réduction de bienvenue</p>
        <p style="font-size:28px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0;color:#fafaf9">${referralPromoCode}</p>
        <p style="font-size:12px;color:#a3a3a3;margin:10px 0 0">−20 % · Valable une fois · S'applique automatiquement à votre première commande</p>
      </div>
      <p style="font-size:12px;color:#737373;margin:0 0 24px;line-height:1.6;text-align:center">
        Si la réduction ne s'applique pas automatiquement, copiez ce code et collez-le dans le champ "Code promo" au moment du paiement.
      </p>
      ` : ""}

      <div style="background:#f2f1ef;padding:24px;text-align:center;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 12px">Code de bienvenue</p>
        <p style="font-size:28px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0">${code}</p>
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
