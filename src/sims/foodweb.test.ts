import { describe, expect, it } from 'vitest'
import { POND_CHAIN, RICE_CHAIN, RICE_WEB, energyAtLevel, percentOfProducer, pyramid, removalEffects, removeOne } from './foodweb'

describe('foodweb energy', () => {
  it('10% rule: 10000 -> 10000, 1000, 100, 10, 1', () => {
    expect(pyramid(10000, 5)).toEqual([10000, 1000, 100, 10, 1])
    expect(energyAtLevel(100000, 3)).toBe(1000)
  })
  it('top of a 5-level chain gets 0.01 %', () => {
    expect(percentOfProducer(5)).toBe(0.01)
    expect(percentOfProducer(1)).toBe(100)
  })
})

describe('foodweb removal', () => {
  it('removing the frog: snake down (and eagle by cascade), grasshopper up', () => {
    const e = removeOne(RICE_CHAIN, 'frog')
    expect(e.frog).toBe('removed')
    expect(e.snake).toBe('down')
    expect(e.eagle).toBe('down')
    expect(e.grasshopper).toBe('up')
    expect(e.rice).toBe('none')
  })
  it('removing the producer: everyone else down', () => {
    const e = removeOne(RICE_CHAIN, 'rice')
    for (const id of ['grasshopper', 'frog', 'snake', 'eagle']) expect(e[id]).toBe('down')
  })
  it('removing the top predator: prey up', () => {
    const e = removeOne(POND_CHAIN, 'heron')
    expect(e.bigfish).toBe('up')
    expect(e.smallfish).toBe('none')
  })
  it('web: eater with another food source is not marked down by cascade', () => {
    const e = removalEffects(RICE_WEB, ['frog'])
    expect(e.snake).toBe('down') // direct predator of frog
    expect(e.grasshopper).toBe('up')
    expect(e.eagle).toBe('none') // snake is down but eagle also eats birds
    const r = removalEffects(RICE_WEB, ['rice'])
    expect(r.rat).toBe('down')
    expect(r.eagle).toBe('down')
  })
  it('graph structure: every edge references known organisms, levels increase', () => {
    for (const g of [RICE_CHAIN, POND_CHAIN, RICE_WEB]) {
      const lv = new Map(g.organisms.map((x) => [x.id, x.level]))
      for (const [eater, eaten] of g.eats) {
        expect(lv.has(eater)).toBe(true)
        expect(lv.has(eaten)).toBe(true)
        expect(lv.get(eater)!).toBeGreaterThan(lv.get(eaten)!)
      }
    }
  })
})
