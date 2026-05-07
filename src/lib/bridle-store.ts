import { useState } from "react";
import { BRIDLE_CATALOG, BASE_PRICE } from "./bridle-catalog";
import type { CuirOption } from "./bridle-catalog";

export interface BridleState {
  muserole: number | null;
  frontal: number | null;
  tetiere: number | null;
  rene: number | null;
  enrenementOn: boolean;
  enrenement: number;
  cuir: CuirOption["id"] | null;
  taille: string | null;
  grav: string;
}

export function emptyState(): BridleState {
  return {
    muserole: null,
    frontal: null,
    tetiere: null,
    rene: null,
    enrenementOn: false,
    enrenement: 0,
    cuir: null,
    taille: null,
    grav: "",
  };
}

export function useBridleState(initial?: BridleState) {
  const [s, setS] = useState<BridleState>(initial ?? emptyState());
  const set = <K extends keyof BridleState>(k: K, v: BridleState[K]) =>
    setS((x) => ({ ...x, [k]: v }));
  return [s, set, setS] as const;
}

export function priceOf(s: BridleState): number {
  const C = BRIDLE_CATALOG;
  let total = BASE_PRICE;
  if (s.muserole != null) total += C.muserole[s.muserole].price;
  if (s.frontal != null) total += C.frontal[s.frontal].price;
  if (s.tetiere != null) total += C.tetiere[s.tetiere].price;
  if (s.rene != null) total += C.rene[s.rene].price;
  if (s.enrenementOn) total += C.enrenement[s.enrenement].price;
  return total;
}

export function encodeConfig(s: BridleState): string {
  const o = {
    m: s.muserole,
    f: s.frontal,
    t: s.tetiere,
    r: s.rene,
    c: s.cuir,
    ta: s.taille,
    g: s.grav || "",
    e: s.enrenementOn ? 1 : 0,
  };
  return btoa(JSON.stringify(o)).replace(/=+$/, "");
}

export function decodeConfig(code: string): BridleState | null {
  try {
    const o = JSON.parse(atob(code));
    return {
      muserole: o.m ?? null,
      frontal: o.f ?? null,
      tetiere: o.t ?? null,
      rene: o.r ?? null,
      cuir: o.c ?? null,
      taille: o.ta ?? null,
      grav: o.g ?? "",
      enrenementOn: o.e === 1,
      enrenement: 0,
    };
  } catch { return null; }
}

export function randomize(
  set: <K extends keyof BridleState>(k: K, v: BridleState[K]) => void,
  current: BridleState
) {
  const C = BRIDLE_CATALOG;
  const pickIdx = (n: number, exclude: number | null) => {
    let i: number;
    do {
      i = Math.floor(Math.random() * n);
    } while (n > 1 && i === exclude);
    return i;
  };
  set("muserole", pickIdx(C.muserole.length, current.muserole));
  set("frontal", pickIdx(C.frontal.length, current.frontal));
  set("tetiere", pickIdx(C.tetiere.length, current.tetiere));
  const cuirs = C.cuir.map((c) => c.id);
  const currentIdx = current.cuir ? cuirs.indexOf(current.cuir) : -1;
  set("cuir", cuirs[pickIdx(cuirs.length, currentIdx)]);
}
