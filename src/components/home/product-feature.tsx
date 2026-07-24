"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Leaf, Star, Wrench, Heart, Shield, Ruler,
  ArrowsCounterClockwise, Palette, Tag, ArrowClockwise, Barbell, Link as LinkIcon,
} from "@phosphor-icons/react";
import { products, formatPrice } from "@/lib/products";
import Link from "next/link";

const featureData: Record<string, { Icon: React.ElementType; title: string; text: string }[]> = {
  essentiel: [
    { Icon: Leaf,    title: "Cuir pleine fleur",   text: "Souplesse naturelle dès le premier usage, patine progressive dans la durée." },
    { Icon: Star,    title: "Design intemporel",    text: "Codes du bridon anglais classique, sans fioritures inutiles." },
    { Icon: Tag,     title: "Prix juste",             text: "La qualité d'un grand bridon, sans payer le prestige de la marque." },
    { Icon: Palette, title: "Deux coloris",         text: "Havana Brown ou Noir — tailles Full et Cob." },
  ],
  signature: [
    { Icon: Heart,  title: "Têtière anatomique",   text: "Conçue pour décharger la nuque et les zones temporales sensibles." },
    { Icon: Shield, title: "Muserolle redessinée",  text: "Rembourrage et fermeture avec mousse de protection." },
    { Icon: Ruler,  title: "Frontal ajusté",        text: "Frontal élargi, dimensions réinventées — sans pression latérale." },
    { Icon: Leaf,   title: "Rênes caoutchouc",      text: "Incluses — adhérence optimale en toutes conditions." },
  ],
  fusion: [
    { Icon: Ruler,                  title: "Frontal élargi",       text: "Dimensions réinventées — sans pression latérale." },
    { Icon: ArrowsCounterClockwise, title: "Muserolle élargie",     text: "Pad de protection large, épais et ovale, pour un confort et une efficacité maximale." },
    { Icon: Star,                   title: "Conception modulaire", text: "Tous nos composants de filet sont interchangeables pour une personnalisation infinie." },
    { Icon: Leaf,                   title: "Rênes caoutchouc",     text: "Incluses — adhérence optimale en toutes conditions." },
  ],
  "licol-1": [
    { Icon: Leaf,   title: "Cuir pleine fleur",  text: "Résistant et souple dès le premier usage, pour un usage quotidien durable." },
    { Icon: Heart,  title: "Licol anatomique",    text: "Conçu pour respecter les zones sensibles — nuque, joues et chanfrein." },
    { Icon: Ruler,  title: "Mousqueton rapide",    text: "Pose et retrait en quelques secondes — plus de temps perdu, plus de confort au quotidien." },
    { Icon: Tag,    title: "Tailles Full et Cob", text: "Adapté aux chevaux de sport comme aux poneys de compétition." },
  ],
  "licol-2": [
    { Icon: Heart,  title: "Museau rembourré",    text: "Rembourrage doux sur le museau pour prévenir les frottements lors des longues attaches." },
    { Icon: Leaf,   title: "Cuir pleine fleur",   text: "Résistant et souple dès le premier usage, pour un usage quotidien durable." },
    { Icon: Wrench, title: "Quincaillerie inox",  text: "Boucles et anneaux inox argentés, sans altération dans le temps." },
    { Icon: Tag,    title: "Tailles Full et Cob", text: "Adapté aux chevaux de sport comme aux poneys de compétition." },
  ],
  "renes-1": [
    { Icon: Barbell, title: "Grip caoutchouc",     text: "Prise en main sûre et précise, même par temps humide ou en transpiration." },
    { Icon: Leaf,         title: "Cuir pleine fleur",   text: "Légères et résistantes, elles s'assouplissent progressivement à l'usage." },
    { Icon: Star,         title: "Esthétique soignée",  text: "Coutures apparentes, galons tressés et finitions qui font la différence au premier regard." },
    { Icon: Ruler,        title: "Longueur standard",   text: "Adaptée à toutes les disciplines, Full et Cob disponibles." },
  ],
  "renes-2": [
    { Icon: Leaf,         title: "Arrêtoirs en cuir",       text: "Points d'appui fermes et confortables, pour une prise en main sûre et précise." },
    { Icon: Star,         title: "Résistance éprouvée",     text: "Matière robuste et durable, conçue pour encaisser les séances intensives sans s'user." },
    { Icon: Wrench,       title: "Compatible tous filets",  text: "S'adaptent à l'ensemble de la gamme Elekka et à la majorité des bridons du marché." },
    { Icon: Ruler,        title: "Longueur standard",       text: "Adaptée à toutes les disciplines, Full et Cob disponibles." },
  ],
  "enrenement-1": [
    { Icon: ArrowClockwise,   title: "Réglage précis",         text: "Ajustable sur plusieurs positions pour un appui progressif et contrôlé." },
    { Icon: Leaf,     title: "Cuir pleine fleur",      text: "Même qualité de cuir que nos bridons — durable et confortable." },
    { Icon: Wrench,   title: "Quincaillerie inox",     text: "Résiste à l'humidité et à l'usure des séances répétées." },
    { Icon: LinkIcon, title: "Compatible Elekka",      text: "Conçu pour fonctionner avec l'ensemble de la gamme bridons Elekka." },
  ],
  "enrenement-2": [
    { Icon: Heart,    title: "Points rembourrés",      text: "Rembourrage aux zones de contact sur le poitrail pour prévenir les frottements." },
    { Icon: ArrowClockwise,   title: "Réglage précis",         text: "Ajustable sur plusieurs positions pour un appui progressif et contrôlé." },
    { Icon: Leaf,     title: "Cuir pleine fleur",      text: "Même qualité de cuir que nos bridons — durable et confortable." },
    { Icon: LinkIcon, title: "Compatible Elekka",      text: "Conçu pour fonctionner avec l'ensemble de la gamme bridons Elekka." },
  ],
};

const VISIBLE = 4;
const carouselProducts = products.filter(p => p.slug !== "licol-2" && !p.hidden);

export function ProductFeature() {
  const [activeSlug, setActiveSlug] = useState(carouselProducts[0].slug);
  const [railStart, setRailStart] = useState(0);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const product = carouselProducts.find((p) => p.slug === activeSlug)!;
  const features = featureData[activeSlug] ?? featureData["essentiel"];

  const canPrev = railStart > 0;
  const canNext = railStart + VISIBLE < carouselProducts.length;

  function prev() { if (canPrev) setRailStart((s) => s - 1); }
  function next() { if (canNext) setRailStart((s) => s + 1); }

  function select(slug: string, index: number) {
    setActiveSlug(slug);
    // Si le produit sélectionné sort du rail visible, on recadre
    if (index < railStart) setRailStart(index);
    else if (index >= railStart + VISIBLE) setRailStart(index - VISIBLE + 1);
  }

  // translateX est en % de la largeur de la div intérieure, pas du conteneur
  const translateX = -(railStart * (100 / carouselProducts.length));

  return (
    <section className="py-8 md:py-12 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        {/* Kicker + titre + description */}
        <div className="text-center mb-6">
          <span className="kicker text-muted block mb-3">Nos modèles</span>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              type="button" aria-label="Modèle précédent"
              onClick={() => {
                const i = carouselProducts.findIndex((p) => p.slug === activeSlug);
                const prev = products[(i - 1 + carouselProducts.length) % carouselProducts.length];
                select(prev.slug, (i - 1 + carouselProducts.length) % carouselProducts.length);
              }}
              className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink hover:bg-paper-2 transition-all duration-200 press"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex-1 max-w-xl">
              <h2 className="display text-2xl md:text-3xl mb-2">{product.name}</h2>
              <p className="text-muted leading-relaxed text-sm">{product.description}</p>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {carouselProducts.map((p) => (
                  <button key={p.slug} type="button" aria-label={p.name}
                    onClick={() => select(p.slug, carouselProducts.findIndex((x) => x.slug === p.slug))}
                    className={`rounded-full transition-all duration-300 press ${activeSlug === p.slug ? "w-5 h-1.5 bg-ink" : "w-1.5 h-1.5 bg-line hover:bg-muted-soft"}`}
                  />
                ))}
              </div>
            </div>
            <button
              type="button" aria-label="Modèle suivant"
              onClick={() => {
                const i = carouselProducts.findIndex((p) => p.slug === activeSlug);
                const next = products[(i + 1) % carouselProducts.length];
                select(next.slug, (i + 1) % carouselProducts.length);
              }}
              className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink hover:bg-paper-2 transition-all duration-200 press"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Lightbox */}
        {zoomedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 cursor-zoom-out p-4"
            onClick={() => setZoomedImg(null)}>
            <div className="relative w-full h-full max-w-lg">
              <Image src={zoomedImg} alt={product.name} fill sizes="(min-width: 768px) 512px, 100vw" className="object-contain" />
            </div>
            <button type="button" onClick={() => setZoomedImg(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-on-ink text-2xl hover:text-on-ink/60">×</button>
          </div>
        )}

        {/* Cartes arguments — même layout mobile et desktop */}
        <div className="grid grid-cols-[1fr_34%_1fr] gap-2 md:gap-4 items-center">
          <div className="flex flex-col gap-2">
            {features.slice(0, 2).map(({ Icon, title, text }) => (
              <div key={title} className="border border-line rounded-lg p-2 md:p-3">
                <Icon size={12} weight="regular" className="text-muted mb-1" />
                <h3 className="font-semibold text-[8px] md:text-xs tracking-wide uppercase mb-0.5">{title}</h3>
                <p className="text-[8px] md:text-xs text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link href={`/boutique/${product.slug}`} className="w-full aspect-[3/4] md:aspect-[5/6] relative overflow-hidden rounded-xl bg-paper-2 cursor-pointer group block">
              {(product.heroImage ?? product.colours[0]?.images[0]) ? (
                <Image
                  src={product.heroImage ?? product.colours[0].images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 42vw, 42vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : product.category === "Enrênements" ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 20px)" }}>
                  <div className="absolute inset-6 border border-line/60 pointer-events-none rounded-lg" />
                  <span className="kicker text-muted-soft tracking-[0.22em] text-[8px] md:text-[10px]">En cours de création</span>
                  <p className="text-[9px] md:text-xs text-center text-muted-soft px-4 leading-snug">{product.name}</p>
                </div>
              ) : (
                <div className="w-full h-full relative overflow-hidden rounded-xl flex flex-col items-center justify-center gap-2">
                  <span className="text-[8px] md:text-xs tracking-[0.2em] uppercase font-semibold text-muted-soft">Rupture de stock</span>
                  <span className="text-[7px] md:text-[10px] tracking-widest uppercase text-muted-soft/60">Bientôt disponible</span>
                </div>
              )}
            </Link>
            <Link href={`/boutique/${product.slug}`}
              className="inline-flex items-center gap-1.5 bg-ink text-on-ink px-3 md:px-6 py-2 md:py-3 text-[9px] md:text-sm tracking-wide press hover:bg-ink-soft"
            >
              Voir le produit <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {features.slice(2, 4).map(({ Icon, title, text }) => (
              <div key={title} className="border border-line rounded-lg p-2 md:p-3">
                <Icon size={12} weight="regular" className="text-muted mb-1" />
                <h3 className="font-semibold text-[8px] md:text-xs tracking-wide uppercase mb-0.5">{title}</h3>
                <p className="text-[8px] md:text-xs text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rail carrousel */}
        <div className="mt-6 border border-line rounded-2xl p-3 flex items-center gap-3">

          <button type="button" aria-label="Précédent" onClick={prev}
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 press ${canPrev ? "border-line text-muted hover:text-ink hover:border-ink" : "border-line/40 text-line cursor-not-allowed"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Fenêtre glissante */}
          <div className="flex-1 overflow-hidden" ref={railRef}>
            <div
              className="flex transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(${translateX}%)`, width: `${(carouselProducts.length / VISIBLE) * 100}%` }}
            >
              {carouselProducts.map((p, i) => (
                <div key={p.slug} style={{ width: `${100 / carouselProducts.length}%` }} className="px-1">
                  <button
                    type="button"
                    onClick={() => select(p.slug, i)}
                    className={`w-full flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-3 text-center transition-all duration-200 press ${
                      activeSlug === p.slug ? "bg-ink text-on-ink" : "bg-paper-2 text-ink hover:bg-line"
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-wide leading-snug line-clamp-1">{p.name}</p>
                    {p.category === "Enrênements" ? (
                      <p className={`text-[9px] italic ${activeSlug === p.slug ? "text-on-ink-muted" : "text-muted"}`}>En cours de création</p>
                    ) : p.colours.every(c => c.images.length === 0) && p.category === "Rênes" ? (
                      <p className={`text-[9px] italic ${activeSlug === p.slug ? "text-on-ink-muted" : "text-muted"}`}>Rupture de stock</p>
                    ) : (
                      <p className={`text-xs ${activeSlug === p.slug ? "text-on-ink-muted" : "text-muted"}`}>{formatPrice(p.priceEUR)}</p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="button" aria-label="Suivant" onClick={next}
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 press ${canNext ? "border-line text-muted hover:text-ink hover:border-ink" : "border-line/40 text-line cursor-not-allowed"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
