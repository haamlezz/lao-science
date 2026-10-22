import { useRef } from 'react'
import { useAutoRepeat } from '../../components/AutoRepeat'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import {
  IONIC,
  MOLECULES,
  SHELLS,
  bondClassOf,
  centralElectrons,
  deltaEN,
  findMolecule,
  ionCharge,
  ionShells,
  sharedPairs,
} from '../../sims/bonding'
import type { BondClass, Geometry } from '../../sims/bonding'
import { BOND_COLORS, BondingScene } from './BondingScene'
import type { BondType, BondView } from './BondingScene'
import { ionLabel } from './chemShared'
import { makeSimHost } from './host'
import type { SimDef } from './host'
import { useTicker } from './useTicker'

interface BondState {
  type: BondType
  compound: string
  view: BondView
  p: number // transfer / sharing progress 0..1
  playing: boolean
}

const TYPES: { value: BondType; key: UiKey }[] = [
  { value: 'ionic', key: 'bdIonic' },
  { value: 'covalent', key: 'bdCovalent' },
  { value: 'metallic', key: 'bdMetallic' },
]
const VIEWS: { value: BondView; key: UiKey }[] = [
  { value: 'shells', key: 'bdShells' },
  { value: 'electron-dot', key: 'bdDots' },
  { value: 'ball-and-stick', key: 'bdBall' },
]
const DEFAULT_COMPOUND: Record<BondType, string> = { ionic: 'NaCl', covalent: 'H₂O', metallic: 'Na' }
const CLASS_KEY: Record<BondClass, UiKey> = {
  ionic: 'bdClassIonic',
  'polar covalent': 'bdClassPolar',
  'non-polar covalent': 'bdClassNonPolar',
}
const GEO_KEY: Record<Geometry, UiKey> = {
  linear: 'bdGeoLinear',
  bent: 'bdGeoBent',
  'trigonal pyramidal': 'bdGeoPyramid',
  tetrahedral: 'bdGeoTetra',
}

const shellStr = (s: number[]) => `(${s.join(', ')})`

function BondControls({ state, set }: { state: BondState; set: (p: Partial<BondState>) => void }) {
  const { t } = useLang()
  const ref = useRef(state)
  ref.current = state
  useTicker(state.playing, (dt) => {
    const next = Math.min(ref.current.p + dt / 3, 1)
    ref.current = { ...ref.current, p: next }
    set(next >= 1 ? { p: 1, playing: false } : { p: next })
  })
  const compounds =
    state.type === 'ionic' ? IONIC.map((c) => c.formula) : state.type === 'covalent' ? MOLECULES.map((m) => m.formula) : []
  const label = state.type === 'ionic' ? t('bdPlayIonic') : t('bdPlayCovalent')
  const autoRepeat = useAutoRepeat(state.p >= 1, state.playing, () => set({ p: 0, playing: true }))
  return (
    <>
      {state.type !== 'metallic' && (
        <div className="ctl-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (state.playing ? set({ playing: false }) : set({ playing: true, ...(state.p >= 1 ? { p: 0 } : {}) }))}
          >
            {state.playing ? `❚❚ ${t('moPause')}` : `▶ ${label}`}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => set({ p: 0, playing: false })}>
            ↺ {t('moRestart')}
          </button>
        </div>
      )}
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('bdType')}</span>
          <Seg<BondType>
            label={t('bdType')}
            value={state.type}
            onChange={(type) => set({ type, compound: DEFAULT_COMPOUND[type], p: 0, playing: false, view: type === 'covalent' ? 'electron-dot' : 'shells' })}
            options={TYPES.map((x) => ({ value: x.value, label: t(x.key) }))}
          />
        </div>
        {compounds.length > 0 && (
          <div className="m2-slider">
            <span>{t('bdCompound')}</span>
            <Seg<string>
              label={t('bdCompound')}
              value={state.compound}
              onChange={(compound) => set({ compound, p: 0, playing: false })}
              options={compounds.map((c) => ({ value: c, label: c }))}
            />
          </div>
        )}
        {state.type !== 'metallic' && (
          <div className="m2-slider">
            <span>{t('bdView')}</span>
            <Seg<BondView>
              label={t('bdView')}
              value={state.view}
              onChange={(view) => set({ view })}
              options={VIEWS.map((x) => ({ value: x.value, label: t(x.key) }))}
            />
          </div>
        )}
      </div>
      <div className="ctl-row">{autoRepeat}</div>
    </>
  )
}

function IonicReadout({ compound, t }: { compound: string; t: (k: UiKey) => string }) {
  const c = IONIC.find((x) => x.formula === compound) ?? IONIC[0]
  const q = ionCharge(c.cation)
  const a = -ionCharge(c.anion)
  const d = deltaEN(c.cation, c.anion)
  return (
    <div className="m2-result" aria-live="polite">
      <strong data-testid="bd-ions">
        {c.cation} {shellStr(SHELLS[c.cation])} → {ionLabel(c.cation, q)} {shellStr(ionShells(c.cation))} + {q}e⁻
      </strong>
      <span>
        {c.anion} {shellStr(SHELLS[c.anion])} + {a}e⁻ → {ionLabel(c.anion, -a)} {shellStr(ionShells(c.anion))}
      </span>
      <span>
        {t('bdRatio')} {c.cations} : {c.anions} · {t('bdCharge')}: (+{q}) × {c.cations} + (−{a}) × {c.anions} = 0
      </span>
      <span>
        ΔEN({c.cation}–{c.anion}) = <b data-testid="bd-den">{d.toFixed(2)}</b> → <b>{t(CLASS_KEY[bondClassOf(c.cation, c.anion)])}</b>
      </span>
    </div>
  )
}

function CovalentReadout({ compound, t }: { compound: string; t: (k: UiKey) => string }) {
  const m = MOLECULES.find((x) => x.formula === compound) ?? findMolecule(DEFAULT_COMPOUND.covalent) // stale compound from the previous bond type: use the default
  const term = m.terminals[0].symbol
  const d = deltaEN(m.central, term)
  const lone = m.lonePairsOnCentral
  return (
    <div className="m2-result" aria-live="polite">
      <strong>
        {m.formula} · {t('bdShared')}: <b data-testid="bd-pairs">{sharedPairs(m)}</b> · {t('bdLone')}: {lone} ·{' '}
        {centralElectrons(m)} e⁻ {t('bdAroundCentral')} {m.central}
      </strong>
      <span>
        {t('bdShape')}: <b>{t(GEO_KEY[m.geometry])}</b>
        {m.angle !== null && (
          <>
            {' '}
            · {term}–{m.central}–{term} = <b data-testid="bd-angle">{m.angle}°</b>
          </>
        )}
      </span>
      <span>
        ΔEN({m.central}–{term}) = <b data-testid="bd-den">{d.toFixed(2)}</b> → <b>{t(CLASS_KEY[bondClassOf(m.central, term)])}</b> ·{' '}
        {m.polar ? t('bdMolPolar') : t('bdMolNonPolar')}
      </span>
    </div>
  )
}

function BondReadout({ s, t }: { s: BondState; t: (k: UiKey) => string }) {
  return (
    <div className="mo-readout">
      {s.type === 'ionic' && <IonicReadout compound={s.compound} t={t} />}
      {s.type === 'covalent' && <CovalentReadout compound={s.compound} t={t} />}
      {s.type === 'metallic' && (
        <div className="m2-result" aria-live="polite">
          <strong>
            {ionLabel('Na', 1)} {shellStr(ionShells('Na'))} · {t('bdMetalText')}
          </strong>
        </div>
      )}
      <p className="faint">{t('bdRule')}</p>
    </div>
  )
}

const def: SimDef<BondState> = {
  initial: { type: 'ionic', compound: 'NaCl', view: 'shells', p: 0, playing: false },
  camera: { camZ: 10.5, zoom2D: 44 },
  notToScale: true,
  Scene: ({ state: s }) => <BondingScene type={s.type} compound={s.compound} view={s.view} p={s.p} />,
  Controls: BondControls,
  legend: (s, t) =>
    s.type === 'covalent'
      ? [
          { color: BOND_COLORS.electron, label: t('bdLegendOwn') },
          { color: BOND_COLORS.shared, label: t('bdLegendShared') },
        ]
      : s.type === 'ionic'
        ? [
            { color: BOND_COLORS.electron, label: t('bdLegendOwn') },
            { color: BOND_COLORS.shared, label: t('bdLegendMoving') },
            { color: BOND_COLORS.cation, label: t('bdLegendCation') },
          ]
        : [
            { color: BOND_COLORS.cation, label: t('bdLegendCation') },
            { color: BOND_COLORS.electron, label: t('bdLegendSea') },
          ],
  readout: (s, t) => <BondReadout s={s} t={t} />,
}

export default makeSimHost(def)
