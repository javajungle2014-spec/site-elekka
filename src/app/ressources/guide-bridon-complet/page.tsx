import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Guide complet du bridon pour cheval — Choisir, ajuster, entretenir",
  description: "Tout ce qu'il faut savoir sur le bridon : choisir entre classique et anatomique, taille Full ou Cob, entretenir son cuir, ajuster sa muserolle. Le guide complet Elekka.",
  keywords: [
    "guide bridon cheval",
    "bridon anatomique ou classique",
    "choisir bridon équitation",
    "filet cuir cheval",
    "bridon cross",
    "bridon compétition",
    "taille bridon Full Cob",
    "muserolle française",
    "ajuster bridon cheval",
    "entretenir bridon cuir",
  ],
};

const SECTIONS = [
  {
    heading: "Choisir son bridon",
    articles: [
      { title: "Comment choisir son filet de bridon : guide complet", href: "/ressources/conseils/choisir-filet-bridon", desc: "Cuir ou synthétique, Full ou Cob, classique ou anatomique — tous les critères expliqués." },
      { title: "Bridon classique ou anatomique : quelle différence ?", href: "/ressources/conseils/bridon-classique-vs-anatomique", desc: "Têtières, muserolles, frontaux — comment les deux familles se distinguent et pour quel cheval." },
      { title: "Filet anatomique : bienfaits pour votre cheval", href: "/ressources/conseils/filet-anatomique-bienfaits", desc: "Pourquoi un bridon anatomique peut changer la communication avec votre cheval." },
    ],
  },
  {
    heading: "Ajustement et tailles",
    articles: [
      { title: "Comment mesurer la tête de son cheval pour choisir la taille de son filet", href: "/ressources/conseils/mesurer-tete-cheval-taille-filet", desc: "Guide pratique pour choisir entre Full et Cob selon la morphologie." },
      { title: "Bridon compétition : comment bien le régler ?", href: "/ressources/conseils/bridon-competition-reglage", desc: "Réglages précis pour un filet qui ne gêne pas et transmet fidèlement les aides." },
    ],
  },
  {
    heading: "Entretien du cuir",
    articles: [
      { title: "Entretien du cuir : les gestes essentiels", href: "/ressources/conseils/entretien-cuir-equestre", desc: "Nettoyage, nourrissage, séchage — les bons gestes pour un cuir qui dure." },
    ],
  },
  {
    heading: "Nos modèles Elekka",
    articles: [
      { title: "Bridon Essentiel — le classique à prix juste", href: "/boutique/essentiel", desc: "Cuir pleine fleur, muserolle française, quincaillerie inox. À partir de 99,99 €." },
      { title: "Bridon Signature — confort anatomique", href: "/boutique/signature", desc: "Têtière incurvée, muserolle rembourrée. Le plus vendu de la gamme." },
      { title: "Bridon Fusion — trois configurations, un seul filet", href: "/boutique/fusion", desc: "Muserolle à triple attache, frontal élargi. Polyvalent et anatomique." },
    ],
  },
];

const FAQ = [
  { q: "Quelle est la différence entre un bridon Full et Cob ?", a: "La taille Full convient aux chevaux de grande taille (à partir de 1,65 m au garrot). La taille Cob est adaptée aux poneys D, chevaux compacts ou à tête plus fine. En cas de doute, choisissez le Full." },
  { q: "Peut-on utiliser un bridon anatomique pour le cross ou le saut ?", a: "Oui. Un bridon anatomique est adapté à toutes les disciplines. La têtière incurvée libère la nuque et favorise la décontraction — un avantage dans toutes les phases d'effort." },
  { q: "Quelle muserolle convient à un cheval sensible ?", a: "Une muserolle rembourrée (comme celle du Signature ou du Fusion) réduit les points de pression sur le chanfrein. La muserolle française du modèle Essentiel convient aux chevaux qui n'ont pas de sensibilité particulière." },
  { q: "Combien de temps faut-il pour assouplir un nouveau bridon en cuir ?", a: "Un cuir pleine fleur s'assouplit progressivement à l'usage. Après 3 à 5 séances, il prend la forme de la tête du cheval. Un premier nourrissage avant utilisation accélère ce processus." },
];

export default function GuideBridonComplet() {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">

        {/* Header */}
        <div className="mb-12">
          <Link href="/ressources" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors press mb-6">
            ← Ressources
          </Link>
          <p className="kicker text-muted mb-3">Guide complet</p>
          <h1 className="display text-4xl md:text-5xl mb-6">
            Le bridon pour cheval :<br />
            <span className="text-muted">tout ce qu'il faut savoir.</span>
          </h1>
          <p className="text-sm md:text-base text-muted leading-relaxed max-w-[60ch]">
            Choisir, ajuster, entretenir — ce guide centralise tout ce qu'un cavalier doit savoir sur le bridon en cuir. Qu'il s'agisse d'un premier achat ou d'un remplacement, les réponses sont ici.
          </p>
        </div>

        {/* Sections d'articles */}
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-5 border-b border-line pb-3">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="press group flex items-start justify-between gap-6 border border-line hover:border-ink transition-colors p-5"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-snug group-hover:text-muted transition-colors">{article.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{article.desc}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6 border-b border-line pb-3">
            Questions fréquentes
          </h2>
          <div className="space-y-5">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-line pb-5 last:border-0">
                <p className="text-sm font-semibold mb-2">{q}</p>
                <p className="text-sm text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 border border-line p-8 text-center space-y-4">
          <p className="display text-2xl">Prêt à choisir votre bridon ?</p>
          <p className="text-sm text-muted">Trois modèles, à partir de 99 €. Livraison offerte, rênes offertes.</p>
          <Link href="/boutique" className="press inline-flex items-center gap-2 bg-ink text-on-ink px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors">
            Voir la gamme Elekka <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
