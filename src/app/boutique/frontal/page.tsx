import type { Metadata } from "next";
import { PieceDetail } from "@/components/boutique/piece-detail";

export const metadata: Metadata = {
  title: "Frontal — Pièces détachées · Elekka",
  description: "Frontal en cuir pleine fleur, classique ou signature. Compatible avec tous les bridons Elekka.",
};

export default function FrontalPage() {
  return (
    <PieceDetail piece={{
      slug: "frontal",
      name: "Frontal",
      subtitle: "La pièce qui traverse le front.",
      description: "En cuir pleine fleur, le frontal Elekka est disponible en version classique ou Signature large 5,5 cm. Compatibles avec tous les bridons de la gamme.",
      priceEUR: 25,
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
