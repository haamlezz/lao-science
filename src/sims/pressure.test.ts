import { describe, expect, it } from 'vitest'
import { AREA_BIG_CM2, AREA_SMALL_CM2, LIQUID_DENSITY, formatPa, liquidPressure, solidPressure } from './pressure'

describe('pressure', () => {
  it('P = F / A with area in cm2', () => {
    expect(solidPressure(50, AREA_BIG_CM2)).toBeCloseTo(1666.67, 1)
    expect(solidPressure(50, AREA_SMALL_CM2)).toBe(5000)
  })
  it('smaller area gives larger pressure for the same force', () => {
    expect(solidPressure(40, AREA_SMALL_CM2)).toBeGreaterThan(solidPressure(40, AREA_BIG_CM2))
  })
  it('P = rho g h', () => {
    expect(liquidPressure(LIQUID_DENSITY.water, 4)).toBeCloseTo(39200)
    expect(liquidPressure(LIQUID_DENSITY.water, 0)).toBe(0)
  })
  it('denser liquid and greater depth give more pressure', () => {
    expect(liquidPressure(LIQUID_DENSITY.sea, 3)).toBeGreaterThan(liquidPressure(LIQUID_DENSITY.water, 3))
    expect(liquidPressure(LIQUID_DENSITY.oil, 3)).toBeLessThan(liquidPressure(LIQUID_DENSITY.water, 3))
    expect(liquidPressure(1000, 5)).toBeGreaterThan(liquidPressure(1000, 4))
  })
  it('formatPa matches the existing display', () => {
    expect(formatPa(5000)).toBe('5000 Pa')
    expect(formatPa(39200)).toBe('39.2 kPa')
  })
})
