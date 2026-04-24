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

  const supabase = supabaseAdmin();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, total_eur, status, created_at, items")
    .neq("status", "annulee")
    .order("created_at", { ascending: true });

  const all = orders ?? [];

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const totalRevenue = all.reduce((s, o) => s + Number(o.total_eur), 0);
  const monthOrders = all.filter((o) => o.created_at >= startOfMonth);
  const monthRevenue = monthOrders.reduce((s, o) => s + Number(o.total_eur), 0);

  // Par statut
  const byStatus = {
    en_preparation: all.filter((o) => o.status === "en_preparation").length,
    expediee: all.filter((o) => o.status === "expediee").length,
    livree: all.filter((o) => o.status === "livree").length,
  };

  // 6 derniers mois
  const months: { label: string; revenue: number; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = d.toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1).toISOString();
    const mo = all.filter((o) => o.created_at >= start && o.created_at < end);
    months.push({
      label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
      revenue: mo.reduce((s, o) => s + Number(o.total_eur), 0),
      count: mo.length,
    });
  }

  // Articles les plus commandés
  const itemCount: Record<string, { name: string; count: number }> = {};
  for (const order of all) {
    for (const item of (order.items ?? []) as { slug: string; name: string; qty: number }[]) {
      if (!itemCount[item.slug]) itemCount[item.slug] = { name: item.name, count: 0 };
      itemCount[item.slug].count += item.qty;
    }
  }
  const topItems = Object.values(itemCount).sort((a, b) => b.count - a.count).slice(0, 5);

  return NextResponse.json({
    totalRevenue,
    totalOrders: all.length,
    monthRevenue,
    monthOrders: monthOrders.length,
    byStatus,
    months,
    topItems,
  });
}
