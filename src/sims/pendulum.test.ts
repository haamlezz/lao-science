import { describe, expect, it } from 'vitest'
import {
  dampedEnergy,
  energies,
  exactPeriod,
  initialState,
  kineticEnergy,
  power,
  releaseHeight,
  smallAnglePeriod,
  speedAtBottom,
  step,
  totalEnergy,
  work,
} from './pendulum'

function run(angle: number, mass: number, seconds: number, damping: boolean) {
  const e0 = totalEnergy(mass, angle)
  let s = initialState(angle)
  const out: ReturnType<typeof energies>[] = []
  for (let i = 0; i < seconds * 100; i++) {
    s = step(s, 0.01, damping)
    out.push(energies(mass, s, e0))
  }
  return { e0, out, s }
}

describe('pendulum', () => {
  it('checks: m = 1 kg, 60 deg, L = 2 m -> h0 = 1.0 m, E = 9.8 J, v = 4.43 m/s', () => {
    expect(releaseHeight(60)).toBeCloseTo(1.0)
    expect(totalEnergy(1, 60)).toBeCloseTo(9.8)
    expect(speedAtBottom(60)).toBeCloseTo(4.427, 2)
    expect(kineticEnergy(1, speedAtBottom(60))).toBeCloseTo(9.8)
  })
  it('ideal: Ek + Ep stays constant within 0.1 %', () => {
    const { e0, out } = run(60, 1, 30, false)
    for (const e of out) expect(Math.abs(e.total - e0) / e0).toBeLessThan(0.001)
    expect(Math.max(...out.map((e) => e.heat))).toBeLessThan(0.01)
  })
  it('Ek is maximal at the bottom (= E0) and zero at the extreme', () => {
    const { e0, out } = run(60, 2, 10, false)
    expect(Math.max(...out.map((e) => e.ek))).toBeCloseTo(e0, 1)
    expect(Math.min(...out.map((e) => e.ek))).toBeLessThan(0.05 * e0)
    expect(initialState(60).omega).toBe(0)
  })
  it('period does not depend on mass; exact >= small-angle, and tends to it for small angles', () => {
    // the motion (theta, omega) is computed without the mass, so speed and height agree for any mass
    const light = run(60, 0.5, 5, false).s
    const heavy = run(60, 5, 5, false).s
    expect(light.theta).toBe(heavy.theta)
    expect(energies(5, heavy, 49).ek / energies(0.5, light, 4.9).ek).toBeCloseTo(10)
    expect(smallAnglePeriod()).toBeCloseTo(2.838, 2)
    expect(exactPeriod(10)).toBeGreaterThan(smallAnglePeriod())
    expect(exactPeriod(1)).toBeCloseTo(smallAnglePeriod(), 3)
    expect(exactPeriod(60)).toBeCloseTo(3.05, 1)
    expect(exactPeriod(80)).toBeCloseTo(3.27, 1)
  })
  it('simulated period matches exactPeriod (60 deg)', () => {
    let s = initialState(60)
    let t = 0
    // from release to the opposite extreme = T/2 (omega changes sign from negative to positive)
    let sawNegative = false
    for (let i = 0; i < 100000; i++) {
      s = step(s, 0.001, false)
      t += 0.001
      if (s.omega < 0) sawNegative = true
      if (sawNegative && s.omega >= 0) break
    }
    expect(2 * t).toBeCloseTo(exactPeriod(60), 2)
  })
  it('damping: amplitude decays, heat grows, total follows E0*exp(-t/tau) on average', () => {
    const { e0, out, s } = run(60, 1, 60, true)
    const early = Math.max(...out.slice(0, 300).map((e) => e.height))
    const late = Math.max(...out.slice(-300).map((e) => e.height))
    expect(late).toBeLessThan(early)
    const last = out[out.length - 1]
    expect(last.heat).toBeGreaterThan(0.5 * e0)
    expect(last.total + last.heat).toBeCloseTo(e0)
    // average of the total over the last period ~ analytic curve (within 15 %)
    const avg = out.slice(-300).reduce((a, e) => a + e.total, 0) / 300
    expect(avg / dampedEnergy(e0, s.t)).toBeGreaterThan(0.85)
    expect(avg / dampedEnergy(e0, s.t)).toBeLessThan(1.15)
  })
  it('work and power helpers: 10 kg lifted 2 m = 196 J', () => {
    expect(work(10 * 9.8, 2)).toBeCloseTo(196)
    expect(power(196, 4)).toBeCloseTo(49)
    expect(power(1, 0)).toBe(0)
  })
})
