"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Config = {
  structure:   string | null;
  discipline:  string | null;
  tetiere:     string | null;
  frontal:     string | null;
  muserolle:   string | null;
  colour:      string | null;
  taille:      string | null;
  reins:       string | null;
  enrenement:  string | null;
};

/* ─── Données ────────────────────────────────────────────────────────── */
const LEATHER_COLORS: Record<string, string> = {
  "havana-brown": "#3D2615",
  "noir":         "#1a1815",
  "dark-brown":   "#2e1a10",
};
const COLOUR_LABELS: Record<string, string> = {
  "havana-brown": "Havana Brown",
  "noir":         "Noir",
};

const STEPS = [
  {
    key: "tetiere", label: "Têtière", sub: "La pièce principale, sur la nuque",
    options: [
      { key: "classique", label: "Classique",            desc: "Conception anglaise traditionnelle" },
      { key: "signature", label: "Anatomique Signature", desc: "Incurvée — soulage la nuque" },
      { key: "duo",       label: "Anatomique Duo",       desc: "Double rembourrage, confort maximal" },
    ],
  },
  {
    key: "frontal", label: "Frontal", sub: "La pièce qui traverse le front",
    options: [
      { key: "classique",  label: "Classique",   desc: "Rectiligne, sobre et élégant" },
      { key: "anatomique", label: "Anatomique",  desc: "Incurvé, suit la morphologie" },
      { key: "signature",  label: "Signature",   desc: "Large 5,5 cm, répartit la pression" },
    ],
  },
  {
    key: "muserolle", label: "Muserolle", sub: "Le contact sur le chanfrein",
    options: [
      { key: "simple",     label: "Simple",         desc: "Française classique, fermeture standard" },
      { key: "rembourree", label: "Rembourrée",     desc: "2,5 à 3 cm — protège le contact" },
      { key: "triple",     label: "Triple attache", desc: "Interchangeable : épaisse, ovale, rect." },
    ],
  },
  {
    key: "reins", label: "Rênes", sub: "La connexion mains–mors",
    options: [
      { key: "classique",  label: "Classiques",  desc: "Cuir pleine fleur assorti, 145 cm",     delta: 0,     note: "Offertes" },
      { key: "anatomique", label: "Anatomique",  desc: "Grip intégré, prise assurée par tous temps", delta: 42.49, note: "−15 %" },
      { key: "signature",  label: "Signature",   desc: "Cuir souple surpiqué, finition premium", delta: 55.24, note: "−15 %" },
    ],
  },
  {
    key: "colour", label: "Coloris", sub: "Cuir pleine fleur",
    options: [
      { key: "havana-brown", label: "Havana Brown", desc: "Brun chaud profond, patine naturelle" },
      { key: "noir",         label: "Noir",          desc: "Noir intense, élégant en toutes circonstances" },
    ],
  },
  {
    key: "taille", label: "Taille", sub: "Mesures sur le chanfrein",
    options: [
      { key: "full", label: "Full", desc: "Chevaux de sport adultes — standard" },
      { key: "cob",  label: "Cob",  desc: "Poneys grands gabarits, morphologie fine" },
    ],
  },
  {
    key: "discipline", label: "Discipline", sub: "Votre pratique principale",
    options: [
      { key: "obstacle", label: "Saut d'obstacle", desc: "Obstacle et cross" },
      { key: "dressage", label: "Dressage",         desc: "Travail sur le plat" },
      { key: "multi",    label: "Multi",             desc: "Toutes pratiques" },
    ],
  },
  {
    key: "enrenement", label: "Enrênement", sub: "Équipement complémentaire",
    options: [
      { key: "aucun",      label: "Sans",        desc: "Filet seul, configuration épurée",     delta: 0,     note: null },
      { key: "tylman",     label: "Tylman",      desc: "Aide à la décontraction",              delta: 50.99, note: "−15 %" },
      { key: "martingale", label: "Martingale",  desc: "Fixe réglable, sécurité renforcée",   delta: 50.99, note: "−15 %" },
    ],
  },
];

const REQUIRED   = ["tetiere", "frontal", "muserolle", "colour", "taille", "reins", "enrenement"];
const BASE_PRICE = 95;

/* ─── Visuel ──────────────────────────────────────────────────────────── */
function BridleVisual({ config }: { config: Config }) {
  const colour = config.colour ? LEATHER_COLORS[config.colour] : null;

  function part(active: boolean, style: React.CSSProperties): React.CSSProperties {
    return {
      position: "absolute",
      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
      borderRadius: 4,
      backgroundColor: active && colour ? colour : "rgba(255,255,255,0.06)",
      boxShadow: active && colour ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 12px rgba(0,0,0,0.5)" : "none",
      border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
      opacity: active ? 1 : 0.3,
      ...style,
    };
  }

  const hasStr  = !!config.tetiere;
  const hasFro  = !!config.frontal;
  const hasMus  = !!config.muserolle;
  const hasRei  = config.reins && config.reins !== "aucune";
  const frontalH   = config.frontal === "signature" ? "6%" : "3.5%";
  const muserolleH = config.muserolle === "rembourree" ? "7%" : "4%";

  return (
    <div className="relative overflow-hidden w-full h-full select-none"
      style={{ background: "#0a0908" }}>
      {/* lumière showroom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

      <div style={part(hasStr, { top: "12%", left: "12%", right: "12%", height: "3.5%" })} />
      <div style={part(hasStr, { top: "12%", left: "15%", width: "5.5%", height: "44%", borderRadius: 3 })} />
      <div style={part(hasStr, { top: "12%", right: "15%", width: "5.5%", height: "44%", borderRadius: 3 })} />
      <div style={part(hasStr, { top: "20%", left: "20%", width: "22%", height: "2.5%", transform: "rotate(8deg)", borderRadius: 3, opacity: hasStr ? 0.55 : 0.15 })} />
      <div style={part(hasFro, { top: "21%", left: "19%", right: "19%", height: frontalH })} />
      <div style={part(hasMus, { top: "46%", left: "17%", right: "17%", height: muserolleH })} />
      <div style={part(hasMus, { top: "45%", left: "19%", width: "3%", height: "10%", opacity: hasMus ? 0.45 : 0.12, borderRadius: 2 })} />
      <div style={part(hasMus, { top: "45%", right: "19%", width: "3%", height: "10%", opacity: hasMus ? 0.45 : 0.12, borderRadius: 2 })} />
      <div style={part(!!hasRei, { top: "56%", left: "17.5%", width: "4%", height: "36%", borderRadius: 2 })} />
      <div style={part(!!hasRei, { top: "56%", right: "17.5%", width: "4%", height: "36%", borderRadius: 2 })} />

      {/* labels */}
      <div className="absolute inset-0 pointer-events-none text-white/25">
        {hasStr && <span className="absolute text-[8px] tracking-[0.2em] uppercase font-medium whitespace-nowrap" style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}>Têtière</span>}
        {hasFro && <span className="absolute text-[8px] tracking-[0.2em] uppercase font-medium whitespace-nowrap" style={{ top: "18%", left: "50%", transform: "translateX(-50%)" }}>Frontal</span>}
        {hasMus && <span className="absolute text-[8px] tracking-[0.2em] uppercase font-medium whitespace-nowrap" style={{ top: "42%", left: "50%", transform: "translateX(-50%)" }}>Muserolle</span>}
      </div>

      {/* signature bas */}
      <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
        <span className="font-mono text-[9px] text-white/20 tracking-widest">ELEKKA</span>
        {config.colour && (
          <span className="font-mono text-[9px] text-white/35 tracking-widest uppercase">{COLOUR_LABELS[config.colour]}</span>
        )}
      </div>
    </div>
  );
}

/* ─── Option verticale (panneaux latéraux) ───────────────────────────── */
type AnyStep = typeof STEPS[number];

function SideGroup({ step, config, pick }: { step: AnyStep; config: Config; pick: (k: keyof Config, v: string) => void }) {
  const current = config[step.key as keyof Config];
  return (
    <div className="flex flex-col">
      <div className="px-5 pt-5 pb-3">
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/80 font-bold">{step.label}</p>
        <p className="text-[11px] text-white/60 mt-0.5 leading-snug">{step.sub}</p>
      </div>
      <div className="flex flex-col gap-0.5 px-3 pb-4">
        {step.options.map((opt) => {
          const active = current === opt.key;
          const note = (opt as { note?: string | null }).note;
          const delta = (opt as { delta?: number }).delta;
          return (
            <button key={opt.key} type="button"
              onClick={() => pick(step.key as keyof Config, opt.key)}
              className={`press group flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                active ? "bg-white/10" : "hover:bg-white/5"
              }`}>
              <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center transition-all duration-200 ${
                active ? "border-white bg-white" : "border-white/60"
              }`}>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0a0908] block" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-[14px] font-semibold leading-tight transition-colors ${active ? "text-white" : "text-white/90 group-hover:text-white"}`}>
                    {opt.label}
                  </p>
                  {note && (
                    <span className="text-[9px] border border-white/40 text-white/70 px-1.5 py-0.5 rounded tracking-wide">{note}</span>
                  )}
                </div>
                <p className={`text-[12px] leading-snug mt-1 transition-colors ${active ? "text-white/80" : "text-white/65"}`}>{opt.desc}</p>
                {delta !== undefined && delta > 0 && (
                  <p className={`text-[11px] font-mono mt-1 ${active ? "text-white/80" : "text-white/55"}`}>+ {formatPrice(delta)}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Option horizontale (barre du bas) ──────────────────────────────── */
function BottomGroup({ step, config, pick }: { step: AnyStep; config: Config; pick: (k: keyof Config, v: string) => void }) {
  const current = config[step.key as keyof Config];
  return (
    <div className="flex flex-col px-6 py-5">
      <p className="text-[11px] tracking-[0.18em] uppercase text-white/80 font-bold mb-3">{step.label}</p>
      <div className="flex gap-2 flex-wrap">
        {step.options.map((opt) => {
          const active = current === opt.key;
          const note = (opt as { note?: string | null }).note;
          const delta = (opt as { delta?: number }).delta;
          return (
            <button key={opt.key} type="button"
              onClick={() => pick(step.key as keyof Config, opt.key)}
              className={`press flex flex-col gap-0.5 px-4 py-2.5 rounded-lg border text-left transition-all duration-200 ${
                active ? "border-white bg-white/12 text-white" : "border-white/35 text-white/85 hover:border-white/60 hover:text-white"
              }`}>
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold whitespace-nowrap">{opt.label}</p>
                {note && <span className="text-[9px] text-white/60 border border-white/30 px-1.5 rounded">{note}</span>}
              </div>
              {delta !== undefined && delta > 0 && (
                <p className="text-[10px] font-mono text-white/55">+{formatPrice(delta)}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Page principale ────────────────────────────────────────────────── */
export default function PersonnaliserPage() {
  const [config, setConfig] = useState<Config>({
    structure: null, discipline: null, tetiere: null, frontal: null,
    muserolle: null, colour: null, taille: null, reins: null, enrenement: null,
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "instant" });
  }, []);

  function pick(key: keyof Config, val: string) {
    setConfig(prev => ({ ...prev, [key]: val }));
  }

  const reinsDelta = (STEPS.find(s => s.key === "reins")?.options.find(o => o.key === config.reins) as { delta?: number } | undefined)?.delta ?? 0;
  const enrDelta   = (STEPS.find(s => s.key === "enrenement")?.options.find(o => o.key === config.enrenement) as { delta?: number } | undefined)?.delta ?? 0;
  const total      = BASE_PRICE + reinsDelta + enrDelta;
  const filled     = REQUIRED.filter(k => config[k as keyof Config]).length;
  const complete   = filled === REQUIRED.length;

  function handleAdd() {
    if (!complete) return;
    addItem({
      slug: "sur-mesure",
      name: `Filet Elekka Sur Mesure — ${config.tetiere} / ${config.colour}`,
      priceEUR: total,
      colour: (config.colour ?? "noir") as import("@/lib/products").ColourKey,
      colourLabel: COLOUR_LABELS[config.colour ?? "noir"] ?? "Noir",
      colourSwatch: LEATHER_COLORS[config.colour ?? "noir"],
      size: (config.taille ?? "Full") as "Full" | "Cob",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const colourStep     = STEPS.find(s => s.key === "colour")!;
  const teteireStep    = STEPS.find(s => s.key === "tetiere")!;
  const frontalStep    = STEPS.find(s => s.key === "frontal")!;
  const muserolleStep  = STEPS.find(s => s.key === "muserolle")!;
  const reinsStep      = STEPS.find(s => s.key === "reins")!;
  const tailleStep     = STEPS.find(s => s.key === "taille")!;
  const disciplineStep = STEPS.find(s => s.key === "discipline")!;
  const enrenementStep = STEPS.find(s => s.key === "enrenement")!;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0908", color: "#fafaf9" }}>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 md:px-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,9,8,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <Link href="/boutique"
            className="press flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Boutique
          </Link>
          <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
          <span className="text-[12px] font-semibold tracking-wide text-white/70 hidden sm:block">Configurer mon filet</span>
        </div>

        <div className="flex items-center gap-4">
          {/* progression */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex gap-1">
              {REQUIRED.map((k) => (
                <div key={k} className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  config[k as keyof Config] ? "bg-white" : "bg-white/15"
                }`} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-white/30 tabular-nums">{filled}/{REQUIRED.length}</span>
          </div>

          <span className="font-mono font-semibold text-sm tabular-nums text-white">{formatPrice(total)}</span>

          <button type="button" onClick={handleAdd} disabled={!complete}
            className={`press btn-create-shimmer flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-200 ${
              complete ? "bg-white text-[#0a0908] shadow-lg hover:scale-105" : "bg-white/10 text-white/25 cursor-not-allowed"
            }`}>
            <ShoppingBag size={13} />
            {added ? "Ajouté !" : complete ? `Ajouter — ${formatPrice(total)}` : "Complétez la config"}
          </button>
        </div>
      </header>

      {/* ── BARRE COULEUR ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-10 py-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[9px] tracking-[0.22em] uppercase text-white/25 font-semibold hidden sm:block">Coloris</p>
        <div className="flex items-center gap-8">
          {colourStep.options.map((opt) => {
            const active = config.colour === opt.key;
            return (
              <button key={opt.key} type="button"
                onClick={() => pick("colour", opt.key)}
                className="press flex flex-col items-center gap-2.5 group">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 leather-${opt.key} ${
                  active ? "border-white scale-110 shadow-[0_0_0_3px_rgba(255,255,255,0.15)]" : "border-white/15 group-hover:border-white/40 group-hover:scale-105"
                }`} />
                <span className={`text-[9px] tracking-[0.18em] uppercase font-medium transition-colors ${active ? "text-white" : "text-white/30"}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
        {config.colour && (
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/25 font-semibold hidden sm:block">
            {COLOUR_LABELS[config.colour]}
          </p>
        )}
      </div>

      {/* ── ZONE PRINCIPALE : gauche | visuel | droite ───────────────── */}

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-1" style={{ minHeight: "calc(100vh - 56px - 88px - 160px)" }}>

        {/* GAUCHE : têtière + frontal */}
        <div className="w-[220px] xl:w-[240px] shrink-0 flex flex-col divide-y"
          style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
          <SideGroup step={teteireStep} config={config} pick={pick} />
          <SideGroup step={frontalStep} config={config} pick={pick} />
        </div>

        {/* CENTRE : visuel */}
        <div className="flex-1 flex items-center justify-center p-6 xl:p-10">
          <div className="h-full w-full flex items-center justify-center">
            <div style={{ height: "min(68vh, 520px)", aspectRatio: "3/4", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <BridleVisual config={config} />
              {/* CTA overlay — apparaît quand tout est choisi */}
              <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out ${
                complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}>
                <button type="button" onClick={handleAdd}
                  className="press w-full flex items-center justify-center gap-2.5 py-4 text-sm font-bold tracking-wide transition-colors"
                  style={{ background: "rgba(250,250,249,0.97)", color: "#0a0908", backdropFilter: "blur(8px)" }}>
                  <ShoppingBag size={15} />
                  {added ? "Ajouté au panier !" : `Ajouter au panier — ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DROITE : muserolle + rênes */}
        <div className="w-[220px] xl:w-[240px] shrink-0 flex flex-col divide-y"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
          <SideGroup step={muserolleStep} config={config} pick={pick} />
          <SideGroup step={reinsStep} config={config} pick={pick} />
        </div>
      </div>

      {/* ── BARRE DU BAS ─────────────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-3 divide-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <BottomGroup step={disciplineStep} config={config} pick={pick} />
        <BottomGroup step={tailleStep} config={config} pick={pick} />
        <BottomGroup step={enrenementStep} config={config} pick={pick} />
      </div>

      {/* ── MOBILE layout ────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col">
        {/* Visuel mobile */}
        <div className="flex items-center justify-center p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ width: "100%", maxWidth: "280px", aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
            <BridleVisual config={config} />
            <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
              complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            }`}>
              <button type="button" onClick={handleAdd}
                className="press w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold"
                style={{ background: "rgba(250,250,249,0.97)", color: "#0a0908" }}>
                <ShoppingBag size={15} />
                {added ? "Ajouté !" : `Ajouter — ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>

        {/* Toutes les options en vertical */}
        <div className="divide-y divide-white/8">
          {[teteireStep, frontalStep, muserolleStep, reinsStep, tailleStep, disciplineStep, enrenementStep].map(s => (
            <SideGroup key={s.key} step={s} config={config} pick={pick} />
          ))}
        </div>

        {complete && (
          <div className="p-6">
            <button type="button" onClick={handleAdd}
              className="press w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold bg-white text-[#0a0908]">
              <ShoppingBag size={16} />
              {added ? "Ajouté au panier !" : `Ajouter — ${formatPrice(total)}`}
            </button>
          </div>
        )}
      </div>

      {/* ── GALERIE ACCESSOIRES ──────────────────────────────────────── */}
      <AccessoriesGallery config={config} />

    </div>
  );
}

/* ─── Galerie accessoires ─────────────────────────────────────────────── */
const ACCESSORIES = [
  { id: 1,  name: "Têtière Classique",            category: "Têtière",    seed: "elekka-t1", configKey: "tetiere",    configValue: "classique"  },
  { id: 2,  name: "Têtière Anatomique Signature", category: "Têtière",    seed: "elekka-t2", configKey: "tetiere",    configValue: "signature"  },
  { id: 3,  name: "Têtière Anatomique Duo",       category: "Têtière",    seed: "elekka-t3", configKey: "tetiere",    configValue: "duo"        },
  { id: 4,  name: "Frontal Classique",            category: "Frontal",    seed: "elekka-f1", configKey: "frontal",    configValue: "classique"  },
  { id: 5,  name: "Frontal Anatomique",           category: "Frontal",    seed: "elekka-f2", configKey: "frontal",    configValue: "anatomique" },
  { id: 6,  name: "Frontal Signature 5,5 cm",     category: "Frontal",    seed: "elekka-f3", configKey: "frontal",    configValue: "signature"  },
  { id: 7,  name: "Muserolle Simple",             category: "Muserolle",  seed: "elekka-m1", configKey: "muserolle",  configValue: "simple"     },
  { id: 8,  name: "Muserolle Rembourrée",         category: "Muserolle",  seed: "elekka-m2", configKey: "muserolle",  configValue: "rembourree" },
  { id: 9,  name: "Muserolle Triple attache",     category: "Muserolle",  seed: "elekka-m3", configKey: "muserolle",  configValue: "triple"     },
  { id: 10, name: "Rênes Classiques",             category: "Rênes",      seed: "elekka-r1", configKey: "reins",      configValue: "classique"  },
  { id: 11, name: "Rênes Anatomique",             category: "Rênes",      seed: "elekka-r2", configKey: "reins",      configValue: "anatomique" },
  { id: 12, name: "Rênes Signature",              category: "Rênes",      seed: "elekka-r3", configKey: "reins",      configValue: "signature"  },
  { id: 13, name: "Martingale",                   category: "Enrênement", seed: "elekka-e1", configKey: "enrenement", configValue: "martingale" },
  { id: 14, name: "Tylman",                       category: "Enrênement", seed: "elekka-e2", configKey: "enrenement", configValue: "tylman"     },
];

function ThumbGrid({ items, selected, onSelect }: {
  items: typeof ACCESSORIES;
  selected: typeof ACCESSORIES[number];
  onSelect: (item: typeof ACCESSORIES[number]) => void;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {items.map(item => {
        const isActive = selected.id === item.id;
        return (
          <button key={item.id} type="button" onClick={() => onSelect(item)}
            className={`press group relative overflow-hidden transition-all duration-200 ${
              isActive ? "ring-2 ring-ink ring-offset-2" : "hover:ring-1 hover:ring-ink/30"
            }`}
            style={{ aspectRatio: "1/1" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${item.seed}/300/300`} alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-end p-2"
              style={{ background: "linear-gradient(to top, rgba(10,9,8,0.7) 0%, transparent 55%)" }}>
              <p className="text-white text-[9px] font-semibold leading-tight line-clamp-2">{item.name}</p>
            </div>
            {isActive && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-ink flex items-center justify-center">
                <Check size={8} weight="bold" className="text-on-ink" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function AccessoriesGallery({ config }: { config: Config }) {
  const [selected, setSelected] = useState(ACCESSORIES[0]);

  const inSelection = ACCESSORIES.filter(
    a => config[a.configKey as keyof Config] === a.configValue
  );
  const others = ACCESSORIES.filter(
    a => config[a.configKey as keyof Config] !== a.configValue
  );
  const hasSelection = inSelection.length > 0;

  return (
    <section style={{ background: "#fafaf9", color: "#0a0908", borderTop: "1px solid #e5e5e5" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">

        {/* En-tête */}
        <div className="mb-10">
          <p className="kicker text-muted mb-2">Accessoires · À la carte</p>
          <h2 className="display text-4xl md:text-5xl">
            Les pièces<br />
            <span className="text-muted">une par une.</span>
          </h2>
          <p className="mt-4 text-sm text-muted max-w-[48ch] leading-relaxed">
            Chaque élément sera bientôt disponible séparément.
            La galerie se met à jour selon votre configuration.
          </p>
        </div>

        {/* Layout photo principale + droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Photo principale — sticky */}
          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={selected.seed}
                src={`https://picsum.photos/seed/${selected.seed}/900/675`}
                alt={selected.name}
                className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: "linear-gradient(to top, rgba(10,9,8,0.78) 0%, transparent 100%)" }}>
                <p className="kicker-tight text-white/50 mb-1">{selected.category}</p>
                <p className="text-white font-semibold text-lg leading-tight">{selected.name}</p>
                {inSelection.some(a => a.id === selected.id) && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                      <Check size={8} weight="bold" className="text-[#0a0908]" />
                    </div>
                    <span className="text-white/70 text-[10px] font-medium">Dans votre configuration</span>
                  </div>
                )}
                <p className="text-white/30 text-xs mt-1">Photo à venir — emplacement réservé</p>
              </div>
            </div>
          </div>

          {/* Colonne droite : deux zones */}
          <div className="flex flex-col gap-8">

            {/* ZONE 1 — Votre sélection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-ink" />
                  <p className="text-xs font-bold tracking-[0.12em] uppercase">Votre sélection</p>
                </div>
                <div className="flex-1 h-px bg-ink" />
                <span className="text-xs font-mono text-muted tabular-nums">{inSelection.length} pièce{inSelection.length > 1 ? "s" : ""}</span>
              </div>

              {hasSelection ? (
                <ThumbGrid items={inSelection} selected={selected} onSelect={setSelected} />
              ) : (
                <div className="border border-dashed border-line rounded p-6 text-center">
                  <p className="text-sm text-muted">Choisissez vos options ci-dessus</p>
                  <p className="text-xs text-muted/60 mt-1">Les pièces de votre filet apparaîtront ici</p>
                </div>
              )}
            </div>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">Autres pièces</span>
              <div className="flex-1 h-px bg-line" />
            </div>

            {/* ZONE 2 — Autres pièces */}
            <div>
              <ThumbGrid items={others} selected={selected} onSelect={setSelected} />
            </div>

          </div>
        </div>

        {/* Pied */}
        <div className="mt-10 pt-8 border-t border-line flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-muted">Ces pièces seront disponibles à l&apos;achat séparément prochainement.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ink pulse-dot" />
            <span className="text-xs font-medium">Bientôt disponible</span>
          </div>
        </div>

      </div>
    </section>
  );
}
