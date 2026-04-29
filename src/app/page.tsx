import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ProductFeature } from "@/components/home/product-feature";
import { AboutTeaser } from "@/components/home/about-teaser";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { ReferralSection } from "@/components/home/referral-section";
import { ContactSection } from "@/components/home/contact";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Elekka — Bridons en cuir pour chevaux",
  description: "Bridons en cuir pleine fleur conçus par des cavaliers. Qualité des grandes marques équestres, prix juste. Livraison offerte, retours 14 jours.",
  openGraph: {
    title: "Elekka — Bridons en cuir pour chevaux",
    description: "Bridons en cuir pleine fleur conçus par des cavaliers. Qualité des grandes marques équestres, prix juste.",
    type: "website",
    url: "https://elekka-sellier.fr",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
      <HomeHero />
      <ProductFeature />
      <Manifesto />
      <ReviewsCarousel />
      <ReferralSection />
      <AboutTeaser />
      <ContactSection />
    </>
  );
}
