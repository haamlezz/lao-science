import { useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  ANGLE_RANGE_DEG,
  LENGTH,
  MASS_RANGE,
  energies,
  exactPeriod,
  initialState,
  smallAnglePeriod,
  speedAtBottom,
  step,
  totalEnergy,
} from '../../sims/pendulum'
import type { PendulumState } from '../../sims/pendulum'
import { PENDULUM_COLORS, PendulumScene } from './PendulumScene'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface PendulumSimState {
  mass: number
  angle0: number // degrees
  damping: boolean
  playing: boolean
  ps: PendulumState
}

const ENERGY_COLORS = { ek: '#d84315', ep: '#1565c0', total: '#2e7d32', heat: '#8d6e63' }
const toRad = (deg: number) => (deg * Math.PI) / 180

function PendulumControls({ state, set }: { state: PendulumSimState; set: (p: Partial<PendulumSimState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state

  useTicker(state.playing, (dt) => {
    const s = ref.current
    const ps = step(s.ps, dt, s.damping, LENGTH)
    ref.current = { ...s, ps }
    set({ ps })
  })

  const restart = (patch: Partial<PendulumSimState> = {}) => {
    const angle0 = patch.angle0 ?? state.angle0
    set({ ...patch, ps: initialState(angle0), playing: false })
  }

  return (
    <>
      <div className="m2-grid">
        <Slider
          label={t('peMass')}
          value={state.mass}
          min={MASS_RANGE.min}
          max={MASS_RANGE.max}
          step={MASS_RANGE.step}
          display={`${state.mass} kg`}
          onChange={(mass) => restart({ mass })}
        />
        <Slider
          label={t('peAngle')}
          value={state.angle0}
          min={ANGLE_RANGE_DEG.min}
          max={ANGLE_RANGE_DEG.max}
          step={ANGLE_RANGE_DEG.step}
          display={`${state.angle0}°`}
          onChange={(angle0) => restart({ angle0 })}
        />
        <div className="m2-slider">
          <span>{t('peDamping')}</span>
          <Seg<boolean>
            label={t('peDamping')}
            value={state.damping}
            onChange={(damping) => set({ damping })}
            options={[
              { value: false, label: t('rfOff') },
              { value: true, label: t('rfOn') },
            ]}
          />
        </div>
      </div>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set({ playing: !state.playing })}>
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => restart()}>
          ↺ {t('moRestart')}
        </button>
      </div>
    </>
  )
}

function EnergyBar({ label, value, max, color, testId }: { label: string; value: number; max: number; color: string; testId: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className="bar-row">
      <span className="bar-label">{label}</span>
      <span className="bar-track" aria-hidden="true">
        <i className="bar-fill" style={{ width: `${pct}%`, background: color }} />
      </span>
      <b className="bar-value" data-testid={testId}>
        {value.toFixed(2)} J
      </b>
    </div>
  )
}

function PendulumReadout({ state, t }: { state: PendulumSimState; t: (k: UiKey) => string }) {
  const e0 = totalEnergy(state.mass, state.angle0)
  const en = energies(state.mass, state.ps, e0)
  return (
    <div className="m2-result" aria-live="off">
      <div className="bars">
        <EnergyBar label={t('peKinetic')} value={en.ek} max={e0} color={ENERGY_COLORS.ek} testId="pe-ek" />
        <EnergyBar label={t('pePotential')} value={en.ep} max={e0} color={ENERGY_COLORS.ep} testId="pe-ep" />
        <EnergyBar label={t('peTotal')} value={en.total} max={e0} color={ENERGY_COLORS.total} testId="pe-total" />
        {state.damping && <EnergyBar label={t('peHeat')} value={en.heat} max={e0} color={ENERGY_COLORS.heat} testId="pe-heat" />}
      </div>
      <span>
        {t('peTime')} = <b data-testid="pe-time">{state.ps.t.toFixed(1)} s</b> · {t('peHeight')} = <b data-testid="pe-h">{en.height.toFixed(2)} m</b> ·{' '}
        {t('peSpeed')} = <b data-testid="pe-v">{en.speed.toFixed(2)} m/s</b>
      </span>
      <span>
        {t('peRelease')}: <b data-testid="pe-e0">{e0.toFixed(1)} J</b>
      </span>
      <span>
        {t('peBottom')} = <b data-testid="pe-vmax">{speedAtBottom(state.angle0).toFixed(2)} m/s</b>
      </span>
      <span>
        {t('pePeriodSmall')} = <b data-testid="pe-t-small">{smallAnglePeriod().toFixed(2)} s</b>
      </span>
      <span>
        {t('pePeriodExact')} ({state.angle0}°) = <b data-testid="pe-t-exact">{exactPeriod(state.angle0).toFixed(2)} s</b>
      </span>
      <span className="faint">{state.damping ? t('peNoteDamped') : t('peNoteFree')}</span>
    </div>
  )
}

const def: SimDef<PendulumSimState> = {
  initial: { mass: 1, angle0: 60, damping: false, playing: false, ps: initialState(60) },
  camera: { camZ: 10, zoom2D: 48 },
  notToScale: false,
  Scene: ({ state }) => (
    <PendulumScene mass={state.mass} theta={state.ps.theta} angle0={toRad(state.angle0)} length={LENGTH} />
  ),
  Controls: PendulumControls,
  legend: (_s, t) => [
    { color: PENDULUM_COLORS.bob, label: t('peLegendBob') },
    { color: PENDULUM_COLORS.release, label: t('peLegendRelease') },
    { color: PENDULUM_COLORS.ref, label: t('peLegendRef') },
  ],
  readout: (state, t) => <PendulumReadout state={state} t={t} />,
}

export default makeSimHost(def)
