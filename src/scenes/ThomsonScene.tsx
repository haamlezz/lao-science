import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from './common'
import { Label } from './Label'

const R = 2.7
const N = 14
const golden = 2.39996323

function points(flat: boolean, count: number, shift: number, rMin: number, rMax: number): [number, number, number][] {
  const out: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const f = (i + 0.5) / count
    const k = (i * 0.61803 + shift) % 1
    const r = R * (rMin + (rMax - rMin) * k)
    if (flat) {
      out.push([r * Math.cos(i * golden + shift * 5), r * Math.sin(i * golden + shift * 5), 0])
    } else {
      const z = 1 - 2 * f
      const s = Math.sqrt(1 - z * z)
      out.push([r * s * Math.cos(i * golden + shift * 5), r * s * Math.sin(i * golden + shift * 5), r * z])
    }
  }
  return out
}

export function ThomsonScene({ flat }: { flat: boolean }) {
  const electrons = useMemo(() => points(flat, N, 0.1, 0.3, 0.8), [flat])
  const plus = useMemo(() => points(flat, 12, 0.55, 0.15, 0.9), [flat])
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    electrons.forEach((p, i) => {
      refs.current[i]?.position.set(
        p[0] + Math.sin(t * 1.7 + i * 1.3) * 0.09,
        p[1] + Math.cos(t * 1.3 + i * 2.1) * 0.09,
        flat ? 0 : p[2] + Math.sin(t * 1.1 + i) * 0.09,
      )
    })
  })

  return (
    <group>
      <mesh renderOrder={1}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshPhysicalMaterial
          color={COLORS.positive}
          transparent
          opacity={0.3}
          roughness={0.25}
          depthWrite={false}
        />
      </mesh>
      {plus.map((p, i) => (
        <Label key={`p${i}`} text="+" position={p} color="#ffd8d0" size={0.5} opacity={0.8} />
      ))}
      {electrons.map((p, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m
          }}
          position={p}
          renderOrder={2}
        >
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial transparent color={COLORS.electron} emissive={COLORS.electron} emissiveIntensity={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
