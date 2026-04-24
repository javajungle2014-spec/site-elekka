import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-on-ink mt-24 md:mt-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          <div className="md:col-span-5">
            <Wordmark tone="paper" className="h-6 w-auto" />
            <p className="mt-6 text-sm text-on-ink-muted max-w-[34ch] leading-relaxed">
              Bridons en cuir conçus par des cavaliers, pour des cavaliers.
              Qualité, technicité, prix juste.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="kicker text-on-ink-muted">Naviguer</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/" className="hover:text-on-ink text-on-ink-muted">Accueil</Link></li>
              <li><Link href="/boutique" className="hover:text-on-ink text-on-ink-muted">Boutique</Link></li>
              <li><Link href="/a-propos" className="hover:text-on-ink text-on-ink-muted">À propos</Link></li>
              <li><Link href="/#contact" className="hover:text-on-ink text-on-ink-muted">Contact</Link></li>
              <li><Link href="/ressources" className="hover:text-on-ink text-on-ink-muted">Ressources</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="kicker text-on-ink-muted">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="mailto:contact@elekka.fr" className="text-on-ink hover:underline underline-offset-4">contact@elekka.fr</a></li>
              <li className="text-on-ink-muted">Réponse sous 48 h ouvrées</li>
              <li className="text-on-ink-muted">France — expédition Europe</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-line-ink flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-on-ink-muted">© {new Date().getFullYear()} Elekka. Tous droits réservés.</p>
          <ul className="flex items-center gap-6 text-xs text-on-ink-muted">
            <li><Link href="/mentions-legales" className="hover:text-on-ink">Mentions légales</Link></li>
            <li><Link href="/cgv" className="hover:text-on-ink">CGV</Link></li>
            <li><Link href="/confidentialite" className="hover:text-on-ink">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
