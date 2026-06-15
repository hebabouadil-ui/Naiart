/**
 * Generates rich, painterly abstract-art SVGs for the gallery.
 * Each piece: canvas-grain base, layered atmospheric washes, gestural
 * palette-knife strokes, drifting gold leaf, and a soft vignette —
 * so the works read as real contemporary paintings, not flat blobs.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "art");

// ---- curated luxury palettes -------------------------------------------
const PALETTES = {
  amber: {
    ground: ["#2a1d10", "#3d2a16"],
    fields: ["#9a6b2f", "#c8923f", "#e6b667", "#7a4a20"],
    light: "#f5e2bd",
    gold: "#e8c074",
  },
  ivory: {
    ground: ["#efe7d7", "#e3d8c2"],
    fields: ["#d8c9aa", "#cabd9b", "#f3ecdc", "#bfae8c"],
    light: "#fbf6ec",
    gold: "#cbab6e",
  },
  gold: {
    ground: ["#3a2c12", "#5a4520"],
    fields: ["#b88a32", "#d8b048", "#eccd76", "#8a6526"],
    light: "#f7e7b5",
    gold: "#f0cf7e",
  },
  clay: {
    ground: ["#2e1d15", "#4a2e20"],
    fields: ["#8b5a3c", "#b3795024", "#a9694a", "#caa07f", "#6e3f29"],
    light: "#e9cbb0",
    gold: "#d9a877",
  },
  graphite: {
    ground: ["#1b1916", "#2a2723"],
    fields: ["#3c3833", "#55504733", "#6b6256", "#2f2b27"],
    light: "#cbbfa6",
    gold: "#bfa06a",
  },
  charcoal: {
    ground: ["#121010", "#1f1a16"],
    fields: ["#2c241d", "#3e3026", "#564028", "#1a1512"],
    light: "#d8b878",
    gold: "#e0bd76",
  },
  sand: {
    ground: ["#d9ccb0", "#cabd9f"],
    fields: ["#bca884", "#a8916b", "#e0d4ba", "#9c855f"],
    light: "#f1e8d4",
    gold: "#c8a86c",
  },
};

// id -> palette (matches dominantColor/colorName in data.ts)
const MAP = {
  "1549887534-1541e9326642": "amber",
  "1536924940846-227afb31e2a5": "ivory",
  "1490750967868-88aa4486c946": "gold",
  "1578321272176-b7bbc0679853": "clay",
  "1515405295579-ba7b45403062": "graphite",
  "1541961017774-22349e4a1262": "amber",
  "1500964757637-c85e8a162699": "gold",
  "1531913764164-f85c52e6e654": "charcoal",
  "1502691876148-a84978e59af8": "gold",
  "1470770841072-f978cf4d019e": "sand",
  "1505847119291-32d6f0a1f0a8": "graphite",
  "1513519245088-0e12902e35ca": "ivory",
  "1579783902614-a3fb3927b6a5": "amber",
  "1452860606245-08befc0ff44b": "clay",
  "1499781350541-7783f6c6a0c8": "sand",
  "1544717305-2782549b5136": "clay",
};

// deterministic PRNG from a string seed
function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function build(id, paletteName) {
  const p = PALETTES[paletteName];
  // strip stray alpha-suffixed hex (cleanup of palette typos)
  const fields = p.fields.map((c) => c.slice(0, 7));
  const r = rng(id);
  const W = 1000;
  const H = 1250;
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const rnd = (a, b) => a + r() * (b - a);

  // -- color-field bands: stacked soft-edged horizontal zones (Rothko-ish) --
  // gives each painting a confident atmospheric structure.
  let bands = "";
  const nBand = 3 + Math.floor(r() * 2);
  const edges = [0];
  for (let i = 1; i < nBand; i++) edges.push(r());
  edges.push(1);
  edges.sort((a, b) => a - b);
  const bandColors = [...fields].sort(() => r() - 0.5);
  for (let i = 0; i < edges.length - 1; i++) {
    const y0 = edges[i] * H;
    const y1 = edges[i + 1] * H;
    const c = bandColors[i % bandColors.length];
    bands += `<rect x="-40" y="${(y0 - 30).toFixed(0)}" width="${W + 80}" height="${(
      y1 - y0 + 60
    ).toFixed(0)}" fill="${c}" opacity="${rnd(0.5, 0.78).toFixed(
      2,
    )}" filter="url(#soft)"/>`;
  }

  // -- atmospheric pools: a few large luminous glows for depth --
  let pools = "";
  const nPool = 3 + Math.floor(r() * 2);
  for (let i = 0; i < nPool; i++) {
    const cx = rnd(0.1, 0.9) * W;
    const cy = rnd(0.1, 0.9) * H;
    const rad = rnd(0.3, 0.55) * W;
    const c = r() > 0.6 ? p.light : pick(fields);
    pools += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(
      0,
    )}" fill="${c}" opacity="${rnd(0.14, 0.32).toFixed(2)}" filter="url(#soft)"/>`;
  }

  // -- sweeping brush gestures with impasto depth --
  // each stroke is drawn as shadow + body + highlight for a 3D paint feel.
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let R = (n >> 16) & 255,
      G = (n >> 8) & 255,
      B = n & 255;
    R = Math.max(0, Math.min(255, Math.round(R + amt)));
    G = Math.max(0, Math.min(255, Math.round(G + amt)));
    B = Math.max(0, Math.min(255, Math.round(B + amt)));
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  }
  function brushPath(x0, y0) {
    const sy = y0;
    const x1 = rnd(0.7, 1.15) * W;
    const y1 = sy + rnd(-0.16, 0.16) * H;
    const cx1 = rnd(0.25, 0.45) * W;
    const cy1 = sy + rnd(-0.1, 0.1) * H;
    const cx2 = rnd(0.55, 0.78) * W;
    const cy2 = y1 + rnd(-0.1, 0.1) * H;
    return `M ${x0.toFixed(0)} ${sy.toFixed(0)} C ${cx1.toFixed(0)} ${cy1.toFixed(
      0,
    )}, ${cx2.toFixed(0)} ${cy2.toFixed(0)}, ${x1.toFixed(0)} ${y1.toFixed(0)}`;
  }
  function impasto(color, baseW, op, x0, y0) {
    const d = brushPath(x0, y0);
    const body = `<path d="${d}" stroke="${color}" stroke-width="${baseW.toFixed(
      0,
    )}" stroke-linecap="round" fill="none" opacity="${op.toFixed(
      2,
    )}" filter="url(#rough)"/>`;
    // shadow just below, highlight just above — offset by a few px
    const sh = `<path d="${d}" stroke="${shade(color, -34)}" stroke-width="${(
      baseW * 0.5
    ).toFixed(0)}" stroke-linecap="round" fill="none" opacity="${(op * 0.6).toFixed(
      2,
    )}" transform="translate(0 ${(baseW * 0.32).toFixed(
      1,
    )})" filter="url(#rough)"/>`;
    const hi = `<path d="${d}" stroke="${shade(color, 46)}" stroke-width="${(
      baseW * 0.34
    ).toFixed(0)}" stroke-linecap="round" fill="none" opacity="${(op * 0.7).toFixed(
      2,
    )}" transform="translate(0 ${(-baseW * 0.3).toFixed(
      1,
    )})" filter="url(#rough)"/>`;
    return sh + body + hi;
  }
  // single thin stroke (for gold leaf / fine marks)
  function stroke(color, baseW, op, x0, y0) {
    const d = brushPath(
      x0 ?? rnd(-0.1, 0.3) * W,
      y0 ?? rnd(0.05, 0.95) * H,
    );
    return `<path d="${d}" stroke="${color}" stroke-width="${baseW.toFixed(
      0,
    )}" stroke-linecap="round" fill="none" opacity="${op.toFixed(
      2,
    )}" filter="url(#rough)"/>`;
  }

  let gestures = "";
  // stack many overlapping strokes across the canvas for a worked surface
  const nG = 9 + Math.floor(r() * 5);
  for (let i = 0; i < nG; i++) {
    const x0 = rnd(-0.15, 0.35) * W;
    const y0 = (i / nG) * H + rnd(-0.06, 0.06) * H;
    gestures += impasto(pick(fields), rnd(20, 60), rnd(0.45, 0.8), x0, y0);
  }
  // a few luminous highlight sweeps
  for (let i = 0; i < 3; i++) {
    gestures += impasto(
      p.light,
      rnd(8, 20),
      rnd(0.35, 0.6),
      rnd(-0.1, 0.3) * W,
      rnd(0.1, 0.9) * H,
    );
  }

  // -- gold leaf: one defining horizon gesture + drifting flecks --
  let gold = "";
  const gy = rnd(0.35, 0.7) * H;
  gold += stroke(p.gold, rnd(5, 10), 0.85, -0.05 * W, gy);
  const nFleck = 16 + Math.floor(r() * 14);
  for (let i = 0; i < nFleck; i++) {
    const cx = rnd(0, 1) * W;
    const cy = rnd(0, 1) * H;
    const s = rnd(1.5, 7);
    gold += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${s.toFixed(
      1,
    )}" fill="${p.gold}" opacity="${rnd(0.25, 0.75).toFixed(2)}"/>`;
  }

  const seed = (r() * 100).toFixed(2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="${p.ground[0]}"/>
      <stop offset="100%" stop-color="${p.ground[1]}"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="rough" x="-25%" y="-25%" width="150%" height="150%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves="3" seed="${seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="canvas">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"/>
    </filter>
    <radialGradient id="vig" cx="50%" cy="40%" r="78%">
      <stop offset="52%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.38"/>
    </radialGradient>
    <linearGradient id="topGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.light}" stop-opacity="0.14"/>
      <stop offset="42%" stop-color="${p.light}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  <g>${bands}</g>
  <g>${pools}</g>
  <g>${gestures}</g>
  ${gold}
  <rect width="${W}" height="${H}" fill="url(#topGlow)"/>
  <rect width="${W}" height="${H}" filter="url(#canvas)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

let n = 0;
for (const [id, pal] of Object.entries(MAP)) {
  fs.writeFileSync(path.join(OUT, `${id}.svg`), build(id, pal));
  n++;
}
console.log(`Generated ${n} painterly artworks → ${OUT}`);
