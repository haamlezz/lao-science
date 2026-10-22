import { useLang } from '../../i18n/LangContext'
import { RUN_SECONDS, maxDistance, sampleGraph } from '../../sims/motion'
import type { MotionParams } from '../../sims/motion'

const W = 320
const H = 200
const PAD = { l: 44, r: 12, t: 12, b: 36 }

/** Round the y-axis top up to a tidy value (10, 20, 50, 100, 200). */
function niceMax(v: number): number {
  for (const n of [10, 20, 50, 100, 200, 500]) if (v <= n) return n
  return Math.ceil(v / 100) * 100
}

/** Live distance-time graph: dashed = whole 10 s run, solid = up to now, dot = now. */
export function MotionGraph({ params, t }: { params: MotionParams; t: number }) {
  const { t: tr } = useLang()
  const yMax = niceMax(maxDistance(params))
  const px = (sec: number) => PAD.l + ((W - PAD.l - PAD.r) * sec) / RUN_SECONDS
  const py = (s: number) => H - PAD.b - ((H - PAD.t - PAD.b) * s) / yMax
  const path = (tEnd: number) =>
    sampleGraph(params, tEnd, 41)
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.t).toFixed(1)} ${py(p.s).toFixed(1)}`)
      .join(' ')
  const live = sampleGraph(params, t, 2)[1]
  const yTicks = [0, 0.5, 1].map((f) => f * yMax)

  return (
    <figure className="mo-graph">
      <figcaption>{tr('moGraphTitle')}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tr('moGraphTitle')}>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)} className="mo-grid" />
            <text x={PAD.l - 6} y={py(v) + 4} textAnchor="end" className="mo-tick">
              {v}
            </text>
          </g>
        ))}
        {[0, 5, 10].map((sec) => (
          <text key={sec} x={px(sec)} y={H - PAD.b + 16} textAnchor="middle" className="mo-tick">
            {sec}
          </text>
        ))}
        <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} className="mo-axis" />
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="mo-axis" />
        <text x={(PAD.l + W - PAD.r) / 2} y={H - 6} textAnchor="middle" className="mo-label">
          {tr('moAxisT')}
        </text>
        <text x={12} y={(PAD.t + H - PAD.b) / 2} textAnchor="middle" className="mo-label" transform={`rotate(-90 12 ${(PAD.t + H - PAD.b) / 2})`}>
          {tr('moAxisS')}
        </text>
        <path d={path(RUN_SECONDS)} className="mo-future" />
        <path d={path(t)} className="mo-live" />
        <circle cx={px(live.t)} cy={py(live.s)} r={5} className="mo-dot" />
      </svg>
      <p className="faint mo-graph-note">{tr('moGraphFuture')}</p>
    </figure>
  )
}
