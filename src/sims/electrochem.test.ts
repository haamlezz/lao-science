import { describe, expect, it } from 'vitest'
import { METALS, buildCell, emf, massFromCurrent, reading } from './electrochem'

describe('electrochem', () => {
  it('check values', () => {
    expect(buildCell('Zn', 'Cu').emf).toBeCloseTo(1.1, 2)
    expect(buildCell('Mg', 'Ag').emf).toBeCloseTo(3.17, 2)
    expect(buildCell('Fe', 'Cu').emf).toBeCloseTo(0.78, 2)
    expect(buildCell('Zn', 'Ag').emf).toBeCloseTo(1.56, 2)
    expect(buildCell('Cu', 'Ag').emf).toBeCloseTo(0.46, 2)
  })
  it('Zn|Cu half reactions and notation', () => {
    const c = buildCell('Cu', 'Zn')
    expect(c.anode).toBe('Zn')
    expect(c.cathode).toBe('Cu')
    expect(c.anodeHalf).toBe('Zn(s) → Zn²⁺ + 2e⁻')
    expect(c.cathodeHalf).toBe('Cu²⁺ + 2e⁻ → Cu(s)')
    expect(c.overall).toBe('Zn(s) + Cu²⁺ → Zn²⁺ + Cu(s)')
    expect(c.notation).toBe('Zn|Zn²⁺||Cu²⁺|Cu')
  })
  it('order does not matter, never negative, balances unequal charges', () => {
    for (const a of METALS)
      for (const b of METALS) {
        if (a === b) continue
        const c = buildCell(a, b)
        expect(c.emf).toBeGreaterThan(0)
        expect(c).toEqual(buildCell(b, a))
      }
    expect(buildCell('Zn', 'Ag').overall).toBe('Zn(s) + 2Ag⁺ → Zn²⁺ + 2Ag(s)')
    expect(() => buildCell('Zn', 'Zn')).toThrow()
    expect(emf('Cu', 'Zn')).toBeCloseTo(1.1, 2)
  })
  it('open circuit', () => {
    expect(reading(buildCell('Zn', 'Cu'), false)).toEqual({ volts: 1.1, current: false, openCircuit: true })
  })
  it('Faraday: 1 A for 965 s deposits ~0.318 g Cu', () => {
    expect(massFromCurrent(63.55, 2, 1, 965)).toBeCloseTo(0.318, 3)
  })
})
