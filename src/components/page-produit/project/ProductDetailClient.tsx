"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Truck,
  Gift,
  ShieldCheck,
  Leaf,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { type Product, formatPrice, products } from "@/lib/products";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";
import { AuthModal } from "@/components/auth-modal";
import { faqProductCategories, type FaqItem } from "@/lib/faq";
import { productDescriptions, sharedTabs } from "@/lib/product-tabs";

type TabKey = "description" | "taille" | "composition" | "entretien";

const TAB_LABELS: Record<TabKey, string> = {
  description: "Description",
  taille: "Guide de taille",
  composition: "Composition",
  entretien: "Entretien",
};

function ProductTabs({ slug }: { slug: string }) {
  const [active, setActive] = useState<TabKey>("description");

  const content: Record<TabKey, string> = {
    description: productDescriptions[slug] ?? "",
    taille: sharedTabs.taille,
    composition: sharedTabs.composition,
    entretien: sharedTabs.entretien,
  };

  return (
    <div>
      <div className="flex items-center gap-0 border-b border-line overflow-x-auto">
        {(Object.keys(TAB_LABELS) as TabKey[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`shrink-0 px-5 py-3.5 text-sm transition-colors border-b-2 -mb-px ${
              active === tab
                ? "text-ink font-medium border-ink"
                : "text-muted border-transparent hover:text-ink"
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="py-8">
        {content[active].split("\n\n").map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return <p key={i} className="text-sm font-semibold mt-6 first:mt-0 mb-2">{para.replace(/\*\*/g, "")}</p>;
          }
          const parts = para.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} className="text-sm text-muted leading-relaxed mb-3 last:mb-0">
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**")
                  ? <strong key={j} className="text-ink font-semibold">{part.replace(/\*\*/g, "")}</strong>
                  : part
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="press w-full flex items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm leading-snug">{item.q}</span>
        <span className="shrink-0 mt-0.5 text-muted">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="text-xs text-muted leading-relaxed pb-4 max-w-[52ch]">{item.a}</p>
      )}
    </div>
  );
}

/* ─── Sous-composants fiche produit ──────────────────────────────────── */

function Gallery({ name }: { name: string }) {
  const [active, setActive] = useState(0);
  const views = ["Profil", "Détail couture", "Bouclerie", "Verso"];

  return (
    <div>
      {/* Image principale */}
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        <ProductPlaceholder label={name} />
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-ink/60">
            {views[active]}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-ink/60 tabular-nums">
            0{active + 1} / 0{views.length}
          </span>
        </div>
        <button
          type="button"
          aria-label="Zoom"
          className="absolute bottom-5 right-5 w-9 h-9 border border-ink/20 rounded-full flex items-center justify-center text-ink/60 hover:bg-paper hover:text-ink transition-colors"
        >
          <MagnifyingGlass size={13} />
        </button>
      </div>
      {/* Miniatures */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {views.map((v, i) => (
          <button
            key={v}
            type="button"
            onClick={() => setActive(i)}
            aria-label={v}
            className={`relative aspect-square overflow-hidden bg-paper-2 press transition-all ${
              active === i ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : "opacity-55 hover:opacity-100"
            }`}
          >
            <ProductPlaceholder />
          </button>
        ))}
      </div>
    </div>
  );
}

function PerksRow() {
  return (
    <div className="mt-5 flex items-stretch border-y border-line divide-x divide-line">
      <div className="flex items-center gap-3 px-4 py-3 flex-1">
        <Truck size={18} weight="regular" className="text-ink shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-wide text-ink leading-tight">
            Livraison offerte
          </p>
          <p className="text-[10px] text-muted leading-tight mt-0.5">
            Expédié sous 48 h
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 flex-1">
        <Gift size={18} weight="regular" className="text-ink shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-wide text-ink leading-tight">
            Rênes offertes
          </p>
          <p className="text-[10px] text-muted leading-tight mt-0.5">
            Avec chaque filet
          </p>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    { Icon: Leaf, label: "Tannage français" },
    { Icon: Truck, label: "Expédié sous 48 h" },
    { Icon: ShieldCheck, label: "Retours 30 jours" },
  ];
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <it.Icon size={13} weight="regular" />
          <span className="text-[11px] tracking-wide">{it.label}</span>
        </div>
      ))}
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

  const currentColour = product.colours.find((c) => c.key === selectedColour)!;
  const favorite = isFavorite(product.slug);

  function handleFavorite() {
    if (!userId) {
      setAuthOpen(true);
      return;
    }
    toggle(product.slug);
  }

  const otherProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <div className="mx-auto max-w-[1320px] px-5 md:px-12 pt-24 md:pt-32 pb-24">
        {/* Fil d'Ariane */}
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 text-xs tracking-wide text-muted hover:text-ink transition-colors press mb-10 md:mb-14"
        >
          <ArrowLeft size={13} weight="regular" />
          Retour à la boutique
        </Link>

        {/* Layout principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-start">
          {/* GAUCHE : galerie */}
          <div className="md:col-span-7 lg:col-span-7 md:sticky md:top-28">
            <Gallery name={product.name} />
            <div className="mt-6 flex items-center justify-between text-muted">
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium">
                Réf · ELK-{product.slug.slice(0, 3).toUpperCase()}-
                {selectedColour.slice(0, 3).toUpperCase()}-
                {selectedSize.slice(0, 3).toUpperCase()}
              </p>
              <p className="font-mono text-[10px] tracking-wider tabular-nums">N° 042 / 200</p>
            </div>
          </div>

          {/* DROITE : détails */}
          <div className="md:col-span-5 lg:col-span-5">
            {/* Famille + titre */}
            <p className="kicker text-muted">{product.family}</p>
            <h1 className="display mt-4 text-[2.4rem] md:text-[2.75rem] xl:text-[3.25rem] leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-2 text-muted italic font-light text-base md:text-lg">
              {product.tagline}
            </p>

            {/* Prix + avantages */}
            <div className="mt-7 pt-6 border-t border-line">
              <div className="flex items-baseline gap-4 flex-wrap">
                <p className="font-mono text-3xl md:text-[2.25rem] text-ink tabular-nums tracking-tight">
                  {formatPrice(product.priceEUR)}
                </p>
                <p className="text-xs text-muted">TTC · Paiement 3× sans frais</p>
              </div>
              <PerksRow />
            </div>

            {/* Description courte */}
            <p className="mt-7 text-sm md:text-[15px] text-ink/75 leading-relaxed max-w-[58ch]">
              {product.description}
            </p>

            {/* Sélecteur coloris */}
            <div className="mt-9">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-muted">
                  Coloris
                </p>
                <p className="text-xs text-ink">
                  <span className="text-muted">Sélection · </span>
                  <span className="font-medium">{currentColour.label}</span>
                </p>
              </div>
              <div className="flex items-center gap-5">
                {product.colours.map((c) => {
                  const isActive = selectedColour === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      title={c.label}
                      onClick={() => setSelectedColour(c.key)}
                      className="group press flex flex-col items-center gap-2 relative"
                    >
                      <span
                        className={`block w-8 h-8 rounded-full border border-line shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-transform ${
                          isActive ? "scale-100" : "group-hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.swatch }}
                      />
                      {isActive && (
                        <span className="absolute -top-1.5 -left-1.5 -right-1.5 h-11 rounded-full border border-ink pointer-events-none" />
                      )}
                      <span
                        className={`text-[10px] tracking-wider uppercase transition-colors ${
                          isActive ? "text-ink" : "text-muted-soft group-hover:text-muted"
                        }`}
                      >
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sélecteur taille */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-muted">
                  Taille
                </p>
                <button
                  type="button"
                  className="text-xs text-muted hover:text-ink underline underline-offset-4 decoration-line"
                >
                  Guide des tailles
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  const isStandard = size === "Full";
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`press relative h-12 border transition-all duration-200 ${
                        isActive
                          ? "border-ink bg-ink text-on-ink"
                          : "border-line text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      <span className="text-sm font-medium tracking-wide">{size}</span>
                      {isStandard && (
                        <span
                          className={`absolute top-1.5 right-2 font-mono text-[8px] tracking-widest ${
                            isActive ? "text-on-ink/60" : "text-muted-soft"
                          }`}
                        >
                          STD
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA + favoris */}
            <div className="mt-9 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  addItem({
                    slug: product.slug,
                    name: product.name,
                    priceEUR: product.priceEUR,
                    colour: selectedColour,
                    colourLabel: currentColour.label,
                    colourSwatch: currentColour.swatch,
                    size: selectedSize,
                  })
                }
                className="press flex-1 inline-flex items-center justify-between bg-ink text-on-ink pl-6 pr-5 h-14 text-sm tracking-wider hover:bg-ink-soft transition-colors"
              >
                <span className="inline-flex items-center gap-3 whitespace-nowrap">
                  <ShoppingBag size={16} weight="regular" />
                  <span className="font-medium uppercase">Ajouter au panier</span>
                </span>
                <ArrowRight size={14} weight="regular" />
              </button>
              <button
                type="button"
                onClick={handleFavorite}
                aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                className={`press w-14 h-14 border flex items-center justify-center transition-all duration-200 ${
                  favorite
                    ? "border-ink bg-ink text-on-ink"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                <Heart size={17} weight={favorite ? "fill" : "regular"} />
              </button>
            </div>

            <TrustBar />

            {/* Points clés — grille 2 colonnes numérotée */}
            <div className="mt-12 pt-10 border-t border-line">
              <div className="flex items-baseline justify-between mb-7">
                <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-muted">
                  Points clés
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-soft tabular-nums">
                  {String(product.highlights.length).padStart(2, "0")} caractéristiques
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {product.highlights.map((h, i) => (
                  <div key={h} className="flex gap-3">
                    <span className="font-mono text-[10px] text-muted-soft pt-1 tabular-nums tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-ink/85 leading-relaxed flex-1">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description longue */}
            <div className="mt-10 pt-10 border-t border-line">
              <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-muted mb-4">
                L'objet
              </p>
              <p className="text-sm text-ink/75 leading-relaxed max-w-[58ch]">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Onglets produit */}
        <div className="mt-16 md:mt-24 border-t border-line pt-12">
          <ProductTabs slug={product.slug} />
        </div>

        {/* FAQ */}
        <div className="mt-16 md:mt-24 border-t border-line pt-12">
          <div className="flex items-center justify-between mb-8">
            <p className="kicker text-muted">Questions fréquentes</p>
            <Link
              href="/faq"
              className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors"
            >
              Voir toutes les questions
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {faqProductCategories.map((cat) => (
              <div key={cat.title} className="mb-8">
                <p className="text-xs tracking-widest uppercase text-muted-soft mb-2">
                  {cat.title}
                </p>
                {cat.items.map((item) => (
                  <FaqAccordionItem key={item.q} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Autres modèles */}
        <div className="mt-24 md:mt-36 border-t border-line pt-14">
          <div className="flex items-end justify-between mb-10">
            <p className="kicker text-muted">Vous pourriez aussi aimer</p>
            <Link
              href="/boutique"
              className="text-sm text-muted hover:text-ink underline underline-offset-[6px] decoration-line hover:decoration-ink transition-colors press"
            >
              Voir toute la gamme
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/boutique/${p.slug}`}
                className="group flex gap-6 items-start"
              >
                <div className="relative w-24 md:w-28 shrink-0 aspect-[3/4] overflow-hidden bg-paper-2">
                  <ProductPlaceholder />
                </div>
                <div className="py-1">
                  <p className="kicker text-muted">{p.family}</p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-ink group-hover:text-muted transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-snug">{p.tagline}</p>
                  <p className="mt-3 font-mono text-sm text-ink tabular-nums">
                    {formatPrice(p.priceEUR)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
