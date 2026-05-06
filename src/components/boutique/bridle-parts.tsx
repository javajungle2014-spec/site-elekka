import { ES_PALETTE } from "@/lib/bridle-catalog";
import type { CuirOption } from "@/lib/bridle-catalog";

type PaletteKey = CuirOption["id"];

function leatherGrad(color: PaletteKey, id: string) {
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.highlight} />
        <stop offset="50%" stopColor={c.surface} />
        <stop offset="100%" stopColor={c.edge} />
      </linearGradient>
    </defs>
  );
}

interface PartProps {
  color?: PaletteKey;
  stitch?: string;
}

// ── Muserolles ──────────────────────────────────────────────────

export function MuseroleA({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-mua-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <ellipse cx="160" cy="110" rx="115" ry="55" fill="none" stroke={`url(#${id})`} strokeWidth="14" />
      <path d="M 70 96 Q 160 70 250 96" fill="none" stroke={`url(#${id})`} strokeWidth="9" />
      <path d="M 70 96 Q 160 70 250 96" fill="none" stroke={stitch} strokeWidth="0.8" strokeDasharray="3 3" />
      <ellipse cx="160" cy="110" rx="115" ry="55" fill="none" stroke={stitch} strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="160" cy="110" r="4" fill={c.edge} />
    </svg>
  );
}

export function MuseroleB({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-mub-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <path
        d="M 50 90 Q 110 40 160 50 Q 210 40 270 90 Q 280 130 220 150 Q 160 165 100 150 Q 40 130 50 90 Z"
        fill={`url(#${id})`}
        stroke={c.edge}
        strokeWidth="1.5"
      />
      <path
        d="M 60 95 Q 115 50 160 60 Q 205 50 260 95 Q 268 125 215 142 Q 160 155 105 142 Q 52 125 60 95 Z"
        fill="none"
        stroke={stitch}
        strokeWidth="0.8"
        strokeDasharray="3 3"
      />
      <rect x="152" y="44" width="16" height="12" rx="3" fill={c.surface} stroke={c.edge} strokeWidth="1" />
    </svg>
  );
}

export function MuseroleC({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-muc-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="40" y="92" width="240" height="22" rx="4" fill={`url(#${id})`} stroke={c.edge} strokeWidth="1" />
      <line x1="48" y1="100" x2="272" y2="100" stroke={stitch} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="48" y1="106" x2="272" y2="106" stroke={stitch} strokeWidth="0.8" strokeDasharray="3 3" />
      <rect x="148" y="86" width="24" height="34" rx="4" fill={c.surface} stroke={c.edge} strokeWidth="1.2" />
      <line x1="156" y1="92" x2="156" y2="114" stroke={stitch} strokeWidth="0.7" />
      <line x1="164" y1="92" x2="164" y2="114" stroke={stitch} strokeWidth="0.7" />
    </svg>
  );
}

// ── Frontaux ─────────────────────────────────────────────────────

export function FrontalA({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-fra-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="15" y="28" width="290" height="22" rx="3" fill={`url(#${id})`} stroke={c.edge} strokeWidth="1" />
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={28 + i * 15.5} cy="39" r="2.4" fill="#e8e4d8" stroke="#bdb6a3" strokeWidth="0.5" />
      ))}
      <rect x="0" y="30" width="14" height="18" rx="2" fill={c.edge} />
      <rect x="306" y="30" width="14" height="18" rx="2" fill={c.edge} />
    </svg>
  );
}

export function FrontalB({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-frb-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <path
        d="M 15 40 Q 80 22 160 40 Q 240 58 305 40 L 305 52 Q 240 70 160 52 Q 80 34 15 52 Z"
        fill={`url(#${id})`}
        stroke={c.edge}
        strokeWidth="1"
      />
      <path d="M 18 41 Q 82 24 160 41 Q 238 58 302 41" fill="none" stroke={stitch} strokeWidth="0.7" strokeDasharray="2 2" />
      <rect x="0" y="32" width="14" height="22" rx="2" fill={c.edge} />
      <rect x="306" y="32" width="14" height="22" rx="2" fill={c.edge} />
    </svg>
  );
}

export function FrontalC({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-frc-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="15" y="24" width="290" height="30" rx="3" fill={c.edge} />
      {Array.from({ length: 22 }).map((_, i) => (
        <path
          key={i}
          d={`M ${20 + i * 13} 24 Q ${26 + i * 13} 39 ${20 + i * 13} 54`}
          stroke={`url(#${id})`}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <rect x="0" y="26" width="14" height="26" rx="2" fill={c.edge} />
      <rect x="306" y="26" width="14" height="26" rx="2" fill={c.edge} />
    </svg>
  );
}

// ── Têtières ─────────────────────────────────────────────────────

export function TetiereA({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-tea-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="40" y="60" width="240" height="60" rx="6" fill={`url(#${id})`} stroke={c.edge} />
      <circle cx="160" cy="90" r="7" fill={c.edge} />
      <line x1="50" y1="72" x2="270" y2="72" stroke={stitch} strokeWidth="0.7" strokeDasharray="3 3" />
      <line x1="50" y1="108" x2="270" y2="108" stroke={stitch} strokeWidth="0.7" strokeDasharray="3 3" />
      <rect x="60" y="120" width="16" height="50" rx="3" fill={c.surface} stroke={c.edge} />
      <rect x="244" y="120" width="16" height="50" rx="3" fill={c.surface} stroke={c.edge} />
    </svg>
  );
}

export function TetiereB({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-teb-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <path
        d="M 80 30 L 240 30 Q 290 60 280 110 Q 270 140 240 145 L 80 145 Q 50 140 40 110 Q 30 60 80 30 Z"
        fill={`url(#${id})`}
        stroke={c.edge}
        strokeWidth="1.2"
      />
      <path
        d="M 90 40 L 230 40 Q 270 65 262 105 Q 252 132 230 136 L 90 136 Q 68 132 58 105 Q 50 65 90 40 Z"
        fill="none"
        stroke={stitch}
        strokeWidth="0.8"
        strokeDasharray="3 3"
      />
      <rect x="60" y="145" width="16" height="40" rx="3" fill={c.surface} stroke={c.edge} />
      <rect x="244" y="145" width="16" height="40" rx="3" fill={c.surface} stroke={c.edge} />
    </svg>
  );
}

export function TetiereC({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-tec-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      {leatherGrad(color, id)}
      <path d="M 60 50 Q 160 30 260 50 Q 280 90 260 130 Q 160 150 60 130 Q 40 90 60 50 Z" fill="#efe9da" stroke="#bdb39b" strokeWidth="1" />
      <path d="M 70 60 Q 160 42 250 60 Q 268 88 250 118 Q 160 138 70 118 Q 52 88 70 60 Z" fill={`url(#${id})`} stroke={c.edge} strokeWidth="1" />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={75 + i * 24} cy={48} r={3.5} fill="#fff" stroke="#bdb39b" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={`b${i}`} cx={75 + i * 24} cy={132} r={3.5} fill="#fff" stroke="#bdb39b" strokeWidth="0.5" />
      ))}
    </svg>
  );
}

// ── Rênes ─────────────────────────────────────────────────────────

export function ReneA({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-rea-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="10" y="34" width="300" height="14" rx="3" fill={`url(#${id})`} stroke={c.edge} />
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={20 + i * 10} y1="36" x2={20 + i * 10} y2="46" stroke={c.edge} strokeWidth="0.8" opacity="0.55" />
      ))}
    </svg>
  );
}

export function ReneB({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-reb-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="10" y="34" width="300" height="14" rx="3" fill={`url(#${id})`} stroke={c.edge} />
      <line x1="10" y1="38" x2="310" y2="38" stroke={stitch} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="10" y1="44" x2="310" y2="44" stroke={stitch} strokeWidth="0.6" strokeDasharray="2 2" />
      {[60, 120, 180, 240].map((x) => (
        <rect key={x} x={x} y="32" width="6" height="18" rx="1" fill={c.surface} stroke={c.edge} strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export function ReneC({ color = "noir", stitch = "#efe6cf" }: PartProps) {
  const id = `lf-rec-${color}`;
  const c = ES_PALETTE[color] ?? ES_PALETTE.noir;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      {leatherGrad(color, id)}
      <rect x="10" y="32" width="300" height="18" rx="3" fill={`url(#${id})`} stroke={c.edge} />
      <line x1="10" y1="37" x2="310" y2="37" stroke={stitch} strokeWidth="0.9" strokeDasharray="4 2" />
      <line x1="10" y1="43" x2="310" y2="43" stroke={stitch} strokeWidth="0.9" strokeDasharray="4 2" />
      <line x1="10" y1="41" x2="310" y2="41" stroke={stitch} strokeWidth="0.6" strokeDasharray="1 3" />
    </svg>
  );
}

function NoneA(_: PartProps) {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%">
      <rect x="10" y="10" width="300" height="180" rx="8" fill="none" stroke="#d8d3c7" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="160" y="108" textAnchor="middle" fill="#8a8a92" fontSize="13" fontFamily="sans-serif">—</text>
    </svg>
  );
}

function NoneB(_: PartProps) {
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%">
      <rect x="10" y="10" width="300" height="60" rx="6" fill="none" stroke="#d8d3c7" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="160" y="46" textAnchor="middle" fill="#8a8a92" fontSize="13" fontFamily="sans-serif">—</text>
    </svg>
  );
}

export const MUSEROLE_COMPONENTS = [NoneA, MuseroleA, MuseroleB, MuseroleC];
export const FRONTAL_COMPONENTS = [NoneB, FrontalA, FrontalB, FrontalC];
export const TETIERE_COMPONENTS = [TetiereA, TetiereB, TetiereC];
export const RENE_COMPONENTS = [NoneB, ReneA, ReneB];
