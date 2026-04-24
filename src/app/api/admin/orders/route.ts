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
  const auth = req.headers.get("Authorization") ?? "";
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}
