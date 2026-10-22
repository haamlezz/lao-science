import { describe, expect, it } from 'vitest'
import {
  G_EARTH_MS2,
  G_MOON_MS2,
  droppedTime,
  droppedY,
  flightTime,
  maxHeight,
  range,
  rangeLevel,
  speedAt,
  trace,
  vx,
  vyAt,
  xAt,
  yAt,
} from './projectile'
import type { LaunchParams } from './projectile'

const mk = (v0: number, angleDeg: number, h0 = 0, g = G_EARTH_MS2): LaunchParams => ({ v0, angleDeg, h0, g })

describe('projectile', () => {
  it('20 m/s at 45 deg from the ground: R = 40.8 m, H = 10.2 m, T = 2.89 s', () => {
    const p = mk(20, 45)
    expect(range(p)).toBeCloseTo(40.8, 1)
    expect(maxHeight(p)).toBeCloseTo(10.2, 1)
    expect(flightTime(p)).toBeCloseTo(2.89, 2)
  })
  it('30 deg and 60 deg give the same range 35.3 m (spec says 35.4; exact 35.35)', () => {
    expect(range(mk(20, 30))).toBeCloseTo(35.35, 1)
    expect(range(mk(20, 60))).toBeCloseTo(35.35, 1)
    expect(range(mk(20, 30))).toBeCloseTo(range(mk(20, 60)), 6)
  })
  it('45 deg is the maximum range for h0 = 0', () => {
    const best = range(mk(20, 45))
    for (let a = 0; a <= 90; a += 5) expect(range(mk(20, a))).toBeLessThanOrEqual(best + 1e-9)
  })
  it('Moon, 45 deg: R = 250 m', () => {
    expect(range(mk(20, 45, 0, G_MOON_MS2))).toBeCloseTo(250, 6)
  })
  it('horizontal launch from 10 m at 10 m/s: T = 1.43 s, R = 14.3 m', () => {
    const p = mk(10, 0, 10)
    expect(flightTime(p)).toBeCloseTo(1.43, 2)
    expect(range(p)).toBeCloseTo(14.3, 1)
  })
  it('range formula matches v0^2 sin(2 theta) / g for h0 = 0', () => {
    for (const a of [10, 30, 45, 70]) expect(range(mk(25, a))).toBeCloseTo(rangeLevel(25, a, 9.8), 9)
  })
  it('vx is constant and vy changes at rate g', () => {
    const p = mk(30, 40, 10)
    for (const t of [0, 0.5, 1, 2]) {
      expect(speedAt(p, t) ** 2).toBeCloseTo(vx(p) ** 2 + vyAt(p, t) ** 2, 9)
      expect(xAt(p, t)).toBeCloseTo(vx(p) * t, 9)
    }
    expect((vyAt(p, 1) - vyAt(p, 2)) / 1).toBeCloseTo(9.8, 9)
  })
  it('the dropped ball and a horizontally launched ball land together', () => {
    for (const h of [10]) {
      for (const v of [5, 20, 50]) {
        const p = mk(v, 0, h)
        expect(flightTime(p)).toBeCloseTo(droppedTime(p), 9)
        expect(yAt(p, flightTime(p))).toBeCloseTo(droppedY(p, droppedTime(p)), 9)
      }
    }
  })
  it('lands on y = 0 and the trace ends at the range', () => {
    const p = mk(20, 45, 10)
    const pts = trace(p)
    expect(pts[0]).toEqual({ t: 0, x: 0, y: 10 })
    expect(pts[1].t).toBeCloseTo(0.25, 9)
    const last = pts[pts.length - 1]
    expect(last.y).toBe(0)
    expect(last.x).toBeCloseTo(range(p), 9)
    expect(yAt(p, 99)).toBe(0)
  })
})
