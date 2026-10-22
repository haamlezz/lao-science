import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { Label } from '../Label'
import { ELEMENT_COLORS, Slab } from './chemShared'
import { parseFormula } from '../../sims/mole'

export const MOLE_COLORS = { particle: '#4fc3f7', bar: '#ffd54f', gas: '#80cbc4' }

const ATOM_R: Record<string, number> = { H: 0.09, C: 0.14, N: 0.14, O: 0.15, Na: 0.2, Mg: 0.19, Cl: 0.19, Ca: 0.22, Fe: 0.2, S: 0.18 }
const MAX_P = 40
const MAX_ATOMS = 3
const BAR_H = 4.4
const BAR_Y = -2.2
const N_MAX = 5 // mol at full bar
const dummy = new THREE.Object3D()

interface Props {
  formula: string // unicode formula for the label
  ascii: string
  massG: number
  moles: number
  gasVolumeL: number | null
}

function Pile({ ascii, moles }: { ascii: string; moles: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const els = useMemo(
    () =>
      Object.entries(parseFormula(ascii))
        .sort((a, b) => b[1] - a[1])
        .slice(0, MAX_ATOMS)
        .map(([el]) => el),
    [ascii],
  )
  // schematic cue: more matter -> more particles, never the real count
  const k = moles <= 0 ? 0 : Math.min(MAX_P, Math.max(1, Math.ceil(moles * 8)))
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const col = new THREE.Color()
    let idx = 0
    for (let i = 0; i < k; i++) {
      const layer = Math.floor(i / 9)
      const j = i % 9
      const ang = j * 2.39996
      const rad = 0.14 + 0.78 * Math.sqrt((j + 0.5) / 9) * (1 - layer * 0.12)
      const cx = -3.4 + Math.cos(ang) * rad
      const cz = Math.sin(ang) * rad
      const cy = -1.0 + layer * 0.34
      els.forEach((el, e) => {
        const a = (e / els.length) * Math.PI * 2 + i
        const off = els.length > 1 ? 0.13 : 0
        dummy.position.set(cx + Math.cos(a) * off, cy + Math.sin(a) * off * 0.6, cz)
        const r = ATOM_R[el] ?? 0.15
        dummy.scale.setScalar(r / 0.15)
        dummy.updateMatrix()
        m.setMatrixAt(idx, dummy.matrix)
        m.setColorAt(idx, col.set(ELEMENT_COLORS[el] ?? '#4fc3f7'))
        idx++
      })
    }
    m.count = idx
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [k, els])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_P * MAX_ATOMS]} frustumCulled={false}>
      <sphereGeometry args={[0.15, 12, 8]} />
      <meshStandardMaterial roughness={0.4} />
    </instancedMesh>
  )
}

const box = (x: number, w: number, y0: number, y1: number): [number, number, number][] => [
  [x - w / 2, y0, 0], [x + w / 2, y0, 0], [x + w / 2, y1, 0], [x - w / 2, y1, 0], [x - w / 2, y0, 0],
]

/** Balance with a pile of particles (schematic count), a mole bar and a gas cylinder at STP. */
export function MoleScene({ formula, ascii, massG, moles, gasVolumeL }: Props) {
  const fillN = Math.min(moles / N_MAX, 1)
  const gasFill = gasVolumeL === null ? 0 : Math.min(gasVolumeL / (N_MAX * 22.4), 1)
  const massTxt = massG >= 100 ? massG.toFixed(0) : massG >= 10 ? massG.toFixed(1) : massG.toFixed(2)
  return (
    <group>
      <Slab w={11.6} h={6.6} y={0} z={-1.2} />
      {/* balance */}
      <mesh position={[-3.4, -2.45, 0]}>
        <boxGeometry args={[2.8, 0.3, 1.4]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      <mesh position={[-3.4, -1.6, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 12]} />
        <meshStandardMaterial color="#78909c" />
      </mesh>
      <mesh position={[-3.4, -1.2, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 40]} />
        <meshStandardMaterial color="#b0bec5" metalness={0.3} roughness={0.5} />
      </mesh>
      <Pile ascii={ascii} moles={moles} />
      <Label text={`${massTxt} g`} position={[-3.4, -2.45, 0.8]} size={0.5} color="#102a43" bg="#e8f1f8" />
      <Label formula text={formula} position={[-3.4, 1.9, 0]} size={0.6} color="#eceff1" />
      {/* mole bar */}
      <Line points={box(0, 0.8, BAR_Y, BAR_Y + BAR_H)} color="#eceff1" lineWidth={2} />
      {fillN > 0 && (
        <mesh position={[0, BAR_Y + (BAR_H * fillN) / 2, 0]}>
          <boxGeometry args={[0.7, BAR_H * fillN, 0.5]} />
          <meshStandardMaterial color={MOLE_COLORS.bar} emissive={MOLE_COLORS.bar} emissiveIntensity={0.25} />
        </mesh>
      )}
      <Label text="n" position={[0, 2.5, 0]} size={0.5} color="#eceff1" />
      <Label text={`${moles.toFixed(moles >= 10 ? 1 : 2)} mol`} position={[0, -2.75, 0.4]} size={0.45} color="#102a43" bg={MOLE_COLORS.bar} />
      {/* gas cylinder at STP */}
      <Line points={box(3.4, 1.8, BAR_Y, BAR_Y + BAR_H)} color="#eceff1" lineWidth={2} />
      {gasFill > 0 && (
        <mesh position={[3.4, BAR_Y + (BAR_H * gasFill) / 2, 0]}>
          <boxGeometry args={[1.7, BAR_H * gasFill, 0.9]} />
          <meshStandardMaterial color={MOLE_COLORS.gas} transparent opacity={0.65} />
        </mesh>
      )}
      <Label text="V" position={[3.4, 2.5, 0]} size={0.5} color="#eceff1" />
      <Label
        text={gasVolumeL === null ? '-' : `${gasVolumeL >= 100 ? gasVolumeL.toFixed(0) : gasVolumeL.toFixed(1)} L`}
        position={[3.4, -2.75, 0.5]}
        size={0.45}
        color="#102a43"
        bg={MOLE_COLORS.gas}
      />
    </group>
  )
}
