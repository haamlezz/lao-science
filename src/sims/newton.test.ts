import { describe, expect, it } from 'vitest'
import { SURFACES, accelWhileMoving, reactionOfNormal, solveFromRest, stepVelocity } from './newton'
import type { NewtonParams } from './newton'

const flat = (force: number, surface: NewtonParams['surface'], mass = 5): NewtonParams => ({
  mass,
  force,
  surface,
  layout: 'flat',
  angleDeg: 0,
})
const ramp = (angleDeg: number, surface: NewtonParams['surface'], force = 0): NewtonParams => ({
  mass: 5,
  force,
  surface,
  layout: 'incline',
  angleDeg,
})

describe('newton', () => {
  it('m = 5, F = 30, frictionless: a = 6.00 m/s2', () => {
    const r = solveFromRest(flat(30, 'frictionless'))
    expect(r.a).toBeCloseTo(6, 9)
    expect(r.friction).toBeCloseTo(0, 9)
    expect(r.weight).toBeCloseTo(49, 9)
  })
  it('wood: f = 14.7 N, a = 3.06 m/s2 (kinetic)', () => {
    const r = solveFromRest(flat(30, 'wood'))
    expect(r.regime).toBe('kinetic')
    expect(Math.abs(r.friction)).toBeCloseTo(14.7, 9)
    expect(r.friction).toBeLessThan(0)
    expect(r.a).toBeCloseTo(3.06, 2)
  })
  it('wood, F = 15: static, a = 0, f = 15.0 N, limit mu_s N = 19.6 N', () => {
    const r = solveFromRest(flat(15, 'wood'))
    expect(r.regime).toBe('static')
    expect(r.a).toBe(0)
    expect(r.friction).toBeCloseTo(-15, 9)
    expect(r.maxStatic).toBeCloseTo(19.6, 9)
  })
  it('static friction never exceeds mu_s N', () => {
    for (const F of [0, 5, 10, 15, 19, 19.6]) {
      const r = solveFromRest(flat(F, 'wood'))
      expect(r.regime).toBe('static')
      expect(Math.abs(r.friction)).toBeLessThanOrEqual(r.maxStatic + 1e-9)
    }
  })
  it('rough, F = 30: a = 1.10 m/s2 (30 N > mu_s N = 29.4 N)', () => {
    const r = solveFromRest(flat(30, 'rough'))
    expect(r.regime).toBe('kinetic')
    expect(r.a).toBeCloseTo(1.1, 2)
  })
  it('incline 30 deg, F = 0, frictionless: a = 4.90 m/s2 down the slope', () => {
    const r = solveFromRest(ramp(30, 'frictionless'))
    expect(r.a).toBeCloseTo(-4.9, 9)
    expect(r.normal).toBeCloseTo(49 * Math.cos(Math.PI / 6), 9)
  })
  it('incline 30 deg, F = 0, wood: a = 2.35 m/s2 down; 15 deg stays at rest', () => {
    expect(solveFromRest(ramp(30, 'wood')).a).toBeCloseTo(-2.35, 2)
    const r15 = solveFromRest(ramp(15, 'wood'))
    expect(r15.regime).toBe('static')
    expect(r15.a).toBe(0)
    expect(Math.tan((15 * Math.PI) / 180)).toBeLessThan(SURFACES.wood.muS)
  })
  it('a = 0 while moving keeps the velocity (T = mu_k N)', () => {
    const p = flat(14.7, 'wood') // equals mu_k N = 0.3 * 49
    expect(accelWhileMoving(p, 2)).toBeCloseTo(0, 9)
    expect(stepVelocity(p, 2, 0.1)).toBeCloseTo(2, 9)
  })
  it('friction never reverses the motion: a sliding block with no push stops at v = 0', () => {
    const p = flat(0, 'wood')
    let v = 1
    for (let i = 0; i < 100; i++) v = stepVelocity(p, v, 0.05)
    expect(v).toBe(0)
  })
  it('weight in N = m g; reaction of N is equal and opposite', () => {
    const r = solveFromRest(flat(0, 'wood', 10))
    expect(r.weight).toBeCloseTo(98, 9)
    expect(reactionOfNormal(r)).toBeCloseTo(-98, 9)
  })
})
