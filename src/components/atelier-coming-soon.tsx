"use client";

import { useRouter } from "next/navigation";

export function AtelierComingSoon() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(5px)", background: "rgba(20,20,26,0.35)" }}>
      <div className="relative w-full max-w-md mx-5 bg-paper shadow-2xl">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-line">
          <p className="kicker text-muted mb-3">L'Atelier · Elekka</p>
          <h2 className="display text-2xl leading-tight">
            En cours de préparation.
          </h2>
        </div>

        {/* Corps */}
        <div className="px-8 py-6 space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            L'Atelier est l'espace de personnalisation d'Elekka — composez votre filet pièce par pièce : structure, frontal, muserolle, coloris, rênes et équipement.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            Cet espace est actuellement en préparation et sera disponible prochainement. La gamme complète et les photos sont en cours de finalisation.
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <button
            type="button"
            onClick={() => router.push("/boutique")}
            className="press w-full bg-ink text-on-ink px-6 py-3.5 text-sm font-semibold tracking-wide hover:bg-ink-soft transition-colors"
          >
            Retourner à la boutique
          </button>
        </div>

      </div>
    </div>
  );
}
