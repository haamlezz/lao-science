/** Small helpers shared by the upper-secondary physics sims (axis scales and number text). */

/** Smallest "nice" step (1, 2, 5 x 10^k) such that span / step <= maxTicks. */
export function niceStep(span: number, maxTicks: number): number {
  const raw = Math.max(span, 1e-9) / Math.max(maxTicks, 1)
  const pow = 10 ** Math.floor(Math.log10(raw))
  for (const m of [1, 2, 5, 10]) if (m * pow >= raw) return m * pow
  return 10 * pow
}

/** Tick values from `lo` to `hi` (inclusive) on multiples of `step`. */
export function ticksBetween(lo: number, hi: number, step: number): number[] {
  const out: number[] = []
  const first = Math.ceil(lo / step - 1e-9)
  for (let i = first; i * step <= hi + step * 1e-9; i++) out.push(Math.round(i * step * 1e6) / 1e6)
  return out
}

/** Fixed-decimals text that never prints "-0.00". */
export function fx(n: number, d = 2): string {
  const s = n.toFixed(d)
  return /^-0\.?0*$/.test(s) ? s.slice(1) : s
}

/** Round up to 3 significant figures for tick labels. */
export function tickText(n: number): string {
  const r = Math.round(n * 1000) / 1000
  return Object.is(r, -0) ? '0' : String(r)
}
