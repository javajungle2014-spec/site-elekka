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
        <p className="text-sm text-muted leading-relaxed pb-5 max-w-[64ch]">{item.a}</p>
      )}
    </div>
  );
}

export default function RessourcesFaqPage() {
  return (
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

      <div className="border-t border-line pt-10 text-center space-y-3">
        <p className="text-sm text-muted">Vous n'avez pas trouvé votre réponse ?</p>
        <Link
          href="/#contact"
          className="press inline-flex items-center gap-2 bg-ink text-on-ink px-6 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
        >
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}
