import { describe, expect, it } from 'vitest'
import {
  E_TOTAL,
  STAGE_KJ,
  curveCorners,
  energyAt,
  heatForTemperatureChange,
  latentHeat,
  particleMix,
  phaseAtTemperature,
  runSeconds,
  snapshotAt,
  temperatureAtEnergy,
} from './states'

describe('states', () => {
  it('stage energies: 21, 167, 210, 1130, 20 kJ; total 1548 kJ', () => {
    expect(STAGE_KJ.ice).toBeCloseTo(21)
    expect(STAGE_KJ.melt).toBeCloseTo(167)
    expect(STAGE_KJ.water).toBeCloseTo(210)
    expect(STAGE_KJ.boil).toBeCloseTo(1130)
    expect(STAGE_KJ.steam).toBeCloseTo(20)
    expect(E_TOTAL).toBeCloseTo(1548)
    expect(runSeconds(1)).toBeCloseTo(1548)
  })
  it('checks at 1 kW', () => {
    expect(snapshotAt(1, 0).temp).toBeCloseTo(-20)
    const a = snapshotAt(1, 21)
    expect(a.temp).toBeCloseTo(0)
    expect(a.state).toBe('ice')
    const b = snapshotAt(1, 188)
    expect(b.temp).toBeCloseTo(0)
    expect(b.state).toBe('ice+water')
    const m = snapshotAt(1, 100)
    expect(m.temp).toBe(0)
    expect(m.state).toBe('ice+water')
    expect(m.mix.solid + m.mix.liquid).toBeCloseTo(1)
    const c = snapshotAt(1, 398)
    expect(c.temp).toBeCloseTo(100)
    expect(c.state).toBe('water')
    expect(snapshotAt(1, 1000).state).toBe('water+steam')
    const d = snapshotAt(1, 1528)
    expect(d.temp).toBeCloseTo(100)
    expect(snapshotAt(1, 1540).temp).toBeCloseTo(112)
    expect(snapshotAt(1, 1548).temp).toBeCloseTo(120)
    expect(snapshotAt(1, 1548).done).toBe(true)
    expect(snapshotAt(1, 1548).state).toBe('steam')
  })
  it('temperature is flat on both plateaus while energy still grows', () => {
    for (const e of [30, 100, 187]) expect(temperatureAtEnergy(e)).toBe(0)
    for (const e of [500, 1000, 1500]) expect(temperatureAtEnergy(e)).toBe(100)
    expect(temperatureAtEnergy(300)).toBeGreaterThan(0)
    expect(temperatureAtEnergy(300)).toBeLessThan(100)
  })
  it('temperature is monotonic in energy; higher power shortens time proportionally', () => {
    let prev = -Infinity
    for (let e = 0; e <= E_TOTAL; e += 10) {
      const t = temperatureAtEnergy(e)
      expect(t).toBeGreaterThanOrEqual(prev)
      prev = t
    }
    expect(runSeconds(3)).toBeCloseTo(516)
    expect(snapshotAt(2, 398 / 2).temp).toBeCloseTo(100)
  })
  it('cooling mirrors heating', () => {
    const P = 1
    for (const t of [0, 10, 100, 500, 1200, 1548]) {
      const h = snapshotAt(P, t, 'heating').temp
      const c = snapshotAt(P, runSeconds(P) - t, 'cooling').temp
      expect(c).toBeCloseTo(h)
    }
    expect(snapshotAt(1, 0, 'cooling').temp).toBeCloseTo(120)
    expect(energyAt(1, 5000, 'cooling')).toBe(0)
    expect(snapshotAt(1, 1548, 'cooling').temp).toBeCloseTo(-20)
  })
  it('particle mix: fractions sum to 1 and jitter grows with T', () => {
    for (let e = 0; e <= E_TOTAL; e += 25) {
      const p = particleMix(e)
      expect(p.solid + p.liquid + p.gas).toBeCloseTo(1)
    }
    expect(particleMix(0).solid).toBe(1)
    expect(particleMix(300).liquid).toBe(1)
    expect(particleMix(1540).gas).toBe(1)
    expect(particleMix(300).jitter).toBeGreaterThan(particleMix(0).jitter)
    expect(particleMix(1540).jitter).toBeGreaterThan(particleMix(300).jitter)
  })
  it('corners and helpers', () => {
    const c = curveCorners(1)
    expect(c.map((p) => p.t)).toEqual([0, 21, 188, 398, 1528, 1548])
    expect(c.map((p) => p.temp)).toEqual([-20, 0, 0, 100, 100, 120])
    expect(heatForTemperatureChange(2, 4.2, 50)).toBeCloseTo(420)
    expect(latentHeat(0.5, 334)).toBeCloseTo(167)
    expect(phaseAtTemperature(-5)).toBe('solid')
    expect(phaseAtTemperature(25)).toBe('liquid')
    expect(phaseAtTemperature(130)).toBe('gas')
  })
})
