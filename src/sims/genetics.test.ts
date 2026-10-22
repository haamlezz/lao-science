import { describe, expect, it } from 'vitest'
import {
  combine,
  fractionText,
  gametes,
  genePairs,
  genotypeRatio,
  normalize,
  phenotypeRatio,
  punnett,
  ratioOf,
  sexCross,
  simulateOffspring,
  simulateSex,
  testCross,
} from './genetics'

const asMap = (e: { key: string; fraction: { num: number; den: number } }[]) =>
  Object.fromEntries(e.map((x) => [x.key, `${x.fraction.num}/${x.fraction.den}`]))

describe('genetics', () => {
  it('normalises and validates genotypes', () => {
    expect(normalize('tTrR')).toBe('TtRr')
    expect(() => genePairs('Tr')).toThrow()
    expect(() => genePairs('T')).toThrow()
  })
  it('gametes', () => {
    expect(gametes('TtRr')).toEqual(['TR', 'Tr', 'tR', 'tr'])
    expect(gametes('TT')).toEqual(['T'])
    expect(combine('T', 't')).toBe('Tt')
    expect(combine('t', 'T')).toBe('Tt')
  })
  it('Tt x Tt gives 1:2:1 genotypes and 3:1 phenotypes', () => {
    expect(asMap(genotypeRatio('Tt', 'Tt'))).toEqual({ Tt: '1/2', TT: '1/4', tt: '1/4' })
    const ph = phenotypeRatio('Tt', 'Tt')
    expect(asMap(ph)).toEqual({ T_: '3/4', tt: '1/4' })
    expect(ratioOf(ph)).toEqual([3, 1])
    expect(ratioOf(genotypeRatio('Tt', 'Tt'))).toEqual([2, 1, 1])
  })
  it('Tt x tt is 1:1 and TT x tt is all Tt', () => {
    expect(ratioOf(phenotypeRatio('Tt', 'tt'))).toEqual([1, 1])
    expect(asMap(genotypeRatio('TT', 'tt'))).toEqual({ Tt: '1/1' })
    expect(asMap(phenotypeRatio('TT', 'tt'))).toEqual({ T_: '1/1' })
  })
  it('dihybrid TtRr x TtRr is 9:3:3:1', () => {
    expect(punnett('TtRr', 'TtRr').cells).toHaveLength(4)
    const ph = phenotypeRatio('TtRr', 'TtRr')
    expect(ratioOf(ph)).toEqual([9, 3, 3, 1])
    expect(asMap(ph)['T_R_']).toBe('9/16')
    expect(asMap(ph)['ttrr']).toBe('1/16')
    expect(fractionText(ph[0].fraction)).toBe('9/16')
    expect(genotypeRatio('TtRr', 'TtRr')).toHaveLength(9)
  })
  it('dihybrid TtRr x ttrr is 1:1:1:1', () => {
    expect(ratioOf(phenotypeRatio('TtRr', 'ttrr'))).toEqual([1, 1, 1, 1])
  })
  it('incomplete dominance gives 1:2:1 phenotypes', () => {
    const ph = phenotypeRatio('Tt', 'Tt', 'incomplete')
    expect(asMap(ph)).toEqual({ Tt: '1/2', TT: '1/4', tt: '1/4' })
  })
  it('test cross reveals the genotype', () => {
    expect(ratioOf(testCross('Tt'))).toEqual([1, 1])
    expect(testCross('TT')).toHaveLength(1)
    expect(ratioOf(testCross('TtRr'))).toEqual([1, 1, 1, 1])
  })
  it('sex cross is 1:1', () => {
    const s = sexCross()
    expect(s.map((x) => fractionText(x.fraction))).toEqual(['1/2', '1/2'])
  })
  it('simulation: counts sum to n and the seed repeats', () => {
    const a = simulateOffspring('Tt', 'Tt', 100, 42)
    const b = simulateOffspring('Tt', 'Tt', 100, 42)
    expect(a).toEqual(b)
    expect(Object.values(a.genotypes).reduce((x, y) => x + y, 0)).toBe(100)
    expect(Object.values(a.phenotypes).reduce((x, y) => x + y, 0)).toBe(100)
    expect(simulateOffspring('Tt', 'Tt', 100, 43)).not.toEqual(a)
  })
  it('simulation converges toward 3:1 with large N', () => {
    const s = simulateOffspring('Tt', 'Tt', 10000, 7)
    expect(s.phenotypes['T_'] / s.n).toBeGreaterThan(0.73)
    expect(s.phenotypes['T_'] / s.n).toBeLessThan(0.77)
  })
  it('sex simulation sums to n and is seeded', () => {
    const s = simulateSex(100, 5)
    expect(s.female + s.male).toBe(100)
    expect(simulateSex(100, 5)).toEqual(s)
    expect(Math.abs(simulateSex(10000, 1).male / 10000 - 0.5)).toBeLessThan(0.03)
  })
})
