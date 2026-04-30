"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import type { ColourKey, Size } from "@/lib/products";

export type PieceModel = {
  key: string;
  label: string;
  desc: string;
  priceEUR?: number;
};

export type Piece = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  priceEUR: number;
  models: PieceModel[];
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
  const [model, setModel]   = useState<string>(piece.models[0]?.key ?? "");
  const [colour, setColour] = useState<ColourKey>(piece.colours[0].key);
  const [size, setSize]     = useState<Size>(piece.sizes[0]);
  const [added, setAdded]   = useState(false);
  const { addItem }         = useCart();

  const activeColour = piece.colours.find(c => c.key === colour) ?? piece.colours[0];
  const activeModel  = piece.models.find(m => m.key === model) ?? piece.models[0];
  const price        = activeModel?.priceEUR ?? piece.priceEUR;

  function handleAdd() {
    addItem({
      slug: piece.slug,
      name: `${piece.name} — ${activeModel?.label ?? ""}`,
      priceEUR: price,
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
                {piece.name} · {activeModel?.label} · {activeColour.label}
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

            {/* Modèle */}
            <div>
              <p className="kicker-tight text-muted mb-3">Modèle</p>
              <div className="flex flex-col gap-2">
                {piece.models.map(m => {
                  const isActive = model === m.key;
                  return (
                    <button key={m.key} type="button"
                      onClick={() => setModel(m.key)}
                      className={`press text-left p-4 border transition-all duration-200 flex items-start justify-between gap-4 ${
                        isActive ? "border-ink bg-ink/[0.03]" : "border-line hover:border-ink/30"
                      }`}>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isActive ? "text-ink" : "text-ink/70"}`}>{m.label}</p>
                        <p className="text-xs text-muted mt-0.5 leading-snug">{m.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {m.priceEUR !== undefined && (
                          <span className={`font-mono text-sm ${isActive ? "text-ink" : "text-muted"}`}>
                            {formatPrice(m.priceEUR)}
                          </span>
                        )}
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? "border-ink bg-ink" : "border-line"
                        }`}>
                          {isActive && <Check size={8} weight="bold" className="text-on-ink" />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
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
                <p className="font-mono text-2xl font-semibold">{formatPrice(price)}</p>
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
