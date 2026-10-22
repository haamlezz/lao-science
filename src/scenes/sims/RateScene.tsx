import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { Slab, hash, tri } from './chemShared'

export const RATE_COLORS = { a: '#4fc3f7', b: '#ffb74d', flash: '#ffffff', catalyst: '#fff176' }

const MAX_P = 60
const X0 = -5.2
const X1 = -0.4
const Y0 = -2.3
const Y1 = 2.3
const R = 0.13
const dummy = new THREE.Object3D()
const col = new THREE.Color()

/** A particles = still reactant, the rest are product B. A particle that has just reacted flashes (an effective collision). */
function Particles({ conc, remaining, tempK }: { conc: number; remaining: number; tempK: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const ph = useRef(Float32Array.from({ length: MAX_P * 2 }, (_, i) => hash(i, 7) * 2))
  const flash = useRef(new Float32Array(MAX_P))
  const prev = useRef(Math.round(remaining))
  const nA = Math.round(remaining)
  if (nA < prev.current) {
    for (let i = nA; i < prev.current; i++) flash.current[i] = 0.4
  }
  prev.current = nA
  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const h = Math.min(dt, 0.1)
    const sp = 0.45 * Math.sqrt(tempK / 300)
    m.count = conc
    for (let i = 0; i < conc; i++) {
      ph.current[i * 2] += h * sp * (0.7 + hash(i, 2) * 0.6)
      ph.current[i * 2 + 1] += h * sp * (0.7 + hash(i, 3) * 0.6)
      const x = X0 + R + tri(ph.current[i * 2]) * (X1 - X0 - 2 * R)
      const y = Y0 + R + tri(ph.current[i * 2 + 1]) * (Y1 - Y0 - 2 * R)
      flash.current[i] = Math.max(0, flash.current[i] - h)
      const f = flash.current[i] > 0
      const isA = i < nA
      dummy.position.set(x, y, (hash(i, 4) - 0.5) * 0.6)
      dummy.scale.setScalar(f ? 2.1 : isA ? 1 : 0.8)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, col.set(f ? RATE_COLORS.flash : isA ? RATE_COLORS.a : RATE_COLORS.b))
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

// Energy profile: reactants -> hill (Ea) -> products. Heights are schematic; Ea values are labelled.
const PX0 = 1.2
const PX1 = 5.3
const LEVEL_R = 0.5
const LEVEL_P = -1.1
const SCALE = 0.036 // units per kJ/mol

function profile(eaKJ: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= 48; i++) {
    const x = PX0 + ((PX1 - PX0) * i) / 48
    const u = (x - 2.4) / (4.0 - 2.4)
    const s = Math.min(Math.max(u, 0), 1)
    const base = LEVEL_R + (LEVEL_P - LEVEL_R) * (s * s * (3 - 2 * s))
    const hill = eaKJ * SCALE * Math.exp(-Math.pow((x - 3.05) / 0.5, 2))
    pts.push([x, base + hill, 0])
  }
  return pts
}

interface Props {
  conc: number
  remaining: number
  tempK: number
  catalyst: boolean
  powder: boolean
  eaKJ: number
}

export function RateScene({ conc, remaining, tempK, catalyst, powder, eaKJ }: Props) {
  const box = useMemo<[number, number, number][]>(
    () => [[X0, Y0, 0], [X1, Y0, 0], [X1, Y1, 0], [X0, Y1, 0], [X0, Y0, 0]],
    [],
  )
  const warm = (tempK - 280) / 80
  const boxColor = `hsl(${Math.round(200 - warm * 190)}, 80%, 65%)`
  const normal = useMemo(() => profile(50), [])
  const cat = useMemo(() => profile(40), [])
  const peak = LEVEL_R + eaKJ * SCALE
  return (
    <group>
      <Slab w={11.4} h={6.4} y={0} />
      <Line points={box} color={boxColor} lineWidth={3} />
      <Particles conc={conc} remaining={remaining} tempK={tempK} />
      {/* solid reagent: one lump or many small grains (schematic) */}
      {powder ? (
        Array.from({ length: 14 }, (_, i) => (
          <mesh key={i} position={[X0 + 0.4 + (i % 7) * 0.3, Y0 + 0.08 + Math.floor(i / 7) * 0.14, 0.2]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color="#b0bec5" />
          </mesh>
        ))
      ) : (
        <mesh position={[X0 + 0.9, Y0 + 0.25, 0.2]}>
          <boxGeometry args={[1.5, 0.5, 0.6]} />
          <meshStandardMaterial color="#b0bec5" />
        </mesh>
      )}
      {catalyst &&
        [0, 1, 2].map((i) => (
          <mesh key={i} position={[X1 - 0.5 - i * 0.35, Y0 + 0.12, 0.2]}>
            <sphereGeometry args={[0.14, 12, 8]} />
            <meshStandardMaterial color={RATE_COLORS.catalyst} emissive={RATE_COLORS.catalyst} emissiveIntensity={0.4} />
          </mesh>
        ))}
      {/* energy profile */}
      <Line points={[[PX0 - 0.1, 2.3, 0], [PX0 - 0.1, -2.5, 0], [PX1 + 0.2, -2.5, 0]]} color="#cfd8dc" lineWidth={2} />
      <Line points={normal} color={catalyst ? '#90a4ae' : '#ef5350'} lineWidth={catalyst ? 2 : 4} dashed={catalyst} dashSize={0.15} gapSize={0.1} />
      {catalyst && <Line points={cat} color="#ffb74d" lineWidth={4} />}
      <Line points={[[PX0 + 0.2, LEVEL_R, 0], [3.7, peak, 0]]} color="#78909c" lineWidth={1} dashed dashSize={0.1} gapSize={0.1} />
      <Label text="E" position={[PX0 - 0.35, 2.1, 0]} size={0.4} color="#eceff1" />
      <Label text="A" position={[1.6, LEVEL_R + 0.45, 0]} size={0.4} color={RATE_COLORS.a} />
      <Label text="B" position={[4.9, LEVEL_P + 0.45, 0]} size={0.4} color={RATE_COLORS.b} />
      <Label text={`Ea ${eaKJ} kJ/mol`} position={[3.9, peak + 0.4, 0]} size={0.38} color="#eceff1" />
    </group>
  )
}
