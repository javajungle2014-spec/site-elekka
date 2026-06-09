import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { BridlesGrid } from "@/components/home/bridles-grid";
import { Manifesto } from "@/components/home/manifesto";
import { ProductFeature } from "@/components/home/product-feature";
import { AboutTeaser } from "@/components/home/about-teaser";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { ReferralSection } from "@/components/home/referral-section";
import { ContactSection } from "@/components/home/contact";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { ScrollTop } from "@/components/scroll-top";

export const metadata: Metadata = {
  title: "Elekka — Bridons en cuir pour chevaux",
  description: "Elekka — Bridons en cuir pleine fleur, classiques et anatomiques. Qualité des grandes marques équestres à prix juste. À partir de 99 €. Livraison offerte, retours 14 jours.",
  openGraph: {
    title: "Elekka — Bridons en cuir pour chevaux",
    description: "Bridons en cuir pleine fleur, classiques et anatomiques. Qualité des grandes marques à prix juste. À partir de 99 €, livraison offerte.",
    type: "website",
    url: "https://elekka-sellier.fr",
  },
};

export default function Home() {
  return (
    <>
      <ScrollTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
      <HomeHero />
      <BridlesGrid />
      <ProductFeature />
      <Manifesto />
      <ReviewsCarousel />
      <ReferralSection />
      <AboutTeaser />
      <ContactSection />
    </>
  );
}
