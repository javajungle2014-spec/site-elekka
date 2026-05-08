import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600; // Cache 1h

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("reviews")
    .select("id, name, location, rating, text, photo_url, order_date")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return NextResponse.json({ reviews: data ?? [] });
}
