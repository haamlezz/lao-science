import { describe, expect, it } from 'vitest'
import { imageOf, principalRays } from './lens'

describe('lens', () => {
  it('convex f = 10 checks', () => {
    const a = imageOf('convex', 10, 30)
    expect(a.v).toBeCloseTo(15)
    expect(a.m).toBeCloseTo(-0.5)
    expect(a).toMatchObject({ real: true, upright: false, size: 'reduced' })
    const b = imageOf('convex', 10, 20)
    expect(b.v).toBeCloseTo(20)
    expect(b.m).toBeCloseTo(-1)
    expect(b.size).toBe('same')
    const c = imageOf('convex', 10, 5)
    expect(c.v).toBeCloseTo(-10)
    expect(c.m).toBeCloseTo(2)
    expect(c).toMatchObject({ real: false, upright: true, size: 'enlarged' })
  })
  it('convex between f and 2f: real, inverted, enlarged', () => {
    const r = imageOf('convex', 10, 15)
    expect(r.v).toBeCloseTo(30)
    expect(r).toMatchObject({ real: true, upright: false, size: 'enlarged' })
  })
  it('u = f: no image (at infinity)', () => {
    const r = imageOf('convex', 10, 10)
    expect(r.atInfinity).toBe(true)
    expect(r.v).toBeNull()
    expect(principalRays('convex', 10, 10, 40).focal).toBeNull()
  })
  it('concave: always virtual, upright, reduced, between lens and F', () => {
    const a = imageOf('concave', 10, 30)
    expect(a.v).toBeCloseTo(-7.5)
    expect(a.m).toBeCloseTo(0.25)
    for (let u = 5; u <= 50; u++) {
      const r = imageOf('concave', 10, u)
      expect(r).toMatchObject({ real: false, upright: true, size: 'reduced' })
      expect(Math.abs(r.v as number)).toBeLessThan(10)
      expect(Math.abs(r.v as number)).toBeGreaterThan(0)
    }
  })
  it('lens equation holds and m = -v/u for the whole slider range', () => {
    for (const type of ['convex', 'concave'] as const)
      for (let f = 5; f <= 15; f++)
        for (let u = 5; u <= 50; u++) {
          const r = imageOf(type, f, u)
          if (r.atInfinity) continue
          expect(1 / (r.v as number) + 1 / u).toBeCloseTo(1 / r.f, 9)
          expect(r.m).toBeCloseTo(-(r.v as number) / u, 12)
        }
  })
  it('the three principal rays meet at the image tip (real image)', () => {
    const rays = principalRays('convex', 10, 30, 60)
    const tip = rays.imageTip as { x: number; y: number }
    expect(tip.x).toBeCloseTo(15)
    expect(tip.y).toBeCloseTo(-1)
    const at = (seg: [{ x: number; y: number }, { x: number; y: number }], x: number) => {
      const [p, q] = seg
      return p.y + ((q.y - p.y) / (q.x - p.x)) * (x - p.x)
    }
    expect(at(rays.parallel.outgoing, tip.x)).toBeCloseTo(tip.y)
    expect(at(rays.centre.outgoing, tip.x)).toBeCloseTo(tip.y)
    expect(at((rays.focal as NonNullable<typeof rays.focal>).outgoing, tip.x)).toBeCloseTo(tip.y)
    expect(rays.parallel.virtualBack).toBeNull()
  })
  it('virtual image: back-extensions end at the image tip', () => {
    const rays = principalRays('convex', 10, 5, 40)
    const tip = rays.imageTip as { x: number; y: number }
    expect(tip.x).toBeCloseTo(-10)
    expect(tip.y).toBeCloseTo(4)
    for (const r of [rays.parallel, rays.centre, rays.focal]) {
      expect(r).not.toBeNull()
      const vb = (r as NonNullable<typeof r>).virtualBack as [{ x: number; y: number }, { x: number; y: number }]
      expect(vb[1]).toEqual(tip)
    }
    // the exit ray of the focal ray is parallel to the axis at the height where it hit the lens
    const f = rays.focal as NonNullable<typeof rays.focal>
    expect(f.outgoing[0].y).toBeCloseTo(f.outgoing[1].y)
    expect(f.outgoing[0].y).toBeCloseTo(4) // y = -h f/(u-f) = 2*10/5
  })
  it('concave rays diverge as if from the image', () => {
    const rays = principalRays('concave', 10, 30, 40)
    const tip = rays.imageTip as { x: number; y: number }
    expect(tip).toEqual({ x: expect.closeTo(-7.5, 6), y: expect.closeTo(0.5, 6) })
    const [p, q] = rays.parallel.outgoing
    const slope = (q.y - p.y) / (q.x - p.x)
    expect(slope).toBeGreaterThan(0)
    // back-extension of the exit ray passes through the image tip and the near focus
    expect(p.y + slope * (-10 - p.x)).toBeCloseTo(0)
    expect(p.y + slope * (tip.x - p.x)).toBeCloseTo(tip.y)
  })
})
