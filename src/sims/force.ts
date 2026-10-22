// Pure formulas for the `force` simulation (m2-04), extracted from the former M2Lesson.tsx / ForceScene.tsx.

export const G_EARTH = 9.8 // N/kg
export const G_MOON = 1.6 // N/kg (value used by the existing lesson)

/** Resultant of two forces on one line. same: both push right; otherwise F1 pulls left, F2 pulls right. Positive = right. */
export function netForce(f1: number, f2: number, same: boolean): number {
  return same ? f1 + f2 : f2 - f1
}

export function gravity(moon: boolean): number {
  return moon ? G_MOON : G_EARTH
}

/** Weight W = m·g, rounded to 0.1 N as displayed. */
export function weight(mass: number, g: number): number {
  return Math.round(mass * g * 10) / 10
}

/** a = F ÷ m (magnitude, m/s²). */
export function acceleration(net: number, mass: number): number {
  return Math.abs(net) / mass
}

// Crate animation: light friction so the crate stops when the resultant is zero (visual only).
export const FRICTION = 2.5
export const ACCEL_VISUAL_GAIN = 0.12
export const POSITION_GAIN = 6

/** One explicit-Euler step of the crate velocity used by the scene. */
export function stepCrateVelocity(v: number, net: number, mass: number, dt: number): number {
  return v + ((net / mass) * ACCEL_VISUAL_GAIN - FRICTION * v) * dt
}
