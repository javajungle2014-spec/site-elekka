import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug   = searchParams.get("slug");
  const colour = searchParams.get("colour");
  const size   = searchParams.get("size");

  if (!slug || !colour || !size) {
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

  const quantity = variant?.quantity ?? null;
  return NextResponse.json({
    quantity,
    inStock: quantity === null || quantity > 0,
  });
}
