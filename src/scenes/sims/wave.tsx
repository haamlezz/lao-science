import { useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  AMPLITUDE_RANGE,
  FREQUENCY_RANGE,
  HARMONIC_RANGE,
  PHASE_RANGE,
  STRING_LENGTH,
  WAVELENGTH_RANGE,
  nodeCount,
  nodePositions,
  resultantAmplitude,
  standingFrequency,
  standingWavelength,
  waveReadout,
  waveSpeed,
} from '../../sims/wave'
import type { WaveMode } from '../../sims/wave'
import { WAVE_COLORS, WaveScene } from './WaveScene'
import { fx } from './physUtil'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface WaveSimState {
  mode: WaveMode
  frequency: number
  wavelength: number
  amp1: number
  amp2: number
  phaseDeg: number
  harmonic: number
  t: number
  playing: boolean
}

/** Wave speed on the string in standing mode: fixed by the medium (the default f x lambda). */
const STRING_SPEED = waveSpeed(2, 1.5)
/** The picture runs at half speed so a 5 Hz wave can still be followed by eye. */
const SLOW = 0.5

function WaveControls({ state, set }: { state: WaveSimState; set: (p: Partial<WaveSimState>) => void }) {
  const { t: tr } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing, (dt) => {
    const t = ref.current.t + dt * SLOW
    ref.current = { ...ref.current, t }
    set({ t })
  })
  const { mode } = state
  return (
    <>
      <div className="ctl-row">
        <Seg<WaveMode>
          label={tr('wvMode')}
          value={mode}
          onChange={(m) => set({ mode: m })}
          options={[
            { value: 'travelling', label: tr('wvTravelling') },
            { value: 'superposition', label: tr('wvSuperposition') },
            { value: 'standing', label: tr('wvStanding') },
          ]}
        />
      </div>
      <div className="m2-grid">
        {mode !== 'standing' && (
          <>
            <Slider
              label={tr('wvFrequency')}
              value={state.frequency}
              min={FREQUENCY_RANGE.min}
              max={FREQUENCY_RANGE.max}
              step={FREQUENCY_RANGE.step}
              display={`${state.frequency} Hz`}
              onChange={(frequency) => set({ frequency })}
            />
            <Slider
              label={tr('wvWavelength')}
              value={state.wavelength}
              min={WAVELENGTH_RANGE.min}
              max={WAVELENGTH_RANGE.max}
              step={WAVELENGTH_RANGE.step}
              display={`${state.wavelength} m`}
              onChange={(wavelength) => set({ wavelength })}
            />
          </>
        )}
        {mode === 'standing' && (
          <Slider
            label={tr('wvHarmonic')}
            value={state.harmonic}
            min={HARMONIC_RANGE.min}
            max={HARMONIC_RANGE.max}
            step={HARMONIC_RANGE.step}
            display={`n = ${state.harmonic}`}
            onChange={(harmonic) => set({ harmonic })}
          />
        )}
        <Slider
          label={tr('wvAmp1')}
          value={state.amp1}
          min={AMPLITUDE_RANGE.min}
          max={AMPLITUDE_RANGE.max}
          step={AMPLITUDE_RANGE.step}
          display={fx(state.amp1, 1)}
          onChange={(amp1) => set({ amp1 })}
        />
        {mode === 'superposition' && (
          <>
            <Slider
              label={tr('wvAmp2')}
              value={state.amp2}
              min={AMPLITUDE_RANGE.min}
              max={AMPLITUDE_RANGE.max}
              step={AMPLITUDE_RANGE.step}
              display={fx(state.amp2, 1)}
              onChange={(amp2) => set({ amp2 })}
            />
            <Slider
              label={tr('wvPhase')}
              value={state.phaseDeg}
              min={PHASE_RANGE.min}
              max={PHASE_RANGE.max}
              step={PHASE_RANGE.step}
              display={`${state.phaseDeg}°`}
              onChange={(phaseDeg) => set({ phaseDeg })}
            />
          </>
        )}
      </div>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set({ playing: !state.playing })}>
          {state.playing ? `❚❚ ${tr('moPause')}` : `▶ ${tr('moPlay')}`}
        </button>
      </div>
    </>
  )
}

function WaveReadoutPanel({ state, t: tr }: { state: WaveSimState; t: (k: UiKey) => string }) {
  const { mode } = state
  if (mode === 'standing') {
    const n = state.harmonic
    const lam = standingWavelength(n)
    const f = standingFrequency(n, STRING_SPEED)
    return (
      <div className="m2-result" aria-live="polite">
        <span>
          v = <b data-testid="wv-v">{fx(STRING_SPEED, 2)} m/s</b> ({tr('wvFixed')}) · L = {fx(STRING_LENGTH, 1)} m
        </span>
        <span>
          n = <b data-testid="wv-n">{n}</b> · λ<sub>n</sub> = 2L/n = <b data-testid="wv-lambda">{fx(lam, 2)} m</b>
        </span>
        <span>
          f<sub>n</sub> = nv/(2L) = <b data-testid="wv-f">{fx(f, 2)} Hz</b> · T = <b data-testid="wv-T">{fx(1 / f, 3)} s</b>
        </span>
        <span>
          {tr('wvNodes')} = <b data-testid="wv-nodes">{nodeCount(n)}</b> ({tr('wvNodesAt')}{' '}
          {nodePositions(n)
            .map((x) => fx(x, 2))
            .join(', ')}{' '}
          m)
        </span>
        <span className="faint">{tr('wvNodeNote')}</span>
        <span className="faint">{tr('wvSlow')}</span>
      </div>
    )
  }
  const r = waveReadout(state.frequency, state.wavelength)
  return (
    <div className="m2-result" aria-live="polite">
      <span>
        v = fλ = <b data-testid="wv-v">{fx(r.speed, 2)} m/s</b> · f = <b data-testid="wv-f">{fx(state.frequency, 1)} Hz</b> · λ ={' '}
        <b data-testid="wv-lambda">{fx(state.wavelength, 1)} m</b>
      </span>
      <span>
        T = 1/f = <b data-testid="wv-T">{fx(r.period, 3)} s</b> · ω = 2πf = <b data-testid="wv-omega">{fx(r.omega, 1)} rad/s</b> · k = 2π/λ ={' '}
        <b data-testid="wv-k">{fx(r.k, 2)} rad/m</b>
      </span>
      {mode === 'superposition' && (
        <>
          <span>
            {tr('wvResultant')} = <b data-testid="wv-ares">{fx(resultantAmplitude(state.amp1, state.amp2, state.phaseDeg), 2)}</b> (A₁ ={' '}
            {fx(state.amp1, 1)}, A₂ = {fx(state.amp2, 1)}, φ = {state.phaseDeg}°)
          </span>
          <span className="faint">{tr('wvPhaseNote')}</span>
        </>
      )}
      <span className="faint">{tr('wvEnergy')}</span>
      <span className="faint">{tr('wvSlow')}</span>
    </div>
  )
}

const def: SimDef<WaveSimState> = {
  initial: { mode: 'travelling', frequency: 2, wavelength: 1.5, amp1: 1, amp2: 1, phaseDeg: 0, harmonic: 1, t: 0, playing: false },
  camera: { camZ: 13, zoom2D: 48 },
  notToScale: false,
  Scene: ({ state, is2D }) => (
    <WaveScene
      mode={state.mode}
      frequency={state.frequency}
      wavelength={state.wavelength}
      amp1={state.amp1}
      amp2={state.amp2}
      phaseDeg={state.phaseDeg}
      harmonic={state.harmonic}
      stringSpeed={STRING_SPEED}
      t={state.t}
      is2D={is2D}
    />
  ),
  Controls: WaveControls,
  legend: (s, t) =>
    s.mode === 'standing'
      ? [
          { color: WAVE_COLORS.node, label: t('wvLegendNode') },
          { color: WAVE_COLORS.antinode, label: t('wvLegendAntinode') },
        ]
      : s.mode === 'superposition'
        ? [
            { color: WAVE_COLORS.w1, label: t('wvLegendW1') },
            { color: WAVE_COLORS.w2, label: t('wvLegendW2') },
            { color: WAVE_COLORS.sum, label: t('wvLegendSum') },
          ]
        : [
            { color: WAVE_COLORS.w1, label: t('wvLegendWave') },
            { color: WAVE_COLORS.particle, label: t('wvLegendParticle') },
          ],
  readout: (state, t) => <WaveReadoutPanel state={state} t={t} />,
}

export default makeSimHost(def)
