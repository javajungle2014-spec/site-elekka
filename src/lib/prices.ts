import { products } from "./products";

const PROMO_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generatePromoCode(prefix: string): string {
  let code = prefix + "-";
  for (let i = 0; i < 6; i++) {
    code += PROMO_CHARS[Math.floor(Math.random() * PROMO_CHARS.length)];
  }
  return code;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function insertUniquePromoCode(
  supabase: { from: (table: string) => any },
  prefix: string,
  discountType: "fixed" | "percent",
  discountValue: number,
  extraFields: Record<string, unknown> = {}
): Promise<string> {
  let code = generatePromoCode(prefix);
  for (let i = 0; i < 5; i++) {
    const { data } = await supabase.from("promo_codes").select("code").eq("code", code).single();
    if (!data) break;
    code = generatePromoCode(prefix);
  }
  await supabase.from("promo_codes").insert({
    code,
    discount_type: discountType,
    discount_value: discountValue,
    max_uses: 1,
    used_count: 0,
    active: true,
    ...extraFields,
  });
  return code;
}

// Prix des pièces détachées (côté serveur)
const PIECE_PRICES: Record<string, number> = {
  "muserolle-essentiel": 27.99,
  "muserolle-signature": 54.25,
  "muserolle-fusion":    54.25,
  "frontal-essentiel":   19.99,
  "frontal-fusion":      38.75,
  "frontal-signature":   38.75,
  "tetiere-essentiel":   31.99,
  "tetiere-signature":   62,
  "tetiere-fusion":      62,
};

export function getServerPrice(slug: string): number | null {
  const product = products.find(p => p.slug === slug);
  if (product) return product.priceEUR;
  return PIECE_PRICES[slug] ?? null;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
