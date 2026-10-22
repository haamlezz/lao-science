import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg } from '../../components/Controls'
import {
  fraction,
  fractionText,
  fractionValue,
  genotypeRatio,
  phenotypeRatio,
  punnett,
  ratioOf,
  simulateOffspring,
  simulateSex,
} from '../../sims/genetics'
import type { Punnett, RatioEntry } from '../../sims/genetics'
import { GEN_COLORS, GeneticsScene } from './GeneticsScene'
import type { CrossKind } from './GeneticsScene'
import { makeSimHost } from './host'
import type { SimDef } from './host'

type Zyg = 'D' | 'H' | 'R'
type Trait = 'height' | 'seed'

interface GenState {
  kind: CrossKind
  trait: Trait
  a1: Zyg
  a2: Zyg
  b1: Zyg
  b2: Zyg
  n: 10 | 40 | 100
  seed: number
  ran: boolean
  /** Selected Punnett cell [row, col]. */
  sel: [number, number]
}

const geno = (z: Zyg, letter: string): string =>
  z === 'D' ? letter.toUpperCase() + letter.toUpperCase() : z === 'H' ? letter.toUpperCase() + letter.toLowerCase() : letter.toLowerCase() + letter.toLowerCase()
const ZYG: Zyg[] = ['D', 'H', 'R']

function parents(s: GenState): [string, string] {
  if (s.kind === 'sex') return ['XX', 'XY']
  if (s.kind === 'dihybrid') return [geno(s.a1, 'T') + geno(s.b1, 'R'), geno(s.a2, 'T') + geno(s.b2, 'R')]
  const L = s.trait === 'seed' ? 'R' : 'T'
  return [geno(s.a1, L), geno(s.a2, L)]
}

interface Model {
  grid: Punnett
  genotypes: RatioEntry[]
  phenotypes: RatioEntry[]
}

/** Sex cross uses the same shapes so the view code is shared: mother XX in columns, father XY in rows. */
function modelOf(kind: CrossKind, p1: string, p2: string): Model {
  if (kind === 'sex') {
    const cells = [['XX', 'XX'], ['XY', 'XY']]
    const e = (key: string): RatioEntry => ({ key, count: 2, total: 4, fraction: fraction(2, 4) })
    return { grid: { cols: ['X', 'X'], rows: ['X', 'Y'], cells }, genotypes: [e('XX'), e('XY')], phenotypes: [e('XX'), e('XY')] }
  }
  return { grid: punnett(p1, p2), genotypes: genotypeRatio(p1, p2), phenotypes: phenotypeRatio(p1, p2) }
}

const pct = (f: number) => `${+(f * 100).toFixed(2)} %`

/** "T_R_" -> "tall round"; "XX" -> "female". */
function phenName(key: string, t: (k: UiKey) => string): string {
  if (key === 'XX') return t('gnFemale')
  if (key === 'XY') return t('gnMale')
  const parts: string[] = []
  for (let i = 0; i < key.length; i += 2) {
    const g = key[i]
    const dom = key[i + 1] === '_'
    if (g.toLowerCase() === 't') parts.push(t(dom ? 'gnTall' : 'gnShort'))
    else parts.push(t(dom ? 'gnRound' : 'gnWrinkled'))
  }
  return parts.join(' + ')
}

const domCount = (g: string): number => {
  let n = 0
  for (let i = 0; i < g.length; i += 2) if (g[i] === g[i].toUpperCase() && g[i] !== 'X' && g[i] !== 'Y') n++
  return n
}

function ZygSeg({ label, value, letter, onChange }: { label: string; value: Zyg; letter: string; onChange: (z: Zyg) => void }) {
  return (
    <div className="m2-slider">
      <span>{label}</span>
      <Seg<Zyg>
        label={label}
        value={value}
        onChange={onChange}
        options={ZYG.map((z) => ({ value: z, label: geno(z, letter) }))}
      />
    </div>
  )
}

function GenControls({ state, set }: { state: GenState; set: (p: Partial<GenState>) => void }) {
  const { t } = useLang()
  const letter = state.trait === 'seed' ? 'R' : 'T'
  const preset = (a2: Zyg, b2: Zyg) => set({ a1: 'H', b1: 'H', a2, b2, sel: [0, 0] })
  const isPreset1 = state.a1 === 'H' && state.b1 === 'H' && state.a2 === 'H' && state.b2 === 'H'
  const isPreset2 = state.a1 === 'H' && state.b1 === 'H' && state.a2 === 'R' && state.b2 === 'R'
  return (
    <>
      <div className="ctl-row">
        <button type="button" className="btn btn-primary" onClick={() => set({ ran: true })}>
          ▶ {t('gnSimulate')}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => set({ seed: state.seed + 1, ran: true })}>
          {t('gnNewSeed')}
        </button>
      </div>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('gnCross')}</span>
          <Seg<CrossKind>
            label={t('gnCross')}
            value={state.kind}
            onChange={(kind) => set({ kind, sel: [0, 0] })}
            options={[
              { value: 'monohybrid', label: t('gnMono') },
              { value: 'dihybrid', label: t('gnDi') },
              { value: 'sex', label: t('gnSex') },
            ]}
          />
        </div>
        <div className="m2-slider">
          <span>{t('gnN')}</span>
          <Seg<10 | 40 | 100>
            label={t('gnN')}
            value={state.n}
            onChange={(n) => set({ n })}
            options={[
              { value: 10, label: '10' },
              { value: 40, label: '40' },
              { value: 100, label: '100' },
            ]}
          />
        </div>
        <label className="m2-slider">
          <span>{t('gnSeedField')}</span>
          <input
            type="number"
            min={0}
            max={999999}
            step={1}
            value={state.seed}
            className="gn-seed"
            onChange={(e) => set({ seed: Math.max(0, Math.floor(Number(e.target.value) || 0)) })}
          />
        </label>
      </div>

      {state.kind === 'monohybrid' && (
        <div className="m2-grid">
          <div className="m2-slider">
            <span>{t('gnTrait')}</span>
            <Seg<Trait>
              label={t('gnTrait')}
              value={state.trait}
              onChange={(trait) => set({ trait })}
              options={[
                { value: 'height', label: t('gnHeight') },
                { value: 'seed', label: t('gnSeed') },
              ]}
            />
          </div>
          <ZygSeg label={t('gnParent1')} value={state.a1} letter={letter} onChange={(a1) => set({ a1, sel: [0, 0] })} />
          <ZygSeg label={t('gnParent2')} value={state.a2} letter={letter} onChange={(a2) => set({ a2, sel: [0, 0] })} />
        </div>
      )}

      {state.kind === 'dihybrid' && (
        <>
          <div className="m2-slider">
            <span>{t('gnPreset')}</span>
            <Seg<number>
              label={t('gnPreset')}
              value={isPreset1 ? 1 : isPreset2 ? 2 : 0}
              onChange={(v) => (v === 1 ? preset('H', 'H') : preset('R', 'R'))}
              options={[
                { value: 1, label: 'TtRr × TtRr' },
                { value: 2, label: 'TtRr × ttrr' },
              ]}
            />
          </div>
          <div className="m2-grid">
            <ZygSeg label={`${t('gnParent1')}: ${t('gnGeneA')}`} value={state.a1} letter="T" onChange={(a1) => set({ a1, sel: [0, 0] })} />
            <ZygSeg label={`${t('gnParent1')}: ${t('gnGeneB')}`} value={state.b1} letter="R" onChange={(b1) => set({ b1, sel: [0, 0] })} />
            <ZygSeg label={`${t('gnParent2')}: ${t('gnGeneA')}`} value={state.a2} letter="T" onChange={(a2) => set({ a2, sel: [0, 0] })} />
            <ZygSeg label={`${t('gnParent2')}: ${t('gnGeneB')}`} value={state.b2} letter="R" onChange={(b2) => set({ b2, sel: [0, 0] })} />
          </div>
        </>
      )}
      <GenReadout state={state} set={set} t={t} />
    </>
  )
}

function GenReadout({ state, set, t }: { state: GenState; set: (p: Partial<GenState>) => void; t: (k: UiKey) => string }) {
  const [p1, p2] = parents(state)
  const m = modelOf(state.kind, p1, p2)
  const ratio = ratioOf(m.phenotypes).join(' : ')
  const sim =
    state.ran && state.kind === 'sex'
      ? (() => {
          const r = simulateSex(state.n, state.seed)
          return { n: r.n, genotypes: { XX: r.female, XY: r.male } as Record<string, number>, phenotypes: { XX: r.female, XY: r.male } as Record<string, number> }
        })()
      : state.ran
        ? simulateOffspring(p1, p2, state.n, state.seed)
        : null
  const sel: [number, number] = [Math.min(state.sel[0], m.grid.rows.length - 1), Math.min(state.sel[1], m.grid.cols.length - 1)]
  const child = m.grid.cells[sel[0]][sel[1]]
  return (
    <div className="m2-result gn-readout" aria-live="polite">
      <span>
        {p1} × {p2} → {t('gnPhenRatio')}: <b data-testid="gn-ratio">{ratio}</b>
      </span>
      <table className="gn-punnett" aria-label={t('gnPunnett')}>
        <thead>
          <tr>
            <th scope="col">×</th>
            {m.grid.cols.map((c, i) => (
              <th key={i} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {m.grid.rows.map((r, ri) => (
            <tr key={ri}>
              <th scope="row">{r}</th>
              {m.grid.cells[ri].map((g, ci) => {
                const on = ri === sel[0] && ci === sel[1]
                return (
                  <td key={ci}>
                    <button
                      type="button"
                      className={`gn-cell gn-c${state.kind === 'sex' ? (g === 'XX' ? 0 : 2) : domCount(g)} ${on ? 'on' : ''}`}
                      aria-pressed={on}
                      onClick={() => set({ sel: [ri, ci] })}
                      data-testid={`gn-cell-${ri}-${ci}`}
                    >
                      {g}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <span>
        {t('gnGenotypes')}:{' '}
        <span data-testid="gn-genotypes">
          {[...m.genotypes]
            .sort((a, b) => (a.key < b.key ? -1 : 1))
            .map((e) => `${e.key} ${fractionText(e.fraction)} (${pct(fractionValue(e.fraction))})${sim ? ` → ${sim.genotypes[e.key] ?? 0}` : ''}`)
            .join(' · ')}
        </span>
      </span>
      <div className="bars" data-testid="gn-phenotypes">
        {m.phenotypes.map((e) => {
          const exp = fractionValue(e.fraction)
          const got = sim && sim.n > 0 ? (sim.phenotypes[e.key] ?? 0) / sim.n : exp
          return (
            <div className="bar-row" key={e.key}>
              <span className="bar-label">{phenName(e.key, t)}</span>
              <span className="bar-track" aria-hidden="true">
                <i className="bar-fill" style={{ width: `${got * 100}%`, background: e.key === 'XY' ? GEN_COLORS.y : GEN_COLORS.dom }} />
              </span>
              <b className="bar-value">
                {fractionText(e.fraction)} = {pct(exp)}
                {sim ? ` · ${t('gnObserved')} ${sim.phenotypes[e.key] ?? 0}/${sim.n}` : ''}
              </b>
            </div>
          )
        })}
      </div>
      <span>
        {t('gnPicked')}: <b data-testid="gn-child">{child}</b>
      </span>
      <span className="faint">{state.kind === 'sex' ? t('gnNoteSex') : t('gnNoteDom')}</span>
      {sim && <span className="faint">{t('gnNoteConverge')}</span>}
      <span className="faint">{t('gnHint')}</span>
    </div>
  )
}

const initial: GenState = { kind: 'monohybrid', trait: 'height', a1: 'H', a2: 'H', b1: 'H', b2: 'H', n: 40, seed: 1, ran: false, sel: [0, 0] }

const def: SimDef<GenState> = {
  initial,
  camera: { camZ: 10.5, zoom2D: 43 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const [p1, p2] = parents(s)
    const m = modelOf(s.kind, p1, p2)
    const r = Math.min(s.sel[0], m.grid.rows.length - 1)
    const c = Math.min(s.sel[1], m.grid.cols.length - 1)
    return <GeneticsScene kind={s.kind} p1={p1} p2={p2} child={m.grid.cells[r][c]} />
  },
  Controls: GenControls,
  legend: (s, t) =>
    s.kind === 'sex'
      ? [{ color: GEN_COLORS.x, label: 'X' }, { color: GEN_COLORS.y, label: 'Y' }]
      : [
          { color: GEN_COLORS.dom, label: t('gnLegDom') },
          { color: GEN_COLORS.rec, label: t('gnLegRec') },
        ],
}

// The readout is rendered by GenControls because picking a Punnett cell needs `set`.
export default makeSimHost(def)
