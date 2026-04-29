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
    subtitle: "Trois modèles, un seul niveau.",
    description:
      "Chaque modèle est conçu pour le confort du cheval et la précision du cavalier. Cuir pleine fleur, quincaillerie inox, finitions soignées.",
  },
  {
    key: "Licoles",
    label: "Licoles",
    title: "Nos licoles.",
    subtitle: "Cuir pleine fleur, au quotidien.",
    description:
      "Des licoles conçus avec la même exigence que nos bridons. Résistants, souples dès le premier usage, pour la sellerie comme pour le pré.",
  },
  {
    key: "Rênes",
    label: "Rênes",
    title: "Nos rênes.",
    subtitle: "La connexion entre les mains et le mors.",
    description:
      "Rênes en cuir pleine fleur, avec ou sans grip caoutchouc. Légères, durables, taillées pour une prise en main précise.",
  },
  {
    key: "Enrênements",
    label: "Enrênements",
    title: "Nos enrênements.",
    subtitle: "Un appui juste, pour un travail juste.",
    description:
      "Enrênements en cuir pleine fleur, réglables et compatibles avec tous les bridons Elekka. Conçus pour accompagner le travail sans contraindre.",
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
            key: "pieces-tetiere",
            label: "Têtière",
            title: "Têtières.",
            subtitle: "La pièce principale, sur la nuque.",
            description: "Classique ou anatomique, la têtière définit le confort et la ligne du filet. Disponible à l'achat séparément prochainement.",
          },
          {
            key: "pieces-muserolle",
            label: "Muserolle",
            title: "Muserolles.",
            subtitle: "Le contact sur le chanfrein.",
            description: "Simple, rembourrée ou triple attache — chaque modèle répond à un usage précis. Disponible à l'achat séparément prochainement.",
          },
          {
            key: "pieces-frontal",
            label: "Frontal",
            title: "Frontaux.",
            subtitle: "La pièce qui traverse le front.",
            description: "Rectiligne ou anatomique, large ou discret. Le frontal affine la silhouette du filet. Disponible à l'achat séparément prochainement.",
          },
        ].map((piece, i) => (
          <section key={piece.key} id={piece.key} className="scroll-mt-28">
            <header className="mb-10">
              <p className="kicker text-muted">{piece.label}</p>
              <h2 className="display mt-4 text-5xl md:text-7xl">
                {piece.title}<br />
                <span className="text-muted">{piece.subtitle}</span>
              </h2>
              <p className="mt-6 text-base text-muted leading-relaxed max-w-[52ch]">{piece.description}</p>
            </header>
            <div className="border border-dashed border-line p-10 md:p-16 flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold">Bientôt disponible</p>
                <p className="text-sm text-muted mt-1">En attendant, configurez votre filet sur mesure.</p>
              </div>
              <Link href="/boutique/personnaliser"
                className="press shrink-0 flex items-center gap-2 bg-ink text-on-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-ink-soft transition-colors">
                Configurer
              </Link>
            </div>
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
