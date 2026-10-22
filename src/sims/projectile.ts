// Pure formulas for the `projectile` simulation (p5-05). No React / three.
// Units: m, s, m/s, m/s², degrees. No air resistance. Ground is y = 0; launch at height h0.

import { G_EARTH, G_MOON } from './force'

export const G_EARTH_MS2 = G_EARTH // 9.8
export const G_MOON_MS2 = G_MOON // 1.6, same constant as the force sim

export const SPEED_RANGE = { min: 5, max: 50, step: 1 } // m/s
export const ANGLE_RANGE = { min: 0, max: 90, step: 5 } // degrees
export const HEIGHTS = [0, 10] as const // m
export const TRACE_INTERVAL = 0.25 // s between trace dots

export interface LaunchParams {
  v0: number // launch speed, m/s
  angleDeg: number // above horizontal
  h0: number // launch height, m (>= 0)
  g: number // m/s²
}

const rad = (deg: number) => (deg * Math.PI) / 180

/** Horizontal velocity component vₓ = v0 cos θ (constant). */
export const vx = (p: LaunchParams): number => p.v0 * Math.cos(rad(p.angleDeg))

/** Initial vertical component v_y0 = v0 sin θ. */
export const vy0 = (p: LaunchParams): number => p.v0 * Math.sin(rad(p.angleDeg))

/** Time of flight T = (v_y0 + √(v_y0² + 2 g h0)) / g, s. */
export function flightTime(p: LaunchParams): number {
  const v = vy0(p)
  return (v + Math.sqrt(v * v + 2 * p.g * p.h0)) / p.g
}

/** Time to the apex (0 if the ball is launched level or downward), s. */
export function timeToApex(p: LaunchParams): number {
  return Math.max(vy0(p), 0) / p.g
}

/** Maximum height H = h0 + v_y0² / (2g), m (h0 when v_y0 <= 0). */
export function maxHeight(p: LaunchParams): number {
  const v = Math.max(vy0(p), 0)
  return p.h0 + (v * v) / (2 * p.g)
}

/** Horizontal range R = vₓ T, m. With h0 = 0 this equals v0² sin 2θ / g. */
export function range(p: LaunchParams): number {
  return vx(p) * flightTime(p)
}

/** Closed form for h0 = 0 only: R = v0² sin 2θ / g. Used to cross-check `range`. */
export function rangeLevel(v0: number, angleDeg: number, g: number): number {
  return (v0 * v0 * Math.sin(2 * rad(angleDeg))) / g
}

const clampT = (p: LaunchParams, t: number) => Math.min(Math.max(t, 0), flightTime(p))

/** x(t) = vₓ t, clamped to the flight. */
export function xAt(p: LaunchParams, t: number): number {
  return vx(p) * clampT(p, t)
}

/** y(t) = h0 + v_y0 t − ½ g t², clamped to the flight (0 at landing). */
export function yAt(p: LaunchParams, t: number): number {
  const T = flightTime(p)
  const tt = Math.min(Math.max(t, 0), T)
  return tt >= T ? 0 : Math.max(p.h0 + vy0(p) * tt - 0.5 * p.g * tt * tt, 0)
}

/** v_y(t) = v_y0 − g t, clamped to the flight (impact value at the end). */
export function vyAt(p: LaunchParams, t: number): number {
  return vy0(p) - p.g * clampT(p, t)
}

/** Speed √(vₓ² + v_y²) at time t, m/s. */
export function speedAt(p: LaunchParams, t: number): number {
  return Math.hypot(vx(p), vyAt(p, t))
}

/** Height of a second ball released from rest at (0, h0) at t = 0, clamped at the ground. */
export function droppedY(p: LaunchParams, t: number): number {
  return Math.max(p.h0 - 0.5 * p.g * Math.max(t, 0) ** 2, 0)
}

/** Fall time of the dropped ball √(2 h0 / g), s. Equals flightTime when θ = 0. */
export function droppedTime(p: LaunchParams): number {
  return Math.sqrt((2 * p.h0) / p.g)
}

export interface TracePoint {
  t: number
  x: number
  y: number
}

/** Trace dots every `dt` seconds (default 0.25 s) from t = 0 to the landing (the last dot is the landing point). */
export function trace(p: LaunchParams, dt = TRACE_INTERVAL): TracePoint[] {
  const T = flightTime(p)
  const pts: TracePoint[] = []
  for (let t = 0; t < T - 1e-9; t += dt) pts.push({ t, x: xAt(p, t), y: yAt(p, t) })
  pts.push({ t: T, x: xAt(p, T), y: 0 })
  return pts
}
