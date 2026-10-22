// Pure formulas for the `wave` simulation (p7-03). No React / three.
// Units: hertz (Hz), metre (m), second (s), radian (rad). Amplitudes are in the drawing unit (relative 0.2..1.0).
// Ranges used by the controls: f 0.5..5 Hz (step 0.5), lambda 0.5..3 m (step 0.5), A 0.2..1.0 (step 0.2),
// phase difference 0..360 deg (step 30), harmonic n 1..5, string length 1.5 m.
// Mechanical waves carry energy, not matter: a particle at fixed x only moves in y.

export const STRING_LENGTH = 1.5 // m, fixed length of the standing-wave string
export const FREQUENCY_RANGE = { min: 0.5, max: 5, step: 0.5 } as const
export const WAVELENGTH_RANGE = { min: 0.5, max: 3, step: 0.5 } as const
export const AMPLITUDE_RANGE = { min: 0.2, max: 1, step: 0.2 } as const
export const PHASE_RANGE = { min: 0, max: 360, step: 30 } as const
export const HARMONIC_RANGE = { min: 1, max: 5, step: 1 } as const

export type WaveMode = 'travelling' | 'superposition' | 'standing'

const DEG = Math.PI / 180

/** Wave speed v = f * lambda (m/s). f = 2 Hz, lambda = 1.5 m: 3.00 m/s. */
export function waveSpeed(frequency: number, wavelength: number): number {
  return frequency * wavelength
}

/** Period T = 1 / f (s). f = 2 Hz: 0.500 s. */
export function period(frequency: number): number {
  return 1 / frequency
}

/** Angular frequency omega = 2 pi f (rad/s). */
export function angularFrequency(frequency: number): number {
  return 2 * Math.PI * frequency
}

/** Wave number k = 2 pi / lambda (rad/m). */
export function waveNumber(wavelength: number): number {
  return (2 * Math.PI) / wavelength
}

/** Travelling wave to +x: y = A sin(kx - omega t). phaseDeg shifts the wave (y = A sin(kx - omega t + phi)). */
export function travellingY(
  amplitude: number,
  frequency: number,
  wavelength: number,
  x: number,
  t: number,
  phaseDeg = 0,
): number {
  return amplitude * Math.sin(waveNumber(wavelength) * x - angularFrequency(frequency) * t + phaseDeg * DEG)
}

/** Resultant amplitude |A1 + A2 e^{i phi}| = sqrt(A1^2 + A2^2 + 2 A1 A2 cos phi). A1 = A2 = 1: 0 deg 2.00, 90 deg 1.41, 180 deg 0.00. */
export function resultantAmplitude(a1: number, a2: number, phaseDeg: number): number {
  const v = a1 * a1 + a2 * a2 + 2 * a1 * a2 * Math.cos(phaseDeg * DEG)
  return Math.sqrt(Math.max(0, v)) // guard against -1e-16 from rounding
}

/** Sum of two waves of the same f and lambda, the second ahead by phaseDeg: y1 + y2. */
export function superpositionY(
  a1: number,
  a2: number,
  frequency: number,
  wavelength: number,
  phaseDeg: number,
  x: number,
  t: number,
): number {
  return (
    travellingY(a1, frequency, wavelength, x, t) + travellingY(a2, frequency, wavelength, x, t, phaseDeg)
  )
}

/** Standing wave y = 2A sin(kx) cos(omega t). The ends of a fixed string (x = 0, L) are nodes. */
export function standingY(amplitude: number, frequency: number, wavelength: number, x: number, t: number): number {
  return 2 * amplitude * Math.sin(waveNumber(wavelength) * x) * Math.cos(angularFrequency(frequency) * t)
}

/** Wavelength of harmonic n on a string fixed at both ends: lambda = 2L / n (m). n = 3, L = 1.5 m: 1.00 m. */
export function standingWavelength(n: number, length = STRING_LENGTH): number {
  return (2 * length) / n
}

/** Frequency of harmonic n: f_n = n v / (2L) (Hz). L = 1.5 m, v = 3.0 m/s: n = 1 -> 1.00 Hz, n = 3 -> 3.00 Hz. */
export function standingFrequency(n: number, speed: number, length = STRING_LENGTH): number {
  return (n * speed) / (2 * length)
}

/** Number of nodes of harmonic n including both fixed ends: n + 1. */
export function nodeCount(n: number): number {
  return n + 1
}

/** Node positions x = m L / n (m = 0..n), metres. */
export function nodePositions(n: number, length = STRING_LENGTH): number[] {
  return Array.from({ length: n + 1 }, (_, m) => (m * length) / n)
}

/** Antinode positions x = (m + 1/2) L / n (m = 0..n-1), metres. */
export function antinodePositions(n: number, length = STRING_LENGTH): number[] {
  return Array.from({ length: n }, (_, m) => ((m + 0.5) * length) / n)
}

export interface WaveReadout {
  speed: number // m/s
  period: number // s
  omega: number // rad/s
  k: number // rad/m
}

/** All numbers for the readout panel. f = 2 Hz, lambda = 1.5 m: v 3.00 m/s, T 0.500 s, omega 12.6 rad/s, k 4.19 rad/m. */
export function waveReadout(frequency: number, wavelength: number): WaveReadout {
  return {
    speed: waveSpeed(frequency, wavelength),
    period: period(frequency),
    omega: angularFrequency(frequency),
    k: waveNumber(wavelength),
  }
}
