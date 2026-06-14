"use client";

import { useId } from "react";

interface Point {
  label: string;
  value: number;
}

/** Responsive SVG bar chart with gridlines, gold gradient fill and axis labels. */
export function BarChart({
  data,
  height = 280,
  formatValue = (n) => String(n),
}: {
  data: Point[];
  height?: number;
  formatValue?: (n: number) => string;
}) {
  const id = useId();
  const w = 720;
  const padL = 56;
  const padB = 30;
  const padT = 16;
  const innerW = w - padL - 12;
  const innerH = height - padB - padT;
  const max = Math.max(...data.map((d) => d.value)) * 1.1 || 1;
  const barW = innerW / data.length;
  const ticks = 4;

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className="h-auto w-full"
      preserveAspectRatio="none"
      role="img"
    >
      <defs>
        <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8B872" />
          <stop offset="100%" stopColor="#B8924A" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* gridlines + y labels */}
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const y = padT + (innerH / ticks) * i;
        const v = max - (max / ticks) * i;
        return (
          <g key={i}>
            <line
              x1={padL}
              y1={y}
              x2={w - 12}
              y2={y}
              stroke="#1A1815"
              strokeOpacity={0.07}
            />
            <text
              x={padL - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-graphite/55 font-grotesk"
              fontSize="11"
            >
              {formatValue(Math.round(v))}
            </text>
          </g>
        );
      })}
      {/* bars */}
      {data.map((d, i) => {
        const bh = (d.value / max) * innerH;
        const x = padL + i * barW + barW * 0.22;
        const bw = barW * 0.56;
        const y = padT + innerH - bh;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={bh}
              rx={4}
              fill={`url(#bar-${id})`}
            >
              <animate
                attributeName="height"
                from="0"
                to={bh}
                dur="0.7s"
                fill="freeze"
              />
              <animate
                attributeName="y"
                from={padT + innerH}
                to={y}
                dur="0.7s"
                fill="freeze"
              />
            </rect>
            <text
              x={padL + i * barW + barW / 2}
              y={height - 10}
              textAnchor="middle"
              className="fill-graphite/65 font-grotesk"
              fontSize="11"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Responsive SVG line/area chart with gradient fill. */
export function LineChart({
  data,
  height = 280,
  formatValue = (n) => String(n),
}: {
  data: Point[];
  height?: number;
  formatValue?: (n: number) => string;
}) {
  const id = useId();
  const w = 720;
  const padL = 56;
  const padB = 30;
  const padT = 16;
  const innerW = w - padL - 16;
  const innerH = height - padB - padT;
  const max = Math.max(...data.map((d) => d.value)) * 1.12 || 1;
  const min = Math.min(...data.map((d) => d.value)) * 0.85;
  const range = max - min || 1;
  const stepX = innerW / (data.length - 1 || 1);

  const pts = data.map((d, i) => ({
    x: padL + i * stepX,
    y: padT + innerH - ((d.value - min) / range) * innerH,
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x} ${padT + innerH} L ${pts[0].x} ${padT + innerH} Z`;
  const ticks = 4;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-auto w-full" role="img">
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8B872" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#D8B872" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const y = padT + (innerH / ticks) * i;
        const v = max - (range / ticks) * i;
        return (
          <g key={i}>
            <line
              x1={padL}
              y1={y}
              x2={w - 16}
              y2={y}
              stroke="#1A1815"
              strokeOpacity={0.07}
            />
            <text
              x={padL - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-graphite/55 font-grotesk"
              fontSize="11"
            >
              {formatValue(Math.round(v))}
            </text>
          </g>
        );
      })}
      <path d={area} fill={`url(#area-${id})`} />
      <path
        d={line}
        fill="none"
        stroke="#B8924A"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#fff" stroke="#B8924A" strokeWidth={2} />
          <text
            x={p.x}
            y={height - 10}
            textAnchor="middle"
            className="fill-graphite/65 font-grotesk"
            fontSize="11"
          >
            {data[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tiny inline sparkline. */
export function Sparkline({
  values,
  width = 160,
  height = 44,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  const id = useId();
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1 || 1);
  const pts = values.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - min) / range) * (height - 6) - 3,
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8B872" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D8B872" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`} />
      <path d={line} fill="none" stroke="#B8924A" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
