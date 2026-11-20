import { createClient } from "@supabase/supabase-js";
import { getServerPrice } from "@/lib/prices";

// Calcul du panier et des réductions entièrement côté serveur.
// Le navigateur n'envoie que les articles et les codes : prix et remises
// sont recalculés ici, jamais repris tels quels depuis la requête.

const MAX_QTY_PER_LINE = 20;
const REFERRAL_PERCENT = 20;
const FILET_SLUGS = ["essentiel", "signature", "fusion"];

type IncomingItem = {
  slug: string;
  quantity: number;
  name: string;
  colourLabel: string;
  size: string;
  [key: string]: unknown;
};

export type PricedCart<T extends IncomingItem> = {
  items: (T & { priceEUR: number; quantity: number })[];
  subtotalEUR: number;
  discountEUR: number;
  totalEUR: number;
  promoCode: string | null;
  referralCode: string | null;
};

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function validateItems<T extends IncomingItem>(items: T[]) {
  if (!Array.isArray(items) || items.length === 0) throw new Error("Panier vide");
  return items.map((item) => {
    const serverPrice = getServerPrice(item.slug);
    if (!serverPrice) throw new Error(`Produit inconnu : ${item.slug}`);
    const qty = Number(item.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
      throw new Error(`Quantité invalide pour ${item.name ?? item.slug}`);
    }
    return {
      ...item,
      name: String(item.name ?? ""),
      colourLabel: String(item.colourLabel ?? ""),
      size: String(item.size ?? ""),
      priceEUR: serverPrice,
      quantity: qty,
    };
  });
}

export async function priceCart<T extends IncomingItem>({
  items,
  promoCode,
  referralCode,
  userId,
}: {
  items: T[];
  promoCode?: string | null;
  referralCode?: string | null;
  userId?: string | null;
}): Promise<PricedCart<T>> {
  const validated = validateItems(items);
  const subtotal = round2(validated.reduce((s, i) => s + i.priceEUR * i.quantity, 0));
  const supabase = supabaseAdmin();

  // Code promo
  let promoDiscount = 0;
  let appliedPromo: string | null = null;
  const promo = promoCode?.trim().toUpperCase();
  if (promo) {
    const { data } = await supabase
      .from("promo_codes").select("*").eq("code", promo).eq("active", true).maybeSingle();
    const usable =
      data &&
      (data.max_uses === null || data.used_count < data.max_uses) &&
      (!data.valid_until || new Date(data.valid_until) >= new Date()) &&
      (data.product_restriction !== "filets" || validated.some((i) => FILET_SLUGS.includes(i.slug)));
    if (!usable) throw new Error("Code promo invalide ou expiré");
    const value = Number(data.discount_value);
    promoDiscount = data.discount_type === "percent"
      ? round2((subtotal * value) / 100)
      : Math.min(value, subtotal);
    appliedPromo = data.code;
  }

  // Code parrainage
  let referralDiscount = 0;
  let appliedReferral: string | null = null;
  const ref = referralCode?.trim().toUpperCase();
  if (ref) {
    const { data } = await supabase
      .from("profiles").select("id").eq("referral_code", ref).maybeSingle();
    if (data && data.id !== userId) {
      referralDiscount = round2((subtotal * REFERRAL_PERCENT) / 100);
      appliedReferral = ref;
    }
  }

  const discount = round2(Math.min(promoDiscount + referralDiscount, subtotal));
  return {
    items: validated,
    subtotalEUR: subtotal,
    discountEUR: discount,
    totalEUR: round2(subtotal - discount),
    promoCode: appliedPromo,
    referralCode: appliedReferral,
  };
}
