"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "@phosphor-icons/react";
import { type Product, type ColourKey, formatPrice } from "@/lib/products";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { useFavorites } from "@/lib/favorites-store";
import { AuthModal } from "@/components/auth-modal";

const THUMB_COUNT = 4;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function ProductCard({
  product,
  index = 0,
  colourOverride,
  compact = false,
}: {
  product: Product;
  index?: number;
  colourOverride?: ColourKey;
  compact?: boolean;
}) {
  const { isFavorite, toggle, userId } = useFavorites();
  const favourite = isFavorite(product.slug);
  const [authOpen, setAuthOpen] = useState(false);
  const activeColour = colourOverride ?? product.defaultColour;

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    if (!userId) {
      setAuthOpen(true);
      return;
    }
    toggle(product.slug);
  }

  const images =
    product.colours.find((c) => c.key === activeColour)?.images ?? [];
  const colourLabel = product.colours.find((c) => c.key === activeColour)?.label;
  const href = colourOverride
    ? `/boutique/${product.slug}?couleur=${colourOverride}`
    : `/boutique/${product.slug}`;

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);

  const activeImage = images[activeIdx] ?? null;

  const slots: (string | null)[] = Array.from({ length: THUMB_COUNT }).map(
    (_, i) => images[i] ?? null
  );

  return (
    <>
    <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    <Link
      href={href}
      className="group block rise"
      style={{ ["--i" as string]: index + 3 }}
    >
      {/* ── Image principale ─────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-paper-2 ${compact ? "aspect-[1/1]" : "aspect-[4/5]"}`}>

        {/* Zoom subtil au survol de la carte */}
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transform: "scale(1)",
            transitionTimingFunction: EASE,
          }}
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
              style={{ transitionTimingFunction: EASE }}
            />
          ) : (
            <ProductPlaceholder label={product.name} />
          )}
        </div>

        {/* Gradient bas — masque le fond sous le pill */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
          }}
        />

        {/* Badge famille */}
        <div className="absolute top-4 left-4 z-20 bg-paper/90 backdrop-blur-sm px-3 py-1.5 text-xs tracking-[0.14em] uppercase">
          {product.family}
        </div>

        {/* Bouton favori */}
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            aria-label={favourite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavorite}
            className={`press w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              favourite ? "bg-ink text-on-ink" : "bg-paper/80 backdrop-blur-sm text-muted hover:text-ink hover:bg-paper"
            }`}
          >
            <Heart size={14} weight={favourite ? "fill" : "regular"} />
          </button>
        </div>

        {/* ── Pill miniatures ───────────────────────────────────────────── */}
        <div className={`absolute z-20 ${compact ? "bottom-2 left-2 right-2" : "bottom-3 left-3 right-3"}`}>
          <div
            className={`flex rounded-2xl ${compact ? "gap-[4px] p-[4px]" : "gap-[6px] p-[6px]"}`}
            style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(12px)" }}
          >
            {slots.map((img, i) => {
              const isActive = activeIdx === i;
              const isHovered = hoveredThumb === i;

              const opacity = isActive ? 1 : isHovered ? 0.88 : 0.38;
              const scale = isActive ? 1 : isHovered ? 1.07 : 0.96;
              const brightness = isHovered && !isActive ? 1.12 : 1;

              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  onMouseEnter={() => setHoveredThumb(i)}
                  onMouseLeave={() => setHoveredThumb(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveIdx(i);
                  }}
                  className={`relative flex-1 aspect-square overflow-hidden cursor-pointer ${compact ? "rounded-[7px]" : "rounded-[10px]"}`}
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    filter: `brightness(${brightness})`,
                    transition: `opacity 0.28s ${EASE}, transform 0.28s ${EASE}, filter 0.28s ${EASE}`,
                  }}
                >
                  {/* Contenu miniature */}
                  {img ? (
                    <Image
                      src={img as string}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: "rgba(255,255,255,0.22)", fontSize: "9px", letterSpacing: "0.12em" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  )}

                  {/* Indicateur actif — ligne blanche en bas */}
                  <div
                    className="absolute bottom-0 inset-x-0 rounded-full"
                    style={{
                      height: "2px",
                      background: "rgba(255,255,255,0.9)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                      transition: `transform 0.3s ${EASE}`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Infos produit ─────────────────────────────────────────────────── */}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-sm md:text-lg font-semibold tracking-tight text-ink leading-snug">
            {product.name}{colourOverride && colourLabel ? ` — ${colourLabel}` : ""}
          </h2>
          <span className="shrink-0 font-mono text-xs md:text-sm text-ink tabular-nums pt-0.5">
            {formatPrice(product.priceEUR)}
          </span>
        </div>

        <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed hidden sm:block">
          {product.tagline}
        </p>

        {/* Swatches coloris */}
        <div className="flex items-center gap-2 mt-4">
          {product.colours.map((c) => (
            <span
              key={c.key}
              className="inline-block w-3.5 h-3.5 rounded-full border border-line/80 shrink-0"
              style={{ backgroundColor: c.swatch }}
              title={c.label}
            />
          ))}
          <span className="text-xs text-muted ml-0.5">
            {product.colours.map((c) => c.label).join(", ")}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-5 text-sm text-ink group-hover:gap-3 transition-[gap] duration-300">
          Voir le produit
          <ArrowUpRight size={14} weight="regular" />
        </div>
      </div>
    </Link>
    </>
  );
}
