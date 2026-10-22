import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  ANGLE_RANGE,
  FORCE_RANGE,
  MASS_RANGE,
  SURFACES,
  accelWhileMoving,
  angleOf,
  reactionOfNormal,
  solveFromRest,
  stepVelocity,
} from '../../sims/newton'
import type { Layout, NewtonParams, Surface } from '../../sims/newton'
import { NEWTON_COLORS, NewtonScene } from './NewtonScene'
import { fx } from './physUtil'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface NewtonSimState extends NewtonParams {
  showForces: boolean
  v: number // signed m/s along the surface
  x: number // m moved
  t: number
  playing: boolean
}

const paramsOf = (s: NewtonSimState): NewtonParams => ({
  mass: s.mass,
  force: s.force,
  surface: s.surface,
  layout: s.layout,
  angleDeg: s.angleDeg,
})

const RUN_END = 10 // s

function NewtonControls({ state, set }: { state: NewtonSimState; set: (p: Partial<NewtonSimState>) => void }) {
  const { t: tr } = useLang()
  const ref = useRef(state)
  ref.current = state

  useTicker(state.playing, (dt) => {
    const s = ref.current
    const p = paramsOf(s)
    const v = stepVelocity(p, s.v, dt)
    const next = { ...s, v, x: s.x + v * dt, t: s.t + dt }
    ref.current = next
    // a run lasts RUN_END seconds so the final speed and distance can be read
    if (next.t >= RUN_END) set({ v: next.v, x: next.x, t: RUN_END, playing: false })
    else set({ v: next.v, x: next.x, t: next.t })
  })

  // any parameter change starts a new run from rest
  const change = (patch: Partial<NewtonSimState>) => set({ ...patch, v: 0, x: 0, t: 0, playing: false })

  const autoRepeat = useAutoRepeat(state.t >= RUN_END, state.playing, () => set({ v: 0, x: 0, t: 0, playing: true }))
  return (
    <>
      <div className="m2-grid">
        <Slider
          label={tr('nwMass')}
          value={state.mass}
          min={MASS_RANGE.min}
          max={MASS_RANGE.max}
          step={MASS_RANGE.step}
          display={`${state.mass} kg`}
          onChange={(mass) => change({ mass })}
        />
        <Slider
          label={tr('nwForce')}
          value={state.force}
          min={FORCE_RANGE.min}
          max={FORCE_RANGE.max}
          step={FORCE_RANGE.step}
          display={`${state.force} N`}
          onChange={(force) => change({ force })}
        />
        {state.layout === 'incline' && (
          <Slider
            label={tr('nwAngle')}
            value={state.angleDeg}
            min={ANGLE_RANGE.min}
            max={ANGLE_RANGE.max}
            step={ANGLE_RANGE.step}
            display={`${state.angleDeg}°`}
            onChange={(angleDeg) => change({ angleDeg })}
          />
        )}
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{tr('nwSurface')}</span>
          <Seg<Surface>
            label={tr('nwSurface')}
            value={state.surface}
            onChange={(surface) => change({ surface })}
            options={[
              { value: 'frictionless', label: tr('nwFrictionless') },
              { value: 'wood', label: tr('nwWood') },
              { value: 'rough', label: tr('nwRough') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{tr('nwLayout')}</span>
          <Seg<Layout>
            label={tr('nwLayout')}
            value={state.layout}
            onChange={(layout) => change({ layout })}
            options={[
              { value: 'flat', label: tr('nwFlat') },
              { value: 'incline', label: tr('nwIncline') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{tr('nwShowForces')}</span>
          <Seg<boolean>
            label={tr('nwShowForces')}
            value={state.showForces}
            onChange={(showForces) => set({ showForces })}
            options={[
              { value: false, label: tr('rfOff') },
              { value: true, label: tr('rfOn') },
            ]}
          />
        </div>
      </div>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set(state.t >= RUN_END ? { v: 0, x: 0, t: 0, playing: true } : { playing: !state.playing })}>
          {state.playing ? `❚❚ ${tr('moPause')}` : `▶ ${tr('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ v: 0, x: 0, t: 0, playing: false })}>
          ↺ {tr('moRestart')}
        </button>
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

function NewtonReadout({ state, t: tr }: { state: NewtonSimState; t: (k: UiKey) => string }) {
  const p = paramsOf(state)
  const r = solveFromRest(p)
  const { muS, muK } = SURFACES[p.surface]
  const moving = state.v !== 0
  const a = moving ? accelWhileMoving(p, state.v) : r.a
  const friction = moving ? -Math.sign(state.v) * muK * r.normal : r.friction
  const regime = moving ? 'kinetic' : r.regime
  const incline = p.layout === 'incline'
  const dirWord = (val: number): string =>
    Math.abs(val) < 1e-9 ? '' : val > 0 ? ` (${incline ? tr('nwUpSlope') : tr('nwRight')})` : ` (${incline ? tr('nwDownSlope') : tr('nwLeft')})`
  const net = p.mass * a
  return (
    <div className="m2-result" aria-live="polite">
      <span>
        {tr('nwWeight')} W = mg = <b data-testid="nw-W">{fx(r.weight, 1)} N</b> · {tr('nwNormal')} N = mg cos θ ={' '}
        <b data-testid="nw-N">{fx(r.normal, 1)} N</b>
      </span>
      {incline && (
        <span>
          mg sin θ = <b data-testid="nw-wslope">{fx(r.alongSlope, 1)} N</b> · T = F − mg sin θ = <b data-testid="nw-T">{fx(r.drive, 1)} N</b>
        </span>
      )}
      <span>
        {tr('nwFriction')} f ({regime === 'static' ? tr('nwStatic') : tr('nwKinetic')}) = <b data-testid="nw-f">{fx(Math.abs(friction), 1)} N</b>
        {dirWord(friction)}
      </span>
      <span className="faint">
        μs = {muS.toFixed(2)} · μk = {muK.toFixed(2)} · μsN = <b data-testid="nw-maxstatic">{fx(r.maxStatic, 1)} N</b>
      </span>
      <span>
        {tr('nwNet')} = <b data-testid="nw-net">{fx(net, 1)} N</b> · a = <b data-testid="nw-a">{fx(Math.abs(a), 2)} m/s²</b>
        {dirWord(a)}
      </span>
      <span>
        v = <b data-testid="nw-v">{fx(Math.abs(state.v), 2)} m/s</b>
        {dirWord(state.v)} · {tr('nwMoved')} = <b data-testid="nw-x">{fx(state.x, 1)} m</b> · t = {fx(state.t, 1)} s
      </span>
      <span className="faint">
        {tr('nwThird')}: N′ = <b data-testid="nw-react">{fx(reactionOfNormal(r), 1)} N</b>
      </span>
      <span className="faint">
        {regime === 'static' ? tr('nwNoteStatic') : tr('nwNoteKinetic')} g = 9.8 m/s²
      </span>
    </div>
  )
}

const def: SimDef<NewtonSimState> = {
  initial: { mass: 5, force: 30, surface: 'wood', layout: 'flat', angleDeg: 30, showForces: true, v: 0, x: 0, t: 0, playing: false },
  camera: { camZ: 13, zoom2D: 46 },
  notToScale: false,
  Scene: ({ state, is2D }) => {
    const p = paramsOf(state)
    const r = solveFromRest(p)
    const moving = state.v !== 0
    const { muK } = SURFACES[p.surface]
    const friction = moving ? -Math.sign(state.v) * muK * r.normal : r.friction
    return (
      <NewtonScene
        angleRad={(angleOf(p) * Math.PI) / 180}
        incline={p.layout === 'incline'}
        x={state.x}
        weight={r.weight}
        normal={r.normal}
        applied={p.force}
        friction={friction}
        showForces={state.showForces}
        is2D={is2D}
      />
    )
  },
  Controls: NewtonControls,
  legend: (_s, t) => [
    { color: NEWTON_COLORS.weight, label: t('nwLegendW') },
    { color: NEWTON_COLORS.normal, label: t('nwLegendN') },
    { color: NEWTON_COLORS.applied, label: t('nwLegendF') },
  ],
  readout: (state, t) => <NewtonReadout state={state} t={t} />,
}

export default makeSimHost(def)
