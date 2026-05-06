export type StockStatus = "in" | "low" | "made";

export interface BridlePart {
  id: string;
  name: string;
  desc: string;
  price: number;
  stock: StockStatus;
  rating: number;
  reviews: number;
  note?: string;
}

export interface CuirOption {
  id: "noir" | "havana-brown" | "dark-brown";
  name: string;
  hex: string;
  sub: string;
}

export interface FilOption {
  id: string;
  name: string;
  hex: string;
}

export const BRIDLE_CATALOG = {
  muserole: [
    {
      id: "mu0",
      name: "Sans muserolle",
      desc: "Configuration sans muserolle.",
      price: 0,
      stock: "in" as StockStatus,
      rating: 0,
      reviews: 0,
    },
    {
      id: "mu1",
      name: "Simple",
      desc: "Muserolle française classique, fermeture standard.",
      price: 27.99,
      stock: "in" as StockStatus,
      rating: 4.5,
      reviews: 214,
    },
    {
      id: "mu2",
      name: "Rembourrée",
      desc: "2,5 à 3 cm d'épaisseur — protège et adoucit le contact.",
      price: 54.25,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 86,
    },
    {
      id: "mu3",
      name: "Triple attache",
      desc: "Interchangeable : épaisse, ovale, rectangulaire.",
      price: 54.25,
      stock: "in" as StockStatus,
      rating: 4.9,
      reviews: 54,
    },
  ] as BridlePart[],

  frontal: [
    {
      id: "fr0",
      name: "Sans frontal",
      desc: "Configuration sans frontal.",
      price: 0,
      stock: "in" as StockStatus,
      rating: 0,
      reviews: 0,
    },
    {
      id: "fr1",
      name: "Classique",
      desc: "Frontal rectiligne, sobre et élégant.",
      price: 19.99,
      stock: "in" as StockStatus,
      rating: 4.4,
      reviews: 142,
    },
    {
      id: "fr2",
      name: "Anatomique",
      desc: "Légèrement incurvé pour suivre la morphologie du front.",
      price: 38.75,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 92,
    },
    {
      id: "fr3",
      name: "Signature",
      desc: "Large 5,5 cm — répartit la pression, finitions soignées.",
      price: 38.75,
      stock: "in" as StockStatus,
      rating: 4.9,
      reviews: 47,
    },
  ] as BridlePart[],

  tetiere: [
    {
      id: "te1",
      name: "Classique",
      desc: "Têtière standard, conception anglaise traditionnelle.",
      price: 31.99,
      stock: "in" as StockStatus,
      rating: 4.4,
      reviews: 198,
    },
    {
      id: "te2",
      name: "Anatomique Signature",
      desc: "Incurvée — soulage la nuque et libère les oreilles.",
      price: 62,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 128,
    },
    {
      id: "te3",
      name: "Anatomique Fusion",
      desc: "Double rembourrage — confort maximal sur la nuque.",
      price: 62,
      stock: "in" as StockStatus,
      rating: 4.9,
      reviews: 76,
    },
  ] as BridlePart[],

  rene: [
    {
      id: "re1",
      name: "Rênes N°1",
      desc: "Cuir pleine fleur, grip caoutchouc intégré. Prise en main assurée par tous temps.",
      price: 39.99,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 188,
    },
    {
      id: "re2",
      name: "Rênes N°2",
      desc: "Cuir pleine fleur lisse. Pour les cavaliers qui privilégient la sensation directe.",
      price: 50,
      stock: "in" as StockStatus,
      rating: 4.6,
      reviews: 98,
    },
  ] as BridlePart[],

  enrenement: [
    {
      id: "en1",
      name: "Enrênement N°1",
      desc: "Cuir pleine fleur, réglage précis. Compatible tous bridons Elekka.",
      price: 50,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 54,
    },
    {
      id: "en2",
      name: "Enrênement N°2",
      desc: "Cuir pleine fleur, rembourrage aux points de contact. Pour les longues séances.",
      price: 50,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 38,
    },
  ] as BridlePart[],

  taille: ["Full", "Cob"] as string[],

  cuir: [
    {
      id: "noir" as const,
      name: "Noir",
      hex: "#1b1714",
      sub: "Cuir tanné végétal",
    },
    {
      id: "havana-brown" as const,
      name: "Havana Brown",
      hex: "#6b3a1f",
      sub: "Cuir pleine fleur",
    },
  ] as CuirOption[],

  fil: [] as FilOption[],
};

export const STOCK_LABEL: Record<StockStatus, { dot: string; txt: string }> = {
  in: { dot: "#2f6d3a", txt: "En stock · expédié sous 48 h" },
  low: { dot: "#c97a1a", txt: "Stock limité · 3-5 j" },
  made: { dot: "#8a2a25", txt: "Fait main · 3 semaines" },
};

export const ES_PALETTE = {
  noir: { surface: "#1b1714", highlight: "#3a322c", edge: "#0c0908" },
  "havana-brown": { surface: "#6b3a1f", highlight: "#a86a3f", edge: "#3f2110" },
  "dark-brown": { surface: "#3f2110", highlight: "#6b3a1f", edge: "#1f0c06" },
} as const;

export const BASE_PRICE = 0;
