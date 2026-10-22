import { describe, expect, it } from 'vitest'
import {
  density,
  dotsFor,
  exponential,
  growthRate,
  inflectionSize,
  logistic,
  maxGrowthRate,
  series,
  timeToReachExponential,
  timeToReachLogistic,
} from './population'

describe('population models', () => {
  it('spec check values (N0 = 10, r = 0.5, K = 500)', () => {
    expect(exponential(10, 0.5, 4)).toBeCloseTo(73.9, 1)
    expect(logistic(10, 0.5, 500, 4)).toBeCloseTo(65.5, 1)
    expect(logistic(10, 0.5, 500, 10)).toBeCloseTo(376, 0)
    expect(timeToReachLogistic(10, 0.5, 500, 250)).toBeCloseTo(7.78, 2)
    expect(growthRate(250, 0.5, 500)).toBeCloseTo(62.5, 6)
    expect(density(200, 4)).toBe(50)
  })
  it('both models start at N0', () => {
    expect(exponential(10, 0.5, 0)).toBe(10)
    expect(logistic(10, 0.5, 500, 0)).toBeCloseTo(10, 9)
  })
  it('logistic never exceeds K and approaches it', () => {
    for (const p of series(10, 0.5, 500)) expect(p.logistic).toBeLessThanOrEqual(500)
    // N(20) = 500 / (1 + 49 e^-10) = 498.9: within 0.25% of K
    expect(logistic(10, 0.5, 500, 20)).toBeGreaterThan(498.5)
  })
  it('exponential is unbounded and above logistic for t > 0', () => {
    expect(exponential(10, 0.5, 20)).toBeGreaterThan(500)
    expect(exponential(10, 0.5, 5)).toBeGreaterThan(logistic(10, 0.5, 500, 5))
  })
  it('maximum growth rate rK/4 occurs at N = K/2', () => {
    expect(maxGrowthRate(0.5, 500)).toBe(62.5)
    expect(inflectionSize(500)).toBe(250)
    const at = (n: number) => growthRate(n, 0.5, 500)
    expect(at(250)).toBeGreaterThan(at(200))
    expect(at(250)).toBeGreaterThan(at(300))
  })
  it('time-to-reach returns null outside the valid range', () => {
    expect(timeToReachLogistic(10, 0.5, 500, 600)).toBeNull()
    expect(timeToReachLogistic(10, 0.5, 500, 5)).toBeNull()
    expect(timeToReachExponential(10, 0.5, 100)).toBeCloseTo(Math.log(10) / 0.5, 9)
  })
  it('dots are capped at 150 with a multiplier', () => {
    expect(dotsFor(73.9)).toEqual({ dots: 74, each: 1 })
    const big = dotsFor(1000)
    expect(big.dots).toBeLessThanOrEqual(150)
    expect(big.each).toBeGreaterThan(1)
  })
  it('series is deterministic and has 41 points for 0..20 step 0.5', () => {
    const a = series(10, 0.5, 500)
    expect(a).toHaveLength(41)
    expect(series(10, 0.5, 500)).toEqual(a)
  })
})
