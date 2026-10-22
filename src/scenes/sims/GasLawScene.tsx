import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { Slab, tri, hash } from './chemShared'

export const GAS_COLORS = { particle: '#4fc3f7', hit: '#fff59d', piston: '#ffb74d', gauge: '#ef5350' }

const MAX_P = 40
const BOT = -2.3
const FULL_H = 4.6 // cylinder height at V = 5 L
const HALF_W = 1.25
const R = 0.11
const V_MAX = 5
const dummy = new THREE.Object3D()
const col = new THREE.Color()

interface Props {
  vL: number
  tK: number
  nMol: number
  pKPa: number
}

/** Particles bounce between the walls and the piston; speed ∝ √T (phase integrated each frame, no jumps). */
function Particles({ vL, tK, nMol }: { vL: number; tK: number; nMol: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const phase = useRef<Float32Array>(Float32Array.from({ length: MAX_P * 2 }, (_, i) => hash(i, 1) * 2))
  const count = Math.round(nMol * 200)
  const top = BOT + (FULL_H * vL) / V_MAX
  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const sp = 0.35 * Math.sqrt(tK / 300)
    const ph = phase.current
    const h = Math.min(dt, 0.1)
    m.count = count
    for (let i = 0; i < count; i++) {
      ph[i * 2] += h * sp * (0.7 + hash(i, 2) * 0.6)
      ph[i * 2 + 1] += h * sp * (0.7 + hash(i, 3) * 0.6)
      const u = tri(ph[i * 2])
      const w = tri(ph[i * 2 + 1])
      const x = -HALF_W + R + u * (2 * HALF_W - 2 * R)
      const y = BOT + R + w * (top - BOT - 2 * R)
      const hit = w > 0.93 || u < 0.04 || u > 0.96
      dummy.position.set(x, y, (hash(i, 4) - 0.5) * 0.5)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, col.set(hit ? GAS_COLORS.hit : GAS_COLORS.particle))
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_P]} frustumCulled={false}>
      <sphereGeometry args={[R, 12, 8]} />
      <meshStandardMaterial roughness={0.35} />
    </instancedMesh>
  )
}

const GAUGE_FULL = 1000 // kPa at full scale

export function GasLawScene({ vL, tK, nMol, pKPa }: Props) {
  const top = BOT + (FULL_H * vL) / V_MAX
  const cyl = useMemo<[number, number, number][]>(
    () => [
      [-HALF_W, 2.45, 0], [-HALF_W, BOT, 0], [HALF_W, BOT, 0], [HALF_W, 2.45, 0],
    ],
    [],
  )
  const ang = -Math.PI * 0.75 + Math.min(pKPa / GAUGE_FULL, 1) * Math.PI * 1.5
  const dial = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2
      pts.push([Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0])
    }
    return pts
  }, [])
  const therm = Math.min(Math.max((tK - 200) / 400, 0), 1)
  return (
    <group>
      <Slab w={11} h={6.4} y={0} />
      {/* cylinder, piston and rod */}
      <Line points={cyl} color="#eceff1" lineWidth={3} />
      <mesh position={[0, top + 0.08, 0]}>
        <boxGeometry args={[2 * HALF_W - 0.04, 0.16, 0.8]} />
        <meshStandardMaterial color={GAS_COLORS.piston} />
      </mesh>
      <mesh position={[0, (top + 2.9) / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.9 - top, 10]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      <mesh position={[0, 2.95, 0]}>
        <boxGeometry args={[1, 0.12, 0.4]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      <mesh position={[0, BOT - 0.08, 0]}>
        <boxGeometry args={[2 * HALF_W + 0.2, 0.16, 0.8]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      <Particles vL={vL} tK={tK} nMol={nMol} />
      <Label text={`${vL.toFixed(2)} L`} position={[0, BOT - 0.55, 0.3]} size={0.42} color="#eceff1" />
      {/* pressure gauge */}
      <group position={[3.5, 0.9, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.92, 0.92, 0.1, 40]} />
          <meshStandardMaterial color="#263238" />
        </mesh>
        <Line points={dial} color="#eceff1" lineWidth={2} />
        <Line points={[[0, 0, 0.05], [Math.sin(ang) * 0.8, Math.cos(ang) * 0.8, 0.05]]} color={GAS_COLORS.gauge} lineWidth={4} />
        <Label text="p" position={[0, 1.35, 0]} size={0.42} color="#eceff1" />
        <Label text={`${pKPa.toFixed(1)} kPa`} position={[0, -1.4, 0.2]} size={0.4} color="#eceff1" />
      </group>
      {/* thermometer */}
      <group position={[-3.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.32, 3.6, 0.2]} />
          <meshStandardMaterial color="#cfd8dc" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, -1.8 + (3.4 * therm) / 2 + 0.1, 0.05]}>
          <boxGeometry args={[0.16, Math.max(3.4 * therm, 0.05), 0.2]} />
          <meshStandardMaterial color="#ef5350" emissive="#ef5350" emissiveIntensity={0.3} />
        </mesh>
        <Label text="T" position={[0, 2.2, 0]} size={0.42} color="#eceff1" />
        <Label text={`${tK.toFixed(0)} K`} position={[0, -2.25, 0.2]} size={0.42} color="#eceff1" />
      </group>
    </group>
  )
}
