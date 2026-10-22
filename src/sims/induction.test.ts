import { describe, expect, it } from 'vitest'
import {
  PEAK_EMF_X,
  flux,
  generatorEmf,
  generatorPeak,
  generatorPeriod,
  magnetEmf,
  magnetPeakEmf,
  rms,
  signedVelocity,
} from './induction'

describe('induction: magnet', () => {
  it('flux model: 1.00 mWb at the centre, half at x = 0.05 m', () => {
    expect(flux(0)).toBeCloseTo(1e-3, 12)
    expect(flux(0.05)).toBeCloseTo(0.5e-3, 12)
  })
  it('N = 100, v = 1 m/s -> peak 1.30 V at x = +-0.029 m', () => {
    expect(PEAK_EMF_X).toBeCloseTo(0.0289, 4)
    expect(Math.abs(magnetEmf(100, 0.029, 1))).toBeCloseTo(1.3, 2)
    expect(Math.abs(magnetEmf(100, -0.029, 1))).toBeCloseTo(1.3, 2)
    expect(magnetPeakEmf(100, 1)).toBeCloseTo(1.3, 2)
    // it really is the maximum over a scan
    let best = 0
    for (let x = -0.3; x <= 0.3; x += 0.001) best = Math.max(best, Math.abs(magnetEmf(100, x, 1)))
    expect(best).toBeCloseTo(1.299, 2)
  })
  it('N = 50 -> 0.65 V; proportional to N and speed', () => {
    expect(magnetPeakEmf(50, 1)).toBeCloseTo(0.65, 2)
    expect(magnetPeakEmf(100, 2) / magnetPeakEmf(100, 1)).toBeCloseTo(2)
    expect(magnetPeakEmf(200, 1) / magnetPeakEmf(100, 1)).toBeCloseTo(2)
  })
  it('no relative motion -> 0, and 0 at the coil centre', () => {
    expect(magnetEmf(100, 0.02, 0)).toBe(0)
    expect(magnetEmf(100, 0, 1)).toBe(0)
  })
  it('sign flips between entering and leaving, and with polarity (Lenz)', () => {
    const v = signedVelocity(1, 'in')
    const entering = magnetEmf(100, -0.03, v)
    const leaving = magnetEmf(100, 0.03, v)
    expect(entering * leaving).toBeLessThan(0)
    expect(entering).toBeCloseTo(-leaving, 10)
    expect(magnetEmf(100, -0.03, v, -1)).toBeCloseTo(-entering, 10)
    expect(magnetEmf(100, -0.03, signedVelocity(1, 'out'))).toBeCloseTo(-entering, 10)
  })
})

describe('induction: generator', () => {
  it('N = 100, B = 0.1 T, f = 50 Hz -> 31.4 V peak, 22.2 V rms, 20.0 ms', () => {
    const peak = generatorPeak(100, 0.1, 50)
    expect(peak).toBeCloseTo(31.4, 1)
    expect(rms(peak)).toBeCloseTo(22.2, 1)
    expect(generatorPeriod(50) * 1000).toBeCloseTo(20, 10)
  })
  it('peak is proportional to B, N and f', () => {
    const base = generatorPeak(100, 0.1, 50)
    expect(generatorPeak(100, 0.2, 50)).toBeCloseTo(2 * base, 8)
    expect(generatorPeak(200, 0.1, 50)).toBeCloseTo(2 * base, 8)
    expect(generatorPeak(100, 0.1, 25)).toBeCloseTo(base / 2, 8)
  })
  it('eps(t) is sinusoidal: 0 at t = 0, peak at T/4, 0 at T/2', () => {
    const T = generatorPeriod(50)
    expect(generatorEmf(100, 0.1, 50, 0)).toBeCloseTo(0, 10)
    expect(generatorEmf(100, 0.1, 50, T / 4)).toBeCloseTo(generatorPeak(100, 0.1, 50), 8)
    expect(generatorEmf(100, 0.1, 50, T / 2)).toBeCloseTo(0, 8)
  })
})
