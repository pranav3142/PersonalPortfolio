import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from '../hooks';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

/**
 * LoadingScreen — a pixel-art mountain night scene.
 *
 * The whole scene is drawn in SVG where 1 viewBox unit = 1 "pixel" cell,
 * scaled up with crisp edges so it reads as blocky pixel art. Mountains are
 * built as stepped pyramids, with white snow caps, twinkling stars and a
 * pixel moon. A progress bar fills over DURATION, then the overlay fades out
 * and unmounts. Honors prefers-reduced-motion (near-instant, no twinkle).
 */

const COLS = 48;
const ROWS = 27;

// Monochrome-friendly palette that pops on the dark sky.
const SNOW = '#f8fafc';
const ROCK_FRONT = '#64748b';
const ROCK_BACK = '#3b4759';
const ROCK_SIDE = '#2a3344';

interface Cell {
  x: number;
  y: number;
  w: number;
  fill: string;
}

// Build a filled, stair-stepped mountain (1-cell-tall rows widening downward).
function steppedMountain(
  cx: number,
  peakRow: number,
  baseRow: number,
  widthPerRow: number,
  rock: string,
  snowRows = 0
): Cell[] {
  const cells: Cell[] = [];
  for (let r = peakRow; r <= baseRow; r++) {
    const half = Math.round((r - peakRow) * widthPerRow);
    cells.push({
      x: cx - half,
      y: r,
      w: half * 2 + 1,
      fill: r - peakRow < snowRows ? SNOW : rock,
    });
  }
  return cells;
}

const STARS: [number, number][] = [
  [3, 2], [7, 4], [12, 1], [16, 5], [20, 3], [31, 3],
  [35, 1], [9, 8], [44, 9], [5, 11], [22, 7], [29, 9],
];

// 3x3 pixel moon (top-right).
const MOON: [number, number][] = [
  [41, 2], [42, 2], [43, 2],
  [41, 3], [42, 3], [43, 3],
  [41, 4], [42, 4], [43, 4],
];

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const DURATION = prefersReducedMotion ? 350 : 1700;

  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  const mountains = useMemo(
    () => [
      ...steppedMountain(11, 13, ROWS, 0.85, ROCK_BACK),
      ...steppedMountain(38, 14, ROWS, 0.9, ROCK_SIDE),
      ...steppedMountain(26, 6, ROWS, 0.8, ROCK_FRONT, 3),
    ],
    []
  );

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setExiting(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [DURATION]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background:
          'linear-gradient(180deg, #0b1020 0%, #131a2e 55%, #1c2438 100%)',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (exiting) onLoadingComplete();
      }}
      role="status"
      aria-label="Loading portfolio"
    >
      <style>{`
        @keyframes ls-twinkle { 0%,100% { opacity: .3 } 50% { opacity: 1 } }
        .ls-star { animation: ls-twinkle 2.2s ease-in-out infinite; }
      `}</style>

      <div className="w-72 sm:w-96 px-2">
        <svg
          viewBox={`0 0 ${COLS} ${ROWS}`}
          className="w-full h-auto"
          shapeRendering="crispEdges"
          style={{ imageRendering: 'pixelated' }}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Stars */}
          {STARS.map(([x, y], i) => (
            <rect
              key={`s${i}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={SNOW}
              className={prefersReducedMotion ? undefined : 'ls-star'}
              style={prefersReducedMotion ? undefined : { animationDelay: `${(i % 5) * 0.4}s` }}
            />
          ))}

          {/* Moon */}
          {MOON.map(([x, y], i) => (
            <rect key={`m${i}`} x={x} y={y} width={1} height={1} fill={SNOW} />
          ))}

          {/* Mountains */}
          {mountains.map((c, i) => (
            <rect key={`c${i}`} x={c.x} y={c.y} width={c.w} height={1} fill={c.fill} />
          ))}
        </svg>

        {/* Pixel progress bar */}
        <div className="mt-6 h-3 w-full border-2 border-white/25 bg-white/5 p-0.5">
          <div className="h-full bg-white/90" style={{ width: `${pct}%` }} />
        </div>

        <p className="mt-3 text-center font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase">
          Loading {pct}%
        </p>
      </div>
    </motion.div>
  );
}
