import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finaliser ma commande",
  description: "Finalisez votre commande Elekka en toute sécurité. Paiement par carte ou PayPal.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
