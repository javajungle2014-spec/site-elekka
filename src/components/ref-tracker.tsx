"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, X, Gift, EnvelopeSimple } from "@phosphor-icons/react";

function extractReferrerName(code: string): string {
  const prefix = code.split("-")[0];
  if (!prefix) return "Un ami";
  return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
}

function ReferralModal({ code, onClose }: { code: string; onClose: () => void }) {
  const referrerName = extractReferrerName(code);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-[460px] bg-paper shadow-2xl overflow-hidden"
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
          <p className="kicker-tight text-on-ink-muted mb-2">{referrerName} vous invite</p>
          <h2 className="display text-2xl text-on-ink leading-snug">
            Profitez de −20 %<br />
            <span className="font-light italic text-on-ink-muted">sur votre première commande.</span>
          </h2>
        </div>

        {/* Corps */}
        <div className="px-8 py-7 space-y-6">

          <p className="text-sm text-ink leading-relaxed">
            Pour profiter de cette offre, <strong>créez votre compte Elekka</strong>. La réduction sera appliquée automatiquement à votre première commande — aucune action requise de votre part.
          </p>

          {/* Ce que vous recevrez */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">À la création de votre compte</p>
            <div className="flex items-start gap-3 p-4 border border-line">
              <EnvelopeSimple size={16} className="text-ink shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">Un code −20 % par email</p>
                <p className="text-xs text-muted leading-snug">
                  Votre code de parrainage vous sera envoyé par email. En cas de problème avec l'application automatique, collez-le dans le champ "Code promo" au paiement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border border-line">
              <Gift size={16} className="text-ink shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">Un code −15 % de bienvenue</p>
                <p className="text-xs text-muted leading-snug">
                  Offert à tous les nouveaux membres — utilisable sur une prochaine commande.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/compte"
              onClick={onClose}
              className="press group flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
            >
              Créer mon compte et profiter de l'offre
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="press text-xs text-muted hover:text-ink transition-colors py-2"
            >
              Continuer sans créer de compte
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
