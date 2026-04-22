"use client";
import { useFavorites } from "@/lib/favorites-store";
import { useCart } from "@/lib/cart-store";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingBag } from "@phosphor-icons/react";
import { products, formatPrice } from "@/lib/products";
import { ProductPlaceholder } from "@/components/product-placeholder";
import Link from "next/link";

export function FavoritesDrawer() {
  const { slugs, isOpen, close, toggle } = useFavorites();
  const { addItem } = useCart();

  const favoriteProducts = products.filter((p) => slugs.includes(p.slug));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fav-backdrop"
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fav-drawer"
            className="fixed top-0 right-0 bottom-0 z-[51] w-full max-w-[420px] bg-paper flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <div className="flex items-center gap-3">
                <Heart size={18} weight="regular" />
                <span className="font-semibold text-sm tracking-wide">Mes favoris</span>
                {slugs.length > 0 && (
                  <span className="bg-ink text-on-ink text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {slugs.length}
                  </span>
                )}
              </div>
              <button type="button" onClick={close} className="press p-2 text-muted hover:text-ink transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {favoriteProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <Heart size={40} weight="thin" className="text-muted-soft" />
                  <p className="text-sm text-muted">Aucun favori pour l'instant.</p>
                  <Link href="/boutique" onClick={close} className="press text-sm underline underline-offset-4 text-muted hover:text-ink transition-colors">
                    Découvrir la collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {favoriteProducts.map((product) => (
                    <li key={product.slug} className="py-5 flex gap-4">
                      {/* Image */}
                      <Link href={`/boutique/${product.slug}`} onClick={close}
                        className="shrink-0 w-20 aspect-[3/4] block bg-paper-2 border border-line overflow-hidden relative">
                        <ProductPlaceholder />
                      </Link>

                      <div className="flex-1 min-w-0 py-1">
                        <p className="kicker text-muted">{product.family}</p>
                        <Link href={`/boutique/${product.slug}`} onClick={close}>
                          <h3 className="text-sm font-semibold leading-snug hover:text-muted transition-colors mt-1">{product.name}</h3>
                        </Link>
                        <p className="text-xs text-muted mt-0.5">{product.tagline}</p>
                        <p className="font-mono text-sm mt-2">{formatPrice(product.priceEUR)}</p>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => addItem({
                              slug: product.slug,
                              name: product.name,
                              priceEUR: product.priceEUR,
                              colour: product.defaultColour,
                              colourLabel: product.colours.find(c => c.key === product.defaultColour)?.label ?? "",
                              colourSwatch: product.colours.find(c => c.key === product.defaultColour)?.swatch ?? "#000",
                              size: product.defaultSize,
                            })}
                            className="press flex items-center gap-1.5 bg-ink text-on-ink px-3 py-1.5 text-xs hover:bg-ink-soft transition-colors"
                          >
                            <ShoppingBag size={12} />
                            Ajouter
                          </button>
                          <button type="button" onClick={() => toggle(product.slug)}
                            className="press p-1.5 text-muted hover:text-ink transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
