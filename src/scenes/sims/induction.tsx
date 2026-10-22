import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  FIELD_RANGE,
  GENERATOR_FREQ_RANGE,
  GENERATOR_TURNS_RANGE,
  LOOP_AREA,
  MAGNET_SPEED_RANGE,
  MAGNET_X_RANGE,
  PEAK_EMF_X,
  TURNS_RANGE,
  flux,
  fluxGradient,
  generatorEmf,
  generatorOmega,
  generatorPeak,
  generatorPeriod,
  magnetEmf,
  magnetPeakEmf,
  rms,
  signedVelocity,
} from '../../sims/induction'
import type { InductionMode, MagnetDirection } from '../../sims/induction'
import { FULL_SCALE_V, GeneratorScene, INDUCTION_COLORS, MagnetScene } from './InductionScene'
import { PhysPlot } from './PhysPlot'
import { fx, niceStep, ticksBetween } from './physUtil'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface InductionSimState {
  mode: InductionMode
  speed: number // m/s
  direction: MagnetDirection
  turnsM: number
  polarity: 1 | -1
  x: number // m
  turnsG: number
  bField: number // T
  freq: number // Hz
  t: number // s, generator physical time
  playing: boolean
}

/** Playback speed relative to the physical time (a pass at 1 m/s lasts 0.6 s, a 50 Hz period 20 ms). */
const SLOW_MAGNET = 0.2
const SLOW_GENERATOR = 0.02
const PASS_LENGTH = MAGNET_X_RANGE.max - MAGNET_X_RANGE.min
const startX = (d: MagnetDirection) => (d === 'in' ? MAGNET_X_RANGE.min : MAGNET_X_RANGE.max)

function InductionControls({ state, set }: { state: InductionSimState; set: (p: Partial<InductionSimState>) => void }) {
  const { t: tr } = useLang()
  const ref = useRef(state)
  ref.current = state

  useTicker(state.playing, (dt) => {
    const s = ref.current
    if (s.mode === 'generator') {
      const t = s.t + dt * SLOW_GENERATOR
      ref.current = { ...s, t }
      set({ t })
      return
    }
    const v = signedVelocity(s.speed, s.direction)
    const raw = s.x + v * dt * SLOW_MAGNET
    const x = Math.min(Math.max(raw, MAGNET_X_RANGE.min), MAGNET_X_RANGE.max)
    const atEnd = x !== raw
    ref.current = { ...s, x }
    set(atEnd ? { x, playing: false } : { x })
  })

  const magnet = state.mode === 'magnet'
  const atEnd = state.x === (state.direction === 'in' ? MAGNET_X_RANGE.max : MAGNET_X_RANGE.min)
  const canPlay = !magnet || state.speed > 0
  const autoRepeat = useAutoRepeat(magnet && atEnd, state.playing, () => set({ x: startX(state.direction), playing: true }))
  return (
    <>
      <div className="ctl-row">
        <Seg<InductionMode>
          label={tr('inMode')}
          value={state.mode}
          onChange={(mode) => set({ mode, playing: false })}
          options={[
            { value: 'magnet', label: tr('inMagnet') },
            { value: 'generator', label: tr('inGenerator') },
          ]}
        />
      </div>
      {magnet ? (
        <>
          <div className="m2-grid">
            <Slider
              label={tr('inSpeed')}
              value={state.speed}
              min={MAGNET_SPEED_RANGE.min}
              max={MAGNET_SPEED_RANGE.max}
              step={MAGNET_SPEED_RANGE.step}
              display={`${fx(state.speed, 1)} m/s`}
              onChange={(speed) => set({ speed })}
            />
            <Slider
              label={tr('inTurns')}
              value={state.turnsM}
              min={TURNS_RANGE.min}
              max={TURNS_RANGE.max}
              step={TURNS_RANGE.step / 2}
              display={`N = ${state.turnsM}`}
              onChange={(turnsM) => set({ turnsM })}
            />
            <Slider
              label={tr('inPosition')}
              value={state.x}
              min={MAGNET_X_RANGE.min}
              max={MAGNET_X_RANGE.max}
              step={0.005}
              display={`${fx(state.x, 3)} m`}
              onChange={(x) => set({ x, playing: false })}
            />
          </div>
          <div className="m2-grid">
            <div className="m2-slider">
              <span>{tr('inDirection')}</span>
              <Seg<MagnetDirection>
                label={tr('inDirection')}
                value={state.direction}
                onChange={(direction) => set({ direction, x: startX(direction), playing: false })}
                options={[
                  { value: 'in', label: tr('inDirIn') },
                  { value: 'out', label: tr('inDirOut') },
                ]}
              />
            </div>
            <div className="m2-slider">
              <span>{tr('inPolarity')}</span>
              <Seg<1 | -1>
                label={tr('inPolarity')}
                value={state.polarity}
                onChange={(polarity) => set({ polarity })}
                options={[
                  { value: 1, label: tr('inPolNS') },
                  { value: -1, label: tr('inPolSN') },
                ]}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="m2-grid">
          <Slider
            label={tr('inField')}
            value={state.bField}
            min={FIELD_RANGE.min}
            max={FIELD_RANGE.max}
            step={FIELD_RANGE.step}
            display={`${fx(state.bField, 2)} T`}
            onChange={(bField) => set({ bField })}
          />
          <Slider
            label={tr('inTurns')}
            value={state.turnsG}
            min={GENERATOR_TURNS_RANGE.min}
            max={GENERATOR_TURNS_RANGE.max}
            step={GENERATOR_TURNS_RANGE.step}
            display={`N = ${state.turnsG}`}
            onChange={(turnsG) => set({ turnsG })}
          />
          <Slider
            label={tr('inFrequency')}
            value={state.freq}
            min={GENERATOR_FREQ_RANGE.min}
            max={GENERATOR_FREQ_RANGE.max}
            step={GENERATOR_FREQ_RANGE.step}
            display={`${state.freq} Hz`}
            onChange={(freq) => set({ freq })}
          />
        </div>
      )}
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canPlay}
          onClick={() =>
            state.playing
              ? set({ playing: false })
              : set({ playing: true, ...(magnet && atEnd ? { x: startX(state.direction) } : {}) })
          }
        >
          {state.playing ? `❚❚ ${tr('moPause')}` : `▶ ${tr('moPlay')}`}
        </button>
      </div>
      {magnet && <div className="ctl-row">{autoRepeat}</div>}
    </>
  )
}

function MagnetGraph({ state, t: tr }: { state: InductionSimState; t: (k: UiKey) => string }) {
  const v = signedVelocity(state.speed, state.direction)
  const x0 = startX(state.direction)
  const dirSign = state.direction === 'in' ? 1 : -1
  const T = state.speed > 0 ? PASS_LENGTH / state.speed : 1
  const peak = Math.max(magnetPeakEmf(state.turnsM, state.speed), 0.1)
  const step = niceStep(peak * 2, 2)
  const yMax = Math.ceil(peak / step - 1e-9) * step
  const at = (frac: number): [number, number] => {
    const x = x0 + dirSign * frac * PASS_LENGTH
    return [frac * T, magnetEmf(state.turnsM, x, v, state.polarity)]
  }
  const all = Array.from({ length: 61 }, (_, i) => at(i / 60))
  const fracNow = Math.min(Math.max(Math.abs(state.x - x0) / PASS_LENGTH, 0), 1)
  const n = Math.max(2, Math.round(fracNow * 60) + 1)
  const live = Array.from({ length: n }, (_, i) => at((i / (n - 1)) * fracNow))
  return (
    <PhysPlot
      testId="in-graph"
      title={tr('inGraphMagnet')}
      xLabel={tr('inAxisT')}
      yLabel={tr('inAxisEps')}
      xDomain={[0, T]}
      yDomain={[-yMax, yMax]}
      xTicks={ticksBetween(0, T, niceStep(T, 3))}
      yTicks={[-yMax, 0, yMax]}
      series={[
        { points: all, cls: 'pg-ghost' },
        { points: live, cls: 'pg-line' },
      ]}
      dot={at(fracNow)}
    />
  )
}

function GeneratorGraph({ state, t: tr }: { state: InductionSimState; t: (k: UiKey) => string }) {
  const peak = generatorPeak(state.turnsG, state.bField, state.freq)
  const T = generatorPeriod(state.freq) * 1000 // ms
  const step = niceStep(peak * 2, 2)
  const yMax = Math.ceil(peak / step - 1e-9) * step
  const tMs = (state.t * 1000) % (2 * T)
  const eps = (ms: number): [number, number] => [ms, generatorEmf(state.turnsG, state.bField, state.freq, ms / 1000)]
  const all = Array.from({ length: 81 }, (_, i) => eps((i / 80) * 2 * T))
  return (
    <PhysPlot
      testId="in-graph"
      title={tr('inGraphGen')}
      xLabel={tr('inAxisMs')}
      yLabel={tr('inAxisEps')}
      xDomain={[0, 2 * T]}
      yDomain={[-yMax, yMax]}
      xTicks={ticksBetween(0, 2 * T, niceStep(2 * T, 4))}
      yTicks={[-yMax, 0, yMax]}
      series={[{ points: all, cls: 'pg-line' }]}
      hLines={[
        { y: peak, label: tr('inRefPeak') },
        { y: rms(peak), label: tr('inRefRms') },
        { y: -rms(peak), label: `−${tr('inRefRms')}` },
      ]}
      dot={eps(tMs)}
    />
  )
}

function InductionReadout({ state, t: tr }: { state: InductionSimState; t: (k: UiKey) => string }) {
  if (state.mode === 'generator') {
    const peak = generatorPeak(state.turnsG, state.bField, state.freq)
    const now = generatorEmf(state.turnsG, state.bField, state.freq, state.t)
    return (
      <div className="mo-readout">
        <div className="m2-result" aria-live="polite">
          <span>
            ε = NBAω sin ωt · A = {fx(LOOP_AREA, 2)} m² · ω = 2πf = <b data-testid="in-omega">{fx(generatorOmega(state.freq), 1)} rad/s</b>
          </span>
          <span>
            ε<sub>peak</sub> = NBAω = <b data-testid="in-peak">{fx(peak, 1)} V</b> · ε<sub>rms</sub> = ε<sub>peak</sub>/√2 ={' '}
            <b data-testid="in-rms">{fx(rms(peak), 1)} V</b>
          </span>
          <span>
            T = 1/f = <b data-testid="in-period">{fx(generatorPeriod(state.freq) * 1000, 1)} ms</b> · ε(t) ={' '}
            <b data-testid="in-now">{fx(now, 1)} V</b>
          </span>
          <span className="faint">{tr('inGenNote')}</span>
          <span className="faint">{tr('inSlowGen')}</span>
        </div>
        <GeneratorGraph state={state} t={tr} />
      </div>
    )
  }
  const v = signedVelocity(state.speed, state.direction)
  const emf = magnetEmf(state.turnsM, state.x, v, state.polarity)
  const approaching = state.speed > 0 && state.x * v < 0
  const leaving = state.speed > 0 && state.x * v > 0
  const phase = state.speed === 0 ? tr('inStill') : approaching ? tr('inApproaching') : leaving ? tr('inLeaving') : tr('inCentre')
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <span>
          x = <b data-testid="in-x">{fx(state.x, 3)} m</b> · v = <b data-testid="in-v">{fx(v, 1)} m/s</b> · {phase}
        </span>
        <span>
          Φ = <b data-testid="in-flux">{fx(flux(state.x) * 1000, 2)} mWb</b> · dΦ/dx ={' '}
          <b data-testid="in-grad">{fx(fluxGradient(state.x) * 1000, 1)} mWb/m</b>
        </span>
        <span>
          ε = −N(dΦ/dx)v = <b data-testid="in-emf">{fx(emf, 2)} V</b> (N = {state.turnsM})
        </span>
        <span>
          {tr('inPeakEmf')} = <b data-testid="in-peakmag">{fx(magnetPeakEmf(state.turnsM, state.speed), 2)} V</b> ({tr('inAt')} |x| ={' '}
          {fx(PEAK_EMF_X, 3)} m)
        </span>
        <span className="faint">{tr('inLenz')}</span>
        <span className="faint">
          {tr('inIllustrative')}: Φ(x) = Φ₀ / (1 + (x/w)²), Φ₀ = 1.00 mWb, w = 0.05 m · {tr('inNeedle')} ±{FULL_SCALE_V} V
        </span>
        <span className="faint">{tr('inSlowMagnet')}</span>
      </div>
      <MagnetGraph state={state} t={tr} />
    </div>
  )
}

const def: SimDef<InductionSimState> = {
  initial: {
    mode: 'magnet',
    speed: 1,
    direction: 'in',
    turnsM: 100,
    polarity: 1,
    x: MAGNET_X_RANGE.min,
    turnsG: 100,
    bField: 0.1,
    freq: 50,
    t: 0,
    playing: false,
  },
  camera: { camZ: 13, zoom2D: 46 },
  notToScale: true,
  Scene: ({ state, is2D }) => {
    if (state.mode === 'generator') {
      const peak = generatorPeak(state.turnsG, state.bField, state.freq)
      const now = generatorEmf(state.turnsG, state.bField, state.freq, state.t)
      return <GeneratorScene angle={generatorOmega(state.freq) * state.t} emfFraction={peak > 0 ? now / peak : 0} />
    }
    const v = signedVelocity(state.speed, state.direction)
    return (
      <MagnetScene
        x={state.x}
        turns={state.turnsM}
        polarity={state.polarity}
        emf={magnetEmf(state.turnsM, state.x, v, state.polarity)}
        is2D={is2D}
      />
    )
  },
  Controls: InductionControls,
  legend: (s, t) =>
    s.mode === 'generator'
      ? [
          { color: INDUCTION_COLORS.loop, label: t('inLegendLoop') },
          { color: INDUCTION_COLORS.field, label: t('inLegendField') },
        ]
      : [
          { color: INDUCTION_COLORS.north, label: t('inLegendNorth') },
          { color: INDUCTION_COLORS.south, label: t('inLegendSouth') },
          { color: INDUCTION_COLORS.coil, label: t('inLegendCoil') },
        ],
  readout: (state, t) => <InductionReadout state={state} t={t} />,
}

export default makeSimHost(def)
