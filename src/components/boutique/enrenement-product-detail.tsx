"use client";

import { useMemo, useState } from "react";
import type { Product, ColourKey, Size } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

const leatherClassByColour: Record<string, string> = {
  "havana-brown": "leather-havana-brown",
  "noir":         "leather-noir",
  "dark-brown":   "leather-dark-brown",
};

const sections = [
  {
    label: "Confort",
    title: "Un contact dosé, pas un blocage.",
    copy: "L'enrênement accompagne le cheval sans contraindre. Le cuir pleine fleur reste souple au fil des séances et s'assouplit naturellement avec le temps.",
  },
  {
    label: "Précision",
    title: "Des réglages fiables, stables dans le temps.",
    copy: "La bouclerie inox tient le réglage sans glisser. Chaque ajustement reste en place, séance après séance, sans avoir à tout reconfigurer.",
  },
  {
    label: "Usage",
    title: "Pour le travail en main comme monté.",
    copy: "Compatible avec tous les bridons Elekka, l'enrênement s'intègre dans une routine quotidienne ou ponctuelle sans modifier l'équilibre de l'ensemble.",
  },
];

const specs = [
  ["Cuir",          "Pleine fleur"],
  ["Bouclerie",     "Inox poli"],
  ["Compatibilité", "Tous bridons Elekka"],
  ["Tailles",       "Cob, Full"],
  ["Livraison",     "2 à 4 jours ouvrés"],
  ["Retours",       "14 jours"],
];

const benefits = [
  {
    title: "Cuir pleine fleur",
    articleTitle: "Le cuir pleine fleur, qu'est-ce que c'est ?",
    paragraphs: [
      "Le cuir pleine fleur conserve la surface naturelle du cuir, sans ponçage ni correction. C'est la qualité la plus noble, celle qui développe une patine avec le temps.",
      "Il est plus résistant aux frottements et à l'humidité que les cuirs corrigés. Bien entretenu, il dure des années sans perdre sa tenue.",
      "C'est le choix de référence pour un équipement équestre premium à prix accessible.",
    ],
  },
  {
    title: "Bouclerie inox",
    articleTitle: "Pourquoi une bouclerie inox ?",
    paragraphs: [
      "La bouclerie est manipulée à chaque réglage. L'inox permet de garder des boucles propres, stables et faciles à entretenir dans le temps.",
      "Sa finition discrète s'accorde bien avec une esthétique premium : elle ne prend pas le dessus sur le cuir, mais renforce la sensation de qualité.",
      "C'est un choix simple, durable et cohérent pour un équipement pensé pour le quotidien.",
    ],
  },
  {
    title: "Réglage précis",
    articleTitle: "L'importance d'un réglage stable",
    paragraphs: [
      "Un enrênement mal réglé perd son efficacité ou crée des contraintes inutiles. La qualité de la bouclerie est donc aussi importante que celle du cuir.",
      "Les boucles inox Elekka tiennent le réglage sans glisser, même sous l'effort ou par temps humide.",
      "Un seul ajustement suffit pour la séance entière.",
    ],
  },
  {
    title: "Compatibilité",
    articleTitle: "Compatible avec tous les bridons Elekka",
    paragraphs: [
      "L'enrênement Elekka est conçu pour fonctionner avec l'ensemble de la gamme de bridons, sans adaptation ni accessoire supplémentaire.",
      "Les couleurs disponibles sont assorties aux coloris des bridons pour un ensemble cohérent.",
      "Il peut aussi s'utiliser avec des bridons d'autres marques — vérifiez la compatibilité des anneaux avant commande.",
    ],
  },
];

const galleryImages = [
  { label: "Vue principale", scale: "scale-100" },
  { label: "Détail réglage",  scale: "scale-90"  },
  { label: "Détail cuir",    scale: "scale-75"  },
];

/* ─── Visuels ───────────────────────────────────────────────────────────── */
function Price({ value, light = false }: { value: number; light?: boolean }) {
  return (
    <span className={`shrink-0 font-mono text-sm tabular-nums ${light ? "text-on-ink" : "text-ink"}`}>
      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)}
    </span>
  );
}

function BridleIllustration({ leatherClass, size = "hero" }: { leatherClass: string; size?: "hero" | "card" | "thumb" }) {
  const dimensions = { hero: "h-[430px] w-[318px] sm:h-[520px] sm:w-[386px] xl:h-[620px] xl:w-[460px]", card: "h-[300px] w-[222px] md:h-[370px] md:w-[274px]", thumb: "h-[126px] w-[94px]" }[size];
  const ring   = { hero: "border-[22px] sm:border-[28px] xl:border-[34px]", card: "border-[16px] md:border-[20px]", thumb: "border-[7px]" }[size];
  const crown  = { hero: "border-x-[16px] border-t-[16px] sm:border-x-[21px] sm:border-t-[21px] xl:border-x-[25px] xl:border-t-[25px]", card: "border-x-[12px] border-t-[12px] md:border-x-[15px] md:border-t-[15px]", thumb: "border-x-[5px] border-t-[5px]" }[size];
  const buckle = { hero: "h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7", card: "h-4 w-4 md:h-5 md:w-5", thumb: "h-2 w-2" }[size];
  return (
    <div className={`relative ${dimensions} drop-shadow-[0_30px_60px_rgb(10_10_10/0.12)]`}>
      <div className={`absolute left-[20%] top-[8%] h-[76%] w-[60%] rounded-full ${ring} ${leatherClass}`} />
      <div className={`absolute left-[34%] top-[1%] h-[24%] w-[32%] rounded-t-full border-transparent ${crown} ${leatherClass}`} />
      <div className={`absolute left-[5%] top-[43%] h-[7%] w-[90%] rounded-full ${leatherClass}`} />
      <div className={`absolute left-[15%] top-[58%] h-[6%] w-[70%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[27%] top-[29%] h-[42%] w-[46%] rounded-full border border-ink/10" />
      <div className={`absolute left-[20%] top-[42%] rounded-full border border-ink/20 bg-paper shadow-sm ${buckle}`} />
      <div className={`absolute right-[20%] top-[42%] rounded-full border border-ink/20 bg-paper shadow-sm ${buckle}`} />
      <div className={`absolute left-[46%] top-[63%] h-[28%] w-[8%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[38%] top-[73%] h-[9%] w-[24%] rounded-full border border-ink/20" />
    </div>
  );
}

function ProductRail({ leatherClass, selectedGalleryImage, setSelectedGalleryImage }: { leatherClass: string; selectedGalleryImage: number; setSelectedGalleryImage: (i: number) => void }) {
  return (
    <div className="hidden gap-4 lg:grid">
      {galleryImages.map((item, index) => (
        <button key={item.label} type="button" onClick={() => setSelectedGalleryImage(index)}
          className={`press relative flex h-40 items-center justify-center overflow-hidden bg-white text-left transition ${selectedGalleryImage === index ? "outline outline-2 outline-ink" : "hover:opacity-75"}`}
          aria-label={`Afficher ${item.label}`} aria-pressed={selectedGalleryImage === index}>
          <span className="absolute left-3 top-3 font-mono text-[0.65rem] text-muted-soft">0{index + 1}</span>
          <BridleIllustration leatherClass={leatherClass} size="thumb" />
        </button>
      ))}
    </div>
  );
}

function ThreePhotoHero({ leatherClass, activeColour }: { leatherClass: string; activeColour: string }) {
  return (
    <div className="grid min-h-[calc(100vh-6rem)] content-start gap-4">
      <div className="grid gap-4 pb-0 md:grid-cols-3 lg:pb-40">
        {sections.map((section, index) => (
          <article key={section.title}
            className={`relative grid min-h-[500px] grid-rows-[1fr_auto] overflow-hidden bg-white p-5 md:min-h-[560px] xl:min-h-[620px] ${index === 1 ? "lg:translate-y-20" : index === 2 ? "lg:translate-y-40" : ""}`}>
            <div className="relative flex min-h-0 items-center justify-center overflow-hidden">
              <div className="absolute left-0 top-0 z-10">
                <p className="kicker-tight text-muted">{section.label}</p>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-soft">{activeColour}</p>
              </div>
              <span className="absolute right-0 top-0 z-10 font-mono text-xs text-muted-soft">0{index + 1}</span>
              <div className="absolute inset-x-1 top-1/2 h-px bg-line" />
              <div className="absolute inset-y-8 left-1/2 w-px bg-line" />
              <BridleIllustration leatherClass={leatherClass} size="card" />
            </div>
            <div className="relative z-10 bg-white/92 pt-5">
              <h2 className="display text-3xl leading-none md:text-4xl">{section.title}</h2>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{section.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PurchasePanel({ product: p, activeColour, colourKey, setColourKey, size, setSize, onAdd, added }: {
  product: Product; activeColour: Product["colours"][number]; colourKey: ColourKey;
  setColourKey: (k: ColourKey) => void; size: Size; setSize: (s: Size) => void;
  onAdd: () => void; added: boolean;
}) {
  return (
    <aside className="bg-ink p-5 text-on-ink md:p-8 lg:sticky lg:top-20 lg:self-start">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/15 pb-8">
          <p className="kicker text-white/45">{p.family}</p>
          <h1 className="display mt-5 text-5xl leading-[0.9] md:text-7xl">{p.name}</h1>
        </div>
        <p className="mt-8 text-lg leading-8 text-white/68">{p.tagline}</p>
        <div className="mt-10">
          <p className="kicker-tight text-white/45">Couleur</p>
          <div className="mt-4 grid gap-3">
            {p.colours.map((colour) => (
              <button key={colour.key} type="button" onClick={() => setColourKey(colour.key as ColourKey)}
                className={`press flex items-center justify-between border px-4 py-4 text-left ${colourKey === colour.key ? "border-white bg-white text-ink" : "border-white/18 text-on-ink hover:border-white/45"}`}
                aria-pressed={colourKey === colour.key}>
                <span className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full border border-white/30" style={{ background: colour.swatch }} />
                  <span className="text-sm font-semibold">{colour.label}</span>
                </span>
                <span className="font-mono text-xs opacity-50">{colourKey === colour.key ? "CHOISI" : ""}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <p className="kicker-tight text-white/45">Taille</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {p.sizes.map((item) => (
              <button key={item} type="button" onClick={() => setSize(item)}
                className={`press h-12 border text-sm font-bold ${size === item ? "border-white bg-white text-ink" : "border-white/18 text-on-ink hover:border-white/45"}`}
                aria-pressed={size === item}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 border-y border-white/15 py-5 text-sm">
          <div className="flex justify-between">
            <span className="text-white/45">Sélection</span>
            <span>{activeColour.label}, {size}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-4">
            <span className="text-white/45">Prix</span>
            <Price value={p.priceEUR} light />
          </div>
        </div>
        <div className="mt-8 border border-white/18 p-3">
          <button type="button" onClick={onAdd} className="cta-shine press h-14 w-full bg-on-ink px-6 text-sm font-bold uppercase tracking-[0.18em] text-ink">
            {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </aside>
  );
}

function BenefitsBand({ openBenefit, setOpenBenefit }: { openBenefit: number | null; setOpenBenefit: (i: number | null) => void }) {
  const selected = openBenefit === null ? null : benefits[openBenefit];
  return (
    <div className="mt-16 border-y border-line">
      <div className="grid gap-px bg-line md:grid-cols-4">
        {benefits.map((b, i) => {
          const isOpen = openBenefit === i;
          return (
            <button key={b.title} type="button" onClick={() => setOpenBenefit(isOpen ? null : i)}
              className={`press bg-paper px-4 py-5 text-left transition ${isOpen ? "text-ink" : "text-muted hover:text-ink"}`}
              aria-pressed={isOpen} aria-expanded={isOpen}>
              <span className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.65rem] text-muted-soft">0{i + 1}</span>
                <span className="font-mono text-xl leading-none text-muted">{isOpen ? "−" : "+"}</span>
              </span>
              <span className="mt-3 block text-sm font-bold uppercase tracking-[0.08em]">{b.title}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <article className="grid gap-8 py-10 md:grid-cols-[minmax(220px,0.34fr)_1fr]">
          <h3 className="display max-w-md text-4xl leading-none md:text-6xl">{selected.articleTitle}</h3>
          <div className="max-w-3xl space-y-5">
            {selected.paragraphs.map((p) => <p key={p} className="text-lg leading-8 text-muted">{p}</p>)}
          </div>
        </article>
      )}
    </div>
  );
}

/* ─── Composant principal ───────────────────────────────────────────────── */
export function EnrenementProductDetail({ product }: { product: Product }) {
  const [colourKey, setColourKey]   = useState<ColourKey>(product.defaultColour);
  const [size, setSize]             = useState<Size>(product.defaultSize);
  const [added, setAdded]           = useState(false);
  const [openBenefit, setOpenBenefit] = useState<number | null>(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const { addItem }                 = useCart();

  const activeColour = useMemo(
    () => product.colours.find((c) => c.key === colourKey) ?? product.colours[0],
    [colourKey, product.colours],
  );
  const leatherClass = leatherClassByColour[activeColour.key] ?? "leather-havana-brown";
  const selectedImage = galleryImages[selectedGalleryImage] ?? galleryImages[0];

  function handleAdd() {
    addItem({ slug: product.slug, name: product.name, priceEUR: product.priceEUR,
      colour: colourKey, colourLabel: activeColour.label, colourSwatch: activeColour.swatch, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="bg-paper text-ink">

      <section className="mx-auto grid min-h-screen max-w-[1680px] gap-4 px-4 pt-20 md:px-8 lg:grid-cols-[1fr_520px] lg:pt-24">
        <ThreePhotoHero leatherClass={leatherClass} activeColour={activeColour.label} />
        <PurchasePanel product={product} activeColour={activeColour} colourKey={colourKey} setColourKey={setColourKey} size={size} setSize={setSize} onAdd={handleAdd} added={added} />
      </section>

      {/* Galerie */}
      <section className="mx-auto max-w-[1680px] px-4 py-16 md:px-8 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-[140px_1fr]">
          <ProductRail leatherClass={leatherClass} selectedGalleryImage={selectedGalleryImage} setSelectedGalleryImage={setSelectedGalleryImage} />
          <div className="relative min-h-[560px] overflow-hidden bg-white md:min-h-[700px]">
            <div className="absolute left-6 top-6 z-10">
              <p className="kicker text-muted">{product.category}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-soft">{selectedImage.label} / {activeColour.label}</p>
            </div>
            <div className="absolute right-6 top-6 z-10 text-right">
              <p className="kicker-tight text-muted">Elekka studio</p>
              <p className="mt-2 font-mono text-xs text-muted-soft">Remplacer par vos photos</p>
            </div>
            <div className="absolute inset-x-10 top-1/2 h-px bg-line" />
            <div className="absolute inset-y-10 left-1/2 w-px bg-line" />
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${selectedImage.scale}`}>
              <BridleIllustration leatherClass={leatherClass} size="hero" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid items-end gap-4 border-t border-line pt-5 md:grid-cols-[1fr_auto_auto]">
              <p className="max-w-sm text-sm leading-6 text-muted">{product.description}</p>
              <button type="button" onClick={handleAdd} className="cta-shine press h-11 bg-ink px-6 text-xs font-bold uppercase tracking-[0.18em] text-on-ink">{added ? "Ajouté ✓" : "Ajouter au panier"}</button>
              <div className="flex items-center gap-2">
                {product.colours.map((colour) => (
                  <button key={colour.key} type="button" onClick={() => setColourKey(colour.key as ColourKey)}
                    className={`press h-9 w-9 rounded-full border p-1 ${colourKey === colour.key ? "border-ink" : "border-line"}`}
                    aria-label={`Voir ${colour.label}`} aria-pressed={colourKey === colour.key}>
                    <span className="block h-full w-full rounded-full" style={{ background: colour.swatch }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation + bénéfices */}
      <section id="matiere" className="border-y border-line bg-paper">
        <div className="mx-auto max-w-[1680px] px-4 py-20 md:px-8">
          <div className="grid gap-10 lg:min-h-[560px] lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="kicker text-muted">Présentation</p>
              <h2 className="display mt-5 max-w-lg text-5xl leading-[0.96] md:text-7xl">Un appui juste, sans forcer.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <p className="text-xl leading-9">{product.longDescription}</p>
              <div id="entretien">
                <p className="kicker-tight text-muted">Entretien</p>
                <p className="mt-4 leading-8 text-muted">Après chaque séance, essuyez l'enrênement avec un chiffon légèrement humide. Nourrissez le cuir avec un baume adapté une à deux fois par mois.</p>
                <p className="mt-5 leading-8 text-muted">Rangez-le suspendu ou à plat, dans un endroit sec, à l'écart des sources de chaleur.</p>
              </div>
            </div>
          </div>
          <BenefitsBand openBenefit={openBenefit} setOpenBenefit={setOpenBenefit} />
        </div>
      </section>

      {/* Specs */}
      <section id="taille" className="bg-ink text-on-ink">
        <div className="mx-auto grid max-w-[1680px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:py-28">
          <div>
            <p className="kicker text-white/45">Informations</p>
            <h2 className="display mt-5 text-5xl leading-[0.94] md:text-7xl">Tout ce qui rassure avant l&apos;achat.</h2>
          </div>
          <div className="grid border-t border-white/15 md:grid-cols-2">
            {specs.map(([label, value]) => (
              <div key={label} className="border-b border-white/15 py-6 md:px-6">
                <p className="kicker-tight text-white/42">{label}</p>
                <p className="mt-3 text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
