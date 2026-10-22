import { describe, expect, it } from 'vitest'
import {
  FLOW_PATH,
  cardiacOutput,
  chamberBlood,
  cycleLength,
  diastoleDuration,
  phaseAt,
  stateAt,
  systoleDuration,
  HR_RANGE,
} from './heart'

describe('heart cycle timing', () => {
  it('spec check values', () => {
    expect(cycleLength(60)).toBeCloseTo(1.0, 9)
    expect(cycleLength(75)).toBeCloseTo(0.8, 9)
    expect(systoleDuration(75)).toBeCloseTo(0.3, 9)
    expect(cycleLength(120)).toBeCloseTo(0.5, 9)
    expect(cardiacOutput(72, 70)).toBeCloseTo(5.04, 9)
    expect(cardiacOutput(150, 100)).toBeCloseTo(15.0, 9)
  })
  it('systole + diastole = T over the whole range', () => {
    for (let hr = HR_RANGE.min; hr <= HR_RANGE.max; hr += HR_RANGE.step) {
      expect(systoleDuration(hr) + diastoleDuration(hr)).toBeCloseTo(cycleLength(hr), 9)
      // Spec: ts = 0.3*sqrt(T/0.8), diastole = T - ts. Diastole shrinks faster than systole as HR rises,
      // so it can fall below systole at high rates; only positivity is guaranteed.
      expect(diastoleDuration(hr)).toBeGreaterThan(0)
    }
    expect(diastoleDuration(70)).toBeGreaterThan(systoleDuration(70))
  })
  it('higher heart rate shortens the cycle', () => {
    expect(cycleLength(150)).toBeLessThan(cycleLength(70))
    expect(systoleDuration(150)).toBeLessThan(systoleDuration(70))
  })
})

describe('chamber and valve states', () => {
  it('phase order within one cycle at 75 bpm', () => {
    expect(phaseAt(75, 0.0)).toBe('ventricularSystole')
    expect(phaseAt(75, 0.29)).toBe('ventricularSystole')
    expect(phaseAt(75, 0.4)).toBe('diastole')
    expect(phaseAt(75, 0.78)).toBe('atrialSystole')
    expect(phaseAt(75, 0.8)).toBe('ventricularSystole') // wraps
  })
  it('valves are one-way: AV and semilunar are never both open', () => {
    for (let t = 0; t < 1.6; t += 0.01) {
      const s = stateAt(75, t)
      expect(s.atrioventricular === 'open' && s.semilunar === 'open').toBe(false)
    }
  })
  it('both ventricles contract together; semilunar open only in ventricular systole', () => {
    const s = stateAt(75, 0.1)
    expect(s.contracting.RV).toBe(true)
    expect(s.contracting.LV).toBe(true)
    expect(s.semilunar).toBe('open')
    expect(s.atrioventricular).toBe('closed')
    const d = stateAt(75, 0.5)
    expect(d.contracting.RV || d.contracting.LV || d.contracting.RA || d.contracting.LA).toBe(false)
  })
})

describe('blood path', () => {
  it('right side poor, left side rich; pulmonary artery leaves RV, aorta leaves LV', () => {
    expect(chamberBlood('RA')).toBe('oxygen-poor')
    expect(chamberBlood('RV')).toBe('oxygen-poor')
    expect(chamberBlood('LA')).toBe('oxygen-rich')
    expect(chamberBlood('LV')).toBe('oxygen-rich')
    expect(FLOW_PATH.find((s) => s.label === 'PA')).toMatchObject({ from: 'RV', to: 'lungs', blood: 'oxygen-poor' })
    expect(FLOW_PATH.find((s) => s.label === 'Ao')).toMatchObject({ from: 'LV', to: 'body', blood: 'oxygen-rich' })
  })
  it('path is continuous and visits the chambers in order', () => {
    for (let i = 1; i < FLOW_PATH.length; i++) expect(FLOW_PATH[i].from).toBe(FLOW_PATH[i - 1].to)
    expect(FLOW_PATH.map((s) => s.to)).toEqual(['RA', 'RV', 'lungs', 'LA', 'LV', 'body'])
  })
})
