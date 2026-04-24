import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { conseils } from "@/lib/ressources";

export const metadata: Metadata = {
  title: "Conseils équestres — Elekka",
  description: "Guides pratiques pour cavaliers : choisir son filet, entretenir le cuir, comprendre les bienfaits du filet anatomique pour votre cheval.",
  keywords: ["filet bridon conseils", "entretien cuir équestre", "filet anatomique cheval", "guide taille filet"],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ConseilsPage() {
  return (
    <div className="space-y-8">
      {conseils.map((article) => (
        <Link
          key={article.slug}
          href={`/ressources/conseils/${article.slug}`}
          className="press group block border border-line p-6 hover:border-ink transition-colors"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="kicker text-muted">{article.category}</span>
                <span className="text-muted-soft text-xs">·</span>
                <span className="text-xs text-muted">{article.readTime} de lecture</span>
              </div>
              <h2 className="text-base font-semibold leading-snug group-hover:text-muted transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{article.description}</p>
              <p className="text-xs text-muted-soft">{formatDate(article.date)}</p>
            </div>
            <ArrowRight size={16} className="text-muted shrink-0 mt-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
      ))}
    </div>
  );
}
