import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";

const BRIDLES = ["essentiel", "signature", "fusion"];

const SUBTITLES: Record<string, string> = {
  essentiel: "Le classique, épuré et juste.",
  signature: "Anatomique, conçu pour le confort.",
  fusion: "Modulable, pour la personnalisation.",
};

export function BridlesGrid() {
  const bridles = products.filter((p) => BRIDLES.includes(p.slug));

  return (
    <section className="py-12 md:py-16 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="kicker text-muted block mb-3">La gamme</span>
            <h2 className="display text-2xl md:text-3xl">Les 3 modèles Elekka</h2>
          </div>
          <Link
            href="/boutique"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors press"
          >
            Voir tous les produits
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {bridles.map((product) => {
            const img = product.heroImage ?? product.colours[0]?.images[0];
            return (
              <Link
                key={product.slug}
                href={`/boutique/${product.slug}`}
                className="group flex flex-col border border-line hover:border-ink transition-colors duration-300 press"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                  {img && (
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-lg leading-tight">
                      {product.name.replace("Bridon Anatomique Elekka ", "").replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
                    </h3>
                    <span className="font-mono text-sm shrink-0">{formatPrice(product.priceEUR)}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed flex-1">
                    {SUBTITLES[product.slug] ?? product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium mt-2 group-hover:gap-2 transition-all duration-200">
                    Découvrir
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors press"
          >
            Voir tous les produits
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
