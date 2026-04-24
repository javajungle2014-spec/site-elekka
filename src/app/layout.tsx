import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroOverlay } from "@/components/intro-overlay";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { CartDrawer } from "@/components/cart-drawer";
import { FavoritesDrawer } from "@/components/favorites-drawer";

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

export const metadata: Metadata = {
  title: {
    default: "Elekka — Bridons en cuir pour chevaux",
    template: "%s · Elekka",
  },
  description:
    "Bridons en cuir conçus par des cavaliers, pour des cavaliers. Même exigence que les grandes maisons, à prix juste.",
  openGraph: {
    title: "Elekka",
    description:
      "Bridons en cuir conçus par des cavaliers, pour des cavaliers. Même exigence que les grandes maisons, à prix juste.",
    locale: "fr_FR",
    type: "website",
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
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CartDrawer />
            <FavoritesDrawer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
