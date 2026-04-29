import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurer mon filet sur mesure",
  description: "Composez votre filet Elekka pièce par pièce : têtière, frontal, muserolle, coloris, rênes. Même exigence que nos modèles, vos propres choix. À partir de 95 €.",
  openGraph: {
    title: "Configurer mon filet sur mesure — Elekka",
    description: "Composez votre filet Elekka pièce par pièce. À partir de 95 €.",
    url: "https://elekka-sellier.fr/boutique/personnaliser",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
