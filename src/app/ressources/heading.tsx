"use client";

import { usePathname } from "next/navigation";

// Les articles et guides ont leur propre H1 : sur ces pages, le titre de section
// reste identique visuellement mais n'est plus un H1 (une seule H1 par page).
const INDEX_PATHS = new Set(["/ressources", "/ressources/blog", "/ressources/conseils", "/ressources/faq"]);

export function RessourcesHeading() {
  const pathname = usePathname();
  const Tag = INDEX_PATHS.has(pathname.replace(/\/$/, "")) ? "h1" : "p";
  return (
    <Tag className="display text-4xl md:text-5xl">
      Tout savoir<br />
      <span className="text-muted">sur Elekka.</span>
    </Tag>
  );
}
