import { describe, expect, it } from 'vitest'
import { RUN_SECONDS, averageSpeed, distanceAt, kmhToMs, motionState, msToKmh, sampleGraph, speedAt, trackWindow } from './motion'
import type { MotionParams } from './motion'

const uni = (v: number): MotionParams => ({ mode: 'uniform', v, a: 0 })
const acc = (a: number): MotionParams => ({ mode: 'accelerating', v: 0, a })

describe('motion', () => {
  it('uniform: v = 10 m/s at t = 5 s gives 50 m', () => {
    expect(distanceAt(uni(10), 5)).toBe(50)
    expect(speedAt(uni(10), 5)).toBe(10)
  })
  it('accelerating: a = 2 m/s2 at t = 5 s gives 25 m and v = 10 m/s', () => {
    expect(distanceAt(acc(2), 5)).toBe(25)
    expect(speedAt(acc(2), 5)).toBe(10)
  })
  it('1 m/s = 3.6 km/h; 10 m/s shows 36 km/h', () => {
    expect(msToKmh(1)).toBeCloseTo(3.6)
    expect(msToKmh(10)).toBeCloseTo(36)
    expect(kmhToMs(72)).toBeCloseTo(20)
  })
  it('average speed equals s / t', () => {
    expect(averageSpeed(uni(10), 5)).toBe(10)
    expect(averageSpeed(acc(2), 5)).toBe(distanceAt(acc(2), 5) / 5)
    expect(averageSpeed(acc(2), 5)).toBe(5) // half the final speed
    expect(averageSpeed(acc(2), 0)).toBe(0)
  })
  it('uniform graph is a straight line through the origin with slope v', () => {
    const pts = sampleGraph(uni(7), 10, 11)
    expect(pts[0]).toEqual({ t: 0, s: 0 })
    for (const p of pts.slice(1)) expect(p.s / p.t).toBeCloseTo(7)
  })
  it('accelerating graph is a parabola s = a t^2 / 2 (constant positive second difference)', () => {
    const pts = sampleGraph(acc(2), 10, 11)
    const d2 = pts.slice(2).map((p, i) => p.s - 2 * pts[i + 1].s + pts[i].s)
    for (const x of d2) expect(x).toBeCloseTo(2)
  })
  it('time is clamped to the 10 s run and to >= 0', () => {
    expect(distanceAt(uni(10), 99)).toBe(10 * RUN_SECONDS)
    expect(distanceAt(uni(10), -3)).toBe(0)
    expect(motionState(uni(10), 12).finished).toBe(true)
  })
  it('track window scrolls in 100 m pages', () => {
    expect(trackWindow(0)).toEqual({ start: 0, end: 100 })
    expect(trackWindow(99.9)).toEqual({ start: 0, end: 100 })
    expect(trackWindow(150)).toEqual({ start: 100, end: 200 })
  })
  it('maximum slider values stay within 200 m', () => {
    expect(distanceAt(uni(20), 10)).toBe(200)
    expect(distanceAt(acc(4), 10)).toBe(200)
  })
})
