import type { Metadata } from "next";
import { PieceDetail } from "@/components/boutique/piece-detail";

export const metadata: Metadata = {
  title: "Têtière — Pièces détachées · Elekka",
  description: "Têtière en cuir pleine fleur, classique ou anatomique. Compatible avec tous les bridons Elekka.",
};

export default function TetierePage() {
  return (
    <PieceDetail piece={{
      slug: "tetiere",
      name: "Têtière",
      subtitle: "La pièce principale, sur la nuque.",
      description: "En cuir pleine fleur, compatible avec tous les bridons de la gamme. Choisissez le modèle adapté à votre cheval.",
      priceEUR: 31.99,
      models: [
        { key: "classique",  label: "Classique",            desc: "Têtière standard, conception anglaise traditionnelle",               priceEUR: 31.99 },
        { key: "signature",  label: "Anatomique Signature", desc: "Incurvée — soulage la nuque et libère les oreilles",                 priceEUR: 62 },
        { key: "fusion",     label: "Anatomique Fusion",    desc: "Double rembourrage — confort maximal sur la nuque",                  priceEUR: 62 },
      ],
      colours: [
        { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a", images: [
          "/products/pieces/tetiere/tetiere-havana-brown-01.png",
          "/products/pieces/tetiere/tetiere-havana-brown-02.png",
          "/products/pieces/tetiere/tetiere-havana-brown-03.png",
        ]},
        { key: "noir", label: "Noir", swatch: "#0a0a0a", images: [
          "/products/pieces/tetiere/tetiere-noir-01.png",
          "/products/pieces/tetiere/tetiere-noir-02.png",
          "/products/pieces/tetiere/tetiere-noir-03.png",
        ]},
      ],
      sizes: ["Full", "Cob"],
      specs: [
        ["Cuir",          "Pleine fleur"],
        ["Bouclerie",     "Inox poli"],
        ["Compatibilité", "Tous bridons Elekka"],
        ["Expédition",    "2 à 4 jours ouvrés"],
        ["Retours",       "14 jours"],
        ["Tailles",       "Full, Cob"],
      ],
    }} />
  );
}
