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
      id: "mu1",
      name: "Simple",
      desc: "Muserolle française classique, fermeture standard.",
      price: 0,
      stock: "in" as StockStatus,
      rating: 4.5,
      reviews: 214,
    },
    {
      id: "mu2",
      name: "Rembourrée",
      desc: "2,5 à 3 cm d'épaisseur — protège et adoucit le contact.",
      price: 26,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 86,
    },
    {
      id: "mu3",
      name: "Triple attache",
      desc: "Interchangeable : épaisse, ovale, rectangulaire.",
      price: 26,
      stock: "in" as StockStatus,
      rating: 4.9,
      reviews: 54,
    },
  ] as BridlePart[],

  frontal: [
    {
      id: "fr1",
      name: "Classique",
      desc: "Frontal rectiligne, sobre et élégant.",
      price: 0,
      stock: "in" as StockStatus,
      rating: 4.4,
      reviews: 142,
    },
    {
      id: "fr2",
      name: "Anatomique",
      desc: "Légèrement incurvé pour suivre la morphologie du front.",
      price: 19,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 92,
    },
    {
      id: "fr3",
      name: "Signature 5,5 cm",
      desc: "Large 5,5 cm — répartit la pression, finitions soignées.",
      price: 19,
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
      price: 0,
      stock: "in" as StockStatus,
      rating: 4.4,
      reviews: 198,
    },
    {
      id: "te2",
      name: "Anatomique Signature",
      desc: "Incurvée — soulage la nuque et libère les oreilles.",
      price: 30,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 128,
    },
    {
      id: "te3",
      name: "Anatomique Fusion",
      desc: "Double rembourrage — confort maximal sur la nuque.",
      price: 30,
      stock: "in" as StockStatus,
      rating: 4.9,
      reviews: 76,
    },
  ] as BridlePart[],

  rene: [
    {
      id: "re1",
      name: "Classiques",
      desc: "Cuir pleine fleur assorti, 145 cm.",
      price: 0,
      stock: "in" as StockStatus,
      rating: 4.5,
      reviews: 312,
      note: "Offertes",
    },
    {
      id: "re2",
      name: "Anatomique",
      desc: "Grip intégré, prise assurée par tous temps.",
      price: 42,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 188,
      note: "−15 %",
    },
    {
      id: "re3",
      name: "Signature",
      desc: "Cuir souple surpiqué, finition premium.",
      price: 55,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 98,
      note: "−15 %",
    },
  ] as BridlePart[],

  enrenement: [
    {
      id: "en1",
      name: "Tylman",
      desc: "Aide à la décontraction.",
      price: 51,
      stock: "in" as StockStatus,
      rating: 4.8,
      reviews: 54,
      note: "−15 %",
    },
    {
      id: "en2",
      name: "Martingale",
      desc: "Fixe réglable, sécurité renforcée.",
      price: 51,
      stock: "in" as StockStatus,
      rating: 4.7,
      reviews: 38,
      note: "−15 %",
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
    {
      id: "dark-brown" as const,
      name: "Dark Brown",
      hex: "#3f2110",
      sub: "Cuir pleine fleur",
    },
  ] as CuirOption[],

  fil: [
    { id: "creme", name: "Crème", hex: "#efe6cf" },
    { id: "blanc", name: "Blanc", hex: "#f5f1e6" },
    { id: "tan", name: "Tan", hex: "#c79a5b" },
    { id: "bordeaux", name: "Bordeaux", hex: "#8a2a25" },
    { id: "marine", name: "Marine", hex: "#1c2a47" },
    { id: "noir-fil", name: "Noir", hex: "#1a1714" },
  ] as FilOption[],
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

export const BASE_PRICE = 95;
