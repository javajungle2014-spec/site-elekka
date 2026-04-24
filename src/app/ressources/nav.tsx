"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/ressources/faq", label: "FAQ" },
  { href: "/ressources/conseils", label: "Conseils" },
  { href: "/ressources/blog", label: "Blog" },
];

export function RessourcesNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-0 border-b border-line mb-12">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active
                ? "text-ink border-ink"
                : "text-muted border-transparent hover:text-ink hover:border-muted"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
