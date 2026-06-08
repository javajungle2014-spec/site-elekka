import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { conseils } from "@/lib/ressources";
import { articleSchema } from "@/lib/structured-data";

export async function generateStaticParams() {
  return conseils.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = conseils.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Elekka`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} — Elekka`,
      description: article.description,
      type: "article",
      url: `https://elekka-sellier.fr/ressources/conseils/${article.slug}`,
      publishedTime: article.date,
      authors: ["Lucas Mourier — Elekka"],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ConseilArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = conseils.find((a) => a.slug === slug);
  if (!article) notFound();

  const jsonLd = articleSchema({
    title: article.title,
    description: article.description,
    slug: article.slug,
    date: article.date,
    category: article.category,
  });

  return (
    <article className="max-w-[680px] space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/ressources/conseils" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors press">
        <ArrowLeft size={14} /> Tous les conseils
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="kicker text-muted">{article.category}</span>
          <span className="text-muted-soft">·</span>
          <span className="text-xs text-muted">{article.readTime} de lecture</span>
          <span className="text-muted-soft">·</span>
          <span className="text-xs text-muted">{formatDate(article.date)}</span>
        </div>
        <h1 className="display text-3xl md:text-4xl leading-tight">{article.title}</h1>
        <p className="text-muted text-base leading-relaxed">{article.description}</p>
      </div>

      <div className="space-y-8 border-t border-line pt-8">
        {article.content.map((block, i) => (
          <div key={i} className="space-y-3">
            {block.heading && (
              <h2 className="text-lg font-semibold">{block.heading}</h2>
            )}
            <p className="text-sm text-muted leading-relaxed">{block.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 flex items-center justify-between">
        <Link href={article.ctaProduct?.href ?? "/boutique"} className="press inline-flex items-center gap-2 bg-ink text-on-ink px-5 py-3 text-sm font-medium hover:bg-ink-soft transition-colors">
          {article.ctaProduct?.label ?? "Découvrir nos bridons"}
        </Link>
        <Link href="/ressources/conseils" className="press text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors">
          Autres conseils
        </Link>
      </div>
    </article>
  );
}
