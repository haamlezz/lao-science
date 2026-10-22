import { describe, expect, it } from 'vitest'
import {
  equivalenceVolume, hFromPH, indicatorColour, indicatorSuitable, pH, pHBuffer, pHStrongAcid,
  pHStrongBase, pHWeakAcid, pOH, titrationCurve, titrationPH,
} from './acidbase'

describe('acidbase', () => {
  it('pH basics', () => {
    expect(pHStrongAcid(0.01)).toBeCloseTo(2, 2)
    expect(pHStrongBase(0.1)).toBeCloseTo(13, 2)
    expect(pH(1e-7)).toBeCloseTo(7, 10)
    expect(pH(0.01) + pOH(pH(0.01))).toBeCloseTo(14, 10)
    expect(hFromPH(3) / hFromPH(4)).toBeCloseTo(10, 8)
    expect(pHWeakAcid(0.1, 1.8e-5)).toBeCloseTo(2.88, 2)
    expect(pHBuffer(1.8e-5, 1, 1)).toBeCloseTo(4.74, 2)
  })
  it('strong titration', () => {
    const p = (v: number) => titrationPH('strong', v)
    expect(p(0)).toBeCloseTo(1.0, 2)
    expect(p(10)).toBeCloseTo(1.37, 2)
    expect(p(24.9)).toBeCloseTo(3.7, 2)
    expect(p(25)).toBeCloseTo(7.0, 2)
    expect(p(25.1)).toBeCloseTo(10.3, 2)
    expect(p(30)).toBeCloseTo(11.96, 2)
    expect(equivalenceVolume()).toBe(25)
  })
  it('weak titration', () => {
    const p = (v: number) => titrationPH('weak', v)
    expect(p(0)).toBeCloseTo(2.88, 2)
    expect(Math.abs(p(12.5) - 4.74)).toBeLessThan(0.02)
    expect(p(25)).toBeCloseTo(8.72, 2)
    expect(p(30)).toBeCloseTo(11.96, 2)
    expect(p(25)).toBeGreaterThan(7)
  })
  it('curve is monotonic with 501 points, steep at equivalence', () => {
    const c = titrationCurve('strong')
    expect(c).toHaveLength(501)
    for (let i = 1; i < c.length; i++) expect(c[i].pH).toBeGreaterThanOrEqual(c[i - 1].pH - 1e-9)
    expect(c[251].pH - c[249].pH).toBeGreaterThan(5)
  })
  it('indicators', () => {
    expect(indicatorColour('methyl orange', 2)).toBe('#e53935')
    expect(indicatorColour('methyl orange', 6)).toBe('#fdd835')
    expect(indicatorColour('phenolphthalein', 7)).toBe('#f5f5f5')
    expect(indicatorColour('phenolphthalein', 11)).toBe('#ec407a')
    expect(indicatorColour('universal', 7)).toMatch(/^#[0-9a-f]{6}$/)
    expect(indicatorSuitable('phenolphthalein', 3, 5)).toBe(false)
    expect(indicatorSuitable('phenolphthalein', 4, 10)).toBe(true)
    expect(indicatorSuitable('methyl orange', 3, 11)).toBe(true)
  })
})
