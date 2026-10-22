import { describe, expect, it } from 'vitest'
import {
  avogadroVolume,
  boylePressure,
  boyleVolume,
  celsiusToKelvin,
  charlesVolume,
  combinedPressure,
  combinedTemperature,
  combinedVolume,
  gayLussacPressure,
  grahamRatio,
  idealAmount,
  idealPressure,
  idealTemperature,
  idealVolume,
  molarVolumeL,
  partialPressure,
  pressureKPa,
  volumeL,
  rmsSpeed,
} from './gaslaw'

describe('gaslaw', () => {
  it('ideal gas check values from the spec', () => {
    expect(pressureKPa(0.1, 300, 2)).toBeCloseTo(124.7, 1)
    expect(pressureKPa(0.1, 300, 1)).toBeCloseTo(249.4, 1)
    expect(pressureKPa(0.1, 600, 2)).toBeCloseTo(249.4, 1)
    expect(volumeL(0.1, 400, 124.7)).toBeCloseTo(2.667, 2)
    expect(molarVolumeL(273.15, 101.325)).toBeCloseTo(22.4, 1)
  })
  it('Boyle: pV constant', () => {
    expect(boylePressure(1.0, 2.0, 0.5)).toBeCloseTo(4.0, 10)
    expect(boyleVolume(1.0, 2.0, 4.0)).toBeCloseTo(0.5, 10)
    expect(() => boylePressure(1, 1, 0)).toThrow()
  })
  it('Charles and Gay-Lussac use kelvin', () => {
    expect(charlesVolume(2, 300, 400)).toBeCloseTo(2.667, 2)
    expect(charlesVolume(1, celsiusToKelvin(0), celsiusToKelvin(100))).toBeCloseTo(1.366, 3)
    expect(gayLussacPressure(124.7, 300, 600)).toBeCloseTo(249.4, 1)
    expect(() => charlesVolume(1, 0, 300)).toThrow()
    expect(() => gayLussacPressure(1, 300, -5)).toThrow()
  })
  it('combined law is consistent with the single laws and ideal gas', () => {
    expect(combinedPressure(100, 2, 300, 1, 300)).toBeCloseTo(200, 8)
    expect(combinedPressure(100, 2, 300, 2, 600)).toBeCloseTo(200, 8)
    expect(combinedVolume(100, 2, 300, 100, 450)).toBeCloseTo(3, 8)
    expect(combinedTemperature(100, 2, 300, 200, 2)).toBeCloseTo(600, 8)
  })
  it('SI ideal gas round trip', () => {
    const p = idealPressure(0.1, 300, 0.002)
    expect(p).toBeCloseTo(124710, -1)
    expect(idealVolume(0.1, 300, p)).toBeCloseTo(0.002, 10)
    expect(idealTemperature(p, 0.002, 0.1)).toBeCloseTo(300, 8)
    expect(idealAmount(p, 0.002, 300)).toBeCloseTo(0.1, 10)
  })
  it('Avogadro, Dalton, Graham', () => {
    expect(avogadroVolume(22.4, 1, 0.25)).toBeCloseTo(5.6, 8)
    expect(partialPressure(1, 5, 100)).toBeCloseTo(20, 8)
    expect(grahamRatio(2.0, 32.0)).toBeCloseTo(4, 8)
  })
  it('particle speed scales with sqrt(T)', () => {
    expect(rmsSpeed(400, 28) / rmsSpeed(100, 28)).toBeCloseTo(2, 8)
  })
})
