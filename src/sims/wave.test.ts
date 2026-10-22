import { describe, expect, it } from 'vitest'
import {
  antinodePositions,
  nodeCount,
  nodePositions,
  period,
  resultantAmplitude,
  standingFrequency,
  standingWavelength,
  standingY,
  superpositionY,
  travellingY,
  waveReadout,
  waveSpeed,
} from './wave'

describe('wave', () => {
  it('v = f lambda: 2 Hz x 1.5 m = 3.00 m/s; T = 1/f', () => {
    expect(waveSpeed(2, 1.5)).toBeCloseTo(3, 10)
    expect(period(2)).toBeCloseTo(0.5, 10)
    const r = waveReadout(2, 1.5)
    expect(r.omega).toBeCloseTo(12.566, 3)
    expect(r.k).toBeCloseTo(4.189, 3)
  })
  it('resultant amplitude for A1 = A2 = 1', () => {
    expect(resultantAmplitude(1, 1, 0)).toBeCloseTo(2, 10)
    expect(resultantAmplitude(1, 1, 90)).toBeCloseTo(1.414, 3)
    expect(resultantAmplitude(1, 1, 180)).toBeCloseTo(0, 6)
    expect(resultantAmplitude(1, 0.5, 180)).toBeCloseTo(0.5, 10)
  })
  it('superposition: in phase doubles, opposite phase cancels at every x and t', () => {
    const y = (phi: number, x: number, t: number) => superpositionY(1, 1, 2, 1.5, phi, x, t)
    for (const x of [0.1, 0.4, 1.1]) {
      for (const t of [0, 0.13, 0.31]) {
        expect(y(0, x, t)).toBeCloseTo(2 * travellingY(1, 2, 1.5, x, t), 10)
        expect(y(180, x, t)).toBeCloseTo(0, 10)
      }
    }
  })
  it('travelling wave: crest moves at v (y(x + v dt, t + dt) = y(x, t))', () => {
    const v = waveSpeed(2, 1.5)
    expect(travellingY(0.6, 2, 1.5, 0.3 + v * 0.1, 0.1)).toBeCloseTo(travellingY(0.6, 2, 1.5, 0.3, 0), 10)
  })
  it('standing wave on L = 1.5 m, v = 3 m/s', () => {
    expect(standingFrequency(1, 3)).toBeCloseTo(1, 10)
    expect(standingFrequency(3, 3)).toBeCloseTo(3, 10)
    expect(nodeCount(1)).toBe(2)
    expect(nodeCount(3)).toBe(4)
    expect(nodePositions(1)).toEqual([0, 1.5])
    expect(nodePositions(3)).toHaveLength(4)
    expect(antinodePositions(3)).toHaveLength(3)
    expect(standingWavelength(3)).toBeCloseTo(1, 10)
  })
  it('fixed ends are nodes at all times; antinode swings 2A', () => {
    for (const n of [1, 2, 5]) {
      const lam = standingWavelength(n)
      const f = standingFrequency(n, 3)
      for (const t of [0, 0.07, 0.4]) {
        expect(standingY(0.8, f, lam, 0, t)).toBeCloseTo(0, 10)
        expect(standingY(0.8, f, lam, 1.5, t)).toBeCloseTo(0, 10)
      }
      const xa = antinodePositions(n)[0]
      expect(Math.abs(standingY(0.8, f, lam, xa, 0))).toBeCloseTo(1.6, 10)
    }
  })
})
