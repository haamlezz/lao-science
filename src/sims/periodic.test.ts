import { describe, expect, it } from 'vitest'
import { dips, enDifference, extreme, heatFraction, seriesValues, valenceElectrons, valueOf } from './periodic'

const vals = (s: Parameters<typeof seriesValues>[0], p: Parameters<typeof seriesValues>[1]) =>
  seriesValues(s, p).filter((x) => x.value !== null).map((x) => x.value as number)

describe('periodic trends', () => {
  it('radius falls across period 2 (Li to F) and period 3, rises down group 1', () => {
    const r = vals('period2', 'radius')
    expect(r).toHaveLength(7)
    for (let i = 1; i < r.length; i++) expect(r[i]).toBeLessThan(r[i - 1])
    const g = vals('group1', 'radius')
    for (let i = 1; i < g.length; i++) expect(g[i]).toBeGreaterThan(g[i - 1])
  })
  it('IE has the two known dips in period 2 and falls down group 1', () => {
    expect(valueOf('B', 'ie1') as number).toBeLessThan(valueOf('Be', 'ie1') as number)
    expect(valueOf('O', 'ie1') as number).toBeLessThan(valueOf('N', 'ie1') as number)
    expect(dips('period2', 'ie1')).toEqual(['B', 'O'])
    const g = vals('group1', 'ie1')
    for (let i = 1; i < g.length; i++) expect(g[i]).toBeLessThan(g[i - 1])
  })
  it('electronegativity', () => {
    expect(enDifference('Cl', 'Na')).toBeCloseTo(2.23, 2)
    expect(extreme('en')).toEqual({ max: 'F', min: 'Cs' })
    expect(valueOf('Ne', 'en')).toBeNull()
    const ens = seriesValues('period2', 'en')
    expect(ens[ens.length - 1].value).toBeNull()
  })
  it('heat fraction in 0..1 and valence electrons', () => {
    expect(heatFraction('en', 3.98)).toBe(1)
    expect(heatFraction('en', 0.79)).toBe(0)
    expect(valenceElectrons('Na')).toBe(1)
    expect(valenceElectrons('Cl')).toBe(7)
  })
})
