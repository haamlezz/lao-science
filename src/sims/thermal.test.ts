import { describe, expect, it } from 'vitest'
import { ALPHA, cToK, gasVolume, linearExpansionMm, liquidExpansion, reading } from './thermal'

describe('thermal', () => {
  it('steel bar 1 m, 20 -> 100 °C is +0.96 mm', () => {
    expect(linearExpansionMm('steel', 1, 80)).toBeCloseTo(0.96, 6)
  })
  it('aluminium +1.84 mm, copper +1.36 mm', () => {
    expect(linearExpansionMm('aluminium', 1, 80)).toBeCloseTo(1.84, 6)
    expect(linearExpansionMm('copper', 1, 80)).toBeCloseTo(1.36, 6)
  })
  it('scales with length and contracts when cooled', () => {
    expect(linearExpansionMm('steel', 2, 80)).toBeCloseTo(1.92, 6)
    expect(linearExpansionMm('steel', 1, -20)).toBeLessThan(0)
    expect(linearExpansionMm('steel', 1, 0)).toBe(0)
  })
  it('gas volume uses kelvin: 100 °C vs 20 °C is 373/293', () => {
    expect(gasVolume(1, 20, 100)).toBeCloseTo(373.15 / 293.15, 6)
    expect(gasVolume(1, 20, 100)).toBeCloseTo(1.273, 3)
    expect(gasVolume(5, 20, 20)).toBe(5)
    expect(cToK(0)).toBeCloseTo(273.15)
  })
  it('liquid expansion', () => {
    expect(liquidExpansion(100, 80)).toBeCloseTo(8.8, 6)
  })
  it('fractional expansion: gas > liquid > solid, all grow with T', () => {
    const r = reading('steel', 100)
    expect(r.gasFraction).toBeGreaterThan(r.liquidFraction)
    expect(r.liquidFraction).toBeGreaterThan(ALPHA.steel * r.deltaT)
    const lo = reading('steel', 40)
    expect(r.barExpansionMm).toBeGreaterThan(lo.barExpansionMm)
    expect(r.gasRatio).toBeGreaterThan(lo.gasRatio)
  })
})
