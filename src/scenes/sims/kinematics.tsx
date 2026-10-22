import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  A_RANGE,
  DROP_HEIGHT_RANGE,
  G,
  V0_RANGE,
  X0_RANGE,
  areaUnderV,
  duration,
  effectiveAccel,
  kinState,
  maxHeight,
  sample,
  timeToTop,
  turningTime,
  velocity,
} from '../../sims/kinematics'
import type { KinMode, KinParams } from '../../sims/kinematics'
import { KIN_COLORS, KinematicsScene } from './KinematicsScene'
import { PhysPlot } from './PhysPlot'
import { fx, niceStep, ticksBetween } from './physUtil'
import { useTicker } from './useTicker'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface KinSimState {
  mode: KinMode
  x0: number // m (track modes)
  v0: number // m/s (track modes)
  a: number // m/s² (accelerated)
  h0: number // m, start height (free fall)
  vUp: number // m/s, thrown upward (free fall)
  t: number
  playing: boolean
}

const toParams = (s: KinSimState): KinParams =>
  s.mode === 'freefall' ? { mode: 'freefall', x0: s.h0, v0: s.vUp, a: 0 } : { mode: s.mode, x0: s.x0, v0: s.v0, a: s.a }

function KinControls({ state, set }: { state: KinSimState; set: (p: Partial<KinSimState>) => void }) {
  const { t: tr } = useLang()
  const ref = useRef(state)
  ref.current = state
  const params = toParams(state)
  const dur = duration(params)

  useTicker(state.playing, (dt) => {
    const s = ref.current
    const end = duration(toParams(s))
    const t = Math.min(s.t + dt, end)
    ref.current = { ...s, t }
    set(t >= end ? { t, playing: false } : { t })
  })

  // a changed model restarts the run so graphs, car and readouts always agree
  const change = (patch: Partial<KinSimState>) => set({ ...patch, t: 0, playing: false })
  const finished = state.t >= dur
  const free = state.mode === 'freefall'

  const autoRepeat = useAutoRepeat(finished, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
      <div className="ctl-row">
        <Seg<KinMode>
          label={tr('knMode')}
          value={state.mode}
          onChange={(mode) => change({ mode })}
          options={[
            { value: 'uniform', label: tr('knUniform') },
            { value: 'accelerated', label: tr('knAccelerated') },
            { value: 'freefall', label: tr('knFreefall') },
          ]}
        />
      </div>
      <div className="m2-grid">
        {free ? (
          <>
            <Slider
              label={tr('knHeight')}
              value={state.h0}
              min={DROP_HEIGHT_RANGE.min}
              max={DROP_HEIGHT_RANGE.max}
              step={1}
              display={`${state.h0} m`}
              onChange={(h0) => change({ h0 })}
            />
            <Slider
              label={tr('knThrowUp')}
              value={state.vUp}
              min={0}
              max={V0_RANGE.max}
              step={0.2}
              display={`${fx(state.vUp, 1)} m/s`}
              onChange={(vUp) => change({ vUp })}
            />
          </>
        ) : (
          <>
            <Slider
              label={tr('knX0')}
              value={state.x0}
              min={X0_RANGE.min}
              max={X0_RANGE.max}
              step={X0_RANGE.step}
              display={`${state.x0} m`}
              onChange={(x0) => change({ x0 })}
            />
            <Slider
              label={tr('knV0')}
              value={state.v0}
              min={V0_RANGE.min}
              max={V0_RANGE.max}
              step={V0_RANGE.step}
              display={`${state.v0} m/s`}
              onChange={(v0) => change({ v0 })}
            />
            <Slider
              label={tr('knAccel')}
              value={state.mode === 'uniform' ? 0 : state.a}
              min={A_RANGE.min}
              max={A_RANGE.max}
              step={A_RANGE.step}
              display={`${state.mode === 'uniform' ? 0 : state.a} m/s²`}
              disabled={state.mode === 'uniform'}
              onChange={(a) => change({ a })}
            />
          </>
        )}
        <Slider
          label={tr('knTime')}
          value={Math.min(state.t, dur)}
          min={0}
          max={Math.max(Math.ceil(dur * 100) / 100, 0.1)}
          step={free ? 0.1 : 0.5}
          display={`${fx(Math.min(state.t, dur), 2)} s`}
          disabled={dur <= 0}
          onChange={(t) => set({ t, playing: false })}
        />
      </div>
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
          disabled={dur <= 0}
          onClick={() => (state.playing ? set({ playing: false }) : set({ playing: true, ...(finished ? { t: 0 } : {}) }))}
        >
          {state.playing ? `❚❚ ${tr('moPause')}` : `▶ ${tr('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ t: 0, playing: false })}>
          ↺ {tr('moRestart')}
        </button>
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

/** Axis range that contains the data (and 0 when asked), on a nice grid, with 3-4 tick values. */
function domain(values: number[], includeZero = true): { dom: [number, number]; ticks: number[] } {
  let lo = Math.min(...values)
  let hi = Math.max(...values)
  if (includeZero) {
    lo = Math.min(lo, 0)
    hi = Math.max(hi, 0)
  }
  const step = niceStep(Math.max(hi - lo, 1e-6), 3)
  lo = Math.floor(lo / step + 1e-9) * step
  hi = Math.ceil(hi / step - 1e-9) * step
  if (hi <= lo) hi = lo + step
  return { dom: [lo, hi], ticks: ticksBetween(lo, hi, step) }
}

function KinGraphs({ state }: { state: KinSimState }) {
  const { t: tr } = useLang()
  const p = toParams(state)
  const dur = Math.max(duration(p), 0.1)
  const all = sample(p, dur, 41)
  const live = sample(p, state.t, 41)
  const now = kinState(p, state.t)
  const xs = domain(all.map((s) => s.x), false)
  const vs = domain(all.map((s) => s.v))
  const tTicks = ticksBetween(0, dur, niceStep(dur, 3))
  const dtSeg = dur * 0.18
  const free = state.mode === 'freefall'
  return (
    <>
      <PhysPlot
        testId="kn-graph-x"
        title={tr('knGraphX')}
        xLabel={tr('knAxisT')}
        yLabel={free ? tr('knAxisY') : tr('knAxisX')}
        xDomain={[0, dur]}
        yDomain={xs.dom}
        xTicks={tTicks}
        yTicks={xs.ticks}
        series={[
          { points: all.map((s): [number, number] => [s.t, s.x]), cls: 'pg-ghost' },
          { points: live.map((s): [number, number] => [s.t, s.x]), cls: 'pg-line' },
        ]}
        segment={[
          [now.t - dtSeg, now.x - now.v * dtSeg],
          [now.t + dtSeg, now.x + now.v * dtSeg],
        ]}
        dot={[now.t, now.x]}
        note={tr('knSlopeNote')}
      />
      <PhysPlot
        testId="kn-graph-v"
        title={tr('knGraphV')}
        xLabel={tr('knAxisT')}
        yLabel={tr('knAxisV')}
        xDomain={[0, dur]}
        yDomain={vs.dom}
        xTicks={tTicks}
        yTicks={vs.ticks}
        series={[
          { points: all.map((s): [number, number] => [s.t, s.v]), cls: 'pg-ghost' },
          { points: live.map((s): [number, number] => [s.t, s.v]), cls: 'pg-line' },
        ]}
        area={[[0, 0], ...live.map((s): [number, number] => [s.t, s.v]), [now.t, 0]]}
        dot={[now.t, now.v]}
        note={tr('knAreaNote')}
      />
    </>
  )
}

function KinReadout({ state, t: tr }: { state: KinSimState; t: (k: UiKey) => string }) {
  const p = toParams(state)
  const s = kinState(p, state.t)
  const free = state.mode === 'freefall'
  const turn = turningTime(p)
  const dur = duration(p)
  const atTop = free && state.t > 0 && state.t < dur && Math.abs(velocity(p, state.t)) < 0.05
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong className="mo-clock">
          {tr('knClock')}: <span data-testid="kn-t">{fx(s.t, 2)} s</span>
        </strong>
        <span>
          {free ? tr('knPosY') : tr('knPosX')} = <b data-testid="kn-x">{fx(s.x, 1)} m</b>
        </span>
        <span>
          v = <b data-testid="kn-v">{fx(s.v, 1)} m/s</b> · a = <b data-testid="kn-a">{fx(effectiveAccel(p), 1)} m/s²</b>
        </span>
        <span>
          {tr('knDisplacement')} = <b data-testid="kn-disp">{fx(s.displacement, 1)} m</b> · {tr('knDistance')} ={' '}
          <b data-testid="kn-dist">{fx(s.distance, 1)} m</b>
        </span>
        <span>
          {tr('knArea')} = <b data-testid="kn-area">{fx(areaUnderV(p, state.t), 1)} m</b>
        </span>
        {free ? (
          <span>
            H = <b data-testid="kn-H">{fx(maxHeight(p.x0, p.v0), 1)} m</b> · {tr('knTimeTop')} ={' '}
            <b data-testid="kn-ttop">{fx(timeToTop(p.v0), 2)} s</b> · {tr('knLanding')} T = <b data-testid="kn-T">{fx(dur, 2)} s</b> ·{' '}
            {tr('knImpact')} = <b data-testid="kn-vimp">{fx(velocity(p, dur), 1)} m/s</b>
          </span>
        ) : (
          turn !== null && (
            <span className="faint">
              {tr('knTurn')}: t = <b data-testid="kn-turn">{fx(turn, 2)} s</b>
            </span>
          )
        )}
        {atTop && (
          <span className="faint">
            {tr('knAtTop')} (g = {G} m/s²)
          </span>
        )}
        <span className="faint">{tr('knNoAir')}</span>
      </div>
      <KinGraphs state={state} />
    </div>
  )
}

const def: SimDef<KinSimState> = {
  initial: { mode: 'uniform', x0: 0, v0: 5, a: 2, h0: 20, vUp: 0, t: 0, playing: false },
  camera: { camZ: 13, zoom2D: 46 },
  notToScale: false,
  Scene: ({ state, is2D }) => <KinematicsScene params={toParams(state)} t={state.t} is2D={is2D} />,
  Controls: KinControls,
  legend: (_s, t) => [
    { color: KIN_COLORS.velocity, label: t('knLegendV') },
    { color: KIN_COLORS.accel, label: t('knLegendA') },
    { color: KIN_COLORS.marks, label: t('knLegendDots') },
  ],
  readout: (state, t) => <KinReadout state={state} t={t} />,
}

export default makeSimHost(def)
