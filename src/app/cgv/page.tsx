import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Elekka",
  description: "Conditions générales de vente d'Elekka : commandes, paiement, livraison, droit de rétractation, garanties légales. Site elekka-sellier.fr.",
  robots: { index: false },
};

export default function CGVPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 md:px-10 pt-24 md:pt-36 pb-24">
      <p className="kicker text-muted">Achat en ligne</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Conditions générales de vente</h1>
      <p className="mt-4 text-sm text-muted">En vigueur au 1er janvier 2026</p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 1 — Identification du vendeur</h2>
          <p>
            Le site elekka-sellier.fr est édité par Elekka, marque de sellerie équestre en cuir.
            Contact : <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">elekka.sellier@gmail.com</a>.
          </p>
          <p>
            Les présentes conditions générales de vente (CGV) régissent l'ensemble des ventes de
            produits effectuées sur le site elekka-sellier.fr entre Elekka (le vendeur) et tout
            acheteur non professionnel (le client). Toute commande implique l'acceptation sans
            réserve des présentes CGV.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 2 — Produits</h2>
          <p>
            Les produits proposés à la vente sont des articles de sellerie en cuir pleine fleur
            (bridons, licols, rênes, enrênements et pièces détachées). Ils sont décrits avec la
            plus grande précision possible sur les fiches produit du site.
          </p>
          <p>
            Les photographies et visuels sont fournis à titre indicatif. Des variations mineures
            de teinte peuvent exister entre les lots de cuir — inhérentes à la nature du matériau
            et à son caractère naturel. Ces variations ne constituent pas un défaut de conformité.
          </p>
          <p>
            Elekka se réserve le droit de modifier sa gamme de produits à tout moment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 3 — Prix</h2>
          <p>
            Les prix sont indiqués en euros toutes taxes comprises (TTC). La TVA applicable est
            celle en vigueur en France au jour de la commande.
          </p>
          <p>
            Elekka se réserve le droit de modifier ses prix à tout moment. Les produits sont
            facturés sur la base des tarifs affichés au moment de la validation de la commande.
          </p>
          <p>
            La livraison est offerte sur toutes les commandes à destination de la France
            métropolitaine. Les frais éventuels pour les destinations internationales sont
            indiqués lors du passage en caisse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 4 — Commande et paiement</h2>
          <p>
            La commande est confirmée après réception et validation du paiement. Un email de
            confirmation est envoyé au client à l'adresse indiquée lors de la commande.
          </p>
          <p>
            Les paiements sont traités de manière sécurisée par Stripe (carte bancaire) ou
            PayPal. Elekka ne stocke aucune donnée bancaire sur ses serveurs.
          </p>
          <p>
            Elekka se réserve le droit d'annuler ou de refuser toute commande d'un client avec
            lequel un litige antérieur existe, ou en cas de suspicion de fraude.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 5 — Livraison</h2>
          <p>
            Les commandes sont expédiées vers la France métropolitaine et les pays de l'Union
            européenne. Les délais indicatifs sont de 2 à 5 jours ouvrés pour la France
            métropolitaine.
          </p>
          <p>
            Les délais sont communiqués à titre indicatif. Elekka ne saurait être tenu
            responsable des retards imputables au transporteur ou à des circonstances
            indépendantes de sa volonté (intempéries, grèves, etc.).
          </p>
          <p>
            En cas de dommage constaté à la réception, le client doit émettre des réserves auprès
            du transporteur et contacter Elekka dans les 48 heures suivant la livraison.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 6 — Droit de rétractation</h2>
          <p>
            Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un
            délai de 14 jours à compter de la réception du produit pour exercer son droit de
            rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p>
            Pour exercer ce droit, le client doit notifier sa décision par email à{" "}
            <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">
              elekka.sellier@gmail.com
            </a>{" "}
            avant l'expiration du délai de 14 jours.
          </p>
          <p>
            Le produit doit être retourné en parfait état, non utilisé, dans son emballage
            d'origine, dans les 14 jours suivant la notification. Les frais de retour sont à la
            charge du client sauf accord contraire d'Elekka.
          </p>
          <p>
            Le remboursement sera effectué dans un délai de 14 jours à compter de la réception
            du produit retourné, par le même moyen de paiement que celui utilisé lors de la commande.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 7 — Garanties légales</h2>
          <p>
            Les produits Elekka bénéficient de la garantie légale de conformité (articles L217-4
            et suivants du Code de la consommation) et de la garantie contre les vices cachés
            (articles 1641 et suivants du Code civil).
          </p>
          <p>
            En cas de défaut de conformité constaté dans les 2 ans suivant la livraison, le
            client peut demander la réparation ou le remplacement du produit, ou, si ces
            solutions sont impossibles, un remboursement.
          </p>
          <p>
            Ces garanties ne couvrent pas les défauts résultant d'une utilisation anormale, d'un
            mauvais entretien ou d'une usure normale du cuir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 8 — Codes promotionnels et parrainage</h2>
          <p>
            Les codes promotionnels sont valables une seule fois, non cumulables entre eux sauf
            mention contraire, et ne peuvent être échangés contre de l'argent. Elekka se réserve
            le droit de suspendre ou d'annuler un code promotionnel en cas d'utilisation abusive.
          </p>
          <p>
            Le programme de parrainage permet à tout client détenteur d'un compte Elekka de
            parrainer des amis. Les récompenses (codes de réduction) sont attribuées automatiquement
            dès que la commande du filleul est confirmée. Elekka se réserve le droit de modifier
            les conditions du programme à tout moment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 9 — Responsabilité</h2>
          <p>
            Elekka ne saurait être tenu responsable de l'inexécution de ses obligations en cas
            de force majeure. La responsabilité d'Elekka est en tout état de cause limitée au
            montant de la commande concernée.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">Article 10 — Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution
            amiable sera recherchée prioritairement. Le client peut contacter Elekka à{" "}
            <a href="mailto:elekka.sellier@gmail.com" className="underline underline-offset-4">
              elekka.sellier@gmail.com
            </a>
            .
          </p>
          <p>
            En cas d'échec de la résolution amiable, le client peut recourir à un médiateur de
            la consommation. Les tribunaux français sont seuls compétents pour tout litige né de
            l'interprétation ou de l'exécution des présentes CGV.
          </p>
        </section>

      </div>
    </article>
  );
}
