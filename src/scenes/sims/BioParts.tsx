import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { Label } from '../Label'

export type V3 = [number, number, number]

/** Low-discrepancy (R2) sequence in [0,1)^2: deterministic, evenly spread, no PRNG state. */
export function r2(i: number): [number, number] {
  const f = (v: number) => v - Math.floor(v)
  return [f(0.5 + i * 0.7548776662466927), f(0.5 + i * 0.5698402909980532)]
}

interface DotsProps {
  points: V3[]
  size: number
  color: string
  opacity?: number
  /** Instance capacity; `points` beyond it are ignored. */
  cap?: number
}

/** Many small spheres as one InstancedMesh (cheap). */
export function Dots({ points, size, color, opacity = 1, cap = 160 }: DotsProps) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const d = new THREE.Object3D()
    const n = Math.min(points.length, cap)
    for (let i = 0; i < n; i++) {
      d.position.set(points[i][0], points[i][1], points[i][2])
      d.scale.setScalar(size)
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
    }
    m.count = n
    m.instanceMatrix.needsUpdate = true
  }, [points, size, cap])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, cap]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshStandardMaterial color={color} transparent={opacity < 1} opacity={opacity} />
    </instancedMesh>
  )
}

/** Approximate width of a Label sprite (world units) for leader-line end points. */
export const labelWidth = (text: string, size: number): number => size * (text.length * 0.336 + 0.125)

interface LeaderProps {
  text: string
  /** Label centre. */
  at: [number, number]
  /** The point the line starts from (on the drawing). */
  anchor: V3
  /** Which side the label sits on: 1 = right of the drawing, -1 = left. */
  side: 1 | -1
  color?: string
  bg?: string
  size?: number
}

/** A canvas label with a thin leader line to the thing it names. */
export function Leader({ text, at, anchor, side, color = '#ffffff', bg, size = 0.54 }: LeaderProps) {
  const w = labelWidth(text, size)
  const end: V3 = [at[0] - side * (w / 2 + 0.05), at[1], 0.3]
  return (
    <group>
      <Line points={[anchor, end]} color="#b0bec5" lineWidth={1} />
      <Label text={text} position={[at[0], at[1], 0.4]} size={size} color={color} bg={bg} />
    </group>
  )
}
