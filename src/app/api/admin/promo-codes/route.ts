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

function checkAuth(req: Request): boolean {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

// GET — liste tous les codes promo
export async function GET(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ codes: data ?? [] });
}

// POST — créer ou modifier un code promo
export async function POST(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const supabase = supabaseAdmin();

  if (body.action === "create") {
    const { code, discount_type, discount_value, max_uses } = body;
    if (!code || !discount_type || !discount_value) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }
    const { data, error } = await supabase.from("promo_codes").insert({
      code: code.toUpperCase().trim(),
      discount_type,
      discount_value: Number(discount_value),
      max_uses: max_uses ? Number(max_uses) : 1,
      used_count: 0,
      active: true,
    }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  }

  if (body.action === "toggle") {
    const { id, active } = body;
    await supabase.from("promo_codes").update({ active }).eq("id", id);
    return NextResponse.json({ success: true });
  }

  if (body.action === "delete") {
    const { id } = body;
    await supabase.from("promo_codes").delete().eq("id", id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
