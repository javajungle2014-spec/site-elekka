import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Question, BookOpen, Newspaper, User } from "@phosphor-icons/react/dist/ssr";
import { conseils, blog } from "@/lib/ressources";

export const metadata: Metadata = {
  title: "Ressources Elekka — FAQ, Conseils, Blog",
  description: "Tout savoir sur Elekka : FAQ, guides pratiques sur le soin du cheval et l'entretien du cuir, actualités de la marque.",
};

const SECTIONS = [
  {
    href: "/ressources/faq",
    Icon: Question,
    label: "FAQ",
    desc: "Les questions les plus fréquentes sur nos produits, la livraison, les retours et l'entretien.",
    cta: "Voir toutes les questions",
  },
  {
    href: "/ressources/conseils",
    Icon: BookOpen,
    label: "Conseils",
    desc: "Guides pratiques : choisir son filet, entretenir le cuir, mesurer la tête de son cheval.",
    cta: `${conseils.length} articles`,
  },
  {
    href: "/ressources/blog",
    Icon: Newspaper,
    label: "Blog",
    desc: "Actualités de la marque, présentation des modèles et coulisses de la création Elekka.",
    cta: `${blog.length} articles`,
  },
  {
    href: "/a-propos",
    Icon: User,
    label: "Notre histoire",
    desc: "Qui se cache derrière Elekka ? L'histoire du fondateur, ses chevaux, et la promesse de la marque.",
    cta: "Découvrir",
  },
];

const recentArticles = [
  ...conseils.slice(0, 2).map((a) => ({ ...a, base: "/ressources/conseils" })),
  ...blog.slice(0, 1).map((a) => ({ ...a, base: "/ressources/blog" })),
];

export default function RessourcesPage() {
  return (
    <div className="space-y-16">

      {/* Grille 4 sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map(({ href, Icon, label, desc, cta }) => (
          <Link
            key={href}
            href={href}
            className="group block border border-line hover:border-ink transition-colors p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-muted" />
              <h2 className="font-semibold text-base">{label}</h2>
            </div>
            <p className="text-sm text-muted leading-relaxed">{desc}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium group-hover:gap-2 transition-all duration-200">
              {cta}
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>
        ))}
      </div>

      {/* Articles récents */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="kicker text-muted">Récemment publié</p>
          <Link href="/ressources/conseils" className="text-xs text-muted hover:text-ink transition-colors press">
            Voir tout →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {recentArticles.map((article) => (
            <Link
              key={article.slug}
              href={`${article.base}/${article.slug}`}
              className="press group flex items-start justify-between gap-6 border border-line p-5 hover:border-ink transition-colors"
            >
              <div className="flex-1 space-y-1">
                <p className="kicker text-muted text-[10px]">{article.category} · {article.readTime}</p>
                <p className="text-sm font-medium leading-snug group-hover:text-muted transition-colors">{article.title}</p>
              </div>
              <ArrowRight size={14} className="text-muted shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
