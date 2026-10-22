// Pure formulas for the `induction` simulation (p7-05). No React / three.
// Units: metre (m), m/s, weber (Wb), tesla (T), volt (V), hertz (Hz), second (s).
//
// Magnet mode uses an ILLUSTRATIVE flux model (label it in the UI):
//   Phi(x) = PHI0 / (1 + (x/W)^2), PHI0 = 1.00 mWb, W = 0.05 m, x = magnet centre relative to the coil centre.
// EMF: eps = -N dPhi/dt = -N (dPhi/dx) v, v = dx/dt (signed, + = towards +x).
// Sign: with polarity +1 a magnet moving towards the coil (|x| shrinking) gives eps of one sign and moving away
// the opposite sign (Lenz: the induced current opposes the change); polarity -1 flips every sign.

export const PHI0 = 1e-3 // Wb, illustrative peak flux
export const FLUX_WIDTH = 0.05 // m, illustrative
export const MAGNET_X_RANGE = { min: -0.3, max: 0.3 } as const
export const MAGNET_SPEED_RANGE = { min: 0, max: 2, step: 0.5 } as const
export const TURNS_RANGE = { min: 20, max: 200, step: 20 } as const
export const FIELD_RANGE = { min: 0.05, max: 0.5, step: 0.05 } as const
export const GENERATOR_TURNS_RANGE = { min: 50, max: 200, step: 10 } as const
export const GENERATOR_FREQ_RANGE = { min: 10, max: 60, step: 5 } as const
export const LOOP_AREA = 0.01 // m^2, fixed

export type InductionMode = 'magnet' | 'generator'
export type MagnetDirection = 'in' | 'out'

/** Illustrative flux through the coil (Wb). x = 0: 1.00 mWb; x = 0.05 m: 0.50 mWb. */
export function flux(x: number): number {
  const u = x / FLUX_WIDTH
  return PHI0 / (1 + u * u)
}

/** dPhi/dx (Wb/m). Largest magnitude 1.30e-2 Wb/m at |x| = W / sqrt(3) = 0.0289 m; zero at x = 0. */
export function fluxGradient(x: number): number {
  const u = x / FLUX_WIDTH
  const d = 1 + u * u
  return (-PHI0 * 2 * u) / (FLUX_WIDTH * d * d)
}

/** Position at which |dPhi/dx| is largest: W / sqrt(3) = 0.0289 m. */
export const PEAK_EMF_X = FLUX_WIDTH / Math.sqrt(3)

/**
 * EMF (V) of the coil for a magnet at x moving with signed velocity v (m/s): eps = -N (dPhi/dx) v, times polarity (+1 or -1).
 * N = 100, v = 1.0 m/s: peak |eps| = 1.30 V at x = +-0.029 m; N = 50: 0.65 V; v = 0: 0 V.
 */
export function magnetEmf(turns: number, x: number, velocity: number, polarity: 1 | -1 = 1): number {
  const e = -turns * fluxGradient(x) * velocity * polarity
  return e === 0 ? 0 : e // normalise -0
}

/** Signed velocity for a speed and a direction, given which side the magnet starts on (x < 0 = approaching from -x). */
export function signedVelocity(speed: number, direction: MagnetDirection): number {
  // 'in' = moves towards +x from the -x side (towards and through the coil); 'out' = moves back towards -x.
  return direction === 'in' ? speed : -speed
}

/** Peak |EMF| over all positions for given N and speed (V): N * (3 sqrt(3) / 8) * PHI0 / W * v. */
export function magnetPeakEmf(turns: number, speed: number): number {
  return Math.abs(magnetEmf(turns, PEAK_EMF_X, speed))
}

/** Generator angular frequency omega = 2 pi f (rad/s). */
export function generatorOmega(frequency: number): number {
  return 2 * Math.PI * frequency
}

/** Peak EMF = N B A omega (V). N = 100, B = 0.1 T, A = 0.01 m^2, f = 50 Hz: 31.4 V. */
export function generatorPeak(turns: number, bField: number, frequency: number, area = LOOP_AREA): number {
  return turns * bField * area * generatorOmega(frequency)
}

/** Instantaneous EMF eps(t) = N B A omega sin(omega t) (V). */
export function generatorEmf(turns: number, bField: number, frequency: number, t: number, area = LOOP_AREA): number {
  return generatorPeak(turns, bField, frequency, area) * Math.sin(generatorOmega(frequency) * t)
}

/** rms = peak / sqrt(2) (V). Peak 31.4 V: 22.2 V. */
export function rms(peak: number): number {
  return peak / Math.SQRT2
}

/** Period T = 1 / f (s). 50 Hz: 20.0 ms. */
export function generatorPeriod(frequency: number): number {
  return 1 / frequency
}
