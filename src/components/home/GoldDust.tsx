"use client";

/**
 * Pure-CSS ambient "gold dust" — a reliable, dependency-free replacement for
 * the WebGL particle field. Positions are deterministic (no Math.random during
 * render) so server and client markup match and hydration never mismatches.
 */

const MOTES = [
  { x: 8, y: 18, s: 3, d: 0, dur: 11, o: 0.5 },
  { x: 20, y: 72, s: 2, d: 1.4, dur: 14, o: 0.35 },
  { x: 33, y: 30, s: 4, d: 2.1, dur: 13, o: 0.55 },
  { x: 47, y: 60, s: 2, d: 0.6, dur: 16, o: 0.3 },
  { x: 58, y: 22, s: 3, d: 3.2, dur: 12, o: 0.45 },
  { x: 69, y: 78, s: 5, d: 1.1, dur: 15, o: 0.5 },
  { x: 78, y: 40, s: 2, d: 2.7, dur: 13, o: 0.4 },
  { x: 88, y: 64, s: 3, d: 0.3, dur: 17, o: 0.5 },
  { x: 92, y: 14, s: 2, d: 4.0, dur: 12, o: 0.3 },
  { x: 14, y: 50, s: 3, d: 2.4, dur: 14, o: 0.45 },
  { x: 40, y: 85, s: 4, d: 1.8, dur: 18, o: 0.4 },
  { x: 63, y: 52, s: 2, d: 3.6, dur: 13, o: 0.35 },
  { x: 26, y: 8, s: 3, d: 0.9, dur: 15, o: 0.5 },
  { x: 53, y: 90, s: 2, d: 2.2, dur: 16, o: 0.3 },
  { x: 83, y: 88, s: 3, d: 1.3, dur: 14, o: 0.45 },
  { x: 5, y: 88, s: 2, d: 3.9, dur: 17, o: 0.35 },
];

export function GoldDust({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold blur-[0.5px] motion-safe:animate-[drift_var(--dur)_ease-in-out_infinite]"
          style={
            {
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: m.s,
              height: m.s,
              opacity: m.o,
              animationDelay: `${m.d}s`,
              ["--dur" as string]: `${m.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
