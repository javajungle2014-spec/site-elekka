"use client";

import { useMemo, useState } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Product = {
  slug: string;
  name: string;
  category: "Bridons" | "Licoles" | "Rênes" | "Enrênements";
  family: "Classique" | "Anatomique";
  tagline: string;
  priceEUR: number;
  description: string;
  longDescription: string;
  highlights: string[];
  colours: { key: string; label: string; swatch: string; images: string[] }[];
  sizes: ("Full" | "Cob")[];
  defaultColour: string;
  defaultSize: "Full" | "Cob";
};

/* ─── Données produit ────────────────────────────────────────────────────── */
const product: Product = {
  slug: "licol-classique",
  name: "Licol Classique",
  category: "Licoles",
  family: "Classique",
  tagline: "Un licol en cuir sobre, précis et confortable, pensé pour le travail quotidien comme pour la sortie concours.",
  priceEUR: 75,
  description: "Cuir pleine fleur, têtière anatomique et finitions discrètes pour un rendu premium sans surcharge.",
  longDescription: "Le Licol Elekka a été dessiné pour les cavaliers qui veulent un équipement élégant, robuste et facile à assortir. Sa construction soignée répartit la pression, et la bouclerie inox garde une ligne nette même après un usage régulier.",
  highlights: ["Cuir pleine fleur", "Bouclerie inox", "Tailles Full et Cob"],
  colours: [
    { key: "havana",     label: "Havana Brown", swatch: "#6f4528", images: [] },
    { key: "noir",       label: "Noir",          swatch: "#0a0a0a", images: [] },
    { key: "dark-brown", label: "Brun foncé",    swatch: "#3a2418", images: [] },
  ],
  sizes: ["Full", "Cob"],
  defaultColour: "havana",
  defaultSize: "Full",
};

/* ─── Contenu éditorial ─────────────────────────────────────────────────── */
const leatherClassByColour: Record<string, string> = {
  havana:       "leather-havana-brown",
  noir:         "leather-noir",
  "dark-brown": "leather-dark-brown",
};

const sections = [
  {
    label: "Confort",
    title: "Une têtière qui libère les zones sensibles.",
    copy: "La découpe anatomique évite les points de pression inutiles et accompagne mieux les mouvements de la tête. Le licol garde une présence nette, sans rigidité excessive.",
  },
  {
    label: "Finition",
    title: "Des détails sobres, visibles seulement de près.",
    copy: "La bouclerie inox, les coutures propres donnent un rendu premium sans ajouter de décor. L'objet reste simple, durable et facile à assortir.",
  },
  {
    label: "Usage",
    title: "Assez élégant pour sortir, assez robuste pour travailler.",
    copy: "Pensé pour une routine régulière, le Licol Classique accompagne les séances quotidiennes avec la même ligne épurée.",
  },
];

const specs = [
  ["Cuir",      "Pleine fleur"],
  ["Têtière",   "Anatomique"],
  ["Bouclerie", "Inox poli"],
  ["Tailles",   "Cob, Full"],
  ["Livraison", "2 à 4 jours ouvrés"],
  ["Retours",   "14 jours"],
];

const benefits = [
  {
    title: "Têtière anatomique",
    articleTitle: "Pourquoi choisir une têtière anatomique ?",
    paragraphs: [
      "La têtière est l'un des points les plus sensibles du licol, car elle repose près des oreilles et de la nuque. Une forme anatomique cherche à dégager ces zones pour limiter les pressions inutiles.",
      "Sur un cheval au travail régulier, ce détail peut faire une vraie différence : le contact reste plus stable, le licol se pose mieux et le cheval garde plus de liberté dans ses mouvements.",
      "Le résultat attendu n'est pas spectaculaire visuellement, mais il se ressent dans l'usage : moins de gêne, une ligne plus propre et un meilleur confort au quotidien.",
    ],
  },
  {
    title: "Bouclerie inox",
    articleTitle: "Pourquoi une bouclerie inox ?",
    paragraphs: [
      "La bouclerie est manipulée à chaque réglage. L'inox permet de garder des boucles propres, stables et faciles à entretenir dans le temps.",
      "Sa finition discrète s'accorde bien avec une esthétique premium : elle ne prend pas le dessus sur le cuir, mais renforce la sensation de qualité.",
      "C'est un choix simple, durable et cohérent pour un licol pensé pour le quotidien.",
    ],
  },
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
    title: "Tailles disponibles",
    articleTitle: "Full ou Cob : comment choisir ?",
    paragraphs: [
      "La taille Full convient aux chevaux de sport et de selle adultes de morphologie standard. C'est la taille la plus courante.",
      "La taille Cob est adaptée aux poneys grands gabarits et aux chevaux de morphologie plus fine. Elle offre un ajustement plus précis sur des têtes plus petites.",
      "En cas de doute, mesurez le tour de tête de votre cheval ou contactez-nous avant commande.",
    ],
  },
];

const galleryImages = [
  { label: "Vue principale", scale: "scale-100" },
  { label: "Détail nuque",   scale: "scale-90" },
  { label: "Détail cuir",    scale: "scale-75" },
];

/* ─── Composants visuels ────────────────────────────────────────────────── */
function Price({ value, light = false }: { value: number; light?: boolean }) {
  return (
    <span className={`shrink-0 font-mono text-sm tabular-nums ${light ? "text-on-ink" : "text-ink"}`}>
      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)}
    </span>
  );
}

function BridleIllustration({ leatherClass, size = "hero" }: { leatherClass: string; size?: "hero" | "card" | "thumb" }) {
  const dimensions = {
    hero:  "h-[430px] w-[318px] sm:h-[520px] sm:w-[386px] xl:h-[620px] xl:w-[460px]",
    card:  "h-[300px] w-[222px] md:h-[370px] md:w-[274px]",
    thumb: "h-[126px] w-[94px]",
  }[size];
  const ring = {
    hero:  "border-[22px] sm:border-[28px] xl:border-[34px]",
    card:  "border-[16px] md:border-[20px]",
    thumb: "border-[7px]",
  }[size];
  const crown = {
    hero:  "border-x-[16px] border-t-[16px] sm:border-x-[21px] sm:border-t-[21px] xl:border-x-[25px] xl:border-t-[25px]",
    card:  "border-x-[12px] border-t-[12px] md:border-x-[15px] md:border-t-[15px]",
    thumb: "border-x-[5px] border-t-[5px]",
  }[size];
  const buckle = {
    hero:  "h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7",
    card:  "h-4 w-4 md:h-5 md:w-5",
    thumb: "h-2 w-2",
  }[size];

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

function ProductRail({ leatherClass, selectedGalleryImage, setSelectedGalleryImage }: {
  leatherClass: string;
  selectedGalleryImage: number;
  setSelectedGalleryImage: (i: number) => void;
}) {
  return (
    <div className="hidden gap-4 lg:grid">
      {galleryImages.map((item, index) => (
        <button key={item.label} type="button"
          onClick={() => setSelectedGalleryImage(index)}
          className={`press relative flex h-40 items-center justify-center overflow-hidden bg-white text-left transition ${
            selectedGalleryImage === index ? "outline outline-2 outline-ink" : "hover:opacity-75"
          }`}
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
            className={`relative grid min-h-[500px] grid-rows-[1fr_auto] overflow-hidden bg-white p-5 md:min-h-[560px] xl:min-h-[620px] ${
              index === 1 ? "lg:translate-y-20" : index === 2 ? "lg:translate-y-40" : ""
            }`}>
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

function PurchasePanel({ product: p, activeColour, colourKey, setColourKey, size, setSize }: {
  product: Product;
  activeColour: Product["colours"][number];
  colourKey: string;
  setColourKey: (key: string) => void;
  size: "Full" | "Cob";
  setSize: (size: "Full" | "Cob") => void;
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
              <button key={colour.key} type="button"
                onClick={() => setColourKey(colour.key)}
                className={`press flex items-center justify-between border px-4 py-4 text-left ${
                  colourKey === colour.key ? "border-white bg-white text-ink" : "border-white/18 text-on-ink hover:border-white/45"
                }`}
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
              <button key={item} type="button"
                onClick={() => setSize(item)}
                className={`press h-12 border text-sm font-bold ${
                  size === item ? "border-white bg-white text-ink" : "border-white/18 text-on-ink hover:border-white/45"
                }`}
                aria-pressed={size === item}>
                {item}
              </button>
            ))}
          </div>
          <a href="#taille"
            className="press mt-3 block border border-white/18 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/70 transition hover:border-white/45 hover:text-on-ink">
            Guide des tailles
          </a>
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
          <button type="button" className="cta-shine press h-14 w-full bg-on-ink px-6 text-sm font-bold uppercase tracking-[0.18em] text-ink">
            Ajouter au panier
          </button>
        </div>
      </div>
    </aside>
  );
}

function BenefitsBand({ openBenefit, setOpenBenefit }: {
  openBenefit: number | null;
  setOpenBenefit: (i: number | null) => void;
}) {
  const selectedBenefit = openBenefit === null ? null : benefits[openBenefit];
  return (
    <div className="mt-16 border-y border-line">
      <div className="grid gap-px bg-line md:grid-cols-4">
        {benefits.map((benefit, index) => {
          const isOpen = openBenefit === index;
          return (
            <button key={benefit.title} type="button"
              onClick={() => setOpenBenefit(isOpen ? null : index)}
              className={`press bg-paper px-4 py-5 text-left transition ${isOpen ? "text-ink" : "text-muted hover:text-ink"}`}
              aria-pressed={isOpen} aria-expanded={isOpen}>
              <span className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.65rem] text-muted-soft">0{index + 1}</span>
                <span className="font-mono text-xl leading-none text-muted">{isOpen ? "-" : "+"}</span>
              </span>
              <span className="mt-3 block text-sm font-bold uppercase tracking-[0.08em]">{benefit.title}</span>
            </button>
          );
        })}
      </div>
      {selectedBenefit && (
        <article className="grid gap-8 py-10 md:grid-cols-[minmax(220px,0.34fr)_1fr]">
          <h3 className="display max-w-md text-4xl leading-none md:text-6xl">{selectedBenefit.articleTitle}</h3>
          <div className="max-w-3xl space-y-5">
            {selectedBenefit.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-muted">{paragraph}</p>
            ))}
          </div>
        </article>
      )}
    </div>
  );
}

/* ─── Page principale ───────────────────────────────────────────────────── */
export default function LicolPage() {
  const [colourKey, setColourKey]           = useState(product.defaultColour);
  const [size, setSize]                     = useState(product.defaultSize);
  const [openBenefit, setOpenBenefit]       = useState<number | null>(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

  const activeColour = useMemo(
    () => product.colours.find((c) => c.key === colourKey) ?? product.colours[0],
    [colourKey],
  );
  const leatherClass = leatherClassByColour[activeColour.key] ?? "leather-havana-brown";
  const selectedImage = galleryImages[selectedGalleryImage] ?? galleryImages[0];

  return (
    <main className="bg-paper text-ink">

      {/* Hero 3 photos + panneau achat */}
      <section className="mx-auto grid min-h-screen max-w-[1680px] gap-4 px-4 pt-20 md:px-8 lg:grid-cols-[1fr_520px] lg:pt-24">
        <ThreePhotoHero leatherClass={leatherClass} activeColour={activeColour.label} />
        <PurchasePanel product={product} activeColour={activeColour} colourKey={colourKey} setColourKey={setColourKey} size={size} setSize={setSize} />
      </section>

      {/* Galerie hero */}
      <section className="mx-auto max-w-[1680px] px-4 py-16 md:px-8 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-[140px_1fr]">
          <ProductRail leatherClass={leatherClass} selectedGalleryImage={selectedGalleryImage} setSelectedGalleryImage={setSelectedGalleryImage} />
          <div className="relative min-h-[560px] overflow-hidden bg-white md:min-h-[700px]">
            <div className="absolute left-6 top-6 z-10">
              <p className="kicker text-muted">{product.category}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-soft">
                {selectedImage.label} / {activeColour.label}
              </p>
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
              <button type="button" className="cta-shine press h-11 bg-ink px-6 text-xs font-bold uppercase tracking-[0.18em] text-on-ink">
                Ajouter au panier
              </button>
              <div className="flex items-center gap-2">
                {product.colours.map((colour) => (
                  <button key={colour.key} type="button"
                    onClick={() => setColourKey(colour.key)}
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

      {/* Intro + bénéfices */}
      <section id="matiere" className="border-y border-line bg-paper">
        <div className="mx-auto max-w-[1680px] px-4 py-20 md:px-8">
          <div className="grid gap-10 lg:min-h-[560px] lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="kicker text-muted">Présentation</p>
              <h2 className="display mt-5 max-w-lg text-5xl leading-[0.96] md:text-7xl">Une pièce centrale, sans bruit visuel.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <p className="text-xl leading-9">{product.longDescription}</p>
              <div id="entretien">
                <p className="kicker-tight text-muted">Entretien</p>
                <p className="mt-4 leading-8 text-muted">
                  Après chaque séance, passez une éponge légèrement humide sur les zones en contact avec la transpiration. Laissez sécher naturellement, puis nourrissez le cuir avec un baume adapté une à deux fois par mois.
                </p>
                <p className="mt-5 leading-8 text-muted">
                  Évitez les sources de chaleur directe et rangez le licol à plat ou suspendu, dans un endroit sec. Le cuir garde ainsi sa souplesse, sa couleur et une tenue propre dans le temps.
                </p>
              </div>
            </div>
          </div>
          <BenefitsBand openBenefit={openBenefit} setOpenBenefit={setOpenBenefit} />
        </div>
      </section>

      {/* Specs + tailles */}
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
