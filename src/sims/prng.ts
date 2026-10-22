/**
 * Small deterministic PRNG (mulberry32) shared by the genetics and selection sims.
 * The same integer seed always yields the same sequence, so a run can be repeated.
 */
export type Rng = () => number

/** Returns a generator of floats in [0, 1). The seed is coerced to an unsigned 32-bit integer. */
export function makeRng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
