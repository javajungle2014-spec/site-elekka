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

export async function POST(req: Request) {
  try {
    const { orderNumber, postalCode, userId } = await req.json();

    if (!orderNumber?.trim() || !postalCode?.trim() || !userId) {
      return NextResponse.json({ error: "Informations manquantes" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Chercher la commande par numéro, sans utilisateur associé
    const { data: order, error } = await supabase
      .from("orders")
      .select("id, shipping_address, user_id")
      .eq("order_number", orderNumber.trim().toUpperCase())
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Numéro de commande introuvable" });
    }

    if (order.user_id) {
      return NextResponse.json({ error: "Cette commande est déjà associée à un compte" });
    }

    // Vérifier le code postal
    const orderPostal = order.shipping_address?.postalCode?.trim();
    if (orderPostal !== postalCode.trim()) {
      return NextResponse.json({ error: "Code postal incorrect" });
    }

    // Associer la commande au compte
    await supabase.from("orders").update({ user_id: userId }).eq("id", order.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
