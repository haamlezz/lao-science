import { describe, expect, it } from 'vitest'
import { photosynthesis, temperatureLevel } from './photosynthesis'
import type { PhotoParams } from './photosynthesis'

const base: PhotoParams = { light: 3, co2: 'high', water: 'normal', chlorophyll: true }

describe('photosynthesis', () => {
  it('everything at maximum: rate 3, 30 bubbles, nothing limits', () => {
    const r = photosynthesis(base)
    expect(r.rate).toBe(3)
    expect(r.o2PerMin).toBe(30)
    expect(r.limiting).toBeNull()
    expect(r.producesGlucose).toBe(true)
  })
  it('no light, no water or white leaf gives rate 0 and no products', () => {
    for (const p of [
      { ...base, light: 0 as const },
      { ...base, water: 'dry' as const },
      { ...base, chlorophyll: false },
    ]) {
      const r = photosynthesis(p)
      expect(r.rate).toBe(0)
      expect(r.o2PerMin).toBe(0)
      expect(r.producesGlucose).toBe(false)
    }
  })
  it('names the limiting factor', () => {
    const r = photosynthesis({ ...base, co2: 'low' })
    expect(r.rate).toBe(1)
    expect(r.limiting).toBe('co2')
    expect(photosynthesis({ ...base, light: 0 }).limiting).toBe('light')
    expect(photosynthesis({ ...base, water: 'dry' }).limiting).toBe('water')
    expect(photosynthesis({ ...base, chlorophyll: false }).limiting).toBe('chlorophyll')
  })
  it('reports only the blocking factor when the rate is 0 (D-4)', () => {
    const white = photosynthesis({ ...base, chlorophyll: false })
    expect(white.limiting).toBe('chlorophyll')
    expect(white.limitingAll).toEqual(['chlorophyll'])
    expect(photosynthesis({ ...base, chlorophyll: false, light: 0 }).limitingAll).toEqual(['chlorophyll'])
    expect(photosynthesis({ ...base, water: 'dry' }).limitingAll).toEqual(['water'])
    expect(photosynthesis({ ...base, light: 0 }).limitingAll).toEqual(['light'])
  })
  it('non-zero rate lists only the lowest factors, ties allowed, never maxed ones', () => {
    expect(photosynthesis({ ...base, light: 1, co2: 'low' }).limitingAll).toEqual(['light', 'co2'])
    expect(photosynthesis({ ...base, co2: 'normal' }).limitingAll).toEqual(['co2'])
    expect(photosynthesis(base).limitingAll).toEqual([])
  })
  it('rate follows the smallest factor', () => {
    expect(photosynthesis({ ...base, light: 2, co2: 'normal' }).rate).toBe(2)
    expect(photosynthesis({ ...base, light: 1, co2: 'high' }).limiting).toBe('light')
  })
  it('temperature is optional and limits when extreme', () => {
    expect(photosynthesis({ ...base, temperatureC: 30 }).rate).toBe(3)
    const cold = photosynthesis({ ...base, temperatureC: 3 })
    expect(cold.rate).toBe(0)
    expect(cold.limiting).toBe('temperature')
    expect(temperatureLevel(50)).toBe(0)
    expect(temperatureLevel(20)).toBe(2)
  })
})
