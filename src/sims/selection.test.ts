import { describe, expect, it } from 'vitest'
import { expectedSeries, nextShare, randomRun, survivals } from './selection'

const base = { background: 'green', p0: 0.5, poorSurvival: 0.4 } as const

describe('selection (illustrative)', () => {
  it('survivals depend on the background', () => {
    expect(survivals('green', 0.4)).toEqual({ green: 0.8, brown: 0.4 })
    expect(survivals('brown', 0.4)).toEqual({ green: 0.4, brown: 0.8 })
  })
  it('green background: 0.667, 0.800, 0.889', () => {
    const s = expectedSeries(base, 3)
    expect(s).toHaveLength(4)
    expect(s[0]).toBe(0.5)
    expect(s[1]).toBeCloseTo(0.667, 3)
    expect(s[2]).toBeCloseTo(0.8, 3)
    expect(s[3]).toBeCloseTo(0.889, 3)
  })
  it('brown background mirrors it', () => {
    const s = expectedSeries({ ...base, background: 'brown' }, 3)
    expect(s[1]).toBeCloseTo(0.333, 3)
    expect(s[2]).toBeCloseTo(0.2, 3)
    expect(s[3]).toBeCloseTo(0.111, 3)
  })
  it('equal survival leaves p unchanged', () => {
    expect(nextShare(0.3, 0.8, 0.8)).toBeCloseTo(0.3, 12)
    expectedSeries({ background: 'green', p0: 0.3, poorSurvival: 0.8 }, 5).forEach((p) => expect(p).toBeCloseTo(0.3, 12))
  })
  it('p stays within 0..1', () => {
    for (const p of expectedSeries({ background: 'green', p0: 0.9, poorSurvival: 0.2 }, 10)) {
      expect(p).toBeGreaterThanOrEqual(0)
      expect(p).toBeLessThanOrEqual(1)
    }
  })
  it('random mode is reproducible with the same seed and differs with another', () => {
    const a = randomRun(base, 10, 123)
    expect(randomRun(base, 10, 123)).toEqual(a)
    expect(randomRun(base, 10, 124).series).not.toEqual(a.series)
    expect(a.series).toHaveLength(11)
    expect(a.passes).toHaveLength(10)
    for (const g of a.passes) expect(g.greenBefore + g.brownBefore).toBe(100)
  })
  it('random mode drifts upward on average toward the better camouflaged colour', () => {
    let sum = 0
    for (let seed = 1; seed <= 30; seed++) sum += randomRun(base, 3, seed).series[3]
    expect(sum / 30).toBeGreaterThan(0.8)
  })
})
