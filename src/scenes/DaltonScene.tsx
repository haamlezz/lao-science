import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ease, lerp } from './common'
import { Label } from './Label'

type V3 = [number, number, number]
interface AtomDef {
  el: 'H' | 'O'
  from: V3
  to: V3
}

const R = { H: 0.38, O: 0.55 }
const COLOR = { H: '#f5f5f5', O: '#e04b47' }

// 2 H2 + O2 -> 2 H2O. The same six atoms move; none appear or disappear.
const atoms: AtomDef[] = [
  { el: 'H', from: [-4.0, 1.2, 0.3], to: [-2.0, 0.65, 0.2] },
  { el: 'H', from: [-3.2, 1.2, -0.3], to: [-0.4, 0.65, -0.2] },
  { el: 'H', from: [-4.0, -1.2, -0.3], to: [0.4, -1.35, 0.2] },
  { el: 'H', from: [-3.2, -1.2, 0.3], to: [2.0, -1.35, -0.2] },
  { el: 'O', from: [3.6, 0.55, 0], to: [-1.2, 1.3, 0] },
  { el: 'O', from: [3.6, -0.55, 0], to: [1.2, -0.7, 0] },
]

export function DaltonScene({ flat, react }: { flat: boolean; react: boolean }) {
  const prog = useRef(0)
  const refs = useRef<(THREE.Group | null)[]>([])

  useFrame((_, dt) => {
    const target = react ? 1 : 0
    prog.current += (target - prog.current) * Math.min(1, dt * 1.8)
    if (Math.abs(target - prog.current) < 0.002) prog.current = target
    const e = ease(prog.current)
    atoms.forEach((a, i) => {
      refs.current[i]?.position.set(
        lerp(a.from[0], a.to[0], e),
        lerp(a.from[1], a.to[1], e),
        flat ? 0 : lerp(a.from[2], a.to[2], e),
      )
    })
  })

  return (
    <group>
      {atoms.map((a, i) => (
        <group
          key={i}
          ref={(g) => {
            refs.current[i] = g
          }}
          position={a.from}
        >
          <mesh>
            <sphereGeometry args={[R[a.el], 40, 40]} />
            <meshStandardMaterial color={COLOR[a.el]} roughness={0.3} metalness={0.05} />
          </mesh>
          <Label text={a.el} color={a.el === 'H' ? '#12202e' : '#ffffff'} size={0.42} position={[0, 0, R[a.el] + 0.05]} />
        </group>
      ))}
    </group>
  )
}
