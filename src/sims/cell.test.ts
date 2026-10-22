import { describe, expect, it } from 'vitest'
import {
  CELL_SIZE_UM,
  LEVELS,
  ORGANELLES,
  mayBurst,
  organellesOf,
  outcome,
  plantOnly,
  relativeVolume,
  waterDirection,
} from './cell'

const ids = (c: Parameters<typeof organellesOf>[0]) => organellesOf(c).map((o) => o.id)

describe('organelle data', () => {
  it('every organelle has bilingual name and function', () => {
    for (const o of ORGANELLES) {
      expect(o.name.lo && o.name.en && o.fn.lo && o.fn.en && o.label, o.id).toBeTruthy()
      expect(/^[\x20-\x7e]+$/.test(o.label), `${o.id} label is Latin only`).toBe(true)
    }
    expect(new Set(ORGANELLES.map((o) => o.id)).size).toBe(ORGANELLES.length)
  })
  it('plant has exactly 3 more structures than animal (wall, chloroplast, large vacuole)', () => {
    expect(organellesOf('plant').length - organellesOf('animal').length).toBe(3)
    expect(plantOnly().map((o) => o.id).sort()).toEqual(['chloroplast', 'vacuole', 'wall'])
    for (const id of ids('animal')) expect(ids('plant')).toContain(id)
  })
  it('bacterium has no nucleus and no mitochondrion, but ribosomes and a nucleoid', () => {
    expect(ids('bacterium')).not.toContain('nucleus')
    expect(ids('bacterium')).not.toContain('mitochondrion')
    expect(ids('bacterium')).toContain('ribosome')
    expect(ids('bacterium')).toContain('nucleoid')
  })
  it('animal cell has no wall, chloroplast or large vacuole', () => {
    for (const id of ['wall', 'chloroplast', 'vacuole'] as const) expect(ids('animal')).not.toContain(id)
  })
  it('relative sizes: bacterium << animal < plant; ribosome smallest', () => {
    expect(CELL_SIZE_UM.bacterium).toBeLessThan(CELL_SIZE_UM.animal)
    expect(CELL_SIZE_UM.animal).toBeLessThan(CELL_SIZE_UM.plant)
    const min = Math.min(...ORGANELLES.map((o) => o.sizeUm))
    expect(ORGANELLES.find((o) => o.sizeUm === min)?.id).toBe('membrane')
    expect(ORGANELLES.find((o) => o.id === 'ribosome')!.sizeUm).toBeLessThan(1)
  })
})

describe('osmosis', () => {
  it('spec outcomes', () => {
    expect(outcome('animal', 'water')).toBe('swells')
    expect(outcome('animal', 'saline09')).toBe('noNetMovement')
    expect(outcome('animal', 'saline5')).toBe('shrinks')
    expect(outcome('plant', 'water')).toBe('turgid')
    expect(outcome('plant', 'saline5')).toBe('plasmolysed')
  })
  it('water moves toward the higher solute concentration', () => {
    expect(waterDirection('animal', 'water')).toBe('in')
    expect(waterDirection('animal', 'saline5')).toBe('out')
    expect(waterDirection('animal', 'saline09')).toBe('none')
  })
  it('only an animal cell in pure water may burst; plant is protected by its wall', () => {
    expect(mayBurst('animal', 'water')).toBe(true)
    expect(mayBurst('plant', 'water')).toBe(false)
    expect(mayBurst('animal', 'saline5')).toBe(false)
  })
  it('volumes: swell > normal > shrink; turgid plant stays at wall limit', () => {
    expect(relativeVolume('animal', 'water')).toBeGreaterThan(1)
    expect(relativeVolume('animal', 'saline5')).toBeLessThan(1)
    expect(relativeVolume('plant', 'water')).toBeLessThanOrEqual(1)
    expect(relativeVolume('plant', 'saline5')).toBeLessThan(1)
  })
  it('levels of organisation order', () => {
    expect([...LEVELS]).toEqual(['cell', 'tissue', 'organ', 'system', 'organism'])
  })
})
