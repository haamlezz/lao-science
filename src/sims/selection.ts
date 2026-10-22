/**
 * ILLUSTRATIVE natural-selection model (beetles, green vs brown, one predator pass per generation).
 * Not a population-genetics simulation of real species: one heritable trait (colour), no mutation,
 * no mating model; offspring colour = parent colour (haploid-like). Selection acts on individuals
 * (survival) but only the population changes. No purpose or need drives the change.
 *
 * p = share of green beetles (0..1). Survival s is a probability in 0..1.
 * Well camouflaged colour survives with WELL; the poorly camouflaged colour with the slider value.
 */
import { makeRng } from './prng'

/** Survival probability of the well-camouflaged colour (fixed). */
export const WELL = 0.8

export type Background = 'green' | 'brown'

export interface SelectionParams {
  background: Background
  /** Initial share of green beetles, 0.1..0.9. */
  p0: number
  /** Survival of the poorly camouflaged colour, 0.2..0.8. */
  poorSurvival: number
}

/** Survival of green and brown beetles on the given background. */
export function survivals(background: Background, poorSurvival: number): { green: number; brown: number } {
  return background === 'green'
    ? { green: WELL, brown: poorSurvival }
    : { green: poorSurvival, brown: WELL }
}

/** One generation, expected (deterministic): p' = p*sg / (p*sg + (1-p)*sb). Equal survival keeps p. */
export function nextShare(p: number, sg: number, sb: number): number {
  const denom = p * sg + (1 - p) * sb
  return denom === 0 ? p : (p * sg) / denom
}

/** Expected series [p0, p1, ..., p_generations] (length generations + 1). */
export function expectedSeries(params: SelectionParams, generations: number): number[] {
  const { green, brown } = survivals(params.background, params.poorSurvival)
  const out = [params.p0]
  for (let g = 0; g < Math.max(0, Math.floor(generations)); g++) out.push(nextShare(out[g], green, brown))
  return out
}

export interface RandomGeneration {
  /** Green / brown counts before the predator pass (sum = n) and survivors. */
  greenBefore: number
  brownBefore: number
  greenAfter: number
  brownAfter: number
  /** Green share among survivors = the share used for the next generation. */
  p: number
}

export interface RandomRun {
  /** Green share per generation: [p0, p1, ..., p_generations] (length generations + 1). */
  series: number[]
  /** One predator pass per generation (length = generations), counts out of n. */
  passes: RandomGeneration[]
}

/**
 * Random (seeded) run with n individuals per generation (default 100): each individual is green
 * with probability p, then survives with its colour's survival probability; the next generation's
 * green share is the green share among survivors (re-drawn to n individuals). If nobody survives,
 * p is carried over. Same seed + same inputs reproduce the same series.
 */
export function randomRun(params: SelectionParams, generations: number, seed: number, n = 100): RandomRun {
  const rng = makeRng(seed)
  const { green, brown } = survivals(params.background, params.poorSurvival)
  const size = Math.max(1, Math.floor(n))
  const out: RandomGeneration[] = []
  let p = params.p0
  const series = [p]
  const gens = Math.max(0, Math.floor(generations))
  for (let g = 0; g < gens; g++) {
    let gb = 0
    let ga = 0
    let bb = 0
    let ba = 0
    for (let i = 0; i < size; i++) {
      const isGreen = rng() < p
      const lives = rng() < (isGreen ? green : brown)
      if (isGreen) {
        gb++
        if (lives) ga++
      } else {
        bb++
        if (lives) ba++
      }
    }
    const survivors = ga + ba
    const next = survivors === 0 ? p : ga / survivors
    out.push({ greenBefore: gb, brownBefore: bb, greenAfter: ga, brownAfter: ba, p: next })
    p = next
    series.push(p)
  }
  return { series, passes: out }
}
