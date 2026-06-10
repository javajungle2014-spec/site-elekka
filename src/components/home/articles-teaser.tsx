import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { conseils, blog } from "@/lib/ressources";

const FEATURED = [
  { ...conseils[0], base: "/ressources/conseils" },
  { ...conseils[1], base: "/ressources/conseils" },
  { ...blog[0],     base: "/ressources/blog" },
];

export function ArticlesTeaser() {
  return (
    <section className="py-12 md:py-16 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="kicker text-muted block mb-3">Conseils & Articles</span>
            <h2 className="display text-2xl md:text-3xl">
              Le contenu équestre<br />
              <span className="text-muted">qui vous aide à choisir.</span>
            </h2>
          </div>
          <Link
            href="/ressources"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors press"
          >
            Voir tous les articles
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED.map((article) => (
            <Link
              key={article.slug}
              href={`${article.base}/${article.slug}`}
              className="group block border border-line hover:border-ink transition-colors p-5 space-y-3 press"
            >
              <div className="flex items-center gap-2">
                <span className="kicker text-muted text-[10px]">{article.category}</span>
                <span className="text-muted-soft text-[10px]">·</span>
                <span className="text-[10px] text-muted">{article.readTime}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-muted transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{article.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium mt-1 group-hover:gap-2 transition-all duration-200">
                Lire l'article
                <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors press"
          >
            Voir tous les articles
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
