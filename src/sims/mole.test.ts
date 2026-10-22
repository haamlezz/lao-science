import { describe, expect, it } from 'vitest'
import { SUBSTANCES, convert, massPercent, molarMass, parseFormula } from './mole'

describe('mole', () => {
  it('molar masses', () => {
    expect(molarMass('H2O')).toBe(18)
    expect(molarMass('CO2')).toBe(44)
    expect(molarMass('NaCl')).toBe(58.5)
    expect(molarMass('Fe')).toBe(56)
    expect(molarMass('O2')).toBe(32)
    expect(molarMass('C6H12O6')).toBe(180)
    expect(molarMass('CaCO3')).toBe(100)
    expect(molarMass('Ca(OH)2')).toBe(74)
    for (const s of SUBSTANCES) expect(molarMass(s.ascii)).toBeGreaterThan(0)
  })
  it('parses formulas', () => {
    expect(parseFormula('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 })
    expect(() => parseFormula('Ca(OH')).toThrow()
    expect(() => molarMass('Xx')).toThrow()
  })
  it('spec check values', () => {
    const w = convert('H2O', 'mass', 36)
    expect(w.moles).toBeCloseTo(2, 10)
    expect(w.particles).toBeCloseTo(1.2044e24, -20)
    expect(w.gasVolumeL).toBeNull()
    const c = convert('CO2', 'mass', 11)
    expect(c.moles).toBeCloseTo(0.25, 10)
    expect(c.gasVolumeL).toBeCloseTo(5.6, 10)
    expect(c.particles / 1e23).toBeCloseTo(1.51, 2)
    const s = convert('NaCl', 'mass', 5.85)
    expect(s.moles).toBeCloseTo(0.1, 10)
    expect(s.particles / 1e22).toBeCloseTo(6.02, 2)
    expect(s.particleKind).toBe('formula unit')
    const o = convert('O2', 'moles', 1)
    expect(o.massG).toBe(32)
    expect(o.gasVolumeL).toBeCloseTo(22.4, 10)
  })
  it('mass percent of water', () => {
    expect(massPercent('H2O', 'H')).toBeCloseTo(11.1, 1)
    expect(massPercent('H2O', 'O')).toBeCloseTo(88.9, 1)
  })
  it('volume input only for gases; round trips', () => {
    expect(() => convert('Fe', 'volume', 22.4)).toThrow()
    expect(convert('CO2', 'volume', 22.4).massG).toBeCloseTo(44, 8)
    const r = convert('Fe', 'particles', 6.022e23)
    expect(r.moles).toBeCloseTo(1, 10)
    expect(r.massG).toBeCloseTo(56, 8)
  })
})
