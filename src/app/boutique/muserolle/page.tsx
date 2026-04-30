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
      priceEUR: 30,
      models: [
        { key: "simple",     label: "Simple",         desc: "Muserolle française classique, fermeture standard",                    priceEUR: 25 },
        { key: "rembourree", label: "Rembourrée",     desc: "2,5 à 3 cm d'épaisseur — protège et adoucit le contact",              priceEUR: 30 },
        { key: "triple",     label: "Triple attache", desc: "Interchangeable : épaisse, ovale, rectangulaire — 3 muserolles en 1",  priceEUR: 38 },
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
