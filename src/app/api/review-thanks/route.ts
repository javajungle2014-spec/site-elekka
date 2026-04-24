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
  let code = "MERCI-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email manquant" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Générer un code unique
    let code = generateCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data } = await supabase.from("promo_codes").select("code").eq("code", code).single();
      if (!data) break;
      code = generateCode();
      attempts++;
    }

    // Insérer le code avec restriction filets
    await supabase.from("promo_codes").insert({
      code,
      discount_type: "fixed",
      discount_value: 25,
      max_uses: 1,
      used_count: 0,
      active: true,
      product_restriction: "filets",
    });

    // Envoyer l'email de remerciement
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      subject: "Merci pour votre avis — votre cadeau Elekka",
      html: thanksEmail({ firstName: firstName || "vous", code }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function thanksEmail({ firstName, code }: { firstName: string; code: string }) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
    <div style="background:#0a0a0a;padding:32px 40px">
      <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Merci pour votre avis</p>
    </div>
    <div style="padding:40px;border:1px solid #e5e5e5;border-top:none">
      <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Merci, ${firstName}.</h2>
      <p style="color:#737373;font-size:14px;margin:0 0 32px;line-height:1.7">
        Votre avis nous aide à nous améliorer et aide d'autres cavaliers à faire leur choix. Pour vous remercier, voici <strong>25 € de réduction</strong> sur votre prochain filet Elekka.
      </p>

      <div style="background:#f2f1ef;padding:24px;text-align:center;margin-bottom:32px">
        <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 12px">Votre code</p>
        <p style="font-size:28px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0">${code}</p>
        <p style="font-size:12px;color:#737373;margin:12px 0 0">-25 € · Valable une fois · Sur les filets Elekka</p>
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
