import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import {
  CHAINS,
  MAX_ENERGY_KJ,
  MIN_ENERGY_KJ,
  RICE_WEB,
  energyAtLevel,
  percentOfProducer,
  removalEffects,
} from '../../sims/foodweb'
import type { Effect, FoodGraph } from '../../sims/foodweb'
import { EFFECT_COLORS, FoodwebScene, LEVEL_COLORS } from './FoodwebScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type ChainKey = 'rice-field' | 'pond' | 'web'

interface FoodwebState {
  chain: ChainKey
  e0: number
  removed: string[]
}

const graphOf = (k: ChainKey): FoodGraph => (k === 'web' ? RICE_WEB : (CHAINS[k] as FoodGraph))
const ENERGIES = [MIN_ENERGY_KJ, 10000, MAX_ENERGY_KJ]
const num = (n: number) => (n >= 1 ? n.toLocaleString('en-US').replace(/,/g, ' ') : String(n))

const EFFECT_KEY: Record<Effect, UiKey> = {
  up: 'fwUp',
  down: 'fwDown',
  removed: 'fwRemoved',
  none: 'fwNoChange',
}
const EFFECT_MARK: Record<Effect, string> = { up: '↑', down: '↓', removed: '✕', none: '–' }

function FoodwebControls({
  state,
  set,
  reset,
}: {
  state: FoodwebState
  set: (p: Partial<FoodwebState>) => void
  reset: () => void
}) {
  const { t, lang } = useLang()
  const g = graphOf(state.chain)
  const toggle = (id: string) =>
    set({ removed: state.removed.includes(id) ? state.removed.filter((r) => r !== id) : [...state.removed, id] })
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('fwChain')}</span>
          <Seg<ChainKey>
            label={t('fwChain')}
            value={state.chain}
            onChange={(chain) => set({ chain, removed: [] })}
            options={[
              { value: 'rice-field', label: t('fwRice') },
              { value: 'pond', label: t('fwPond') },
              { value: 'web', label: t('fwWeb') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('fwEnergy')}</span>
          <Seg<number>
            label={t('fwEnergy')}
            value={state.e0}
            onChange={(e0) => set({ e0 })}
            options={ENERGIES.map((e) => ({ value: e, label: `${num(e)} kJ` }))}
          />
        </div>
      </div>
      <div className="m2-slider">
        <span>{t('fwRemove')}</span>
        <div className="fw-remove">
          {g.organisms.map((o) => {
            const on = state.removed.includes(o.id)
            return (
              <button
                key={o.id}
                type="button"
                className={`btn btn-tool ${on ? 'on' : ''}`}
                aria-pressed={on}
                onClick={() => toggle(o.id)}
              >
                {o.name[lang]}
              </button>
            )
          })}
          <button type="button" className="btn btn-tool" onClick={reset}>
            {t('fwReset')}
          </button>
        </div>
      </div>
    </>
  )
}

function FoodwebReadout({ state, t }: { state: FoodwebState; t: (k: UiKey) => string }) {
  const { lang } = useLang()
  const g = graphOf(state.chain)
  const effects = removalEffects(g, state.removed)
  const top = Math.max(...g.organisms.map((o) => o.level))
  const rows = [...g.organisms].sort((a, b) => a.level - b.level)
  return (
    <div className="m2-result" aria-live="polite">
      <table className="fw-table">
        <thead>
          <tr>
            <th>{t('fwOrganism')}</th>
            <th>{t('fwLevel')}</th>
            <th>{t('fwEnergyCol')}</th>
            <th>{t('fwEffect')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => {
            const eff = effects[o.id] ?? 'none'
            return (
              <tr key={o.id} data-effect={eff}>
                <td>
                  <i style={{ background: LEVEL_COLORS[(o.level - 1) % LEVEL_COLORS.length] }} /> {o.name[lang]}
                </td>
                <td>{o.level}</td>
                <td data-testid={`fw-e-${o.id}`}>
                  {num(energyAtLevel(state.e0, o.level))} kJ ({percentOfProducer(o.level)} %)
                </td>
                <td
                  style={{ color: eff === 'up' || eff === 'down' ? EFFECT_COLORS[eff] : undefined }}
                  data-testid={`fw-fx-${o.id}`}
                >
                  {EFFECT_MARK[eff]} {t(EFFECT_KEY[eff])}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <span data-testid="fw-top">
        {t('fwTop')}: {percentOfProducer(top)} % ({num(energyAtLevel(state.e0, top))} kJ)
      </span>
      <span className="faint">{t('fwNote10')}</span>
      {state.removed.length > 0 && <span className="faint">{t('fwLater')}</span>}
    </div>
  )
}

const def: SimDef<FoodwebState> = {
  initial: { chain: 'rice-field', e0: 10000, removed: [] },
  camera: { camZ: 13, zoom2D: 54 },
  notToScale: true,
  ownReset: true,
  Scene: ({ state: s }) => (
    <FoodwebScene graph={graphOf(s.chain)} e0={s.e0} effects={removalEffects(graphOf(s.chain), s.removed)} />
  ),
  Controls: FoodwebControls,
  legend: (_s, t) => [
    { color: EFFECT_COLORS.up, label: `↑ ${t('fwUp')}` },
    { color: EFFECT_COLORS.down, label: `↓ ${t('fwDown')}` },
    { color: '#8d6e63', label: t('fwDecomposers') },
  ],
  readout: (s, t) => <FoodwebReadout state={s} t={t} />,
}

export default makeSimHost(def)
