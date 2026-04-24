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

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // format: "2026-04"

  if (!month) {
    return NextResponse.json({ error: "Mois manquant" }, { status: 400 });
  }

  const [year, mon] = month.split("-").map(Number);
  const start = new Date(year, mon - 1, 1).toISOString();
  const end = new Date(year, mon, 1).toISOString();

  const supabase = supabaseAdmin();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", start)
    .lt("created_at", end)
    .order("created_at", { ascending: true });

  const rows = (orders ?? []).map((o) => {
    const addr = o.shipping_address ?? {};
    const items = (o.items ?? []) as { name: string; colourLabel: string; size: string; qty: number; priceEUR: number }[];
    const articlesStr = items.map((i) => `${i.name} (${i.colourLabel}, ${i.size}) x${i.qty}`).join(" | ");
    return [
      o.order_number ?? "",
      new Date(o.created_at).toLocaleDateString("fr-FR"),
      addr.firstName ?? "",
      addr.lastName ?? "",
      addr.email ?? "",
      addr.phone ?? "",
      addr.line1 ?? "",
      addr.line2 ?? "",
      addr.postalCode ?? "",
      addr.city ?? "",
      addr.country ?? "",
      articlesStr,
      Number(o.total_eur).toFixed(2).replace(".", ",") + " €",
      o.status ?? "",
      o.tracking_number ?? "",
      o.carrier ?? "",
    ];
  });

  const headers = [
    "Numéro", "Date", "Prénom", "Nom", "Email", "Téléphone",
    "Adresse", "Complément", "Code postal", "Ville", "Pays",
    "Articles", "Total", "Statut", "Numéro de suivi", "Transporteur",
  ];

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
    .join("\n");

  const monthLabel = new Date(year, mon - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="elekka-commandes-${month}.csv"`,
    },
  });
}
