import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import { Seg, Slider } from '../../components/Controls'
import {
  SCHOOL_MASS,
  SUBSTANCES,
  convert,
  findSubstance,
  massPercent,
  parseFormula,
  AVOGADRO,
  STP_MOLAR_VOLUME_L,
} from '../../sims/mole'
import type { InputKind, ParticleKind } from '../../sims/mole'
import { MOLE_COLORS, MoleScene } from './MoleScene'
import { fmt3, sci } from './chemShared'
import { makeSimHost } from './host'
import type { SimDef } from './host'

interface MoleState {
  substance: string
  kind: InputKind
  value: number // in the unit of `kind`: g, mol, x10^23, L
}

const KIND_RANGE: Record<InputKind, { max: number; step: number; unit: string; label: UiKey; short: UiKey }> = {
  mass: { max: 200, step: 0.5, unit: 'g', label: 'molMass', short: 'molKindMass' },
  moles: { max: 5, step: 0.05, unit: 'mol', label: 'molMoles', short: 'molKindMoles' },
  particles: { max: 30, step: 0.1, unit: '×10²³', label: 'molParticles', short: 'molKindParticles' },
  volume: { max: 112, step: 0.5, unit: 'L', label: 'molVolume', short: 'molKindVolume' },
}
const KINDS: InputKind[] = ['mass', 'moles', 'particles', 'volume']
const PARTICLE_KEY: Record<ParticleKind, UiKey> = { molecule: 'molMolecules', 'formula unit': 'molFormulaUnits', atom: 'molAtoms' }

/** Value of another kind for the same amount of substance (so switching the input keeps the sample). */
function valueFor(substance: string, from: InputKind, value: number, to: InputKind): number {
  const base = from === 'particles' ? value * 1e23 : value
  const r = convert(substance, from, base)
  switch (to) {
    case 'mass':
      return r.massG
    case 'moles':
      return r.moles
    case 'particles':
      return r.particles / 1e23
    case 'volume':
      return r.gasVolumeL ?? 0
  }
}

function resultOf(s: MoleState) {
  const base = s.kind === 'particles' ? s.value * 1e23 : s.value
  return convert(s.substance, s.kind, base)
}

/** Number input that keeps what the user typed ("5." stays "5.") and follows external changes. */
function NumField({ value, max, onChange }: { value: number; max: number; onChange: (v: number) => void }) {
  const [txt, setTxt] = useState(String(Number(value.toPrecision(6))))
  useEffect(() => {
    setTxt((cur) => (Number(cur) === value ? cur : String(Number(value.toPrecision(6)))))
  }, [value])
  return (
    <input
      className="upc-num"
      type="number"
      inputMode="decimal"
      min={0}
      max={max}
      step="any"
      value={txt}
      onChange={(e) => {
        setTxt(e.target.value)
        const n = parseFloat(e.target.value)
        if (Number.isFinite(n) && n >= 0) onChange(Math.min(n, max))
      }}
    />
  )
}

function MoleControls({ state, set }: { state: MoleState; set: (p: Partial<MoleState>) => void }) {
  const { t } = useLang()
  const sub = findSubstance(state.substance)
  const r = KIND_RANGE[state.kind]
  const pickSubstance = (key: string) => {
    const next = findSubstance(key)
    if (state.kind === 'volume' && !next.gas) {
      set({
        substance: key,
        kind: 'mass',
        value: Math.round(valueFor(state.substance, 'volume', state.value, 'mass') * 100) / 100,
      })
    } else set({ substance: key })
  }
  const pickKind = (kind: InputKind) => {
    const v = valueFor(state.substance, state.kind, state.value, kind)
    set({ kind, value: Math.round(v * 1000) / 1000 })
  }
  return (
    <>
      <div className="m2-grid">
        <div className="m2-slider">
          <span>{t('molSubstance')}</span>
          <Seg<string>
            label={t('molSubstance')}
            value={state.substance}
            onChange={pickSubstance}
            options={SUBSTANCES.map((s) => ({ value: s.key, label: s.formula }))}
          />
        </div>
        <div className="m2-slider">
          <span>{t('molGiven')}</span>
          <div className="seg" role="radiogroup" aria-label={t('molGiven')}>
            {KINDS.map((k) => {
              const off = k === 'volume' && !sub.gas
              return (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={state.kind === k}
                  disabled={off}
                  className={state.kind === k ? 'on' : ''}
                  onClick={() => pickKind(k)}
                >
                  {t(KIND_RANGE[k].short)}
                </button>
              )
            })}
          </div>
          {!sub.gas && <span className="faint">{t('molVolNote')}</span>}
        </div>
      </div>
      <div className="m2-grid">
        <Slider
          label={t(r.label)}
          value={Math.min(state.value, r.max)}
          min={0}
          max={r.max}
          step={r.step}
          display={`${fmt3(state.value)} ${r.unit}`}
          onChange={(value) => set({ value })}
        />
        <label className="m2-slider">
          <span>
            {t('molType')} ({r.unit})
          </span>
          <NumField value={state.value} max={r.max} onChange={(value) => set({ value })} />
        </label>
      </div>
    </>
  )
}

function MoleReadout({ s, t }: { s: MoleState; t: (k: UiKey) => string }) {
  const sub = findSubstance(s.substance)
  const r = resultOf(s)
  const comp = Object.entries(parseFormula(sub.ascii))
  const calc = comp.map(([el, c]) => `${c}×${SCHOOL_MASS[el].toFixed(1)}`).join(' + ')
  const simple = comp.length === 1 && comp[0][1] === 1
  return (
    <div className="m2-result" aria-live="polite">
      <span>
        {sub.formula}: M = {simple ? '' : `${calc} = `}
        <b data-testid="mol-M">{r.molarMass.toFixed(1)} g/mol</b>
      </span>
      <span>
        n = m/M = <b data-testid="mol-m">{fmt3(r.massG)} g</b> ÷ {r.molarMass.toFixed(1)} g/mol ={' '}
        <b data-testid="mol-n">{fmt3(r.moles)} mol</b>
      </span>
      <span>
        N = n × {sci(AVOGADRO, 4)} mol⁻¹ = <b data-testid="mol-N">{sci(r.particles)}</b> {t(PARTICLE_KEY[r.particleKind])}
      </span>
      <span>
        V(STP) = n × {STP_MOLAR_VOLUME_L} L/mol ={' '}
        <b data-testid="mol-V">{r.gasVolumeL === null ? t('molNotGas') : `${fmt3(r.gasVolumeL)} L`}</b>
      </span>
      <span>
        {t('molPercent')}:{' '}
        <b data-testid="mol-pct">{comp.map(([el]) => `${el} ${massPercent(sub.ascii, el).toFixed(1)} %`).join(' · ')}</b>
      </span>
      <span className="faint">{t('molSchematic')}</span>
    </div>
  )
}

const def: SimDef<MoleState> = {
  initial: { substance: 'H2O', kind: 'mass', value: 36 },
  camera: { camZ: 10.5, zoom2D: 44 },
  notToScale: true,
  Scene: ({ state: s }) => {
    const r = resultOf(s)
    const sub = findSubstance(s.substance)
    return <MoleScene formula={sub.formula} ascii={sub.ascii} massG={r.massG} moles={r.moles} gasVolumeL={r.gasVolumeL} />
  },
  Controls: MoleControls,
  legend: (_s, t) => [
    { color: MOLE_COLORS.particle, label: t('molLegendPile') },
    { color: MOLE_COLORS.bar, label: t('molLegendBar') },
    { color: MOLE_COLORS.gas, label: t('molLegendGas') },
  ],
  readout: (s, t) => <MoleReadout s={s} t={t} />,
}

export default makeSimHost(def)
