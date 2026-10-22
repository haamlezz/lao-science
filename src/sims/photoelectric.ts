// Pure formulas for the `photoelectric` simulation (p7-09). No React / three.
// Units: electronvolt (eV), nanometre (nm), volt (V). hc = 1240 eV·nm (rounded school value).
// Metals use ROUNDED school work functions (eV): Cs 2.1, Na 2.3, Zn 4.3, Cu 4.7 (real values depend on the surface).
// Hydrogen (Bohr model, a historical model): E_n = -13.6 / n^2 eV.

export const HC = 1240 // eV·nm
export const RYDBERG_EV = 13.6 // eV, hydrogen ground-state binding energy
export const WAVELENGTH_RANGE = { min: 200, max: 700, step: 10 } as const // nm
export const INTENSITY_RANGE = { min: 0, max: 10, step: 1 } as const // relative
export const VISIBLE_RANGE = { min: 380, max: 750 } as const // nm, visible light (approximate)

export type MetalKey = 'Cs' | 'Na' | 'Zn' | 'Cu'
export const METALS: Record<MetalKey, number> = { Cs: 2.1, Na: 2.3, Zn: 4.3, Cu: 4.7 }
export const METAL_KEYS: MetalKey[] = ['Cs', 'Na', 'Zn', 'Cu']

/** Photon energy E = hc / lambda (eV). 400 nm: 3.10 eV. */
export function photonEnergy(wavelengthNm: number): number {
  return HC / wavelengthNm
}

/** Wavelength of a photon of energy E (nm). */
export function wavelengthOf(energyEv: number): number {
  return HC / energyEv
}

/** Threshold wavelength lambda0 = hc / W0 (nm). Cs 590, Na 539, Zn 288, Cu 264 (rounded). */
export function thresholdWavelength(workFunctionEv: number): number {
  return HC / workFunctionEv
}

export interface PhotoResult {
  /** Photon energy in eV. */
  energy: number
  /** True when E > W0 (emission occurs at any intensity > 0 in the sense of a possible current). */
  emits: boolean
  /** Maximum kinetic energy in eV: E - W0 when emitting, else 0. Independent of intensity. */
  kMax: number
  /** Stopping voltage in volts = kMax / e (numerically equal to kMax in eV). */
  stoppingVoltage: number
  /** Relative number of ejected electrons: proportional to intensity when emitting, else 0. */
  electronCount: number
  thresholdNm: number
}

/**
 * Photoelectric effect for a metal, wavelength (nm) and relative intensity 0..10.
 * Na, 400 nm: E 3.10 eV, K_max 0.80 eV, V_s 0.80 V. Na, 600 nm: no emission at any intensity.
 * Intensity 4 -> 8 doubles electronCount; kMax unchanged.
 */
export function photoelectric(metal: MetalKey, wavelengthNm: number, intensity: number): PhotoResult {
  const w0 = METALS[metal]
  const energy = photonEnergy(wavelengthNm)
  const emits = energy > w0
  const kMax = emits ? energy - w0 : 0
  return {
    energy,
    emits,
    kMax,
    stoppingVoltage: kMax,
    electronCount: emits ? intensity : 0,
    thresholdNm: thresholdWavelength(w0),
  }
}

/** Hydrogen level energy E_n = -13.6 / n^2 (eV). n = 1: -13.6, n = 2: -3.40. */
export function hydrogenLevel(n: number): number {
  return -RYDBERG_EV / (n * n)
}

/** Energy of the photon emitted in the jump n_i -> n_f: 13.6 (1/n_f^2 - 1/n_i^2) eV. Requires n_f < n_i. */
export function transitionEnergy(nInitial: number, nFinal: number): number {
  if (!(nFinal >= 1 && nFinal < nInitial)) throw new RangeError('need 1 <= n_f < n_i')
  return RYDBERG_EV * (1 / (nFinal * nFinal) - 1 / (nInitial * nInitial))
}

/** Wavelength of that photon (nm). 3->2: 656 (656.5); 4->2: 486; 5->2: 434; 6->2: 410; 2->1: 122. */
export function transitionWavelength(nInitial: number, nFinal: number): number {
  return HC / transitionEnergy(nInitial, nFinal)
}

export type SeriesName = 'Lyman' | 'Balmer' | 'Paschen' | 'Brackett' | 'Pfund'
const SERIES: SeriesName[] = ['Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund']

/** Series by final level: 1 Lyman (ultraviolet), 2 Balmer (visible), 3 Paschen (infrared), 4 Brackett, 5 Pfund. */
export function seriesName(nFinal: number): SeriesName {
  return SERIES[nFinal - 1]
}

/** True when the wavelength lies in visible light (about 380..750 nm). */
export function isVisible(wavelengthNm: number): boolean {
  return wavelengthNm >= VISIBLE_RANGE.min && wavelengthNm <= VISIBLE_RANGE.max
}

export type SpectralRegion = 'ultraviolet' | 'visible' | 'infrared'

export function spectralRegion(wavelengthNm: number): SpectralRegion {
  if (wavelengthNm < VISIBLE_RANGE.min) return 'ultraviolet'
  if (wavelengthNm > VISIBLE_RANGE.max) return 'infrared'
  return 'visible'
}

/** Approximate display colour (hex) for a wavelength; grey for non-visible light. Piecewise linear, for drawing only. */
export function wavelengthColor(wavelengthNm: number): string {
  const w = wavelengthNm
  if (!isVisible(w)) return '#9e9e9e'
  let r = 0
  let g = 0
  let b = 0
  if (w < 440) { r = (440 - w) / 60; b = 1 }
  else if (w < 490) { g = (w - 440) / 50; b = 1 }
  else if (w < 510) { g = 1; b = (510 - w) / 20 }
  else if (w < 580) { r = (w - 510) / 70; g = 1 }
  else if (w < 645) { r = 1; g = (645 - w) / 65 }
  else { r = 1 }
  // fade towards the edges of vision
  const f = w < 420 ? 0.3 + (0.7 * (w - 380)) / 40 : w > 700 ? 0.3 + (0.7 * (750 - w)) / 50 : 1
  const hex = (v: number) => Math.round(255 * Math.min(1, Math.max(0, v * f))).toString(16).padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}
