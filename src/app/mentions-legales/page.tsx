import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Elekka",
  description: "Mentions légales du site elekka-sellier.fr : éditeur, hébergement, propriété intellectuelle, cookies.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      <p className="kicker text-muted">Informations légales</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Mentions légales</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Éditeur du site</h2>
          <p>
            Le site <strong>elekka-sellier.fr</strong> est édité par :<br />
            <strong>Elekka</strong> — marque de sellerie équestre<br />
            Contact : <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">elekka.sellier@gmail.com</a>
          </p>
          <p>
            Directeur de publication : Lucas Mourier
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            <a href="https://vercel.com" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, photographies, illustrations,
            logos, icônes, visuels) est la propriété exclusive d'Elekka ou de ses ayants droit.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, diffusion, même
            partielle, par quelque procédé que ce soit, est strictement interdite sans
            autorisation écrite préalable d'Elekka. Toute utilisation non autorisée constitue
            une contrefaçon passible de sanctions pénales et civiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Cookies</h2>
          <p>
            Le site elekka-sellier.fr utilise uniquement des cookies strictement nécessaires au
            fonctionnement du site (authentification, panier, préférences). Aucun cookie
            publicitaire ou de tracking n'est utilisé.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers des sites externes. Elekka n'exerce aucun
            contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Responsabilité</h2>
          <p>
            Elekka s'efforce d'assurer l'exactitude et la mise à jour des informations publiées
            sur ce site. Cependant, Elekka ne peut garantir l'exhaustivité ni l'absence d'erreur
            de ces informations et décline toute responsabilité pour tout dommage résultant
            directement ou indirectement de leur utilisation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Droit applicable</h2>
          <p>
            Le présent site et les présentes mentions légales sont soumis au droit français. Tout
            litige relatif à leur interprétation ou à leur application relève de la compétence
            exclusive des tribunaux français.
          </p>
        </section>

      </div>
    </article>
  );
}
