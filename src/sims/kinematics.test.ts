import { describe, expect, it } from 'vitest'
import {
  G,
  areaUnderV,
  displacement,
  distanceTravelled,
  duration,
  effectiveAccel,
  kinState,
  landingTime,
  maxHeight,
  position,
  sample,
  timeToTop,
  turningTime,
  velocity,
} from './kinematics'
import type { KinParams } from './kinematics'

const acc = (v0: number, a: number, x0 = 0): KinParams => ({ mode: 'accelerated', x0, v0, a })
const ff = (y0: number, v0: number): KinParams => ({ mode: 'freefall', x0: y0, v0, a: 0 })

describe('kinematics', () => {
  it('from rest, a = 2 m/s2, t = 5 s: x = 25.0 m, v = 10.0 m/s', () => {
    expect(position(acc(0, 2), 5)).toBeCloseTo(25, 6)
    expect(velocity(acc(0, 2), 5)).toBeCloseTo(10, 6)
  })
  it('uniform ignores a and keeps v', () => {
    const p: KinParams = { mode: 'uniform', x0: -10, v0: 4, a: 3 }
    expect(effectiveAccel(p)).toBe(0)
    expect(position(p, 5)).toBe(10)
    expect(velocity(p, 5)).toBe(4)
  })
  it('v0 = 10, a = -2: at 5 s v = 0 and x = 25 m; at 10 s v = -10, displacement 0, distance 50 m', () => {
    const p = acc(10, -2)
    expect(velocity(p, 5)).toBeCloseTo(0, 9)
    expect(position(p, 5)).toBeCloseTo(25, 9)
    expect(turningTime(p)).toBeCloseTo(5, 9)
    expect(velocity(p, 10)).toBeCloseTo(-10, 9)
    expect(displacement(p, 10)).toBeCloseTo(0, 9)
    expect(distanceTravelled(p, 10)).toBeCloseTo(50, 9)
    expect(distanceTravelled(p, 3)).toBeCloseTo(displacement(p, 3), 9) // no reversal yet
  })
  it('drop from 20 m: t = 2.02 s, v = 19.8 m/s downward', () => {
    const p = ff(20, 0)
    const T = landingTime(20, 0)
    expect(T).toBeCloseTo(2.02, 2)
    expect(duration(p)).toBeCloseTo(T, 9)
    expect(velocity(p, T)).toBeCloseTo(-19.8, 1)
    expect(position(p, T)).toBeCloseTo(0, 9)
  })
  it('throw up at 19.6 m/s: H = 19.6 m at 2.00 s, lands at 4.00 s with v = -19.6 m/s', () => {
    const p = ff(0, 19.6)
    expect(maxHeight(0, 19.6)).toBeCloseTo(19.6, 9)
    expect(timeToTop(19.6)).toBeCloseTo(2, 9)
    expect(velocity(p, 2)).toBeCloseTo(0, 9)
    expect(effectiveAccel(p)).toBe(-G) // a is still -g at the top
    expect(landingTime(0, 19.6)).toBeCloseTo(4, 9)
    expect(velocity(p, 4)).toBeCloseTo(-19.6, 9)
    expect(position(p, 2)).toBeCloseTo(19.6, 9)
    expect(distanceTravelled(p, 4)).toBeCloseTo(39.2, 9)
    expect(displacement(p, 4)).toBeCloseTo(0, 9)
  })
  it('area under v-t equals displacement, also with a reversal', () => {
    for (const p of [acc(0, 2), acc(10, -2), ff(20, 5)]) {
      for (const t of [1, 2.5, 4]) expect(areaUnderV(p, t)).toBeCloseTo(displacement(p, t), 9)
    }
  })
  it('x-t is a parabola (constant second difference 2*a*h^2/2) and v-t slope is a', () => {
    const pts = sample(acc(3, 1.5), 10, 11)
    for (let i = 2; i < pts.length; i++) {
      expect(pts[i].x - 2 * pts[i - 1].x + pts[i - 2].x).toBeCloseTo(1.5, 9)
      expect(pts[i].v - pts[i - 1].v).toBeCloseTo(1.5, 9)
    }
  })
  it('time is clamped to the run', () => {
    expect(position(acc(0, 2), 99)).toBeCloseTo(100, 9)
    expect(position(acc(0, 2), -1)).toBe(0)
    expect(kinState(acc(0, 2), 12).finished).toBe(true)
    expect(kinState(ff(0, 0), 1).finished).toBe(true) // dropped from the ground: duration 0
  })
})
