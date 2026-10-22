import { useEffect } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import {
  CELL_SIZE_UM,
  INSIDE_PERCENT,
  ORGANELLES,
  SOLUTION_PERCENT,
  getOrganelle,
  mayBurst,
  organellesOf,
  outcome,
  waterDirection,
} from '../../sims/cell'
import type { CellType, OrganelleId, Outcome, Solution, TransportCell, WaterDirection } from '../../sims/cell'
import { OrganelleScene, TransportScene } from './CellScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface CellState {
  mode: 'organelles' | 'transport'
  cell: CellType
  selected: OrganelleId | null
  cutaway: boolean
  tCell: TransportCell
  solution: Solution
  /** Bumped by Restart: remounts the osmosis animation. */
  run: number
}

/** The scene lives in a separate renderer and cannot call `set`; Controls registers the picker here. */
let pickHandler: ((id: OrganelleId) => void) | null = null

const CELL_KEY: Record<CellType, UiKey> = { animal: 'ceAnimal', plant: 'cePlant', bacterium: 'ceBacterium' }
const SOL_KEY: Record<Solution, UiKey> = { water: 'ceWater', saline09: 'ceSaline09', saline5: 'ceSaline5' }
const OUT_KEY: Record<Outcome, UiKey> = {
  swells: 'ceSwells',
  shrinks: 'ceShrinks',
  noNetMovement: 'ceNoNet',
  turgid: 'ceTurgid',
  plasmolysed: 'cePlasmolysed',
}
const DIR_KEY: Record<WaterDirection, UiKey> = { in: 'ceDirIn', out: 'ceDirOut', none: 'ceDirNone' }
const BODY = { animal: '#f8bbd0', plant: '#dcedc8', bacterium: '#ffe082' }

function CellControls({ state, set }: { state: CellState; set: (p: Partial<CellState>) => void }) {
  const { t, lang } = useLang()
  useEffect(() => {
    pickHandler = (id) => set({ selected: id })
    return () => {
      pickHandler = null
    }
  }, [set])
  const present = organellesOf(state.cell)
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('ceMode')}</span>
          <Seg<CellState['mode']>
            label={t('ceMode')}
            value={state.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: 'organelles', label: t('ceOrganelles') },
              { value: 'transport', label: t('ceTransport') },
            ]}
          />
        </div>
        {state.mode === 'organelles' ? (
          <div className="m2-slider">
            <span>{t('ceCellType')}</span>
            <Seg<CellType>
              label={t('ceCellType')}
              value={state.cell}
              onChange={(cell) =>
                set({ cell, selected: state.selected && organellesOf(cell).some((o) => o.id === state.selected) ? state.selected : null })
              }
              options={(['animal', 'plant', 'bacterium'] as CellType[]).map((c) => ({ value: c, label: t(CELL_KEY[c]) }))}
            />
          </div>
        ) : (
          <div className="m2-slider">
            <span>{t('ceCellType')}</span>
            <Seg<TransportCell>
              label={t('ceCellType')}
              value={state.tCell}
              onChange={(tCell) => set({ tCell, run: state.run + 1 })}
              options={[
                { value: 'animal', label: t('ceTAnimal') },
                { value: 'plant', label: t('ceTPlant') },
              ]}
            />
          </div>
        )}
      </div>

      {state.mode === 'organelles' ? (
        <>
          <div className="m2-slider">
            <span>{t('ceStructure')}</span>
            <div className="ce-picker">
              {present.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`btn btn-tool ${state.selected === o.id ? 'on' : ''}`}
                  aria-pressed={state.selected === o.id}
                  onClick={() => set({ selected: state.selected === o.id ? null : o.id })}
                >
                  {o.name[lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="m2-slider">
            <span>{t('ceCutaway')}</span>
            <Seg<boolean>
              label={t('ceCutaway')}
              value={state.cutaway}
              onChange={(cutaway) => set({ cutaway })}
              options={[
                { value: false, label: t('rfOff') },
                { value: true, label: t('rfOn') },
              ]}
            />
          </div>
        </>
      ) : (
        <>
          <div className="m2-slider">
            <span>{t('ceSolution')}</span>
            <Seg<Solution>
              label={t('ceSolution')}
              value={state.solution}
              onChange={(solution) => set({ solution, run: state.run + 1 })}
              options={(['water', 'saline09', 'saline5'] as Solution[]).map((s) => ({ value: s, label: t(SOL_KEY[s]) }))}
            />
          </div>
          <div className="ctl-row">
            <button type="button" className="btn btn-primary" onClick={() => set({ run: state.run + 1 })}>
              ↺ {t('moRestart')}
            </button>
          </div>
        </>
      )}
    </>
  )
}

function CellReadout({ state, t }: { state: CellState; t: (k: UiKey) => string }) {
  const { lang } = useLang()
  if (state.mode === 'organelles') {
    const present = organellesOf(state.cell)
    const absent = ORGANELLES.filter((o) => !o.presentIn[state.cell] && (o.id !== 'nucleoid' || state.cell === 'bacterium'))
    const sel = state.selected ? getOrganelle(state.selected) : null
    return (
      <div className="m2-result ce-readout" aria-live="polite">
        {sel ? (
          <>
            <span data-testid="ce-name">
              <b>{sel.name[lang]}</b>
            </span>
            <span data-testid="ce-fn">
              {t('ceFunction')}: {sel.fn[lang]}
            </span>
            <span data-testid="ce-size">
              {t('ceSize')}: {sel.sizeUm} µm
            </span>
          </>
        ) : (
          <span className="faint">{t('ceNoSelection')}</span>
        )}
        <span data-testid="ce-count">
          {t('ceCount')} ({t(CELL_KEY[state.cell])}): <b>{present.length}</b> · {t('ceCellSize')} ≈ {CELL_SIZE_UM[state.cell]} µm
        </span>
        <span data-testid="ce-absent">
          {t('ceAbsent')}: {absent.length === 0 ? '–' : absent.map((o) => o.name[lang].replace(/ \(.*\)$/, '')).join(', ')}
        </span>
        <span className="faint">{t('ceNote')}</span>
      </div>
    )
  }
  const out = outcome(state.tCell, state.solution)
  const dir = waterDirection(state.tCell, state.solution)
  return (
    <div className="m2-result ce-readout" aria-live="polite">
      <span data-testid="ce-conc">
        {t('ceOutside')}: <b>{SOLUTION_PERCENT[state.solution]} %</b> NaCl · {t('ceInside')}: <b>{INSIDE_PERCENT[state.tCell]} %</b>
      </span>
      <span data-testid="ce-dir">
        {t('ceMoves')}: {t(DIR_KEY[dir])}
      </span>
      <span data-testid="ce-outcome">
        {t('ceResult')}: <b>{t(OUT_KEY[out])}</b>
      </span>
      {mayBurst(state.tCell, state.solution) && <span className="faint">{t('ceBurst')}</span>}
      {state.tCell === 'plant' && out === 'turgid' && <span className="faint">{t('ceWallNote')}</span>}
      <span className="faint">{t('ceNote')}</span>
    </div>
  )
}

const def: SimDef<CellState> = {
  initial: { mode: 'organelles', cell: 'animal', selected: null, cutaway: true, tCell: 'animal', solution: 'water', run: 0 },
  camera: { camZ: 10.5, zoom2D: 43 },
  notToScale: true,
  Scene: ({ state: s }) =>
    s.mode === 'organelles' ? (
      <OrganelleScene type={s.cell} selected={s.selected} cutaway={s.cutaway} onPick={(id) => pickHandler?.(id)} />
    ) : (
      <TransportScene cell={s.tCell} solution={s.solution} run={s.run} />
    ),
  Controls: CellControls,
  legend: (s, t) =>
    s.mode === 'organelles'
      ? [
          { color: '#ffeb3b', label: t('ceLegPicked') },
          { color: BODY[s.cell], label: t('ceLegCell') },
        ]
      : [
          { color: '#29b6f6', label: t('ceLegWater') },
          { color: '#ffd54f', label: t('ceLegSalt') },
          { color: s.tCell === 'plant' ? '#a5d6a7' : '#ef9a9a', label: t('ceLegCell') },
        ],
  readout: (s, t) => <CellReadout state={s} t={t} />,
}

export default makeSimHost(def)
