// Pure helpers for the `periodic` simulation (c6-01). Data: src/data/trends.ts (REVIEW, approximate).
import { ptElements } from '../data/periodicTable'
import { TRENDS } from '../data/trends'

export type Property = 'radius' | 'ie1' | 'en'
export type SeriesKey = 'period2' | 'period3' | 'group1' | 'group17'

export const PROPERTY_UNIT: Record<Property, string> = { radius: 'pm', ie1: 'kJ/mol', en: '' }

/** Series definitions: element symbols in the order shown (left to right / top to bottom). */
export const SERIES: Record<SeriesKey, string[]> = {
  period2: ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  period3: ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  group1: ['Li', 'Na', 'K', 'Rb', 'Cs'],
  group17: ['F', 'Cl', 'Br', 'I'],
}

export interface TrendPoint {
  symbol: string
  Z: number
  value: number | null // null = no data
}

export function valueOf(symbol: string, prop: Property): number | null {
  const row = TRENDS.find((r) => r.symbol === symbol)
  const v = row?.[prop]
  return v === undefined ? null : v
}

/** Values of a series for a property (null where the data set has none, e.g. EN of noble gases). */
export function seriesValues(series: SeriesKey, prop: Property): TrendPoint[] {
  return SERIES[series].map((symbol) => {
    const el = ptElements.find((e) => e.symbol === symbol)
    if (!el) throw new Error(`unknown element ${symbol}`)
    return { symbol, Z: el.Z, value: valueOf(symbol, prop) }
  })
}

/** Indices (in the defined values of the series) where the value goes against the general trend. */
export function dips(series: SeriesKey, prop: Property): string[] {
  const pts = seriesValues(series, prop).filter((p) => p.value !== null)
  const out: string[] = []
  const rising = prop !== 'radius' && (series === 'period2' || series === 'period3')
  if (!rising) return out
  for (let i = 1; i < pts.length; i++) {
    if ((pts[i].value as number) < (pts[i - 1].value as number)) out.push(pts[i].symbol)
  }
  return out
}

/** Highest and lowest EN in the whole data set. */
export function extreme(prop: Property): { max: string; min: string } {
  const rows = TRENDS.filter((r) => r[prop] !== undefined)
  const sorted = [...rows].sort((a, b) => (a[prop] as number) - (b[prop] as number))
  return { min: sorted[0].symbol, max: sorted[sorted.length - 1].symbol }
}

export function enDifference(a: string, b: string): number {
  const x = valueOf(a, 'en')
  const y = valueOf(b, 'en')
  if (x === null || y === null) throw new Error('no electronegativity data')
  return Math.abs(x - y)
}

/** Heat-map fraction 0..1 of a value between the minimum and maximum of that property in the data set. */
export function heatFraction(prop: Property, value: number): number {
  const vals = TRENDS.map((r) => r[prop]).filter((v): v is number => v !== undefined)
  const lo = Math.min(...vals)
  const hi = Math.max(...vals)
  return (value - lo) / (hi - lo)
}

/** Valence electrons of a main-group element (outer shell of the shell list). */
export function valenceElectrons(symbol: string): number {
  const el = ptElements.find((e) => e.symbol === symbol)
  if (!el) throw new Error(`unknown element ${symbol}`)
  return el.shells[el.shells.length - 1]
}
