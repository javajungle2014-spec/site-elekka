import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BRIDLE_COMPONENTS, isBridle } from "@/lib/bridle-components";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug   = searchParams.get("slug");
  const colour = searchParams.get("colour");
  const size   = searchParams.get("size");

  if (!slug || !colour) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: model } = await supabase
    .from("stock_models")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!model) {
    return NextResponse.json({ quantity: null, inStock: true });
  }

  const { data: variant } = await supabase
    .from("stock_variants")
    .select("quantity")
    .eq("model_id", model.id)
    .eq("colour", colour)
    .eq("size", size)
    .single();

  let quantity = variant?.quantity ?? null;

  // Si c'est un filet, vérifier aussi les composants
  if (quantity !== 0 && isBridle(slug!)) {
    const componentSlugs = BRIDLE_COMPONENTS[slug!] ?? [];
    for (const compSlug of componentSlugs) {
      const { data: compModel } = await supabase
        .from("stock_models").select("id").eq("slug", compSlug).single();
      if (!compModel) continue;
      const { data: compVariant } = await supabase
        .from("stock_variants").select("quantity")
        .eq("model_id", compModel.id).eq("colour", colour!).eq("size", size ?? "").single();
      const compQty = compVariant?.quantity ?? null;
      if (compQty === 0) { quantity = 0; break; }
      if (compQty !== null && (quantity === null || compQty < quantity)) {
        quantity = compQty;
      }
    }
  }

  return NextResponse.json({
    quantity,
    inStock: quantity === null || quantity > 0,
  });
}
