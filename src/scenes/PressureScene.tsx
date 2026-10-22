import { useMemo } from 'react'
import * as THREE from 'three'
import { Arrow } from './Arrow'

export const PRESSURE_COLOR = '#ffd54f'
export const DEPTH_UNIT = 0.5 // scene units per metre of depth
export const MAX_DEPTH = 10
const TANK_H = 5

interface LiquidProps {
  depth: number // m
  pressure: number // Pa (gauge)
}

const DIRS: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

/** Probe at a chosen depth in a tank; arrows show the pressure pushing in from every direction. */
export function LiquidScene({ depth, pressure }: LiquidProps) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(6, TANK_H, 4)), [])
  const y = TANK_H / 2 - depth * DEPTH_UNIT
  const len = Math.min(2.4, (pressure / 101000) * 1.9)
  const off = len + 0.3
  return (
    <group>
      <mesh>
        <boxGeometry args={[6, TANK_H, 4]} />
        <meshStandardMaterial color="#29b6f6" transparent opacity={0.28} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#cfe9f7" />
      </lineSegments>
      <mesh position={[0, y, 0]}>
        <sphereGeometry args={[0.28, 20, 16]} />
        <meshStandardMaterial color="#ef5350" emissive="#ef5350" emissiveIntensity={0.3} />
      </mesh>
      {DIRS.map((d, i) => (
        <Arrow
          key={i}
          origin={[-d[0] * off, y - d[1] * off, -d[2] * off]}
          dir={d}
          len={len}
          color={PRESSURE_COLOR}
        />
      ))}
    </group>
  )
}

interface SolidProps {
  force: number // N
  areaCm2: number // 300 (lying) or 100 (standing)
  pressure: number // Pa
}

/** A block pressing on sand: the same weight sinks deeper when it stands on the smaller face. */
export function SolidScene({ force, areaCm2, pressure }: SolidProps) {
  const standing = areaCm2 < 200
  const size: [number, number, number] = standing ? [1, 3, 2] : [3, 1, 2]
  const sink = Math.min(1.1, (pressure / 10000) * 1.1)
  const blockY = size[1] / 2 - sink
  const arrowLen = Math.min(1.8, force * 0.02)
  return (
    <group>
      <mesh position={[0, -1.25, 0]}>
        <boxGeometry args={[9, 2.5, 4.5]} />
        <meshStandardMaterial color="#e0c080" roughness={1} />
      </mesh>
      <mesh position={[0, blockY, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#78909c" roughness={0.5} />
      </mesh>
      <Arrow origin={[0, blockY + size[1] / 2 + 0.2 + arrowLen, 0]} dir={[0, -1, 0]} len={arrowLen} color="#ef5350" />
    </group>
  )
}
