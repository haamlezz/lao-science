import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { COLORS, circlePoints } from './common'
import { Nucleus, Orbiter } from './Parts'

const MAX_ALPHA = 36
const TRAIL = 18
const K = 9 // strength of the repulsion; chosen so the deflection pattern is easy to see (not to scale)
const SPEED = 6
const B_MAX = 3.6

interface Alpha {
  pos: THREE.Vector3
  vel: THREE.Vector3
  active: boolean
  age: number
  trail: Float32Array
  n: number
}

export function RutherfordScene({ flat, fire }: { flat: boolean; fire: boolean }) {
  const alphas = useMemo<Alpha[]>(
    () =>
      Array.from({ length: MAX_ALPHA }, () => ({
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        active: false,
        age: 0,
        trail: new Float32Array(TRAIL * 3),
        n: 0,
      })),
    [],
  )
  const lines = useMemo(
    () =>
      alphas.map((a) => {
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(a.trail, 3))
        g.setDrawRange(0, 0)
        const m = new THREE.LineBasicMaterial({ color: COLORS.alpha, transparent: true, opacity: 0.55 })
        const l = new THREE.Line(g, m)
        l.frustumCulled = false
        return l
      }),
    [alphas],
  )
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const spawn = useRef(0)
  const boundary = useMemo(() => circlePoints(4.4), [])

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.033)
    if (fire) {
      spawn.current += dt
      while (spawn.current > 0.14) {
        spawn.current -= 0.14
        const a = alphas.find((x) => !x.active)
        if (a) {
          let y: number
          let z = 0
          if (flat) {
            y = (Math.random() * 2 - 1) * B_MAX
          } else {
            const b = B_MAX * Math.sqrt(Math.random())
            const th = Math.random() * Math.PI * 2
            y = b * Math.cos(th)
            z = b * Math.sin(th)
          }
          a.pos.set(-8, y, z)
          a.vel.set(SPEED, 0, 0)
          a.active = true
          a.age = 0
          a.n = 0
        }
      }
    }
    alphas.forEach((a, i) => {
      const mesh = meshes.current[i]
      const line = lines[i]
      if (!a.active) {
        if (mesh) mesh.visible = false
        line.visible = false
        return
      }
      const h = dt / 3
      for (let s = 0; s < 3; s++) {
        const r2 = a.pos.lengthSq() + 0.01
        const r = Math.sqrt(r2)
        a.vel.addScaledVector(a.pos, (K / r2 / r) * h)
        a.pos.addScaledVector(a.vel, h)
      }
      a.age += dt
      if (a.pos.x > 9 || a.pos.lengthSq() > 160 || a.age > 6) a.active = false
      if (mesh) {
        mesh.visible = true
        mesh.position.copy(a.pos)
      }
      a.trail.copyWithin(3, 0, (TRAIL - 1) * 3)
      a.trail[0] = a.pos.x
      a.trail[1] = a.pos.y
      a.trail[2] = a.pos.z
      a.n = Math.min(a.n + 1, TRAIL)
      line.visible = true
      line.geometry.setDrawRange(0, a.n)
      line.geometry.attributes.position.needsUpdate = true
    })
  })

  return (
    <group>
      {/* faint boundary: the atom is mostly empty space (not to scale) */}
      {flat ? (
        <Line points={boundary} color="#9bb7cc" lineWidth={1} dashed dashSize={0.2} gapSize={0.2} transparent opacity={0.4} />
      ) : (
        <mesh>
          <sphereGeometry args={[4.4, 20, 14]} />
          <meshBasicMaterial color="#9bb7cc" wireframe transparent opacity={0.09} />
        </mesh>
      )}
      <Nucleus protons={6} neutrons={6} flat={flat} radius={0.09} />
      <Orbiter radius={2.4} tilt={[1.0, 0.2]} speed={1.2} phase={0} flat={flat} />
      <Orbiter radius={2.4} tilt={[1.0, 0.2]} speed={1.2} phase={Math.PI} flat={flat} ring={false} />
      <Orbiter radius={3.4} tilt={[-0.7, 0.9]} speed={0.8} phase={1.5} flat={flat} />
      <Orbiter radius={3.4} tilt={[-0.7, 0.9]} speed={0.8} phase={4.6} flat={flat} ring={false} />
      {lines.map((l, i) => (
        <primitive key={`l${i}`} object={l} />
      ))}
      {alphas.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            meshes.current[i] = m
          }}
          visible={false}
        >
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={COLORS.alpha} emissive={COLORS.alpha} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  )
}
