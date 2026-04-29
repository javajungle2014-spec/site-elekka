import type { Metadata } from "next";
import { PieceDetail } from "@/components/boutique/piece-detail";

export const metadata: Metadata = {
  title: "Muserolle — Pièces détachées · Elekka",
  description: "Muserolle en cuir pleine fleur, simple ou rembourrée. Compatible avec tous les bridons Elekka.",
};

export default function MuserollePage() {
  return (
    <PieceDetail piece={{
      slug: "muserolle",
      name: "Muserolle",
      subtitle: "Le contact sur le chanfrein.",
      description: "En cuir pleine fleur, la muserolle Elekka est disponible en version simple, rembourrée ou triple attache. Compatibles avec tous les bridons de la gamme.",
      priceEUR: 30,
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
