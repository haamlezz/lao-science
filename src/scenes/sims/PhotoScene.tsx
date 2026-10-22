import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Arrow } from '../Arrow'
import { Label } from '../Label'
import type { Level } from '../../sims/photosynthesis'

export const PHOTO_COLORS = {
  light: '#ffb300',
  co2: '#90a4ae',
  water: '#29b6f6',
  o2: '#b3e5fc',
  leaf: '#43a047',
  white: '#e8efe8',
}

const MAX_BUBBLES = 18
const LEAF_X = 1.3
const dummy = new THREE.Object3D()

/** Up to 18 instanced O2 bubbles rising from the leaf; visible count and speed follow the rate (0..3). */
function Bubbles({ rate }: { rate: Level }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const n = rate * 6
    m.count = n
    const speed = 0.12 + rate * 0.12
    for (let i = 0; i < n; i++) {
      const p = (clock.elapsedTime * speed + i / n) % 1
      dummy.position.set(LEAF_X + 0.5 + Math.sin(i * 2.3 + p * 6) * 0.35, 0.9 + p * 2.7, (i % 3) * 0.3 - 0.3)
      dummy.scale.setScalar(0.14 + 0.05 * ((i * 7) % 3))
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_BUBBLES]} frustumCulled={false}>
      <sphereGeometry args={[1, 12, 8]} />
      <meshStandardMaterial color={PHOTO_COLORS.o2} transparent opacity={0.85} />
    </instancedMesh>
  )
}

interface Props {
  light: Level
  co2Level: Level // 1..3
  water: boolean
  green: boolean
  rate: Level
  glucose: boolean
}

/** Plant with sun, CO2 and water arrows, O2 bubbles and a glucose tag. Planar layout, works in 2D and 3D. */
export function PhotoScene({ light, co2Level, water, green, rate, glucose }: Props) {
  const leaf = green ? PHOTO_COLORS.leaf : PHOTO_COLORS.white
  return (
    <group>
      <mesh position={[0, -2.6, 0]}>
        <boxGeometry args={[8, 0.5, 2.4]} />
        <meshStandardMaterial color="#8d6e63" roughness={1} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 3.4, 12]} />
        <meshStandardMaterial color="#558b2f" />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * LEAF_X, 0.55, 0]} rotation={[0, 0, s * 0.3]} scale={[1.6, 0.3, 0.9]}>
          <sphereGeometry args={[1, 20, 12]} />
          <meshStandardMaterial color={leaf} roughness={0.6} />
        </mesh>
      ))}

      {/* sun: grey when dark, one ray per light level */}
      <mesh position={[-5, 3.2, 0]}>
        <sphereGeometry args={[0.7, 24, 16]} />
        <meshStandardMaterial
          color={light === 0 ? '#546e7a' : '#ffd54f'}
          emissive={light === 0 ? '#000000' : '#ffb300'}
          emissiveIntensity={0.15 + light * 0.25}
        />
      </mesh>
      <Label text="Sun" position={[-5, 4.2, 0]} size={0.5} color="#fff8e1" />
      {Array.from({ length: light }, (_, i) => (
        <Arrow key={i} origin={[-4.1, 2.6 - i * 0.7, 0]} dir={[1, -0.35, 0]} len={2.4} color={PHOTO_COLORS.light} />
      ))}

      {/* CO2 enters through the stomata from the right */}
      <Label formula text="CO2" position={[4.6, 2.6, 0]} size={0.5} color="#eceff1" />
      <Arrow origin={[4.1, 2.1, 0]} dir={[-1, -0.55, 0]} len={0.7 + co2Level * 0.5} color={PHOTO_COLORS.co2} />

      {/* water rises from the roots */}
      <Label formula text="H2O" position={[-1.2, -1.9, 0]} size={0.5} color={water ? '#81d4fa' : '#78909c'} />
      {water && <Arrow origin={[-0.45, -2.2, 0]} dir={[0, 1, 0]} len={2.4} color={PHOTO_COLORS.water} />}

      <Bubbles rate={rate} />
      {rate > 0 && <Label formula text="O2" position={[LEAF_X + 1.6, 2.4, 0]} size={0.5} color="#e1f5fe" />}
      {glucose && <Label formula text="C6H12O6" position={[0, 1.7, 0]} size={0.5} color="#fff" bg="#ef6c00" />}
    </group>
  )
}
