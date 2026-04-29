"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import type { ColourKey, Size } from "@/lib/products";

export type Piece = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  priceEUR: number;
  colours: { key: ColourKey; label: string; swatch: string }[];
  sizes: Size[];
  specs: [string, string][];
};

const leatherClass: Record<ColourKey, string> = {
  "havana-brown": "leather-havana-brown",
  "noir":         "leather-noir",
  "dark-brown":   "leather-dark-brown",
};

export function PieceDetail({ piece }: { piece: Piece }) {
  const [colour, setColour] = useState<ColourKey>(piece.colours[0].key);
  const [size, setSize]     = useState<Size>(piece.sizes[0]);
  const [added, setAdded]   = useState(false);
  const { addItem }         = useCart();

  const activeColour = piece.colours.find(c => c.key === colour) ?? piece.colours[0];

  function handleAdd() {
    addItem({
      slug: piece.slug,
      name: piece.name,
      priceEUR: piece.priceEUR,
      colour,
      colourLabel: activeColour.label,
      colourSwatch: activeColour.swatch,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* Retour */}
      <div className="px-5 md:px-10 pt-8 max-w-[1200px] mx-auto">
        <Link href="/boutique" className="press inline-flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors">
          <ArrowLeft size={12} />
          <span>Boutique</span>
          <span className="text-muted-soft mx-1.5">/</span>
          <span>Pièces détachées</span>
          <span className="text-muted-soft mx-1.5">/</span>
          <span className="text-ink italic" style={{ fontWeight: 300 }}>{piece.name}</span>
        </Link>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 pt-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Visuel */}
          <div className={`aspect-square w-full ${leatherClass[colour]}`}>
            <div className="w-full h-full flex items-end p-6">
              <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                {piece.name} · {activeColour.label}
              </span>
            </div>
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-8">

            <div>
              <p className="kicker text-muted mb-3">Pièces détachées</p>
              <h1 className="display text-5xl md:text-6xl leading-[0.92]">{piece.name}</h1>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-[44ch]">{piece.description}</p>
            </div>

            {/* Couleur */}
            <div>
              <p className="kicker-tight text-muted mb-3">Coloris — {activeColour.label}</p>
              <div className="flex gap-3">
                {piece.colours.map(c => (
                  <button key={c.key} type="button"
                    onClick={() => setColour(c.key)}
                    aria-label={c.label}
                    className={`press w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      colour === c.key ? "border-ink scale-110" : "border-transparent hover:border-ink/30"
                    }`}
                    style={{ background: c.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* Taille */}
            <div>
              <p className="kicker-tight text-muted mb-3">Taille</p>
              <div className="flex gap-2">
                {piece.sizes.map(s => (
                  <button key={s} type="button"
                    onClick={() => setSize(s)}
                    className={`press h-11 px-6 border text-sm font-bold transition-colors ${
                      size === s ? "border-ink bg-ink text-on-ink" : "border-line bg-white hover:border-ink/40"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Prix + CTA */}
            <div className="border-t border-line pt-6 flex items-center justify-between gap-6">
              <div>
                <p className="kicker-tight text-muted mb-1">Prix</p>
                <p className="font-mono text-2xl font-semibold">{formatPrice(piece.priceEUR)}</p>
              </div>
              <button type="button" onClick={handleAdd}
                className="cta-shine press h-12 bg-ink text-on-ink px-8 text-xs font-bold uppercase tracking-[0.18em] hover:bg-ink-soft transition-colors">
                {added ? "Ajouté ✓" : "Ajouter au panier"}
              </button>
            </div>

            {/* Specs */}
            <div className="border-t border-line pt-6 grid grid-cols-2 gap-4">
              {piece.specs.map(([label, value]) => (
                <div key={label}>
                  <p className="kicker-tight text-muted">{label}</p>
                  <p className="mt-1.5 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
