import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/boutique/product-card";
import { CategoryNav } from "@/components/boutique/category-nav";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez la gamme Elekka : bridons, licoles, rênes et enrênements en cuir pleine fleur.",
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
  {
    key: "Enrênements",
    label: "Enrênements",
    title: "Nos enrênements.",
    subtitle: "Guider sans contraindre.",
    description:
      "Des enrênements conçus pour accompagner le travail dans le respect du cheval. Ajustement précis, action juste, utilisation maîtrisée.",
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

      <CategoryNav categories={categories.map(({ key, label }) => ({ key, label }))} />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 pb-24 space-y-24 md:space-y-32">
        {categories.map((cat, catIndex) => {
          const items = products.filter((p) => p.category === cat.key);
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
                {items.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </div>
            </section>
          );
        })}
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
            price: "30 €",
          },
          {
            key: "pieces-frontal",
            href: "/boutique/frontal",
            label: "Frontal",
            title: "Frontaux.",
            subtitle: "Changez de style, en un geste.",
            description: "Une pièce simple à remplacer, pour ajuster l'équilibre et l'allure de votre filet.",
            price: "25 €",
          },
          {
            key: "pieces-tetiere",
            href: "/boutique/tetiere",
            label: "Têtière",
            title: "Têtières.",
            subtitle: "Adaptez votre filet, sans compromis.",
            description: "Remplacez facilement la têtière pour plus de confort, selon votre cheval et votre équitation.",
            price: "35 €",
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
                <p className="font-mono text-xl font-semibold">{piece.price}</p>
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
