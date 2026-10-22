// Pure formulas for the `gaslaw` simulation (c5-06) and physics lesson p6-01.
// Generic: every law takes two states and returns the unknown. Temperature is ALWAYS in kelvin inside
// the formulas; use celsiusToKelvin at the boundary. Pressure and volume may be in any consistent unit
// (the ratios cancel the unit); the ideal-gas functions use SI (Pa, m³, mol, K) or the helpers below.

export const R = 8.314 // J/(mol·K)
export const ZERO_C_IN_K = 273.15
export const ATM_PA = 101325 // Pa
export const STP_MOLAR_VOLUME_L = 22.4 // L/mol, school value at 0 °C and 1 atm
export const ABSOLUTE_ZERO_C = -273.15

export function celsiusToKelvin(c: number): number {
  return c + ZERO_C_IN_K
}
export function kelvinToCelsius(k: number): number {
  return k - ZERO_C_IN_K
}
/** Throws for T <= 0 K (no value below absolute zero). */
function assertKelvin(t: number): void {
  if (!(t > 0)) throw new RangeError('temperature must be > 0 K')
}
function assertPositive(x: number, what: string): void {
  if (!(x > 0)) throw new RangeError(`${what} must be > 0`)
}

export const Lper_m3 = 1e-3
export const litresToM3 = (l: number): number => l * 1e-3
export const m3ToLitres = (m3: number): number => m3 * 1e3
export const kPaToPa = (k: number): number => k * 1000
export const paToKPa = (p: number): number => p / 1000
export const atmToPa = (a: number): number => a * ATM_PA
export const paToAtm = (p: number): number => p / ATM_PA

/** Boyle (T, n constant): p1·V1 = p2·V2. Returns the new pressure (same unit as p1). */
export function boylePressure(p1: number, v1: number, v2: number): number {
  assertPositive(v2, 'volume')
  return (p1 * v1) / v2
}
/** Boyle: new volume (same unit as v1) for a new pressure p2. */
export function boyleVolume(p1: number, v1: number, p2: number): number {
  assertPositive(p2, 'pressure')
  return (p1 * v1) / p2
}
/** Charles (p, n constant): V1/T1 = V2/T2. T in kelvin. Returns V2. */
export function charlesVolume(v1: number, t1: number, t2: number): number {
  assertKelvin(t1)
  assertKelvin(t2)
  return (v1 * t2) / t1
}
/** Gay-Lussac (V, n constant): p1/T1 = p2/T2. T in kelvin. Returns p2. */
export function gayLussacPressure(p1: number, t1: number, t2: number): number {
  assertKelvin(t1)
  assertKelvin(t2)
  return (p1 * t2) / t1
}
/** Combined law p1V1/T1 = p2V2/T2 (n constant). Returns p2. */
export function combinedPressure(p1: number, v1: number, t1: number, v2: number, t2: number): number {
  assertKelvin(t1)
  assertKelvin(t2)
  assertPositive(v2, 'volume')
  return (p1 * v1 * t2) / (t1 * v2)
}
/** Combined law, returns V2 for a given p2. */
export function combinedVolume(p1: number, v1: number, t1: number, p2: number, t2: number): number {
  assertKelvin(t1)
  assertKelvin(t2)
  assertPositive(p2, 'pressure')
  return (p1 * v1 * t2) / (t1 * p2)
}
/** Combined law, returns T2 (K) for given p2 and V2. */
export function combinedTemperature(p1: number, v1: number, t1: number, p2: number, v2: number): number {
  assertKelvin(t1)
  assertPositive(p1 * v1, 'p1·V1')
  return (p2 * v2 * t1) / (p1 * v1)
}
/** Avogadro (p, T constant): V1/n1 = V2/n2. Returns V2. */
export function avogadroVolume(v1: number, n1: number, n2: number): number {
  assertPositive(n1, 'amount')
  return (v1 * n2) / n1
}

/** Ideal gas, SI: p = nRT/V with n mol, T K, V m³ -> Pa. */
export function idealPressure(n: number, tK: number, vM3: number): number {
  assertKelvin(tK)
  assertPositive(vM3, 'volume')
  return (n * R * tK) / vM3
}
/** V = nRT/p with p in Pa -> m³. */
export function idealVolume(n: number, tK: number, pPa: number): number {
  assertKelvin(tK)
  assertPositive(pPa, 'pressure')
  return (n * R * tK) / pPa
}
/** T = pV/(nR) with p Pa, V m³ -> K. */
export function idealTemperature(pPa: number, vM3: number, n: number): number {
  assertPositive(n, 'amount')
  return (pPa * vM3) / (n * R)
}
/** n = pV/(RT) with p Pa, V m³, T K -> mol. */
export function idealAmount(pPa: number, vM3: number, tK: number): number {
  assertKelvin(tK)
  return (pPa * vM3) / (R * tK)
}

/** Convenience in lab units: n mol, T K, V litres -> p in kPa. */
export function pressureKPa(n: number, tK: number, vL: number): number {
  return paToKPa(idealPressure(n, tK, litresToM3(vL)))
}
/** Convenience: n mol, T K, p kPa -> V in litres. */
export function volumeL(n: number, tK: number, pKPa: number): number {
  return m3ToLitres(idealVolume(n, tK, kPaToPa(pKPa)))
}

/** Molar volume (L/mol) at the given T (K) and p (kPa). 22.4 L/mol at 273.15 K, 101.325 kPa. */
export function molarVolumeL(tK: number, pKPa: number): number {
  return volumeL(1, tK, pKPa)
}

/** Dalton: partial pressure of a component = mole fraction × total pressure. */
export function partialPressure(nComponent: number, nTotal: number, pTotal: number): number {
  assertPositive(nTotal, 'total amount')
  return (nComponent / nTotal) * pTotal
}

/** Graham: rate1/rate2 = sqrt(M2/M1) (molar masses in g/mol). */
export function grahamRatio(m1: number, m2: number): number {
  assertPositive(m1, 'molar mass')
  assertPositive(m2, 'molar mass')
  return Math.sqrt(m2 / m1)
}

/** Root-mean-square speed sqrt(3RT/M), M in g/mol, result m/s (used for particle speed ∝ √T). */
export function rmsSpeed(tK: number, molarMassGPerMol: number): number {
  assertKelvin(tK)
  return Math.sqrt((3 * R * tK) / (molarMassGPerMol / 1000))
}

/** Law modes of the sim: which quantity is held constant. */
export type GasLaw = 'boyle' | 'charles' | 'gaylussac' | 'free'
export const HELD_CONSTANT: Record<GasLaw, string> = {
  boyle: 'T',
  charles: 'p',
  gaylussac: 'V',
  free: 'n',
}

export interface GasState {
  nMol: number
  tK: number
  vL: number
}
/** Pressure (kPa) of a sim state. */
export function statePressureKPa(s: GasState): number {
  return pressureKPa(s.nMol, s.tK, s.vL)
}
