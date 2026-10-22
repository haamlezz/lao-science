/**
 * Mendelian crosses: Punnett squares, exact genotype/phenotype ratios, test cross, sex determination
 * and a seeded offspring simulation.
 *
 * Genotype notation: one pair of letters per gene, e.g. 'Tt' (one gene) or 'TtRr' (two genes).
 * Upper case = dominant allele, lower case = recessive. Genotypes are normalised so the upper-case
 * allele comes first in each pair ('tT' -> 'Tt'). Pure functions, no DOM.
 */
import { makeRng } from './prng'

/** Exact fraction in lowest terms (den > 0). */
export interface Fraction {
  num: number
  den: number
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

export function fraction(num: number, den: number): Fraction {
  if (den <= 0) throw new Error('denominator must be positive')
  const g = gcd(Math.abs(num), den) || 1
  return { num: num / g, den: den / g }
}

/** Decimal value of a fraction. */
export const fractionValue = (f: Fraction): number => f.num / f.den

/** 'Tt' (or '3/4') display helper: '3/16'. */
export const fractionText = (f: Fraction): string => `${f.num}/${f.den}`

/** Dominance model for phenotypes. 'complete' is the default textbook case. */
export type Dominance = 'complete' | 'incomplete' | 'codominance'

export const PEA_HEIGHT = { dominant: 'T', recessive: 't' } as const
export const PEA_SEED_SHAPE = { dominant: 'R', recessive: 'r' } as const

/** Splits a genotype into allele pairs and validates it. Throws on bad input. */
export function genePairs(genotype: string): string[] {
  if (genotype.length === 0 || genotype.length % 2 !== 0) throw new Error(`bad genotype "${genotype}"`)
  const pairs: string[] = []
  for (let i = 0; i < genotype.length; i += 2) {
    const a = genotype[i]
    const b = genotype[i + 1]
    if (a.toLowerCase() !== b.toLowerCase() || !/[A-Za-z]/.test(a)) throw new Error(`bad genotype "${genotype}"`)
    pairs.push(a === a.toUpperCase() || b !== b.toUpperCase() ? a + b : b + a)
  }
  return pairs
}

/** Normalised genotype string: 'tTrR' -> 'TtRR'. */
export const normalize = (genotype: string): string => genePairs(genotype).join('')

/** Normalises a pair so the upper-case allele is first. */
const normPair = (x: string, y: string): string => (x === x.toUpperCase() ? x + y : y === y.toUpperCase() ? y + x : x + y)

/**
 * Distinct gametes of a parent, in a stable order (dominant allele first), e.g.
 * 'TtRr' -> ['TR', 'Tr', 'tR', 'tr']; 'TT' -> ['T'] (identical gametes are listed once).
 * Each gamete is equally likely per distinct combination of allele choices (independent assortment).
 */
export function gametes(genotype: string): string[] {
  let out: string[] = ['']
  for (const pair of genePairs(genotype)) {
    const alleles = pair[0] === pair[1] ? [pair[0]] : [pair[0], pair[1]]
    out = out.flatMap((g) => alleles.map((a) => g + a))
  }
  return out
}

/** All 2^h equally likely gamete draws (with repeats), used for Punnett axes and probabilities. */
export function gameteDraws(genotype: string): string[] {
  let out: string[] = ['']
  for (const pair of genePairs(genotype)) out = out.flatMap((g) => [g + pair[0], g + pair[1]])
  return out
}

/** Combines two gametes into a normalised offspring genotype. */
export function combine(g1: string, g2: string): string {
  if (g1.length !== g2.length) throw new Error('gametes must carry the same genes')
  let out = ''
  for (let i = 0; i < g1.length; i++) out += normPair(g1[i], g2[i])
  return out
}

export interface Punnett {
  /** Column headers (parent 1 gamete draws) and row headers (parent 2). */
  cols: string[]
  rows: string[]
  /** cells[row][col] = offspring genotype. */
  cells: string[][]
}

/** Full Punnett grid: 2 x 2 for a monohybrid cross, 4 x 4 for a dihybrid cross. */
export function punnett(parent1: string, parent2: string): Punnett {
  const cols = gameteDraws(parent1)
  const rows = gameteDraws(parent2)
  if (cols[0].length !== rows[0].length) throw new Error('parents must have the same number of genes')
  return { cols, rows, cells: rows.map((r) => cols.map((c) => combine(c, r))) }
}

export interface RatioEntry {
  key: string
  count: number
  total: number
  fraction: Fraction
}

function tally(keys: string[]): RatioEntry[] {
  const total = keys.length
  const counts = new Map<string, number>()
  for (const k of keys) counts.set(k, (counts.get(k) ?? 0) + 1)
  return [...counts.entries()].map(([key, count]) => ({ key, count, total, fraction: fraction(count, total) }))
}

/**
 * Phenotype key of a genotype. Complete dominance: 'T_' (dominant shown) or 'tt'.
 * Incomplete dominance and codominance: three classes 'TT', 'Tt', 'tt' per gene
 * (the heterozygote is intermediate, or shows both). Keys of several genes are concatenated: 'T_R_'.
 */
export function phenotypeKey(genotype: string, dominance: Dominance = 'complete'): string {
  return genePairs(genotype)
    .map((p) => {
      if (dominance !== 'complete') return p
      return p[0] === p[0].toUpperCase() ? `${p[0]}_` : p
    })
    .join('')
}

const sortKeys = (e: RatioEntry[]): RatioEntry[] =>
  [...e].sort((a, b) => b.count - a.count || (a.key < b.key ? -1 : 1))

/** Expected genotype distribution of a cross, exact. Sorted by count desc then key. */
export function genotypeRatio(parent1: string, parent2: string): RatioEntry[] {
  return sortKeys(tally(punnett(parent1, parent2).cells.flat()))
}

/** Expected phenotype distribution of a cross, exact. Sorted by count desc then key. */
export function phenotypeRatio(parent1: string, parent2: string, dominance: Dominance = 'complete'): RatioEntry[] {
  return sortKeys(tally(punnett(parent1, parent2).cells.flat().map((g) => phenotypeKey(g, dominance))))
}

/** Counts as integer ratio, e.g. [9, 3, 3, 1] or [3, 1], reduced by the common divisor. */
export function ratioOf(entries: RatioEntry[]): number[] {
  const g = entries.reduce((acc, e) => gcd(acc, e.count), 0) || 1
  return entries.map((e) => e.count / g)
}

/**
 * Test cross: an individual of unknown genotype (showing the dominant phenotype) crossed with the
 * homozygous recessive. Returns the phenotype ratio. 'Tt' -> 1:1; 'TT' -> all dominant.
 */
export function testCross(unknown: string): RatioEntry[] {
  const tester = genePairs(unknown).map((p) => p[0].toLowerCase().repeat(2)).join('')
  return phenotypeRatio(unknown, tester)
}

/** Sex determination: XX mother x XY father. Each child is 1/2 XX (female), 1/2 XY (male). */
export function sexCross(): { genotype: 'XX' | 'XY'; sex: 'female' | 'male'; fraction: Fraction }[] {
  return [
    { genotype: 'XX', sex: 'female', fraction: fraction(1, 2) },
    { genotype: 'XY', sex: 'male', fraction: fraction(1, 2) },
  ]
}

export interface Simulation {
  n: number
  seed: number
  /** Genotype counts (sum = n) and phenotype counts (sum = n). */
  genotypes: Record<string, number>
  phenotypes: Record<string, number>
}

/**
 * Simulates n offspring: each child gets one gamete draw from each parent (uniform, seeded PRNG).
 * Same seed + same inputs = same counts. n is clamped to 0..10000 integers.
 */
export function simulateOffspring(
  parent1: string,
  parent2: string,
  n: number,
  seed: number,
  dominance: Dominance = 'complete',
): Simulation {
  const count = Math.max(0, Math.min(10000, Math.floor(n)))
  const rng = makeRng(seed)
  const a = gameteDraws(parent1)
  const b = gameteDraws(parent2)
  const genotypes: Record<string, number> = {}
  const phenotypes: Record<string, number> = {}
  for (let i = 0; i < count; i++) {
    const g = combine(a[Math.floor(rng() * a.length)], b[Math.floor(rng() * b.length)])
    const p = phenotypeKey(g, dominance)
    genotypes[g] = (genotypes[g] ?? 0) + 1
    phenotypes[p] = (phenotypes[p] ?? 0) + 1
  }
  return { n: count, seed, genotypes, phenotypes }
}

/** Simulates n children of an XX x XY cross; the father's gamete (X or Y) sets the sex. */
export function simulateSex(n: number, seed: number): { n: number; female: number; male: number } {
  const count = Math.max(0, Math.min(10000, Math.floor(n)))
  const rng = makeRng(seed)
  let male = 0
  for (let i = 0; i < count; i++) if (rng() < 0.5) male++
  return { n: count, female: count - male, male }
}
