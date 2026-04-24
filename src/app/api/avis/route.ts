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

// GET — vérifier un token et récupérer les infos
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("review_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 404 });
  }

  if (data.used) {
    return NextResponse.json({ error: "Vous avez déjà soumis un avis" }, { status: 400 });
  }

  return NextResponse.json({
    firstName: data.first_name,
    email: data.email,
    orderNumber: data.order_number,
  });
}

// POST — soumettre un avis
export async function POST(req: Request) {
  try {
    const { token, rating, text, name } = await req.json();

    if (!token || !rating || !text?.trim()) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Vérifier le token
    const { data: tokenData } = await supabase
      .from("review_tokens")
      .select("*")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (!tokenData) {
      return NextResponse.json({ error: "Lien invalide ou déjà utilisé" }, { status: 400 });
    }

    // Récupérer la date de commande
    let orderDate: string | null = null;
    if (tokenData.order_number) {
      const { data: orderData } = await supabase
        .from("orders")
        .select("created_at")
        .eq("order_number", tokenData.order_number)
        .single();
      if (orderData) orderDate = orderData.created_at;
    }

    // Enregistrer l'avis (en attente de modération)
    await supabase.from("reviews").insert({
      name: name || tokenData.first_name,
      rating,
      text: text.trim(),
      active: false,
      order_number: tokenData.order_number,
      order_date: orderDate,
      created_at: new Date().toISOString(),
    });

    // Marquer le token comme utilisé
    await supabase.from("review_tokens").update({ used: true }).eq("token", token);

    // Envoyer le code de remerciement -25€
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/review-thanks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: tokenData.email, firstName: tokenData.first_name }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
