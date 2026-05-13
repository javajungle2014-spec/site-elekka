import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuration partagée — Elekka",
  description: "Ouvrir une configuration de filet Elekka partagée.",
  robots: { index: false },
};

export default async function SharedConfigPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  // Redirige vers le configurateur avec le code en paramètre
  // Le configurateur lit ?config= au montage et restaure la configuration
  redirect(`/boutique/personnaliser?config=${code}`);
}
