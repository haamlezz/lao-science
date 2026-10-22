// Pure formulas for the `rate` simulation (c7-01). No React / three.
// SIMPLIFIED ILLUSTRATIVE MODEL (label it so in the UI): a single first-order reaction A -> products,
// Arrhenius k = A·exp(−Ea/RT) with the pre-factor fixed so that k = 0.0100 s⁻¹ at 300 K and Ea = 50 kJ/mol.
// A catalyst only lowers Ea (50 -> 40 kJ/mol); powder multiplies k by 4 (schematic). Units: K, s, kJ/mol, s⁻¹.

export const R = 8.314 // J/(mol·K)
export const EA_BASE_KJ = 50
export const EA_CATALYST_KJ = 40
export const K_REF = 0.01 // s⁻¹ at T_REF with EA_BASE_KJ
export const T_REF = 300
export const POWDER_FACTOR = 4
export const TEMP_RANGE = { min: 280, max: 360, step: 10 } as const
export const CONC_RANGE = { min: 10, max: 60, step: 10 } as const // particles in the box

const PREFACTOR = K_REF * Math.exp((EA_BASE_KJ * 1000) / (R * T_REF))

export interface RateInput {
  tempK: number
  catalyst: boolean
  powder: boolean
}

/** Activation energy (kJ/mol). */
export function activationEnergy(catalyst: boolean): number {
  return catalyst ? EA_CATALYST_KJ : EA_BASE_KJ
}

/** Rate constant k (s⁻¹). T = 310 K -> 0.0191; catalyst at 300 K -> 0.551; T = 280 K -> 0.00239. */
export function rateConstant({ tempK, catalyst, powder }: RateInput): number {
  const ea = activationEnergy(catalyst) * 1000
  return PREFACTOR * Math.exp(-ea / (R * tempK)) * (powder ? POWDER_FACTOR : 1)
}

/** Fraction of collisions with energy >= Ea (Boltzmann factor exp(−Ea/RT)); illustrative. */
export function fractionAboveEa(eaKJ: number, tempK: number): number {
  return Math.exp(-(eaKJ * 1000) / (R * tempK))
}

/** Rate law, first order: rate = k[A] (concentration units per s). */
export function rate(k: number, conc: number): number {
  return k * conc
}

/** [A](t) = [A]₀ e^(−kt). */
export function concentrationAt(c0: number, k: number, t: number): number {
  return c0 * Math.exp(-k * t)
}

/** Half-life ln2/k (s). 69.3 s at k = 0.01. */
export function halfLife(k: number): number {
  return Math.LN2 / k
}

/** Concentration–time curve sampled at n+1 points from 0 to tMax. */
export function curve(c0: number, k: number, tMax: number, n = 60): { t: number; c: number }[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (tMax * i) / n
    return { t, c: concentrationAt(c0, k, t) }
  })
}
