// Pure formulas for the `kinematics` simulation (p5-01). No React / three.
// Units: seconds, metres, m/s, m/s². Positive direction: right (uniform, accelerated) or UP (freefall).
// No air resistance. Time is clamped to 0..duration(p) so every function is total.

export type KinMode = 'uniform' | 'accelerated' | 'freefall'

export const G = 9.8 // m/s², free fall (downward)
export const RUN_SECONDS = 10 // length of a run in 'uniform' and 'accelerated'

// Slider ranges from the spec
export const X0_RANGE = { min: -20, max: 20, step: 5 } // m
export const V0_RANGE = { min: -10, max: 20, step: 1 } // m/s (freefall: 0..20, upward)
export const A_RANGE = { min: -5, max: 5, step: 0.5 } // m/s²
export const DROP_HEIGHT_RANGE = { min: 0, max: 50 } // m (freefall: starting height y0)

export interface KinParams {
  mode: KinMode
  /** Start position (m). In 'freefall' this is the start height above the ground (m, >= 0). */
  x0: number
  /** Start velocity (m/s). In 'freefall' positive = thrown upward. */
  v0: number
  /** Acceleration (m/s²), used only in 'accelerated'. */
  a: number
}

/** The acceleration actually used: 0 in uniform, a in accelerated, -g in freefall. */
export function effectiveAccel(p: KinParams): number {
  return p.mode === 'uniform' ? 0 : p.mode === 'freefall' ? -G : p.a
}

/** Time (s) at which the ball reaches the ground (y = 0): positive root of y0 + v0 t - g t²/2. */
export function landingTime(y0: number, v0: number): number {
  const h = Math.max(y0, 0)
  return (v0 + Math.sqrt(v0 * v0 + 2 * G * h)) / G
}

/** Length of a run: 10 s, or the landing time for free fall. */
export function duration(p: KinParams): number {
  return p.mode === 'freefall' ? landingTime(p.x0, p.v0) : RUN_SECONDS
}

const clampT = (p: KinParams, t: number) => Math.min(Math.max(t, 0), duration(p))

/** x = x0 + v0 t + ½ a t² (y for free fall). */
export function position(p: KinParams, t: number): number {
  const tt = clampT(p, t)
  const a = effectiveAccel(p)
  return p.x0 + p.v0 * tt + 0.5 * a * tt * tt
}

/** v = v0 + a t. For free fall the value at the landing time is the impact velocity (negative). */
export function velocity(p: KinParams, t: number): number {
  return p.v0 + effectiveAccel(p) * clampT(p, t)
}

/** Displacement x - x0 (m, signed). */
export function displacement(p: KinParams, t: number): number {
  return position(p, t) - p.x0
}

/** Time at which v = 0 (turning point), or null when it never happens in 0 < t <= duration. */
export function turningTime(p: KinParams): number | null {
  const a = effectiveAccel(p)
  if (a === 0 || p.v0 === 0) return null
  const t = -p.v0 / a
  return t > 0 && t <= duration(p) ? t : null
}

/** Total path length (m, >= 0): differs from |displacement| when the direction reverses. */
export function distanceTravelled(p: KinParams, t: number): number {
  const tt = clampT(p, t)
  const tTurn = turningTime(p)
  if (tTurn === null || tt <= tTurn) return Math.abs(displacement(p, tt))
  const xTurn = position(p, tTurn)
  return Math.abs(xTurn - p.x0) + Math.abs(position(p, tt) - xTurn)
}

/** Highest point of a throw upward in free fall: y0 + v0²/(2g). Equals y0 when v0 <= 0. */
export function maxHeight(y0: number, v0: number): number {
  return v0 > 0 ? y0 + (v0 * v0) / (2 * G) : y0
}

/** Time to the top of a throw: v0/g (0 when v0 <= 0). */
export function timeToTop(v0: number): number {
  return v0 > 0 ? v0 / G : 0
}

/** Area under the v-t graph from 0 to t (m, signed) = displacement. Computed as a trapezoid (exact for linear v). */
export function areaUnderV(p: KinParams, t: number): number {
  const tt = clampT(p, t)
  return 0.5 * (p.v0 + velocity(p, tt)) * tt
}

export interface KinSample {
  t: number
  x: number
  v: number
}

/** `count` (>= 2) evenly spaced samples from 0 to tEnd for the x-t and v-t graphs. */
export function sample(p: KinParams, tEnd: number, count = 41): KinSample[] {
  const end = clampT(p, tEnd)
  const n = Math.max(2, Math.floor(count))
  return Array.from({ length: n }, (_, i) => {
    const t = (end * i) / (n - 1)
    return { t, x: position(p, t), v: velocity(p, t) }
  })
}

export interface KinState {
  t: number
  x: number
  v: number
  a: number
  displacement: number
  distance: number
  finished: boolean
}

/** Everything the scene/readout needs at time t. */
export function kinState(p: KinParams, t: number): KinState {
  const tt = clampT(p, t)
  return {
    t: tt,
    x: position(p, tt),
    v: velocity(p, tt),
    a: effectiveAccel(p),
    displacement: displacement(p, tt),
    distance: distanceTravelled(p, tt),
    finished: tt >= duration(p),
  }
}
