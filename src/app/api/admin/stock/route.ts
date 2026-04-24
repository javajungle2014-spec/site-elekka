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

// GET — récupérer tout le stock
export async function GET(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const supabase = supabaseAdmin();
  const { data: categories } = await supabase
    .from("stock_categories")
    .select("*, stock_models(*, stock_variants(*))")
    .order("sort_order");

  return NextResponse.json({ categories: categories ?? [] });
}

// POST — actions : add-category, add-model, add-variant, update-variant
export async function POST(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const supabase = supabaseAdmin();

  if (body.action === "add-category") {
    const { data } = await supabase.from("stock_categories").insert({ name: body.name, sort_order: body.sort_order ?? 99 }).select().single();
    return NextResponse.json({ success: true, data });
  }

  if (body.action === "add-model") {
    const { data } = await supabase.from("stock_models").insert({ category_id: body.categoryId, name: body.name, slug: body.slug ?? null, sort_order: 99 }).select().single();
    return NextResponse.json({ success: true, data });
  }

  if (body.action === "add-variant") {
    const { data } = await supabase.from("stock_variants").insert({ model_id: body.modelId, colour: body.colour, size: body.size, quantity: body.quantity ?? 0 }).select().single();
    return NextResponse.json({ success: true, data });
  }

  if (body.action === "update-variant") {
    await supabase.from("stock_variants").update({ quantity: body.quantity }).eq("id", body.variantId);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
