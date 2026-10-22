import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { COLORS, circlePoints } from './common'

interface NucleusProps {
  protons: number
  neutrons: number
  flat: boolean
  radius?: number
}

/** Cluster of protons (red) and neutrons (grey). Packed in a disc for 2D, in a ball for 3D. */
export function Nucleus({ protons, neutrons, flat, radius = 0.16 }: NucleusProps) {
  const geo = useMemo(() => new THREE.SphereGeometry(radius, 20, 20), [radius])
  const items = useMemo(() => {
    const n = protons + neutrons
    const out: { pos: [number, number, number]; proton: boolean }[] = []
    const golden = 2.39996323
    for (let i = 0; i < n; i++) {
      const proton = Math.floor(((i + 1) * protons) / n) > Math.floor((i * protons) / n)
      let pos: [number, number, number] = [0, 0, 0]
      if (n > 1) {
        const f = (i + 0.5) / n
        if (flat) {
          const rho = radius * Math.sqrt(n) * 1.05 * Math.sqrt(f)
          pos = [rho * Math.cos(i * golden), rho * Math.sin(i * golden), 0]
        } else {
          const rho = radius * Math.cbrt(n) * 1.2 * Math.cbrt(f)
          const z = 1 - 2 * f
          const s = Math.sqrt(1 - z * z)
          pos = [rho * s * Math.cos(i * golden), rho * s * Math.sin(i * golden), rho * z]
        }
      }
      out.push({ pos, proton })
    }
    return out
  }, [protons, neutrons, flat, radius])

  return (
    <group>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} geometry={geo}>
          <meshStandardMaterial
            color={it.proton ? COLORS.proton : COLORS.neutron}
            roughness={0.45}
            emissive={it.proton ? COLORS.proton : '#000000'}
            emissiveIntensity={it.proton ? 0.25 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

interface OrbiterProps {
  radius: number
  tilt?: [number, number]
  speed: number
  phase: number
  flat: boolean
  size?: number
  ring?: boolean
}

/** An electron circling on a (tilted, in 3D) circular orbit. */
export function Orbiter({ radius, tilt = [0, 0], speed, phase, flat, size = 0.17, ring = true }: OrbiterProps) {
  const ref = useRef<THREE.Mesh>(null)
  const angle = useRef(phase)
  const pts = useMemo(() => circlePoints(radius), [radius])
  useFrame((_, dt) => {
    angle.current += speed * Math.min(dt, 0.05)
    ref.current?.position.set(radius * Math.cos(angle.current), radius * Math.sin(angle.current), 0)
  })
  const rot: [number, number, number] = flat ? [0, 0, 0] : [tilt[0], tilt[1], 0]
  return (
    <group rotation={rot}>
      {ring && <Line points={pts} color={COLORS.ring} lineWidth={1} transparent opacity={0.45} />}
      <mesh ref={ref}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial color={COLORS.electron} emissive={COLORS.electron} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}
