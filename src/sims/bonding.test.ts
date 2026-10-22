import { describe, expect, it } from 'vitest'
import {
  IONIC,
  MOLECULES,
  bondClassOf,
  centralElectrons,
  classify,
  deltaEN,
  findMolecule,
  ionCharge,
  ionShells,
  lewisElectronCount,
  sharedPairs,
  valenceElectronTotal,
} from './bonding'

describe('bonding', () => {
  it('ions reach a noble-gas shell count', () => {
    expect(ionCharge('Na')).toBe(1)
    expect(ionShells('Na')).toEqual([2, 8])
    expect(ionCharge('Cl')).toBe(-1)
    expect(ionShells('Cl')).toEqual([2, 8, 8])
    expect(ionShells('O')).toEqual([2, 8])
    expect(ionShells('Mg')).toEqual([2, 8])
  })
  it('ionic ratios and neutral charge', () => {
    const by = Object.fromEntries(IONIC.map((c) => [c.formula, c]))
    expect([by.NaCl.cations, by.NaCl.anions]).toEqual([1, 1])
    expect([by.MgO.cations, by.MgO.anions]).toEqual([1, 1])
    expect([by['CaCl₂'].cations, by['CaCl₂'].anions]).toEqual([1, 2])
    for (const c of IONIC) {
      expect(c.cations * ionCharge(c.cation) + c.anions * ionCharge(c.anion)).toBe(0)
    }
  })
  it('electronegativity difference and class', () => {
    expect(deltaEN('Na', 'Cl')).toBeCloseTo(2.23, 2)
    expect(bondClassOf('Na', 'Cl')).toBe('ionic')
    expect(deltaEN('H', 'O')).toBeCloseTo(1.24, 2)
    expect(bondClassOf('H', 'O')).toBe('polar covalent')
    expect(deltaEN('C', 'H')).toBeCloseTo(0.35, 2)
    expect(bondClassOf('C', 'H')).toBe('non-polar covalent')
    expect(classify(1.7)).toBe('ionic')
    expect(classify(0.4)).toBe('polar covalent')
  })
  it('shared pairs and Lewis electron counts', () => {
    expect(sharedPairs(findMolecule('H₂'))).toBe(1)
    expect(sharedPairs(findMolecule('O₂'))).toBe(2)
    expect(sharedPairs(findMolecule('N₂'))).toBe(3)
    for (const m of MOLECULES) {
      expect(lewisElectronCount(m).total, m.formula).toBe(valenceElectronTotal(m))
      expect(centralElectrons(m), m.formula).toBe(m.central === 'H' ? 2 : 8)
    }
  })
  it('geometry', () => {
    expect(findMolecule('H₂O').angle).toBe(104.5)
    expect(findMolecule('CH₄').angle).toBe(109.5)
    expect(findMolecule('NH₃').angle).toBe(107)
    expect(findMolecule('CO₂').angle).toBe(180)
    expect(findMolecule('CO₂').geometry).toBe('linear')
    // C=O bonds are polar yet CO₂ is non-polar overall
    expect(bondClassOf('C', 'O')).toBe('polar covalent')
    expect(findMolecule('CO₂').polar).toBe(false)
    expect(findMolecule('H₂O').polar).toBe(true)
  })
})
