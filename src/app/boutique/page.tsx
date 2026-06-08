import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/boutique/product-card";
import { CategoryNav } from "@/components/boutique/category-nav";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Boutique Elekka — Bridons cuir classiques et anatomiques (99 € à 175 €), licoles, rênes. Rênes offertes pour tout bridon acheté. Livraison gratuite, retours 14 jours.",
};

const categories = [
  {
    key: "Bridons",
    label: "Bridons",
    title: "Nos bridons.",
    subtitle: "La précision, sans compromis.",
    description:
      "Moins de contraintes. Plus de sensations. Pensé pour laisser place à l'essentiel, affiner le contact et renforcer la connexion avec votre cheval.",
  },
  {
    key: "Licoles",
    label: "Licoles",
    title: "Nos licoles.",
    subtitle: "L'exigence, au quotidien.",
    description:
      "Fiables, jour après jour. Pensés pour durer, sans compromis, avec une conception simple et solide, faite pour accompagner le quotidien avec élégance.",
  },
  {
    key: "Rênes",
    label: "Rênes",
    title: "Nos rênes.",
    subtitle: "Chaque sensation compte.",
    description:
      "Des rênes pensées pour une prise en main précise et un contact constant. Légères, équilibrées, sans compromis sur le ressenti.",
  },
];

export default function BoutiquePage() {
  return (
    <>
      {/* Bandeau personnalisation */}
      <Link href="/boutique/personnaliser"
        className="press group block bg-ink text-on-ink hover:bg-ink-soft transition-all duration-300">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-base font-semibold tracking-tight">✦ Créez votre filet sur mesure</span>
            <span className="hidden md:inline text-sm text-on-ink-muted group-hover:text-on-ink transition-colors">Structure · Couleur · Rênes · Enrênement</span>
          </div>
          <span className="text-sm font-semibold flex items-center gap-2 shrink-0 group-hover:gap-3 transition-all duration-200">
            Commencer <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      <CategoryNav categories={[...categories.map(({ key, label }) => ({ key, label })), { key: "Enrênements", label: "Enrênements" }]} />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 pb-24 space-y-24 md:space-y-32">
        {categories.map((cat, catIndex) => {
          const items = products.filter((p) => p.category === cat.key && !p.hidden);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} id={cat.key} className="scroll-mt-28">
              <header className="mb-16 md:mb-20">
                <p className="kicker text-muted rise" style={{ ["--i" as string]: catIndex * 3 }}>
                  {cat.label}
                </p>
                <h2
                  className="display mt-4 text-5xl md:text-7xl rise"
                  style={{ ["--i" as string]: catIndex * 3 + 1 }}
                >
                  {cat.title}
                  <br />
                  <span className="text-muted">{cat.subtitle}</span>
                </h2>
                <p
                  className="mt-6 text-base text-muted leading-relaxed max-w-[52ch] rise"
                  style={{ ["--i" as string]: catIndex * 3 + 2 }}
                >
                  {cat.description}
                </p>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
                {cat.key === "Rênes"
                  ? items.flatMap((product) =>
                      product.colours.map((c, ci) => (
                        <ProductCard
                          key={`${product.slug}-${c.key}`}
                          product={product}
                          colourOverride={c.key}
                          index={ci}
                          compact
                          fallbackImage={product.slug === "renes-2" ? "/products/renes-1/renes-1-havana-brown-studio-02.png" : undefined}
                        />
                      ))
                    )
                  : items.map((product, i) => (
                      <ProductCard key={product.slug} product={product} index={i} />
                    ))
                }
              </div>
            </section>
          );
        })}
        {/* ── Enrênements — bientôt disponibles ── */}
        {(() => {
          const enrenements = products.filter(p => p.category === "Enrênements");
          return (
            <section id="Enrênements" className="scroll-mt-28">
              <header className="mb-16 md:mb-20">
                <p className="kicker text-muted rise">Enrênements</p>
                <h2 className="display mt-4 text-5xl md:text-7xl rise">
                  Nos enrênements.<br />
                  <span className="text-muted">En cours de création.</span>
                </h2>
                <p className="mt-6 text-base text-muted leading-relaxed max-w-[52ch] rise">
                  Conçus pour accompagner le travail monté et en main. Même exigence de cuir et de finition que l'ensemble de la gamme Elekka.
                </p>
              </header>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
                {enrenements.map((product, i) => (
                  <div key={product.slug} className="group block rise" style={{ ["--i" as string]: i + 3 }}>
                    <div className="relative aspect-[4/5] overflow-hidden flex flex-col items-center justify-center gap-4"
                      style={{
                        backgroundColor: "var(--color-paper-2)",
                        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 20px)",
                      }}>
                      <div className="absolute inset-6 border border-line/60 pointer-events-none" />
                      <span className="kicker text-muted-soft tracking-[0.22em]">En cours de création</span>
                      <p className="text-center text-sm font-semibold text-ink px-6 leading-snug">{product.name}</p>
                    </div>
                    <div className="mt-5">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-sm md:text-lg font-semibold tracking-tight text-ink leading-snug">{product.name}</h2>
                        <span className="shrink-0 font-mono text-xs md:text-sm text-muted tabular-nums pt-0.5">{formatPrice(product.priceEUR)}</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed hidden sm:block">{product.tagline}</p>
                      <div className="flex items-center gap-2 mt-4">
                        {product.colours.map(c => (
                          <span key={c.key} className="inline-block w-3.5 h-3.5 rounded-full border border-line/80 shrink-0" style={{ backgroundColor: c.swatch }} title={c.label} />
                        ))}
                        <span className="text-xs text-muted ml-0.5">{product.colours.map(c => c.label).join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-5 text-xs text-muted-soft uppercase tracking-widest font-medium">
                        En cours de création
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}
      </div>

      {/* ── Pièces détachées ── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pb-24 space-y-20">
        {[
          {
            key: "pieces-muserolle",
            href: "/boutique/muserolle",
            label: "Muserolle",
            title: "Muserolles.",
            subtitle: "Choisissez, remplacez, adaptez.",
            description: "Une muserolle pensée pour s'intégrer parfaitement à votre filet, selon vos besoins et ceux de votre cheval.",
          },
          {
            key: "pieces-frontal",
            href: "/boutique/frontal",
            label: "Frontal",
            title: "Frontaux.",
            subtitle: "Changez de style, en un geste.",
            description: "Une pièce simple à remplacer, pour ajuster l'équilibre et l'allure de votre filet.",
          },
          {
            key: "pieces-tetiere",
            href: "/boutique/tetiere",
            label: "Têtière",
            title: "Têtières.",
            subtitle: "Adaptez votre filet, sans compromis.",
            description: "Remplacez facilement la têtière pour plus de confort, selon votre cheval et votre équitation.",
          },
        ].map((piece) => (
          <section key={piece.key} id={piece.key} className="scroll-mt-28">
            <header className="mb-10">
              <p className="kicker text-muted">{piece.label}</p>
              <h2 className="display mt-4 text-5xl md:text-7xl">
                {piece.title}<br />
                <span className="text-muted">{piece.subtitle}</span>
              </h2>
              <p className="mt-6 text-base text-muted leading-relaxed max-w-[52ch]">{piece.description}</p>
            </header>
            <Link href={piece.href}
              className="press group flex items-center justify-between gap-6 border border-line p-8 md:p-12 hover:border-ink transition-colors duration-200">
              <div className="flex items-center gap-8">
                <div className="leather-havana-brown w-20 h-20 shrink-0" />
                <div>
                  <p className="text-lg font-semibold">{piece.label} Elekka</p>
                  <p className="text-sm text-muted mt-1">Havana Brown · Noir · Full · Cob</p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="press text-xs font-bold uppercase tracking-widest border border-ink px-5 py-2.5 group-hover:bg-ink group-hover:text-on-ink transition-colors">
                  Voir →
                </span>
              </div>
            </Link>
          </section>
        ))}
      </div>

      {/* ── CTA Personnalisation ── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pb-24">
        <Link href="/boutique/personnaliser"
          className="press group block bg-ink text-on-ink p-8 md:p-12 hover:bg-ink-soft transition-colors">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker text-on-ink-muted mb-4">Nouveau</p>
              <h2 className="display text-3xl md:text-5xl leading-tight">
                Personnalisez<br />
                <span className="text-on-ink-muted">votre filet.</span>
              </h2>
              <p className="mt-5 text-sm text-on-ink-muted leading-relaxed max-w-[44ch]">
                Composez pièce par pièce — structure, frontal, muserolle, coloris, rênes.
                Même prix, vos propres choix. À partir de 95 €.
              </p>
            </div>
            <ArrowUpRight size={32} className="text-on-ink-muted group-hover:text-on-ink transition-colors shrink-0" />
          </div>
        </Link>
      </div>
    </>
  );
}
