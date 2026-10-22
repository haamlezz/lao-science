import { describe, expect, it } from 'vitest'
import { concentrationAt, curve, fractionAboveEa, halfLife, rate, rateConstant } from './rate'

const base = { tempK: 300, catalyst: false, powder: false }

describe('rate', () => {
  it('reference k and half-life at 300 K', () => {
    expect(rateConstant(base)).toBeCloseTo(0.01, 6)
    expect(halfLife(0.01)).toBeCloseTo(69.3, 1)
  })
  it('310 K: k = 0.0191 (x1.91), t1/2 = 36.3 s', () => {
    const k = rateConstant({ ...base, tempK: 310 })
    expect(k).toBeCloseTo(0.0191, 4)
    expect(k / 0.01).toBeCloseTo(1.91, 2)
    expect(halfLife(k)).toBeCloseTo(36.3, 1)
  })
  it('280 K: k = 0.00239', () => {
    expect(rateConstant({ ...base, tempK: 280 })).toBeCloseTo(0.00239, 5)
  })
  it('catalyst at 300 K: k = 0.551 (x55.1), t1/2 = 1.26 s', () => {
    const k = rateConstant({ ...base, catalyst: true })
    expect(k).toBeCloseTo(0.551, 3)
    expect(k / 0.01).toBeCloseTo(55.1, 1)
    expect(halfLife(k)).toBeCloseTo(1.26, 2)
  })
  it('powder multiplies k by 4', () => {
    expect(rateConstant({ ...base, powder: true })).toBeCloseTo(0.04, 6)
  })
  it('doubling concentration doubles the rate', () => {
    expect(rate(0.01, 60) / rate(0.01, 30)).toBeCloseTo(2, 10)
  })
  it('fraction above Ea rises with T and falls with Ea', () => {
    expect(fractionAboveEa(50, 310)).toBeGreaterThan(fractionAboveEa(50, 300))
    expect(fractionAboveEa(40, 300)).toBeGreaterThan(fractionAboveEa(50, 300))
  })
  it('curve starts at c0, halves at t1/2, decreases', () => {
    const k = 0.01
    expect(concentrationAt(30, k, halfLife(k))).toBeCloseTo(15, 8)
    const c = curve(30, k, 200)
    expect(c[0].c).toBe(30)
    expect(c).toHaveLength(61)
    expect(c[60].c).toBeLessThan(c[1].c)
  })
})
