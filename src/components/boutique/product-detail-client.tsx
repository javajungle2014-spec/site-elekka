"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag, Heart, Plus, Minus } from "@phosphor-icons/react";
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
      {/* Barre d'onglets */}
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

      {/* Contenu */}
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
    <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32 pb-24">

      {/* Fil d'Ariane */}
      <Link
        href="/boutique"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors press mb-10 md:mb-14"
      >
        <ArrowLeft size={14} weight="regular" />
        Retour à la boutique
      </Link>

      {/* Layout principal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

        {/* Gauche : image */}
        <div className="md:col-span-6 lg:col-span-7 md:sticky md:top-28">
          <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
            <ProductPlaceholder label={product.name} />
          </div>
        </div>

        {/* Droite : détails */}
        <div className="md:col-span-6 lg:col-span-5">

          {/* Titre */}
          <p className="kicker text-muted">{product.family}</p>
          <h1 className="display mt-3 text-3xl md:text-4xl xl:text-[2.75rem] leading-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-muted italic font-light text-sm md:text-base">
            {product.tagline}
          </p>
          <p className="mt-4 font-mono text-2xl md:text-3xl text-ink tabular-nums">
            {formatPrice(product.priceEUR)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-ink text-on-ink px-3 py-1.5 text-xs font-medium tracking-wide">
              Livraison offerte
            </div>
            <div className="inline-flex items-center gap-2 border border-ink text-ink px-3 py-1.5 text-xs font-medium tracking-wide">
              Rênes offertes à l'achat
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 text-sm md:text-base text-muted leading-relaxed border-l-2 border-line pl-4">
            {product.description}
          </p>

          {/* Sélecteur coloris */}
          <div className="mt-8">
            <p className="text-sm font-medium text-ink mb-3">
              Coloris{" "}
              <span className="text-muted font-normal">— {currentColour.label}</span>
            </p>
            <div className="flex items-center gap-3">
              {product.colours.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  title={c.label}
                  onClick={() => setSelectedColour(c.key)}
                  className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 press ${
                    selectedColour === c.key
                      ? "border-ink scale-110 shadow-md"
                      : "border-line hover:border-muted hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.swatch }}
                >
                  {selectedColour === c.key && (
                    <Check
                      size={13}
                      weight="bold"
                      className="absolute inset-0 m-auto text-white"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sélecteur taille */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink mb-3">Taille</p>
            <div className="flex items-center gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2.5 text-sm border transition-all duration-200 press ${
                    selectedSize === size
                      ? "border-ink bg-ink text-on-ink"
                      : "border-line text-muted hover:border-muted-soft hover:text-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA panier + favoris */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => addItem({
                slug: product.slug,
                name: product.name,
                priceEUR: product.priceEUR,
                colour: selectedColour,
                colourLabel: currentColour.label,
                colourSwatch: currentColour.swatch,
                size: selectedSize,
              })}
              className="press flex-1 inline-flex items-center justify-center gap-3 bg-ink text-on-ink px-6 py-4 text-sm tracking-wide hover:bg-ink-soft transition-colors"
            >
              <ShoppingBag size={16} weight="regular" />
              Ajouter au panier
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={handleFavorite}
                aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                className={`press w-14 h-full border flex items-center justify-center transition-all duration-200 ${
                  favorite ? "border-ink bg-ink text-on-ink" : "border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                <Heart size={18} weight={favorite ? "fill" : "regular"} />
              </button>
            </div>
          </div>

          {/* Points clés */}
          <div className="mt-10 pt-10 border-t border-line">
            <p className="text-xs tracking-[0.18em] uppercase text-muted mb-5">
              Points clés
            </p>
            <ul className="flex flex-col gap-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-ink/80">
                  <Check
                    size={14}
                    weight="bold"
                    className="shrink-0 mt-0.5 text-ink"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Description longue */}
          <div className="mt-8 pt-8 border-t border-line text-sm text-muted leading-relaxed">
            <p>{product.longDescription}</p>
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
          <Link href="/faq" className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors">
            Voir toutes les questions
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {faqProductCategories.map((cat) => (
            <div key={cat.title} className="mb-8">
              <p className="text-xs tracking-widest uppercase text-muted-soft mb-2">{cat.title}</p>
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
