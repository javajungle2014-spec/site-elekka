import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { insertUniquePromoCode } from "@/lib/prices";
import { giftEmail } from "@/app/admin/preview-email/cadeau/page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "java.jungle2014@gmail.com";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function checkAuth(req: Request): boolean {
  const auth = req.headers.get("Authorization") ?? "";
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { firstName, email, amountEUR } = await req.json() as {
      firstName: string;
      email: string;
      amountEUR: number;
    };

    if (!firstName || !email || !amountEUR) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const code = await insertUniquePromoCode(supabase, "CADEAU", "fixed", amountEUR);

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Elekka <contact@elekka-sellier.fr>",
      replyTo: "elekka.sellier@gmail.com",
      to: email,
      cc: ADMIN_EMAIL,
      subject: `Un cadeau pour vous — Elekka`,
      html: giftEmail({ firstName, code, amountEUR }),
    });

    return NextResponse.json({ success: true, code });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
