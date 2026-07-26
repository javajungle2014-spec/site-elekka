import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { alertAdmin } from "@/lib/alert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STALE_DAYS = 4;

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabase = supabaseAdmin();

  const { data: staleOrders } = await supabase
    .from("orders")
    .select("id, order_number, created_at, total_eur, shipping_address")
    .eq("status", "en_preparation")
    .lt("created_at", daysAgo(STALE_DAYS));

  if (!staleOrders || staleOrders.length === 0) {
    return NextResponse.json({ success: true, stale: 0 });
  }

  const list = staleOrders.map((o) => {
    const days = Math.floor((Date.now() - new Date(o.created_at).getTime()) / 86_400_000);
    const name = `${o.shipping_address?.firstName ?? ""} ${o.shipping_address?.lastName ?? ""}`.trim();
    return `${o.order_number} — ${name} — ${o.total_eur} € — ${days} jours sans expédition`;
  }).join("\n");

  await alertAdmin(
    `${staleOrders.length} commande(s) en attente depuis +${STALE_DAYS} jours`,
    { commandes: list }
  );

  return NextResponse.json({ success: true, stale: staleOrders.length });
}
