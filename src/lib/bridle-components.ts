/**
 * Nomenclature : composants de chaque filet.
 * Un filet = 1 muserolle + 1 frontal + 1 têtière.
 * Achat d'un filet → déduction du filet ET des 3 composants correspondants.
 * Rupture d'un composant → rupture du filet.
 */
export const BRIDLE_COMPONENTS: Record<string, string[]> = {
  essentiel: ["muserolle-essentiel", "frontal-essentiel", "tetiere-essentiel"],
  signature: ["muserolle-signature", "frontal-signature", "tetiere-signature"],
  fusion:    ["muserolle-fusion",    "frontal-fusion",    "tetiere-fusion"],
};

export const BRIDLE_SLUGS = Object.keys(BRIDLE_COMPONENTS);

export function isBridle(slug: string): boolean {
  return slug in BRIDLE_COMPONENTS;
}
