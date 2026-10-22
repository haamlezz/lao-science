import { describe, expect, it } from 'vitest'
import {
  angleFromNormal,
  hitPoint,
  imageDistance,
  imagePosition,
  imagesBetweenMirrors,
  incidentDirection,
  reflectedDirection,
  reflectedDirectionTilted,
  reflectionAngle,
} from './reflection'

describe('reflection', () => {
  it('r = i, measured from the normal', () => {
    expect(reflectionAngle(35)).toBe(35)
    for (const i of [0, 5, 35, 60, 80]) {
      expect(angleFromNormal(reflectedDirection(i))).toBeCloseTo(i, 9)
      expect(angleFromNormal(incidentDirection(i))).toBeCloseTo(i, 9)
    }
  })
  it('reflected ray is on the opposite side of the normal and leaves the mirror', () => {
    const inc = incidentDirection(35)
    const ref = reflectedDirection(35)
    expect(inc.y).toBeLessThan(0) // going down
    expect(ref.y).toBeGreaterThan(0) // going up
    expect(ref.x).toBeCloseTo(inc.x, 9) // continues to the same side; source and exit are on opposite sides of the normal
    expect(Math.hypot(ref.x, ref.y)).toBeCloseTo(1, 9)
  })
  it('i = 0 returns the ray on itself', () => {
    const r = reflectedDirection(0)
    expect(r.x).toBeCloseTo(0, 9)
    expect(r.y).toBeCloseTo(1, 9)
  })
  it('image: same distance behind, same height', () => {
    expect(imageDistance(3)).toBe(3)
    expect(imagePosition({ x: 2, y: 3 })).toEqual({ x: 2, y: -3 })
  })
  it('hit point: x = d tan i', () => {
    expect(hitPoint(45, 3).x).toBeCloseTo(3, 9)
    expect(hitPoint(0, 3).x).toBe(0)
  })
  it('tilting the mirror by t turns the reflected ray by 2t', () => {
    const base = Math.atan2(reflectedDirection(20).y, reflectedDirection(20).x)
    const tilted = reflectedDirectionTilted(20, 10)
    const diff = Math.abs(Math.atan2(tilted.y, tilted.x) - base) * (180 / Math.PI)
    expect(diff).toBeCloseTo(20, 6)
  })
  it('two mirrors: 90 deg -> 3 images, 60 deg -> 5, 45 deg -> 7', () => {
    expect(imagesBetweenMirrors(90)).toBe(3)
    expect(imagesBetweenMirrors(60)).toBe(5)
    expect(imagesBetweenMirrors(45)).toBe(7)
  })
})
