import type { Metadata } from "next";
import { faqCategories } from "@/lib/faq";
import { faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Toutes les réponses à vos questions sur les bridons Elekka : tailles, entretien, commandes, livraison, retours.",
  openGraph: {
    title: "FAQ — Questions fréquentes sur les filets Elekka",
    description: "Toutes les réponses à vos questions sur les bridons Elekka : tailles, entretien, commandes, livraison, retours.",
    url: "https://elekka-sellier.fr/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const allItems = faqCategories.flatMap((c) => c.items);
  const schema = faqSchema(allItems.map((i) => ({ q: i.q, a: i.a })));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
