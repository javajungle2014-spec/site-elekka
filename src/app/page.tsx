import { HomeHero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ProductFeature } from "@/components/home/product-feature";
import { AboutTeaser } from "@/components/home/about-teaser";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { ContactSection } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ProductFeature />
      <Manifesto />
      <ReviewsCarousel />
      <AboutTeaser />
      <ContactSection />
    </>
  );
}
