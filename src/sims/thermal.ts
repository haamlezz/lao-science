// Pure formulas for the `thermal` simulation (m2-02). Temperatures in °C unless named Kelvin.

export type Solid = 'steel' | 'aluminium' | 'copper'

/** Linear expansion coefficients α in 1/K. */
export const ALPHA: Record<Solid, number> = { steel: 12e-6, aluminium: 23e-6, copper: 17e-6 }
export const BETA_ALCOHOL = 1.1e-3 // volumetric expansion of alcohol, 1/K
export const ABSOLUTE_ZERO_OFFSET = 273.15
export const START_C = 20
export const BAR_LENGTH_M = 1
export const EXAGGERATION = 500 // drawing factor; always label as "exaggerated / not to scale"

export const cToK = (c: number) => c + ABSOLUTE_ZERO_OFFSET

/** ΔL = α·L0·ΔT. L0 in metres, result in metres. */
export function linearExpansion(material: Solid, l0M: number, deltaT: number): number {
  return ALPHA[material] * l0M * deltaT
}

/** Same as linearExpansion, in millimetres (for display). */
export function linearExpansionMm(material: Solid, l0M: number, deltaT: number): number {
  return linearExpansion(material, l0M, deltaT) * 1000
}

/** Liquid volume change ΔV = β·V0·ΔT (result in the unit of V0). */
export function liquidExpansion(v0: number, deltaT: number, beta = BETA_ALCOHOL): number {
  return beta * v0 * deltaT
}

/** Gas at constant pressure: V = V0·T/T0 with temperatures converted to kelvin. */
export function gasVolume(v0: number, t0C: number, tC: number): number {
  return (v0 * cToK(tC)) / cToK(t0C)
}

export interface ThermalReading {
  deltaT: number // K
  barExpansionMm: number // true value for a 1 m bar
  liquidFraction: number // ΔV/V0
  gasRatio: number // V/V0
  gasFraction: number // (V-V0)/V0
}

/** Everything the three panels show for a temperature (start = START_C). */
export function reading(material: Solid, tC: number, startC = START_C): ThermalReading {
  const deltaT = tC - startC
  const gasRatio = gasVolume(1, startC, tC)
  return {
    deltaT,
    barExpansionMm: linearExpansionMm(material, BAR_LENGTH_M, deltaT),
    liquidFraction: BETA_ALCOHOL * deltaT,
    gasRatio,
    gasFraction: gasRatio - 1,
  }
}
