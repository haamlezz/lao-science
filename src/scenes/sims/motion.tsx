import { useEffect } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import { Seg, Slider } from '../../components/Controls'
import { MAX_ACCEL, MAX_SPEED, RUN_SECONDS, motionState, msToKmh } from '../../sims/motion'
import type { MotionMode, MotionParams } from '../../sims/motion'
import { MOTION_COLORS, MotionScene } from './MotionScene'
import { MotionGraph } from './MotionGraph'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface MotionSimState extends MotionParams {
  kmh: boolean // display unit only; the model always works in m/s
  t: number
  playing: boolean
}

const fmt = (n: number, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toFixed(d)
const speedText = (v: number, kmh: boolean) => (kmh ? `${fmt(msToKmh(v))} km/h` : `${fmt(v)} m/s`)

/** Advances t while playing. State patches are merged by the host, so only t/playing are written. */
function useRunClock(state: MotionSimState, set: (p: Partial<MotionSimState>) => void) {
  const { playing } = state
  useEffect(() => {
    if (!playing) return
    let id = 0
    let last = performance.now()
    let t = state.t
    const loop = (now: number) => {
      t = Math.min(t + Math.min((now - last) / 1000, 0.1), RUN_SECONDS)
      last = now
      if (t >= RUN_SECONDS) {
        set({ t: RUN_SECONDS, playing: false })
        return
      }
      set({ t })
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, set])
}

function MotionControls({ state, set }: { state: MotionSimState; set: (p: Partial<MotionSimState>) => void }) {
  const { t: tr } = useLang()
  useRunClock(state, set)
  const accelerating = state.mode === 'accelerating'
  // changing the model restarts the run so the graph and the car always agree
  const change = (patch: Partial<MotionSimState>) => set({ ...patch, t: 0, playing: false })
  const finished = state.t >= RUN_SECONDS

  const autoRepeat = useAutoRepeat(finished, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
      <div className="ctl-row">
        <Seg<MotionMode>
          label={tr('moMode')}
          value={state.mode}
          onChange={(mode) => change({ mode })}
          options={[
            { value: 'uniform', label: tr('moUniform') },
            { value: 'accelerating', label: tr('moAccel') },
          ]}
        />
        <Seg<boolean>
          label={tr('moUnit')}
          value={state.kmh}
          onChange={(kmh) => set({ kmh })}
          options={[
            { value: false, label: 'm/s' },
            { value: true, label: 'km/h' },
          ]}
        />
      </div>
      <div className="m2-grid">
        {accelerating ? (
          <Slider label={tr('moAccelSlider')} value={state.a} min={0} max={MAX_ACCEL} step={0.5} onChange={(a) => change({ a })} />
        ) : (
          <Slider
            label={tr('moSpeed')}
            value={state.v}
            min={0}
            max={MAX_SPEED}
            step={1}
            display={speedText(state.v, state.kmh)}
            onChange={(v) => change({ v })}
          />
        )}
        <Slider
          label={tr('moTime')}
          value={state.t}
          min={0}
          max={RUN_SECONDS}
          step={0.5}
          display={fmt(state.t)}
          onChange={(t) => set({ t, playing: false })}
        />
      </div>
      <div className="ctl-row">
        <button
          type="button"
          className="btn btn-primary"
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

function MotionReadout({ state, t: tr }: { state: MotionSimState; t: ReturnType<typeof useLang>['t'] }) {
  const m = motionState(state, state.t)
  const hint = state.t === 0 && !state.playing ? tr('moPressPlay') : m.finished ? tr('moFinished') : ''
  return (
    <div className="mo-readout">
      <div className="m2-result" aria-live="polite">
        <strong className="mo-clock">
          {tr('moClock')}: {fmt(m.t)} s
        </strong>
        <span>
          {tr('moDistance')} = <b>{fmt(m.s)} m</b>
        </span>
        <span>
          {tr('moSpeedNow')} = <b>{speedText(m.v, state.kmh)}</b>
        </span>
        <span>
          {tr('moAvg')} = {fmt(m.s)} ÷ {fmt(m.t)} = <b>{speedText(m.avg, state.kmh)}</b>
        </span>
        <span className="faint">
          {tr('moTrack')}: {m.window.start}–{m.window.end} m
        </span>
        {hint && <span className="faint">{hint}</span>}
        <span className="faint">{state.mode === 'uniform' ? tr('moUniformNote') : tr('moAccelNote')}</span>
      </div>
      <MotionGraph params={state} t={state.t} />
    </div>
  )
}

const def: SimDef<MotionSimState> = {
  initial: { mode: 'uniform', v: 10, a: 2, kmh: false, t: 0, playing: false },
  camera: { camZ: 17, zoom2D: 40 },
  notToScale: false,
  Scene: ({ state, is2D }) => <MotionScene params={state} t={state.t} is2D={is2D} />,
  Controls: MotionControls,
  legend: (_s, t) => [
    { color: MOTION_COLORS.car, label: t('moLegendCar') },
    { color: MOTION_COLORS.marks, label: t('moLegendMarks') },
  ],
  readout: (state, t) => <MotionReadout state={state} t={t} />,
}

export default makeSimHost(def)
