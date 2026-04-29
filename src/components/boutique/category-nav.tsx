"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkle, CaretDown } from "@phosphor-icons/react";

const pieces = [
  { href: "/boutique/tetiere",   label: "Têtière" },
  { href: "/boutique/muserolle", label: "Muserolle" },
  { href: "/boutique/frontal",   label: "Frontal" },
];

type Props = { categories: { key: string; label: string }[] };

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.key ?? "");
  const [piecesOpen, setPiecesOpen] = useState(false);
  const piecesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (piecesRef.current && !piecesRef.current.contains(e.target as Node)) setPiecesOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
  }

  return (
    <div className="sticky top-20 z-30 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-center h-12 flex-1 min-w-0">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none h-full flex-1 min-w-0">
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
          </nav>

          {/* Dropdown Pièces détachées — en dehors du overflow pour ne pas être coupé */}
          <div ref={piecesRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setPiecesOpen((v) => !v)}
              className={`press relative flex items-center gap-1 px-4 h-12 text-sm font-medium transition-colors duration-200 ${
                piecesOpen ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Pièces détachées
              <CaretDown size={11} className={`transition-transform duration-200 ${piecesOpen ? "rotate-180" : ""}`} />
              {piecesOpen && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-ink rounded-full" />}
            </button>

            {piecesOpen && (
              <div className="absolute top-full right-0 mt-0 w-48 bg-paper border border-line shadow-lg z-[100]">
                {pieces.map((piece) => (
                  <Link
                    key={piece.href}
                    href={piece.href}
                    onClick={() => setPiecesOpen(false)}
                    className="block px-4 py-3 text-sm text-muted hover:text-ink hover:bg-paper-2 transition-colors border-b border-line last:border-0"
                  >
                    {piece.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
      </div>
    </div>
  );
}
