import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const { referralCode, currentUserId } = await req.json();

    if (!referralCode?.trim()) {
      return NextResponse.json({ valid: false, error: "Code manquant" });
    }

    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name")
      .eq("referral_code", referralCode.trim().toUpperCase())
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false, error: "Code de parrainage invalide" });
    }

    // Empêcher l'auto-parrainage
    if (currentUserId && data.id === currentUserId) {
      return NextResponse.json({ valid: false, error: "Vous ne pouvez pas utiliser votre propre code" });
    }

    return NextResponse.json({
      valid: true,
      discountEUR: 0,
      discountPercent: 20,
      label: "-20 %",
      referrerName: data.first_name,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ valid: false, error: message }, { status: 500 });
  }
}
