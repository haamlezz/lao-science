import { describe, expect, it } from 'vitest'
import {
  METALS,
  hydrogenLevel,
  isVisible,
  photoelectric,
  photonEnergy,
  seriesName,
  spectralRegion,
  thresholdWavelength,
  transitionEnergy,
  transitionWavelength,
  wavelengthColor,
} from './photoelectric'

describe('photoelectric effect', () => {
  it('Na, 400 nm: E 3.10 eV, K_max 0.80 eV, V_s 0.80 V', () => {
    const r = photoelectric('Na', 400, 5)
    expect(r.energy).toBeCloseTo(3.1, 2)
    expect(r.emits).toBe(true)
    expect(r.kMax).toBeCloseTo(0.8, 2)
    expect(r.stoppingVoltage).toBeCloseTo(0.8, 2)
  })
  it('Na, 600 nm: no emission even at intensity 10', () => {
    const r = photoelectric('Na', 600, 10)
    expect(r.emits).toBe(false)
    expect(r.kMax).toBe(0)
    expect(r.electronCount).toBe(0)
    expect(r.stoppingVoltage).toBe(0)
  })
  it('threshold wavelengths Cs 590, Na 539, Zn 288, Cu 264 nm', () => {
    expect(Math.round(thresholdWavelength(METALS.Cs))).toBe(590)
    expect(Math.round(thresholdWavelength(METALS.Na))).toBe(539)
    expect(Math.round(thresholdWavelength(METALS.Zn))).toBe(288)
    expect(Math.round(thresholdWavelength(METALS.Cu))).toBe(264)
  })
  it('at exactly the threshold there is no emission (E > W0 is strict)', () => {
    expect(photoelectric('Cs', 1240 / 2.1, 5).emits).toBe(false)
  })
  it('intensity 4 -> 8 doubles the count, K_max unchanged', () => {
    const a = photoelectric('Na', 400, 4)
    const b = photoelectric('Na', 400, 8)
    expect(b.electronCount).toBe(2 * a.electronCount)
    expect(b.kMax).toBe(a.kMax)
  })
  it('K_max is linear in frequency: equal 1/lambda steps give equal K steps', () => {
    const k = (nm: number) => photoelectric('Zn', nm, 1).kMax
    // E = 1240/250 = 4.96, 1240/200 = 6.2: slope check via photon energies
    expect(k(200) - k(250)).toBeCloseTo(photonEnergy(200) - photonEnergy(250), 10)
  })
})

describe('hydrogen levels', () => {
  it('energy levels', () => {
    expect(hydrogenLevel(1)).toBeCloseTo(-13.6, 10)
    expect(hydrogenLevel(2)).toBeCloseTo(-3.4, 10)
  })
  it('Balmer lines: 656 (+-1), 486, 434, 410 nm', () => {
    expect(Math.abs(transitionWavelength(3, 2) - 656)).toBeLessThanOrEqual(1)
    expect(transitionWavelength(4, 2)).toBeCloseTo(486, 0)
    expect(transitionWavelength(5, 2)).toBeCloseTo(434, 0)
    expect(transitionWavelength(6, 2)).toBeCloseTo(410, 0)
  })
  it('2 -> 1 is 122 nm, ultraviolet, not visible', () => {
    expect(transitionWavelength(2, 1)).toBeCloseTo(122, 0)
    expect(spectralRegion(transitionWavelength(2, 1))).toBe('ultraviolet')
    expect(isVisible(transitionWavelength(2, 1))).toBe(false)
    expect(isVisible(transitionWavelength(3, 2))).toBe(true)
    expect(seriesName(1)).toBe('Lyman')
    expect(seriesName(2)).toBe('Balmer')
  })
  it('transition energy 3 -> 2 = 1.89 eV; rejects n_f >= n_i', () => {
    expect(transitionEnergy(3, 2)).toBeCloseTo(1.889, 3)
    expect(() => transitionEnergy(2, 2)).toThrow()
    expect(() => transitionEnergy(2, 3)).toThrow()
  })
  it('colour helper returns hex and grey outside visible', () => {
    expect(wavelengthColor(656)).toMatch(/^#[0-9a-f]{6}$/)
    expect(wavelengthColor(122)).toBe('#9e9e9e')
  })
})
