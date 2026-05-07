"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Copy, Check, X } from "@phosphor-icons/react";

function ReferralModal({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-5"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

      {/* Modale */}
      <div
        className="relative w-full max-w-[440px] bg-paper shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-ink px-8 py-7 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-on-ink-muted hover:text-on-ink transition-colors press"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
          <p className="kicker-tight text-on-ink-muted mb-2">Offre parrainage</p>
          <h2 className="display text-2xl text-on-ink leading-tight">
            Votre ami vous offre<br />
            <span className="text-on-ink">−20 % sur votre commande.</span>
          </h2>
        </div>

        {/* Corps */}
        <div className="px-8 py-7 space-y-6">
          <p className="text-sm text-muted leading-relaxed">
            La réduction sera appliquée <strong className="text-ink">automatiquement au moment du paiement</strong> — aucune action requise de votre part. Ajoutez simplement vos articles au panier et passez commande.
          </p>

          {/* Code de secours */}
          <div className="border border-line p-4 space-y-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
              Code de secours
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-lg font-semibold tracking-wider text-ink">
                {code}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="press flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors border border-line px-3 py-1.5"
              >
                {copied ? <Check size={12} weight="bold" className="text-green-600" /> : <Copy size={12} />}
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <p className="text-[11px] text-muted leading-snug">
              Si la réduction ne s'applique pas automatiquement, copiez ce code et collez-le dans le champ "Code promo" au moment du paiement.
            </p>
          </div>

          {/* Boutons */}
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/compte"
              onClick={onClose}
              className="press group flex items-center justify-between bg-ink text-on-ink px-6 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
            >
              Créer un compte
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="press text-sm text-muted hover:text-ink transition-colors py-2 underline underline-offset-4"
            >
              Découvrir la boutique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tracker() {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const code = ref.toUpperCase();
      localStorage.setItem("referral_code", code);
      // Affiche la modale seulement si le code vient d'être reçu via l'URL
      setReferralCode(code);
      setShowModal(true);
    }
  }, [searchParams]);

  if (!showModal || !referralCode) return null;

  return (
    <ReferralModal
      code={referralCode}
      onClose={() => setShowModal(false)}
    />
  );
}

export function RefTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
