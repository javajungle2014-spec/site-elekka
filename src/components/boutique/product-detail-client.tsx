"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, ShoppingBag, Heart,
  Plus, Minus, Truck, Gift, ShieldCheck,
} from "@phosphor-icons/react";
import { type Product, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";
import { AuthModal } from "@/components/auth-modal";
import { faqProductCategories, type FaqItem } from "@/lib/faq";
import { productDescriptions, sharedTabs } from "@/lib/product-tabs";

/* ─── Helpers ────────────────────────────────────────────────────────── */

const LEATHER_CLASS: Record<string, string> = {
  "havana-brown": "leather-havana-brown",
  "noir": "leather-noir",
  "dark-brown": "leather-dark-brown",
};

type TabKey = "description" | "taille" | "composition" | "entretien";
const TAB_LABELS: Record<TabKey, string> = {
  description: "Description",
  taille: "Guide de taille",
  composition: "Composition",
  entretien: "Entretien",
};

/* ─── Sous-composants ────────────────────────────────────────────────── */

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="press w-full flex items-start justify-between gap-4 py-4 text-left">
        <span className="text-sm leading-snug">{item.q}</span>
        <span className="shrink-0 mt-0.5 text-muted">{open ? <Minus size={13} /> : <Plus size={13} />}</span>
      </button>
      {open && <p className="text-xs text-muted leading-relaxed pb-4 max-w-[52ch]">{item.a}</p>}
    </div>
  );
}

function ProductTabs({ slug }: { slug: string }) {
  const [active, setActive] = useState<TabKey>("description");
  const content: Record<TabKey, string> = {
    description: productDescriptions[slug] ?? "",
    taille: sharedTabs.taille,
    composition: sharedTabs.composition,
    entretien: sharedTabs.entretien,
  };
  return (
    <div className="grid grid-cols-12 gap-8 md:gap-16">
      <div className="col-span-12 md:col-span-2">
        <p className="kicker-tight text-muted">/05</p>
        <p className="kicker mt-2 text-ink">Notice</p>
      </div>
      <div className="col-span-12 md:col-span-10">
        <div className="border-t border-ink">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((tab, i) => {
            const isActive = active === tab;
            return (
              <div key={tab} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setActive(isActive ? "description" : tab)}
                  className="press w-full flex items-center justify-between py-6 text-left group"
                >
                  <div className="flex items-baseline gap-8">
                    <span className="font-mono text-[10px] text-muted tracking-widest">/0{i + 1}</span>
                    <span className={`display text-xl md:text-2xl transition-colors ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                      {TAB_LABELS[tab]}
                    </span>
                  </div>
                  <span className={`text-muted transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                    <ArrowRight size={14} className={`transition-transform duration-300 ${isActive ? "rotate-90" : ""}`} />
                  </span>
                </button>
                {isActive && (
                  <div className="md:pl-[6.25rem] pb-8 pr-6 rise">
                    {content[tab].split("\n\n").map((para, j) => {
                      const parts = para.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={j} className="text-sm text-ink/75 leading-[1.75] max-w-[60ch] mb-3 last:mb-0">
                          {parts.map((part, k) =>
                            part.startsWith("**") && part.endsWith("**")
                              ? <strong key={k} className="text-ink font-semibold">{part.replace(/\*\*/g, "")}</strong>
                              : part
                          )}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Composant principal ────────────────────────────────────────────── */

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColour, setSelectedColour] = useState(product.defaultColour);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const { addItem } = useCart();
  const { isFavorite, toggle, userId } = useFavorites();
  const [authOpen, setAuthOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const currentColour = product.colours.find(c => c.key === selectedColour)!;
  const favorite = isFavorite(product.slug);
  const otherProducts = products.filter(p => p.slug !== product.slug);

  // Sticky cart — apparaît quand le CTA principal sort du viewport
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleFavorite() {
    if (!userId) { setAuthOpen(true); return; }
    toggle(product.slug);
  }

  function handleAdd() {
    addItem({
      slug: product.slug, name: product.name, priceEUR: product.priceEUR,
      colour: selectedColour, colourLabel: currentColour.label,
      colourSwatch: currentColour.swatch, size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <div className="min-h-screen">

        {/* ── Fil d'Ariane ── */}
        <div className="px-6 md:px-12 pt-28 md:pt-32">
          <Link href="/boutique"
            className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors press">
            <ArrowLeft size={12} />
            <span>Boutique</span>
            <span className="text-muted-soft mx-1.5">/</span>
            <span className="text-ink italic" style={{ fontWeight: 300 }}>{product.name}</span>
          </Link>
        </div>

        {/* ── Hero ── */}
        <section className="px-6 md:px-12 pt-10 md:pt-14">
          {/* Métadonnées */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6 text-muted">
              <span className="kicker-tight">{product.family}</span>
              <span className="w-8 h-px bg-line" />
              <span className="kicker-tight">Cuir pleine fleur</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-ink pulse-dot" />
              <span className="kicker-tight">Disponible</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-16 items-end">
            {/* Image — texture cuir CSS */}
            <div className="col-span-12 md:col-span-7 order-2 md:order-1">
              <div className={`relative aspect-[4/5] overflow-hidden ${LEATHER_CLASS[selectedColour] ?? "bg-paper-2"}`}>
                <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 pointer-events-none" />
                {/* Vue label */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="kicker-tight text-on-ink/60">Profil</span>
                  <span className="font-mono text-[10px] tracking-wider text-on-ink/60">01 / 01</span>
                </div>
                {/* Ref produit */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest text-on-ink/50">
                    ELK-{product.slug.slice(0, 3).toUpperCase()}-{selectedColour.slice(0, 3).toUpperCase()}-{selectedSize.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-muted">
                <span className="kicker-tight">Fig. I — {currentColour.label}</span>
                <span className="font-mono text-[10px] tracking-wider">{formatPrice(product.priceEUR)}</span>
              </div>
            </div>

            {/* Titre + config */}
            <div className="col-span-12 md:col-span-5 order-1 md:order-2 md:pb-2">
              <p className="kicker text-muted">{product.family}</p>
              <h1 className="display mt-4 text-[3rem] md:text-[4rem] xl:text-[4.5rem] leading-[0.95] text-ink">
                {product.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
              </h1>
              <p className="mt-4 italic text-muted text-base md:text-lg max-w-[36ch]" style={{ fontWeight: 300 }}>
                {product.tagline}
              </p>

              <div className="mt-10 mb-8 h-px bg-line-ink" />

              <p className="text-[15px] text-ink/80 leading-[1.7] max-w-[44ch]">
                {product.description}
              </p>

              {/* Prix */}
              <div className="mt-8 flex items-baseline gap-4">
                <p className="font-mono text-3xl text-ink tabular-nums tracking-tight">
                  {formatPrice(product.priceEUR)}
                </p>
                <p className="text-xs text-muted">TTC · Livraison offerte</p>
              </div>

              {/* Perks */}
              <div className="mt-5 flex items-stretch border-y border-line divide-x divide-line">
                <div className="flex items-center gap-3 px-4 py-3 flex-1">
                  <Truck size={16} className="text-ink shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-ink leading-tight">Livraison offerte</p>
                    <p className="text-[10px] text-muted mt-0.5">Expédié sous 48 h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 flex-1">
                  <Gift size={16} className="text-ink shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-ink leading-tight">Rênes offertes</p>
                    <p className="text-[10px] text-muted mt-0.5">Avec chaque filet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Configurateur ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">

          {/* Étape I — Coloris */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-14">
            <div className="col-span-12 md:col-span-4">
              <div className="relative pl-10 mb-6">
                <div className="absolute left-0 top-0 w-7 h-7 border border-ink rounded-full flex items-center justify-center">
                  <span className="font-mono text-[10px]">I</span>
                </div>
                <p className="kicker-tight text-muted">Étape I sur II</p>
                <h3 className="display text-2xl mt-2">Coloris</h3>
                <p className="text-sm text-muted italic mt-1.5" style={{ fontWeight: 300 }}>
                  Sélection · <span className="text-ink">{currentColour.label}</span>
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${product.colours.length}, 1fr)` }}>
                {product.colours.map(c => {
                  const isActive = selectedColour === c.key;
                  return (
                    <button key={c.key} type="button" onClick={() => setSelectedColour(c.key)}
                      className={`choice press text-left ${isActive ? "choice--active" : ""}`}>
                      <div className={`aspect-[4/5] ${LEATHER_CLASS[c.key] ?? "bg-paper-2"} relative`}>
                        {isActive && (
                          <span className="absolute top-3 right-3 w-6 h-6 bg-paper text-ink rounded-full flex items-center justify-center">
                            <Check size={11} weight="bold" />
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="display text-base">{c.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Étape II — Taille */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-14">
            <div className="col-span-12 md:col-span-4">
              <div className="relative pl-10 mb-6">
                <div className={`absolute left-0 top-0 w-7 h-7 border rounded-full flex items-center justify-center ${selectedColour ? "border-ink bg-ink text-on-ink" : "border-ink"}`}>
                  {selectedColour ? <Check size={12} weight="bold" /> : <span className="font-mono text-[10px]">II</span>}
                </div>
                <p className="kicker-tight text-muted">Étape II sur II</p>
                <h3 className="display text-2xl mt-2">Taille</h3>
                <p className="text-sm text-muted italic mt-1.5" style={{ fontWeight: 300 }}>
                  Mesures prises au chanfrein
                </p>
              </div>
              <Link href="/ressources/conseils/mesurer-tete-cheval-taille-filet"
                className="ml-10 text-[12px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink press inline-flex items-center gap-1.5 transition-colors">
                Guide des mesures <ArrowRight size={11} />
              </Link>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map(size => {
                  const isActive = selectedSize === size;
                  const isStandard = size === "Full";
                  return (
                    <button key={size} type="button" onClick={() => setSelectedSize(size)}
                      className={`choice press text-left p-6 relative ${isActive ? "choice--active" : ""}`}>
                      {isStandard && !isActive && (
                        <span className="absolute -top-2 left-4 bg-paper px-2 text-[9px] tracking-widest uppercase text-muted font-medium">
                          Recommandé
                        </span>
                      )}
                      <p className="display text-3xl">{size}</p>
                      <p className="text-[11px] text-muted mt-2 leading-snug">
                        {size === "Full" ? "Chevaux de selle adultes" : "Poneys, chevaux fins"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA principal */}
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <div className="border-t border-ink pt-6">
                <div className="flex items-baseline justify-between mb-6">
                  <p className="kicker text-ink">Votre configuration</p>
                  <p className="font-mono text-2xl tabular-nums">{formatPrice(product.priceEUR)}</p>
                </div>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
                  {[
                    { label: "Modèle", value: product.name },
                    { label: "Coloris", value: currentColour.label },
                    { label: "Taille", value: selectedSize },
                    { label: "Rênes", value: "Plates — offertes" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between border-b border-line pb-2">
                      <dt className="kicker-tight text-muted">{label}</dt>
                      <dd className="text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex gap-2">
                  <button ref={ctaRef} type="button" onClick={handleAdd}
                    className="cta-shine press flex-1 inline-flex items-center justify-between bg-ink text-on-ink pl-6 pr-5 h-14 text-sm tracking-wider hover:bg-ink-soft transition-colors">
                    <span className="inline-flex items-center gap-3">
                      <ShoppingBag size={16} />
                      <span className="font-medium uppercase">{added ? "Ajouté !" : "Ajouter au panier"}</span>
                    </span>
                    {added ? <Check size={14} weight="bold" /> : <ArrowRight size={14} />}
                  </button>
                  <button type="button" onClick={handleFavorite}
                    aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={`press w-14 h-14 border flex items-center justify-center transition-all duration-200 ${
                      favorite ? "border-ink bg-ink text-on-ink" : "border-line text-ink hover:border-ink"
                    }`}>
                    <Heart size={17} weight={favorite ? "fill" : "regular"} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
                  {[
                    { Icon: ShieldCheck, label: "Retours 14 jours" },
                    { Icon: Gift, label: "Rênes offertes" },
                    { Icon: Truck, label: "Livraison offerte" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon size={13} />
                      <span className="kicker-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Points clés ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/02</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <p className="display text-[2rem] md:text-[2.75rem] leading-tight max-w-[24ch]">
                Ce qui fait <em className="italic font-light text-muted">la différence</em>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-10 md:col-start-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
                {product.highlights.map((h, i) => (
                  <div key={h} className="flex gap-5 border-b border-line pb-6">
                    <span className="font-mono text-[10px] text-muted-soft pt-1 tabular-nums tracking-wider shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-ink/85 leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Citation fondateur ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/03</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="italic text-muted text-5xl leading-[0.5] mb-4" style={{ fontWeight: 300 }}>"</p>
              <p className="display text-[1.75rem] md:text-[2.25rem] leading-[1.15]">
                Un filet n'est pas un accessoire.
                C'est une <em className="italic font-light text-muted">conversation</em> entre le cavalier, le cheval et le cuir — qui se bonifie avec le temps.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-paper-2 rounded-full flex items-center justify-center text-xs font-semibold">LM</div>
                <div>
                  <p className="text-sm font-medium">Lucas Mourier</p>
                  <p className="kicker-tight text-muted mt-1">Fondateur Elekka · Cavalier</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Description longue ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/04</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="kicker text-ink mb-4">L'objet</p>
              <p className="text-[15px] text-ink/75 leading-[1.75] max-w-[60ch]">
                {product.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ── Tabs accordéon ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">
          <ProductTabs slug={product.slug} />
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/06</p>
              <p className="kicker mt-2 text-ink">FAQ</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                {faqProductCategories.map(cat => (
                  <div key={cat.title} className="mb-8">
                    <p className="kicker-tight text-muted-soft mb-3">{cat.title}</p>
                    {cat.items.map(item => <FaqItem key={item.q} item={item} />)}
                  </div>
                ))}
              </div>
              <Link href="/ressources/faq" className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors">
                Voir toutes les questions →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Autres modèles ── */}
        <section className="px-6 md:px-12 mt-24 md:mt-32 pb-32">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/07</p>
            </div>
            <div className="col-span-12 md:col-span-10 flex items-end justify-between">
              <p className="display text-[2rem] md:text-[2.75rem]">
                Autres pièces de la <em className="italic font-light text-muted">gamme</em>.
              </p>
              <Link href="/boutique" className="press text-sm text-ink border-b border-ink pb-1 whitespace-nowrap inline-flex items-center gap-2">
                Voir tout <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {otherProducts.map(p => (
              <Link key={p.slug} href={`/boutique/${p.slug}`} className="col-span-12 sm:col-span-6 md:col-span-4 group">
                <div className={`relative aspect-[4/5] overflow-hidden ${LEATHER_CLASS[p.defaultColour] ?? "bg-paper-2"}`}>
                  <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 pointer-events-none" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <p className="display text-xl">{p.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}</p>
                    <p className="text-[12px] text-muted italic mt-1.5 leading-snug max-w-[28ch]" style={{ fontWeight: 300 }}>{p.tagline}</p>
                  </div>
                  <p className="font-mono text-sm tabular-nums">{formatPrice(p.priceEUR)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ── Sticky cart ── */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink text-on-ink">
          <div className="px-5 md:px-12 h-[68px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`hidden sm:block w-10 h-10 shrink-0 ${LEATHER_CLASS[selectedColour] ?? "bg-paper-2"}`} />
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-tight truncate">
                  {product.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
                  <span className="text-on-ink-muted"> · {currentColour.label} · {selectedSize}</span>
                </p>
                <p className="kicker-tight text-on-ink-muted mt-0.5 hidden sm:block">Rênes plates offertes</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:block text-right pr-3">
                <p className="kicker-tight text-on-ink-muted">Total</p>
                <p className="font-mono text-base tabular-nums">{formatPrice(product.priceEUR)}</p>
              </div>
              <button type="button" onClick={handleAdd}
                className="cta-shine press inline-flex items-center justify-between bg-on-ink text-ink h-11 pl-5 pr-4 gap-5 min-w-[180px] hover:bg-paper-2 transition-colors">
                <span className="text-[13px] font-medium tracking-widest uppercase">
                  {added ? "Ajouté !" : "Ajouter au panier"}
                </span>
                {added ? <Check size={14} weight="bold" /> : <ArrowRight size={14} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
