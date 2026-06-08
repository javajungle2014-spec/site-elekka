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
      description: "En cuir pleine fleur, compatible avec tous les bridons de la gamme. Choisissez le modèle adapté à votre cheval.",
      priceEUR: 27.99,
      models: [
        { key: "simple", label: "Essentiel", desc: "Muserolle française classique, fermeture standard — Essentiel", priceEUR: 27.99, stockSlug: "muserolle-essentiel", images: {
          "havana-brown": ["/products/pieces/muserolle/muserolle-simple-havana-brown-01.png"],
        }, colours: [
          { key: "havana-brown", label: "Havana Brown", swatch: "#4a2a1a" },
        ]},
        { key: "rembourree", label: "Muserolle Signature", desc: "2,5 à 3 cm d'épaisseur — protège et adoucit le contact — Signature", priceEUR: 54.25, stockSlug: "muserolle-signature", images: {
          "havana-brown": ["/products/pieces/muserolle/muserolle-rembourree-havana-brown-01.png"],
          "noir":         ["/products/pieces/muserolle/muserolle-rembourree-noir-01.png"],
        }},
        { key: "triple", label: "Muserolle Fusion", desc: "Interchangeable : épaisse, ovale, rectangulaire — Fusion", priceEUR: 54.25, stockSlug: "muserolle-fusion", images: {
          "havana-brown": ["/products/pieces/muserolle/muserolle-triple-havana-brown-01.png"],
          "dark-brown":   ["/products/pieces/muserolle/muserolle-triple-dark-brown-01.png"],
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
      imagePosition: "center 70%",
    }} />
  );
}
