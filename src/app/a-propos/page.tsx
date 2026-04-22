import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "À propos" };

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
            Elekka est née d'une frustration simple : pourquoi les bridons de qualité sérieuse
            coûtent-ils systématiquement le prix du prestige ? Lucas, cavalier depuis l'enfance
            et fils de cavalier, a grandi dans une grande écurie de compétition. Il connaît les
            grandes marques, les utilise, les respecte — mais il ne comprend pas ce qui justifie
            l'écart de prix face à un cavalier amateur ou un enfant en club.
          </p>
          <p>
            Le constat est net : la qualité du cuir, la précision de la coupe, l'ergonomie de
            l'anatomique — tout cela est accessible sans les frais de structure d'une maison
            installée depuis des décennies. Ce qui coûte cher, c'est souvent le nom.
          </p>
          <p>
            Elekka réduit la marge, simplifie la distribution, et concentre l'investissement
            sur le produit lui-même. Pas sur la publicité.
          </p>
        </section>

        <section className="space-y-6 text-base md:text-[1.0625rem] leading-relaxed text-ink">
          <p>
            Les deux modèles anatomiques — le Signature et le Fusion — ont été dessinés par
            Lucas lui-même. Pas sur un bureau, à partir de photos. Sur des chevaux, dans un
            manège. La têtière incurvée du Signature libère la nuque sans artifice de
            communication. La muserolle à triple attache du Fusion répond à un besoin réel :
            ne pas multiplier les bridons pour s'adapter à plusieurs chevaux.
          </p>
          <p>
            Le bien-être du cheval n'est pas un argument marketing ici. C'est le point de
            départ de chaque décision de conception.
          </p>
          <p>
            Elekka vend en direct, sans intermédiaire superflu. Quelques selleries partenaires
            soigneusement choisies permettent de voir et toucher les modèles avant d'acheter.
            Le reste se passe en ligne, à prix fixe, sans soldes ni promotions — parce qu'un
            prix juste dès le départ vaut mieux qu'un prix gonflé attendant la remise.
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
          href="mailto:contact@elekka.fr"
          className="press text-sm text-muted hover:text-ink transition-colors"
        >
          contact@elekka.fr
        </a>
      </div>
    </article>
  );
}
