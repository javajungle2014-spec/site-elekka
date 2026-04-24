import type { Metadata } from "next";
import { RessourcesNav } from "./nav";

export const metadata: Metadata = {
  title: "Ressources — Elekka",
  description: "Conseils d'entretien, guides pratiques, FAQ et actualités de la marque Elekka — votre référence pour l'équipement équestre en cuir.",
};

export default function RessourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[1000px] px-5 md:px-10">

        <div className="mb-12">
          <p className="kicker text-muted mb-3">Ressources</p>
          <h1 className="display text-4xl md:text-5xl">
            Tout savoir<br />
            <span className="text-muted">sur Elekka.</span>
          </h1>
        </div>

        <RessourcesNav />

        {children}
      </div>
    </div>
  );
}
