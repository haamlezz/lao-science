import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  AREA_RANGE,
  INITIAL,
  K_RANGE,
  N0_RANGE,
  R_RANGE,
  TIME_MAX,
  density,
  dotsFor,
  exponential,
  growthRate,
  inflectionSize,
  logistic,
  maxGrowthRate,
  timeToReachLogistic,
} from '../../sims/population'
import { POP_COLORS, PopulationScene } from './PopulationScene'
import type { PopModel } from './PopulationScene'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface PopState {
  model: PopModel
  n0: number
  r: number
  k: number
  area: number
  t: number
  playing: boolean
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const supNum = (n: number) => String(n).split('').map((c) => (c === '-' ? '⁻' : SUP[Number(c)])).join('')
/** Large values as a × 10ⁿ (not JavaScript's "4.85e+9"). */
const f1 = (v: number) => {
  if (v < 1e6) return v.toFixed(1)
  const e = Math.floor(Math.log10(v))
  return `${(v / 10 ** e).toFixed(2)}×10${supNum(e)}`
}

function PopControls({ state, set }: { state: PopState; set: (p: Partial<PopState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing, (dt) => {
    const next = Math.min(TIME_MAX, ref.current.t + dt)
    ref.current = { ...ref.current, t: next }
    set({ t: next, playing: next < TIME_MAX })
  })
  const autoRepeat = useAutoRepeat(state.t >= TIME_MAX, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => set(state.t >= TIME_MAX ? { t: 0, playing: true } : { playing: !state.playing })}
        >
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ t: 0, playing: false })}>
          ↺ {t('moRestart')}
        </button>
      </div>
      <div className="m2-grid">
        <Slider
          label={t('ppTime')}
          value={state.t}
          min={0}
          max={TIME_MAX}
          step={0.5}
          display={f1(state.t)}
          onChange={(tt) => set({ t: tt, playing: false })}
        />
        <div className="m2-slider">
          <span>{t('ppModel')}</span>
          <Seg<PopModel>
            label={t('ppModel')}
            value={state.model}
            onChange={(model) => set({ model })}
            options={[
              { value: 'exponential', label: t('ppExp') },
              { value: 'logistic', label: t('ppLog') },
              { value: 'both', label: t('ppBoth') },
            ]}
          />
        </div>
      </div>
      <div className="m2-grid">
        <Slider label={t('ppN0')} value={state.n0} min={N0_RANGE.min} max={N0_RANGE.max} step={N0_RANGE.step} onChange={(n0) => set({ n0 })} />
        <Slider
          label={t('ppR')}
          value={state.r}
          min={R_RANGE.min}
          max={R_RANGE.max}
          step={R_RANGE.step}
          display={state.r.toFixed(1)}
          onChange={(r) => set({ r })}
        />
        <Slider label={t('ppK')} value={state.k} min={K_RANGE.min} max={K_RANGE.max} step={K_RANGE.step} onChange={(k) => set({ k })} />
        <Slider
          label={t('ppArea')}
          value={state.area}
          min={AREA_RANGE.min}
          max={AREA_RANGE.max}
          step={AREA_RANGE.step}
          onChange={(area) => set({ area })}
        />
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

function PopReadout({ state, t }: { state: PopState; t: (k: UiKey) => string }) {
  const { n0, r, k, t: time } = state
  const nExp = exponential(n0, r, time)
  const nLog = logistic(n0, r, k, time)
  const shown = state.model === 'exponential' ? nExp : nLog
  const { each } = dotsFor(shown)
  const tHalf = timeToReachLogistic(n0, r, k, inflectionSize(k))
  const wantExp = state.model !== 'logistic'
  const wantLog = state.model !== 'exponential'
  return (
    <div className="m2-result pp-readout" aria-live="polite">
      {wantExp && (
        <span>
          {t('ppNExp')} = <b data-testid="pp-exp">{f1(nExp)}</b>
        </span>
      )}
      {wantLog && (
        <span>
          {t('ppNLog')} = <b data-testid="pp-log">{f1(nLog)}</b>
          {' · '}
          {t('ppGrowth')} = <b data-testid="pp-rate">{f1(growthRate(nLog, r, k))}</b> {t('ppPerUnit')}
        </span>
      )}
      <span>
        {t('ppDensity')} = <b data-testid="pp-density">{f1(density(shown, state.area))}</b> {t('ppPerHa')}
        {each > 1 ? ` · ${t('ppEach')}${each}` : ''}
      </span>
      {wantLog && (
        <span>
          {t('ppMax')} = <b data-testid="pp-max">{f1(maxGrowthRate(r, k))}</b> {t('ppPerUnit')}
          {' · '}
          {tHalf === null ? (
            t('ppPast')
          ) : (
            <>
              {t('ppReach')} = <b data-testid="pp-thalf">{tHalf.toFixed(2)}</b>
            </>
          )}
        </span>
      )}
      <span className="faint">{wantLog && !wantExp ? t('ppNoteLog') : t('ppNoteExp')}</span>
      <span className="faint">{t('ppFactors')}</span>
    </div>
  )
}

const def: SimDef<PopState> = {
  initial: { model: 'both', n0: INITIAL.n0, r: INITIAL.r, k: INITIAL.k, area: INITIAL.area, t: 0, playing: false },
  camera: { camZ: 10.5, zoom2D: 43 },
  notToScale: false,
  Scene: ({ state: s }) => <PopulationScene model={s.model} n0={s.n0} r={s.r} k={s.k} t={s.t} />,
  Controls: PopControls,
  legend: (s, t) => [
    ...(s.model !== 'logistic' ? [{ color: POP_COLORS.exp, label: t('ppLegJ') }] : []),
    ...(s.model !== 'exponential' ? [{ color: POP_COLORS.log, label: t('ppLegS') }] : []),
    { color: POP_COLORS.k, label: t('ppLegK') },
  ],
  readout: (s, t) => <PopReadout state={s} t={t} />,
}

export default makeSimHost(def)
