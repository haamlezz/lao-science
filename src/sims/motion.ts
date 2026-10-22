// Pure formulas for the `motion` simulation (m1-04). No React / three.
// Units: seconds, metres, m/s, m/s². All functions are total (time is clamped to 0..RUN_SECONDS).

export type MotionMode = 'uniform' | 'accelerating'

export const RUN_SECONDS = 10
export const TRACK_WINDOW_M = 100
export const KMH_PER_MS = 3.6
export const MAX_SPEED = 20 // slider range 0..20 m/s
export const MAX_ACCEL = 4 // slider range 0..4 m/s²

export interface MotionParams {
  mode: MotionMode
  v: number // m/s, used in 'uniform'
  a: number // m/s², used in 'accelerating' (starts from rest)
}

const clampT = (t: number) => Math.min(Math.max(t, 0), RUN_SECONDS)

export const msToKmh = (v: number) => v * KMH_PER_MS
export const kmhToMs = (v: number) => v / KMH_PER_MS

/** Distance travelled after t seconds: uniform s = v·t; accelerating from rest s = ½·a·t². */
export function distanceAt(p: MotionParams, t: number): number {
  const tt = clampT(t)
  return p.mode === 'uniform' ? p.v * tt : 0.5 * p.a * tt * tt
}

/** Instantaneous speed: uniform v; accelerating from rest v = a·t. */
export function speedAt(p: MotionParams, t: number): number {
  const tt = clampT(t)
  return p.mode === 'uniform' ? p.v : p.a * tt
}

/** Average speed s/t (0 at t = 0). */
export function averageSpeed(p: MotionParams, t: number): number {
  const tt = clampT(t)
  return tt === 0 ? 0 : distanceAt(p, tt) / tt
}

export interface GraphPoint {
  t: number
  s: number
}

/** Points (t, s) for the live distance-time graph from t = 0 to tEnd, `count` >= 2 evenly spaced points. */
export function sampleGraph(p: MotionParams, tEnd: number, count = 41): GraphPoint[] {
  const end = clampT(tEnd)
  const n = Math.max(2, Math.floor(count))
  return Array.from({ length: n }, (_, i) => {
    const t = (end * i) / (n - 1)
    return { t, s: distanceAt(p, t) }
  })
}

/** Distance at the end of a full run: used to scale the graph axis. */
export function maxDistance(p: MotionParams): number {
  return distanceAt(p, RUN_SECONDS)
}

/** The 100 m track window that contains distance s: [start, start + 100]. */
export function trackWindow(s: number): { start: number; end: number } {
  const start = Math.floor(Math.max(s, 0) / TRACK_WINDOW_M) * TRACK_WINDOW_M
  return { start, end: start + TRACK_WINDOW_M }
}

export interface MotionState {
  t: number
  s: number
  v: number
  vKmh: number
  avg: number
  window: { start: number; end: number }
  finished: boolean
}

/** Everything the scene/readout needs at time t, computed once. */
export function motionState(p: MotionParams, t: number): MotionState {
  const tt = clampT(t)
  const s = distanceAt(p, tt)
  const v = speedAt(p, tt)
  return {
    t: tt,
    s,
    v,
    vKmh: msToKmh(v),
    avg: averageSpeed(p, tt),
    window: trackWindow(s),
    finished: tt >= RUN_SECONDS,
  }
}
