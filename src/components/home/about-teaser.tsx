import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function AboutTeaser() {
  return (
    <section className="mt-24 md:mt-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden bg-paper-2">
            <Image
              src="/products/essentiel/essentiel-ambiance-01.png"
              alt="Atelier — détail d'un bridon Elekka"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-7 md:pl-6 lg:pl-16">
            <p className="kicker text-muted">À propos</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              Une marque née sur le terrain,
              <br />
              <span className="text-muted">pas dans un bureau.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base text-muted leading-relaxed max-w-[58ch]">
              <p>
                Ici, rien ne commence dans un bureau. Tout commence à l'écurie.
              </p>
              <p>
                Dans le quotidien des chevaux de sport, là où chaque détail
                compte, là où le matériel ne se choisit pas — il se ressent.
              </p>
              <p>
                Très vite, un constat s'impose : choisir entre un bridon de
                qualité, souvent à un prix démesuré, ou des modèles plus
                accessibles, mais qui ne répondent pas aux exigences des
                professionnels.
              </p>
              <p>
                <strong className="text-ink font-medium">Elekka est née de cette évidence.</strong>
              </p>
              <p>
                Fondée par un cavalier issu d'une famille de cavaliers, la
                marque s'inscrit dans une pratique réelle, exigeante,
                quotidienne. Observer, ajuster, comprendre. Repenser les
                formes, alléger les contraintes, affiner le contact.
              </p>
              <p>
                Chaque pièce est pensée pour respecter le cheval et servir le
                cavalier. Une approche simple : revenir à l'essentiel.
              </p>
            </div>
            <Link href="/a-propos" className="group inline-flex items-center gap-3 mt-10 text-sm tracking-wide text-ink press">
              <span className="underline underline-offset-[6px] decoration-line group-hover:decoration-ink">Lire l'histoire complète</span>
              <ArrowUpRight size={16} weight="regular" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
