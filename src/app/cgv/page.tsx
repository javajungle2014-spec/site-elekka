import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente d'Elekka : commandes, livraison, droit de rétractation, garanties. Site elekka-sellier.fr.",
};

export default function CGVPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      <p className="kicker text-muted">Achat en ligne</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Conditions générales de vente</h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 1 — Objet</h2>
          <p>
            Les présentes conditions générales de vente (CGV) régissent les ventes de produits
            effectuées sur le site elekka-sellier.fr entre Elekka (le vendeur) et tout acheteur non
            professionnel (le client). Toute commande implique l'acceptation sans réserve des
            présentes CGV.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 2 — Produits</h2>
          <p>
            Les produits proposés à la vente sont décrits avec la plus grande précision possible.
            Les photographies et visuels sont fournis à titre indicatif. Des variations mineures
            de teinte peuvent exister selon les lots de cuir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 3 — Prix</h2>
          <p>
            Les prix sont indiqués en euros toutes taxes comprises (TTC). Elekka se réserve le
            droit de modifier ses prix à tout moment, sans préavis. Les produits sont facturés
            sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>
          <p>Les frais de livraison sont indiqués séparément lors de la commande.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 4 — Commande</h2>
          <p>
            La commande est confirmée après réception du paiement. Elekka se réserve le droit
            d'annuler ou de refuser toute commande d'un client avec lequel un litige antérieur
            existe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 5 — Livraison</h2>
          <p>
            Les commandes sont expédiées vers la France métropolitaine et les pays européens.
            Les délais de livraison sont communiqués lors de la commande et sont donnés à titre
            indicatif. Elekka ne saurait être tenu responsable des retards causés par le
            transporteur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 6 — Droit de rétractation</h2>
          <p>
            Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un
            délai de 14 jours à compter de la réception du produit pour exercer son droit de
            rétractation, sans avoir à justifier de motifs.
          </p>
          <p>
            Pour exercer ce droit, le client doit notifier sa décision à l'adresse
            <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4 mx-1">elekka.sellier@gmail.com</a>
            avant l'expiration du délai. Le produit doit être retourné en parfait état, dans
            son emballage d'origine.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 7 — Garanties</h2>
          <p>
            Les produits bénéficient de la garantie légale de conformité (articles L217-4 et
            suivants du Code de la consommation) et de la garantie contre les vices cachés
            (articles 1641 et suivants du Code civil).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 8 — Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution
            amiable sera recherchée avant tout recours judiciaire.
          </p>
        </section>

      </div>
    </article>
  );
}
