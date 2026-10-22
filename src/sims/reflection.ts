// Pure geometry for the `reflection` simulation (m2-11). 2D, mirror lies along the x axis (y = 0),
// its normal points up (0, 1), the viewer / object is above (y > 0). Angles in degrees from the NORMAL.

export interface Vec2 {
  x: number
  y: number
}

export const MAX_INCIDENCE = 80
export const MIN_DISTANCE = 1
export const MAX_DISTANCE = 6

const rad = (d: number) => (d * Math.PI) / 180
export const deg = (r: number) => (r * 180) / Math.PI

/** Law of reflection: r = i. */
export const reflectionAngle = (incidenceDeg: number): number => incidenceDeg

/** Unit direction of the incident ray travelling towards the mirror, coming from the left. */
export function incidentDirection(incidenceDeg: number): Vec2 {
  const i = rad(incidenceDeg)
  return { x: Math.sin(i), y: -Math.cos(i) }
}

/** Reflect direction d about a unit normal n: d' = d - 2(d·n)n. */
export function reflect(d: Vec2, n: Vec2): Vec2 {
  const dot = d.x * n.x + d.y * n.y
  return { x: d.x - 2 * dot * n.x, y: d.y - 2 * dot * n.y }
}

/** Reflected ray direction for a plane mirror along the x axis. i = 0 returns the ray on itself. */
export function reflectedDirection(incidenceDeg: number): Vec2 {
  return reflect(incidentDirection(incidenceDeg), { x: 0, y: 1 })
}

/** Angle between a ray and the normal (0..90), measured from the normal, never the surface. */
export function angleFromNormal(d: Vec2, n: Vec2 = { x: 0, y: 1 }): number {
  const len = Math.hypot(d.x, d.y) * Math.hypot(n.x, n.y)
  const c = Math.abs(d.x * n.x + d.y * n.y) / len
  return deg(Math.acos(Math.min(1, c)))
}

/** Where the incident ray (from a point at height `distance`) meets the mirror: x = distance·tan(i). */
export function hitPoint(incidenceDeg: number, distance: number): Vec2 {
  return { x: distance * Math.tan(rad(incidenceDeg)), y: 0 }
}

/** Virtual image of a point: same x, mirrored behind the mirror (y -> -y). Distance behind = distance in front. */
export function imagePosition(object: Vec2): Vec2 {
  return { x: object.x, y: -object.y }
}

/** Image distance behind the mirror equals the object distance; image height equals object height. */
export const imageDistance = (objectDistance: number): number => objectDistance

/** Plane mirror image of the point where the reflected ray appears to come from lies on the line through it. */
export function reflectedRayEnd(incidenceDeg: number, distance: number, length: number): Vec2 {
  const hit = hitPoint(incidenceDeg, distance)
  const d = reflectedDirection(incidenceDeg)
  return { x: hit.x + d.x * length, y: hit.y + d.y * length }
}

/** Tilting the mirror by `tiltDeg` rotates its normal; returns the reflected direction for a fixed incident ray. */
export function reflectedDirectionTilted(incidenceDeg: number, tiltDeg: number): Vec2 {
  const t = rad(tiltDeg)
  const n = { x: -Math.sin(t), y: Math.cos(t) }
  return reflect(incidentDirection(incidenceDeg), n)
}

/** Two plane mirrors at angle theta (deg) form 360/theta - 1 images when 360/theta is a whole number. */
export function imagesBetweenMirrors(thetaDeg: number): number {
  const n = 360 / thetaDeg
  const whole = Math.round(n)
  return Math.abs(n - whole) < 1e-9 ? whole - 1 : Math.floor(n)
}
