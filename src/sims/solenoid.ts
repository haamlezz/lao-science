// Pure formulas for the `solenoid` simulation (m4-05). No React / three.
// Units: turns, ampere (A), metre, tesla (T). Current is signed: I > 0 = "+" direction, I < 0 = "−".
//
// Sign convention (right-hand grip rule):
//  - Solenoid: the axis points to +x (screen right). I > 0 means the current circulates counter-clockwise
//    when viewed from the +x side, so the fingers curl with the current and the thumb (= north pole,
//    field direction inside) points to +x. I < 0 swaps the poles.
//  - Straight wire along +z (towards the viewer): I > 0 gives a field circulating counter-clockwise
//    seen from +z (thumb along the current). I < 0 gives clockwise.
//
// ILLUSTRATIVE numbers (labelled in the UI): iron core factor μr = 200 and the "pins lifted" scale.

export const MU0 = 4 * Math.PI * 1e-7 // T·m/A
export const COIL_LENGTH = 0.2 // m
export const IRON_MU_R = 200 // illustrative relative permeability (real iron varies a lot)
export const WIRE_DISTANCE = 0.05 // m, distance where the straight-wire field is evaluated
export const PIN_UNIT_T = 0.002 // T per pin (illustrative)
export const MAX_PINS = 20
export const BAR_MAGNET_TESLA = 0.01 // illustrative field at the pole of the bar magnet mode
export const TURNS_RANGE = { min: 10, max: 100, step: 10 } as const
export const CURRENT_RANGE = { min: 0, max: 5, step: 0.5 } as const

export type SolenoidMode = 'bar' | 'wire' | 'solenoid'
export type Polarity = 'N-right' | 'N-left' | 'none'
export type Circulation = 'counterclockwise' | 'clockwise' | 'none'

export interface SolenoidInput {
  mode: SolenoidMode
  turns: number // 10..100
  current: number // A, signed (slider 0..5 with a "+/−" direction toggle)
  ironCore: boolean
}

export interface SolenoidResult {
  /** Field magnitude in tesla: inside the solenoid, at 5 cm from the wire, or at the bar-magnet pole. */
  fieldT: number
  fieldMilliT: number
  /** Pins lifted = round(B / 2 mT), capped at 20 (illustrative). 0 when I = 0 (solenoid) . */
  pins: number
  /** 0..1 relative strength for line density = min(1, B / (MAX_PINS·PIN_UNIT_T)) (illustrative). */
  strength: number
  /** Solenoid/bar: where the north pole is. Wire: 'none'. */
  polarity: Polarity
  /** Wire mode: sense of the circular field lines. Others: 'none'. */
  circulation: Circulation
  /** Multiplier from the core actually applied (1 or IRON_MU_R). */
  coreFactor: number
}

/** Solenoid field B = μ0 · n · I with n = N / L (T), sign follows I. N = 50, I = 2 A: 0.63 mT. */
export function solenoidField(turns: number, amps: number, ironCore = false, length = COIL_LENGTH): number {
  const n = turns / length
  return MU0 * n * amps * (ironCore ? IRON_MU_R : 1)
}

/** Straight-wire field B = μ0·I / (2π r) (T), sign follows I. I = 2 A, r = 5 cm: 8.0 µT. */
export function wireField(amps: number, r = WIRE_DISTANCE): number {
  return (MU0 * amps) / (2 * Math.PI * r)
}

/** Pins lifted for a field magnitude (illustrative): round(|B| / 2 mT), 0..20. */
export function pinsFor(fieldT: number): number {
  return Math.min(MAX_PINS, Math.round(Math.abs(fieldT) / PIN_UNIT_T))
}

/** North-pole side of a solenoid for signed current (right-hand grip rule). */
export function solenoidPolarity(amps: number): Polarity {
  if (amps > 0) return 'N-right'
  if (amps < 0) return 'N-left'
  return 'none'
}

/** Direction of the circular field around a straight wire carrying signed current along +z. */
export function wireCirculation(amps: number): Circulation {
  if (amps > 0) return 'counterclockwise'
  if (amps < 0) return 'clockwise'
  return 'none'
}

/**
 * All numbers the scene/readout needs.
 * solenoid, N = 50, I = 2, no core: 0.63 mT, pins 0.  N = 100, I = 4: 2.51 mT (4×), pins 1.
 * iron core: ×200 (illustrative) -> N = 50, I = 2: 125.7 mT, pins 20 (capped).
 * wire, I = 2 A: 8.0 µT, pins 0. bar magnet: fixed illustrative 10 mT, N pole right, pins 5.
 */
export function solenoidState(input: SolenoidInput): SolenoidResult {
  const { mode, turns, current, ironCore } = input
  let fieldT = 0
  let polarity: Polarity = 'none'
  let circulation: Circulation = 'none'
  let coreFactor = 1
  if (mode === 'solenoid') {
    coreFactor = ironCore ? IRON_MU_R : 1
    fieldT = solenoidField(turns, current, ironCore)
    polarity = solenoidPolarity(current)
  } else if (mode === 'wire') {
    fieldT = wireField(current)
    circulation = wireCirculation(current)
  } else {
    fieldT = BAR_MAGNET_TESLA
    polarity = 'N-right'
  }
  const mag = Math.abs(fieldT)
  return {
    fieldT: mag,
    fieldMilliT: mag * 1000,
    pins: pinsFor(mag),
    strength: Math.min(1, mag / (MAX_PINS * PIN_UNIT_T)),
    polarity,
    circulation,
    coreFactor,
  }
}
