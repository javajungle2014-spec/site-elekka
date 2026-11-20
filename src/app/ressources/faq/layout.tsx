import type { Metadata } from "next";

// Même contenu que /faq : on indique à Google que /faq est la page de référence.
export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
