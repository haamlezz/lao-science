import { lazy } from 'react'
import type { FC, LazyExoticComponent } from 'react'
import type { SimKey } from '../../content/lower'
import type { SimHostProps } from './host'

type SimModule = { default: FC<SimHostProps> }

/**
 * SimKey -> dynamic import. Every module default-exports a stage + controls component made by `makeSimHost`.
 * Vite splits each into its own chunk; the PWA precache glob (**\/*.js) covers them for offline use.
 * Keys not listed here belong to simulations that are not built yet.
 */
export const SIMS: Partial<Record<SimKey, () => Promise<SimModule>>> = {
  motion: () => import('./motion'),
  force: () => import('./force'),
  pressure: () => import('./pressure'),
  photosynthesis: () => import('./photosynthesis'),
  thermal: () => import('./thermal'),
  foodweb: () => import('./foodweb'),
  reflection: () => import('./reflection'),
  pendulum: () => import('./pendulum'),
  circuit: () => import('./circuit'),
  states: () => import('./states'),
  solenoid: () => import('./solenoid'),
  lens: () => import('./lens'),
  kinematics: () => import('./kinematics'),
  newton: () => import('./newton'),
  projectile: () => import('./projectile'),
  wave: () => import('./wave'),
  induction: () => import('./induction'),
  photoelectric: () => import('./photoelectric'),
  cell: () => import('./cell'),
  heart: () => import('./heart'),
  population: () => import('./population'),
  genetics: () => import('./genetics'),
  selection: () => import('./selection'),
  mole: () => import('./mole'),
  gaslaw: () => import('./gaslaw'),
  periodic: () => import('./periodic'),
  bonding: () => import('./bonding'),
  rate: () => import('./rate'),
  acidbase: () => import('./acidbase'),
  electrochem: () => import('./electrochem'),
}

const cache = new Map<SimKey, LazyExoticComponent<FC<SimHostProps>>>()

/** Lazy component for a sim key, or undefined when it is not built. Created once per key. */
export function getSimComponent(key: SimKey): LazyExoticComponent<FC<SimHostProps>> | undefined {
  const loader = SIMS[key]
  if (!loader) return undefined
  let c = cache.get(key)
  if (!c) {
    c = lazy(loader)
    cache.set(key, c)
  }
  return c
}
