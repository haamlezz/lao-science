import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import { HALF_CELLS, METALS, buildCell, reading } from '../../sims/electrochem'
import type { Metal } from '../../sims/electrochem'
import { EC_COLORS, ElectrochemScene } from './ElectrochemScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'
import { useTicker } from './useTicker'

interface EcState {
  left: Metal
  right: Metal
  closed: boolean
  playing: boolean
  t: number // seconds of running time
}

const sign = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2)}`
const EC_END = 115 // progress 1 - exp(-t/25) reaches 99 %
const progressOf = (t: number) => 1 - Math.exp(-t / 25)

function EcControls({ state, set }: { state: EcState; set: (p: Partial<EcState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing && state.closed, (dt) => {
    const next = Math.min(ref.current.t + dt * 4, EC_END)
    ref.current = { ...ref.current, t: next }
    set(next >= EC_END ? { t: next, playing: false } : { t: next })
  })
  const opts = METALS.map((m) => ({ value: m, label: m }))
  // choosing the metal that the other side uses swaps the sides, so the two metals always differ
  const pickLeft = (m: Metal) => set(m === state.right ? { left: m, right: state.left, t: 0 } : { left: m, t: 0 })
  const pickRight = (m: Metal) => set(m === state.left ? { right: m, left: state.right, t: 0 } : { right: m, t: 0 })
  const autoRepeat = useAutoRepeat(state.t >= EC_END, state.playing, () => set({ t: 0, playing: true }))
  return (
    <>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set(state.t >= EC_END ? { t: 0, playing: true } : { playing: !state.playing })}>
          {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${t('moPlay')}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ t: 0, playing: false })}>
          ↺ {t('moRestart')}
        </button>
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('ecLeft')}</span>
          <Seg<Metal> label={t('ecLeft')} value={state.left} onChange={pickLeft} options={opts} />
        </div>
        <div className="m2-slider">
          <span>{t('ecRight')}</span>
          <Seg<Metal> label={t('ecRight')} value={state.right} onChange={pickRight} options={opts} />
        </div>
        <div className="m2-slider">
          <span>{t('ecCircuit')}</span>
          <Seg<boolean>
            label={t('ecCircuit')}
            value={state.closed}
            onChange={(closed) => set({ closed })}
            options={[
              { value: true, label: t('ecClosed') },
              { value: false, label: t('ecOpen') },
            ]}
          />
        </div>
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

function EcReadout({ s, t }: { s: EcState; t: (k: UiKey) => string }) {
  const cell = buildCell(s.left, s.right)
  const r = reading(cell, s.closed)
  const A = HALF_CELLS[cell.anode]
  const C = HALF_CELLS[cell.cathode]
  return (
    <div className="m2-result" aria-live="polite">
      <strong>
        E°<sub>cell</sub> = E°<sub>{t('ecCathodeSub')}</sub> − E°<sub>{t('ecAnodeSub')}</sub> = {sign(C.E)} − ({sign(A.E)}) ={' '}
        <span data-testid="ec-emf">{r.volts.toFixed(2)} V</span>
      </strong>
      <span>
        {t('ecAnode')} (−): <span data-testid="ec-anode">{cell.anode}</span> · {cell.anodeHalf}
      </span>
      <span>
        {t('ecCathode')} (+): <span data-testid="ec-cathode">{cell.cathode}</span> · {cell.cathodeHalf}
      </span>
      <span data-testid="ec-overall">
        {cell.overall} · {cell.notation.split('||').map((x) => x.replace(/\|/g, ' | ')).join(' ‖ ')}
      </span>
      <span className="faint">
        {r.openCircuit ? t('ecOpenNote') : t('ecFlow')} · {t('ecTextbook')}
      </span>
    </div>
  )
}

const def: SimDef<EcState> = {
  initial: { left: 'Zn', right: 'Cu', closed: true, playing: false, t: 0 },
  camera: { camZ: 11, zoom2D: 42 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const cell = buildCell(s.left, s.right)
    return (
      <ElectrochemScene
        left={s.left}
        right={s.right}
        anode={cell.anode}
        emf={cell.emf}
        closed={s.closed}
        running={s.playing}
        progress={progressOf(s.t)}
      />
    )
  },
  Controls: EcControls,
  legend: (_s, t) => [
    { color: EC_COLORS.electron, label: t('ecLegendElectron') },
    { color: EC_COLORS.cation, label: t('ecLegendCation') },
    { color: EC_COLORS.anion, label: t('ecLegendAnion') },
  ],
  readout: (s, t) => <EcReadout s={s} t={t} />,
}

export default makeSimHost(def)
