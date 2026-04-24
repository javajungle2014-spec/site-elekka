"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, UsersThree } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { fetchProfile } from "@/lib/account-store";

export function ReferralSection() {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setLoggedIn(true);
      const profile = await fetchProfile(data.user.id);
      if (profile.referralCode) {
        setReferralLink(`https://elekka-sellier.fr/?ref=${profile.referralCode}`);
      }
    });
  }, []);

  async function handleCopy() {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="mt-24 md:mt-36 bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

          <div className="md:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <UsersThree size={20} className="text-muted" />
              <p className="kicker text-muted">Parrainage</p>
            </div>
            <h2 className="display text-3xl md:text-4xl">
              Parrainez un ami.<br />
              <span className="text-muted">Vous gagnez tous les deux.</span>
            </h2>
            <div className="space-y-2 text-sm text-muted leading-relaxed">
              <p>
                <span className="text-ink font-medium">Votre ami</span> — reçoit <span className="text-ink font-medium">-20%</span> sur sa première commande, appliqués automatiquement via votre lien.
              </p>
              <p>
                <span className="text-ink font-medium">Vous</span> — recevez <span className="text-ink font-medium">-30€</span> sur votre prochain filet dès qu'il a commandé.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            {referralLink ? (
              <>
                <p className="text-xs text-muted">Votre lien personnel</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-mono text-xs text-muted bg-paper border border-line px-3 py-2.5 truncate">
                    {referralLink}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="press flex items-center gap-2 bg-ink text-on-ink px-4 py-2.5 text-xs font-medium hover:bg-ink-soft transition-colors shrink-0"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copié !" : "Copier"}
                  </button>
                </div>
                <p className="text-xs text-muted">Partagez-le par message, email ou réseaux sociaux.</p>
              </>
            ) : loggedIn ? (
              <p className="text-sm text-muted">Votre lien de parrainage est en cours de génération…</p>
            ) : (
              <>
                <p className="text-sm text-muted leading-relaxed">
                  Créez un compte pour obtenir votre lien de parrainage personnel et commencer à parrainer vos amis cavaliers.
                </p>
                <Link
                  href="/compte"
                  className="press group inline-flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
                >
                  Créer un compte ou se connecter
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
