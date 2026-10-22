import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  ANGLE_RANGE,
  G_EARTH_MS2,
  G_MOON_MS2,
  HEIGHTS,
  SPEED_RANGE,
  droppedTime,
  flightTime,
  maxHeight,
  range,
  speedAt,
  vx,
  vy0,
  vyAt,
  xAt,
  yAt,
} from '../../sims/projectile'
import type { LaunchParams } from '../../sims/projectile'
import { PROJECTILE_COLORS, ProjectileScene, traceInterval } from './ProjectileScene'
import { fx } from './physUtil'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type Gravity = 'earth' | 'moon'

interface ProjSimState {
  v0: number
  angleDeg: number
  h0: number
  gravity: Gravity
  showComponents: boolean
  dropSecond: boolean
  t: number
  playing: boolean
}

const paramsOf = (s: ProjSimState): LaunchParams => ({
  v0: s.v0,
  angleDeg: s.angleDeg,
  h0: s.h0,
  g: s.gravity === 'moon' ? G_MOON_MS2 : G_EARTH_MS2,
})

/** Real time is used up to 8 s of flight; longer flights (Moon) are sped up so a run stays watchable. */
const speedUp = (T: number) => Math.max(1, T / 8)

function ProjControls({ state, set }: { state: ProjSimState; set: (p: Partial<ProjSimState>) => void }) {
  const { t: tr } = useLang()
  const ref = useRef(state)
  ref.current = state
  const p = paramsOf(state)
  const T = flightTime(p)

  useTicker(state.playing, (dt) => {
    const s = ref.current
    const pp = paramsOf(s)
    const end = flightTime(pp)
    const t = Math.min(s.t + dt * speedUp(end), end)
    ref.current = { ...s, t }
    set(t >= end ? { t, playing: false } : { t })
  })

  const change = (patch: Partial<ProjSimState>) => set({ ...patch, t: 0, playing: false })
  const finished = state.t >= T - 1e-9

  const autoRepeat = useAutoRepeat(finished, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={tr('pjSpeed')}
          value={state.v0}
          min={SPEED_RANGE.min}
          max={SPEED_RANGE.max}
          step={SPEED_RANGE.step}
          display={`${state.v0} m/s`}
          onChange={(v0) => change({ v0 })}
        />
        <Slider
          label={tr('pjAngle')}
          value={state.angleDeg}
          min={ANGLE_RANGE.min}
          max={ANGLE_RANGE.max}
          step={ANGLE_RANGE.step}
          display={`${state.angleDeg}°`}
          onChange={(angleDeg) => change({ angleDeg })}
        />
        <Slider
          label={tr('pjTime')}
          value={Math.min(state.t, T)}
          min={0}
          max={Math.max(Math.ceil(T * 100) / 100, 0.05)}
          step={0.05}
          display={`${fx(Math.min(state.t, T), 2)} s`}
          onChange={(t) => set({ t, playing: false })}
        />
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{tr('pjHeight')}</span>
          <Seg<number>
            label={tr('pjHeight')}
            value={state.h0}
            onChange={(h0) => change({ h0 })}
            options={HEIGHTS.map((h) => ({ value: h, label: `${h} m` }))}
          />
        </div>
        <div className="m2-slider">
          <span>{tr('pjGravity')}</span>
          <Seg<Gravity>
            label={tr('pjGravity')}
            value={state.gravity}
            onChange={(gravity) => change({ gravity })}
            options={[
              { value: 'earth', label: `${tr('pjEarth')} 9.8` },
              { value: 'moon', label: `${tr('pjMoon')} 1.6` },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{tr('pjComponents')}</span>
          <Seg<boolean>
            label={tr('pjComponents')}
            value={state.showComponents}
            onChange={(showComponents) => set({ showComponents })}
            options={[
              { value: false, label: tr('rfOff') },
              { value: true, label: tr('rfOn') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{tr('pjDrop')}</span>
          <Seg<boolean>
            label={tr('pjDrop')}
            value={state.dropSecond}
            onChange={(dropSecond) => set({ dropSecond })}
            options={[
              { value: false, label: tr('rfOff') },
              { value: true, label: tr('rfOn') },
            ]}
          />
        </div>
      </div>
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (state.playing ? set({ playing: false }) : set({ playing: true, ...(finished ? { t: 0 } : {}) }))}
        >
          {state.playing ? `❚❚ ${tr('moPause')}` : `▶ ${tr('pjFire')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ t: 0, playing: false })}>
          ↺ {tr('moRestart')}
        </button>
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

function ProjReadout({ state, t: tr }: { state: ProjSimState; t: (k: UiKey) => string }) {
  const p = paramsOf(state)
  const T = flightTime(p)
  const t = Math.min(state.t, T)
  const fast = speedUp(T)
  return (
    <div className="m2-result" aria-live="polite">
      <span>
        H = <b data-testid="pj-H">{fx(maxHeight(p), 1)} m</b> · R = <b data-testid="pj-R">{fx(range(p), 1)} m</b> · T ={' '}
        <b data-testid="pj-T">{fx(T, 2)} s</b>
      </span>
      <span>
        v<sub>x</sub> = v<sub>0</sub> cos θ = <b data-testid="pj-vx0">{fx(vx(p), 1)} m/s</b> · v<sub>y0</sub> = v<sub>0</sub> sin θ ={' '}
        <b data-testid="pj-vy0">{fx(vy0(p), 1)} m/s</b>
      </span>
      <span>
        t = <b data-testid="pj-t">{fx(t, 2)} s</b> · x = <b data-testid="pj-x">{fx(xAt(p, t), 1)} m</b> · y ={' '}
        <b data-testid="pj-y">{fx(yAt(p, t), 1)} m</b>
      </span>
      <span>
        v<sub>x</sub> = <b data-testid="pj-vx">{fx(vx(p), 1)} m/s</b> · v<sub>y</sub> = <b data-testid="pj-vy">{fx(vyAt(p, t), 1)} m/s</b> ·{' '}
        {tr('pjSpeedNow')} = <b data-testid="pj-v">{fx(speedAt(p, t), 1)} m/s</b>
      </span>
      {state.dropSecond && (
        <span className="faint">
          {tr('pjDropTime')} = <b data-testid="pj-tdrop">{fx(droppedTime(p), 2)} s</b>
          {state.h0 === 0 ? ` · ${tr('pjDropNone')}` : state.angleDeg === 0 ? ` · ${tr('pjDropSame')}` : ''}
        </span>
      )}
      {fast > 1.001 && (
        <span className="faint">
          {tr('pjFast')} ×{fx(fast, 1)}
        </span>
      )}
      <span className="faint">
        {tr('pjDots')} {fx(traceInterval(T), 2)} s · {tr('pjNoAir')}
      </span>
      {state.h0 === 0 && <span className="faint">{tr('pjComplement')}</span>}
    </div>
  )
}

const def: SimDef<ProjSimState> = {
  initial: { v0: 20, angleDeg: 45, h0: 0, gravity: 'earth', showComponents: true, dropSecond: false, t: 0, playing: false },
  camera: { camZ: 13, zoom2D: 46 },
  notToScale: false,
  Scene: ({ state, is2D }) => (
    <ProjectileScene params={paramsOf(state)} t={state.t} showComponents={state.showComponents} dropSecond={state.dropSecond} is2D={is2D} />
  ),
  Controls: ProjControls,
  legend: (_s, t) => [
    { color: PROJECTILE_COLORS.ball, label: t('pjLegendBall') },
    { color: PROJECTILE_COLORS.v, label: t('pjLegendV') },
    { color: PROJECTILE_COLORS.landing, label: t('pjLegendLanding') },
  ],
  readout: (state, t) => <ProjReadout state={state} t={t} />,
}

export default makeSimHost(def)
