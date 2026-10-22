// Pure formulas for the `lens` simulation (m4-07). No React / three.
// Thin lens, real-is-positive convention: 1/f = 1/u + 1/v, with u > 0 for a real object on the left.
//   f > 0 convex (converging), f < 0 concave (diverging). v > 0: real image (right of the lens),
//   v < 0: virtual image (same side as the object). m = −v/u; image height = m × object height.
// Coordinates for drawing: lens at x = 0, principal axis y = 0, object at x = −u, units cm,
// y up. Incoming light travels left to right.

export type LensType = 'convex' | 'concave'

export const OBJECT_HEIGHT_CM = 2
export const F_RANGE = { min: 5, max: 15, step: 1 } as const // |f|, cm
export const U_RANGE = { min: 5, max: 50, step: 1 } as const // object distance, cm
const EPS = 1e-9

export type ImageSize = 'enlarged' | 'reduced' | 'same'

export interface ImageInfo {
  type: LensType
  f: number // signed focal length, cm (+ convex, − concave)
  u: number // object distance, cm
  /** True when u = f of a convex lens: rays leave parallel, no image ("image at infinity"). */
  atInfinity: boolean
  v: number | null // signed image distance, cm (null at infinity)
  m: number | null // −v/u (null at infinity); negative = inverted
  imageHeight: number | null // cm, signed (negative = below the axis)
  real: boolean | null // null at infinity
  upright: boolean | null
  size: ImageSize | null
}

export function signedFocal(type: LensType, absF: number): number {
  return type === 'convex' ? Math.abs(absF) : -Math.abs(absF)
}

/**
 * Image of an object at distance u (cm) for a lens of |f| = absF cm.
 *   convex f = 10: u = 30 -> v = 15, m = −0.5 (real, inverted, reduced)
 *                  u = 20 -> v = 20, m = −1 (real, inverted, same)
 *                  u = 15 -> v = 30, m = −2 (real, inverted, enlarged)
 *                  u = 5  -> v = −10, m = +2 (virtual, upright, enlarged)
 *                  u = 10 -> at infinity
 *   concave f = 10: u = 30 -> v = −7.5, m = +0.25 (virtual, upright, reduced); always so.
 */
export function imageOf(type: LensType, absF: number, u: number, objectHeight = OBJECT_HEIGHT_CM): ImageInfo {
  const f = signedFocal(type, absF)
  const base = { type, f, u }
  if (Math.abs(u - f) < EPS) {
    return {
      ...base,
      atInfinity: true,
      v: null,
      m: null,
      imageHeight: null,
      real: null,
      upright: null,
      size: null,
    }
  }
  // 1/v = 1/f − 1/u  ->  v = f·u / (u − f)
  const v = (f * u) / (u - f)
  const m = -v / u
  const am = Math.abs(m)
  const size: ImageSize = Math.abs(am - 1) < 1e-6 ? 'same' : am > 1 ? 'enlarged' : 'reduced'
  return {
    ...base,
    atInfinity: false,
    v,
    m,
    imageHeight: m * objectHeight,
    real: v > 0,
    upright: m > 0,
    size,
  }
}

export interface Point {
  x: number
  y: number
}

export interface Ray {
  /** Object tip to the lens plane (x = 0). */
  incoming: [Point, Point]
  /** From the lens plane onwards to x = xEnd (real light path). */
  outgoing: [Point, Point]
  /** Dashed back-extension from the lens plane to the virtual image tip (virtual images only). */
  virtualBack: [Point, Point] | null
}

export interface PrincipalRays {
  /** Parallel to the axis, then through the far focus (convex) / as if from the near focus (concave). */
  parallel: Ray
  /** Through the optical centre, undeviated. */
  centre: Ray
  /** Towards the near focus (convex: through F on the object side; concave: aimed at F on the far side), leaves parallel. null when u = f of a convex lens. */
  focal: Ray | null
  imageTip: Point | null
}

/**
 * Three principal rays from the object tip (−u, h), each as incoming / outgoing / virtual back-extension.
 * xEnd is the x coordinate (cm, > 0) where the outgoing segments stop; pass e.g. max(v, 2|f|)·1.2 or the view edge.
 */
export function principalRays(
  type: LensType,
  absF: number,
  u: number,
  xEnd: number,
  objectHeight = OBJECT_HEIGHT_CM,
): PrincipalRays {
  const info = imageOf(type, absF, u, objectHeight)
  const f = info.f
  const h = objectHeight
  const tip: Point = { x: -u, y: h }
  const imageTip: Point | null = info.atInfinity ? null : { x: info.v as number, y: info.imageHeight as number }
  const virtual = info.real === false
  const back = (p: Point): [Point, Point] | null => (virtual && imageTip ? [p, imageTip] : null)
  const alongSlope = (p: Point, slope: number): [Point, Point] => [p, { x: xEnd, y: p.y + slope * (xEnd - p.x) }]

  const hit1: Point = { x: 0, y: h }
  // exit slope of the ray that arrived parallel to the axis: passes through (f, 0) -> slope −h / f
  const parallel: Ray = {
    incoming: [tip, hit1],
    outgoing: alongSlope(hit1, -h / f),
    virtualBack: back(hit1),
  }
  const hit2: Point = { x: 0, y: 0 }
  const centre: Ray = {
    incoming: [tip, hit2],
    outgoing: alongSlope(hit2, -h / u),
    virtualBack: back(hit2),
  }
  let focal: Ray | null = null
  if (Math.abs(u - f) >= EPS) {
    // line through the tip and (−f, 0) meets the lens plane at y = −h·f / (u − f); leaves parallel
    const y3 = (-h * f) / (u - f)
    const hit3: Point = { x: 0, y: y3 }
    focal = {
      incoming: [tip, hit3],
      outgoing: alongSlope(hit3, 0),
      virtualBack: back(hit3),
    }
  }
  return { parallel, centre, focal, imageTip }
}
