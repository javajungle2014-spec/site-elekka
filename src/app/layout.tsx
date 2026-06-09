import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroOverlay } from "@/components/intro-overlay";
import { RefTracker } from "@/components/ref-tracker";
import { PageTransition } from "@/components/ui/page-transition";
import { RewardNotifier } from "@/components/reward-notifier";
import { ConditionalAnnouncementBar } from "@/components/conditional-announcement-bar";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { CartDrawer } from "@/components/cart-drawer";
import { FavoritesDrawer } from "@/components/favorites-drawer";
import { CookieBanner } from "@/components/cookie-banner";
import { HelpButton } from "@/components/help-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Elekka — Bridons en cuir pour chevaux",
    template: "%s · Elekka",
  },
  description:
    "Bridons en cuir conçus par des cavaliers, pour des cavaliers. Même exigence que les grandes maisons, à prix juste.",
  metadataBase: new URL("https://elekka-sellier.fr"),
  verification: { google: "dd49c415fec81d9e" },
  openGraph: {
    title: "Elekka — Bridons en cuir pour chevaux",
    description:
      "Bridons en cuir conçus par des cavaliers, pour des cavaliers. Même exigence que les grandes maisons, à prix juste.",
    locale: "fr_FR",
    type: "website",
    url: "https://elekka-sellier.fr",
    siteName: "Elekka",
    images: [{ url: "/brand/hero.jpg", width: 1200, height: 630, alt: "Elekka — Bridons en cuir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elekka — Bridons en cuir pour chevaux",
    description: "Bridons en cuir conçus par des cavaliers, pour des cavaliers.",
    images: ["/brand/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <CartProvider>
          <FavoritesProvider>
            <IntroOverlay />
            <RefTracker />
            <RewardNotifier />
            <ConditionalAnnouncementBar />
            <SiteHeader />
            <main className="flex-1"><PageTransition>{children}</PageTransition></main>
            <SiteFooter />
            <CartDrawer />
            <FavoritesDrawer />
            <HelpButton />
            <CookieBanner />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
