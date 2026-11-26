/* Statistik Nusantara — hand-rolled SVG charts.
   No library, no network: every chart is a string of SVG built from data. */

const CHART = {
  ink: "#1d2b2a",
  muted: "#6b7a76",
  teal: "#0e6b5c",
  tealLight: "#3aa08c",
  amber: "#d98e1f",
  amberLight: "#eec27a",
  grid: "#e3ddd0",
  red: "#b04a2f"
};

/* Escape text that goes into an SVG label. */
function svgText(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* Format a number with one decimal, trimming ".0". */
function fmt1(n) {
  return (Math.round(n * 10) / 10).toString();
}

/* Vertical bar chart. points: [{label, value}]. value is shown on top. */
function barChart(points, opts) {
  const o = Object.assign({ width: 640, height: 300, unit: "", min: null,
    color: CHART.teal, highlightLast: false }, opts || {});
  const padL = 44, padR = 10, padT = 26, padB = 34;
  const w = o.width, h = o.height;
  const iw = w - padL - padR, ih = h - padT - padB;
  let lo = o.min !== null ? o.min : Math.min(0, ...points.map(p => p.value));
  let hi = Math.max(...points.map(p => p.value));
  if (hi === lo) hi = lo + 1;
  const y = v => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const bw = iw / points.length;
  const barW = Math.min(46, bw * 0.62);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" ` +
    `class="chart-svg">`;
  /* gridlines at 0, mid, max */
  [lo, (lo + hi) / 2, hi].forEach(g => {
    s += `<line x1="${padL}" y1="${y(g)}" x2="${w - padR}" y2="${y(g)}" ` +
      `stroke="${CHART.grid}" stroke-width="1"/>` +
      `<text x="${padL - 6}" y="${y(g) + 4}" text-anchor="end" ` +
      `font-size="11" fill="${CHART.muted}">${fmt1(g)}${o.unit}</text>`;
  });
  points.forEach((p, i) => {
    const x = padL + i * bw + (bw - barW) / 2;
    const top = y(Math.max(p.value, lo));
    const fill = (o.highlightLast && i === points.length - 1) ? CHART.amber : o.color;
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" ` +
      `height="${(y(lo) - top).toFixed(1)}" rx="3" fill="${fill}"/>` +
      `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" ` +
      `text-anchor="middle" font-size="12" font-weight="700" fill="${CHART.ink}">` +
      `${fmt1(p.value)}${o.unit}</text>` +
      `<text x="${(x + barW / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" ` +
      `font-size="11" fill="${CHART.muted}">${svgText(p.label)}</text>`;
  });
  s += "</svg>";
  return s;
}

/* Line chart. points: [{label, value}]. */
function lineChart(points, opts) {
  const o = Object.assign({ width: 640, height: 300, unit: "", color: CHART.teal,
    fill: true }, opts || {});
  const padL = 44, padR = 16, padT = 26, padB = 34;
  const w = o.width, h = o.height;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = points.map(p => p.value);
  let lo = Math.min(0, ...vals), hi = Math.max(...vals);
  if (hi - lo < 1) { hi += 0.5; lo -= 0.5; }
  const x = i => padL + (i / (points.length - 1)) * iw;
  const y = v => padT + ih - ((v - lo) / (hi - lo)) * ih;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" ` +
    `class="chart-svg">`;
  [lo, (lo + hi) / 2, hi].forEach(g => {
    s += `<line x1="${padL}" y1="${y(g)}" x2="${w - padR}" y2="${y(g)}" ` +
      `stroke="${CHART.grid}" stroke-width="1"/>` +
      `<text x="${padL - 6}" y="${y(g) + 4}" text-anchor="end" ` +
      `font-size="11" fill="${CHART.muted}">${fmt1(g)}${o.unit}</text>`;
  });
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  if (o.fill) {
    s += `<path d="${line} L${x(points.length - 1).toFixed(1)},${y(lo).toFixed(1)} ` +
      `L${x(0).toFixed(1)},${y(lo).toFixed(1)} Z" fill="${o.color}" fill-opacity="0.10"/>`;
  }
  s += `<path d="${line}" fill="none" stroke="${o.color}" stroke-width="2.5" ` +
    `stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    /* Keep value labels inside the plot: drop them below the point when
       the point sits near the top, and anchor edge points inward. */
    let labelY = y(p.value) - 10;
    if (labelY < 12) labelY = y(p.value) + 20;
    const anchor = i === 0 ? "start" : (i === points.length - 1 ? "end" : "middle");
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4" ` +
      `fill="#fff" stroke="${o.color}" stroke-width="2.5"/>` +
      `<text x="${x(i).toFixed(1)}" y="${labelY.toFixed(1)}" ` +
      `text-anchor="${anchor}" font-size="12" font-weight="700" fill="${CHART.ink}">` +
      `${fmt1(p.value)}${o.unit}</text>` +
      `<text x="${x(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" ` +
      `font-size="11" fill="${CHART.muted}">${svgText(p.label)}</text>`;
  });
  s += "</svg>";
  return s;
}

/* Horizontal bar list, best for ranked categories. parts: [{label, value}]. */
function hbarChart(parts, opts) {
  const o = Object.assign({ unit: "%", color: CHART.teal }, opts || {});
  const max = Math.max(...parts.map(p => p.value));
  let rows = "";
  parts.forEach((p, i) => {
    const pct = (p.value / max) * 100;
    const fill = i === 0 ? CHART.amber : o.color;
    rows += `<div class="hbar-row"><span class="hbar-label">${svgText(p.label)}</span>` +
      `<span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%;` +
      `background:${fill}"></span></span>` +
      `<span class="hbar-value">${fmt1(p.value)}${o.unit}</span></div>`;
  });
  return `<div class="hbar-chart">${rows}</div>`;
}

/* Donut chart with a centre label. parts: [{label, value, color}]. */
function donutChart(parts, centerLabel, centerValue) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const cx = 110, cy = 110, r = 84, thick = 30;
  const circ = 2 * Math.PI * r;
  let off = 0, rings = "";
  parts.forEach(p => {
    const frac = p.value / total;
    const len = Math.max(frac * circ - 2, 0.5);
    rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" ` +
      `stroke="${p.color || CHART.teal}" stroke-width="${thick}" ` +
      `stroke-dasharray="${len.toFixed(1)} ${(circ - len).toFixed(1)}" ` +
      `stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += frac * circ;
  });
  let legend = "";
  parts.forEach(p => {
    legend += `<li><span class="dot" style="background:${p.color || CHART.teal}"></span>` +
      `${svgText(p.label)} — <strong>${fmt1(p.value)}%</strong></li>`;
  });
  return `<div class="donut-wrap"><svg viewBox="0 0 220 220" role="img" ` +
    `aria-label="Donut chart" class="donut-svg">` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CHART.grid}" ` +
    `stroke-width="${thick}"/>${rings}` +
    `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" ` +
    `font-weight="700" fill="${CHART.ink}">${svgText(centerValue)}</text>` +
    `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" ` +
    `fill="${CHART.muted}">${svgText(centerLabel)}</text></svg>` +
    `<ul class="donut-legend">${legend}</ul></div>`;
}
