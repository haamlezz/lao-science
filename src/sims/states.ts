// Pure formulas for the `states` simulation (m3-07). No React / three.
// IDEALISED MODEL: 0.5 kg of pure water at normal pressure, constant specific heats per phase,
// no heat loss to the surroundings, all heater energy goes into the sample. Real water differs
// (c varies slightly with T, steam heats less uniformly, ...). Label it a model in the UI.
// Units: kg, kJ, kW, s, °C. Heater power P (kW) delivers E = P·t kilojoules.

export const MASS_KG = 0.5
export const START_C = -20
export const END_C = 120
export const MELT_C = 0
export const BOIL_C = 100
export const C_ICE = 2.1 // kJ/(kg·K)
export const C_WATER = 4.2
export const C_STEAM = 2.0
export const L_FUSION = 334 // kJ/kg
export const L_VAPOUR = 2260 // kJ/kg
export const POWER_RANGE_KW = { min: 0.5, max: 3, step: 0.5 } as const

/** Energy of each stage (kJ): ice 21, melt 167, water 210, boil 1130, steam 20. */
export const STAGE_KJ = {
  ice: MASS_KG * C_ICE * (MELT_C - START_C),
  melt: MASS_KG * L_FUSION,
  water: MASS_KG * C_WATER * (BOIL_C - MELT_C),
  boil: MASS_KG * L_VAPOUR,
  steam: MASS_KG * C_STEAM * (END_C - BOIL_C),
} as const

/** Cumulative energies at the corners of the heating curve: 0, 21, 188, 398, 1528, 1548 kJ. */
export const E_MELT_START = STAGE_KJ.ice
export const E_MELT_END = E_MELT_START + STAGE_KJ.melt
export const E_BOIL_START = E_MELT_END + STAGE_KJ.water
export const E_BOIL_END = E_BOIL_START + STAGE_KJ.boil
export const E_TOTAL = E_BOIL_END + STAGE_KJ.steam

export type Phase = 'solid' | 'liquid' | 'gas'
export type StateLabel = 'ice' | 'ice+water' | 'water' | 'water+steam' | 'steam'

const clampE = (e: number) => Math.min(Math.max(e, 0), E_TOTAL)

/** Heat Q = m c ΔT (kJ). */
export function heatForTemperatureChange(mass: number, c: number, deltaT: number): number {
  return mass * c * deltaT
}
/** Latent heat Q = m L (kJ). */
export function latentHeat(mass: number, L: number): number {
  return mass * L
}

/**
 * Simple phase of water by temperature alone (ignores the plateau mixtures):
 * T <= 0 solid, 0 < T <= 100 liquid, T > 100 gas. The boundary values belong to the lower-energy phase
 * (0 °C -> solid, 100 °C -> liquid); use stateAtEnergy for the mixtures on the plateaus.
 */
export function phaseAtTemperature(tempC: number): Phase {
  if (tempC <= MELT_C) return 'solid'
  if (tempC <= BOIL_C) return 'liquid'
  return 'gas'
}

/** Temperature (°C) after the sample has received E kJ since the start (ice at −20 °C). Piecewise linear. */
export function temperatureAtEnergy(eKj: number): number {
  const e = clampE(eKj)
  if (e <= E_MELT_START) return START_C + e / (MASS_KG * C_ICE)
  if (e <= E_MELT_END) return MELT_C
  if (e <= E_BOIL_START) return MELT_C + (e - E_MELT_END) / (MASS_KG * C_WATER)
  if (e <= E_BOIL_END) return BOIL_C
  return BOIL_C + (e - E_BOIL_END) / (MASS_KG * C_STEAM)
}

/**
 * Label of the state at energy E. Boundaries belong to the stage that ends there:
 * E <= 21 ice; 21 < E <= 188 ice+water; 188 < E <= 398 water; 398 < E <= 1528 water+steam; above steam.
 * (So at 1 kW: t = 21 s is "ice" at 0 °C, t = 188 s is "ice+water" at 0 °C, t = 398 s is "water" at 100 °C.)
 */
export function stateAtEnergy(eKj: number): StateLabel {
  const e = clampE(eKj)
  if (e <= E_MELT_START) return 'ice'
  if (e <= E_MELT_END) return 'ice+water'
  if (e <= E_BOIL_START) return 'water'
  if (e <= E_BOIL_END) return 'water+steam'
  return 'steam'
}

/** Fraction melted 0..1 (0 before the melt plateau, 1 after). */
export function meltedFraction(eKj: number): number {
  return Math.min(Math.max((clampE(eKj) - E_MELT_START) / STAGE_KJ.melt, 0), 1)
}
/** Fraction boiled 0..1 (0 before the boil plateau, 1 after). */
export function boiledFraction(eKj: number): number {
  return Math.min(Math.max((clampE(eKj) - E_BOIL_START) / STAGE_KJ.boil, 0), 1)
}

export interface ParticleMix {
  solid: number // fractions of particles, sum = 1
  liquid: number
  gas: number
  /** relative vibration/jitter amplitude 0..1 growing with temperature (visual hint, not physical units) */
  jitter: number
}

/** How to draw the particle box at energy E: lattice / sliding / free particles and how fast they jiggle. */
export function particleMix(eKj: number): ParticleMix {
  const m = meltedFraction(eKj)
  const b = boiledFraction(eKj)
  const e = clampE(eKj)
  let solid = 0
  let liquid = 0
  let gas = 0
  if (e <= E_MELT_START) solid = 1
  else if (e <= E_MELT_END) {
    solid = 1 - m
    liquid = m
  } else if (e <= E_BOIL_START) liquid = 1
  else if (e <= E_BOIL_END) {
    liquid = 1 - b
    gas = b
  } else gas = 1
  const jitter = (temperatureAtEnergy(e) - START_C) / (END_C - START_C)
  return { solid, liquid, gas, jitter }
}

export type Direction = 'heating' | 'cooling'

/**
 * Energy content (kJ above the −20 °C ice) after t seconds at power P kW.
 * heating: starts at 0 (ice, −20 °C), E = P·t.
 * cooling: starts at E_TOTAL (steam, 120 °C), E = E_TOTAL − P·t, mirroring the heating curve.
 * Clamped to 0..E_TOTAL.
 */
export function energyAt(powerKw: number, seconds: number, direction: Direction = 'heating'): number {
  const q = powerKw * Math.max(seconds, 0)
  return clampE(direction === 'heating' ? q : E_TOTAL - q)
}

/** Seconds for the whole run at P kW (real time, x1): 1 kW -> 1548 s; 3 kW -> 516 s. */
export function runSeconds(powerKw: number): number {
  return E_TOTAL / powerKw
}

export interface Snapshot {
  t: number
  energy: number
  temp: number
  state: StateLabel
  mix: ParticleMix
  done: boolean // run finished (all energy added / removed)
}

/** Everything needed at time t (seconds of simulated time, i.e. wall time × speed factor). */
export function snapshotAt(powerKw: number, seconds: number, direction: Direction = 'heating'): Snapshot {
  const energy = energyAt(powerKw, seconds, direction)
  return {
    t: seconds,
    energy,
    temp: temperatureAtEnergy(energy),
    state: stateAtEnergy(energy),
    mix: particleMix(energy),
    done: seconds >= runSeconds(powerKw),
  }
}

export interface CurvePoint {
  t: number // s
  temp: number // °C
}

/**
 * Corners of the heating curve for the T-t graph (6 points; join with straight lines):
 * (0, −20), (21/P, 0), (188/P, 0), (398/P, 100), (1528/P, 100), (1548/P, 120).
 * The cooling curve is the same points mirrored: use { t: runSeconds − t, temp } reversed.
 */
export function curveCorners(powerKw: number): CurvePoint[] {
  return [
    { e: 0, temp: START_C },
    { e: E_MELT_START, temp: MELT_C },
    { e: E_MELT_END, temp: MELT_C },
    { e: E_BOIL_START, temp: BOIL_C },
    { e: E_BOIL_END, temp: BOIL_C },
    { e: E_TOTAL, temp: END_C },
  ].map((c) => ({ t: c.e / powerKw, temp: c.temp }))
}
