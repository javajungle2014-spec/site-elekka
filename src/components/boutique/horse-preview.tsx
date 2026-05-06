import { ES_PALETTE } from "@/lib/bridle-catalog";
import type { BridleState } from "@/lib/bridle-store";
import type { CuirOption } from "@/lib/bridle-catalog";

type View = "profil" | "3/4" | "face";

interface HoverHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  style: React.CSSProperties;
}

function makeHandlers(
  part: string,
  hoveredPart: string | null,
  onHoverPart?: (p: string | null) => void
): HoverHandlers {
  return {
    onMouseEnter: () => onHoverPart?.(part),
    onMouseLeave: () => onHoverPart?.(null),
    style: {
      cursor: "help",
      transition: "opacity .25s",
      opacity: hoveredPart && hoveredPart !== part ? 0.55 : 1,
    },
  };
}

interface HorsePreviewProps {
  s: BridleState;
  view?: View;
  stitch?: string;
  onHoverPart?: (part: string | null) => void;
  hoveredPart?: string | null;
}

export function HorsePreview({
  s,
  view = "profil",
  stitch = "#efe6cf",
  onHoverPart,
  hoveredPart = null,
}: HorsePreviewProps) {
  const cuirId = (s.cuir ?? "noir") as CuirOption["id"];
  const c = ES_PALETTE[cuirId] ?? ES_PALETTE.noir;
  const edgeColor = c.edge;

  return (
    <svg viewBox="0 0 800 800" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="horseCoat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a8870" />
          <stop offset="60%" stopColor="#7a6a55" />
          <stop offset="100%" stopColor="#4d4234" />
        </linearGradient>
        <linearGradient id="horseShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={`leather-hp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.highlight} />
          <stop offset="50%" stopColor={c.surface} />
          <stop offset="100%" stopColor={c.edge} />
        </linearGradient>
        <radialGradient id="hpBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fbf8f1" />
          <stop offset="100%" stopColor="#ece8df" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="800" fill="url(#hpBg)" />

      {view === "profil" && (
        <ProfileView s={s} edgeColor={edgeColor} stitch={stitch} onHoverPart={onHoverPart} hoveredPart={hoveredPart} />
      )}
      {view === "3/4" && (
        <ThreeQuarterView s={s} edgeColor={edgeColor} stitch={stitch} onHoverPart={onHoverPart} hoveredPart={hoveredPart} />
      )}
      {view === "face" && (
        <FaceView s={s} edgeColor={edgeColor} stitch={stitch} onHoverPart={onHoverPart} hoveredPart={hoveredPart} />
      )}

      <ellipse cx="400" cy="760" rx="220" ry="14" fill="rgba(20,20,26,.10)" />
    </svg>
  );
}

interface ViewProps {
  s: BridleState;
  edgeColor: string;
  stitch: string;
  onHoverPart?: (p: string | null) => void;
  hoveredPart: string | null;
}

function ProfileView({ s, edgeColor, stitch, onHoverPart, hoveredPart }: ViewProps) {
  const h = (p: string) => makeHandlers(p, hoveredPart, onHoverPart);

  return (
    <g>
      <path
        d="M 460 700 Q 450 580 480 480 Q 510 380 540 300 Q 560 240 600 200 Q 660 170 720 200 Q 760 240 770 300 L 800 320 L 800 800 L 460 800 Z"
        fill="url(#horseCoat)"
        opacity="0.55"
      />
      <g>
        <path
          d="M 250 360 C 230 320, 240 270, 280 230 C 320 190, 380 170, 430 175 C 480 178, 520 200, 540 240 C 555 280, 555 340, 540 400 C 525 460, 500 510, 470 540 C 440 565, 400 575, 360 565 C 320 555, 285 525, 265 480 C 250 440, 245 400, 250 360 Z"
          fill="url(#horseCoat)"
          stroke="#3a3025"
          strokeWidth="1.2"
        />
        <path d="M 290 250 Q 380 210 480 230 Q 510 270 500 350 Q 470 430 430 470" fill="none" stroke="url(#horseShine)" strokeWidth="40" opacity="0.6" />
        <ellipse cx="280" cy="500" rx="22" ry="14" fill="#2a2018" />
        <ellipse cx="278" cy="498" rx="10" ry="6" fill="#4a3a2c" />
        <path d="M 250 530 Q 280 545 320 535" stroke="#2a2018" strokeWidth="2" fill="none" />
        <ellipse cx="455" cy="285" rx="11" ry="14" fill="#1a1410" />
        <ellipse cx="453" cy="282" rx="3" ry="4" fill="#fff" opacity="0.6" />
        <path d="M 480 130 Q 495 95 510 110 L 500 175 Z" fill="url(#horseCoat)" stroke="#3a3025" strokeWidth="1" />
        <path d="M 540 135 Q 560 105 580 120 L 555 185 Z" fill="url(#horseCoat)" stroke="#3a3025" strokeWidth="1" />
        <path d="M 488 135 Q 500 115 504 165" fill="#5a4a38" opacity="0.6" />
        <path d="M 510 155 Q 540 165 580 180 Q 620 200 640 240 Q 650 290 640 350 Q 620 410 590 450" fill="#2a1f15" opacity="0.85" />

        {/* Têtière */}
        <g {...h("tetiere")}>
          {s.tetiere === 0 && (
            <path d="M 472 152 Q 530 140 590 175 Q 600 200 585 220 Q 540 230 500 215 Q 480 195 472 152 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.5" />
          )}
          {s.tetiere === 1 && (
            <path d="M 470 145 Q 530 130 595 175 Q 615 215 600 255 Q 575 270 540 250 Q 505 225 480 195 Q 470 170 470 145 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.5" />
          )}
          {s.tetiere === 2 && (
            <>
              <path d="M 466 138 Q 535 122 605 170 Q 625 215 605 260 Q 570 275 535 255 Q 500 230 478 200 Q 466 170 466 138 Z" fill="#efe9da" stroke="#bdb39b" strokeWidth="1" />
              <path d="M 472 148 Q 535 134 595 180 Q 612 215 595 250 Q 565 263 535 245 Q 502 222 482 195 Q 472 170 472 148 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />
            </>
          )}
        </g>

        {/* Frontal */}
        <g {...h("frontal")}>
          <path d="M 270 240 Q 360 215 460 230 Q 490 245 480 260 Q 380 250 280 268 Q 268 255 270 240 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.2" />
          {s.frontal === 0 && Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={285 + i * 14} cy={245 + i * 0.6} r="3" fill="#eae4d2" stroke="#bdb6a3" strokeWidth="0.5" />
          ))}
          {s.frontal === 1 && (
            <path d="M 275 248 Q 320 235 380 245 Q 440 256 478 251" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          )}
          {s.frontal === 2 && Array.from({ length: 16 }).map((_, i) => (
            <path key={i} d={`M ${272 + i * 13} 240 L ${280 + i * 13} 265`} stroke={edgeColor} strokeWidth="1.2" opacity="0.6" />
          ))}
        </g>

        <g>
          <rect x="468" y="270" width="14" height="180" rx="3" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />
        </g>

        {/* Muserolle */}
        <g {...h("muserole")}>
          {s.muserole === 0 && (
            <>
              <path d="M 240 425 Q 350 405 470 425 Q 500 445 480 470 Q 360 460 250 480 Q 230 460 240 425 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
              <path d="M 260 415 Q 360 392 460 410" stroke="url(#leather-hp)" strokeWidth="6" fill="none" />
              <path d="M 260 415 Q 360 392 460 410" stroke={stitch} strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
            </>
          )}
          {s.muserole === 1 && (
            <path d="M 240 415 Q 290 390 360 395 Q 430 400 480 425 Q 500 460 470 480 Q 380 470 290 480 Q 230 470 240 415 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
          )}
          {s.muserole === 2 && (
            <>
              <rect x="240" y="425" width="240" height="34" rx="5" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.2" />
              <rect x="350" y="418" width="30" height="48" rx="4" fill={edgeColor} opacity="0.4" />
            </>
          )}
          <path d="M 250 440 Q 360 418 470 440" stroke={stitch} strokeWidth="0.7" strokeDasharray="2.5 2.5" fill="none" />
          <path d="M 250 452 Q 360 432 470 452" stroke={stitch} strokeWidth="0.7" strokeDasharray="2.5 2.5" fill="none" />
        </g>

        <ellipse cx="265" cy="510" rx="20" ry="4" fill="#9aa0a6" />
        <line x1="245" y1="510" x2="285" y2="510" stroke="#6a7077" strokeWidth="1.5" />
      </g>
    </g>
  );
}

function ThreeQuarterView({ s, edgeColor, stitch, onHoverPart, hoveredPart }: ViewProps) {
  const h = (p: string) => makeHandlers(p, hoveredPart, onHoverPart);

  return (
    <g>
      <path
        d="M 320 240 C 280 230, 280 320, 290 410 C 295 480, 310 560, 360 620 C 410 670, 480 680, 540 650 C 600 615, 640 540, 650 460 C 660 380, 645 290, 600 240 C 555 200, 480 195, 420 210 C 380 220, 345 230, 320 240 Z"
        fill="url(#horseCoat)"
        stroke="#3a3025"
        strokeWidth="1.2"
      />
      <path d="M 380 280 Q 470 290 520 310 Q 510 420 470 510" stroke="url(#horseShine)" strokeWidth="60" fill="none" opacity="0.5" />
      <ellipse cx="370" cy="320" rx="9" ry="11" fill="#1a1410" />
      <ellipse cx="600" cy="310" rx="9" ry="11" fill="#1a1410" />
      <ellipse cx="425" cy="600" rx="22" ry="14" fill="#2a2018" />
      <ellipse cx="500" cy="605" rx="22" ry="14" fill="#2a2018" />
      <path d="M 340 200 Q 350 160 370 175 L 370 240 Z" fill="url(#horseCoat)" stroke="#3a3025" strokeWidth="1" />
      <path d="M 580 200 Q 600 160 615 175 L 600 240 Z" fill="url(#horseCoat)" stroke="#3a3025" strokeWidth="1" />
      <path d="M 600 240 Q 640 270 660 330 Q 670 400 660 470 Q 645 540 620 590" fill="#2a1f15" opacity="0.85" />

      <g {...h("tetiere")}>
        <path d="M 360 235 Q 470 215 590 235 Q 610 270 600 295 Q 480 310 365 295 Q 350 270 360 235 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.5" />
      </g>

      <g {...h("frontal")}>
        <path d="M 340 305 Q 480 290 615 305 Q 620 330 615 345 Q 480 330 340 345 Q 335 325 340 305 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
        {s.frontal === 0 && Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={360 + i * 22} cy={325} r="3.2" fill="#eae4d2" stroke="#bdb6a3" strokeWidth="0.5" />
        ))}
        {s.frontal === 1 && (
          <path d="M 350 322 Q 420 312 480 320 Q 540 328 605 320" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" fill="none" />
        )}
        {s.frontal === 2 && Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M ${350 + i * 19} 305 L ${356 + i * 19} 345`} stroke={edgeColor} strokeWidth="1.2" opacity="0.6" />
        ))}
      </g>

      <rect x="325" y="345" width="14" height="200" rx="3" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />
      <rect x="615" y="345" width="14" height="200" rx="3" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />

      <g {...h("muserole")}>
        {s.muserole === 0 && (
          <>
            <path d="M 320 510 Q 470 490 635 510 Q 650 545 625 565 Q 480 580 330 565 Q 305 545 320 510 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.4" />
            <path d="M 340 500 Q 470 480 615 500" stroke="url(#leather-hp)" strokeWidth="6" fill="none" />
          </>
        )}
        {s.muserole === 1 && (
          <path d="M 320 505 Q 380 480 470 482 Q 560 484 635 510 Q 655 555 620 575 Q 480 595 330 575 Q 300 555 320 505 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.4" />
        )}
        {s.muserole === 2 && (
          <>
            <rect x="320" y="510" width="320" height="50" rx="6" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
            <rect x="455" y="500" width="40" height="68" rx="5" fill={edgeColor} opacity="0.45" />
          </>
        )}
        <path d="M 340 530 Q 470 510 620 530" stroke={stitch} strokeWidth="0.8" strokeDasharray="2.5 2.5" fill="none" />
        <path d="M 340 545 Q 470 525 620 545" stroke={stitch} strokeWidth="0.8" strokeDasharray="2.5 2.5" fill="none" />
      </g>
    </g>
  );
}

function FaceView({ s, edgeColor, stitch, onHoverPart, hoveredPart }: ViewProps) {
  const h = (p: string) => makeHandlers(p, hoveredPart, onHoverPart);

  return (
    <g>
      <path
        d="M 320 220 C 290 240, 280 320, 295 420 C 310 520, 340 610, 400 660 C 460 690, 540 690, 600 660 C 660 610, 690 520, 705 420 C 720 320, 710 240, 680 220 C 640 200, 580 195, 500 195 C 420 195, 360 200, 320 220 Z"
        fill="url(#horseCoat)"
        stroke="#3a3025"
        strokeWidth="1.2"
      />
      <ellipse cx="395" cy="305" rx="11" ry="14" fill="#1a1410" />
      <ellipse cx="605" cy="305" rx="11" ry="14" fill="#1a1410" />
      <ellipse cx="455" cy="600" rx="22" ry="16" fill="#2a2018" />
      <ellipse cx="545" cy="600" rx="22" ry="16" fill="#2a2018" />
      <path d="M 460 645 Q 500 660 540 645" stroke="#2a2018" strokeWidth="2" fill="none" />

      <g {...h("tetiere")}>
        <path d="M 320 215 Q 500 195 680 215 Q 700 250 680 275 Q 500 290 320 275 Q 305 250 320 215 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.5" />
      </g>

      <g {...h("frontal")}>
        <path d="M 305 295 Q 500 280 695 295 Q 700 320 695 340 Q 500 325 305 340 Q 300 315 305 295 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
        {s.frontal === 0 && Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} cx={320 + i * 21} cy={317} r="3.4" fill="#eae4d2" stroke="#bdb6a3" strokeWidth="0.5" />
        ))}
        {s.frontal === 1 && (
          <path d="M 315 315 Q 410 305 500 312 Q 590 318 690 312" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" fill="none" />
        )}
        {s.frontal === 2 && Array.from({ length: 22 }).map((_, i) => (
          <path key={i} d={`M ${315 + i * 17} 295 L ${321 + i * 17} 340`} stroke={edgeColor} strokeWidth="1.2" opacity="0.6" />
        ))}
      </g>

      <rect x="290" y="340" width="14" height="220" rx="3" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />
      <rect x="696" y="340" width="14" height="220" rx="3" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1" />

      <g {...h("muserole")}>
        {s.muserole === 0 && (
          <ellipse cx="500" cy="540" rx="195" ry="34" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.4" />
        )}
        {s.muserole === 1 && (
          <path d="M 305 510 Q 400 490 500 488 Q 600 490 695 510 Q 715 555 670 580 Q 580 595 500 595 Q 420 595 330 580 Q 285 555 305 510 Z" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.4" />
        )}
        {s.muserole === 2 && (
          <>
            <rect x="305" y="510" width="390" height="55" rx="7" fill="url(#leather-hp)" stroke={edgeColor} strokeWidth="1.3" />
            <rect x="478" y="500" width="44" height="74" rx="5" fill={edgeColor} opacity="0.45" />
          </>
        )}
        <ellipse cx="500" cy="535" rx="180" ry="2" fill="none" stroke={stitch} strokeWidth="0.8" strokeDasharray="2.5 2.5" />
        <ellipse cx="500" cy="555" rx="180" ry="2" fill="none" stroke={stitch} strokeWidth="0.8" strokeDasharray="2.5 2.5" />
      </g>
    </g>
  );
}
