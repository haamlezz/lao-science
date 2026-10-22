import { Line } from '@react-three/drei'
import { Label } from '../Label'

export const PENDULUM_COLORS = { bob: '#ff7043', string: '#eceff1', ref: '#80cbc4', release: '#ffd54f', height: '#4fc3f7' }

const UNITS_PER_M = 2 // drawn scale: L = 2 m -> 4 units
const PIVOT_Y = 2.4

interface Props {
  mass: number
  theta: number // rad, signed
  angle0: number // rad, release angle
  length: number // m
}

/** Planar pendulum. Max swing 80 deg stays inside |x| <= 4 and y >= PIVOT_Y - L. */
export function PendulumScene({ mass, theta, angle0, length }: Props) {
  const L = length * UNITS_PER_M
  const refY = PIVOT_Y - L
  const bobY = PIVOT_Y - L * Math.cos(theta)
  const bobX = L * Math.sin(theta)
  const r = 0.2 + 0.07 * mass // 0.5 kg -> 0.235, 5 kg -> 0.55
  const hUnits = Math.max(bobY - refY, 0.001)
  const relX = L * Math.sin(angle0)
  const relY = PIVOT_Y - L * Math.cos(angle0)
  return (
    <group>
      {/* support beam */}
      <mesh position={[0, PIVOT_Y + 0.2, 0]}>
        <boxGeometry args={[3.2, 0.3, 0.9]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* string + bob rotate together about the pivot */}
      <group position={[0, PIVOT_Y, 0]} rotation={[0, 0, theta]}>
        <mesh position={[0, -L / 2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, L, 6]} />
          <meshStandardMaterial color={PENDULUM_COLORS.string} />
        </mesh>
        <mesh position={[0, -L, 0]}>
          <sphereGeometry args={[r, 24, 16]} />
          <meshStandardMaterial color={PENDULUM_COLORS.bob} roughness={0.4} />
        </mesh>
      </group>

      {/* lowest level h = 0 */}
      <Line points={[[-5.2, refY, 0], [5.2, refY, 0]]} color={PENDULUM_COLORS.ref} lineWidth={2} dashed dashSize={0.25} gapSize={0.18} />
      <Label text="h = 0" position={[-4.3, refY - 0.4, 0]} size={0.5} color={PENDULUM_COLORS.ref} />

      {/* height h above the lowest point, drawn as a thin bar under the bob */}
      <mesh position={[bobX, refY + hUnits / 2, 0]} scale={[1, hUnits, 1]}>
        <boxGeometry args={[0.06, 1, 0.06]} />
        <meshStandardMaterial color={PENDULUM_COLORS.height} emissive={PENDULUM_COLORS.height} emissiveIntensity={0.4} />
      </mesh>

      {/* where it was released */}
      <mesh position={[relX, relY, 0]}>
        <sphereGeometry args={[r, 16, 12]} />
        <meshStandardMaterial color={PENDULUM_COLORS.release} transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  )
}
