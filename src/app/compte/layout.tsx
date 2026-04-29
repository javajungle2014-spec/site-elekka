import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Accédez à votre espace client Elekka : commandes, favoris, parrainage.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
