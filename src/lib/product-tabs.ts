export type TabContent = {
  description: string;
};

// Description spécifique par produit
export const productDescriptions: Record<string, string> = {
  essentiel: `Le Filet Essentiel est notre modèle classique et intemporel. Pensé pour les cavaliers qui recherchent un bridon fiable, bien construit, sans fioriture — à un prix sincère.

Le cuir pleine fleur utilisé est sélectionné pour sa souplesse dès la première utilisation et sa capacité à développer une belle patine avec le temps. La muserolle française classique assure un contact doux et uniforme sur le chanfrein. La quincaillerie inox argentée est robuste et résistante à l'humidité.

L'Essentiel convient à tous les chevaux et toutes les disciplines : dressage, saut d'obstacles, équitation de loisir. C'est le choix de ceux qui veulent bien faire, sans se perdre dans le superflu.`,

  signature: `Le Filet Signature est le premier modèle anatomique conçu par Lucas, fondateur d'Elekka. Il est né d'une réflexion simple : pourquoi accepter qu'un équipement génère des tensions quand il peut soulager ?

La têtière incurvée libère la zone de la nuque et des oreilles, réduisant les points de pression identifiés par les vétérinaires et ostéopathes équins. La muserolle rembourrée — 2,5 à 3 cm d'épaisseur — répartit le contact sur une plus grande surface et protège le chanfrein des frottements. La fermeture côté gauche évite toute protubérance sous le cuir.

Le Signature inclut des rênes caoutchouc de qualité, pour une prise en main assurée par tous les temps. Recommandé pour les chevaux sensibles, les jeunes chevaux en débourrage, ou tout cavalier soucieux du bien-être de sa monture.`,

  fusion: `Le Filet Fusion est notre modèle le plus complet. Il reprend les bases anatomiques du Signature et y ajoute une polyvalence inédite grâce à sa muserolle à triple attache.

Le browband anatomique large — 5,5 cm — est conçu pour s'adapter à toutes les morphologies frontales sans créer de tension. La muserolle à triple attache (épaisse, ovale, rectangulaire) permet d'ajuster finement le contact selon la morphologie et la sensibilité du cheval.

Comme le Signature, la fermeture est côté gauche et les rênes caoutchouc sont incluses. Le Fusion est le choix des cavaliers qui veulent un bridon anatomique performant, polyvalent, et taillé pour le long terme.`,
};

// Contenu identique pour tous les produits
export const sharedTabs = {
  taille: `**Full ou Cob ?**

Le Full convient aux chevaux de grande taille (au-delà de 1,65 m au garrot) : Selle Français, KWPN, Hanovrien, Lusitanien, etc. Le Cob est adapté aux poneys de grande taille, Quarter Horses et chevaux de morphologie plus compacte.

En cas de doute, le Full est le choix le plus courant pour un cheval standard. Les modèles Elekka sont ajustables sur plusieurs crans pour s'adapter à différentes morphologies.

**Comment mesurer ?**

Utilisez un mètre souple autour du chanfrein de votre cheval. Comparez la mesure obtenue avec les tailles proposées. Si votre cheval est à la limite entre les deux tailles, optez pour le Full — il offre plus de latitude d'ajustement.

Vous n'êtes pas sûr ? Écrivez-nous à elekka.sellier@gmail.com avec la race et les mensurations de votre cheval. Nous vous répondons sous 48 h.`,

  composition: `**Matières**

Cuir : pleine fleur, tannage végétal, pleine épaisseur. Sélectionné pour sa souplesse native, sa résistance dans la durée et le respect de la peau du cheval.

Rembourrage (modèles Signature et Fusion) : mousse haute densité gainée cuir, 2,5 à 3 cm d'épaisseur.

Quincaillerie : inox argenté, résistant à l'humidité et à la corrosion. Anneaux, boucles et attaches traités pour durer.

Rênes (modèles Signature et Fusion) : cuir pleine fleur avec grip caoutchouc, pour une prise en main sûre par tous les temps.

**Dimensions**

Browband Full : 42 cm · Browband Cob : 38 cm
Browband Signature Full : 17 pouces (43 cm) · Cob : 16 pouces (40 cm)
Browband Fusion : 5,5 cm de large`,

  entretien: `**Avant la première utilisation**

Appliquez une huile de pied de bœuf ou une glycérine neutre sur l'ensemble du filet. Laissez pénétrer 1 à 2 heures avant usage. Ce geste assouplit le cuir, prévient les frottements et prolonge significativement sa durée de vie.

**Après chaque utilisation**

Essuyez les résidus de bave et de transpiration avec un chiffon légèrement humide. Ne laissez jamais le cuir sécher avec de l'humidité — cela accélère le craquelage.

**Entretien régulier**

Une fois par semaine ou après chaque utilisation intensive : démontez le filet, nettoyez chaque pièce avec un savon pour cuir (glycérine, savon de selle), laissez sécher à l'air libre hors du soleil direct, puis appliquez une fine couche de graisse nourrissante.

**Conservation**

Rangez sur un porte-bridon dans un endroit sec, tempéré et aéré. Évitez les sacs fermés ou les espaces humides. Un cuir bien entretenu se bonifie avec le temps et peut durer plusieurs décennies.`,
};
