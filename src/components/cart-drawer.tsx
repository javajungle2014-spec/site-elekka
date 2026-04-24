"use client";
import { useCart } from "@/lib/cart-store";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, Trash } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-backdrop"
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
            key="cart-drawer"
            className="fixed top-0 right-0 bottom-0 z-[51] w-full max-w-[420px] bg-paper flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} weight="regular" />
                <span className="font-semibold text-sm tracking-wide">Mon panier</span>
                {totalItems > 0 && (
                  <span className="bg-ink text-on-ink text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button type="button" onClick={close} className="press p-2 text-muted hover:text-ink transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} weight="thin" className="text-muted-soft" />
                  <p className="text-sm text-muted">Votre panier est vide.</p>
                  <button type="button" onClick={close} className="press text-sm underline underline-offset-4 text-muted hover:text-ink transition-colors">
                    Continuer les achats
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.colour}-${item.size}`} className="py-5 flex gap-4">
                      {/* Swatch coloris */}
                      <div className="shrink-0 w-14 h-14 rounded bg-paper-2 border border-line flex items-center justify-center">
                        <span className="w-6 h-6 rounded-full border border-line/60" style={{ backgroundColor: item.colourSwatch }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-snug truncate">{item.name}</p>
                        <p className="text-xs text-muted mt-0.5">{item.colourLabel} · {item.size}</p>
                        <p className="text-sm font-mono mt-1">{formatPrice(item.priceEUR)}</p>

                        {/* Qty */}
                        <div className="flex items-center gap-2 mt-3">
                          <button type="button" onClick={() => updateQty(item.slug, item.colour, item.size, item.quantity - 1)}
                            className="press w-7 h-7 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQty(item.slug, item.colour, item.size, item.quantity + 1)}
                            className="press w-7 h-7 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <button type="button" onClick={() => removeItem(item.slug, item.colour, item.size)}
                        className="press shrink-0 p-1.5 text-muted hover:text-ink transition-colors self-start">
                        <Trash size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-line space-y-3">
                <div className="flex items-center justify-between text-xs text-green-600 font-medium">
                  <span>Livraison offerte</span>
                  <span>0,00 €</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Total</span>
                  <span className="font-mono font-semibold text-base">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { close(); router.push("/checkout"); }}
                  className="press w-full bg-ink text-on-ink py-4 text-sm font-medium tracking-wide hover:bg-ink-soft transition-colors"
                >
                  Commander
                </button>
                <Link href="/boutique" onClick={close}
                  className="press block text-center text-sm text-muted hover:text-ink transition-colors underline underline-offset-4">
                  Continuer les achats
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
