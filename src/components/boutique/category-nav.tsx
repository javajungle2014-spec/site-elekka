"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkle, CaretDown } from "@phosphor-icons/react";

const pieces = [
  { key: "pieces-tetiere",   label: "Têtière" },
  { key: "pieces-muserolle", label: "Muserolle" },
  { key: "pieces-frontal",   label: "Frontal" },
];

type Props = { categories: { key: string; label: string }[] };

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.key ?? "");
  const [piecesOpen, setPiecesOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach(({ key }) => {
      const el = document.getElementById(key);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(key); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  function scrollTo(key: string) {
    document.getElementById(key)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPiecesOpen(false);
  }

  return (
    <div className="sticky top-20 z-30 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        {/* Barre principale */}
        <div className="flex items-center h-12">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none h-full flex-1 min-w-0">

            {/* Catégories normales */}
            {categories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => scrollTo(key)}
                className={`press relative shrink-0 px-4 h-full text-sm font-medium transition-colors duration-200 ${
                  active === key ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {label}
                {active === key && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-ink rounded-full" />
                )}
              </button>
            ))}

            {/* Pièces détachées — dans la nav, ouvre la sous-barre */}
            <button
              type="button"
              onClick={() => setPiecesOpen((v) => !v)}
              className={`press relative shrink-0 flex items-center gap-1.5 px-4 h-full text-sm font-medium transition-colors duration-200 ${
                piecesOpen ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Pièces détachées
              <CaretDown size={11} className={`transition-transform duration-200 ${piecesOpen ? "rotate-180" : ""}`} />
              {piecesOpen && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-ink rounded-full" />}
            </button>

          </nav>

          {/* Créer mon filet */}
          <div className="shrink-0 pl-4">
            <div className="relative">
              <span aria-hidden className="absolute inset-0 rounded-full bg-ink/30 animate-ping" />
              <Link
                href="/boutique/personnaliser"
                className="press btn-create-shimmer group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-ink text-on-ink text-sm font-bold whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <Sparkle size={15} weight="fill" className="group-hover:scale-125 transition-transform duration-300 shrink-0 relative z-10" />
                <span className="relative z-10 tracking-wide">Créer mon filet</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sous-barre Pièces détachées — s'affiche en dessous, pas de problème d'overflow */}
        {piecesOpen && (
          <div className="flex items-center gap-1 border-t border-line h-10">
            {pieces.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => scrollTo(key)}
                className="press relative shrink-0 px-4 h-full text-sm text-muted hover:text-ink transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
