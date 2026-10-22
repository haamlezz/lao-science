import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { COLORS, circlePoints } from './common'

interface Props {
  protons: number
  neutrons: number
  shells: number[]
}

// Tilt of each shell's orbital plane so the shells are visibly separate in 3D.
const TILTS: [number, number][] = [
  [0, 0],
  [1.0, 0.2],
  [-0.8, 0.9],
  [0.5, -1.2],
  [1.3, 0.6],
  [-1.1, -0.5],
  [0.3, 1.4],
]

/** Outer shell radius; the page uses it to place the camera. */
export function atomExtent(shellCount: number): number {
  return shellRadius(shellCount - 1)
}
const shellRadius = (i: number) => 1.5 + i * 0.85

/** Model atom (Bohr-style, historical model): nucleus of p + n, electrons circling on tilted shells. */
export function ElementAtomScene({ protons, neutrons, shells }: Props) {
  const n = protons + neutrons
  const nuc = useRef<THREE.InstancedMesh>(null)
  const elec = useRef<THREE.InstancedMesh>(null)
  const total = shells.reduce((a, b) => a + b, 0)

  // Nucleus particles: Fibonacci ball sized so the whole nucleus stays inside the first shell.
  const pr = 0.55 / (1.2 * Math.cbrt(n))
  useLayoutEffect(() => {
    const m = nuc.current
    if (!m) return
    const golden = 2.39996323
    const d = new THREE.Object3D()
    const red = new THREE.Color(COLORS.proton)
    const grey = new THREE.Color(COLORS.neutron)
    for (let i = 0; i < n; i++) {
      const f = (i + 0.5) / n
      const rho = pr * 1.2 * Math.cbrt(n) * Math.cbrt(f)
      const z = 1 - 2 * f
      const s = Math.sqrt(1 - z * z)
      d.position.set(n > 1 ? rho * s * Math.cos(i * golden) : 0, n > 1 ? rho * s * Math.sin(i * golden) : 0, n > 1 ? rho * z : 0)
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
      // spread protons evenly through the ball
      const isProton = Math.floor(((i + 1) * protons) / n) > Math.floor((i * protons) / n)
      m.setColorAt(i, isProton ? red : grey)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [n, protons, pr])

  const quats = useMemo(
    () => shells.map((_, i) => new THREE.Quaternion().setFromEuler(new THREE.Euler(...TILTS[i % TILTS.length], 0))),
    [shells],
  )
  const rings = useMemo(() => shells.map((_, i) => circlePoints(shellRadius(i), 72)), [shells])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const angle = useRef(0)

  useFrame((_, dt) => {
    const m = elec.current
    if (!m) return
    angle.current += Math.min(dt, 0.05)
    let k = 0
    shells.forEach((count, si) => {
      const r = shellRadius(si)
      const speed = 1.6 / Math.pow(si + 1, 0.8)
      for (let j = 0; j < count; j++) {
        const a = (j / count) * Math.PI * 2 + angle.current * speed
        dummy.position.set(r * Math.cos(a), r * Math.sin(a), 0).applyQuaternion(quats[si])
        dummy.updateMatrix()
        m.setMatrixAt(k++, dummy.matrix)
      }
    })
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh key={`n${n}`} ref={nuc} args={[undefined, undefined, n]}>
        <sphereGeometry args={[pr, 10, 8]} />
        <meshStandardMaterial roughness={0.45} />
      </instancedMesh>
      {rings.map((pts, i) => (
        <group key={i} quaternion={quats[i]}>
          <Line points={pts} color={COLORS.ring} lineWidth={1} transparent opacity={0.5} />
        </group>
      ))}
      <instancedMesh key={`e${total}`} ref={elec} args={[undefined, undefined, total]}>
        <sphereGeometry args={[0.14, 12, 10]} />
        <meshStandardMaterial color={COLORS.electron} emissive={COLORS.electron} emissiveIntensity={0.5} roughness={0.3} />
      </instancedMesh>
    </group>
  )
}
