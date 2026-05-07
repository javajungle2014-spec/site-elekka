"use client";

import { useEffect, useState } from "react";
import { ArrowSquareOut, Check, Copy, X } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { fetchPromotions, type UserPromotion } from "@/lib/account-store";

function isActive(promo: UserPromotion) {
  return !promo.used && (!promo.validUntil || new Date(promo.validUntil) > new Date());
}

function RewardModal({ promos, onClose }: { promos: UserPromotion[]; onClose: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(code: string, id: string) {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-5" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-[460px] bg-paper shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-ink px-8 py-7 relative">
          <button type="button" onClick={onClose} className="absolute top-4 right-4 text-on-ink-muted hover:text-on-ink transition-colors press" aria-label="Fermer">
            <X size={16} />
          </button>
          <p className="kicker-tight text-on-ink-muted mb-2">Parrainage</p>
          <h2 className="display text-2xl text-on-ink leading-snug">
            Votre filleul vient de commander.<br />
            <span className="font-light italic text-on-ink-muted">Merci pour votre confiance.</span>
          </h2>
        </div>
        <div className="px-8 py-7 space-y-5">
          <p className="text-sm text-muted leading-relaxed">
            En récompense, voici {promos.length > 1 ? "vos codes" : "votre code"} de{" "}
            <strong className="text-ink">−30 € sur votre prochain filet</strong>. Retrouvez-{promos.length > 1 ? "les" : "le"} à tout moment dans la section{" "}
            <strong className="text-ink">Promotions</strong> de votre compte.
          </p>

          {promos.map((promo) => (
            <div key={promo.id} className="border border-line p-4 space-y-3">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">{promo.label}</p>
              <div className="flex items-center justify-between gap-3 py-2 px-3 bg-paper-2">
                <span className="font-mono text-lg font-semibold tracking-wider text-ink">{promo.code}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(promo.code, promo.id)}
                  className="press shrink-0 flex items-center gap-2 text-xs border border-line px-3 py-1.5 hover:border-ink hover:text-ink transition-colors"
                >
                  {copiedId === promo.id ? <Check size={12} weight="bold" className="text-green-600" /> : <Copy size={12} />}
                  {copiedId === promo.id ? "Copié !" : "Copier"}
                </button>
              </div>
              <p className="text-[11px] text-muted">−30 € · Usage unique · Sur les filets Elekka</p>
            </div>
          ))}

          <p className="text-xs text-muted leading-relaxed">
            Un email de confirmation vous a également été envoyé avec ce code.
          </p>

          <a
            href="/compte"
            onClick={onClose}
            className="press w-full flex items-center justify-between bg-ink text-on-ink px-6 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Accéder à mes promotions
            <ArrowSquareOut size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function RewardNotifier() {
  const [rewardPromos, setRewardPromos] = useState<UserPromotion[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const userId = data.user?.id;
      if (!userId) return;

      const promos = await fetchPromotions(userId);
      const newRewards = promos.filter((promo) => {
        if (!isActive(promo) || promo.discountValue !== 30) return false;
        return !localStorage.getItem(`reward_seen_${userId}_${promo.id}`);
      });

      if (newRewards.length > 0) {
        setRewardPromos(newRewards);
        newRewards.forEach((promo) => {
          localStorage.setItem(`reward_seen_${userId}_${promo.id}`, "1");
        });
      }
    });
  }, []);

  if (rewardPromos.length === 0) return null;

  return (
    <RewardModal
      promos={rewardPromos}
      onClose={() => setRewardPromos([])}
    />
  );
}
