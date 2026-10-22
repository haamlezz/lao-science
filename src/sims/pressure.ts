// Pure formulas for the `pressure` simulation (m2-05), extracted from the former M2Lesson.tsx.

export const G = 9.8 // N/kg
export const AREA_BIG_CM2 = 300
export const AREA_SMALL_CM2 = 100

export const LIQUID_DENSITY = { water: 1000, sea: 1030, oil: 800 } as const // kg/m³

/** P = F ÷ A with A given in cm² (force in N, result in Pa). */
export function solidPressure(forceN: number, areaCm2: number): number {
  return forceN / (areaCm2 / 10000)
}

/** P = ρ·g·h (rho kg/m³, depth m, result Pa). */
export function liquidPressure(rho: number, depthM: number): number {
  return rho * G * depthM
}

/** Display format used by the lesson: kPa with one decimal from 10 000 Pa, otherwise whole Pa. */
export function formatPa(p: number): string {
  return p >= 10000 ? `${(p / 1000).toFixed(1)} kPa` : `${Math.round(p)} Pa`
}
