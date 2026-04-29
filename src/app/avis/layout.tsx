import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis clients",
  description: "Les avis de nos clients sur les bridons, licols et rênes Elekka. Retours d'expérience de cavaliers sur la qualité et le confort de nos produits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
