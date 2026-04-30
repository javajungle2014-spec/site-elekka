"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ShoppingBag, Heart, Truck, Gift } from "@phosphor-icons/react";
import { type Product, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";
import { AuthModal } from "@/components/auth-modal";
import { productDescriptions, sharedTabs } from "@/lib/product-tabs";
import { faqProductCategories, type FaqItem } from "@/lib/faq";

/* ─── Modal guide des tailles ───────────────────────────────────────── */
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-5">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />

      {/* Contenu */}
      <div className="relative w-full max-w-[540px] bg-paper shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <p className="kicker-tight text-muted">Étape III</p>
            <h2 className="display text-2xl mt-1">Guide des tailles</h2>
          </div>
          <button type="button" onClick={onClose}
            className="press w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        {/* Tableau */}
        <div className="px-6 py-6 space-y-6">
          <p className="text-sm text-muted leading-relaxed">
            Mesurez le tour de tête de votre cheval à l'aide d'un mètre souple, au niveau du chanfrein. Comparez avec le tableau ci-dessous.
          </p>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left kicker-tight text-muted py-3 pr-4 font-medium">Taille</th>
                <th className="text-left kicker-tight text-muted py-3 pr-4 font-medium">Tour de tête</th>
                <th className="text-left kicker-tight text-muted py-3 font-medium">Convient à</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-4 pr-4 font-semibold display text-lg">Full</td>
                <td className="py-4 pr-4 font-mono text-sm">55 – 65 cm</td>
                <td className="py-4 text-muted text-xs leading-snug">Chevaux de sport, Selle Français, KWPN, Hanovrien, Lusitanien</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 font-semibold display text-lg">Cob</td>
                <td className="py-4 pr-4 font-mono text-sm">48 – 55 cm</td>
                <td className="py-4 text-muted text-xs leading-snug">Poneys grands gabarits, Quarter Horse, chevaux de morphologie fine</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-paper-2 px-4 py-3 text-xs text-muted leading-relaxed">
            <strong className="text-ink">Conseil :</strong> En cas de doute entre les deux tailles, optez pour le Full — tous nos modèles sont réglables sur plusieurs crans.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <button type="button" onClick={onClose}
            className="press text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors">
            Retour à ma commande
          </button>
          <a href="/ressources/conseils/mesurer-tete-cheval-taille-filet"
            className="press inline-flex items-center gap-2 bg-ink text-on-ink px-5 py-2.5 text-xs font-medium hover:bg-ink-soft transition-colors">
            Je ne sais pas quelle taille prendre
            <IcoArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Leather textures ───────────────────────────────────────────────── */
const LEATHER: Record<string, string> = {
  "havana-brown": "leather-havana-brown",
  "noir": "leather-noir",
  "dark-brown": "leather-dark-brown",
};

/* ─── Icônes SVG (fidèles à index.html) ─────────────────────────────── */
function Icon({ children, size = 16, stroke = 1.4, className = "", ...rest }: {
  children: React.ReactNode; size?: number; stroke?: number; className?: string; [k: string]: unknown;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      {children}
    </svg>
  );
}
const IcoArrowLeft  = (p: { size?: number }) => <Icon size={p.size ?? 16}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>;
const IcoArrowRight = (p: { size?: number }) => <Icon size={p.size ?? 16}><path d="M5 12h14M12 5l7 7-7 7" /></Icon>;
const IcoArrowUpRight = (p: { size?: number }) => <Icon size={p.size ?? 16}><path d="M7 17 17 7M7 7h10v10" /></Icon>;
const IcoArrowDown  = (p: { size?: number }) => <Icon size={p.size ?? 14}><path d="M12 5v14M19 12l-7 7-7-7" /></Icon>;
const IcoCheck      = (p: { size?: number; stroke?: number }) => <Icon size={p.size ?? 16} stroke={p.stroke ?? 1.4}><path d="M20 6 9 17l-5-5" /></Icon>;
const IcoHeart      = (p: { size?: number; filled?: boolean }) => <Icon size={p.size ?? 16}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={p.filled ? "currentColor" : "none"} /></Icon>;
const IcoBag        = (p: { size?: number }) => <Icon size={p.size ?? 16}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></Icon>;

/* ─── Perks marquee ──────────────────────────────────────────────────── */
function PerksMarquee() {
  const items = [
    "Livraison offerte",
    "Rênes plates offertes",
    "Cuir pleine fleur",
    "Retours 14 jours",
    "Paiement sécurisé",
    "Conçu par des cavaliers",
  ];
  const Loop = () => (
    <div className="flex items-center gap-14 shrink-0 px-7">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-14">
          <span className="kicker-tight text-on-ink/85">{it}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-on-ink/40" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="bg-ink text-on-ink py-3.5 overflow-hidden">
      <div className="flex marquee-track w-max">
        <Loop /><Loop />
      </div>
    </div>
  );
}

/* ─── Step header ────────────────────────────────────────────────────── */
const ROMAN = ["", "I", "II", "III", "IV", "V"];
function StepHeader({ index, total, label, sub, value, done }: {
  index: number; total: number; label: string; sub?: string; value?: string | null; done: boolean;
}) {
  return (
    <div className="relative pl-12 mb-8">
      {index < total && (
        <span className={`absolute left-[15px] top-8 bottom-[-28px] w-px ${done ? "bg-ink" : "bg-line"}`} />
      )}
      <div className={`absolute left-0 top-0 w-8 h-8 border rounded-full flex items-center justify-center font-mono text-[10px] transition-colors ${
        done ? "bg-ink border-ink text-on-ink" : "border-ink text-ink"
      }`}>
        {done ? <IcoCheck size={12} stroke={2.5} /> : ROMAN[index]}
      </div>
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <p className="kicker-tight text-muted">Étape {ROMAN[index]} sur {ROMAN[total]}</p>
          <h3 className="display text-[1.75rem] md:text-[2rem] mt-2">{label}</h3>
          {sub && <p className="text-sm text-muted italic mt-1.5" style={{ fontWeight: 300 }}>{sub}</p>}
        </div>
        {value && (
          <p className="text-[13px] text-ink">
            <span className="text-muted">Sélectionné · </span>
            <span className="font-medium">{value}</span>
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Notice / Onglets ───────────────────────────────────────────────── */
function Notice({ slug }: { slug: string }) {
  const [active, setActive] = useState<number | null>(null);
  const tabs = [
    { label: "Description", content: productDescriptions[slug] ?? "" },
    { label: "Composition",  content: sharedTabs.composition },
    { label: "Entretien",    content: sharedTabs.entretien },
    { label: "Taille",       content: sharedTabs.taille },
  ];
  return (
    <section className="px-6 md:px-12 mt-32 md:mt-40">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-2">
          <p className="kicker-tight text-muted">/04</p>
          <p className="kicker mt-2 text-ink">Notice</p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="border-t border-ink">
            {tabs.map((t, i) => {
              const isActive = i === active;
              return (
                <div key={t.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : i)}
                    className="press w-full flex items-center justify-between py-6 text-left group"
                  >
                    <div className="flex items-baseline gap-8">
                      <span className="font-mono text-[10px] text-muted tracking-widest">/0{i + 1}</span>
                      <span className={`display text-xl md:text-2xl transition-colors ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                        {t.label}
                      </span>
                    </div>
                    <span className={`text-muted transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                      <IcoArrowDown size={14} />
                    </span>
                  </button>
                  {isActive && (
                    <div className="md:pl-[6.25rem] pb-8 pr-6 rise">
                      {t.content.split("\n\n").map((para, j) => {
                        const parts = para.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={j} className="text-[14px] text-ink/75 leading-[1.75] max-w-[60ch] mb-3 last:mb-0">
                            {parts.map((part, k) =>
                              part.startsWith("**") && part.endsWith("**")
                                ? <strong key={k} className="text-ink font-semibold">{part.replace(/\*\*/g, "")}</strong>
                                : part
                            )}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="press w-full flex items-start justify-between gap-4 py-5 text-left">
        <span className="text-sm leading-snug">{item.q}</span>
        <span className="shrink-0 mt-0.5 text-muted text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-xs text-muted leading-relaxed pb-5 max-w-[52ch]">{item.a}</p>}
    </div>
  );
}

/* ─── Rail de miniatures avec carrousel ─────────────────────────────── */
const THUMB_VISIBLE = 6;

function ArrowBtn({ dir, disabled, onClick }: { dir: "up" | "down"; disabled: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`press h-7 w-full flex items-center justify-center border border-line transition-colors ${
        disabled ? "text-muted-soft cursor-not-allowed opacity-30" : "hover:border-ink text-ink"
      }`}>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d={dir === "up" ? "M1 5L5 1L9 5" : "M1 1L5 5L9 1"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function ThumbnailRail({ images, selected, onSelect, productName }: {
  images: string[];
  selected: number;
  onSelect: (i: number) => void;
  productName: string;
}) {
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, images.length - THUMB_VISIBLE);
  const needsCarousel = images.length > THUMB_VISIBLE;

  return (
    <>
      {/* Desktop : rail vertical à gauche */}
      <div className="hidden md:flex flex-col gap-1.5 shrink-0 w-[60px]">
        {needsCarousel && (
          <ArrowBtn dir="up" disabled={offset === 0} onClick={() => setOffset(o => Math.max(0, o - 1))} />
        )}

        <div className="flex flex-col gap-1.5 overflow-hidden flex-1">
          <div className="flex flex-col gap-1.5 transition-transform duration-300 ease-out"
            style={{ transform: `translateY(calc(-${offset} * (100% / ${THUMB_VISIBLE} + 2px)))` }}>
            {images.map((img, i) => (
              <button key={i} type="button" onClick={() => onSelect(i)}
                className={`press relative shrink-0 overflow-hidden border-2 transition-all duration-200 w-full`}
                style={{ aspectRatio: "3/4", borderColor: selected === i ? "var(--ink)" : "transparent",
                  outline: selected === i ? "none" : undefined,
                  boxShadow: selected !== i ? "0 0 0 1px #e5e5e5" : undefined }}>
                <Image src={img} alt={`${productName} vue ${i + 1}`} fill sizes="60px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {needsCarousel && (
          <ArrowBtn dir="down" disabled={offset >= maxOffset} onClick={() => setOffset(o => Math.min(maxOffset, o + 1))} />
        )}
      </div>

      {/* Mobile : strip horizontale en dessous de l'image (rendu via portail dans le parent) */}
    </>
  );
}

/* ─── Strip horizontale mobile ──────────────────────────────────────── */
function ThumbnailStrip({ images, selected, onSelect, productName }: {
  images: string[];
  selected: number;
  onSelect: (i: number) => void;
  productName: string;
}) {
  return (
    <div className="flex md:hidden gap-2 overflow-x-auto scrollbar-none mt-3 pb-1">
      {images.map((img, i) => (
        <button key={i} type="button" onClick={() => onSelect(i)}
          className={`press relative shrink-0 overflow-hidden border-2 transition-all duration-200 rounded-sm`}
          style={{ width: 56, height: 74, borderColor: selected === i ? "var(--ink)" : "transparent",
            boxShadow: selected !== i ? "0 0 0 1px #e5e5e5" : undefined }}>
          <Image src={img} alt={`${productName} vue ${i + 1}`} fill sizes="56px" className="object-cover" />
        </button>
      ))}
    </div>
  );
}

/* ─── Composant principal ────────────────────────────────────────────── */
export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState(product.defaultColour);
  const [selectedSize, setSelectedSize]     = useState<string | null>(product.defaultSize);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedReins, setSelectedReins]   = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip]   = useState<string | null>(null);
  const [equipColour, setEquipColour]       = useState<import("@/lib/products").ColourKey>(product.defaultColour);
  const [equipSize, setEquipSize]           = useState<import("@/lib/products").Size>(product.defaultSize);
  const { addItem } = useCart();
  const { isFavorite, toggle, userId } = useFavorites();
  const [authOpen, setAuthOpen]   = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded]         = useState(false);
  const [favorite, setFavoriteState] = useState(false);
  const [stockQty, setStockQty]   = useState<number | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const currentColour = product.colours.find(c => c.key === selectedColour)!;
  const otherProducts = products.filter(p => p.slug !== product.slug);

  useEffect(() => { setFavoriteState(isFavorite(product.slug)); }, [isFavorite, product.slug]);

  // Vérification du stock dès que couleur ou taille change
  useEffect(() => {
    if (!selectedSize || !selectedColour) return;
    const colour = product.colours.find(c => c.key === selectedColour)?.label;
    if (!colour) return;
    fetch(`/api/stock/check?slug=${product.slug}&colour=${encodeURIComponent(colour)}&size=${selectedSize}`)
      .then(r => r.json())
      .then(d => setStockQty(d.quantity ?? null))
      .catch(() => setStockQty(null));
  }, [selectedColour, selectedSize, product.slug, product.colours]);
  useEffect(() => { setEquipColour(selectedColour); }, [selectedColour]);
  useEffect(() => { if (selectedSize) setEquipSize(selectedSize as import("@/lib/products").Size); }, [selectedSize]);

  // Sticky cart
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const disciplines = [
    { key: "obstacle",      label: "Saut d'obstacle",  sub: "Travail sur l'obstacle & cross" },
    { key: "dressage",      label: "Dressage",          sub: "Travail sur le plat" },
    { key: "multi",         label: "Multi-discipline",  sub: "Toutes pratiques" },
  ];

  const reinsOptions = [
    { key: "aucune",      label: "Sans rênes",         desc: "Filet seul",                          note: null,             deltaEUR: 0 },
    { key: "caoutchouc",  label: "Rênes caoutchouc",   desc: "Anti-glisse · 59,99 € valeur",        note: "Offertes",       deltaEUR: 0 },
    { key: "tissu",       label: "Rênes tissu",         desc: "Légères & confortables",              note: "-15 %",          deltaEUR: Math.round(49.99 * 0.85 * 100) / 100 },
  ];

  const equipOptions = [
    { key: "aucun",       label: "Sans équipement",    desc: "Configuration épurée",                note: null,             deltaEUR: 0 },
    { key: "tylman",      label: "Tylman",              desc: "Enrênement d'aide à la décontraction", note: "-15 %",         deltaEUR: Math.round(59.99 * 0.85 * 100) / 100 },
    { key: "martingale",  label: "Martingale",          desc: "Enrênement fixe réglable",            note: "-15 %",          deltaEUR: Math.round(59.99 * 0.85 * 100) / 100 },
  ];

  const total = useMemo(() => {
    const r = reinsOptions.find(x => x.key === selectedReins);
    const e = equipOptions.find(x => x.key === selectedEquip);
    return product.priceEUR + (r?.deltaEUR ?? 0) + (e?.deltaEUR ?? 0);
  }, [selectedReins, selectedEquip, product.priceEUR]);

  const outOfStock = stockQty === 0;
  const complete = !!(selectedDiscipline && selectedColour && selectedSize && selectedReins && selectedEquip) && !outOfStock;

  function handleFavorite() {
    if (!userId) { setAuthOpen(true); return; }
    toggle(product.slug);
    setFavoriteState(!favorite);
  }

  function handleAdd() {
    if (!complete) return;
    addItem({
      slug: product.slug, name: product.name, priceEUR: product.priceEUR,
      colour: selectedColour, colourLabel: currentColour.label,
      colourSwatch: currentColour.swatch, size: (selectedSize ?? product.defaultSize) as import("@/lib/products").Size,
    });
    if (selectedEquip && selectedEquip !== "aucun") {
      const equip = equipOptions.find(e => e.key === selectedEquip);
      const equipColourData = product.colours.find(c => c.key === equipColour) ?? product.colours[0];
      if (equip) {
        addItem({
          slug: selectedEquip === "tylman" ? "enrenement-1" : "enrenement-2",
          name: equip.label,
          priceEUR: equip.deltaEUR,
          colour: equipColour,
          colourLabel: equipColourData.label,
          colourSwatch: equipColourData.swatch,
          size: equipSize,
        });
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}

      <PerksMarquee />

      <div className="min-h-screen pb-24">

        {/* Fil d'Ariane */}
        <div className="px-6 md:px-12 pt-8">
          <a href="/boutique" className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors press">
            <IcoArrowLeft size={12} />
            <span>Boutique</span>
            <span className="text-muted-soft mx-1.5">/</span>
            <span>Filets</span>
            <span className="text-muted-soft mx-1.5">/</span>
            <span className="text-ink italic" style={{ fontWeight: 300 }}>
              {product.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
            </span>
          </a>
        </div>

        {/* ── /01 Hero ── */}
        <section className="px-6 md:px-12 pt-10 md:pt-16">
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="flex items-center gap-6 text-muted">
              <span className="kicker-tight">{product.family}</span>
              <span className="w-8 h-px bg-line" />
              <span className="kicker-tight">Cuir pleine fleur</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              {stockQty === 0 ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="kicker-tight text-red-400">Rupture de stock</span>
                </>
              ) : stockQty !== null && stockQty <= 3 ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
                  <span className="kicker-tight text-amber-500">Plus que {stockQty} en stock</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-ink pulse-dot" />
                  <span className="kicker-tight">Disponible</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Image + thumbnails */}
            <div className="col-span-12 md:col-span-6">
              <div className="flex gap-3">

                {/* Rail miniatures avec carrousel si > 6 */}
                {currentColour.images.length > 1 && (
                  <ThumbnailRail
                    images={currentColour.images}
                    selected={selectedImageIdx}
                    onSelect={setSelectedImageIdx}
                    productName={product.name}
                  />
                )}

                {/* Image principale */}
                <div className="flex-1">
                  <div className={`relative aspect-[3/4] overflow-hidden ${
                    currentColour.images.length > 0 ? "bg-paper-2" : (LEATHER[selectedColour] ?? "bg-paper-2")
                  }`}>
                    {currentColour.images.length > 0 ? (
                      <Image
                        src={currentColour.images[selectedImageIdx] ?? currentColour.images[0]}
                        alt={`${product.name} — ${currentColour.label}`}
                        fill sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-opacity duration-300"
                        priority
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 pointer-events-none" />
                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                          <span className="kicker-tight text-on-ink/60">Profil</span>
                          <span className="font-mono text-[10px] tracking-wider text-on-ink/60 tabular-nums">01 / 01</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-muted">
                    <span className="kicker-tight">Fig. {selectedImageIdx + 1} — {currentColour.label}</span>
                    <span className="font-mono text-[10px] tracking-wider">
                      ELK-{product.slug.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  {/* Strip horizontal mobile */}
                  {currentColour.images.length > 1 && (
                    <ThumbnailStrip
                      images={currentColour.images}
                      selected={selectedImageIdx}
                      onSelect={setSelectedImageIdx}
                      productName={product.name}
                    />
                  )}
                </div>

              </div>
            </div>

            {/* Titre + CTA Composer */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-8 md:pb-2">
              <div>
                <h1 className="display text-[3.5rem] md:text-[4.5rem] xl:text-[5rem] text-ink" style={{ lineHeight: 0.92 }}>
                  {product.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
                </h1>
                <p className="mt-4 italic text-muted text-base md:text-lg max-w-[36ch]" style={{ fontWeight: 300 }}>
                  {product.tagline}.
                </p>
              </div>

              <div className="h-px bg-line-ink" />

              <p className="text-[15px] text-ink/80 leading-[1.7] max-w-[44ch]">
                {product.description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: product.colours.length, label: "Coloris\ndisponibles" },
                  { num: product.sizes.length,   label: "Tailles\nproposées" },
                  { num: formatPrice(product.priceEUR), label: "Prix\nTTC" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="display text-2xl text-ink tabular-nums">{s.num}</p>
                    <p className="kicker-tight text-muted mt-2 leading-tight whitespace-pre-line">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Bouton Composer */}
              <button
                type="button"
                onClick={() => document.getElementById("configurateur")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="cta-shine press group mt-2 flex items-center justify-between bg-ink text-on-ink px-6 py-4 hover:bg-ink-soft transition-colors"
              >
                <span className="text-sm font-semibold tracking-wide">Composer mon filet</span>
                <span className="flex items-center gap-2 text-on-ink-muted text-xs group-hover:text-on-ink transition-colors">
                  Personnaliser
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ── /02 Configurateur ── */}
        <section id="configurateur" className="px-6 md:px-12 mt-32 md:mt-40">
          <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-2"><p className="kicker-tight text-muted">/02</p></div>
            <div className="col-span-12 md:col-span-10">
              <p className="display text-[2rem] md:text-[2.75rem] xl:text-[3rem] max-w-[20ch]" style={{ lineHeight: 1.05 }}>
                Composez votre filet à votre <em className="italic font-light text-muted">image</em>.
              </p>
              <p className="mt-6 text-[15px] text-muted leading-relaxed max-w-[52ch]">
                Cinq décisions, prises ensemble. De votre discipline à vos accessoires — chaque détail compte.
              </p>
            </div>
          </div>

          {/* Étape I — Discipline */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <StepHeader index={1} total={5} label="Discipline"
                sub="Pour personnaliser votre expérience."
                done={!!selectedDiscipline}
                value={selectedDiscipline ? disciplines.find(d => d.key === selectedDiscipline)?.label ?? null : null} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-3 gap-2">
                {disciplines.map(d => {
                  const isActive = selectedDiscipline === d.key;
                  return (
                    <button key={d.key} type="button" onClick={() => setSelectedDiscipline(d.key)}
                      className={`choice press text-left p-5 ${isActive ? "choice--active" : ""}`}>
                      <p className="display text-lg">{d.label}</p>
                      <p className="text-[11px] text-muted mt-2 leading-snug">{d.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Étape II — Coloris */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <StepHeader index={2} total={5} label="Coloris" sub="Cuir pleine fleur — tannage sélectionné."
                done={!!selectedColour} value={selectedColour ? currentColour.label : null} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-2 gap-2">
                {product.colours.map(c => {
                  const isActive = selectedColour === c.key;
                  return (
                    <button key={c.key} type="button" onClick={() => setSelectedColour(c.key)}
                      className={`choice press text-left ${isActive ? "choice--active" : ""}`}>
                      {/* Grande image filet + deux petits carrés couleur unie */}
                      <div className="flex gap-1.5 p-1.5">
                        <div className={`flex-[3] aspect-[3/4] relative ${LEATHER[c.key] ?? "bg-paper-2"}`}>
                          {isActive && (
                            <span className="absolute top-2 right-2 w-5 h-5 bg-on-ink text-ink rounded-full flex items-center justify-center">
                              <IcoCheck size={9} stroke={2.5} />
                            </span>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="flex-1 rounded-sm" style={{ backgroundColor: c.swatch }} />
                          <div className="flex-1 rounded-sm opacity-60" style={{ backgroundColor: c.swatch }} />
                        </div>
                      </div>
                      <div className="px-3 pb-3 pt-1"><p className="display text-sm">{c.label}</p></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Étape III — Taille */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <StepHeader index={3} total={5} label="Taille" sub="Mesures prises au-dessus du chanfrein."
                done={!!selectedSize} value={selectedSize} />
                      <button type="button" onClick={() => setSizeGuideOpen(true)}
                className="ml-12 mt-4 text-[12px] text-ink underline underline-offset-4 press inline-flex items-center gap-1.5 transition-colors hover:text-muted">
                Guide des mesures <IcoArrowUpRight size={11} />
              </button>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map(size => {
                  const isActive = selectedSize === size;
                  const isStd = size === "Full";
                  return (
                    <button key={size} type="button" onClick={() => setSelectedSize(size)}
                      className={`choice press text-left p-6 relative ${isActive ? "choice--active" : ""}`}>
                      {isStd && !isActive && (
                        <span className="absolute -top-2 left-4 bg-paper px-2 text-[9px] tracking-widest uppercase text-muted font-medium">Recommandé</span>
                      )}
                      <p className="display text-3xl">{size}</p>
                      <p className="text-[11px] text-muted mt-2 leading-snug">
                        {size === "Full" ? "Chevaux de selle adultes" : "Poneys, chevaux fins"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Étape IV — Rênes */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <StepHeader index={4} total={5} label="Rênes" sub="Les rênes caoutchouc sont offertes."
                done={!!selectedReins} value={selectedReins ? reinsOptions.find(r => r.key === selectedReins)?.label ?? null : null} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="space-y-2">
                {reinsOptions.map((r, idx) => {
                  const isActive = selectedReins === r.key;
                  return (
                    <button key={r.key} type="button" onClick={() => setSelectedReins(r.key)}
                      className={`choice press w-full text-left p-5 flex items-center justify-between gap-4 ${isActive ? "choice--active" : ""}`}>
                      <div className="flex items-baseline gap-5 min-w-0">
                        <span className={`font-mono text-[10px] tracking-wider mt-1 ${isActive ? "text-ink" : "text-muted-soft"}`}>0{idx + 1}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="display text-lg">{r.label}</p>
                            {r.note && (
                              <span className="bg-ink text-on-ink text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-medium">{r.note}</span>
                            )}
                          </div>
                          <p className="text-[12px] text-muted mt-1 leading-snug">{r.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <p className={`font-mono text-sm tabular-nums ${isActive ? "text-ink" : "text-muted"}`}>
                          {r.deltaEUR === 0 ? "—" : `+ ${formatPrice(r.deltaEUR)}`}
                        </p>
                        <span className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${isActive ? "border-ink bg-ink text-on-ink" : "border-line"}`}>
                          {isActive && <IcoCheck size={10} stroke={3} />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Étape V — Équipement */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
            <div className="col-span-12 md:col-span-4">
              <StepHeader index={5} total={5} label="Équipement" sub="Optionnel — chaque accessoire est interchangeable."
                done={!!selectedEquip} value={selectedEquip ? equipOptions.find(e => e.key === selectedEquip)?.label ?? null : null} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="space-y-2">
                {equipOptions.map((e, idx) => {
                  const isActive = selectedEquip === e.key;
                  return (
                    <button key={e.key} type="button" onClick={() => setSelectedEquip(e.key)}
                      className={`choice press w-full text-left p-5 flex items-center justify-between gap-4 ${isActive ? "choice--active" : ""}`}>
                      <div className="flex items-baseline gap-5 min-w-0">
                        <span className={`font-mono text-[10px] tracking-wider mt-1 ${isActive ? "text-ink" : "text-muted-soft"}`}>0{idx + 1}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="display text-lg">{e.label}</p>
                            {e.note && (
                              <span className="bg-ink text-on-ink text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-medium">{e.note}</span>
                            )}
                          </div>
                          <p className="text-[12px] text-muted mt-1 leading-snug">{e.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <p className={`font-mono text-sm tabular-nums ${isActive ? "text-ink" : "text-muted"}`}>
                          {e.deltaEUR === 0 ? "—" : `+ ${formatPrice(e.deltaEUR)}`}
                        </p>
                        <span className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${isActive ? "border-ink bg-ink text-on-ink" : "border-line"}`}>
                          {isActive && <IcoCheck size={10} stroke={3} />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Panneau couleur + taille pour l'enrênement sélectionné */}
              {selectedEquip && selectedEquip !== "aucun" && (
                <div className="mt-6 border border-line p-5 space-y-5">
                  <p className="kicker-tight text-muted">Personnaliser l&apos;enrênement</p>

                  {/* Visuels × 3 */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium">{equipOptions.find(e => e.key === selectedEquip)?.label}</p>
                      <p className="text-xs text-muted">{product.colours.find(c => c.key === equipColour)?.label} · {equipSize}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Vue principale" },
                        { label: "Détail attache" },
                        { label: "Vue d'ensemble" },
                      ].map((view, i) => (
                        <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                          <div className={`w-full h-full ${LEATHER[equipColour] ?? "bg-paper-2"}`} />
                          <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                            <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase">0{i + 1}</span>
                            <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase">{view.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-soft italic">Photos à venir — emplacement réservé</p>
                  </div>

                  {/* Couleur */}
                  <div>
                    <p className="kicker-tight text-muted mb-3">Coloris</p>
                    <div className="flex gap-2">
                      {product.colours.map(c => (
                        <button key={c.key} type="button"
                          onClick={() => setEquipColour(c.key as import("@/lib/products").ColourKey)}
                          className={`press w-8 h-8 rounded-full border-2 transition-all ${
                            equipColour === c.key ? "border-ink scale-110" : "border-transparent hover:border-line"
                          }`}
                          style={{ background: c.swatch }}
                          aria-label={c.label}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted mt-2">
                      {product.colours.find(c => c.key === equipColour)?.label}
                    </p>
                  </div>

                  {/* Taille */}
                  <div>
                    <p className="kicker-tight text-muted mb-3">Taille</p>
                    <div className="flex gap-2">
                      {product.sizes.map(s => (
                        <button key={s} type="button"
                          onClick={() => setEquipSize(s)}
                          className={`press h-9 px-5 border text-sm font-bold transition-colors ${
                            equipSize === s ? "border-ink bg-ink text-on-ink" : "border-line hover:border-ink/40"
                          }`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Récap + CTA */}
          <div ref={ctaRef} className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <div className="border-t border-ink pt-6">
                <p className="kicker-tight text-muted">Récapitulatif</p>
                <h3 className="display text-2xl mt-2">
                  {product.name.replace("Bridon Elekka ", "").replace("Filet Anatomique Elekka ", "")}
                </h3>
                <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    { label: "Discipline",   value: selectedDiscipline ? disciplines.find(d => d.key === selectedDiscipline)?.label : null },
                    { label: "Coloris",      value: selectedColour ? currentColour.label : null },
                    { label: "Taille",       value: selectedSize },
                    { label: "Rênes",        value: selectedReins ? reinsOptions.find(r => r.key === selectedReins)?.label : null },
                    { label: "Équipement",   value: selectedEquip && selectedEquip !== "aucun"
                      ? `${equipOptions.find(e => e.key === selectedEquip)?.label} · ${product.colours.find(c => c.key === equipColour)?.label} · ${equipSize}`
                      : selectedEquip === "aucun" ? "Sans équipement" : null },
                  ].map(it => (
                    <div key={it.label} className="flex items-baseline justify-between border-b border-line pb-3">
                      <dt className="kicker-tight text-muted">{it.label}</dt>
                      <dd className="text-sm font-medium">{it.value ?? <span className="text-muted-soft">—</span>}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex items-baseline justify-between pt-4 border-t border-ink">
                  <p className="kicker text-ink">Total</p>
                  <p className="display text-3xl tabular-nums">{formatPrice(total)}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <button type="button" onClick={handleAdd} disabled={!complete || outOfStock}
                    className={`cta-shine press flex-1 inline-flex items-center justify-between pl-6 pr-5 h-14 text-sm tracking-wider transition-colors ${
                      outOfStock ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-200" :
                      complete ? "bg-ink text-on-ink hover:bg-ink-soft" : "bg-ink/30 text-on-ink/60 cursor-not-allowed"
                    }`}>
                    <span className="inline-flex items-center gap-3">
                      <IcoBag size={16} />
                      <span className="font-medium uppercase">
                        {added ? "Ajouté !" : outOfStock ? "Rupture de stock" : complete ? "Ajouter au panier" : "Composez votre filet"}
                      </span>
                    </span>
                    {added ? <IcoCheck size={14} stroke={2.5} /> : <IcoArrowRight size={14} />}
                  </button>
                  <button type="button" onClick={handleFavorite}
                    aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={`press w-14 h-14 border flex items-center justify-center transition-all duration-200 ${
                      favorite ? "border-ink bg-ink text-on-ink" : "border-line text-ink hover:border-ink"
                    }`}>
                    <IcoHeart size={17} filled={favorite} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── /03 Citation ── */}
        <section className="px-6 md:px-12 mt-32 md:mt-40">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/03</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <span className="italic text-[5rem] leading-[0.5] text-muted/40 block mb-4" style={{ fontWeight: 300 }}>"</span>
              <p className="display text-[1.75rem] md:text-[2.25rem] xl:text-[2.5rem]" style={{ lineHeight: 1.15 }}>
                Un filet n'est pas un accessoire. C'est une{" "}
                <em className="italic font-light text-muted">conversation</em> entre le cavalier, le cheval et le cuir — qui se patine au fil des années.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-paper-2 rounded-full flex items-center justify-center text-xs font-semibold text-muted">EK</div>
                <p className="kicker-tight text-muted">Fondateur Elekka · Cavalier</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── /04 Notice ── */}
        <Notice slug={product.slug} />

        {/* ── /05 FAQ ── */}
        <section className="px-6 md:px-12 mt-32 md:mt-40">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="kicker-tight text-muted">/05</p>
              <p className="kicker mt-2 text-ink">Questions</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                {faqProductCategories.map(cat => (
                  <div key={cat.title} className="mb-8">
                    <p className="kicker-tight text-muted-soft mb-3">{cat.title}</p>
                    {cat.items.map(item => <FaqItem key={item.q} item={item} />)}
                  </div>
                ))}
              </div>
              <Link href="/ressources/faq" className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors inline-flex items-center gap-1">
                Voir toutes les questions <IcoArrowRight size={11} />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── Sticky cart ── */}
    </>
  );
}
