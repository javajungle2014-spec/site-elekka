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
        { key: "classique", label: "Essentiel", desc: "Têtière standard, conception anglaise traditionnelle", priceEUR: 31.99, stockSlug: "tetiere-essentiel", images: {
          "havana-brown": ["/products/pieces/tetiere/tetiere-classique-havana-brown-01.png"],
        }, colours: [
          { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a" },
        ]},
        { key: "signature", label: "Anatomique Signature", desc: "Incurvée — soulage la nuque et libère les oreilles", priceEUR: 62, stockSlug: "tetiere-signature", images: {
          "havana-brown": ["/products/pieces/tetiere/tetiere-signature-havana-brown-01.png"],
          "noir":         ["/products/pieces/tetiere/tetiere-signature-noir-01.png"],
        }},
        { key: "fusion", label: "Anatomique Fusion", desc: "Double rembourrage — confort maximal sur la nuque", priceEUR: 62, stockSlug: "tetiere-fusion", images: {
          "havana-brown": ["/products/pieces/tetiere/tetiere-fusion-havana-brown-01.png"],
          "dark-brown":   ["/products/pieces/tetiere/tetiere-fusion-dark-brown-01.png"],
        }, colours: [
          { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a" },
          { key: "dark-brown",   label: "Dark Brown",   swatch: "#2b1710" },
        ]},
      ],
      colours: [
        { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a" },
        { key: "noir",         label: "Noir",          swatch: "#0a0a0a" },
      ],
      sizes: ["Full", "Cob"],
      specs: [
        ["Cuir",          "Pleine fleur"],
        ["Bouclerie",     "Inox poli"],
        ["Compatibilité", "Tous bridons Elekka"],
        ["Expédition",    "2 à 4 jours ouvrés"],
        ["Tailles",       "Full, Cob"],
      ],
    }} />
  );
}
