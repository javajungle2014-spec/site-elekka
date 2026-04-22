import type { Metadata } from "next";
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
                {items.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
