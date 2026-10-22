import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  CONC_RANGE,
  K_REF,
  R,
  TEMP_RANGE,
  activationEnergy,
  concentrationAt,
  curve,
  fractionAboveEa,
  halfLife,
  rate,
  rateConstant,
} from '../../sims/rate'
import { ChemPlot } from './ChemPlot'
import { RATE_COLORS, RateScene } from './RateScene'
import { fmt3, sci, sup } from './chemShared'
import { makeSimHost } from './host'
import type { SimDef } from './host'
import { useTicker } from './useTicker'

type Speed = 1 | 10

interface RateState {
  tempK: number
  conc: number
  catalyst: boolean
  powder: boolean
  t: number // simulated seconds
  playing: boolean
  speed: Speed
}

const T_MAX = 120 // s, fixed axis of the concentration-time graph
const E_MAX = 60 // kJ/mol, axis of the energy distribution

const kOf = (s: RateState) => rateConstant({ tempK: s.tempK, catalyst: s.catalyst, powder: s.powder })

function RateControls({ state, set }: { state: RateState; set: (p: Partial<RateState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing, (dt) => {
    const s = ref.current
    const next = s.t + dt * s.speed
    ref.current = { ...s, t: next }
    set(next >= T_MAX ? { t: T_MAX, playing: false } : { t: next })
  })
  const done = state.t >= T_MAX
  // a change of conditions restarts the run so the picture and the numbers always agree
  const change = (patch: Partial<RateState>) => set({ ...patch, t: 0, playing: false })
  const autoRepeat = useAutoRepeat(done, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
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
      <div className="m2-grid">
        <Slider
          label={t('rtTemp')}
          value={state.tempK}
          min={TEMP_RANGE.min}
          max={TEMP_RANGE.max}
          step={TEMP_RANGE.step}
          display={`${state.tempK} K`}
          onChange={(tempK) => change({ tempK })}
        />
        <Slider
          label={t('rtConc')}
          value={state.conc}
          min={CONC_RANGE.min}
          max={CONC_RANGE.max}
          step={CONC_RANGE.step}
          display={`${state.conc}`}
          onChange={(conc) => change({ conc })}
        />
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('rtCatalyst')}</span>
          <Seg<boolean>
            label={t('rtCatalyst')}
            value={state.catalyst}
            onChange={(catalyst) => change({ catalyst })}
            options={[
              { value: false, label: t('rtOff') },
              { value: true, label: t('rtOn') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('rtForm')}</span>
          <Seg<boolean>
            label={t('rtForm')}
            value={state.powder}
            onChange={(powder) => change({ powder })}
            options={[
              { value: false, label: t('rtLump') },
              { value: true, label: t('rtPowder') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('rtSpeed')}</span>
          <Seg<Speed>
            label={t('rtSpeed')}
            value={state.speed}
            onChange={(speed) => set({ speed })}
            options={[
              { value: 1, label: '×1' },
              { value: 10, label: '×10' },
            ]}
          />
        </div>
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

const range = (a: number, b: number, n: number): number[] => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)

function RateReadout({ s, t }: { s: RateState; t: (k: UiKey) => string }) {
  const k = kOf(s)
  const ea = activationEnergy(s.catalyst)
  const a = concentrationAt(s.conc, k, s.t)
  const th = halfLife(k)
  const frac = fractionAboveEa(ea, s.tempK)
  const log10 = (E: number) => -(E * 1000) / (R * s.tempK * Math.LN10) // log10 of exp(-E/RT)
  const yMin = -12
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong>
          k = <span data-testid="rt-k">{k.toPrecision(3)} s⁻¹</span> · ×<span data-testid="rt-ratio">{(k / K_REF).toPrecision(3)}</span>{' '}
          {t('rtVsRef')}
        </strong>
        <span>
          t<sub>½</sub> = ln 2 / k = <b data-testid="rt-half">{th >= 100 ? th.toFixed(0) : th.toPrecision(3)} s</b>
        </span>
        <span>
          [A] = {a.toFixed(1)} · {t('rtRate')} = k[A] = <b data-testid="rt-rate">{fmt3(rate(k, a))}</b> / s · t = {Math.round(s.t)} s
        </span>
        <span>
          {t('rtFraction')} E ≥ E<sub>a</sub> = <b data-testid="rt-frac">{sci(frac, 2)}</b> (E<sub>a</sub> = {ea} kJ/mol)
        </span>
        <span className="faint">{t('rtModelNote')}</span>
      </div>
      <ChemPlot
        title={t('rtGraphCT')}
        xLabel="t (s)"
        yLabel="[A]"
        x={[0, T_MAX]}
        y={[0, CONC_RANGE.max]}
        xTicks={[0, 30, 60, 90, 120]}
        yTicks={[0, 20, 40, 60]}
        lines={[{ pts: curve(s.conc, k, T_MAX, 48).map((p) => [p.t, p.c] as [number, number]), cls: 'mo-future' }, { pts: curve(s.conc, k, Math.min(s.t, T_MAX), 48).map((p) => [p.t, p.c] as [number, number]), cls: 'mo-live' }]}
        dots={[{ x: Math.min(s.t, T_MAX), y: a }]}
        vlines={th <= T_MAX ? [{ x: th }] : []}
        note={th <= T_MAX ? undefined : t('rtHalfOff')}
      />
      <ChemPlot
        title={t('rtGraphDist')}
        xLabel="E (kJ/mol)"
        yLabel="log"
        x={[0, E_MAX]}
        y={[yMin, 0]}
        xTicks={[0, 20, 40, 60]}
        yTicks={[-12, -9, -6, -3, 0]}
        fmtY={(v) => (v === 0 ? '1' : `10${sup(v)}`)}
        lines={[{ pts: range(0, E_MAX, 30).map((E) => [E, log10(E)] as [number, number]), cls: 'mo-live' }]}
        dots={[{ x: ea, y: log10(ea) }]}
        vlines={[{ x: ea, cls: 'mo-live' }]}
        extra={(px, py) => (
          <rect x={px(ea)} y={py(0)} width={px(E_MAX) - px(ea)} height={py(yMin) - py(0)} fill={RATE_COLORS.b} opacity={0.3} />
        )}
        note={t('rtDistNote')}
      />
    </div>
  )
}

const def: SimDef<RateState> = {
  initial: { tempK: 300, conc: 30, catalyst: false, powder: false, t: 0, playing: false, speed: 10 },
  camera: { camZ: 10.5, zoom2D: 44 },
  notToScale: true,
  Scene: ({ state: s }) => (
    <RateScene
      conc={s.conc}
      remaining={concentrationAt(s.conc, kOf(s), s.t)}
      tempK={s.tempK}
      catalyst={s.catalyst}
      powder={s.powder}
      eaKJ={activationEnergy(s.catalyst)}
    />
  ),
  Controls: RateControls,
  legend: (_s, t) => [
    { color: RATE_COLORS.a, label: t('rtLegendA') },
    { color: RATE_COLORS.b, label: t('rtLegendB') },
    { color: RATE_COLORS.flash, label: t('rtLegendFlash') },
  ],
  readout: (s, t) => <RateReadout s={s} t={t} />,
}

export default makeSimHost(def)
