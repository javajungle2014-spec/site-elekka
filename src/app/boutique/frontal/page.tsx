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
        { key: "classique", label: "Classique", desc: "Frontal rectiligne, sobre et élégant — Essentiel", priceEUR: 19.99, stockSlug: "frontal-essentiel", images: {
          "havana-brown": ["/products/pieces/frontal/frontal-classique-havana-brown-01.png", "/products/pieces/frontal/frontal-classique-havana-brown-02.png", "/products/pieces/frontal/frontal-classique-havana-brown-03.png"],
          "noir":         ["/products/pieces/frontal/frontal-classique-noir-01.png",         "/products/pieces/frontal/frontal-classique-noir-02.png",         "/products/pieces/frontal/frontal-classique-noir-03.png"],
        }},
        { key: "anatomique", label: "Anatomique", desc: "Légèrement incurvé pour suivre la morphologie du front — Signature", priceEUR: 38.75, stockSlug: "frontal-fusion", images: {
          "havana-brown": ["/products/pieces/frontal/frontal-anatomique-havana-brown-01.png", "/products/pieces/frontal/frontal-anatomique-havana-brown-02.png", "/products/pieces/frontal/frontal-anatomique-havana-brown-03.png"],
          "noir":         ["/products/pieces/frontal/frontal-anatomique-noir-01.png",         "/products/pieces/frontal/frontal-anatomique-noir-02.png",         "/products/pieces/frontal/frontal-anatomique-noir-03.png"],
        }},
        { key: "signature", label: "Signature", desc: "Large 5,5 cm — répartit la pression, finitions soignées — Fusion", priceEUR: 38.75, stockSlug: "frontal-signature", images: {
          "havana-brown": ["/products/pieces/frontal/frontal-signature-havana-brown-01.png"],
          "noir":         ["/products/pieces/frontal/frontal-signature-noir-01.png"],
        }},
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
      imagePosition: "center 25%",
    }} />
  );
}
