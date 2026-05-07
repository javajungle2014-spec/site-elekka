"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { List, X, Heart, User, ShoppingBag, CaretDown } from "@phosphor-icons/react";
import { Wordmark } from "./wordmark";
import { LimelightNav } from "./ui/limelight-nav";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/boutique/personnaliser", label: "L'Atelier" },
  { href: "/#contact", label: "Contact" },
];

const ressourcesLinks = [
  { href: "/a-propos", label: "Notre histoire" },
  { href: "/ressources/faq", label: "FAQ" },
  { href: "/ressources/conseils", label: "Conseils" },
  { href: "/ressources/blog", label: "Blog" },
];

const icons = [
  { label: "Mes favoris", Icon: Heart },
  { label: "Mon compte", Icon: User },
  { label: "Mon panier", Icon: ShoppingBag },
];

function RessourcesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.startsWith("/ressources") || pathname.startsWith("/a-propos");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
          isActive ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        Ressources
        <CaretDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-44 bg-paper border border-line shadow-lg z-50">
          {ressourcesLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm transition-colors border-b border-line last:border-0 ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-ink font-medium"
                  : "text-muted hover:text-ink hover:bg-paper-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems, open: openCart } = useCart();
  const { slugs, open: openFavorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(-1);
  const [barReady, setBarReady] = useState(false);

  const iconRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const iconBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Position the sliding bar under the hovered icon
  useLayoutEffect(() => {
    const bar = iconBarRef.current;
    const el = iconRefs.current[hoveredIcon];
    if (!bar || !el || hoveredIcon < 0) return;

    const parent = el.parentElement!;
    const newLeft = el.offsetLeft + el.offsetWidth / 2 - bar.offsetWidth / 2 - parent.offsetLeft;
    bar.style.left = `${el.offsetLeft + el.offsetWidth / 2 - bar.offsetWidth / 2}px`;
    if (!barReady) setTimeout(() => setBarReady(true), 50);
  }, [hoveredIcon, barReady]);

  return (
    <>
    <header className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"}`}>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        {/* Desktop — 3 colonnes : nav | logo centré | icônes */}
        <div className="hidden lg:grid grid-cols-3 items-center h-20">

          {/* Gauche : navigation + dropdown Ressources */}
          <div className="flex items-center">
            <LimelightNav
              items={nav.map((item) => ({ id: item.href, label: item.label, href: item.href }))}
              activeIndex={nav.findIndex((item) =>
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) && item.href !== "/"
              )}
            />
            {/* Dropdown Ressources */}
            <RessourcesDropdown pathname={pathname} />
          </div>

          {/* Centre : wordmark dans badge trapèze (style VEXO) */}
          <div className="flex justify-center">
            <div
              className="relative flex items-center justify-center w-[220px] h-20 bg-white overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 22px 100%)" }}
            >
              <Link href="/" aria-label="Elekka — Accueil" className="relative z-10 press">
                <Wordmark tone="ink" priority className="h-16 w-auto" />
              </Link>
            </div>
          </div>

          {/* Droite : icônes avec barre limelight au survol */}
          <div className="flex justify-end">
            <div
              className="relative flex items-center gap-1"
              onMouseLeave={() => setHoveredIcon(-1)}
            >
              {/* Favoris */}
              <button
                ref={(el) => { iconRefs.current[0] = el; }}
                type="button" aria-label="Mes favoris"
                onMouseEnter={() => setHoveredIcon(0)}
                onClick={openFavorites}
                className={`relative z-20 px-4 py-2 transition-colors duration-200 press ${hoveredIcon === 0 ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <Heart size={19} weight="regular" />
                {slugs.length > 0 && (
                  <span className="absolute top-1.5 right-2.5 w-4 h-4 bg-ink text-on-ink text-[9px] font-bold rounded-full flex items-center justify-center">{slugs.length}</span>
                )}
              </button>

              {/* Mon compte */}
              <Link
                href="/compte"
                ref={(el) => { iconRefs.current[1] = el; }}
                aria-label="Mon compte"
                onMouseEnter={() => setHoveredIcon(1)}
                className={`relative z-20 px-4 py-2 transition-colors duration-200 press ${hoveredIcon === 1 ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <User size={19} weight="regular" />
              </Link>

              {/* Panier */}
              <button
                ref={(el) => { iconRefs.current[2] = el; }}
                type="button" aria-label="Mon panier"
                onMouseEnter={() => setHoveredIcon(2)}
                onClick={openCart}
                className={`relative z-20 px-4 py-2 transition-colors duration-200 press ${hoveredIcon === 2 ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <ShoppingBag size={19} weight="regular" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-2.5 w-4 h-4 bg-ink text-on-ink text-[9px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>
                )}
              </button>

              {/* Barre glissante */}
              {hoveredIcon >= 0 && (
                <div
                  ref={iconBarRef}
                  className={`absolute bottom-0 z-10 w-8 h-[2px] rounded-full bg-ink ${
                    barReady ? "transition-[left] duration-300 ease-in-out" : ""
                  }`}
                  style={{ left: "-999px" }}
                >
                  <div className="absolute left-[-60%] bottom-[2px] w-[220%] h-10 pointer-events-none [clip-path:polygon(10%_100%,28%_0%,72%_0%,90%_100%)] bg-gradient-to-t from-ink/10 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between h-20">
          <button
            type="button"
            className={`p-2 -ml-2 press ${scrolled || open ? "text-ink" : "text-white"}`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
          </button>

          <div
            className="relative flex items-center justify-center w-[200px] h-20 bg-white overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 20px 100%)" }}
          >
            <Link href="/" aria-label="Elekka — Accueil" className="relative z-10 press">
              <Wordmark tone="ink" priority className="h-14 w-auto" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Mon panier"
            onClick={openCart}
            className={`relative p-2 -mr-2 press ${scrolled || open ? "text-ink" : "text-white"}`}
          >
            <ShoppingBag size={24} weight="regular" />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-ink text-on-ink text-[9px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </button>
        </div>
      </div>

    </header>

      {/* Menu mobile — en dehors du header pour éviter le backdrop-blur */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-[60] overflow-y-auto" style={{ backgroundColor: "#fafaf9" }}>
          <nav className="flex flex-col divide-y divide-line">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-5 text-lg tracking-tight press"
              >
                <span>{item.label}</span>
                <span aria-hidden className="text-muted">→</span>
              </Link>
            ))}
            <div className="px-5 py-4">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">Ressources</p>
              <div className="flex flex-col gap-3">
                {ressourcesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-muted hover:text-ink transition-colors press"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-8 px-5 py-6 border-t border-line">
            <button type="button" aria-label="Mes favoris" className="flex items-center gap-2 text-sm text-muted press">
              <Heart size={18} /> Favoris
            </button>
            <Link href="/compte" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-muted press">
              <User size={18} /> Mon compte
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
