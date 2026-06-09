"use client";

import { useState } from "react";
import { ChatDots, X, EnvelopeSimple } from "@phosphor-icons/react";

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-paper border border-line shadow-xl p-5 w-[260px] space-y-3 rounded-sm">
          <p className="text-sm font-semibold">Une question ?</p>
          <p className="text-xs text-muted leading-relaxed">
            Notre équipe répond sous 48 h ouvrées.
          </p>
          <a
            href="mailto:elekka.sellier@gmail.com"
            className="press flex items-center gap-2 bg-ink text-on-ink px-4 py-2.5 text-xs font-medium hover:bg-ink-soft transition-colors w-full justify-center"
          >
            <EnvelopeSimple size={14} />
            elekka.sellier@gmail.com
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'aide" : "Besoin d'aide ?"}
        className="press w-12 h-12 bg-ink text-on-ink flex items-center justify-center shadow-lg hover:bg-ink-soft transition-colors rounded-full"
      >
        {open ? <X size={18} /> : <ChatDots size={20} weight="fill" />}
      </button>
    </div>
  );
}
