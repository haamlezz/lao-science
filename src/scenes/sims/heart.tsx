import { useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  HR_RANGE,
  INITIAL,
  PRESETS,
  RESTING_HR,
  SV_RANGE,
  cardiacOutput,
  cycleLength,
  diastoleDuration,
  phaseAt,
  systoleDuration,
} from '../../sims/heart'
import type { Phase } from '../../sims/heart'
import { HEART_COLORS, HeartScene } from './HeartScene'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface HeartSimState {
  hr: number
  sv: number
  bloodColour: boolean
  valves: boolean
  playing: boolean
  t: number
}

const PHASE_KEY: Record<Phase, UiKey> = {
  ventricularSystole: 'htPhaseV',
  diastole: 'htPhaseD',
  atrialSystole: 'htPhaseA',
}

function HeartControls({ state, set }: { state: HeartSimState; set: (p: Partial<HeartSimState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing, (dt) => {
    const next = ref.current.t + dt
    ref.current = { ...ref.current, t: next }
    set({ t: next })
  })
  const preset: number | null = Object.values(PRESETS).includes(state.hr as 70 | 100 | 150) ? state.hr : null
  return (
    <>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set({ playing: !state.playing })}>
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
      </div>
      <div className="m2-grid">
        <Slider
          label={t('htRate')}
          value={state.hr}
          min={HR_RANGE.min}
          max={HR_RANGE.max}
          step={HR_RANGE.step}
          display={`${state.hr} bpm`}
          onChange={(hr) => set({ hr })}
        />
        <Slider
          label={t('htStroke')}
          value={state.sv}
          min={SV_RANGE.min}
          max={SV_RANGE.max}
          step={SV_RANGE.step}
          display={`${state.sv} mL`}
          onChange={(sv) => set({ sv })}
        />
        <div className="m2-slider">
          <span>{t('htPreset')}</span>
          <Seg<number>
            label={t('htPreset')}
            value={preset ?? -1}
            onChange={(hr) => set({ hr })}
            options={[
              { value: PRESETS.rest, label: `${t('htRest')} ${PRESETS.rest}` },
              { value: PRESETS.walking, label: `${t('htWalking')} ${PRESETS.walking}` },
              { value: PRESETS.running, label: `${t('htRunning')} ${PRESETS.running}` },
            ]}
          />
        </div>
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('htBloodColour')}</span>
          <Seg<boolean>
            label={t('htBloodColour')}
            value={state.bloodColour}
            onChange={(bloodColour) => set({ bloodColour })}
            options={[
              { value: false, label: t('rfOff') },
              { value: true, label: t('rfOn') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('htValves')}</span>
          <Seg<boolean>
            label={t('htValves')}
            value={state.valves}
            onChange={(valves) => set({ valves })}
            options={[
              { value: false, label: t('rfOff') },
              { value: true, label: t('rfOn') },
            ]}
          />
        </div>
      </div>
    </>
  )
}

function HeartReadout({ state, t }: { state: HeartSimState; t: (k: UiKey) => string }) {
  const T = cycleLength(state.hr)
  const ts = systoleDuration(state.hr)
  const phase = phaseAt(state.hr, state.t)
  const resting = state.hr >= RESTING_HR.min && state.hr <= RESTING_HR.max
  return (
    <div className="m2-result ht-readout" aria-live="polite">
      <span>
        {t('htPeriod')} = <b data-testid="ht-period">{T.toFixed(2)} s</b>
      </span>
      <span>
        {t('htSystole')} = <b data-testid="ht-systole">{ts.toFixed(2)} s</b> · {t('htDiastole')} ={' '}
        <b data-testid="ht-diastole">{diastoleDuration(state.hr).toFixed(2)} s</b>
      </span>
      <span>
        {t('htOutput')} = {state.hr} × {state.sv} mL = <b data-testid="ht-output">{cardiacOutput(state.hr, state.sv).toFixed(2)} L/min</b>
      </span>
      <span data-testid="ht-phase">{t(PHASE_KEY[phase])}</span>
      <span className="faint">
        {resting ? `${t('htRestNote')} ✓` : t('htRestNote')} · {t('htSides')}
      </span>
      <span className="faint">{t('htNote')}</span>
    </div>
  )
}

const def: SimDef<HeartSimState> = {
  initial: { hr: INITIAL.heartRate, sv: INITIAL.strokeVolume, bloodColour: true, valves: true, playing: true, t: 0 },
  camera: { camZ: 10.5, zoom2D: 43 },
  notToScale: true,
  Scene: ({ state }) => <HeartScene hr={state.hr} t={state.t} bloodColour={state.bloodColour} valves={state.valves} />,
  Controls: HeartControls,
  legend: (s, t) =>
    s.bloodColour
      ? [
          { color: HEART_COLORS.rich, label: t('htLegRich') },
          { color: HEART_COLORS.poor, label: t('htLegPoor') },
          ...(s.valves ? [{ color: HEART_COLORS.closed, label: t('htLegClosed') }] : []),
        ]
      : [
          { color: HEART_COLORS.open, label: t('htLegOpen') },
          { color: HEART_COLORS.closed, label: t('htLegClosed') },
          { color: '#ffffff', label: t('htLegBeat') },
        ],
  readout: (s, t) => <HeartReadout state={s} t={t} />,
}

export default makeSimHost(def)
