import * as THREE from 'three'

export const COLORS = {
  proton: '#ef5350',
  neutron: '#b0bec5',
  electron: '#4fc3f7',
  alpha: '#ffd54f',
  positive: '#ff6f61',
  ring: '#6f8fa9',
} as const

/** Visible-light colour for a wavelength in nm; UV/IR get fixed tints so they can still be shown. */
export function wavelengthToColor(nm: number): string {
  if (nm < 380) return '#b39ddb'
  if (nm > 750) return '#ef9a9a'
  let r = 0
  let g = 0
  let b = 0
  if (nm < 440) {
    r = -(nm - 440) / 60
    b = 1
  } else if (nm < 490) {
    g = (nm - 440) / 50
    b = 1
  } else if (nm < 510) {
    g = 1
    b = -(nm - 510) / 20
  } else if (nm < 580) {
    r = (nm - 510) / 70
    g = 1
  } else if (nm < 645) {
    r = 1
    g = -(nm - 645) / 65
  } else {
    r = 1
  }
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (750 - nm)) / 50 : 1
  const c = (v: number) => Math.round(255 * Math.pow(Math.max(0, v) * f, 0.8))
  return `#${[c(r), c(g), c(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

export function circlePoints(radius: number, segments = 96): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    pts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0))
  }
  return pts
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const ease = (t: number) => {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}
