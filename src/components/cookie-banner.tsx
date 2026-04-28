"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("elekka_cookie_consent");
      if (!consent) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    localStorage.setItem("elekka_cookie_consent", "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem("elekka_cookie_consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9000] bg-paper border-t border-line shadow-lg">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <p className="text-xs text-muted leading-relaxed max-w-[65ch]">
          Ce site utilise des cookies strictement nécessaires à son fonctionnement (panier, authentification).
          Aucun cookie publicitaire n&apos;est déposé.{" "}
          <Link href="/confidentialite" className="underline underline-offset-4 hover:text-ink transition-colors">
            Politique de confidentialité
          </Link>
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={refuse}
            className="press text-xs text-muted hover:text-ink transition-colors underline underline-offset-4"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="press bg-ink text-on-ink text-xs font-semibold px-5 py-2.5 hover:bg-ink-soft transition-colors"
          >
            Accepter
          </button>
        </div>

      </div>
    </div>
  );
}
