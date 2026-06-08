import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

function checkAuth(req: Request): boolean {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const supabase = supabaseAdmin();
  const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ reviews: data ?? [] });
}

export async function PATCH(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id, active } = await req.json();
  if (!id || typeof active !== "boolean") return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  const supabase = supabaseAdmin();
  await supabase.from("reviews").update({ active }).eq("id", id);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  const supabase = supabaseAdmin();
  await supabase.from("reviews").delete().eq("id", id);
  return NextResponse.json({ success: true });
}
