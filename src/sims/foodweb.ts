// Pure model for the `foodweb` simulation (m2-06): energy pyramid (10% rule) and removal effects.
// REVIEW: Lao organism names are an AI draft.

export const TRANSFER = 0.1 // fraction of energy passed to the next trophic level
export type Effect = 'up' | 'down' | 'removed' | 'none'

export interface Organism {
  id: string
  name: { lo: string; en: string }
  level: number // trophic level, 1 = producer
}

export interface FoodGraph {
  id: string
  organisms: Organism[]
  /** [eater, eaten] pairs */
  eats: [string, string][]
}

const o = (id: string, lo: string, en: string, level: number): Organism => ({ id, name: { lo, en }, level })

/** rice -> grasshopper -> frog -> snake -> eagle */
export const RICE_CHAIN: FoodGraph = {
  id: 'rice-field',
  organisms: [
    o('rice', 'ເຂົ້າ', 'Rice', 1),
    o('grasshopper', 'ຕັກແຕນ', 'Grasshopper', 2),
    o('frog', 'ກົບ', 'Frog', 3),
    o('snake', 'ງູ', 'Snake', 4),
    o('eagle', 'ນົກອິນຊີ', 'Eagle', 5),
  ],
  eats: [
    ['grasshopper', 'rice'],
    ['frog', 'grasshopper'],
    ['snake', 'frog'],
    ['eagle', 'snake'],
  ],
}

/** algae -> small fish -> big fish -> heron */
export const POND_CHAIN: FoodGraph = {
  id: 'pond',
  organisms: [
    o('algae', 'ສາຫຼ່າຍ', 'Algae', 1),
    o('smallfish', 'ປານ້ອຍ', 'Small fish', 2),
    o('bigfish', 'ປາໃຫຍ່', 'Big fish', 3),
    o('heron', 'ນົກກະຍາງ', 'Heron', 4),
  ],
  eats: [
    ['smallfish', 'algae'],
    ['bigfish', 'smallfish'],
    ['heron', 'bigfish'],
  ],
}

/** The rice chain extended into a small web (rat, seed-eating bird); snake and eagle have two foods. */
export const RICE_WEB: FoodGraph = {
  id: 'rice-web',
  organisms: [...RICE_CHAIN.organisms, o('rat', 'ໜູ', 'Rat', 2), o('bird', 'ນົກກິນເມັດ', 'Seed-eating bird', 2)],
  eats: [...RICE_CHAIN.eats, ['rat', 'rice'], ['bird', 'rice'], ['snake', 'rat'], ['eagle', 'bird']],
}

export const CHAINS: Record<string, FoodGraph> = { 'rice-field': RICE_CHAIN, pond: POND_CHAIN }

export const MIN_ENERGY_KJ = 1000
export const MAX_ENERGY_KJ = 100000

/** Energy (kJ) at trophic level k (1-based): E0 × 0.10^(k-1). */
export function energyAtLevel(e0: number, level: number): number {
  return Math.round(e0 * Math.pow(TRANSFER, level - 1) * 1e9) / 1e9
}

/** Energy at each level: pyramid(10000, 5) = [10000, 1000, 100, 10, 1]. */
export function pyramid(e0: number, levels: number): number[] {
  return Array.from({ length: levels }, (_, i) => energyAtLevel(e0, i + 1))
}

/** Percentage of producer energy reaching level k: level 5 -> 0.01. */
export function percentOfProducer(level: number): number {
  return Math.round(100 * Math.pow(TRANSFER, level - 1) * 1e9) / 1e9
}

/** Ids that `id` eats. */
export function dietOf(g: FoodGraph, id: string): string[] {
  return g.eats.filter(([eater]) => eater === id).map(([, eaten]) => eaten)
}
/** Ids that eat `id`. */
export function predatorsOf(g: FoodGraph, id: string): string[] {
  return g.eats.filter(([, eaten]) => eaten === id).map(([eater]) => eater)
}

/**
 * Short-term effect of removing organisms:
 *  - removed -> 'removed'
 *  - eaters of a removed organism, and any organism whose whole diet is removed or declining -> 'down'
 *  - prey of a removed organism that is not already 'down' -> 'up' (later limited by its own food)
 *  - everything else -> 'none'
 */
export function removalEffects(g: FoodGraph, removed: string[]): Record<string, Effect> {
  const out: Record<string, Effect> = {}
  for (const org of g.organisms) out[org.id] = removed.includes(org.id) ? 'removed' : 'none'
  for (const r of removed) for (const p of predatorsOf(g, r)) if (out[p] === 'none') out[p] = 'down'
  let changed = true
  while (changed) {
    changed = false
    for (const org of g.organisms) {
      if (out[org.id] !== 'none') continue
      const diet = dietOf(g, org.id)
      if (diet.length > 0 && diet.every((d) => out[d] === 'removed' || out[d] === 'down')) {
        out[org.id] = 'down'
        changed = true
      }
    }
  }
  for (const r of removed) for (const prey of dietOf(g, r)) if (out[prey] === 'none') out[prey] = 'up'
  return out
}

/** Convenience: effect of removing a single organism. */
export const removeOne = (g: FoodGraph, id: string) => removalEffects(g, [id])
