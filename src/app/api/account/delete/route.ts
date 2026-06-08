import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    // Vérifier l'authentification de l'utilisateur
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    // Confirmation via body
    const { confirm } = await req.json();
    if (confirm !== "DELETE_MY_ACCOUNT") {
      return NextResponse.json({ error: "Confirmation requise" }, { status: 400 });
    }

    const admin = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Anonymiser les commandes (conserver pour comptabilité mais retirer données personnelles)
    await admin.from("orders").update({
      user_id: null,
      shipping_address: { anonymized: true },
    }).eq("user_id", user.id);

    // Supprimer les données personnelles
    await admin.from("profiles").delete().eq("id", user.id);
    await admin.from("user_promotions").delete().eq("user_id", user.id);
    await admin.from("referrals").delete().eq("referrer_code", user.id);

    // Supprimer le compte auth
    await admin.auth.admin.deleteUser(user.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
