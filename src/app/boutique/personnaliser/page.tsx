"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, ArrowUpRight } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Config = {
  structure: string | null;
  frontal: string | null;
  muserolle: string | null;
  colour: string | null;
  reins: string | null;
};

/* ─── Données ────────────────────────────────────────────────────────── */
const LEATHER_COLORS: Record<string, string> = {
  "havana-brown": "#3D2615",
  "noir": "#1a1815",
  "dark-brown": "#2e1a10",
};

const STEPS = [
  {
    key: "structure",
    label: "Structure",
    sub: "La base de votre filet",
    options: [
      { key: "classique",   label: "Classique",   desc: "Têtière standard, conception anglaise traditionnelle" },
      { key: "anatomique",  label: "Anatomique",  desc: "Têtière incurvée — soulage la nuque et les oreilles" },
    ],
  },
  {
    key: "frontal",
    label: "Frontal",
    sub: "La pièce qui traverse le front",
    options: [
      { key: "classique",   label: "Classique",    desc: "Frontal rectiligne, sobre et élégant" },
      { key: "large",       label: "Anatomique large", desc: "5,5 cm de large — répartit la pression sur le front" },
    ],
  },
  {
    key: "muserolle",
    label: "Muserolle",
    sub: "Le contact sur le chanfrein",
    options: [
      { key: "simple",      label: "Simple",       desc: "Muserolle française classique, fermeture standard" },
      { key: "rembourree",  label: "Rembourrée",   desc: "2,5 à 3 cm d'épaisseur — protège et adoucit le contact" },
    ],
  },
  {
    key: "colour",
    label: "Coloris",
    sub: "La couleur du cuir pleine fleur",
    options: [
      { key: "havana-brown", label: "Havana Brown", desc: "Brun chaud profond, patine naturelle" },
      { key: "noir",         label: "Noir",         desc: "Noir intense, élégant en toutes circonstances" },
    ],
  },
  {
    key: "reins",
    label: "Rênes",
    sub: "La connexion entre vos mains et le mors",
    options: [
      { key: "aucune",      label: "Sans rênes",        desc: "Filet seul",                          delta: 0,     note: null },
      { key: "caoutchouc",  label: "Rênes caoutchouc",  desc: "Anti-glisse, toutes conditions",      delta: 0,     note: "Offertes" },
      { key: "tissu",       label: "Rênes tissu",        desc: "Légères et confortables en main",     delta: 42.49, note: "-15 %" },
    ],
  },
];

const BASE_PRICE = 95;
const ROMAN = ["", "I", "II", "III", "IV", "V"];

/* ─── Visuel assemblage ──────────────────────────────────────────────── */
function BridleVisual({ config, step }: { config: Config; step: number }) {
  const colour = config.colour ? LEATHER_COLORS[config.colour] : null;

  function part(active: boolean, style: React.CSSProperties, rounded = "4px") {
    return {
      position: "absolute" as const,
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      borderRadius: rounded,
      backgroundColor: active && colour ? colour : "rgba(255,255,255,0.07)",
      boxShadow: active && colour ? `inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.4)` : "none",
      border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
      opacity: active ? 1 : 0.4,
      ...style,
    };
  }

  const hasStructure = !!config.structure;
  const hasFrontal = !!config.frontal;
  const hasMuserolle = !!config.muserolle;
  const hasColour = !!config.colour;
  const hasReins = config.reins && config.reins !== "aucune";
  const frontralHeight = config.frontal === "large" ? "6%" : "3.5%";
  const muserolleHeight = config.muserolle === "rembourree" ? "7%" : "4%";
  const filled = Object.values(config).filter(Boolean).length;

  return (
    <div className="relative overflow-hidden select-none" style={{ background: "#0a0908", aspectRatio: "3/4" }}>
      {/* Ambiance lumineuse */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

      {/* TÊTIÈRE — barre horizontale du haut */}
      <div style={part(hasStructure, { top: "12%", left: "12%", right: "12%", height: "3.5%" })} />

      {/* MONTANT GAUCHE */}
      <div style={part(hasStructure, { top: "12%", left: "15%", width: "5.5%", height: "44%", borderRadius: "3px" })} />

      {/* MONTANT DROIT */}
      <div style={part(hasStructure, { top: "12%", right: "15%", width: "5.5%", height: "44%", borderRadius: "3px" })} />

      {/* SOUS-GORGE — diagonale légère */}
      <div style={part(hasStructure, { top: "20%", left: "20%", width: "22%", height: "2.5%", transform: "rotate(8deg)", borderRadius: "3px", opacity: hasStructure ? 0.6 : 0.2 })} />

      {/* FRONTAL */}
      <div style={part(hasFrontal, { top: "21%", left: "19%", right: "19%", height: frontralHeight })} />

      {/* MUSEROLLE */}
      <div style={part(hasMuserolle, { top: "46%", left: "17%", right: "17%", height: muserolleHeight })} />

      {/* ATTACHES MUSEROLLE GAUCHE */}
      <div style={part(hasMuserolle, { top: "45%", left: "19%", width: "3%", height: "10%", opacity: hasMuserolle ? 0.5 : 0.15, borderRadius: "2px" })} />

      {/* ATTACHES MUSEROLLE DROIT */}
      <div style={part(hasMuserolle, { top: "45%", right: "19%", width: "3%", height: "10%", opacity: hasMuserolle ? 0.5 : 0.15, borderRadius: "2px" })} />

      {/* RÊNE GAUCHE */}
      <div style={part(!!hasReins, { top: "56%", left: "17.5%", width: "4%", height: "36%", borderRadius: "2px" })} />

      {/* RÊNE DROITE */}
      <div style={part(!!hasReins, { top: "56%", right: "17.5%", width: "4%", height: "36%", borderRadius: "2px" })} />

      {/* Labels flottants */}
      <div className="absolute inset-0 pointer-events-none">
        {hasStructure && (
          <div className="absolute" style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}>
            <span className="kicker-tight text-white/30 text-[8px] tracking-[0.2em] whitespace-nowrap">TÊTIÈRE</span>
          </div>
        )}
        {hasFrontal && (
          <div className="absolute" style={{ top: "18%", left: "50%", transform: "translateX(-50%)" }}>
            <span className="kicker-tight text-white/30 text-[8px] tracking-[0.2em] whitespace-nowrap">FRONTAL</span>
          </div>
        )}
        {hasMuserolle && (
          <div className="absolute" style={{ top: "42%", left: "50%", transform: "translateX(-50%)" }}>
            <span className="kicker-tight text-white/30 text-[8px] tracking-[0.2em] whitespace-nowrap">MUSEROLLE</span>
          </div>
        )}
      </div>

      {/* Indicateur progression */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div className="h-full bg-white/40 transition-all duration-700" style={{ width: `${(filled / 5) * 100}%` }} />
      </div>

      {/* Info bas */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/25 tracking-widest">
          Elekka · Sur mesure
        </span>
        <span className="font-mono text-[9px] text-white/35 tracking-widest">
          {filled} / 5
        </span>
      </div>
    </div>
  );
}

/* ─── Composant principal ────────────────────────────────────────────── */
export default function PersonnaliserPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<Config>({
    structure: null, frontal: null, muserolle: null, colour: null, reins: null,
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const step = STEPS[currentStep];
  const filled = Object.values(config).filter(Boolean).length;
  const complete = filled === 5;

  const total = BASE_PRICE + (config.reins === "tissu" ? 42.49 : 0);

  function selectOption(value: string) {
    setConfig(prev => ({ ...prev, [step.key]: value }));
  }

  function next() {
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
  }

  function prev() {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  }

  function handleAdd() {
    if (!complete) return;
    addItem({
      slug: "sur-mesure",
      name: `Filet Elekka Sur Mesure — ${config.structure} / ${config.colour}`,
      priceEUR: total,
      colour: (config.colour ?? "noir") as import("@/lib/products").ColourKey,
      colourLabel: config.colour === "havana-brown" ? "Havana Brown" : "Noir",
      colourSwatch: LEATHER_COLORS[config.colour ?? "noir"],
      size: "Full",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const currentValue = config[step?.key as keyof Config];
  const canNext = !!currentValue;

  return (
    <div className="min-h-screen bg-paper pt-20">

      {/* ── En-tête ── */}
      <div className="px-5 md:px-12 pt-8 pb-0">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors press mb-8">
          <ArrowLeft size={12} /> Boutique
        </Link>

        <div className="max-w-[1200px] mx-auto">
          <p className="kicker text-muted">Configuration · Sur mesure</p>
          <h1 className="display text-4xl md:text-6xl mt-3 leading-[0.95]">
            Personnalisez<br />
            <span className="text-muted">votre filet.</span>
          </h1>
          <p className="mt-4 text-base text-muted max-w-[48ch] leading-relaxed">
            Composez pièce par pièce. Même exigence qu'un filet Elekka, vos propres choix.
            <span className="text-ink font-medium"> À partir de {formatPrice(BASE_PRICE)}.</span>
          </p>
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div className="px-5 md:px-12 mt-12 pb-32 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Visuel sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <BridleVisual config={config} step={currentStep} />

            {/* Récapitulatif sous le visuel */}
            {filled > 0 && (
              <div className="mt-4 border border-line divide-y divide-line">
                {STEPS.map(s => {
                  const val = config[s.key as keyof Config];
                  const opt = s.options.find(o => o.key === val);
                  if (!val) return null;
                  return (
                    <div key={s.key} className="flex items-center justify-between px-4 py-2.5">
                      <span className="kicker-tight text-muted">{s.label}</span>
                      <span className="text-xs font-medium text-ink">{opt?.label}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between px-4 py-3 bg-paper-2">
                  <span className="kicker-tight text-ink">Total estimé</span>
                  <span className="font-mono font-semibold text-sm">{formatPrice(total)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Configurateur */}
          <div className="lg:col-span-7">

            {/* Barre de progression */}
            <div className="flex items-center gap-2 mb-10">
              {STEPS.map((s, i) => {
                const done = !!config[s.key as keyof Config];
                const active = i === currentStep;
                return (
                  <button key={s.key} type="button" onClick={() => setCurrentStep(i)}
                    className="press flex items-center gap-2 group">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all duration-300 ${
                      done ? "bg-ink border-ink text-on-ink" :
                      active ? "border-ink text-ink" :
                      "border-line text-muted"
                    }`}>
                      {done ? <Check size={11} weight="bold" /> : ROMAN[i + 1]}
                    </div>
                    <span className={`text-[11px] tracking-wide hidden sm:block transition-colors ${active ? "text-ink" : "text-muted"}`}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`hidden sm:block w-6 h-px ml-1 ${done ? "bg-ink" : "bg-line"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Étape courante */}
            <div className="border-t border-ink pt-8">
              <div className="flex items-baseline gap-4 mb-2">
                <p className="kicker-tight text-muted">Étape {ROMAN[currentStep + 1]} sur {ROMAN[STEPS.length]}</p>
              </div>
              <h2 className="display text-3xl md:text-4xl mt-1">{step.label}</h2>
              <p className="text-muted text-sm mt-2 italic" style={{ fontWeight: 300 }}>{step.sub}</p>
            </div>

            {/* Options */}
            <div className="mt-8 space-y-3">
              {step.options.map((opt, idx) => {
                const isActive = currentValue === opt.key;
                const delta = (opt as { delta?: number }).delta;
                const note = (opt as { note?: string | null }).note;
                return (
                  <button key={opt.key} type="button"
                    onClick={() => selectOption(opt.key)}
                    className={`choice press w-full text-left p-5 md:p-6 flex items-center justify-between gap-6 ${isActive ? "choice--active" : ""}`}>
                    <div className="flex items-start gap-5 min-w-0">
                      <span className={`font-mono text-[10px] tracking-wider mt-1 shrink-0 ${isActive ? "text-ink" : "text-muted-soft"}`}>
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="display text-xl">{opt.label}</p>
                          {note && (
                            <span className="bg-ink text-on-ink text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-medium">{note}</span>
                          )}
                        </div>
                        <p className="text-[13px] text-muted mt-1.5 leading-snug">{opt.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {delta !== undefined && (
                        <p className={`font-mono text-sm tabular-nums ${isActive ? "text-ink" : "text-muted"}`}>
                          {delta === 0 ? "—" : `+ ${formatPrice(delta)}`}
                        </p>
                      )}
                      <span className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors shrink-0 ${
                        isActive ? "border-ink bg-ink text-on-ink" : "border-line"
                      }`}>
                        {isActive && <Check size={11} weight="bold" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-4">
              <button type="button" onClick={prev} disabled={currentStep === 0}
                className="press inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors disabled:opacity-30">
                <ArrowLeft size={14} /> Précédent
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button type="button" onClick={next} disabled={!canNext}
                  className={`press inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors ${
                    canNext ? "bg-ink text-on-ink hover:bg-ink-soft" : "bg-ink/20 text-ink/40 cursor-not-allowed"
                  }`}>
                  Étape suivante <ArrowRight size={14} />
                </button>
              ) : (
                <button type="button" onClick={handleAdd} disabled={!complete}
                  className={`cta-shine press inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors ${
                    complete ? "bg-ink text-on-ink hover:bg-ink-soft" : "bg-ink/20 text-ink/40 cursor-not-allowed"
                  }`}>
                  <ShoppingBag size={15} />
                  {added ? "Ajouté au panier !" : complete ? `Ajouter — ${formatPrice(total)}` : "Complétez toutes les étapes"}
                </button>
              )}
            </div>

            {/* Rassurant */}
            {complete && !added && (
              <div className="mt-6 border-t border-line pt-6 text-xs text-muted space-y-1.5">
                <p>Livraison offerte · Cuir pleine fleur · Retours 14 jours</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
