export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    title: "Tailles & Mesures",
    items: [
      {
        q: "Comment choisir entre Full et Cob ?",
        a: "Le Full convient aux chevaux de grande taille (au-delà de 1,65 m au garrot), le Cob aux poneys et chevaux plus petits. En cas de doute, le Full est le choix le plus courant pour un cheval standard.",
      },
      {
        q: "Comment mesurer la tête de mon cheval ?",
        a: "Mesurez le contour de la tête de votre cheval au niveau du chanfrein, à l'aide d'un mètre souple. En cas d'hésitation, n'hésitez pas à nous contacter — nous vous guiderons vers la taille la plus adaptée.",
      },
      {
        q: "Que faire si je ne sais pas quelle taille choisir ?",
        a: "Contactez-nous à elekka.sellier@gmail.com avec les mesures ou la description de votre cheval. Nous vous répondons sous 48 h et vous orientons vers le bon choix.",
      },
    ],
  },
  {
    title: "Les produits",
    items: [
      {
        q: "Quelle est la qualité du cuir utilisé ?",
        a: "Nous utilisons du cuir pleine fleur sélectionné pour sa souplesse, sa résistance et le respect de la peau du cheval. La qualité des matières est identique à celle utilisée par les grandes maisons du secteur équestre.",
      },
      {
        q: "Les filets sont-ils conformes aux règlements de compétition FFE ?",
        a: "Oui. Tous nos modèles respectent les réglementations FFE en vigueur pour les compétitions de dressage et de saut d'obstacles.",
      },
      {
        q: "Faut-il casser le cuir avant utilisation ?",
        a: "Comme tout article en cuir de qualité, un léger rodage est conseillé. Appliquez une graisse nourrissante avant la première utilisation et laissez le cuir s'assouplir progressivement au fil des séances.",
      },
      {
        q: "Les filets anatomiques sont-ils validés par des professionnels de santé équine ?",
        a: "Nos modèles anatomiques ont été développés en tenant compte des zones de pression identifiées par les vétérinaires et ostéopathes équins. La têtière incurvée et la muserolle rembourrée réduisent significativement les points de tension sur la nuque et le chanfrein.",
      },
      {
        q: "En quoi un filet anatomique est-il meilleur pour mon cheval ?",
        a: "Un filet anatomique soulage les zones sensibles de la tête — nuque, chanfrein, barres — ce qui favorise la décontraction, l'équilibre et la précision des aides. Votre cheval travaille plus à l'aise, vous communiquez mieux.",
      },
      {
        q: "Qui a conçu les modèles Elekka ?",
        a: "Les modèles Elekka ont été conçus par Lucas, cavalier et fils de cavalier, vivant et travaillant au sein d'une grande écurie de compétition. Chaque détail est issu d'une connaissance terrain directe des besoins du cheval et du cavalier.",
      },
    ],
  },
  {
    title: "Entretien",
    items: [
      {
        q: "Comment entretenir mon filet Elekka ?",
        a: "Après chaque utilisation, essuyez les résidus avec un chiffon humide. Nourrissez le cuir régulièrement avec une graisse ou huile adaptée. Évitez l'exposition prolongée à l'humidité ou au soleil direct, et rangez-le dans un endroit sec et aéré.",
      },
      {
        q: "Quelle graisse utiliser ?",
        a: "Nous recommandons une huile de pied de bœuf ou une glycérine neutre pour nourrir le cuir sans l'alourdir. Évitez les produits trop gras qui peuvent obstruer les pores du cuir et ternir sa finition.",
      },
      {
        q: "Combien de temps dure un filet Elekka ?",
        a: "Avec un entretien régulier, un filet en cuir pleine fleur peut durer plusieurs années, voire davantage. La durabilité est l'un des grands avantages du cuir de qualité face aux matériaux synthétiques.",
      },
    ],
  },
  {
    title: "Confiance & Qualité",
    items: [
      {
        q: "Pourquoi faire confiance à Elekka ?",
        a: "Elekka est conçu par des cavaliers, pour des cavaliers. Nos produits utilisent les mêmes matières et techniques que les grandes maisons du secteur, à un prix significativement plus accessible. Notre engagement : qualité réelle, sans marge excessive.",
      },
      {
        q: "Quelle garantie qualité proposez-vous ?",
        a: "Chaque filet Elekka est contrôlé avant expédition. En cas de défaut de fabrication constaté à la réception, nous prenons en charge l'échange ou le remboursement sans condition.",
      },
      {
        q: "Que faire en cas de défaut sur mon filet ?",
        a: "Contactez-nous à elekka.sellier@gmail.com avec votre numéro de commande et des photos du défaut constaté. Nous traitons chaque situation rapidement et avec soin.",
      },
      {
        q: "Proposez-vous des échanges ou remboursements ?",
        a: "Oui, sous 14 jours après réception si l'article est non utilisé et dans son état d'origine. Écrivez-nous à elekka.sellier@gmail.com pour initier la procédure.",
      },
    ],
  },
  {
    title: "Paiement & Sécurité",
    items: [
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Oui. Les paiements par carte sont traités par Stripe, certifié PCI-DSS — l'un des standards de sécurité les plus élevés du secteur. Les paiements PayPal bénéficient de la protection acheteur PayPal. Aucune donnée bancaire ne transite sur nos serveurs.",
      },
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via Stripe, ainsi que PayPal.",
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Le paiement en plusieurs fois n'est pas disponible pour le moment. Pour toute situation particulière, n'hésitez pas à nous contacter.",
      },
    ],
  },
  {
    title: "Commande & Livraison",
    items: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Les commandes sont préparées sous 2 à 5 jours ouvrés. Dès l'expédition, vous recevez votre numéro de suivi par email.",
      },
      {
        q: "La livraison est-elle vraiment offerte ?",
        a: "Oui, la livraison est offerte sur toutes les commandes, sans minimum d'achat.",
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Dès l'expédition, vous recevez un email avec votre numéro de suivi. Vous pouvez également suivre l'avancement de votre commande directement depuis votre espace compte Elekka.",
      },
    ],
  },
  {
    title: "Mon compte",
    items: [
      {
        q: "Comment créer un compte ?",
        a: "Cliquez sur l'icône compte en haut à droite du site, puis sur 'Créer un compte'. Renseignez vos informations et confirmez votre email. Votre compte vous permet de suivre vos commandes et d'accéder à vos promotions.",
      },
      {
        q: "Comment modifier mes informations personnelles ?",
        a: "Connectez-vous à votre compte, rendez-vous dans l'onglet 'Mon profil' et cliquez sur 'Modifier'. Vous pouvez mettre à jour votre nom, téléphone et adresse de livraison.",
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Sur la page de connexion, cliquez sur 'Mot de passe oublié ?', entrez votre email et suivez les instructions reçues. Vous recevrez un lien pour créer un nouveau mot de passe.",
      },
    ],
  },
  {
    title: "Service client",
    items: [
      {
        q: "Comment contacter le service client ?",
        a: "Par email à elekka.sellier@gmail.com. Nous répondons sous 24 à 48 heures en jours ouvrés.",
      },
      {
        q: "Qui contacter en cas de problème ?",
        a: "Écrivez-nous à elekka.sellier@gmail.com en mentionnant votre numéro de commande. Nous traitons chaque demande avec soin et dans les meilleurs délais.",
      },
      {
        q: "Quel est le délai de réponse du service client ?",
        a: "Nous nous engageons à répondre à toutes les demandes sous 48 heures en jours ouvrés.",
      },
    ],
  },
];

// Questions affichées sur les fiches produit (sous-ensemble)
export const faqProductCategories = faqCategories.filter((c) =>
  ["Tailles & Mesures", "Les produits", "Entretien", "Commande & Livraison"].includes(c.title)
);
