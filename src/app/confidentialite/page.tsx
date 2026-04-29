import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité d'Elekka : données collectées, finalités, durée de conservation, vos droits RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      <p className="kicker text-muted">Vie privée</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Politique de confidentialité</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Responsable du traitement</h2>
          <p>
            Elekka est responsable du traitement des données personnelles collectées sur ce site.
            Contact : <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">elekka.sellier@gmail.com</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Données collectées</h2>
          <p>Elekka collecte des données personnelles dans les cas suivants :</p>
          <ul className="list-disc list-inside space-y-1 text-muted">
            <li>Lors d'une commande : nom, prénom, adresse de livraison, email, téléphone</li>
            <li>Via le formulaire de contact : nom, email, message</li>
            <li>Navigation : données techniques (adresse IP, navigateur) via les logs du serveur</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Finalités et base légale</h2>
          <p>Les données sont traitées pour :</p>
          <ul className="list-disc list-inside space-y-1 text-muted">
            <li>Traiter et expédier les commandes (exécution du contrat)</li>
            <li>Répondre aux messages de contact (intérêt légitime)</li>
            <li>Respecter les obligations légales et comptables</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Durée de conservation</h2>
          <p>
            Les données de commande sont conservées 10 ans conformément aux obligations comptables.
            Les données de contact sont supprimées après traitement de la demande et au plus tard
            sous 3 ans.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Partage des données</h2>
          <p>
            Elekka ne vend ni ne loue vos données personnelles. Elles peuvent être transmises
            aux transporteurs (nom, adresse) pour la livraison, et aux prestataires de paiement
            dans le cadre de la transaction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
            d'effacement, de portabilité et d'opposition concernant vos données personnelles.
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">elekka.sellier@gmail.com</a>.
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL
            (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">www.cnil.fr</a>).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Cookies</h2>
          <p>
            Ce site utilise des cookies strictement nécessaires à son fonctionnement technique.
            Aucun cookie publicitaire ni de suivi comportemental n'est déposé sans votre
            consentement explicite.
          </p>
        </section>

      </div>
    </article>
  );
}
