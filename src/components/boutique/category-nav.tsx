"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sliders } from "@phosphor-icons/react";

type Props = { categories: { key: string; label: string }[] };

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.key ?? "");

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
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none h-12">
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

          <div className="ml-auto shrink-0 pl-4 border-l border-line">
            <Link
              href="/boutique/personnaliser"
              className="press flex items-center gap-2 px-4 py-1.5 bg-ink text-on-ink text-xs font-medium hover:bg-ink-soft transition-colors whitespace-nowrap"
            >
              <Sliders size={13} />
              Personnaliser mon filet
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
