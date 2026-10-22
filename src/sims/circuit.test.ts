import { describe, expect, it } from 'vitest'
import {
  basicCircuit,
  ivLine,
  ohmCircuit,
  parallelResistance,
  seriesResistance,
  wireResistance,
  electricEnergy,
} from './circuit'

describe('circuit basic', () => {
  it('2 cells, 3 bulbs: series I = 0.10 A, each 0.1 W; parallel I = 0.9 A, each 0.9 W', () => {
    const s = basicCircuit({ cells: 2, bulbs: 3, wiring: 'series', switchOn: true })
    expect(s.current).toBeCloseTo(0.1)
    for (const b of s.bulbs) {
      expect(b.power).toBeCloseTo(0.1)
      expect(b.voltage).toBeCloseTo(1)
    }
    const p = basicCircuit({ cells: 2, bulbs: 3, wiring: 'parallel', switchOn: true })
    expect(p.current).toBeCloseTo(0.9)
    for (const b of p.bulbs) expect(b.power).toBeCloseTo(0.9)
  })
  it('series: more bulbs -> each dimmer; parallel: brightness unchanged', () => {
    const glow = (n: number, w: 'series' | 'parallel') =>
      basicCircuit({ cells: 2, bulbs: n, wiring: w, switchOn: true }).bulbs[0].power
    expect(glow(1, 'series')).toBeGreaterThan(glow(2, 'series'))
    expect(glow(2, 'series')).toBeGreaterThan(glow(3, 'series'))
    expect(glow(1, 'parallel')).toBeCloseTo(glow(3, 'parallel'))
  })
  it('series with an unscrewed bulb: I = 0, all off; parallel: others unchanged', () => {
    const s = basicCircuit({ cells: 3, bulbs: 3, wiring: 'series', switchOn: true, removed: [false, true, false] })
    expect(s.current).toBe(0)
    expect(s.bulbs.every((b) => !b.lit)).toBe(true)
    const p = basicCircuit({ cells: 3, bulbs: 3, wiring: 'parallel', switchOn: true, removed: [false, true, false] })
    const full = basicCircuit({ cells: 3, bulbs: 3, wiring: 'parallel', switchOn: true })
    expect(p.bulbs[0].power).toBeCloseTo(full.bulbs[0].power)
    expect(p.bulbs[1].lit).toBe(false)
    expect(p.bulbs[1].present).toBe(false)
    expect(p.current).toBeCloseTo((full.current * 2) / 3)
  })
  it('open switch: I = 0', () => {
    expect(basicCircuit({ cells: 4, bulbs: 2, wiring: 'parallel', switchOn: false }).current).toBe(0)
    expect(basicCircuit({ cells: 4, bulbs: 2, wiring: 'series', switchOn: false }).totalPower).toBe(0)
  })
  it('glow is within 0..1', () => {
    const r = basicCircuit({ cells: 4, bulbs: 1, wiring: 'series', switchOn: true })
    expect(r.bulbs[0].glow).toBeCloseTo(1)
  })
})

describe('circuit ohm', () => {
  it('V = 12, R1 = 10, R2 = 20, series', () => {
    const r = ohmCircuit({ volts: 12, r1: 10, r2: 20, arrangement: 'series' })
    expect(r.rEq).toBeCloseTo(30)
    expect(r.current).toBeCloseTo(0.4)
    expect(r.branches[0].voltage).toBeCloseTo(4)
    expect(r.branches[1].voltage).toBeCloseTo(8)
    expect(r.power).toBeCloseTo(4.8)
  })
  it('parallel: R_eq = 6.67 Ω, I = 1.8 A, below the smaller R, branch currents add', () => {
    const r = ohmCircuit({ volts: 12, r1: 10, r2: 20, arrangement: 'parallel' })
    expect(r.rEq).toBeCloseTo(6.667, 2)
    expect(r.current).toBeCloseTo(1.8)
    expect(r.rEq).toBeLessThan(10)
    expect(r.branches[0].current + r.branches[1].current).toBeCloseTo(r.current)
    expect(r.branches[0].voltage).toBe(12)
  })
  it('series voltage divides in proportion to R; single uses R1 only', () => {
    const r = ohmCircuit({ volts: 9, r1: 30, r2: 60, arrangement: 'series' })
    expect(r.branches[0].voltage / r.branches[1].voltage).toBeCloseTo(0.5)
    expect(r.branches[0].voltage + r.branches[1].voltage).toBeCloseTo(9)
    const s = ohmCircuit({ volts: 12, r1: 10, r2: 20, arrangement: 'single' })
    expect(s.current).toBeCloseTo(1.2)
    expect(s.branches).toHaveLength(1)
  })
  it('V = 0 gives zero current; I-V line has slope 1/R', () => {
    expect(ohmCircuit({ volts: 0, r1: 5, r2: 5, arrangement: 'parallel' }).current).toBe(0)
    const line = ivLine(20)
    expect(line[0]).toEqual({ v: 0, i: 0 })
    const last = line[line.length - 1]
    expect(last.v).toBe(12)
    expect(last.i / last.v).toBeCloseTo(1 / 20)
  })
  it('helpers', () => {
    expect(seriesResistance([1, 2, 3])).toBe(6)
    expect(parallelResistance([10, 10])).toBeCloseTo(5)
    expect(wireResistance(1.7e-8, 10, 1e-6)).toBeCloseTo(0.17)
    expect(electricEnergy(100, 3600)).toBe(360000)
  })
})
