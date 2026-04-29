import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — Notre histoire",
  description: "Elekka est née d'un constat simple : un bon filet ne devrait pas forcément coûter aussi cher. Issue d'une famille de cavaliers, la marque met le produit au centre.",
  openGraph: {
    title: "À propos — Elekka",
    description: "Elekka est née d'un constat simple : un bon filet ne devrait pas forcément coûter aussi cher.",
    url: "https://elekka-sellier.fr/a-propos",
  },
};

export default function AProposPage() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      {/* Header */}
      <header className="max-w-[56ch]">
        <p className="kicker text-muted">L'histoire</p>
        <h1 className="display mt-4 text-5xl md:text-7xl">
          Moins de marketing,<br />
          <span className="text-muted">plus de produit.</span>
        </h1>
      </header>

      {/* Body */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-x-20 gap-y-12 max-w-[1100px]">
        <section className="space-y-6 text-base md:text-[1.0625rem] leading-relaxed text-ink">
          <p>
            Elekka est née d'un constat simple : pourquoi un bon filet devrait-il
            forcément coûter aussi cher ? Issue d'une famille de cavaliers, la marque
            s'inscrit dans une pratique réelle. Celle du terrain — un équipement conçu
            sur le terrain, pour le terrain.
          </p>
          <p>
            Les grandes marques sont connues, respectées, utilisées. Mais une question
            reste : qu'est-ce qui justifie vraiment ces prix ? Le cuir, la précision de
            la coupe, l'ergonomie, l'anatomie. Ce qui coûte cher, souvent, ce n'est pas
            le produit. C'est le nom.
          </p>
          <p>
            Elekka fait un choix simple : concentrer chaque décision sur le produit.
            Distribution directe. Pas d'intermédiaires superflus. Chaque modèle est
            développé en conditions réelles — sur des chevaux, dans le travail.
          </p>
        </section>

        <section className="space-y-6 text-base md:text-[1.0625rem] leading-relaxed text-ink">
          <p>
            Le bien-être du cheval n'est pas un argument. C'est un point de départ.
          </p>
          <p>
            Le résultat : un matériel précis, confortable, pensé pour durer. Un prix
            qui correspond au produit — pas à ce qui l'entoure.
          </p>
          <p>
            Notre marketing, c'est votre soutien. On compte sur vous.
          </p>
        </section>
      </div>

      {/* Values */}
      <div className="mt-20 border-t border-line pt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line">
        {[
          {
            title: "Pensé sur le terrain",
            body: "Chaque modèle est né d'une observation directe, pas d'une tendance de catalogue.",
          },
          {
            title: "Respecte le cheval",
            body: "L'ergonomie et le confort de l'animal guident les choix de coupe et de rembourrage.",
          },
          {
            title: "Prix juste, une fois",
            body: "Marges réduites, distribution directe. Ce que vous payez est dans le cuir, pas dans le nom.",
          },
        ].map((v) => (
          <div key={v.title} className="bg-paper px-0 py-10 sm:px-10 sm:first:pl-0 sm:last:pr-0">
            <p className="kicker text-muted mb-3">{v.title}</p>
            <p className="text-sm leading-relaxed text-ink max-w-[32ch]">{v.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Link
          href="/boutique"
          className="press inline-flex items-center gap-2 bg-ink text-on-ink text-sm font-medium px-6 py-3 hover:bg-ink-soft"
        >
          Voir la collection
        </Link>
        <a
          href="mailto:elekka.sellier@gmail.com"
          className="press text-sm text-muted hover:text-ink transition-colors"
        >
          elekka.sellier@gmail.com
        </a>
      </div>
    </article>
  );
}
