"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import Link from "next/link";
import { faqCategories, type FaqItem } from "@/lib/faq";

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="press w-full flex items-start justify-between gap-6 py-5 text-left"
      >
        <span className="text-sm font-medium leading-snug">{item.q}</span>
        <span className="shrink-0 mt-0.5 text-muted">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      {open && (
        <p className="text-sm text-muted leading-relaxed pb-5 max-w-[64ch]">
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[860px] px-5 md:px-10">

        <div className="mb-14">
          <p className="kicker text-muted mb-3">Aide</p>
          <h1 className="display text-4xl md:text-5xl">
            Questions<br />
            <span className="text-muted">fréquentes.</span>
          </h1>
        </div>

        <div className="space-y-14">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <p className="kicker text-muted mb-6">{cat.title}</p>
              <div>
                {cat.items.map((item) => (
                  <FaqRow key={item.q} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-10 text-center space-y-3">
          <p className="text-sm text-muted">Vous n'avez pas trouvé votre réponse ?</p>
          <Link
            href="/#contact"
            className="press inline-flex items-center gap-2 bg-ink text-on-ink px-6 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Contactez-nous
          </Link>
        </div>

      </div>
    </div>
  );
}
