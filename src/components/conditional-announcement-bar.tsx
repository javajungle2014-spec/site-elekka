"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";

const FILET_SLUGS = ["essentiel", "signature"];

export function ConditionalAnnouncementBar() {
  const pathname = usePathname();
  const isProductPage = FILET_SLUGS.some(
    (slug) => pathname === `/boutique/${slug}` || pathname.startsWith(`/boutique/${slug}/`)
  );
  if (isProductPage) return null;
  return <AnnouncementBar />;
}
