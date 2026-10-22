import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { indicatorColour } from '../../sims/acidbase'
import { Slab, hash, tri } from './chemShared'

export const AB_COLORS = { h3o: '#ffffff', oh: '#18ffff' }

const MAX_P = 40
const BX0 = -3.9
const BX1 = 0.1
const BY0 = -2.4
const BY1 = 1.5
const R = 0.15
const dummy = new THREE.Object3D()
const col = new THREE.Color()

function Ions({ nH, nOH, top }: { nH: number; nOH: number; top: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const ph = useRef(Float32Array.from({ length: MAX_P * 2 }, (_, i) => hash(i, 5) * 2))
  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const h = Math.min(dt, 0.1)
    const total = nH + nOH
    m.count = total
    for (let i = 0; i < total; i++) {
      ph.current[i * 2] += h * 0.3 * (0.7 + hash(i, 2) * 0.6)
      ph.current[i * 2 + 1] += h * 0.3 * (0.7 + hash(i, 3) * 0.6)
      const x = BX0 + 0.1 + R + tri(ph.current[i * 2]) * (BX1 - BX0 - 0.2 - 2 * R)
      const y = BY0 + 0.1 + R + tri(ph.current[i * 2 + 1]) * Math.max(top - BY0 - 0.2 - 2 * R, 0.1)
      dummy.position.set(x, y, (hash(i, 4) - 0.5) * 0.5)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, col.set(i < nH ? AB_COLORS.h3o : AB_COLORS.oh))
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

const BAR_X = 3.2
const BAR_Y0 = -2.4
const BAR_H = 4.8

interface Props {
  pH: number
  liquid: string // hex colour
  nH: number
  nOH: number
  /** Burette fill 0..1, or null when there is no burette (pH mode). */
  burette: number | null
}

export function AcidBaseScene({ pH, liquid, nH, nOH, burette }: Props) {
  const beaker = useMemo<[number, number, number][]>(
    () => [[BX0, BY1 + 0.2, 0], [BX0, BY0, 0], [BX1, BY0, 0], [BX1, BY1 + 0.2, 0]],
    [],
  )
  const seg = 14
  const markerY = BAR_Y0 + (BAR_H * Math.min(Math.max(pH, 0), 14)) / 14
  const liquidTop = BY1 - 0.15
  return (
    <group>
      <Slab w={11.2} h={6.8} y={0} />
      <mesh position={[(BX0 + BX1) / 2, (BY0 + liquidTop) / 2, 0]}>
        <boxGeometry args={[BX1 - BX0 - 0.1, liquidTop - BY0 - 0.05, 0.9]} />
        <meshStandardMaterial color={liquid} transparent opacity={0.55} roughness={0.2} />
      </mesh>
      <Line points={beaker} color="#eceff1" lineWidth={3} />
      <Ions nH={nH} nOH={nOH} top={liquidTop} />
      {burette !== null && (
        <group position={[(BX0 + BX1) / 2, 0, 0]}>
          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[0.4, 1.4, 0.3]} />
            <meshStandardMaterial color="#cfd8dc" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0, 1.8 + (1.3 * burette) / 2, 0.02]}>
            <boxGeometry args={[0.26, Math.max(1.3 * burette, 0.02), 0.2]} />
            <meshStandardMaterial color="#42a5f5" />
          </mesh>
          <Label text="NaOH" position={[1.2, 2.5, 0]} size={0.4} color="#eceff1" />
        </group>
      )}
      {/* pH scale: 14 coloured bands (universal indicator colours) */}
      {Array.from({ length: seg }, (_, i) => (
        <mesh key={i} position={[BAR_X, BAR_Y0 + ((i + 0.5) * BAR_H) / seg, 0]}>
          <boxGeometry args={[0.6, BAR_H / seg + 0.01, 0.3]} />
          <meshStandardMaterial color={indicatorColour('universal', i + 0.5)} />
        </mesh>
      ))}
      <mesh position={[BAR_X - 0.62, markerY, 0.2]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.22, 0.4, 3]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {[0, 7, 14].map((v) => (
        <Label key={v} text={String(v)} position={[BAR_X + 0.75, BAR_Y0 + (BAR_H * v) / 14, 0]} size={0.38} color="#eceff1" />
      ))}
      <Label text={`pH ${pH.toFixed(2)}`} position={[BAR_X - 1.55, markerY + 0.05, 0.3]} size={0.42} color="#102a43" bg="#e8f1f8" />
    </group>
  )
}
