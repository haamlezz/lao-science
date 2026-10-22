import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import type { Direction, ParticleMix } from '../../sims/states'

export const STATE_COLORS = { solid: '#4fc3f7', liquid: '#2962ff', gas: '#ffe0b2', heat: '#ff7043', cold: '#4fc3f7' }

const COLS = 8
const ROWS = 6
const N = COLS * ROWS
const SPACING = 0.72
const BOX_W = 6.4
const BOX_BOTTOM = -2.0
const BOX_TOP = 3.0
const R = 0.26
const dummy = new THREE.Object3D()
const tmpColor = new THREE.Color()

// small deterministic pseudo-random in [0,1)
const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return x - Math.floor(x)
}
const tri = (u: number) => Math.abs((((u % 2) + 2) % 2) - 1) // triangle wave 0..1..0

interface Particle {
  hx: number
  hy: number
  rank: number
  z: number
}

function makeParticles(): Particle[] {
  return Array.from({ length: N }, (_, i) => {
    const c = i % COLS
    const r = Math.floor(i / COLS)
    return {
      hx: (c - (COLS - 1) / 2) * SPACING,
      hy: BOX_BOTTOM + 0.45 + r * SPACING,
      rank: (i * 17) % N, // 17 is coprime with 48: a fixed shuffle that decides who melts / boils first
      z: ((i * 5) % 3 - 1) * 0.3,
    }
  })
}

/**
 * 48 instanced spheres. Fractions of solid / liquid / gas come from `mix`; the lowest-ranked particles
 * boil first, then melt. Solid = lattice vibrating, liquid = lattice with sliding drift, gas = free bouncing.
 */
function Particles({ mix }: { mix: ParticleMix }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const ps = useMemo(makeParticles, [])
  const nGas = Math.round(mix.gas * N)
  const nLiq = Math.round(mix.liquid * N)
  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const time = clock.elapsedTime
    const vib = 0.03 + 0.07 * mix.jitter
    ps.forEach((p, i) => {
      let x = p.hx
      let y = p.hy
      if (p.rank < nGas) {
        const lo = -BOX_W / 2 + R + 0.05
        const sp = 0.12 + 0.3 * mix.jitter
        x = lo - 2 * lo * tri(hash(i, 1) * 2 + time * sp * (0.6 + hash(i, 2)))
        y = BOX_BOTTOM + R + 0.05 + (BOX_TOP - BOX_BOTTOM - 2 * R - 0.1) * tri(hash(i, 3) * 2 + time * sp * (0.6 + hash(i, 4)))
        tmpColor.set(STATE_COLORS.gas)
      } else if (p.rank < nGas + nLiq) {
        // liquid: stays near its place but slides around with a larger, slow wander
        x += (hash(i, 5) - 0.5) * 0.25 + Math.sin(time * 1.1 + i) * 0.16
        y += (hash(i, 6) - 0.5) * 0.15 + Math.cos(time * 0.9 + i * 1.7) * 0.1
        tmpColor.set(STATE_COLORS.liquid)
      } else {
        x += Math.sin(time * 9 + i * 2.1) * vib
        y += Math.cos(time * 8 + i * 1.3) * vib
        tmpColor.set(STATE_COLORS.solid)
      }
      dummy.position.set(x, y, p.z)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, tmpColor)
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]} frustumCulled={false}>
      <sphereGeometry args={[R, 12, 8]} />
      <meshStandardMaterial roughness={0.4} />
    </instancedMesh>
  )
}

interface Props {
  mix: ParticleMix
  direction: Direction
  powerKw: number
  active: boolean // heater / cooler is running
}

export function StatesScene({ mix, direction, powerKw, active }: Props) {
  const cy = (BOX_TOP + BOX_BOTTOM) / 2
  const h = BOX_TOP - BOX_BOTTOM
  const heating = direction === 'heating'
  const flame = active ? 0.4 + (powerKw / 3) * 0.8 : 0.15
  const col = heating ? STATE_COLORS.heat : STATE_COLORS.cold
  const outline: [number, number, number][] = [
    [-BOX_W / 2, BOX_BOTTOM, 0],
    [BOX_W / 2, BOX_BOTTOM, 0],
    [BOX_W / 2, BOX_TOP, 0],
    [-BOX_W / 2, BOX_TOP, 0],
    [-BOX_W / 2, BOX_BOTTOM, 0],
  ]
  return (
    <group>
      <mesh position={[0, cy, 0]}>
        <boxGeometry args={[BOX_W, h, 1.2]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <Line points={outline} color="#eceff1" lineWidth={2.5} />
      <Particles mix={mix} />
      <Label formula text="H2O" position={[-2.5, BOX_TOP + 0.45, 0]} size={0.55} color="#eceff1" />
      {/* heater plate with flames, or an ice bath when cooling */}
      <mesh position={[0, BOX_BOTTOM - 0.5, 0]}>
        <boxGeometry args={[BOX_W + 0.6, 0.35, 1.2]} />
        <meshStandardMaterial color={active ? col : '#546e7a'} emissive={active ? col : '#000000'} emissiveIntensity={0.5} />
      </mesh>
      {[-2, -0.7, 0.7, 2].map((x) => (
        <mesh key={x} position={[x, BOX_BOTTOM - 0.75 - flame * 0.4, 0]} rotation={[heating ? 0 : Math.PI, 0, 0]} scale={[1, flame, 1]}>
          <coneGeometry args={[0.28, 0.8, 10]} />
          <meshStandardMaterial color={col} emissive={col} emissiveIntensity={active ? 0.7 : 0.1} transparent opacity={active ? 1 : 0.3} />
        </mesh>
      ))}
    </group>
  )
}
