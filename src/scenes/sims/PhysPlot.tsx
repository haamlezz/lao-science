import type { ReactNode } from 'react'

export interface PlotSeries {
  points: [number, number][]
  /** CSS class for the stroke: pg-line (live), pg-ghost (dashed, whole run), pg-aux. */
  cls: string
}

interface Props {
  title: string
  xLabel: string
  yLabel: string
  xDomain: [number, number]
  yDomain: [number, number]
  xTicks: number[]
  yTicks: number[]
  series: PlotSeries[]
  /** Filled polygon (e.g. area under v-t), in data coordinates. */
  area?: [number, number][]
  /** Straight segment (e.g. slope marker), in data coordinates. */
  segment?: [[number, number], [number, number]]
  /** Horizontal reference lines (e.g. peak and rms) with a short label. */
  hLines?: { y: number; label: string }[]
  dot?: [number, number]
  note?: ReactNode
  testId?: string
}

const W = 300
const H = 200
const PAD = { l: 56, r: 12, t: 12, b: 50 }

/** Small SVG line graph (axes, ticks, series, optional shaded area / slope segment / marker dot). */
export function PhysPlot({ title, xLabel, yLabel, xDomain, yDomain, xTicks, yTicks, series, area, segment, hLines, dot, note, testId }: Props) {
  const [x0, x1] = xDomain
  const [y0, y1] = yDomain
  const px = (x: number) => PAD.l + ((W - PAD.l - PAD.r) * (x - x0)) / (x1 - x0 || 1)
  const py = (y: number) => H - PAD.b - ((H - PAD.t - PAD.b) * (y - y0)) / (y1 - y0 || 1)
  const d = (pts: [number, number][]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}`).join(' ')
  const clipId = `pg-clip-${testId ?? title}`
  return (
    <figure className="pg" data-testid={testId}>
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        <defs>
          <clipPath id={clipId}>
            <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b} />
          </clipPath>
        </defs>
        {yTicks.map((v) => (
          <g key={`y${v}`}>
            <line x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)} className="pg-grid" />
            <text x={PAD.l - 5} y={py(v) + 5} textAnchor="end" className="pg-tick">
              {v}
            </text>
          </g>
        ))}
        {xTicks.map((v) => (
          <text key={`x${v}`} x={px(v)} y={H - PAD.b + 20} textAnchor="middle" className="pg-tick">
            {v}
          </text>
        ))}
        <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} className="pg-axis" />
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="pg-axis" />
        {y0 < 0 && y1 > 0 && <line x1={PAD.l} x2={W - PAD.r} y1={py(0)} y2={py(0)} className="pg-axis" />}
        <text x={(PAD.l + W - PAD.r) / 2} y={H - 6} textAnchor="middle" className="pg-label">
          {xLabel}
        </text>
        <text x={14} y={(PAD.t + H - PAD.b) / 2} textAnchor="middle" className="pg-label" transform={`rotate(-90 14 ${(PAD.t + H - PAD.b) / 2})`}>
          {yLabel}
        </text>
        <g clipPath={`url(#${clipId})`}>
          {area && area.length > 1 && <path d={`${d(area)} Z`} className="pg-area" />}
          {hLines?.map((h) => (
            <line key={h.label} x1={PAD.l} x2={W - PAD.r} y1={py(h.y)} y2={py(h.y)} className="pg-ref" />
          ))}
          {series.map((s, i) => (
            <path key={i} d={d(s.points)} className={s.cls} />
          ))}
          {segment && <path d={d(segment)} className="pg-seg" />}
        </g>
        {hLines?.map((h) => (
          <text key={`t${h.label}`} x={W - PAD.r - 2} y={py(h.y) - 4} textAnchor="end" className="pg-tick">
            {h.label}
          </text>
        ))}
        {dot && <circle cx={px(dot[0])} cy={py(dot[1])} r={6} className="pg-dot" />}
      </svg>
      {note && <p className="faint pg-note">{note}</p>}
    </figure>
  )
}
