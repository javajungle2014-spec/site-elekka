"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Shuffle, ArrowCounterClockwise, MagnifyingGlassPlus, X, FloppyDisk, Scales, ArrowLeft as ArrowL, ArrowRight as ArrowR, ArrowSquareOut } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";
import { createClient } from "@/lib/supabase";
import { BRIDLE_CATALOG, STOCK_LABEL, BASE_PRICE } from "@/lib/bridle-catalog";
import type { BridlePart, CuirOption } from "@/lib/bridle-catalog";
import { useBridleState, priceOf, encodeConfig, randomize, emptyState } from "@/lib/bridle-store";
import type { BridleState } from "@/lib/bridle-store";
import { HorsePreview } from "@/components/boutique/horse-preview";
import {
  MUSEROLE_COMPONENTS,
  FRONTAL_COMPONENTS,
  TETIERE_COMPONENTS,
  RENE_COMPONENTS,
} from "@/components/boutique/bridle-parts";

/* ─── Constantes ───────────────────────────────────────────── */

type ViewMode = "profil" | "3/4" | "face";
const VIEWS: ViewMode[] = ["profil", "3/4", "face"];
const VIEW_LABEL: Record<ViewMode, string> = { profil: "Profil", "3/4": "3/4", face: "Face" };

const STEP_KEYS = ["muserole", "frontal", "tetiere", "rene", "finitions", "taille"] as const;
type StepKey = (typeof STEP_KEYS)[number];
const STEP_LABELS: Record<StepKey, string> = {
  muserole: "Muserolle",
  frontal: "Frontal",
  tetiere: "Têtière",
  rene: "Rênes",
  finitions: "Cuir & fil",
  taille: "Taille",
};

interface SavedConfig {
  id: string;
  name: string;
  snapshot: BridleState;
  total: number;
  code: string;
}

interface Creation {
  name: string;
  snapshot: BridleState;
  done: Partial<Record<StepKey, boolean>>;
}

/* ─── Sous-composants ──────────────────────────────────────── */

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#5a5a63" }}>
      <span style={{ color: "#c97a1a", letterSpacing: 1 }}>
        {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
      </span>
      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10 }}>
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

function StockDot({ stock }: { stock: BridlePart["stock"] }) {
  const lab = STOCK_LABEL[stock];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#5a5a63" }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: lab.dot, display: "block", flexShrink: 0 }} />
      <span>{lab.txt}</span>
    </div>
  );
}

function OptionGrid({
  items,
  selected,
  onSelect,
  Components,
  cuir,
  stitch,
  flat = false,
  cols = 3,
}: {
  items: BridlePart[];
  selected: number | null;
  onSelect: (i: number) => void;
  Components: React.ComponentType<{ color?: CuirOption["id"]; stitch?: string }>[];
  cuir: CuirOption["id"];
  stitch: string;
  flat?: boolean;
  cols?: number;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {items.map((it, i) => {
        const Comp = Components[i];
        const isSelected = selected === i;
        return (
          <div
            key={it.id}
            onClick={() => onSelect(i)}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: 12,
              borderRadius: 10,
              background: "#ffffff",
              border: `1px solid ${isSelected ? "#14141a" : "#d8d3c7"}`,
              cursor: "pointer",
              transition: "border-color .15s, box-shadow .15s",
              boxShadow: isSelected ? "0 0 0 3px rgba(20,20,26,.06)" : "none",
            }}
          >
            {/* Badge numéro */}
            <div style={{
              position: "absolute", top: 10, left: 10,
              fontFamily: "var(--font-geist-mono)", fontSize: 9, letterSpacing: "0.16em",
              textTransform: "uppercase", background: "#fff", border: "1px solid #d8d3c7",
              padding: "3px 7px", borderRadius: 99, color: "#2a2a31", zIndex: 2,
            }}>
              {`Mod. ${i + 1}`}
            </div>
            {/* Check */}
            {isSelected && (
              <div style={{
                position: "absolute", top: 10, right: 10,
                width: 22, height: 22, borderRadius: 99, background: "#14141a",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, zIndex: 2,
              }}>✓</div>
            )}
            {/* Vignette */}
            <div style={{
              aspectRatio: flat ? "4/1.6" : "4/3",
              borderRadius: 7, overflow: "hidden",
              background: "#ece8df",
              display: "flex", alignItems: "center",
            }}>
              {Comp && <Comp color={cuir} stitch={stitch} />}
            </div>
            {/* Infos */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>{it.name}</span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#5a5a63", whiteSpace: "nowrap" }}>
                {it.price} €
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: "#5a5a63", lineHeight: 1.45 }}>{it.desc}</div>
            <Stars rating={it.rating} reviews={it.reviews} />
            <StockDot stock={it.stock} />
          </div>
        );
      })}
    </div>
  );
}

function Panel({
  n,
  title,
  children,
  status,
  highlighted,
  right,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  status: "done" | "active" | "idle";
  highlighted: boolean;
  right?: React.ReactNode;
}) {
  const ringColor = highlighted
    ? "#d75f2a"
    : status === "done"
    ? "#d75f2a"
    : status === "active"
    ? "#14141a"
    : "#d8d3c7";
  return (
    <div style={{
      background: "#ffffff",
      border: `1px solid ${ringColor}`,
      borderRadius: 18,
      padding: 22,
      marginBottom: 14,
      boxShadow: highlighted ? "0 0 0 3px rgba(215,95,42,.15)" : "none",
      transition: "border-color .25s, box-shadow .25s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{
            fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", color: status === "done" ? "#d75f2a" : "#5a5a63",
          }}>
            {status === "done" ? `✓ ${n}` : n}
          </span>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</span>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function DetailedRecap({
  s,
  total,
  completedCount,
  totalSteps,
  onSave,
  onCompare,
  compareOn,
}: {
  s: BridleState;
  total: number;
  completedCount: number;
  totalSteps: number;
  onSave: () => void;
  onCompare: () => void;
  compareOn: boolean;
}) {
  const C = BRIDLE_CATALOG;
  const v = (cat: BridlePart[], idx: number | null) =>
    idx != null ? cat[idx].name : <span style={{ color: "#5a5a63", fontStyle: "italic" }}>à choisir</span>;

  return (
    <div style={{
      background: "#ffffff", border: "1px solid #d8d3c7",
      borderRadius: 18, padding: 18, display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63" }}>
          Récap · {completedCount}/{totalSteps}
        </span>
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>
          {total === 0 ? "— €" : `${total} €`}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 14px", fontSize: 12 }}>
        {[
          ["Muserolle", v(C.muserole, s.muserole)],
          ["Frontal", v(C.frontal, s.frontal)],
          ["Têtière", v(C.tetiere, s.tetiere)],
          ["Rênes", v(C.rene, s.rene)],
          ["Coloris", s.cuir ? C.cuir.find((c) => c.id === s.cuir)?.name : <span style={{ color: "#5a5a63", fontStyle: "italic" }}>à choisir</span>],
          ["Taille", s.taille || <span style={{ color: "#5a5a63", fontStyle: "italic" }}>à choisir</span>],
          ["Gravure", s.grav || "—"],
        ].map(([label, val]) => (
          <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", gap: 6, padding: "2px 0" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5a63" }}>{label}</span>
            <span style={{ fontWeight: 500, textAlign: "right", fontSize: 12 }}>{val}</span>
          </div>
        ))}
        {s.enrenementOn && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6, padding: "2px 0" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5a63" }}>Enrênement</span>
            <span style={{ fontWeight: 500, fontSize: 12 }}>{C.enrenement[s.enrenement]?.name}</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, paddingTop: 8, borderTop: "1px solid #d8d3c7" }}>
        <button
          onClick={onSave}
          style={{
            flex: 1, height: 36, padding: "0 14px", borderRadius: 99,
            border: "1px solid #d8d3c7", background: "transparent",
            fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <FloppyDisk size={13} /> Sauvegarder
        </button>
        <button
          onClick={onCompare}
          disabled={compareOn}
          style={{
            flex: 1, height: 36, padding: "0 14px", borderRadius: 99,
            border: "1px solid #d8d3c7", background: "transparent",
            fontSize: 12, fontWeight: 500, cursor: compareOn ? "not-allowed" : "pointer",
            opacity: compareOn ? 0.5 : 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Scales size={13} /> {compareOn ? "Comparateur actif" : "Comparer"}
        </button>
      </div>
    </div>
  );
}

function FicheLink({ href }: { href: string }) {
  return (
    <Link href={href} target="_blank"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11, color: "#5a5a63", textDecoration: "none",
        fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      Voir la pièce <ArrowSquareOut size={11} />
    </Link>
  );
}

/* ─── Page principale ──────────────────────────────────────── */

export default function PersonnaliserPage() {
  const [s, set, setAll] = useBridleState();
  const [done, setDone] = useState<Partial<Record<StepKey, boolean>>>({});
  const [view, setView] = useState<ViewMode>("profil");
  const [zoom, setZoom] = useState(false);
  const [hoverPart, setHoverPart] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("elekka_saved_configs");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [added, setAdded] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitSaveName, setExitSaveName] = useState("");
  const [exitSaved, setExitSaved] = useState(false);
  const prevDone = useRef<Partial<Record<StepKey, boolean>>>({});
  const [poppedSteps, setPoppedSteps] = useState<Partial<Record<StepKey, boolean>>>({});

  // Comparateur
  const [compareOn, setCompareOn] = useState(false);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCompareView, setShowCompareView] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const refs: Record<StepKey | "cart", React.RefObject<HTMLDivElement | null>> = {
    muserole: useRef(null),
    frontal: useRef(null),
    tetiere: useRef(null),
    rene: useRef(null),
    finitions: useRef(null),
    taille: useRef(null),
    cart: useRef(null),
  };

  const { addItem, open: openCart } = useCart();
  const C = BRIDLE_CATALOG;
  const total = priceOf(s);
  const stitchHex = "#efe6cf";
  const cuirId = (s.cuir ?? "noir") as CuirOption["id"];

  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [s.muserole, s.frontal, s.tetiere, s.cuir]);

  useEffect(() => {
    try {
      localStorage.setItem("elekka_saved_configs", JSON.stringify(savedConfigs));
    } catch {}
  }, [savedConfigs]);

  // Récupère l'email de l'utilisateur connecté
  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });
  }, []);


  const scrollToStep = useCallback((key: StepKey | "cart") => {
    requestAnimationFrame(() => {
      const target = refs[key]?.current;
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToNextEmpty = useCallback(
    (currentDone: Partial<Record<StepKey, boolean>>) => {
      if (STEP_KEYS.every((k) => currentDone[k])) return;
      const next = STEP_KEYS.find((k) => !currentDone[k]) ?? "cart";
      scrollToStep(next);
    },
    [scrollToStep]
  );

  const completeAndAdvance = (key: StepKey) => {
    setDone((d) => {
      const wasAllDone = STEP_KEYS.every((k) => d[k]);
      const nd = { ...d, [key]: true };
      if (!wasAllDone) scrollToNextEmpty(nd);
      return nd;
    });
  };

  const completedCount = STEP_KEYS.filter((k) => done[k]).length;
  const allDone = completedCount === STEP_KEYS.length;

  // Pop-up navigateur (fermeture onglet)
  useEffect(() => {
    if (completedCount === 0) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [completedCount]);

  // Comparateur — persiste l'état actif
  useEffect(() => {
    if (!compareOn) return;
    setCreations((cs) => {
      const next = [...cs];
      if (next[activeIdx]) next[activeIdx] = { ...next[activeIdx], snapshot: { ...s }, done: { ...done } };
      return next;
    });
  }, [s, done, compareOn, activeIdx]);

  const navView = (dir: number) => {
    const i = VIEWS.indexOf(view);
    setView(VIEWS[(i + dir + VIEWS.length) % VIEWS.length]);
  };

  // Animation pop quand une étape passe à done
  useEffect(() => {
    const newlyDone = STEP_KEYS.filter((k) => done[k] && !prevDone.current[k]);
    if (newlyDone.length > 0) {
      const popped: Partial<Record<StepKey, boolean>> = {};
      newlyDone.forEach((k) => (popped[k] = true));
      setPoppedSteps(popped);
      setTimeout(() => setPoppedSteps({}), 400);
    }
    prevDone.current = { ...done };
  }, [done]);

  const handleRandomize = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
    randomize(set, s);
    setDone((d) => ({ ...d, muserole: true, frontal: true, tetiere: true, finitions: true }));
    setFadeKey((k) => k + 1);
  };

  const handleReset = () => {
    setAll(emptyState());
    setDone({});
  };

  const handleAdd = () => {
    if (!allDone) {
      scrollToNextEmpty(done);
      return;
    }
    const cuirInfo = C.cuir.find((c) => c.id === s.cuir);
    addItem({
      slug: "sur-mesure",
      name: `Filet Elekka Sur Mesure — ${C.tetiere[s.tetiere!]?.name ?? ""} / ${cuirInfo?.name ?? ""}`,
      priceEUR: total,
      colour: cuirId as import("@/lib/products").ColourKey,
      colourLabel: cuirInfo?.name ?? "Noir",
      colourSwatch: cuirInfo?.hex ?? "#1b1714",
      size: (s.taille ?? "Full") as import("@/lib/products").Size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    openCart();
  };

  const openSave = () => { setSaveName(""); setShareOpen(true); };
  const confirmSave = () => {
    const name = saveName.trim() || `Création ${savedConfigs.length + 1}`;
    setSavedConfigs([
      { id: `cfg_${Date.now()}`, name, snapshot: { ...s }, total, code: encodeConfig(s) },
      ...savedConfigs,
    ].slice(0, 8));
    setShareOpen(false);
  };

  const enterCompare = () => {
    const c1: Creation = { name: "Création 1", snapshot: { ...s }, done: { ...done } };
    setCreations([c1, { name: "Création 2", snapshot: emptyState(), done: {} }]);
    setActiveIdx(1);
    setAll(emptyState());
    setDone({});
    setCompareOn(true);
  };

  const exitCompare = () => { setCompareOn(false); setCreations([]); setActiveIdx(0); };

  const switchSlot = (idx: number) => {
    if (!compareOn || idx === activeIdx) return;
    const next = [...creations];
    next[activeIdx] = { ...next[activeIdx], snapshot: { ...s }, done: { ...done } };
    setCreations(next);
    setActiveIdx(idx);
    setAll({ ...next[idx].snapshot });
    setDone({ ...next[idx].done });
  };

  const addNewSlot = () => {
    const next = [...creations, { name: `Création ${creations.length + 1}`, snapshot: emptyState(), done: {} }];
    setCreations(next);
    setActiveIdx(next.length - 1);
    setAll(emptyState());
    setDone({});
  };

  const removeSlot = (idx: number) => {
    if (creations.length <= 2) return;
    const next = creations.filter((_, i) => i !== idx);
    setCreations(next);
    const newActive = Math.max(0, idx === activeIdx ? activeIdx - 1 : activeIdx > idx ? activeIdx - 1 : activeIdx);
    setActiveIdx(newActive);
    setAll({ ...next[newActive].snapshot });
    setDone({ ...next[newActive].done });
  };

  const renameSlot = (idx: number, name: string) => {
    const next = [...creations];
    next[idx] = { ...next[idx], name };
    setCreations(next);
  };

  const allCreationsReady = compareOn && creations.length >= 2 && creations.every((c) => STEP_KEYS.every((k) => c.done[k]));

  if (compareOn && showCompareView) {
    return (
      <CompareSideBySide
        creations={creations}
        onPick={(idx) => {
          setAll({ ...creations[idx].snapshot });
          setDone({ ...creations[idx].done });
          exitCompare();
          setShowCompareView(false);
        }}
        onBack={() => setShowCompareView(false)}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#f5f2ec", color: "#14141a", minHeight: "100%" }}>

      {/* Bandeau social-proof */}
      <div style={{
        background: "#14141a", color: "#fff", fontSize: 11,
        padding: "8px 24px", display: "flex", justifyContent: "space-between",
        alignItems: "center", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em",
      }}>
        <span>✦ Fait main · Cuir pleine fleur · Garantie 2 ans</span>
        <span style={{ opacity: 0.6 }}>Retours offerts · Expédition sous 48 h</span>
      </div>

      {/* Sub-header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 28px", borderBottom: "1px solid #d8d3c7",
        background: "#f5f2ec", position: "sticky", top: 0, zIndex: 30,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => {
              if (completedCount > 0) { setExitOpen(true); }
              else { window.location.href = "/boutique"; }
            }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "#5a5a63", background: "none",
              border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <ArrowLeft size={13} /> Boutique
          </button>
          <span style={{ color: "#d8d3c7" }}>|</span>
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63" }}>
              Atelier {compareOn && "· Comparaison"}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {compareOn ? creations[activeIdx]?.name ?? "Votre création" : "Créez votre filet"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Points de progression */}
          <div style={{ display: "none", alignItems: "center", gap: 4 }}>
            {STEP_KEYS.map((k) => (
              <div
                key={k}
                title={STEP_LABELS[k]}
                onClick={() => scrollToStep(k)}
                style={{
                  width: 8, height: 8, borderRadius: 99, cursor: "pointer",
                  background: done[k] ? "#d75f2a" : "#d8d3c7",
                  transition: "background .2s",
                }}
              />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#5a5a63" }}>
            {completedCount}/{STEP_KEYS.length}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={handleRandomize}
              style={{
                height: 36, padding: "0 14px", borderRadius: 99, border: "1px solid #d8d3c7",
                background: "transparent", fontSize: 12, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <span className={spinning ? "spin-once" : ""} style={{ display: "flex" }}>
                <Shuffle size={13} />
              </span>
              Aléatoire
            </button>
            <button
              onClick={handleReset}
              style={{
                height: 36, padding: "0 14px", borderRadius: 99, border: "1px solid #d8d3c7",
                background: "transparent", fontSize: 12, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <ArrowCounterClockwise size={13} /> Recommencer
            </button>
          </div>
        </div>
      </div>

      {/* Onglets comparateur */}
      {compareOn && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 28px",
          borderBottom: "1px solid #d8d3c7", background: "#ece8df",
        }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63", marginRight: 8 }}>
            Mes créations
          </span>
          {creations.map((c, i) => {
            const cDone = STEP_KEYS.every((k) => c.done[k]);
            return (
              <div
                key={i}
                onClick={() => switchSlot(i)}
                style={{
                  padding: "6px 12px", borderRadius: 99, cursor: "pointer",
                  border: `1px solid ${i === activeIdx ? "#14141a" : "#d8d3c7"}`,
                  background: i === activeIdx ? "#14141a" : "#fff",
                  color: i === activeIdx ? "#fff" : "#14141a",
                  display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: cDone ? "#2f6d3a" : "rgba(100,100,100,.4)", display: "block" }} />
                <input
                  value={c.name}
                  onChange={(e) => renameSlot(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: "transparent", border: "none", outline: "none", color: "inherit", width: 110, fontSize: 12 }}
                />
                {creations.length > 2 && (
                  <span onClick={(e) => { e.stopPropagation(); removeSlot(i); }} style={{ opacity: 0.6, paddingLeft: 4, cursor: "pointer" }}>×</span>
                )}
              </div>
            );
          })}
          <button onClick={addNewSlot} style={{ height: 32, padding: "0 12px", borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 12, cursor: "pointer" }}>
            + Création
          </button>
          <div style={{ flex: 1 }} />
          <button
            disabled={!allCreationsReady}
            onClick={() => setShowCompareView(true)}
            style={{
              height: 36, padding: "0 16px", borderRadius: 99, border: "none",
              background: allCreationsReady ? "#14141a" : "#d8d3c7",
              color: allCreationsReady ? "#fff" : "#8a8a92",
              fontSize: 12, fontWeight: 500, cursor: allCreationsReady ? "pointer" : "not-allowed",
            }}
          >
            Comparer côte à côte →
          </button>
          <button onClick={exitCompare} style={{ height: 36, padding: "0 14px", borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 12, cursor: "pointer" }}>
            Quitter
          </button>
        </div>
      )}

      {/* Split panes */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", flex: 1, minHeight: "calc(100vh - 200px)" }}>

        {/* LEFT — aperçu fixe */}
        <div style={{
          borderRight: "1px solid #d8d3c7", padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 80,
          height: "calc(100vh - 80px)", overflowY: "auto",
        }}>
          {/* Sélecteur de vue */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 3, padding: 3, background: "#ece8df", borderRadius: 99 }}>
              {VIEWS.map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "6px 14px", borderRadius: 99, border: "none",
                    background: view === v ? "#ffffff" : "transparent",
                    color: view === v ? "#14141a" : "#5a5a63",
                    fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.12em",
                    textTransform: "uppercase", cursor: "pointer",
                    boxShadow: view === v ? "0 1px 2px rgba(20,20,26,.06), 0 4px 12px rgba(20,20,26,.06)" : "none",
                    transition: "all .15s",
                  }}
                >
                  {VIEW_LABEL[v]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setZoom(true)}
              style={{
                height: 36, padding: "0 14px", borderRadius: 99, border: "1px solid #d8d3c7",
                background: "transparent", fontSize: 12, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <MagnifyingGlassPlus size={13} /> Zoom
            </button>
          </div>

          {/* Stage aperçu */}
          <div style={{
            flex: 1, minHeight: 0, position: "relative",
            background: "#ffffff", border: "1px solid #d8d3c7",
            borderRadius: 18, overflow: "hidden",
          }}>
            {/* Grille de fond */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(to right, rgba(20,20,26,.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,26,.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px", pointerEvents: "none",
            }} />

            {/* Tag */}
            <div style={{
              position: "absolute", top: 14, left: 14, zIndex: 2,
              display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 10px",
              background: "#fff", border: "1px solid #d8d3c7", borderRadius: 99,
              fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2f6d3a", display: "block" }} />
              Aperçu · {VIEW_LABEL[view]}
            </div>

            {/* Cheval */}
            <div key={fadeKey} style={{ position: "absolute", inset: "4% 8%", animation: "esFade .35s ease" }}>
              <HorsePreview s={s} view={view} stitch={stitchHex} hoveredPart={hoverPart} onHoverPart={setHoverPart} />
            </div>

            {/* Tooltip hover */}
            {hoverPart && (
              <div style={{
                position: "absolute", top: 50, left: 16, zIndex: 3,
                background: "#14141a", color: "#fff", padding: "6px 10px",
                borderRadius: 6, fontSize: 11, fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                {hoverPart === "muserole" && (s.muserole != null ? `Muserolle · ${C.muserole[s.muserole].name}` : "Muserolle · à choisir")}
                {hoverPart === "frontal" && (s.frontal != null ? `Frontal · ${C.frontal[s.frontal].name}` : "Frontal · à choisir")}
                {hoverPart === "tetiere" && (s.tetiere != null ? `Têtière · ${C.tetiere[s.tetiere].name}` : "Têtière · à choisir")}
              </div>
            )}

            {/* Flèches navigation vue */}
            <button onClick={() => navView(-1)} aria-label="Vue précédente" style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              width: 38, height: 38, borderRadius: 99, border: "1px solid #d8d3c7",
              background: "rgba(255,255,255,.85)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            }}>
              <ArrowL size={16} />
            </button>
            <button onClick={() => navView(1)} aria-label="Vue suivante" style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              width: 38, height: 38, borderRadius: 99, border: "1px solid #d8d3c7",
              background: "rgba(255,255,255,.85)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            }}>
              <ArrowR size={16} />
            </button>

            {/* Mini barre progression */}
            <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", gap: 5 }}>
              {STEP_KEYS.map((k) => (
                <div key={k} style={{
                  height: 3, flex: 1, borderRadius: 2,
                  background: done[k] ? "#d75f2a" : "rgba(20,20,26,.10)",
                  transition: "background .25s",
                }} />
              ))}
            </div>
          </div>

          {/* Récap détaillé */}
          <DetailedRecap
            s={s} total={total}
            completedCount={completedCount} totalSteps={STEP_KEYS.length}
            onSave={openSave} onCompare={enterCompare} compareOn={compareOn}
          />
        </div>

        {/* RIGHT — scrollable */}
        <div ref={scrollRef} style={{ padding: "20px 24px 100px" }}>

          {/* Muserolle */}
          <div ref={refs.muserole} onMouseEnter={() => setHoverPart("muserole")} onMouseLeave={() => setHoverPart(null)}>
            <Panel n="01" title="Muserolle" status={done.muserole ? "done" : "active"} highlighted={hoverPart === "muserole"}
              right={<FicheLink href="/boutique/muserolle" />}>
              <OptionGrid
                items={C.muserole} selected={s.muserole}
                onSelect={(i) => { set("muserole", i); completeAndAdvance("muserole"); }}
                Components={MUSEROLE_COMPONENTS}
                cuir={cuirId} stitch={stitchHex}
              />
            </Panel>
          </div>

          {/* Frontal */}
          <div ref={refs.frontal} onMouseEnter={() => setHoverPart("frontal")} onMouseLeave={() => setHoverPart(null)}>
            <Panel n="02" title="Frontal" status={done.frontal ? "done" : done.muserole ? "active" : "idle"} highlighted={hoverPart === "frontal"}
              right={<FicheLink href="/boutique/frontal" />}>
              <OptionGrid
                items={C.frontal} selected={s.frontal}
                onSelect={(i) => { set("frontal", i); completeAndAdvance("frontal"); }}
                Components={FRONTAL_COMPONENTS}
                cuir={cuirId} stitch={stitchHex} flat
              />
            </Panel>
          </div>

          {/* Têtière */}
          <div ref={refs.tetiere} onMouseEnter={() => setHoverPart("tetiere")} onMouseLeave={() => setHoverPart(null)}>
            <Panel n="03" title="Têtière" status={done.tetiere ? "done" : done.frontal ? "active" : "idle"} highlighted={hoverPart === "tetiere"}
              right={<FicheLink href="/boutique/tetiere" />}>
              <OptionGrid
                items={C.tetiere} selected={s.tetiere}
                onSelect={(i) => { set("tetiere", i); completeAndAdvance("tetiere"); }}
                Components={TETIERE_COMPONENTS}
                cuir={cuirId} stitch={stitchHex}
              />
            </Panel>
          </div>

          {/* Rênes */}
          <div ref={refs.rene}>
            <Panel
              n="04" title="Rênes"
              status={done.rene ? "done" : done.tetiere ? "active" : "idle"}
              highlighted={false}
              right={
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#5a5a63", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={s.enrenementOn}
                    onChange={(e) => set("enrenementOn", e.target.checked)}
                    style={{ accentColor: "#14141a" }}
                  />
                  + Enrênement
                </label>
              }
            >
              <OptionGrid
                items={C.rene} selected={s.rene}
                onSelect={(i) => { set("rene", i); completeAndAdvance("rene"); }}
                Components={RENE_COMPONENTS}
                cuir={cuirId} stitch={stitchHex} flat cols={3}
              />
              {s.enrenementOn && (
                <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {C.enrenement.map((en, i) => (
                    <div
                      key={en.id}
                      onClick={() => set("enrenement", i)}
                      style={{
                        padding: 12, borderRadius: 10, cursor: "pointer",
                        border: `1px solid ${s.enrenement === i ? "#14141a" : "#d8d3c7"}`,
                        background: "#fff",
                      }}
                    >
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{en.name}</div>
                      <div style={{ fontSize: 11, color: "#5a5a63", marginTop: 2 }}>{en.desc}</div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#5a5a63", marginTop: 4 }}>
                        +{en.price} € {en.note && `· ${en.note}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>

          {/* Coloris */}
          <div ref={refs.finitions}>
            <Panel n="05" title="Coloris" status={done.finitions ? "done" : done.rene ? "active" : "idle"} highlighted={false}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {C.cuir.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => { set("cuir", c.id); completeAndAdvance("finitions"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                      border: `1px solid ${s.cuir === c.id ? "#14141a" : "#d8d3c7"}`,
                      borderRadius: 10, background: "#fff", cursor: "pointer",
                      boxShadow: s.cuir === c.id ? "0 0 0 3px rgba(20,20,26,.06)" : "none",
                      transition: "all .15s",
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 99, background: c.hex, border: "1px solid rgba(0,0,0,.18)", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "#5a5a63", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Taille & gravure */}
          <div ref={refs.taille}>
            <Panel n="06" title="Taille & gravure" status={done.taille ? "done" : done.finitions ? "active" : "idle"} highlighted={false}>
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {C.taille.map((t) => (
                  <div
                    key={t}
                    onClick={() => { set("taille", t); completeAndAdvance("taille"); }}
                    style={{
                      flex: 1, textAlign: "center", padding: "11px 0",
                      border: `1px solid ${s.taille === t ? "#14141a" : "#d8d3c7"}`,
                      borderRadius: 6, background: s.taille === t ? "#14141a" : "#fff",
                      color: s.taille === t ? "#fff" : "#14141a",
                      fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all .15s",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <input
                placeholder="Initiales ou prénom (optionnel)"
                value={s.grav}
                onChange={(e) => set("grav", e.target.value.slice(0, 14))}
                style={{
                  width: "100%", height: 44, padding: "0 14px",
                  border: "1px solid #d8d3c7", borderRadius: 6,
                  background: "#fff", fontSize: 16, fontStyle: "italic",
                  color: "#14141a", outline: "none",
                  fontFamily: "var(--font-geist-sans)",
                }}
              />
              <div style={{ fontSize: 11, color: "#5a5a63", marginTop: 6 }}>+ 25 € · gravure laser sur la têtière</div>
            </Panel>
          </div>

          {/* CTA */}
          <div ref={refs.cart} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {/* Indicateur d'étapes */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {STEP_KEYS.map((k, i) => (
                <div
                  key={k}
                  title={STEP_LABELS[k]}
                  className={poppedSteps[k] ? "step-pop" : ""}
                  style={{
                    width: 30, height: 30, borderRadius: 99,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done[k] ? "#14141a" : "#fff",
                    border: `1px solid ${done[k] ? "#14141a" : "#d8d3c7"}`,
                    color: done[k] ? "#fff" : "#8a8a92",
                    fontSize: 9, fontFamily: "var(--font-geist-mono)",
                    fontWeight: 600, letterSpacing: "0.05em",
                    transition: "background .25s, border-color .25s, color .25s",
                    cursor: "default",
                  }}
                >
                  {done[k] ? "✓" : `0${i + 1}`}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={openSave}
                style={{
                  height: 52, padding: "0 20px", borderRadius: 99, border: "1px solid #d8d3c7",
                  background: "transparent", fontSize: 14, fontWeight: 500, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <FloppyDisk size={16} /> Sauvegarder
              </button>
              <button
                onClick={handleAdd}
                style={{
                  flex: 1, height: 52, borderRadius: 99, border: "none",
                  background: allDone ? "#14141a" : "#5a5a63",
                  color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background .15s",
                }}
              >
                <ShoppingBag size={16} />
                {added
                  ? "Ajouté au panier !"
                  : allDone
                  ? `Ajouter au panier — ${total.toFixed(2).replace(".", ",")} €`
                  : `Composer votre filet (${completedCount}/${STEP_KEYS.length})`}
              </button>
            </div>
          </div>

          {/* Configs sauvegardées */}
          {savedConfigs.length > 0 && (
            <div style={{ marginTop: 20, padding: 16, background: "#fff", border: "1px solid #d8d3c7", borderRadius: 16 }}>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63", marginBottom: 10 }}>
                Mes créations sauvegardées
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {savedConfigs.map((cfg) => (
                  <div key={cfg.id} style={{ padding: 10, border: "1px solid #d8d3c7", borderRadius: 8, fontSize: 12 }}>
                    <div style={{ fontWeight: 500 }}>{cfg.name}</div>
                    <div style={{ color: "#5a5a63", fontSize: 11 }}>{cfg.total} €</div>
                    <button
                      onClick={() => { setAll({ ...cfg.snapshot }); const d: Partial<Record<StepKey, boolean>> = {}; STEP_KEYS.forEach((k) => (d[k] = true)); setDone(d); }}
                      style={{
                        marginTop: 6, height: 28, padding: "0 10px", borderRadius: 99,
                        border: "1px solid #d8d3c7", background: "transparent", fontSize: 11, cursor: "pointer",
                      }}
                    >
                      ↺ charger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modale sauvegarde */}
      {shareOpen && (
        <div
          onClick={() => setShareOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(20,20,26,.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", padding: 28, borderRadius: 16, width: 480, maxWidth: "90%" }}
          >
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63", marginBottom: 8 }}>
              Sauvegarder
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Donnez un nom à votre création
            </div>
            <input
              autoFocus
              placeholder="Ex. Filet Ulysse · concours obstacle"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmSave()}
              style={{
                width: "100%", height: 44, padding: "0 14px", border: "1px solid #d8d3c7",
                borderRadius: 6, fontSize: 16, fontStyle: "italic", outline: "none",
                fontFamily: "var(--font-geist-sans)",
              }}
            />
            <div style={{ marginTop: 14, padding: 10, background: "#f5f2ec", borderRadius: 8, fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#5a5a63" }}>
              Code partageable : {encodeConfig(s).slice(0, 20)}…
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setShareOpen(false)} style={{ flex: 1, height: 48, borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={confirmSave} style={{ flex: 1, height: 48, borderRadius: 99, border: "none", background: "#14141a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale zoom */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(20,20,26,.88)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99, padding: 40,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "90%", height: "90%", background: "#fff", borderRadius: 16, padding: 24, position: "relative" }}
          >
            <button
              onClick={() => setZoom(false)}
              style={{ position: "absolute", top: 14, right: 14, border: "none", background: "transparent", cursor: "pointer" }}
            >
              <X size={22} />
            </button>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <HorsePreview s={s} view={view} stitch={stitchHex} />
              <button onClick={() => navView(-1)} aria-label="Vue précédente" style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                width: 44, height: 44, borderRadius: 99, border: "1px solid #d8d3c7",
                background: "rgba(255,255,255,.85)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowL size={18} />
              </button>
              <button onClick={() => navView(1)} aria-label="Vue suivante" style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                width: 44, height: 44, borderRadius: 99, border: "1px solid #d8d3c7",
                background: "rgba(255,255,255,.85)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowR size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bandeau flottant quand config complète */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        transform: allDone ? "translateY(0)" : "translateY(100%)",
        transition: "transform .4s cubic-bezier(0.16,1,0.3,1)",
        background: "#14141a", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 28px", gap: 16,
        boxShadow: "0 -4px 32px rgba(0,0,0,.25)",
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 2 }}>
            Votre configuration est prête
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {total.toFixed(2).replace(".", ",")} €
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={openSave} style={{
            height: 46, padding: "0 18px", borderRadius: 99,
            border: "1px solid rgba(255,255,255,.25)", background: "transparent",
            color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7,
          }}>
            <FloppyDisk size={14} /> Sauvegarder
          </button>
          <button onClick={handleAdd} style={{
            height: 46, padding: "0 24px", borderRadius: 99,
            border: "none", background: "#fff",
            color: "#14141a", fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7,
          }}>
            <ShoppingBag size={14} />
            {added ? "Ajouté !" : "Ajouter au panier"}
          </button>
        </div>
      </div>

      {/* Modale de sortie */}
      {exitOpen && (
        <div
          onClick={() => setExitOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(20,20,26,.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 99, padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 16, width: 460, maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {/* En-tête */}
            <div style={{ background: "#14141a", padding: "24px 28px 20px" }}>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 6 }}>
                Votre configuration
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.2 }}>
                Vous êtes sur le point de quitter
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 6 }}>
                {completedCount}/{STEP_KEYS.length} étapes complétées · {total > 0 ? `${total.toFixed(2).replace(".", ",")} €` : "— €"}
              </div>
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              {userEmail ? (
                /* Connecté → proposer de sauvegarder */
                exitSaved ? (
                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Création sauvegardée</div>
                    <div style={{ fontSize: 13, color: "#5a5a63" }}>Retrouvez-la dans votre compte Elekka.</div>
                    <button
                      onClick={() => { window.location.href = "/boutique"; }}
                      style={{ marginTop: 18, height: 44, padding: "0 20px", borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 13, cursor: "pointer" }}
                    >
                      Retour à la boutique
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 13, color: "#5a5a63", marginBottom: 16, lineHeight: 1.5 }}>
                      Connecté en tant que <strong style={{ color: "#14141a" }}>{userEmail}</strong>.<br />
                      Donnez un nom à votre création pour la retrouver plus tard.
                    </div>
                    <input
                      autoFocus
                      placeholder="Ex. Filet Ulysse · obstacle"
                      value={exitSaveName}
                      onChange={(e) => setExitSaveName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const name = exitSaveName.trim() || `Création ${savedConfigs.length + 1}`;
                          setSavedConfigs([{ id: `cfg_${Date.now()}`, name, snapshot: { ...s }, total, code: encodeConfig(s) }, ...savedConfigs].slice(0, 8));
                          setExitSaved(true);
                        }
                      }}
                      style={{ width: "100%", height: 44, padding: "0 14px", border: "1px solid #d8d3c7", borderRadius: 6, fontSize: 15, fontStyle: "italic", outline: "none", marginBottom: 12, fontFamily: "var(--font-geist-sans)" }}
                    />
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => { window.location.href = "/boutique"; }}
                        style={{ flex: 1, height: 46, borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 13, cursor: "pointer" }}
                      >
                        Quitter sans sauvegarder
                      </button>
                      <button
                        onClick={() => {
                          const name = exitSaveName.trim() || `Création ${savedConfigs.length + 1}`;
                          setSavedConfigs([{ id: `cfg_${Date.now()}`, name, snapshot: { ...s }, total, code: encodeConfig(s) }, ...savedConfigs].slice(0, 8));
                          setExitSaved(true);
                        }}
                        style={{ flex: 1, height: 46, borderRadius: 99, border: "none", background: "#14141a", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </>
                )
              ) : (
                /* Non connecté → proposer de créer un compte */
                <>
                  <div style={{ fontSize: 13, color: "#5a5a63", marginBottom: 20, lineHeight: 1.6 }}>
                    Créez un compte Elekka gratuit pour sauvegarder votre configuration et la retrouver à tout moment depuis votre espace personnel.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Link
                      href="/compte"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        height: 46, borderRadius: 99, background: "#14141a", color: "#fff",
                        fontSize: 13, fontWeight: 600, textDecoration: "none",
                      }}
                    >
                      Créer un compte et sauvegarder
                    </Link>
                    <button
                      onClick={() => { window.location.href = "/boutique"; }}
                      style={{ height: 46, borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 13, cursor: "pointer" }}
                    >
                      Quitter sans sauvegarder
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes esFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Vue comparaison côte à côte ─────────────────────────── */

function CompareSideBySide({
  creations,
  onPick,
  onBack,
}: {
  creations: Creation[];
  onPick: (idx: number) => void;
  onBack: () => void;
}) {
  const C = BRIDLE_CATALOG;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: "#f5f2ec" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: "1px solid #d8d3c7" }}>
        <div>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63" }}>Comparaison</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>Choisissez votre filet</div>
        </div>
        <button onClick={onBack} style={{ height: 36, padding: "0 16px", borderRadius: 99, border: "1px solid #d8d3c7", background: "transparent", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowL size={13} /> Modifier
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${creations.length}, 1fr)`, flex: 1 }}>
        {creations.map((c, idx) => {
          const stitch = "#efe6cf";
          const total = priceOf(c.snapshot);
          return (
            <div key={idx} style={{
              padding: 28, display: "flex", flexDirection: "column", gap: 14,
              borderRight: idx < creations.length - 1 ? "1px solid #d8d3c7" : "none",
              overflow: "auto",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a63" }}>Création {idx + 1}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{c.name}</div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{total} €</div>
              </div>
              <div style={{ position: "relative", background: "#fff", border: "1px solid #d8d3c7", borderRadius: 16, overflow: "hidden", aspectRatio: "1/1" }}>
                <HorsePreview s={c.snapshot} view="profil" stitch={stitch} />
              </div>
              <div style={{ background: "#fff", border: "1px solid #d8d3c7", borderRadius: 12, padding: 16 }}>
                {[
                  ["Muserolle", c.snapshot.muserole != null ? C.muserole[c.snapshot.muserole].name : "—"],
                  ["Frontal", c.snapshot.frontal != null ? C.frontal[c.snapshot.frontal].name : "—"],
                  ["Têtière", c.snapshot.tetiere != null ? C.tetiere[c.snapshot.tetiere].name : "—"],
                  ["Rênes", c.snapshot.rene != null ? C.rene[c.snapshot.rene].name : "—"],
                  ["Cuir", c.snapshot.cuir ? C.cuir.find((x) => x.id === c.snapshot.cuir)?.name : "—"],
                  ["Taille", c.snapshot.taille || "—"],
                ].map(([label, val]) => (
                  <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f0ece3", fontSize: 13 }}>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5a63" }}>{label}</span>
                    <span style={{ fontWeight: 500 }}>{val || "—"}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onPick(idx)}
                style={{
                  height: 52, borderRadius: 99, border: "none",
                  background: "#14141a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                Choisir cette création — {total} €
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
