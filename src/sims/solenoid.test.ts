import { describe, expect, it } from 'vitest'
import { IRON_MU_R, MU0, pinsFor, solenoidField, solenoidPolarity, solenoidState, wireCirculation, wireField } from './solenoid'

const sol = (turns: number, current: number, ironCore = false) =>
  solenoidState({ mode: 'solenoid', turns, current, ironCore })

describe('solenoid', () => {
  it('N = 50, I = 2 A, no core -> 0.63 mT', () => {
    expect(solenoidField(50, 2)).toBeCloseTo(6.283e-4, 6)
    expect(sol(50, 2).fieldMilliT).toBeCloseTo(0.63, 2)
  })
  it('N = 100, I = 4 A -> 2.5 mT (4x)', () => {
    expect(sol(100, 4).fieldMilliT).toBeCloseTo(2.51, 2)
    expect(sol(100, 4).fieldT / sol(50, 2).fieldT).toBeCloseTo(4)
  })
  it('B is proportional to N and to I', () => {
    expect(sol(80, 1).fieldT / sol(40, 1).fieldT).toBeCloseTo(2)
    expect(sol(40, 3).fieldT / sol(40, 1).fieldT).toBeCloseTo(3)
  })
  it('iron core multiplies by 200 (illustrative); pins capped at 20', () => {
    expect(sol(50, 2, true).fieldT / sol(50, 2).fieldT).toBeCloseTo(IRON_MU_R)
    expect(sol(50, 2, true).pins).toBe(20)
    expect(sol(50, 2).pins).toBe(0)
    expect(sol(100, 4).pins).toBe(1)
    expect(pinsFor(0.01)).toBe(5)
  })
  it('I = 0 -> B = 0 and no pins, even with an iron core', () => {
    const r = sol(100, 0, true)
    expect(r.fieldT).toBe(0)
    expect(r.pins).toBe(0)
    expect(r.polarity).toBe('none')
    expect(r.strength).toBe(0)
  })
  it('reversing the current flips polarity and keeps magnitude', () => {
    expect(solenoidPolarity(2)).toBe('N-right')
    expect(solenoidPolarity(-2)).toBe('N-left')
    expect(sol(50, -2).fieldT).toBeCloseTo(sol(50, 2).fieldT)
    expect(sol(50, -2).polarity).toBe('N-left')
  })
  it('straight wire: B = mu0 I / (2 pi r) and circulation flips with I', () => {
    expect(wireField(2)).toBeCloseTo((MU0 * 2) / (2 * Math.PI * 0.05), 12)
    expect(wireField(2) * 1e6).toBeCloseTo(8, 1)
    expect(wireCirculation(1)).toBe('counterclockwise')
    expect(wireCirculation(-1)).toBe('clockwise')
    expect(solenoidState({ mode: 'wire', turns: 10, current: 2, ironCore: true }).coreFactor).toBe(1)
  })
  it('bar magnet mode has a fixed illustrative field and N on the right', () => {
    const r = solenoidState({ mode: 'bar', turns: 10, current: 0, ironCore: false })
    expect(r.polarity).toBe('N-right')
    expect(r.fieldMilliT).toBeCloseTo(10)
  })
})
