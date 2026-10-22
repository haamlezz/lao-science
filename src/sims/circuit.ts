// Pure formulas for the `circuit` simulation (m3-06 mode 'basic', m4-03 mode 'ohm'). No React / three.
// Units: volt (V), ampere (A), ohm (Ω), watt (W), joule (J). Ideal cells and wires (no internal resistance).

export const CELL_VOLTS = 1.5
export const BULB_OHMS = 10
export const CELLS_RANGE = { min: 1, max: 4 } as const
export const BULBS_RANGE = { min: 1, max: 3 } as const
export const VOLTS_RANGE = { min: 0, max: 12, step: 1 } as const
export const OHMS_RANGE = { min: 1, max: 100 } as const
/** Largest possible single-bulb power in basic mode (4 cells on one bulb or in parallel): 6² / 10 = 3.6 W. Use to normalise glow. */
export const BULB_MAX_WATTS = (CELLS_RANGE.max * CELL_VOLTS) ** 2 / BULB_OHMS

const MIN_OHMS = 0.001 // guards divisions: a 0 Ω input is treated as 1 mΩ

const r = (ohms: number) => Math.max(ohms, MIN_OHMS)

/** Ohm's law I = V / R (A). */
export function current(volts: number, ohms: number): number {
  return volts / r(ohms)
}
/** V = I × R (V). */
export function voltage(amps: number, ohms: number): number {
  return amps * ohms
}
/** P = V × I (W). */
export function electricPower(volts: number, amps: number): number {
  return volts * amps
}
/** E = P × t (J). */
export function electricEnergy(watts: number, seconds: number): number {
  return watts * seconds
}
/** R = ρ L / A (Ω); rho in Ω·m, length in m, area in m². */
export function wireResistance(rho: number, length: number, area: number): number {
  return (rho * length) / area
}
/** Series: R = R₁ + R₂ + … (Ω). */
export function seriesResistance(ohms: number[]): number {
  return ohms.reduce((a, x) => a + x, 0)
}
/** Parallel: 1/R = Σ 1/Rᵢ (Ω). 10 ∥ 20 = 6.67 Ω. Always < smallest Rᵢ. Empty list returns 0. */
export function parallelResistance(ohms: number[]): number {
  if (ohms.length === 0) return 0
  return 1 / ohms.reduce((a, x) => a + 1 / r(x), 0)
}

export type Wiring = 'series' | 'parallel'

// ---------------------------------------------------------------------------------------------
// Basic mode: cells + identical bulbs

export interface BasicInput {
  cells: number // 1..4, 1.5 V each in series
  bulbs: number // 1..3, each 10 Ω
  wiring: Wiring
  switchOn: boolean
  /** removed[i] = bulb i is unscrewed (length >= bulbs; missing entries mean not removed) */
  removed?: boolean[]
}

export interface BulbReading {
  present: boolean // false = unscrewed
  voltage: number // V across the bulb (0 if dark)
  current: number // A through the bulb
  power: number // W = V²/R
  lit: boolean // power > 0
  /** 0..1 glow = power / BULB_MAX_WATTS (use sqrt for perceptual scaling if desired) */
  glow: number
}

export interface BasicResult {
  emf: number // V, 1.5 × cells
  closed: boolean // switch on and path complete
  current: number // A through the ammeter (total battery current)
  totalPower: number // W
  bulbs: BulbReading[]
}

/**
 * Basic bulbs circuit.
 * series: I = V/(n·R), V_b = V/n; any unscrewed bulb or open switch -> I = 0.
 * parallel: each present bulb has V_b = V, I_b = V/R; total I = k·V/R for k present bulbs.
 * 2 cells, 3 bulbs series -> I = 0.10 A, each 0.1 W. Parallel -> I = 0.9 A total, each 0.9 W.
 */
export function basicCircuit(input: BasicInput): BasicResult {
  const emf = CELL_VOLTS * input.cells
  const n = input.bulbs
  const present = Array.from({ length: n }, (_, i) => !input.removed?.[i])
  const dark: BulbReading = { present: true, voltage: 0, current: 0, power: 0, lit: false, glow: 0 }
  const off = (p: boolean): BulbReading => ({ ...dark, present: p })

  if (!input.switchOn) {
    return { emf, closed: false, current: 0, totalPower: 0, bulbs: present.map(off) }
  }
  if (input.wiring === 'series') {
    const complete = present.every(Boolean)
    if (!complete) return { emf, closed: false, current: 0, totalPower: 0, bulbs: present.map(off) }
    const i = emf / (n * BULB_OHMS)
    const vb = emf / n
    const p = vb * i
    const bulbs = present.map<BulbReading>(() => ({
      present: true,
      voltage: vb,
      current: i,
      power: p,
      lit: p > 0,
      glow: p / BULB_MAX_WATTS,
    }))
    return { emf, closed: true, current: i, totalPower: p * n, bulbs }
  }
  const bulbs = present.map<BulbReading>((pr) => {
    if (!pr) return off(false)
    const i = emf / BULB_OHMS
    const p = emf * i
    return { present: true, voltage: emf, current: i, power: p, lit: p > 0, glow: p / BULB_MAX_WATTS }
  })
  const total = bulbs.reduce((a, b) => a + b.current, 0)
  return {
    emf,
    closed: total > 0,
    current: total,
    totalPower: bulbs.reduce((a, b) => a + b.power, 0),
    bulbs,
  }
}

// ---------------------------------------------------------------------------------------------
// Ohm mode: one source, R1 and R2

export type Arrangement = 'single' | 'series' | 'parallel'

export interface OhmInput {
  volts: number // 0..12
  r1: number // 1..100 Ω
  r2: number // 1..100 Ω (ignored for 'single')
  arrangement: Arrangement
}

export interface Branch {
  ohms: number
  voltage: number // V across this resistor
  current: number // A through this resistor
  power: number // W
}

export interface OhmResult {
  rEq: number // Ω
  current: number // A, total (ammeter in the main wire)
  power: number // W, total = V × I
  branches: Branch[] // [R1] for single, [R1, R2] otherwise
}

/**
 * V = 12, R1 = 10, R2 = 20:
 *   series   -> R_eq 30 Ω, I 0.40 A, V1 4 V, V2 8 V, P 4.8 W
 *   parallel -> R_eq 6.67 Ω, I 1.8 A (I1 1.2 A + I2 0.6 A), P 21.6 W
 *   single   -> R_eq 10 Ω, I 1.2 A
 */
export function ohmCircuit(input: OhmInput): OhmResult {
  const { volts, r1, r2, arrangement } = input
  const mk = (ohms: number, v: number, i: number): Branch => ({ ohms, voltage: v, current: i, power: v * i })
  if (arrangement === 'single') {
    const i = current(volts, r1)
    return { rEq: r1, current: i, power: volts * i, branches: [mk(r1, volts, i)] }
  }
  if (arrangement === 'series') {
    const rEq = seriesResistance([r1, r2])
    const i = current(volts, rEq)
    return { rEq, current: i, power: volts * i, branches: [mk(r1, i * r1, i), mk(r2, i * r2, i)] }
  }
  const rEq = parallelResistance([r1, r2])
  const i1 = current(volts, r1)
  const i2 = current(volts, r2)
  return {
    rEq,
    current: i1 + i2,
    power: volts * (i1 + i2),
    branches: [mk(r1, volts, i1), mk(r2, volts, i2)],
  }
}

export interface IvPoint {
  v: number
  i: number
}

/** Points of the I-V line of one resistor for the graph: v from 0 to vMax, `count` >= 2 points. Slope = 1/R. */
export function ivLine(ohms: number, vMax = VOLTS_RANGE.max, count = 13): IvPoint[] {
  const n = Math.max(2, Math.floor(count))
  return Array.from({ length: n }, (_, k) => {
    const v = (vMax * k) / (n - 1)
    return { v, i: current(v, ohms) }
  })
}
