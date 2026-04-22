"use client";

import { useState, useRef } from "react";
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
    { Icon: Wrench,  title: "Quincaillerie inox",   text: "Argentée, robuste, sans altération dans le temps." },
    { Icon: Palette, title: "Deux coloris",         text: "Havana Brown ou Noir — tailles Full et Cob." },
  ],
  signature: [
    { Icon: Heart,  title: "Têtière anatomique",   text: "Incurvée pour libérer la nuque et les os de la tempe." },
    { Icon: Shield, title: "Muserolle rembourrée",  text: "2,5 à 3 cm de rembourrage, fermeture confortable côté gauche." },
    { Icon: Ruler,  title: "Browband ajusté",       text: "Full 17\" / Cob 16\" — sans pression latérale." },
    { Icon: Leaf,   title: "Rênes caoutchouc",      text: "Incluses — adhérence optimale en toutes conditions." },
  ],
  fusion: [
    { Icon: Ruler,                  title: "Browband anatomique",  text: "Large 5,5 cm — répartit la pression sur tout le front." },
    { Icon: ArrowsCounterClockwise, title: "Triple attache",       text: "Épaisse, ovale ou rectangulaire — interchangeable selon le cheval." },
    { Icon: Star,                   title: "Conception modulaire", text: "Un seul bridon, trois configurations muserolle différentes." },
    { Icon: Leaf,                   title: "Rênes caoutchouc",     text: "Incluses — adhérence optimale en toutes conditions." },
  ],
  "licol-1": [
    { Icon: Leaf,   title: "Cuir pleine fleur",  text: "Résistant et souple dès le premier usage, pour un usage quotidien durable." },
    { Icon: Wrench, title: "Quincaillerie inox",  text: "Boucles et anneaux inox argentés, sans altération dans le temps." },
    { Icon: Ruler,  title: "Réglage nuque",       text: "Ajustable pour s'adapter précisément à la morphologie du cheval." },
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
    { Icon: Wrench,       title: "Boucles inox",        text: "Finition soignée, compatible avec tous les bridons Elekka." },
    { Icon: Ruler,        title: "Longueur standard",   text: "Adaptée à toutes les disciplines, Full et Cob disponibles." },
  ],
  "renes-2": [
    { Icon: Leaf,         title: "Cuir lisse pleine fleur", text: "Sensation directe dans la main, pour les cavaliers qui privilégient le contact pur." },
    { Icon: Star,         title: "Finition soignée",        text: "Surface lisse et régulière, sans couture apparente sur la longueur." },
    { Icon: Wrench,       title: "Boucles inox",            text: "Finition soignée, compatible avec tous les bridons Elekka." },
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

export function ProductFeature() {
  const [activeSlug, setActiveSlug] = useState(products[0].slug);
  const [railStart, setRailStart] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.slug === activeSlug)!;
  const features = featureData[activeSlug] ?? featureData["essentiel"];

  const canPrev = railStart > 0;
  const canNext = railStart + VISIBLE < products.length;

  function prev() { if (canPrev) setRailStart((s) => s - 1); }
  function next() { if (canNext) setRailStart((s) => s + 1); }

  function select(slug: string, index: number) {
    setActiveSlug(slug);
    // Si le produit sélectionné sort du rail visible, on recadre
    if (index < railStart) setRailStart(index);
    else if (index >= railStart + VISIBLE) setRailStart(index - VISIBLE + 1);
  }

  // translateX est en % de la largeur de la div intérieure, pas du conteneur
  const translateX = -(railStart * (100 / products.length));

  return (
    <section className="py-14 md:py-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        {/* Kicker + titre + description */}
        <div className="text-center mb-10">
          <span className="kicker text-muted block mb-6">Nos modèles</span>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              type="button" aria-label="Modèle précédent"
              onClick={() => {
                const i = products.findIndex((p) => p.slug === activeSlug);
                const prev = products[(i - 1 + products.length) % products.length];
                select(prev.slug, (i - 1 + products.length) % products.length);
              }}
              className="shrink-0 w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink hover:bg-paper-2 transition-all duration-200 press"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex-1 max-w-xl">
              <h2 className="display text-3xl md:text-4xl mb-3">{product.name}</h2>
              <p className="text-muted leading-relaxed text-sm">{product.description}</p>
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {products.map((p) => (
                  <button key={p.slug} type="button" aria-label={p.name}
                    onClick={() => select(p.slug, products.findIndex((x) => x.slug === p.slug))}
                    className={`rounded-full transition-all duration-300 press ${activeSlug === p.slug ? "w-5 h-1.5 bg-ink" : "w-1.5 h-1.5 bg-line hover:bg-muted-soft"}`}
                  />
                ))}
              </div>
            </div>
            <button
              type="button" aria-label="Modèle suivant"
              onClick={() => {
                const i = products.findIndex((p) => p.slug === activeSlug);
                const next = products[(i + 1) % products.length];
                select(next.slug, (i + 1) % products.length);
              }}
              className="shrink-0 w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink hover:bg-paper-2 transition-all duration-200 press"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Cartes arguments */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px_1fr] gap-6 items-center">
          <div className="flex flex-col gap-4">
            {features.slice(0, 2).map(({ Icon, title, text }) => (
              <div key={title} className="border border-line rounded-xl p-6">
                <Icon size={24} weight="regular" className="text-muted mb-3" />
                <h3 className="font-semibold text-sm tracking-wide uppercase mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-[3/4] bg-paper-2 border border-dashed border-line rounded-xl flex flex-col items-center justify-center gap-3 text-muted-soft">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-30">
                <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 26l9-7 7 6 5-4 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="text-xs tracking-widest uppercase">Photo à venir</span>
            </div>
            <Link href={`/boutique/${product.slug}`}
              className="inline-flex items-center gap-2 bg-ink text-on-ink px-6 py-3 text-sm tracking-wide press hover:bg-ink-soft"
            >
              Voir le produit <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {features.slice(2, 4).map(({ Icon, title, text }) => (
              <div key={title} className="border border-line rounded-xl p-6">
                <Icon size={24} weight="regular" className="text-muted mb-3" />
                <h3 className="font-semibold text-sm tracking-wide uppercase mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rail carrousel */}
        <div className="mt-10 border border-line rounded-2xl p-3 flex items-center gap-3">

          <button type="button" aria-label="Précédent" onClick={prev}
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 press ${canPrev ? "border-line text-muted hover:text-ink hover:border-ink" : "border-line/40 text-line cursor-not-allowed"}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Fenêtre glissante */}
          <div className="flex-1 overflow-hidden" ref={railRef}>
            <div
              className="flex transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(${translateX}%)`, width: `${(products.length / VISIBLE) * 100}%` }}
            >
              {products.map((p, i) => (
                <div key={p.slug} style={{ width: `${100 / products.length}%` }} className="px-1">
                  <button
                    type="button"
                    onClick={() => select(p.slug, i)}
                    className={`w-full flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-3 text-center transition-all duration-200 press ${
                      activeSlug === p.slug ? "bg-ink text-on-ink" : "bg-paper-2 text-ink hover:bg-line"
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-wide leading-snug line-clamp-1">{p.name}</p>
                    <p className={`text-xs ${activeSlug === p.slug ? "text-on-ink-muted" : "text-muted"}`}>{formatPrice(p.priceEUR)}</p>
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
