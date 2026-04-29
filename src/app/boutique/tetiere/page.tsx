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
      description: "En cuir pleine fleur, la têtière Elekka est disponible en version classique ou anatomique. Compatibles avec tous les bridons de la gamme.",
      priceEUR: 35,
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
        ["Retours",       "14 jours"],
        ["Tailles",       "Full, Cob"],
      ],
    }} />
  );
}
