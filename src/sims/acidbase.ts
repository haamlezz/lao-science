// Pure formulas for the `acidbase` simulation (c7-04). No React / three. 25 °C, Kw = 1e-14.
// Concentrations mol/L, volumes mL. Ideal dilute solutions (activities ignored).

export const KW = 1e-14
export const KA_ACETIC = 1.8e-5
export const TITRATION = { acidVolumeMl: 25, concentration: 0.1, maxBaseMl: 50, stepMl: 0.1 } as const

export const pH = (h: number): number => -Math.log10(h)
export const pOH = (pHv: number): number => 14 - pHv
export const hFromPH = (pHv: number): number => Math.pow(10, -pHv)
export const ohFromPH = (pHv: number): number => Math.pow(10, -(14 - pHv))

/** pH of a strong monoprotic acid of concentration c (M), includes water autoprotolysis for tiny c. */
export function pHStrongAcid(c: number): number {
  return pH((c + Math.sqrt(c * c + 4 * KW)) / 2)
}
/** pH of a strong monobasic base of concentration c (M). 0.1 M NaOH -> 13.00. */
export function pHStrongBase(c: number): number {
  return 14 - pH((c + Math.sqrt(c * c + 4 * KW)) / 2)
}
/** pH of a weak acid: x²/(C − x) = Ka solved exactly. 0.100 M, Ka 1.8e-5 -> 2.88. */
export function pHWeakAcid(c: number, ka: number): number {
  const x = (-ka + Math.sqrt(ka * ka + 4 * ka * c)) / 2
  return pH(x)
}
/** Weak base with constant Kb. */
export function pHWeakBase(c: number, kb: number): number {
  const x = (-kb + Math.sqrt(kb * kb + 4 * kb * c)) / 2
  return 14 + Math.log10(x)
}
/** Henderson–Hasselbalch pH = pKa + log([A⁻]/[HA]). */
export function pHBuffer(ka: number, base: number, acid: number): number {
  return -Math.log10(ka) + Math.log10(base / acid)
}

export type IndicatorKey = 'universal' | 'litmus' | 'phenolphthalein' | 'methyl orange'

export interface Indicator {
  key: Exclude<IndicatorKey, 'universal'>
  low: number
  high: number
  below: string
  above: string
}
export const INDICATORS: Indicator[] = [
  { key: 'methyl orange', low: 3.1, high: 4.4, below: '#e53935', above: '#fdd835' },
  { key: 'litmus', low: 5, high: 8, below: '#e53935', above: '#3949ab' },
  { key: 'phenolphthalein', low: 8.2, high: 10, below: '#f5f5f5', above: '#ec407a' },
]

const UNIVERSAL = ['#d32f2f', '#e64a19', '#f57c00', '#fbc02d', '#c0ca33', '#43a047', '#00897b', '#1e88e5', '#3949ab', '#5e35b1', '#6a1b9a']

function mix(a: string, b: string, t: number): string {
  const p = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16)
  const c = [0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t))
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('')
}

/** Colour (hex) of an indicator at a given pH; linear blend across its range. Universal: 11 bands over pH 0..14. */
export function indicatorColour(key: IndicatorKey, pHv: number): string {
  if (key === 'universal') {
    const x = (Math.min(Math.max(pHv, 0), 14) / 14) * (UNIVERSAL.length - 1)
    const i = Math.min(Math.floor(x), UNIVERSAL.length - 2)
    return mix(UNIVERSAL[i], UNIVERSAL[i + 1], x - i)
  }
  const ind = INDICATORS.find((d) => d.key === key)
  if (!ind) throw new Error(`unknown indicator ${key}`)
  if (pHv <= ind.low) return ind.below
  if (pHv >= ind.high) return ind.above
  return mix(ind.below, ind.above, (pHv - ind.low) / (ind.high - ind.low))
}

/** True when the indicator's whole range lies inside [lo, hi] (the steep part of the curve). */
export function indicatorSuitable(key: Exclude<IndicatorKey, 'universal'>, lo: number, hi: number): boolean {
  const ind = INDICATORS.find((d) => d.key === key)
  return !!ind && ind.low >= lo && ind.high <= hi
}

export type AcidKind = 'strong' | 'weak'

/** Equivalence volume of base (mL): 25.0 for both acids with 0.100 M NaOH. */
export function equivalenceVolume(): number {
  return TITRATION.acidVolumeMl
}

/**
 * pH after adding vb mL of 0.100 M NaOH to 25.0 mL of 0.100 M acid (HCl or CH₃COOH, Ka 1.8e-5).
 * Exact charge balance [H⁺] + [Na⁺] = [A⁻] + [OH⁻] solved by bisection.
 * Strong: 0 -> 1.00, 10 -> 1.37, 24.9 -> 3.70, 25 -> 7.00, 25.1 -> 10.30, 30 -> 11.96.
 * Weak:   0 -> 2.88, 12.5 -> 4.74, 25 -> 8.72, 30 -> 11.96.
 */
export function titrationPH(kind: AcidKind, vbMl: number, ka = KA_ACETIC): number {
  const va = TITRATION.acidVolumeMl
  const total = va + vbMl
  const ca = (TITRATION.concentration * va) / total
  const na = (TITRATION.concentration * vbMl) / total
  const f = (p: number): number => {
    const h = hFromPH(p)
    const a = kind === 'strong' ? ca : (ca * ka) / (ka + h)
    return h + na - a - KW / h // decreasing in pH
  }
  let lo = 0
  let hi = 14
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (f(mid) > 0) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** Curve points 0..maxBaseMl at stepMl (default 0.1 mL -> 501 points). */
export function titrationCurve(kind: AcidKind, stepMl: number = TITRATION.stepMl): { v: number; pH: number }[] {
  const n = Math.round(TITRATION.maxBaseMl / stepMl)
  return Array.from({ length: n + 1 }, (_, i) => {
    const v = Math.round(i * stepMl * 1000) / 1000
    return { v, pH: titrationPH(kind, v) }
  })
}

/** Substances for the pH mode (approximate textbook values; REVIEW). */
export const SUBSTANCES: { key: string; pH: number }[] = [
  { key: '0.1 M HCl', pH: 1.0 },
  { key: '0.01 M HCl', pH: 2.0 },
  { key: 'vinegar', pH: 2.9 },
  { key: 'coffee', pH: 5.0 },
  { key: 'pure water', pH: 7.0 },
  { key: 'blood', pH: 7.4 },
  { key: 'baking-soda solution', pH: 8.3 },
  { key: 'soap', pH: 10.0 },
  { key: 'ammonia', pH: 11.5 },
  { key: '0.1 M NaOH', pH: 13.0 },
]
