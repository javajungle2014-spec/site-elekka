import { products } from "./products";

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
