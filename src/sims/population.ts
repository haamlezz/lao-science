// Pure formulas for the `population` simulation (b6-03). No React / three.
// Units: N in individuals, time in abstract "time units" (e.g. generations or months),
// r in 1/time unit, K in individuals, area in hectares (ha), density in individuals per ha.
// Model: exponential N = N0 e^(rt) (unlimited resources) and logistic
// N = K / (1 + ((K - N0)/N0) e^(-rt)) (limited by carrying capacity K). No randomness:
// every function is deterministic, so "stepping" is just evaluating the closed form.

export const N0_RANGE = { min: 5, max: 50, step: 5 } as const
export const R_RANGE = { min: 0.1, max: 1.0, step: 0.1 } as const
export const K_RANGE = { min: 100, max: 1000, step: 50 } as const
export const AREA_RANGE = { min: 1, max: 10, step: 1 } as const
export const TIME_MAX = 20
export const INITIAL = { n0: 10, r: 0.5, k: 500, area: 4 } as const
/** Number of dots drawn in the field is capped; the UI shows a "x k" note above this. */
export const DOT_CAP = 150

/** Exponential growth N(t) = N0 e^(rt). Unbounded. */
export function exponential(n0: number, r: number, t: number): number {
  return n0 * Math.exp(r * t)
}

/** Logistic growth N(t) = K / (1 + ((K - N0)/N0) e^(-rt)). Levels off at K; N0 must be > 0. */
export function logistic(n0: number, r: number, k: number, t: number): number {
  return k / (1 + ((k - n0) / n0) * Math.exp(-r * t))
}

/** Instantaneous logistic growth rate dN/dt = rN(1 - N/K) (individuals per time unit). */
export function growthRate(n: number, r: number, k: number): number {
  return r * n * (1 - n / k)
}

/** Maximum logistic growth rate rK/4, reached at N = K/2. */
export function maxGrowthRate(r: number, k: number): number {
  return (r * k) / 4
}

/** Population size at the inflection point of the S-curve (N = K/2). */
export function inflectionSize(k: number): number {
  return k / 2
}

/** Time at which the logistic curve reaches n (n0 < n < K), else null. */
export function timeToReachLogistic(n0: number, r: number, k: number, n: number): number | null {
  if (!(n > n0 && n < k) || n0 <= 0) return null
  return Math.log(((k - n0) / n0) * (n / (k - n))) / r
}

/** Time at which exponential growth reaches n (n > n0), else null. */
export function timeToReachExponential(n0: number, r: number, n: number): number | null {
  if (!(n > n0) || n0 <= 0 || r <= 0) return null
  return Math.log(n / n0) / r
}

/** Population density = N / area (individuals per ha). */
export function density(n: number, areaHa: number): number {
  return areaHa > 0 ? n / areaHa : 0
}

/** Number of dots to draw and the multiplier each dot stands for ("x k" note when k > 1). */
export function dotsFor(n: number, cap = DOT_CAP): { dots: number; each: number } {
  const count = Math.max(0, Math.round(n))
  if (count <= cap) return { dots: count, each: 1 }
  const each = Math.ceil(count / cap)
  return { dots: Math.round(count / each), each }
}

export interface PopPoint {
  t: number
  exponential: number
  logistic: number
}

/** Sample both models at t = 0, dt, 2dt, ... up to tMax inclusive. Deterministic. */
export function series(n0: number, r: number, k: number, tMax = TIME_MAX, dt = 0.5): PopPoint[] {
  const out: PopPoint[] = []
  const steps = Math.round(tMax / dt)
  for (let i = 0; i <= steps; i++) {
    const t = i * dt
    out.push({ t, exponential: exponential(n0, r, t), logistic: logistic(n0, r, k, t) })
  }
  return out
}
