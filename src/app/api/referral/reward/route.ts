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
  let code = "PARRAIN-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  try {
    const { referralCode, orderId } = await req.json();
    if (!referralCode) return NextResponse.json({ success: false });

    const supabase = supabaseAdmin();

    // Trouver le parrain via son code
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, first_name")
      .eq("referral_code", referralCode)
      .single();

    if (!profile) return NextResponse.json({ success: false });

    // Trouver l'email du parrain
    const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
    const email = authUser?.user?.email;
    if (!email) return NextResponse.json({ success: false });

    // Enregistrer le parrainage
    await supabase.from("referrals").insert({
      referrer_code: referralCode,
      referee_order_id: orderId ?? null,
      reward_sent: true,
    });

    // Générer le code -30€
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
      discount_type: "fixed",
      discount_value: 30,
      max_uses: 1,
      used_count: 0,
      active: true,
      product_restriction: "filets",
    });

    // Ajouter le code dans user_promotions du parrain
    await supabase.from("user_promotions").insert({
      user_id: profile.id,
      code,
      label: "Récompense parrainage",
      discount_type: "eur",
      discount_value: 30,
    });

    // Envoyer l'email au parrain
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject: "Votre filleul vient de commander — votre récompense Elekka",
      html: rewardEmail({ firstName: profile.first_name ?? "vous", code }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

function rewardEmail({ firstName, code }: { firstName: string; code: string }) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Merci pour votre parrainage</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Bonne nouvelle, ${firstName}.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px;line-height:1.7">
        L'un de vos filleuls vient de passer sa première commande chez Elekka. Merci de nous faire confiance et de parler de nous autour de vous.
        Voici votre récompense : <strong>-30 € sur votre prochain filet</strong>.
      </p>

      <div style="background:#f2f1ef;padding:24px;text-align:center;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 12px">Votre code</p>
        <p style="font-size:28px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0">${code}</p>
        <p style="font-size:12px;color:#737373;margin:12px 0 0">-30 € · Valable une fois · Sur les filets Elekka</p>
      </div>

      <p style="font-size:14px;color:#737373;line-height:1.7;margin:0">
        Pour toute question : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
      </p>
    </div>
    <div style="padding:20px 40px">
      <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>`;
}
