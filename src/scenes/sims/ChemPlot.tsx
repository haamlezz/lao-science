import type { ReactNode } from 'react'

// Small SVG line plot shared by the chemistry sims. Class names reuse the motion graph (mo-*) so presentation
// mode sizes the text (>= 28 px computed). viewBox is close to the displayed width so 1 unit is about 1 px.

export interface PlotLine {
  pts: [number, number][]
  cls?: string // 'mo-live' | 'mo-future' | 'upc-line2'
}

interface Props {
  title: string
  ariaLabel?: string
  xLabel: string
  yLabel: string
  x: [number, number]
  y: [number, number]
  xTicks: number[]
  yTicks: number[]
  fmtX?: (v: number) => string
  fmtY?: (v: number) => string
  lines: PlotLine[]
  dots?: { x: number; y: number; cls?: string }[]
  vlines?: { x: number; cls?: string }[]
  hlines?: { y: number; cls?: string }[]
  bands?: { y0: number; y1: number; fill: string }[]
  /** Extra SVG drawn in plot coordinates after the lines. */
  extra?: (px: (v: number) => number, py: (v: number) => number) => ReactNode
  note?: string
  testId?: string
}

const W = 640
const H = 300
const P = { l: 74, r: 16, t: 12, b: 62 }

export function ChemPlot({
  title, ariaLabel, xLabel, yLabel, x, y, xTicks, yTicks, fmtX = String, fmtY = String, lines, dots = [], vlines = [], hlines = [], bands = [], extra, note, testId,
}: Props) {
  const px = (v: number) => P.l + ((W - P.l - P.r) * (v - x[0])) / (x[1] - x[0])
  const py = (v: number) => H - P.b - ((H - P.t - P.b) * (v - y[0])) / (y[1] - y[0])
  const clampY = (v: number) => Math.min(Math.max(v, y[0]), y[1])
  const d = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p[0]).toFixed(1)} ${py(clampY(p[1])).toFixed(1)}`).join(' ')
  return (
    <figure className="mo-graph upc-graph" data-testid={testId}>
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel ?? title}>
        {bands.map((b, i) => (
          <rect key={i} x={P.l} width={W - P.l - P.r} y={py(b.y1)} height={Math.max(py(b.y0) - py(b.y1), 0)} fill={b.fill} opacity={0.35} />
        ))}
        {yTicks.map((v) => (
          <g key={`y${v}`}>
            <line x1={P.l} x2={W - P.r} y1={py(v)} y2={py(v)} className="mo-grid" />
            <text x={P.l - 8} y={py(v) + 5} textAnchor="end" className="mo-tick">
              {fmtY(v)}
            </text>
          </g>
        ))}
        {xTicks.map((v) => (
          <text key={`x${v}`} x={px(v)} y={H - P.b + 24} textAnchor="middle" className="mo-tick">
            {fmtX(v)}
          </text>
        ))}
        <line x1={P.l} x2={P.l} y1={P.t} y2={H - P.b} className="mo-axis" />
        <line x1={P.l} x2={W - P.r} y1={H - P.b} y2={H - P.b} className="mo-axis" />
        <text x={(P.l + W - P.r) / 2} y={H - 8} textAnchor="middle" className="mo-label">
          {xLabel}
        </text>
        <text x={14} y={(P.t + H - P.b) / 2} textAnchor="middle" className="mo-label" transform={`rotate(-90 14 ${(P.t + H - P.b) / 2})`}>
          {yLabel}
        </text>
        {vlines.map((v, i) => (
          <line key={`v${i}`} x1={px(v.x)} x2={px(v.x)} y1={P.t} y2={H - P.b} className={v.cls ?? 'upc-ref'} />
        ))}
        {hlines.map((v, i) => (
          <line key={`h${i}`} x1={P.l} x2={W - P.r} y1={py(v.y)} y2={py(v.y)} className={v.cls ?? 'upc-ref'} />
        ))}
        {lines.map((l, i) => (
          <path key={i} d={d(l.pts)} className={l.cls ?? 'mo-live'} />
        ))}
        {extra?.(px, py)}
        {dots.map((p, i) => (
          <circle key={i} cx={px(p.x)} cy={py(clampY(p.y))} r={6} className={p.cls ?? 'mo-dot'} />
        ))}
      </svg>
      {note && <p className="faint mo-graph-note">{note}</p>}
    </figure>
  )
}
