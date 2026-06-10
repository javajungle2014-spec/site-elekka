import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Elekka vs Antares, CWD et grandes marques — comparatif bridons",
  description: "Comparatif honnête entre Elekka et les grandes marques équestres (Antares, CWD). Qualité du cuir, technicité, confort du cheval, prix. Qu'est-ce qu'on offre vraiment ?",
  keywords: [
    "elekka vs antares",
    "elekka vs cwd",
    "comparatif bridon cuir",
    "alternative antares moins cher",
    "bridon qualité prix équitation",
    "bridon anatomique pas cher",
    "filet cuir grandes marques",
  ],
};

const CRITERIA = [
  {
    criterion: "Cuir pleine fleur",
    elekka: true,
    grandes: true,
    note: "Même qualité de cuir — pleine fleur, pleine épaisseur.",
  },
  {
    criterion: "Têtière anatomique incurvée",
    elekka: true,
    grandes: true,
    note: "Le Signature et le Fusion intègrent une têtière anatomique.",
  },
  {
    criterion: "Muserolle rembourrée",
    elekka: true,
    grandes: true,
    note: "2,5 à 3 cm de rembourrage sur les modèles anatomiques.",
  },
  {
    criterion: "Rênes incluses",
    elekka: true,
    grandes: false,
    note: "Incluses sur Signature et Fusion. Offertes sur Essentiel.",
  },
  {
    criterion: "Prix inférieur à 200 €",
    elekka: true,
    grandes: false,
    note: "Elekka à partir de 99 €. Les grandes marques : 350 – 600 €.",
  },
  {
    criterion: "Disponible en 48h",
    elekka: true,
    grandes: false,
    note: "Expédition sous 48 h ouvrées depuis la France.",
  },
  {
    criterion: "Retours 14 jours",
    elekka: true,
    grandes: true,
    note: "Droit de rétractation légal de 14 jours.",
  },
  {
    criterion: "Prestige / notoriété de marque",
    elekka: false,
    grandes: true,
    note: "Elekka est une marque jeune — sans le prestige d'Antares ou CWD.",
  },
];

export default function ElekkaVsGrandesMarques() {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[860px] px-5 md:px-10">

        <Link href="/ressources" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors press mb-6">
          ← Ressources
        </Link>

        <p className="kicker text-muted mb-3">Comparatif</p>
        <h1 className="display text-4xl md:text-5xl mb-6">
          Elekka face aux<br />
          <span className="text-muted">grandes marques.</span>
        </h1>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-[60ch] mb-12">
          Antares, CWD, Prestige — ce sont les références du marché. Elekka propose le même niveau de technicité, à un prix significativement plus bas. Voici une comparaison honnête.
        </p>

        {/* Tableau comparatif */}
        <div className="border border-line overflow-x-auto">
          <table className="w-full border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left text-xs tracking-widest uppercase text-muted py-4 px-5 font-medium w-[45%]">Critère</th>
                <th className="text-center text-xs tracking-widest uppercase py-4 px-4 font-medium w-[20%]">Elekka</th>
                <th className="text-center text-xs tracking-widest uppercase text-muted py-4 px-4 font-medium w-[20%]">Grandes marques</th>
                <th className="text-left text-xs tracking-widest uppercase text-muted py-4 px-4 font-medium hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map(({ criterion, elekka, grandes, note }, i) => (
                <tr key={criterion} className={`border-b border-line last:border-0 ${i % 2 === 1 ? "bg-paper-2/50" : ""}`}>
                  <td className="py-4 px-5 text-sm font-medium">{criterion}</td>
                  <td className="py-4 px-4 text-center">
                    {elekka
                      ? <Check size={16} weight="bold" className="text-ink mx-auto" />
                      : <X size={16} weight="bold" className="text-muted-soft mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {grandes
                      ? <Check size={16} weight="bold" className="text-ink mx-auto" />
                      : <X size={16} weight="bold" className="text-muted-soft mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-xs text-muted leading-relaxed hidden md:table-cell">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Explication */}
        <div className="mt-12 space-y-6 text-sm text-muted leading-relaxed max-w-[66ch]">
          <h2 className="display text-xl text-ink">Ce qu'Elekka ne prétend pas être</h2>
          <p>
            Elekka n'est pas Antares. Nous n'avons pas leur histoire, leur réseau de selleries mondiales, ni le prestige de leur nom dans les paddocks de Fontainebleau ou Aachen. Ce serait malhonnête de le prétendre.
          </p>
          <p>
            Ce qu'Elekka offre, c'est le même niveau d'exigence en termes de matière et de technicité — conçue par un cavalier, pour des cavaliers — à un tarif qui n'intègre pas la marge du prestige. Le cuir est pleine fleur. La têtière anatomique décharge réellement la nuque. La muserolle rembourrée mesure entre 2,5 et 3 cm. C'est le produit, pas le logo, qui compte.
          </p>
          <p>
            Pour un cavalier qui reconnaît la qualité, qui pratique régulièrement et qui préfère investir dans l'équipement de son cheval plutôt que dans un nom : Elekka est une alternative sérieuse.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/boutique/signature" className="press inline-flex items-center gap-2 bg-ink text-on-ink px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors">
            Voir le Signature <ArrowRight size={14} />
          </Link>
          <Link href="/boutique" className="press inline-flex items-center gap-2 border border-line px-6 py-3 text-sm hover:border-ink transition-colors">
            Toute la gamme
          </Link>
        </div>

      </div>
    </div>
  );
}
