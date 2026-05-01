export type Size = "Full" | "Cob";
export type ColourKey = "havana-brown" | "noir" | "dark-brown";

export type ColourVariant = {
  key: ColourKey;
  label: string;
  swatch: string;
  images: string[];
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
};

export const products: Product[] = [
  {
    slug: "essentiel",
    name: "Bridon Elekka Essentiel",
    category: "Bridons",
    family: "Classique",
    tagline: "Le classique, sans compromis.",
    priceEUR: 99.99,
    description:
      "Cuir pleine fleur, muserolle simple, quincaillerie argentée. La ligne épurée d'un bridon anglais, travaillée avec rigueur.",
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
        key: "havana-brown",
        label: "Havana Brown",
        swatch: "#4a2a1a",
        images: [
          "/products/essentiel/essentiel-on-horse.png",
          "/products/essentiel/essentiel-studio-01.png",
          "/products/essentiel/essentiel-detail-muserolle.png",
          "/products/essentiel/essentiel-detail-ek.png",
          "/products/essentiel/essentiel-ambiance-01.png",
          "/products/essentiel/essentiel-detail-boucle.png",
          "/products/essentiel/essentiel-studio-02.png",
        ],
      },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "signature",
    name: "Bridon Anatomique Elekka Signature",
    category: "Bridons",
    family: "Anatomique",
    tagline: "Conçu par le fondateur.",
    priceEUR: 175,
    description:
      "Têtière anatomique incurvée, muserolle rembourrée 2,5 – 3 cm, rênes caoutchouc incluses. Pensé pour la nuque du cheval.",
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
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "fusion",
    name: "Bridon Anatomique Elekka Fusion",
    category: "Bridons",
    family: "Anatomique",
    tagline: "Trois muserolles, un seul bridon.",
    priceEUR: 175,
    description:
      "Browband anatomique large 5,5 cm, muserolle à triple attache — épaisse, ovale, rectangulaire. Un bridon, trois configurations.",
    longDescription:
      "Le Fusion a été imaginé pour les cavaliers qui n'ont pas envie de posséder trois bridons. La muserolle modulable se décline en trois formes interchangeables pour s'adapter au cheval et à la discipline.",
    highlights: [
      "Browband anatomique large 5,5 cm",
      "Muserolle à triple attache (épaisse / ovale / rectangulaire)",
      "Fermeture côté gauche",
      "Rênes caoutchouc incluses",
      "Coloris Havana Brown ou Dark Brown",
    ],
    colours: [
      { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [] },
      { key: "dark-brown", label: "Dark Brown", swatch: "#2b1710", images: [] },
    ],
    sizes: ["Full", "Cob"],
    defaultColour: "havana-brown",
    defaultSize: "Full",
  },
  {
    slug: "licol-1",
    name: "Licol Elekka N°1",
    category: "Licoles",
    family: "Classique",
    tagline: "Le licol en cuir, sans superflu.",
    priceEUR: 49.99,
    description:
      "Licol en cuir pleine fleur, quincaillerie inox. Sobre, solide, pensé pour le quotidien.",
    longDescription:
      "Le Licol N°1 reprend les codes du licol anglais classique. Cuir pleine fleur sélectionné pour sa résistance et sa souplesse, quincaillerie inox argentée, réglages simples et fiables.",
    highlights: [
      "Cuir pleine fleur",
      "Quincaillerie inox argentée",
      "Réglage nuque et museau",
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
      "Le Licol N°2 ajoute un rembourrage sur le museau pour plus de confort lors des longues séances d'attache ou de transport. Même qualité de cuir et de quincaillerie que le N°1.",
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
    name: "Rênes Elekka N°1",
    category: "Rênes",
    family: "Classique",
    tagline: "Rênes en cuir, prise en main assurée.",
    priceEUR: 39.99,
    description:
      "Rênes en cuir pleine fleur avec grip caoutchouc. Légères, résistantes, adaptées à toutes les disciplines.",
    longDescription:
      "Les Rênes N°1 sont taillées dans le même cuir pleine fleur que nos bridons. Le grip caoutchouc assure une prise en main sûre même par temps humide.",
    highlights: [
      "Cuir pleine fleur",
      "Grip caoutchouc intégré",
      "Boucles inox argentées",
      "Longueur standard",
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
    slug: "renes-2",
    name: "Rênes Elekka N°2",
    hidden: true,
    category: "Rênes",
    family: "Classique",
    tagline: "Rênes lisses, pour les mains expertes.",
    priceEUR: 50,
    description:
      "Rênes en cuir pleine fleur lisse. Pour les cavaliers qui préfèrent une sensation directe et sans grip.",
    longDescription:
      "Les Rênes N°2 sont en cuir pleine fleur lisse, sans grip. Idéales pour les cavaliers confirmés qui privilégient la sensation dans la main et la légèreté du contact.",
    highlights: [
      "Cuir pleine fleur lisse",
      "Boucles inox argentées",
      "Finition soignée",
      "Longueur standard",
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
    name: "Enrênement Elekka N°1",
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
    name: "Enrênement Elekka N°2",
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
