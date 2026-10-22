// Pure formulas for the `pendulum` simulation (m3-03). No React / three.
// Units: kg, m, s, rad (angles in the API of the *Deg functions are degrees), J.
// Model: simple pendulum (point mass on a light string), g = 9.8 m/s².
// Damping ("air resistance") is a linear drag -m·L·ω/TAU on the angular equation, so the
// total mechanical energy decays on average like E0·e^(−t/TAU) and the lost part is heat.

export const G = 9.8
export const LENGTH = 2 // m, fixed string length of the simulation
export const TAU = 20 // s, energy decay time of the damped model
export const MASS_RANGE = { min: 0.5, max: 5, step: 0.5 } as const
export const ANGLE_RANGE_DEG = { min: 10, max: 80, step: 5 } as const

const MAX_SUBSTEP = 0.005 // s, RK4 sub-step (energy drift < 0.1 % over minutes)

const toRad = (deg: number) => (deg * Math.PI) / 180

/** Height above the lowest point: h = L(1 − cos θ). θ in radians. */
export function heightAt(thetaRad: number, length = LENGTH): number {
  return length * (1 - Math.cos(thetaRad))
}

/** Potential energy Ep = m g h (J). */
export function potentialEnergy(mass: number, height: number): number {
  return mass * G * height
}

/** Kinetic energy Ek = ½ m v² (J). */
export function kineticEnergy(mass: number, speed: number): number {
  return 0.5 * mass * speed * speed
}

/** Momentum p = m v (kg·m/s). */
export function momentum(mass: number, speed: number): number {
  return mass * speed
}

/** Work W = F · s (J), force along the displacement. */
export function work(force: number, distance: number): number {
  return force * distance
}

/** Power P = W / t (W). t must be > 0 (returns 0 otherwise). */
export function power(workJ: number, seconds: number): number {
  return seconds > 0 ? workJ / seconds : 0
}

/** Release height h0 = L(1 − cos θ0). 60° with L = 2 m gives 1.0 m. */
export function releaseHeight(angle0Deg: number, length = LENGTH): number {
  return heightAt(toRad(angle0Deg), length)
}

/** Total mechanical energy at release (J) = m g h0. m = 1 kg, 60° → 9.8 J. */
export function totalEnergy(mass: number, angle0Deg: number, length = LENGTH): number {
  return potentialEnergy(mass, releaseHeight(angle0Deg, length))
}

/** Ideal speed at the bottom v = √(2 g h0) (m/s). 60°, L = 2 m → 4.43 m/s. Independent of mass. */
export function speedAtBottom(angle0Deg: number, length = LENGTH): number {
  return Math.sqrt(2 * G * releaseHeight(angle0Deg, length))
}

/** Small-angle period T ≈ 2π√(L/g) (s). L = 2 m → 2.84 s. Independent of mass and amplitude. */
export function smallAnglePeriod(length = LENGTH): number {
  return 2 * Math.PI * Math.sqrt(length / G)
}

/**
 * Exact period (s) for amplitude angle0Deg, by numerical integration (composite Simpson):
 * T = 4√(L/g) ∫₀^{π/2} dφ / √(1 − k² sin²φ),  k = sin(θ0/2).
 * 10° → 2.85 s, 60° → 3.05 s, 80° → 3.27 s (L = 2 m). Always >= smallAnglePeriod.
 */
export function exactPeriod(angle0Deg: number, length = LENGTH, intervals = 200): number {
  const k = Math.sin(toRad(angle0Deg) / 2)
  const n = intervals % 2 === 0 ? intervals : intervals + 1
  const f = (phi: number) => 1 / Math.sqrt(1 - k * k * Math.sin(phi) ** 2)
  const h = Math.PI / 2 / n
  let s = f(0) + f(Math.PI / 2)
  for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * f(i * h)
  return 4 * Math.sqrt(length / G) * ((s * h) / 3)
}

export interface PendulumState {
  t: number // s since release
  theta: number // rad, signed angle from the vertical
  omega: number // rad/s
}

/** Released from rest at +angle0Deg. */
export function initialState(angle0Deg: number): PendulumState {
  return { t: 0, theta: toRad(angle0Deg), omega: 0 }
}

function accel(theta: number, omega: number, damping: boolean, length: number): number {
  return -(G / length) * Math.sin(theta) - (damping ? omega / TAU : 0)
}

/**
 * Advance the state by dt seconds with RK4 (internally split into sub-steps of <= 5 ms).
 * Safe to call each frame with the frame time (clamp dt to e.g. 0.1 s outside).
 */
export function step(s: PendulumState, dt: number, damping: boolean, length = LENGTH): PendulumState {
  if (dt <= 0) return s
  const n = Math.max(1, Math.ceil(dt / MAX_SUBSTEP))
  const h = dt / n
  let { theta, omega } = s
  for (let i = 0; i < n; i++) {
    const k1t = omega
    const k1w = accel(theta, omega, damping, length)
    const k2t = omega + 0.5 * h * k1w
    const k2w = accel(theta + 0.5 * h * k1t, k2t, damping, length)
    const k3t = omega + 0.5 * h * k2w
    const k3w = accel(theta + 0.5 * h * k2t, k3t, damping, length)
    const k4t = omega + h * k3w
    const k4w = accel(theta + h * k3t, k4t, damping, length)
    theta += (h / 6) * (k1t + 2 * k2t + 2 * k3t + k4t)
    omega += (h / 6) * (k1w + 2 * k2w + 2 * k3w + k4w)
  }
  return { t: s.t + dt, theta, omega }
}

export interface EnergyReadout {
  height: number // m above the lowest point
  speed: number // m/s
  ep: number // J
  ek: number // J
  total: number // J, ep + ek
  heat: number // J, e0 − total (0 when damping is off), never negative
}

/** Energy bars for a state. e0 = totalEnergy(mass, angle0Deg). */
export function energies(mass: number, s: PendulumState, e0: number, length = LENGTH): EnergyReadout {
  const height = heightAt(s.theta, length)
  const speed = Math.abs(s.omega) * length
  const ep = potentialEnergy(mass, height)
  const ek = kineticEnergy(mass, speed)
  const total = ep + ek
  return { height, speed, ep, ek, total, heat: Math.max(0, e0 - total) }
}

/** Analytic average energy of the damped model: E0·e^(−t/TAU) (J). Use for the heat bar trend / checks. */
export function dampedEnergy(e0: number, t: number): number {
  return e0 * Math.exp(-Math.max(t, 0) / TAU)
}
