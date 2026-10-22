// Pure formulas for the `electrochem` simulation (c7-05). No React / three.
// Standard reduction potentials at 25 °C, 1.0 M (approximate textbook values; REVIEW, sources differ by ~0.01 V).

export type Metal = 'Mg' | 'Zn' | 'Fe' | 'Cu' | 'Ag'

export interface HalfCell {
  metal: Metal
  ion: string // e.g. 'Zn²⁺'
  charge: number // electrons transferred
  E: number // V, reduction
}

export const HALF_CELLS: Record<Metal, HalfCell> = {
  Mg: { metal: 'Mg', ion: 'Mg²⁺', charge: 2, E: -2.37 },
  Zn: { metal: 'Zn', ion: 'Zn²⁺', charge: 2, E: -0.76 },
  Fe: { metal: 'Fe', ion: 'Fe²⁺', charge: 2, E: -0.44 },
  Cu: { metal: 'Cu', ion: 'Cu²⁺', charge: 2, E: 0.34 },
  Ag: { metal: 'Ag', ion: 'Ag⁺', charge: 1, E: 0.8 },
}
export const METALS: Metal[] = ['Mg', 'Zn', 'Fe', 'Cu', 'Ag']

export interface Cell {
  anode: Metal
  cathode: Metal
  emf: number // V, always > 0
  electronsPerReaction: number // lcm of both charges
  anodeHalf: string
  cathodeHalf: string
  overall: string
  notation: string
  electronFlow: 'anode -> cathode'
  spontaneous: true
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** E°cell = E°cathode − E°anode (V, rounded to 0.01). */
export function emf(cathode: Metal, anode: Metal): number {
  return Math.round((HALF_CELLS[cathode].E - HALF_CELLS[anode].E) * 100) / 100
}

/**
 * Builds the cell from two different metals; the lower E° is the anode, argument order is irrelevant.
 * Zn|Cu 1.10 V, Mg|Ag 3.17, Fe|Cu 0.78, Zn|Ag 1.56, Cu|Ag 0.46.
 */
export function buildCell(a: Metal, b: Metal): Cell {
  if (a === b) throw new Error('metals must differ')
  const [anode, cathode] = HALF_CELLS[a].E < HALF_CELLS[b].E ? [a, b] : [b, a]
  const A = HALF_CELLS[anode]
  const C = HALF_CELLS[cathode]
  const n = (A.charge * C.charge) / gcd(A.charge, C.charge)
  const na = n / A.charge
  const nc = n / C.charge
  const co = (k: number) => (k === 1 ? '' : String(k))
  return {
    anode,
    cathode,
    emf: emf(cathode, anode),
    electronsPerReaction: n,
    anodeHalf: `${anode}(s) → ${A.ion} + ${A.charge}e⁻`,
    cathodeHalf: `${C.ion} + ${C.charge}e⁻ → ${cathode}(s)`,
    overall: `${co(na)}${anode}(s) + ${co(nc)}${C.ion} → ${co(na)}${A.ion} + ${co(nc)}${cathode}(s)`,
    notation: `${anode}|${A.ion}||${C.ion}|${cathode}`,
    electronFlow: 'anode -> cathode',
    spontaneous: true,
  }
}

/** Open circuit still shows E°cell (open-circuit voltage) but no current flows. */
export function reading(cell: Cell, closed: boolean): { volts: number; current: boolean; openCircuit: boolean } {
  return { volts: cell.emf, current: closed, openCircuit: !closed }
}

export const FARADAY = 96485 // C/mol
/** Faraday's law: mass (g) = M·I·t / (n·F). */
export function massFromCurrent(molarMass: number, n: number, amps: number, seconds: number): number {
  return (molarMass * amps * seconds) / (n * FARADAY)
}
