import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site elekka-sellier.fr : éditeur, hébergement, propriété intellectuelle.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      <p className="kicker text-muted">Informations légales</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Mentions légales</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink prose-like">

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Éditeur du site</h2>
          <p>
            Le site <strong>elekka-sellier.fr</strong> est édité par :<br />
            Elekka<br />
            Contact : <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">elekka.sellier@gmail.com</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos, visuels) est la
            propriété exclusive d'Elekka ou de ses ayants droit. Toute reproduction, représentation
            ou diffusion, même partielle, est interdite sans autorisation écrite préalable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Responsabilité</h2>
          <p>
            Elekka s'efforce d'assurer l'exactitude des informations publiées mais ne peut garantir
            leur exhaustivité ni leur parfaite actualité. Elekka décline toute responsabilité pour
            tout dommage résultant de l'utilisation de ces informations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. Tout litige relatif à son utilisation
            relève de la compétence exclusive des tribunaux français.
          </p>
        </section>

      </div>
    </article>
  );
}
