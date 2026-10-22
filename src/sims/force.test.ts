import { describe, expect, it } from 'vitest'
import { G_EARTH, G_MOON, acceleration, gravity, netForce, stepCrateVelocity, weight } from './force'

describe('force', () => {
  it('same direction adds, opposite subtracts', () => {
    expect(netForce(30, 20, true)).toBe(50)
    expect(netForce(30, 20, false)).toBe(-10) // F1 (left) larger: resultant to the left
    expect(netForce(20, 30, false)).toBe(10)
  })
  it('equal opposite forces are balanced', () => {
    expect(netForce(25, 25, false)).toBe(0)
  })
  it('weight = m g', () => {
    expect(weight(5, G_EARTH)).toBe(49)
    expect(weight(60, gravity(true))).toBe(96)
    expect(weight(60, G_MOON)).toBe(96)
    expect(gravity(false)).toBe(9.8)
  })
  it('acceleration = |F| / m', () => {
    expect(acceleration(-10, 5)).toBe(2)
  })
  it('crate velocity settles to 0 with zero resultant and stays at rest', () => {
    let v = 1
    for (let i = 0; i < 400; i++) v = stepCrateVelocity(v, 0, 5, 0.05)
    expect(Math.abs(v)).toBeLessThan(1e-6)
    expect(stepCrateVelocity(0, 0, 5, 0.05)).toBe(0)
  })
  it('crate speeds up in the direction of the resultant', () => {
    expect(stepCrateVelocity(0, 10, 5, 0.05)).toBeGreaterThan(0)
    expect(stepCrateVelocity(0, -10, 5, 0.05)).toBeLessThan(0)
  })
})
