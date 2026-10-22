// Pure data and rules for the `bonding` simulation (c6-02). EN: Pauling (REVIEW, textbook values).

export const EN: Record<string, number> = {
  H: 2.2, C: 2.55, N: 3.04, O: 3.44, Na: 0.93, Mg: 1.31, Cl: 3.16, Ca: 1.0,
}

/** Shell configurations (electrons per shell) for the atoms used. */
export const SHELLS: Record<string, number[]> = {
  H: [1], C: [2, 4], N: [2, 5], O: [2, 6], Na: [2, 8, 1], Mg: [2, 8, 2], Cl: [2, 8, 7], Ca: [2, 8, 8, 2],
}

export type BondClass = 'ionic' | 'polar covalent' | 'non-polar covalent'

/** Rule of thumb (labelled in the UI): >= 1.7 ionic-like, 0.4 to <1.7 polar covalent, < 0.4 non-polar. */
export function classify(deltaEN: number): BondClass {
  if (deltaEN >= 1.7) return 'ionic'
  if (deltaEN >= 0.4) return 'polar covalent'
  return 'non-polar covalent'
}

export function deltaEN(a: string, b: string): number {
  const x = EN[a]
  const y = EN[b]
  if (x === undefined || y === undefined) throw new Error('no EN data')
  return Math.abs(x - y)
}

export const bondClassOf = (a: string, b: string): BondClass => classify(deltaEN(a, b))

/** Charge an atom takes to reach a noble-gas shell count (metals lose, non-metals gain). */
export function ionCharge(symbol: string): number {
  const sh = SHELLS[symbol]
  if (!sh) throw new Error(`unknown ${symbol}`)
  const outer = sh[sh.length - 1]
  if (symbol === 'H') return 1 // H as H⁺ (H⁻ not used here)
  return outer <= 3 ? outer : -(8 - outer)
}

/** Ion shell configuration after loss/gain: drop the outer shell for cations, add to it for anions. */
export function ionShells(symbol: string): number[] {
  const sh = [...SHELLS[symbol]]
  const q = ionCharge(symbol)
  if (q > 0) {
    sh.pop()
    return sh.length ? sh : [0]
  }
  sh[sh.length - 1] += -q
  return sh
}

export interface IonicCompound {
  formula: string
  cation: string
  anion: string
  cations: number
  anions: number
}

function ionic(cation: string, anion: string, formula: string): IonicCompound {
  const qc = ionCharge(cation)
  const qa = -ionCharge(anion)
  const lcm = (a: number, b: number): number => {
    let x = a
    while (x % b !== 0) x += a
    return x
  }
  const total = lcm(qc, qa)
  return { formula, cation, anion, cations: total / qc, anions: total / qa }
}

export const IONIC: IonicCompound[] = [
  ionic('Na', 'Cl', 'NaCl'),
  ionic('Mg', 'O', 'MgO'),
  ionic('Ca', 'Cl', 'CaCl₂'),
]

export type Geometry = 'linear' | 'bent' | 'trigonal pyramidal' | 'tetrahedral'

export interface Molecule {
  formula: string // Latin, Unicode subscripts
  /** Central atom first, then each distinct terminal atom with count. */
  central: string
  terminals: { symbol: string; count: number }[]
  /** Shared pairs per bond between the central atom and a terminal (bond order). */
  bondOrder: number
  bondCount: number // number of central-terminal bonds
  lonePairsOnCentral: number
  geometry: Geometry
  angle: number | null // degrees, null for diatomics
  polar: boolean // molecule overall polar
}

export const MOLECULES: Molecule[] = [
  { formula: 'H₂', central: 'H', terminals: [{ symbol: 'H', count: 1 }], bondOrder: 1, bondCount: 1, lonePairsOnCentral: 0, geometry: 'linear', angle: null, polar: false },
  { formula: 'O₂', central: 'O', terminals: [{ symbol: 'O', count: 1 }], bondOrder: 2, bondCount: 1, lonePairsOnCentral: 2, geometry: 'linear', angle: null, polar: false },
  { formula: 'N₂', central: 'N', terminals: [{ symbol: 'N', count: 1 }], bondOrder: 3, bondCount: 1, lonePairsOnCentral: 1, geometry: 'linear', angle: null, polar: false },
  { formula: 'H₂O', central: 'O', terminals: [{ symbol: 'H', count: 2 }], bondOrder: 1, bondCount: 2, lonePairsOnCentral: 2, geometry: 'bent', angle: 104.5, polar: true },
  { formula: 'NH₃', central: 'N', terminals: [{ symbol: 'H', count: 3 }], bondOrder: 1, bondCount: 3, lonePairsOnCentral: 1, geometry: 'trigonal pyramidal', angle: 107, polar: true },
  { formula: 'CH₄', central: 'C', terminals: [{ symbol: 'H', count: 4 }], bondOrder: 1, bondCount: 4, lonePairsOnCentral: 0, geometry: 'tetrahedral', angle: 109.5, polar: false },
  { formula: 'CO₂', central: 'C', terminals: [{ symbol: 'O', count: 2 }], bondOrder: 2, bondCount: 2, lonePairsOnCentral: 0, geometry: 'linear', angle: 180, polar: false },
]

export function findMolecule(formula: string): Molecule {
  const m = MOLECULES.find((x) => x.formula === formula)
  if (!m) throw new Error(`unknown molecule ${formula}`)
  return m
}

/** Shared electron pairs in the whole molecule. Diatomics: bondOrder; otherwise bondCount × bondOrder. */
export function sharedPairs(m: Molecule): number {
  return m.bondCount * m.bondOrder
}

/** Total valence electrons of the molecule from the atoms (central + terminals). */
export function valenceElectronTotal(m: Molecule): number {
  const outer = (s: string): number => SHELLS[s][SHELLS[s].length - 1]
  if (m.terminals.length === 1 && m.terminals[0].symbol === m.central && m.formula.length === 2) {
    return outer(m.central) * 2 // diatomic X₂
  }
  return outer(m.central) + m.terminals.reduce((n, t) => n + outer(t.symbol) * t.count, 0)
}

/** Lewis check: shared pairs ×2 + lone pairs ×2 (all atoms) equals the valence electron total. */
export function lewisElectronCount(m: Molecule): { bonding: number; lone: number; total: number } {
  const bonding = sharedPairs(m) * 2
  const diatomic = m.formula.length === 2
  // Terminal atoms: H has no lone pairs; other terminals fill to 8 electrons.
  const terminalAtoms = diatomic ? 1 : m.terminals.reduce((n, t) => n + t.count, 0)
  const termSym = m.terminals[0].symbol
  const termLonePairs = termSym === 'H' ? 0 : (8 - 2 * m.bondOrder) / 2
  const centralLone = m.lonePairsOnCentral * 2
  const lone = centralLone + terminalAtoms * termLonePairs * 2
  return { bonding, lone, total: bonding + lone }
}

/** Octet (duet for H) satisfied for the central atom: 2 × bonds×order + 2 × lone pairs. */
export function centralElectrons(m: Molecule): number {
  return 2 * m.bondCount * m.bondOrder + 2 * m.lonePairsOnCentral
}

export function isPolarMolecule(m: Molecule): boolean {
  return m.polar
}
