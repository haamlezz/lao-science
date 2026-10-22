// Pure formulas for the `newton` simulation (p5-02). No React / three.
// Units: kg, N, m/s², degrees. g = 9.8 m/s². Positive direction: right on the flat, UP THE SLOPE on the incline.
// The applied force F acts along the surface in the positive direction.

import { G_EARTH } from './force'

export type Surface = 'frictionless' | 'wood' | 'rough'
export type Layout = 'flat' | 'incline'

/** Friction coefficients (static, kinetic) from the spec. */
export const SURFACES: Record<Surface, { muS: number; muK: number }> = {
  frictionless: { muS: 0, muK: 0 },
  wood: { muS: 0.4, muK: 0.3 },
  rough: { muS: 0.6, muK: 0.5 },
}

export const G = G_EARTH // 9.8
export const MASS_RANGE = { min: 1, max: 10, step: 1 } // kg
export const FORCE_RANGE = { min: 0, max: 50, step: 5 } // N
export const ANGLE_RANGE = { min: 0, max: 45, step: 5 } // degrees

export interface NewtonParams {
  mass: number // kg
  force: number // N, applied along the surface (up the slope)
  surface: Surface
  layout: Layout
  angleDeg: number // used only when layout = 'incline'
}

export type Regime = 'static' | 'kinetic'

export interface NewtonResult {
  weight: number // W = mg, N
  normal: number // N = mg cos θ, N
  alongSlope: number // mg sin θ, N (component of weight down the slope, >= 0)
  drive: number // T = F - mg sin θ, N (signed, positive up the slope)
  maxStatic: number // μs N, N
  regime: Regime
  /** Signed acceleration (m/s²), positive up the slope / to the right. 0 when static. */
  a: number
  /** Signed friction force (N). Static: -T (|f| <= μs N). Kinetic: opposes the motion, magnitude μk N. */
  friction: number
}

export const angleOf = (p: NewtonParams): number => (p.layout === 'incline' ? p.angleDeg : 0)

/** Forces and acceleration of a block that starts at rest (or has v = 0). */
export function solveFromRest(p: NewtonParams): NewtonResult {
  const th = (angleOf(p) * Math.PI) / 180
  const { muS, muK } = SURFACES[p.surface]
  const weight = p.mass * G
  const normal = weight * Math.cos(th)
  const alongSlope = weight * Math.sin(th)
  const drive = p.force - alongSlope
  const maxStatic = muS * normal
  if (Math.abs(drive) <= maxStatic + 1e-9) {
    // 1e-9: a sin/cos rounding error must not tip an exact balance into motion
    return { weight, normal, alongSlope, drive, maxStatic, regime: 'static', a: 0, friction: -drive }
  }
  const dir = Math.sign(drive)
  const a = (dir * (Math.abs(drive) - muK * normal)) / p.mass
  return { weight, normal, alongSlope, drive, maxStatic, regime: 'kinetic', a, friction: -dir * muK * normal }
}

/** Acceleration of a block that is already moving with signed velocity v (kinetic friction opposes v). */
export function accelWhileMoving(p: NewtonParams, v: number): number {
  if (v === 0) return solveFromRest(p).a
  const r = solveFromRest(p)
  const { muK } = SURFACES[p.surface]
  return (r.drive - Math.sign(v) * muK * r.normal) / p.mass
}

/**
 * One explicit time step of the velocity. Friction never reverses the motion: if the velocity would
 * change sign the block stops (v = 0) and the static check applies on the next step.
 */
export function stepVelocity(p: NewtonParams, v: number, dt: number): number {
  const a = accelWhileMoving(p, v)
  const next = v + a * dt
  if (v !== 0 && Math.sign(next) !== Math.sign(v)) return 0
  return next
}

/** Newton's 3rd law: the block pushes on the surface with the normal force's reaction (equal size, opposite). */
export function reactionOfNormal(r: NewtonResult): number {
  return -r.normal
}
