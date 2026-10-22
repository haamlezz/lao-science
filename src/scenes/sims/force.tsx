import { useLang } from '../../i18n/LangContext'
import { Seg, Slider } from '../../components/Controls'
import { ForceScene, FORCE_COLORS } from '../ForceScene'
import { acceleration, gravity, netForce, weight } from '../../sims/force'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface ForceState {
  same: boolean
  f1: number
  f2: number
  mass: number
  moon: boolean
  runKey: number // bumped by "Reset" to restart the crate
  autoRepeat: boolean
}

function ForceControls({
  state,
  set,
  reset,
}: {
  state: ForceState
  set: (p: Partial<ForceState>) => void
  reset: () => void
}) {
  const { t } = useLang()
  const { same, f1, f2, mass, moon } = state
  const net = netForce(f1, f2, same)
  const g = gravity(moon)
  const w = weight(mass, g)
  return (
    <>
      <div className="ctl-row">
        <Seg
          value={same}
          onChange={(v) => set({ same: v })}
          options={[
            { value: false, label: t('fModeOpp') },
            { value: true, label: t('fModeSame') },
          ]}
        />
        <button type="button" className="btn btn-ghost" onClick={() => {
            reset() // all controls + camera, like the R key
            set({ runKey: state.runKey + 1 }) // and restart the crate
          }}>
          ↺ {t('simReset')}
        </button>
        <span className="faint">{t('fNoFriction')}</span>
        <label className="auto-repeat">
          <input type="checkbox" checked={state.autoRepeat} onChange={(e) => set({ autoRepeat: e.target.checked })} />
          <span>↻ {t('autoRepeat')}</span>
        </label>
      </div>
      <div className="m2-grid">
        <Slider label={t('fF1')} value={f1} min={0} max={40} step={5} onChange={(v) => set({ f1: v })} />
        <Slider label={t('fF2')} value={f2} min={0} max={40} step={5} onChange={(v) => set({ f2: v })} />
        <Slider label={t('fMass')} value={mass} min={1} max={10} step={1} onChange={(v) => set({ mass: v })} />
      </div>
      <div className="m2-result" aria-live="polite">
        <strong>
          {t('fNet')}: {Math.abs(net)} N {net > 0 ? t('fRight') : net < 0 ? t('fLeft') : ''}
        </strong>
        <span>
          {same ? `F₁ + F₂ = ${f1} + ${f2}` : `F₂ − F₁ = ${f2} − ${f1}`} = {net} N
        </span>
        <span>{net === 0 ? t('fBalanced') : t('fUnbalanced')}</span>
        <span className="faint">
          {t('fAccel')} = {Math.abs(net)} ÷ {mass} = {acceleration(net, mass).toFixed(1)} m/s²
        </span>
      </div>
      <div className="m2-result">
        <strong>{t('fWeightTitle')}</strong>
        <Seg
          label={t('fWhere')}
          value={moon}
          onChange={(v) => set({ moon: v })}
          options={[
            { value: false, label: t('fEarth') },
            { value: true, label: t('fMoon') },
          ]}
        />
        <span>
          {t('fWeight')} = {mass} × {g} = <b>{w} N</b> · {t('fMass')} = {mass} kg
        </span>
        <span className="faint">{t('fWeightNote')}</span>
      </div>
    </>
  )
}

const def: SimDef<ForceState> = {
  initial: { same: false, f1: 30, f2: 30, mass: 5, moon: false, runKey: 0, autoRepeat: false },
  camera: { camZ: 13, zoom2D: 52 },
  notToScale: true,
  ownReset: true,
  Scene: ({ state: s }) => (
    <ForceScene
      key={s.runKey}
      f1={s.f1}
      f2={s.f2}
      same={s.same}
      mass={s.mass}
      weight={weight(s.mass, gravity(s.moon))}
      autoRepeat={s.autoRepeat}
    />
  ),
  Controls: ForceControls,
  legend: (_s, t) => [
    { color: FORCE_COLORS.f1, label: 'F₁' },
    { color: FORCE_COLORS.f2, label: 'F₂' },
    { color: FORCE_COLORS.net, label: t('fNet') },
    { color: FORCE_COLORS.weight, label: 'W' },
  ],
}

export default makeSimHost(def)
