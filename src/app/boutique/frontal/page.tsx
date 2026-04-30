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
      description: "En cuir pleine fleur, compatible avec tous les bridons de la gamme. Choisissez le modèle adapté à votre cheval.",
      priceEUR: 19.99,
      models: [
        { key: "classique",  label: "Classique",   desc: "Frontal rectiligne, sobre et élégant — Essentiel",                  priceEUR: 19.99 },
        { key: "anatomique", label: "Anatomique",  desc: "Légèrement incurvé pour suivre la morphologie du front — Signature", priceEUR: 38.75 },
        { key: "signature",  label: "Signature",   desc: "Large 5,5 cm — répartit la pression, finitions soignées — Fusion",  priceEUR: 38.75 },
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
        ["Retours",       "14 jours"],
        ["Tailles",       "Full, Cob"],
      ],
    }} />
  );
}
