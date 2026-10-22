import { useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import { E_TOTAL, END_C, POWER_RANGE_KW, START_C, curveCorners, runSeconds, snapshotAt } from '../../sims/states'
import type { CurvePoint, Direction, StateLabel } from '../../sims/states'
import { STATE_COLORS, StatesScene } from './StatesScene'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type Speed = 1 | 10 | 50

interface StatesSimState {
  direction: Direction
  power: number // kW
  speed: Speed
  t: number // simulated seconds
  playing: boolean
}

const STATE_KEYS: Record<StateLabel, UiKey> = {
  ice: 'stIce',
  'ice+water': 'stIceWater',
  water: 'stWater',
  'water+steam': 'stWaterSteam',
  steam: 'stSteam',
}

function StatesControls({ state, set }: { state: StatesSimState; set: (p: Partial<StatesSimState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  const total = runSeconds(state.power)

  useTicker(state.playing, (dt) => {
    const s = ref.current
    const next = Math.min(s.t + dt * s.speed, runSeconds(s.power))
    ref.current = { ...s, t: next }
    set(next >= runSeconds(s.power) ? { t: next, playing: false } : { t: next })
  })

  // power / direction change restarts the run so the curve and the particles always agree
  const restart = (patch: Partial<StatesSimState>) => set({ ...patch, t: 0, playing: false })
  const done = state.t >= total

  return (
    <>
      <div className="ctl-row">
        <Seg<Direction>
          label={t('stDirection')}
          value={state.direction}
          onChange={(direction) => restart({ direction })}
          options={[
            { value: 'heating', label: t('stHeating') },
            { value: 'cooling', label: t('stCooling') },
          ]}
        />
        <Seg<Speed>
          label={t('stSpeed')}
          value={state.speed}
          onChange={(speed) => set({ speed })}
          options={[
            { value: 1, label: '×1' },
            { value: 10, label: '×10' },
            { value: 50, label: '×50' },
          ]}
        />
      </div>
      <div className="m2-grid">
        <Slider
          label={t('stPower')}
          value={state.power}
          min={POWER_RANGE_KW.min}
          max={POWER_RANGE_KW.max}
          step={POWER_RANGE_KW.step}
          display={`${state.power} kW`}
          onChange={(power) => restart({ power })}
        />
      </div>
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (state.playing ? set({ playing: false }) : set({ playing: true, ...(done ? { t: 0 } : {}) }))}
        >
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ t: 0, playing: false })}>
          ↺ {t('moRestart')}
        </button>
      </div>
    </>
  )
}

const GW = 340
const GH = 210
const GP = { l: 44, r: 12, t: 12, b: 34 }
const Y_MIN = START_C - 5
const Y_MAX = END_C + 10

function fullCurve(power: number, direction: Direction): CurvePoint[] {
  const heat = curveCorners(power)
  if (direction === 'heating') return heat
  const run = runSeconds(power)
  return heat.map((c) => ({ t: run - c.t, temp: c.temp })).reverse()
}

function StatesGraph({ s }: { s: StatesSimState }) {
  const { t: tr } = useLang()
  const run = runSeconds(s.power)
  const curve = fullCurve(s.power, s.direction)
  const snap = snapshotAt(s.power, s.t, s.direction)
  const px = (x: number) => GP.l + ((GW - GP.l - GP.r) * x) / run
  const py = (y: number) => GH - GP.b - ((GH - GP.t - GP.b) * (y - Y_MIN)) / (Y_MAX - Y_MIN)
  const d = (pts: { t: number; temp: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.t).toFixed(1)} ${py(p.temp).toFixed(1)}`).join(' ')
  const live = [...curve.filter((c) => c.t < s.t), { t: s.t, temp: snap.temp }]
  return (
    <figure className="mo-graph">
      <figcaption>{tr('stGraphTitle')}</figcaption>
      <svg viewBox={`0 0 ${GW} ${GH}`} role="img" aria-label={tr('stGraphTitle')}>
        {[0, 100].map((v) => (
          <g key={v}>
            <line x1={GP.l} x2={GW - GP.r} y1={py(v)} y2={py(v)} className="mo-grid" />
            <text x={GP.l - 6} y={py(v) + 4} textAnchor="end" className="mo-tick">
              {v}
            </text>
          </g>
        ))}
        {[0, 0.5, 1].map((f) => (
          <text key={f} x={px(f * run)} y={GH - GP.b + 16} textAnchor="middle" className="mo-tick">
            {Math.round(f * run)}
          </text>
        ))}
        <line x1={GP.l} x2={GP.l} y1={GP.t} y2={GH - GP.b} className="mo-axis" />
        <line x1={GP.l} x2={GW - GP.r} y1={py(Y_MIN)} y2={py(Y_MIN)} className="mo-axis" />
        <text x={(GP.l + GW - GP.r) / 2} y={GH - 6} textAnchor="middle" className="mo-label">
          {tr('stAxisT')}
        </text>
        <text x={12} y={(GP.t + GH - GP.b) / 2} textAnchor="middle" className="mo-label" transform={`rotate(-90 12 ${(GP.t + GH - GP.b) / 2})`}>
          °C
        </text>
        <path d={d(curve)} className="mo-future" />
        <path d={d(live)} className="mo-live" />
        <circle cx={px(s.t)} cy={py(snap.temp)} r={5} className="mo-dot" />
      </svg>
      <p className="faint mo-graph-note">{tr('stPlateau')}</p>
    </figure>
  )
}

function StatesReadout({ s, t }: { s: StatesSimState; t: (k: UiKey) => string }) {
  const snap = snapshotAt(s.power, s.t, s.direction)
  const corners = fullCurve(s.power, s.direction).slice(1)
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="off">
        <strong>
          {t('stState')}: <span data-testid="st-state">{t(STATE_KEYS[snap.state])}</span>
        </strong>
        <span>
          {t('stTemp')} = <b data-testid="st-temp">{snap.temp.toFixed(1)} °C</b>
        </span>
        <span>
          {t('stTime')} = <b data-testid="st-time">{Math.round(s.t)} s</b> · {t('stEnergy')} ={' '}
          <b data-testid="st-energy">{Math.round(s.direction === 'heating' ? snap.energy : E_TOTAL - snap.energy)} kJ</b>
        </span>
        <span>
          {t('stCorners')}: <b data-testid="st-corners">{corners.map((c) => Math.round(c.t)).join(' · ')}</b>
        </span>
        {snap.done && <span className="faint">{t('stDone')}</span>}
        <span className="faint">{t('stSpeedNote')}</span>
        <span className="st-ideal">{t('stIdeal')}</span>
      </div>
      <StatesGraph s={s} />
    </div>
  )
}

const def: SimDef<StatesSimState> = {
  initial: { direction: 'heating', power: 1, speed: 10, t: 0, playing: false },
  camera: { camZ: 11, zoom2D: 36 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const snap = snapshotAt(s.power, s.t, s.direction)
    return <StatesScene mix={snap.mix} direction={s.direction} powerKw={s.power} active={s.playing} />
  },
  Controls: StatesControls,
  legend: (_s, t) => [
    { color: STATE_COLORS.solid, label: t('stLegendSolid') },
    { color: STATE_COLORS.liquid, label: t('stLegendLiquid') },
    { color: STATE_COLORS.gas, label: t('stLegendGas') },
  ],
  readout: (s, t) => <StatesReadout s={s} t={t} />,
}

export default makeSimHost(def)
