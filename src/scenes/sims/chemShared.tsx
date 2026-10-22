import type { ReactNode } from 'react'

// Helpers shared by the upper-secondary chemistry sims (mole, gaslaw, periodic, bonding, rate, acidbase, electrochem).

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺',
}

/** Unicode superscript of an integer or sign string: sup('-12') = '⁻¹²'. */
export function sup(s: string | number): string {
  return [...String(s).replace('−', '-')].map((c) => SUP[c] ?? c).join('')
}

/** 1.20×10²⁴ style scientific notation with Unicode superscripts (3 significant figures). */
export function sci(x: number, digits = 3): string {
  if (x === 0) return '0'
  const e = Math.floor(Math.log10(Math.abs(x)))
  let m = x / Math.pow(10, e)
  let ee = e
  if (Number(m.toFixed(digits - 1)) >= 10) {
    m /= 10
    ee += 1
  }
  return `${m.toFixed(digits - 1)}×10${sup(ee)}`
}

/** 3 significant figures; switches to scientific notation outside 0.01 .. 9999. */
export function fmt3(x: number): string {
  if (x === 0) return '0'
  const a = Math.abs(x)
  if (a >= 10000 || a < 0.01) return sci(x)
  return x.toPrecision(3)
}

/** Ion label: ionLabel('Na', 1) = 'Na⁺', ionLabel('O', -2) = 'O²⁻'. */
export function ionLabel(symbol: string, charge: number): string {
  if (charge === 0) return symbol
  const n = Math.abs(charge)
  return `${symbol}${n === 1 ? '' : sup(n)}${charge > 0 ? '⁺' : '⁻'}`
}

/** Thin dark slab behind a flat drawing so it never vanishes edge-on in 3D. */
export function Slab({ w, h, y = 0, z = -0.7, color = '#12304a' }: { w: number; h: number; y?: number; z?: number; color?: string }): ReactNode {
  return (
    <mesh position={[0, y, z]}>
      <boxGeometry args={[w, h, 0.1]} />
      <meshStandardMaterial color={color} roughness={0.9} transparent opacity={0.7} />
    </mesh>
  )
}

// small deterministic pseudo-random in [0,1)
export const hash = (i: number, k: number): number => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return x - Math.floor(x)
}
/** Triangle wave 0..1..0 with period 2 (a bouncing coordinate). */
export const tri = (u: number): number => Math.abs((((u % 2) + 2) % 2) - 1)

/** Standard element colours for particles (CPK-like, readable on dark stage). */
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#eceff1', C: '#90a4ae', N: '#5c6bc0', O: '#ef5350', Na: '#ab47bc', Mg: '#66bb6a', Cl: '#9ccc65', Ca: '#26a69a', Fe: '#a1887f',
  Zn: '#78909c', Cu: '#ff8a65', Ag: '#cfd8dc',
}
