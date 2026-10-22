// Pure formulas for the `mole` simulation (c5-04). School molar masses (g/mol), spec S8.

export const AVOGADRO = 6.022e23 // mol⁻¹
export const STP_MOLAR_VOLUME_L = 22.4 // L/mol at 0 °C, 1 atm

export const SCHOOL_MASS: Record<string, number> = {
  H: 1.0, C: 12.0, N: 14.0, O: 16.0, Na: 23.0, Mg: 24.0, S: 32.0, Cl: 35.5, Ca: 40.0, Fe: 56.0,
}

export type ParticleKind = 'molecule' | 'formula unit' | 'atom'

export interface Substance {
  key: string
  formula: string // Latin, with Unicode subscripts
  /** ASCII formula parsed by parseFormula, e.g. 'H2O', 'Ca(OH)2'. */
  ascii: string
  kind: ParticleKind
  gas: boolean // gas at STP
}

export const SUBSTANCES: Substance[] = [
  { key: 'H2O', formula: 'H₂O', ascii: 'H2O', kind: 'molecule', gas: false },
  { key: 'CO2', formula: 'CO₂', ascii: 'CO2', kind: 'molecule', gas: true },
  { key: 'NaCl', formula: 'NaCl', ascii: 'NaCl', kind: 'formula unit', gas: false },
  { key: 'Fe', formula: 'Fe', ascii: 'Fe', kind: 'atom', gas: false },
  { key: 'O2', formula: 'O₂', ascii: 'O2', kind: 'molecule', gas: true },
  { key: 'C6H12O6', formula: 'C₆H₁₂O₆', ascii: 'C6H12O6', kind: 'molecule', gas: false },
  { key: 'CaCO3', formula: 'CaCO₃', ascii: 'CaCO3', kind: 'formula unit', gas: false },
]

export function findSubstance(key: string): Substance {
  const s = SUBSTANCES.find((x) => x.key === key)
  if (!s) throw new Error(`unknown substance ${key}`)
  return s
}

/** Element counts of an ASCII formula; supports parentheses, e.g. 'Ca(OH)2' -> {Ca:1,O:2,H:2}. */
export function parseFormula(f: string): Record<string, number> {
  let i = 0
  const readNum = (): number => {
    let s = ''
    while (i < f.length && /\d/.test(f[i])) s += f[i++]
    return s ? Number(s) : 1
  }
  const group = (): Record<string, number> => {
    const out: Record<string, number> = {}
    const add = (el: string, k: number) => {
      out[el] = (out[el] ?? 0) + k
    }
    while (i < f.length && f[i] !== ')') {
      if (f[i] === '(') {
        i++
        const inner = group()
        if (f[i] !== ')') throw new Error('unbalanced parentheses')
        i++
        const k = readNum()
        for (const [el, c] of Object.entries(inner)) add(el, c * k)
      } else if (/[A-Z]/.test(f[i])) {
        let el = f[i++]
        while (i < f.length && /[a-z]/.test(f[i])) el += f[i++]
        add(el, readNum())
      } else throw new Error(`bad formula ${f}`)
    }
    return out
  }
  const r = group()
  if (i < f.length) throw new Error('unbalanced parentheses')
  return r
}

/** M = Σ(atoms × school mass), g/mol. Throws for an element not in the school table. */
export function molarMass(ascii: string): number {
  let m = 0
  for (const [el, c] of Object.entries(parseFormula(ascii))) {
    const a = SCHOOL_MASS[el]
    if (a === undefined) throw new Error(`no school mass for ${el}`)
    m += a * c
  }
  return m
}

export const molesFromMass = (massG: number, M: number): number => massG / M
export const massFromMoles = (n: number, M: number): number => n * M
export const particlesFromMoles = (n: number): number => n * AVOGADRO
export const molesFromParticles = (N: number): number => N / AVOGADRO
export const gasVolumeFromMoles = (n: number): number => n * STP_MOLAR_VOLUME_L
export const molesFromGasVolume = (vL: number): number => vL / STP_MOLAR_VOLUME_L

/** Mass percent of an element in a formula. */
export function massPercent(ascii: string, element: string): number {
  const counts = parseFormula(ascii)
  const c = counts[element] ?? 0
  const a = SCHOOL_MASS[element]
  if (a === undefined) throw new Error(`no school mass for ${element}`)
  return ((c * a) / molarMass(ascii)) * 100
}

export type InputKind = 'mass' | 'moles' | 'particles' | 'volume'

export interface MoleResult {
  molarMass: number
  massG: number
  moles: number
  particles: number
  gasVolumeL: number | null // null for non-gases
  particleKind: ParticleKind
}

/** Convert one input quantity to every other. 'volume' (litres at STP) is only valid for gases. */
export function convert(key: string, kind: InputKind, value: number): MoleResult {
  const s = findSubstance(key)
  const M = molarMass(s.ascii)
  let n: number
  switch (kind) {
    case 'mass': n = molesFromMass(value, M); break
    case 'moles': n = value; break
    case 'particles': n = molesFromParticles(value); break
    case 'volume':
      if (!s.gas) throw new Error(`${s.formula} is not a gas at STP`)
      n = molesFromGasVolume(value)
      break
  }
  return {
    molarMass: M,
    massG: massFromMoles(n, M),
    moles: n,
    particles: particlesFromMoles(n),
    gasVolumeL: s.gas ? gasVolumeFromMoles(n) : null,
    particleKind: s.kind,
  }
}
