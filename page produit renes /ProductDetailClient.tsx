"use client";

import { useMemo, useState } from "react";

export type Product = {
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

type Props = {
  product: Product;
};

const leatherClassByColour: Record<string, string> = {
  havana: "leather-havana-brown",
  noir: "leather-noir",
  "dark-brown": "leather-dark-brown",
};

const chapters = [
  {
    eyebrow: "01 / Confort",
    title: "Têtière dégagée",
    copy: "La forme anatomique limite les points de pression derrière les oreilles et laisse plus de liberté dans les zones sensibles.",
  },
  {
    eyebrow: "02 / Ligne",
    title: "Silhouette nette",
    copy: "Les montants restent fins, la muserolle est doublée sans paraître lourde, et la bouclerie se fait discrète.",
  },
  {
    eyebrow: "03 / Usage",
    title: "Pensé pour durer",
    copy: "Le cuir se patine avec le temps, tout en gardant une tenue propre si l'entretien est régulier.",
  },
];

const specs = [
  ["Cuir", "Pleine fleur"],
  ["Muserolle", "Doublée"],
  ["Bouclerie", "Inox poli"],
  ["Rênes", "Incluses"],
  ["Tailles", "Cob, Full"],
  ["Expédition", "2 à 4 jours ouvrés"],
];

export function ProductDetailClient({ product }: Props) {
  const [colourKey, setColourKey] = useState(product.defaultColour);
  const [size, setSize] = useState(product.defaultSize);
  const activeColour = useMemo(
    () => product.colours.find((colour) => colour.key === colourKey) ?? product.colours[0],
    [colourKey, product.colours],
  );
  const leatherClass = leatherClassByColour[activeColour.key] ?? "leather-havana-brown";

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />

      <section className="relative min-h-screen overflow-hidden bg-white pt-16">
        <div className="absolute inset-x-0 top-16 h-px bg-line" />
        <div className="absolute left-1/2 top-[18%] hidden -translate-x-1/2 whitespace-nowrap text-[17vw] font-black leading-none tracking-[-0.08em] text-ink/[0.035] lg:block">
          {product.name}
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1600px] grid-rows-[auto_1fr_auto] px-4 md:px-8">
          <div className="grid gap-6 py-8 lg:grid-cols-[1fr_430px] lg:py-12">
            <div>
              <p className="kicker text-muted">{product.category} / {product.family}</p>
              <h1 className="display mt-4 max-w-4xl text-6xl leading-[0.88] md:text-8xl lg:text-9xl">
                {product.name}
              </h1>
            </div>
            <div className="max-w-xl lg:pt-10">
              <p className="text-xl leading-8 text-muted md:text-2xl md:leading-9">{product.tagline}</p>
            </div>
          </div>

          <div className="relative flex min-h-[520px] items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 writing-vertical font-mono text-xs uppercase tracking-[0.22em] text-muted-soft md:block">
              Replace with product photography
            </div>
            <ProductPhotoPlaceholder leatherClass={leatherClass} />
          </div>

          <div className="grid gap-4 border-t border-line py-5 lg:grid-cols-[1fr_420px]">
            <div className="grid gap-3 sm:grid-cols-3">
              {product.highlights.slice(0, 3).map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="text-sm font-semibold">{highlight}</span>
                </div>
              ))}
            </div>
            <BuyStrip
              product={product}
              activeColour={activeColour}
              colourKey={colourKey}
              setColourKey={setColourKey}
              size={size}
              setSize={setSize}
            />
          </div>
        </div>
      </section>

      <StorySection product={product} leatherClass={leatherClass} />
      <ChapterSection />
      <SpecsSection />
      <FinalPurchase
        product={product}
        activeColour={activeColour}
        colourKey={colourKey}
        setColourKey={setColourKey}
        size={size}
        setSize={setSize}
      />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <a href="/" className="display text-2xl">Elekka</a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#histoire" className="kicker-tight text-muted transition hover:text-ink">Histoire</a>
          <a href="#details" className="kicker-tight text-muted transition hover:text-ink">Détails</a>
          <a href="#specs" className="kicker-tight text-muted transition hover:text-ink">Specs</a>
        </nav>
      </div>
    </header>
  );
}

function Price({ value }: { value: number }) {
  return (
    <span className="font-mono text-sm tabular-nums">
      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)}
    </span>
  );
}

function ProductPhotoPlaceholder({ leatherClass }: { leatherClass: string }) {
  return (
    <div className="relative flex aspect-[4/5] w-[min(78vw,520px)] items-center justify-center bg-white">
      <div className="absolute inset-8 rounded-full border border-line" />
      <div className="absolute inset-16 rounded-full border border-line/70" />
      <BridleDrawing leatherClass={leatherClass} />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-soft">
        visuel exemple
      </div>
    </div>
  );
}

function BridleDrawing({ leatherClass }: { leatherClass: string }) {
  return (
    <div className="relative h-[430px] w-[320px] md:h-[560px] md:w-[420px]">
      <div className={`absolute left-[22%] top-[6%] h-[78%] w-[56%] rounded-full border-[22px] md:border-[30px] ${leatherClass}`} />
      <div className={`absolute left-[34%] top-0 h-[24%] w-[32%] rounded-t-full border-x-[18px] border-t-[18px] border-transparent md:border-x-[24px] md:border-t-[24px] ${leatherClass}`} />
      <div className={`absolute left-[7%] top-[43%] h-[7%] w-[86%] rounded-full ${leatherClass}`} />
      <div className={`absolute left-[16%] top-[58%] h-[6%] w-[68%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[28%] top-[30%] h-[42%] w-[44%] rounded-full border border-ink/12" />
      <div className="absolute left-[22%] top-[42%] h-6 w-6 rounded-full border border-ink/20 bg-paper shadow-sm" />
      <div className="absolute right-[22%] top-[42%] h-6 w-6 rounded-full border border-ink/20 bg-paper shadow-sm" />
      <div className={`absolute left-[46%] top-[63%] h-[27%] w-[8%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[38%] top-[72%] h-[9%] w-[24%] rounded-full border border-ink/20" />
    </div>
  );
}

function BuyStrip({
  product,
  activeColour,
  colourKey,
  setColourKey,
  size,
  setSize,
}: {
  product: Product;
  activeColour: Product["colours"][number];
  colourKey: string;
  setColourKey: (key: string) => void;
  size: "Full" | "Cob";
  setSize: (size: "Full" | "Cob") => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Selector label="Cuir">
          <div className="flex gap-2">
            {product.colours.map((colour) => (
              <button
                key={colour.key}
                type="button"
                onClick={() => setColourKey(colour.key)}
                className={`press h-10 w-10 rounded-full border p-1 ${colourKey === colour.key ? "border-ink" : "border-line"}`}
                aria-label={colour.label}
                aria-pressed={colourKey === colour.key}
              >
                <span className="block h-full w-full rounded-full" style={{ background: colour.swatch }} />
              </button>
            ))}
          </div>
          <span className="mt-2 block text-sm font-semibold">{activeColour.label}</span>
        </Selector>
        <Selector label="Taille">
          <div className="flex gap-2">
            {product.sizes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSize(item)}
                className={`press h-10 min-w-16 border px-4 text-sm font-bold ${size === item ? "border-ink bg-ink text-on-ink" : "border-line bg-white"}`}
                aria-pressed={size === item}
              >
                {item}
              </button>
            ))}
          </div>
        </Selector>
      </div>
      <div className="flex items-end gap-4">
        <div>
          <p className="kicker-tight text-muted">Prix</p>
          <p className="mt-2"><Price value={product.priceEUR} /></p>
        </div>
        <button type="button" className="cta-shine press h-12 bg-ink px-7 text-xs font-bold uppercase tracking-[0.18em] text-on-ink">
          Ajouter
        </button>
      </div>
    </div>
  );
}

function Selector({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="kicker-tight mb-2 text-muted">{label}</p>
      {children}
    </div>
  );
}

function StorySection({ product, leatherClass }: { product: Product; leatherClass: string }) {
  return (
    <section id="histoire" className="bg-ink text-on-ink">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        <div className="flex min-h-[760px] items-center px-4 py-20 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <p className="kicker text-white/45">Le produit</p>
            <h2 className="display mt-6 text-5xl leading-[0.94] md:text-8xl">Du quotidien, mais avec une vraie présence.</h2>
            <p className="mt-10 text-xl leading-9 text-white/72">{product.longDescription}</p>
            <p className="mt-7 leading-8 text-white/55">
              L'idée n'est pas d'ajouter du décor. La page doit laisser respirer le cuir, montrer la forme, puis donner les preuves : confort, réglage, entretien, livraison.
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[760px] items-center justify-center bg-white">
          <div className="absolute left-8 top-8 font-mono text-xs uppercase tracking-[0.22em] text-muted-soft">photo secondaire</div>
          <div className="scale-75 md:scale-90">
            <ProductPhotoPlaceholder leatherClass={leatherClass} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterSection() {
  return (
    <section id="details" className="bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="kicker text-muted">Détails</p>
            <h2 className="display mt-5 max-w-lg text-5xl leading-[0.96] md:text-7xl">Ce que la page doit raconter.</h2>
          </div>
          <div>
            {chapters.map((chapter) => (
              <article key={chapter.title} className="grid gap-6 border-t border-line py-12 md:grid-cols-[180px_1fr]">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{chapter.eyebrow}</p>
                <div>
                  <h3 className="display text-4xl leading-none md:text-6xl">{chapter.title}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{chapter.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecsSection() {
  return (
    <section id="specs" className="bg-paper-2">
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="kicker text-muted">Fiche claire</p>
            <h2 className="display mt-4 text-5xl leading-none md:text-7xl">Spécifications</h2>
          </div>
          <p className="hidden max-w-sm leading-7 text-muted md:block">
            Une zone simple pour rassurer sans casser le rythme éditorial de la page.
          </p>
        </div>
        <div className="grid border-y border-line md:grid-cols-2 lg:grid-cols-3">
          {specs.map(([label, value]) => (
            <div key={label} className="border-b border-line py-6 md:border-r md:px-6 lg:nth-[3n]:border-r-0">
              <p className="kicker-tight text-muted">{label}</p>
              <p className="mt-3 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalPurchase({
  product,
  activeColour,
  colourKey,
  setColourKey,
  size,
  setSize,
}: {
  product: Product;
  activeColour: Product["colours"][number];
  colourKey: string;
  setColourKey: (key: string) => void;
  size: "Full" | "Cob";
  setSize: (size: "Full" | "Cob") => void;
}) {
  return (
    <section className="bg-white px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-8 border-t border-line pt-10 lg:grid-cols-[1fr_520px]">
        <div>
          <p className="kicker text-muted">Prêt à commander</p>
          <h2 className="display mt-4 text-5xl leading-none md:text-7xl">{product.name}</h2>
          <p className="mt-6 max-w-xl leading-8 text-muted">
            Livraison offerte dès 150 EUR. Retours sous 14 jours. Conseil taille disponible avant commande.
          </p>
        </div>
        <div>
          <BuyStrip
            product={product}
            activeColour={activeColour}
            colourKey={colourKey}
            setColourKey={setColourKey}
            size={size}
            setSize={setSize}
          />
        </div>
      </div>
    </section>
  );
}
