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
    const { code, totalEUR } = await req.json();

    if (!code?.trim()) {
      return NextResponse.json({ valid: false, error: "Code manquant" }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .eq("active", true)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false, error: "Code invalide" });
    }

    // Vérifier la limite d'utilisation
    if (data.max_uses !== null && data.used_count >= data.max_uses) {
      return NextResponse.json({ valid: false, error: "Ce code a déjà été utilisé" });
    }

    let discountEUR = 0;
    let label = "";

    if (data.discount_type === "percent") {
      discountEUR = Math.round((totalEUR * data.discount_value) / 100 * 100) / 100;
      label = `-${data.discount_value} %`;
    } else {
      discountEUR = Math.min(data.discount_value, totalEUR);
      label = `-${data.discount_value.toFixed(0)} €`;
    }

    return NextResponse.json({ valid: true, discountEUR, label, code: data.code });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ valid: false, error: message }, { status: 500 });
  }
}
