export type Size = "Full" | "Cob";
export type ColourKey = "havana-brown" | "noir" | "dark-brown";

export type ColourVariant = {
  key: ColourKey;
  label: string;
  swatch: string;
  images: string[];
  cardImageIndex?: number;
  cardDetailImage?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Bridons" | "Licoles" | "Rênes" | "Enrênements";
  family: "Classique" | "Anatomique";
  tagline: string;
  priceEUR: number;
  description: string;
  longDescription: string;
  highlights: string[];
  colours: ColourVariant[];
  sizes: Size[];
  defaultColour: ColourKey;
  defaultSize: Size;
  hidden?: boolean;
  heroImage?: string;
  cardImageIndex?: number;
};

export const products: Product[] = [
  {
    slug: "signature",
    name: "Bridon Anatomique Elekka Signature",
    heroImage: "/products/signature/signature-havana-brown-cheval-01.png",
    cardImageIndex: 1,
    category: "Bridons",
    family: "Anatomique",
    tagline: "La pièce maîtresse d'Elekka, entre confort anatomique, précision et élégance.",
    priceEUR: 175,
    description:
      "Têtière anatomique incurvée, muserolle redessinée. Un filet pensé pour préserver les zones sensibles du cheval.",
    longDescription:
      "Le Signature a été dessiné par Lucas, fondateur d'Elekka, à partir des contraintes observées sur ses propres chevaux de concours. La têtière anatomique se creuse pour libérer la nuque ; la muserolle rembourrée de 2,5 à 3 cm ferme sur le côté gauche.",
    highlights: [
      "Têtière anatomique creusée pour la nuque",
      "Muserolle rembourrée 2,5 – 3 cm, fermeture côté gauche",
      "Browband Full 17\" / Cob 16\"",
      "Rênes caoutchouc incluses",
      "Coloris Havana Brown ou Noir",
    ],
    colours: [
      {
        key: "havana-brown",
        label: "Havana Brown",
        swatch: "#4a2a1a",
        images: [
          "/products/signature/signature-havana-brown-cheval-01.png",
          "/products/signature/signature-havana-brown-studio-01.png",
          "/products/signature/signature-havana-brown-cheval-muserolle.png",
          "/products/signature/signature-havana-brown-detail-muserolle.png",
          "/products/signature/signature-havana-brown-detail-frontal.png",
          "/products/signature/signature-havana-brown-cheval-tetiere.png",
          "/products/signature/signature-havana-brown-detail-tetiere.png",
        ],
      },
      {
        key: "noir",
        label: "Noir",
        swatch: "#0a0a0a",
        cardImageIndex: 0,
        images: [
          "/products/signature/signature-noir-studio-01.png",
          "/products/signature/signature-noir-detail-tetiere.png",
          "/products/signature/signature-noir-detail-muserolle.png",
          "/products/signature/signature-noir-detail-frontal.png",
          "/products/signature/signature-noir-ambiance-01.png",
          "/products/signature/signature-noir-studio-02.png",
          "/products/signature/signature-noir-detail-boucle.png",
        ],
      },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "fusion",
    name: "Bridon Anatomique Elekka Fusion",
    cardImageIndex: 1,
    category: "Bridons",
    family: "Anatomique",
    tagline: "Un filet, trois configurations. Anatomique, modulable, taillé pour durer.",
    priceEUR: 175,
    description:
      "Le Fusion réunit les éléments anatomiques des filets nouvelle génération, fusionnés avec un visuel moderne et élégant. Un seul bridon, un concentré de technologie et de surépaisseur pour s'adapter à toutes les morphologies.",
    longDescription:
      "Le Fusion est né d'une conviction : un bridon de qualité devrait s'adapter au cheval, pas l'inverse. Sa muserolle à triple attache se change sans outil, en quelques secondes, pour répondre à des morphologies et des sensibilités très différentes. Le browband anatomique large de 5,5 cm répartit la pression sur tout le front, sans point de compression. Comme le Signature, la fermeture est côté gauche pour conserver une ligne propre. Les rênes caoutchouc sont incluses. C'est le choix des cavaliers qui cherchent un bridon anatomique complet, polyvalent, et pensé pour évoluer avec leur pratique.",
    highlights: [
      "Muserolle à triple attache — épaisse, ovale ou rectangulaire",
      "Browband anatomique 5,5 cm — répartition optimale sur le front",
      "Fermeture côté gauche, ligne nette",
      "Rênes caoutchouc incluses",
      "Coloris Havana Brown ou Dark Brown",
    ],
    colours: [
      {
        key: "havana-brown",
        label: "Havana Brown",
        swatch: "#4a2a1a",
        cardDetailImage: "/products/fusion/fusion-havana-brown-studio-frontal.png",
        images: [
          "/products/fusion/fusion-havana-brown-cheval-01.png",
          "/products/fusion/fusion-havana-brown-studio-01.png",
          "/products/fusion/fusion-havana-brown-cheval-tetiere.png|/products/fusion/fusion-havana-brown-cheval-muserolle.png",
          "/products/fusion/fusion-havana-brown-cheval-02.png",
          "/products/fusion/fusion-havana-brown-cheval-frontal.png|/products/fusion/fusion-havana-brown-cheval-triple.png|/products/fusion/fusion-havana-brown-studio-frontal-paysage.png",
          "/products/fusion/fusion-havana-brown-cheval-montants.png",
        ],
      },
      {
        key: "dark-brown",
        label: "Dark Brown",
        swatch: "#2b1710",
        cardImageIndex: 0,
        images: [
          "/products/fusion/fusion-dark-brown-studio-01.png",
          "/products/fusion/fusion-dark-brown-studio-03.png",
          "/products/fusion/fusion-dark-brown-detail-frontal.png",
          "/products/fusion/fusion-dark-brown-detail-boucle.png",
          "/products/fusion/fusion-dark-brown-detail-tetiere.png",
          "/products/fusion/fusion-dark-brown-studio-02.png",
        ],
      },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "essentiel",
    name: "Bridon Elekka Essentiel",
    category: "Bridons",
    family: "Classique",
    tagline: "Le classique, sans compromis.",
    priceEUR: 99.99,
    description:
      "Essentiel incarne l'élégance du bridon anglais dans sa forme la plus pure : une ligne sobre, un cuir pleine fleur soigneusement sélectionné et des finitions pensées pour durer.",
    longDescription:
      "L'Essentiel reprend les codes du bridon anglais classique : une muserolle française simple, une frontière rectiligne, une quincaillerie argentée sobre. Le cuir pleine fleur est sélectionné pour sa souplesse au premier usage et sa patine dans la durée.",
    highlights: [
      "Cuir pleine fleur pleine épaisseur",
      "Muserolle française, fermeture classique",
      "Quincaillerie inox argentée",
      "Coloris Havana Brown ou Noir",
      "Tailles Full et Cob",
    ],
    colours: [
      {
        key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a",
        images: [
          "/products/essentiel/essentiel-havana-brown-studio-03.png",
          "/products/essentiel/essentiel-havana-brown-studio-01.png",
          "/products/essentiel/essentiel-havana-brown-studio-02.png",
          "/products/essentiel/essentiel-havana-brown-detail-frontal.png",
          "/products/essentiel/essentiel-havana-brown-detail-tetiere.png",
          "/products/essentiel/essentiel-havana-brown-detail-muserolle.png",
          "/products/essentiel/essentiel-havana-brown-detail-muserolle-02.png",
          "/products/essentiel/essentiel-havana-brown-detail-collage.png",
        ],
      },
    ],
    sizes: ["Full"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "licol-1",
    name: "Licol Elekka Horizon",
    category: "Licoles",
    family: "Classique",
    tagline: "Le quotidien, en cuir pleine fleur.",
    priceEUR: 49.99,
    description:
      "Licol en cuir pleine fleur, quincaillerie inox argentée. Réglable, robuste, conçu pour durer au fil des séances.",
    longDescription:
      "Le Licol Horizon est taillé dans le même cuir pleine fleur que nos bridons. Sobre et bien construit, il s'adapte à toutes les morphologies grâce à ses réglages en nuque et en museau. La quincaillerie inox argentée résiste à l'humidité et à l'usure. Un licol fiable, sans superflu — pour les propriétaires qui préfèrent la qualité à l'accumulation.",
    highlights: [
      "Cuir pleine fleur pleine épaisseur",
      "Quincaillerie inox argentée — résistante à l'humidité",
      "Réglage précis en nuque et museau",
      "Tailles Full et Cob",
    ],
    colours: [
      {
        key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a",
        images: [
          "/products/licol-1/licol-1-havana-brown-studio-01.png",
          "/products/licol-1/licol-1-havana-brown-detail-museau.png",
          "/products/licol-1/licol-1-havana-brown-detail-boucle.png",
          "/products/licol-1/licol-1-havana-brown-detail-plaque.png",
        ],
      },
    ],
    sizes: ["Full"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "licol-2",
    name: "Licol Elekka N°2",
    hidden: true,
    category: "Licoles",
    family: "Classique",
    tagline: "Cuir et rembourrage, pour le confort.",
    priceEUR: 50,
    description:
      "Licol en cuir pleine fleur avec museau rembourré. Doux sur la tête du cheval, robuste au quotidien.",
    longDescription:
      "Le Licol N°2 ajoute un rembourrage sur le museau pour plus de confort lors des longues séances d'attache ou de transport. Même qualité de cuir et de quincaillerie que l'Horizon.",
    highlights: [
      "Cuir pleine fleur",
      "Museau rembourré",
      "Quincaillerie inox argentée",
      "Tailles Full et Cob",
    ],
    colours: [
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "renes-1",
    name: "Rênes caoutchouc arrêtoirs en cuir",
    category: "Rênes",
    family: "Classique",
    tagline: "La prise en main, par tous les temps.",
    priceEUR: 39.99,
    description:
      "Rênes en cuir pleine fleur avec grip caoutchouc intégré. Légères, précises, confortables pour toutes les disciplines.",
    longDescription:
      "Les Rênes N°1 sont taillées dans le même cuir pleine fleur que nos bridons — sélectionné pour sa souplesse naturelle et sa patine dans la durée. Le grip caoutchouc intégré assure une prise en main ferme et stable par tous les temps, sans rugueux excessif sur les doigts. Les arrêtoirs en cuir renforcent les points de fixation. Des rênes pensées pour travailler, pas seulement pour paraître.",
    highlights: [
      "Cuir pleine fleur souple et résistant",
      "Grip caoutchouc — prise sûre par temps humide",
      "Arrêtoirs en cuir",
      "Longueur standard — compatible tous bridons",
    ],
    colours: [
      {
        key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a",
        images: [
          "/products/renes-1/renes-1-havana-brown-studio-01.png",
          "/products/renes-1/renes-1-havana-brown-detail-boucle.png",
          "/products/renes-1/renes-1-havana-brown-detail-grip.png",
          "/products/renes-1/renes-1-havana-brown-studio-02.png",
        ],
      },
      {
        key: "noir", label: "Noir", swatch: "#0a0a0a",
        images: [
          "/products/renes-1/renes-1-noir-studio-01.png",
          "/products/renes-1/renes-1-noir-detail-boucle.png",
          "/products/renes-1/renes-1-noir-detail-grip.png",
          "/products/renes-1/renes-1-noir-studio-02.png",
        ],
      },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "renes-2",
    name: "Rênes en tissu",
    category: "Rênes",
    family: "Classique",
    tagline: "Légèreté et résistance, pour une prise en main naturelle.",
    priceEUR: 50,
    description:
      "Rênes en tissu avec arrêtoirs en cuir. Légères, résistantes et confortables pour toutes les disciplines.",
    longDescription:
      "Les Rênes en tissu allient légèreté et résistance. Les arrêtoirs en cuir garantissent une prise en main ferme et précise à chaque passage de rênes. Compatibles avec tous les bridons Elekka et la majorité des bridons du marché.",
    highlights: [
      "Matière tissu légère et résistante",
      "Arrêtoirs en cuir — prise en main ferme",
      "Compatible tous bridons Elekka",
      "Longueur standard — Full et Cob",
    ],
    colours: [
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "enrenement-1",
    name: "Howlett",
    hidden: true,
    category: "Enrênements",
    family: "Classique",
    tagline: "Un appui juste, sans forcer.",
    priceEUR: 50,
    description:
      "Enrênement en cuir pleine fleur. Réglable, solide, conçu pour accompagner le travail en main et monté.",
    longDescription:
      "L'Enrênement N°1 est taillé dans le même cuir pleine fleur que nos bridons. Les réglages sont précis et durables, la quincaillerie inox résiste à l'humidité et à l'usure.",
    highlights: [
      "Cuir pleine fleur",
      "Réglage précis et fiable",
      "Quincaillerie inox",
      "Compatible tous bridons Elekka",
    ],
    colours: [
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "enrenement-2",
    name: "Martingale",
    hidden: true,
    category: "Enrênements",
    family: "Classique",
    tagline: "Pour un travail en souplesse.",
    priceEUR: 50,
    description:
      "Enrênement en cuir pleine fleur avec rembourrage sur les anneaux de poitrail. Confort accru pour les longues séances.",
    longDescription:
      "L'Enrênement N°2 ajoute un rembourrage aux points de contact sur le poitrail pour prévenir les frottements lors des séances de travail prolongées.",
    highlights: [
      "Cuir pleine fleur",
      "Rembourrage aux points de contact",
      "Quincaillerie inox",
      "Compatible tous bridons Elekka",
    ],
    colours: [
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number): string {
  const hasCents = n % 1 !== 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(n);
}
