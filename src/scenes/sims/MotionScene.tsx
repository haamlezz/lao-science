import { Label } from '../Label'
import { TRACK_WINDOW_M, motionState } from '../../sims/motion'
import type { MotionParams } from '../../sims/motion'

export const MOTION_COLORS = { car: '#ffb74d', marks: '#4fc3f7' } as const

const TRACK_LEN = 18 // scene units for 100 m
const X0 = -TRACK_LEN / 2
const xOf = (sInWindow: number) => X0 + (TRACK_LEN * sInWindow) / TRACK_WINDOW_M

interface Props {
  params: MotionParams
  t: number
  is2D: boolean
}

/**
 * Straight track (a 100 m window that scrolls), distance ticks every 10 m, a car, and a ghost marker for every
 * whole second already passed: equal spacing = uniform motion, growing spacing = speeding up.
 * The scene is a thin plate, so it stays visible when orbited in 3D.
 */
export function MotionScene({ params, t, is2D }: Props) {
  const now = motionState(params, t)
  const start = now.window.start
  const carX = xOf(now.s - start)

  const marks: number[] = []
  for (let sec = 0; sec <= Math.floor(now.t); sec++) {
    const s = motionState(params, sec).s
    if (s >= start && s <= start + TRACK_WINDOW_M) marks.push(xOf(s - start))
  }

  return (
    // tilted a little in 3D so the plate is seen from above and never edge-on at the start view
    <group position={[0, -0.4, 0]} rotation={[is2D ? 0 : 0.5, 0, 0]}>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[TRACK_LEN + 1.2, 0.5, 3]} />
        <meshStandardMaterial color="#455a64" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[TRACK_LEN, 0.04, 0.08]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>
      {Array.from({ length: 11 }, (_, i) => (
        <group key={i} position={[xOf(i * 10), 0, 0]}>
          <mesh position={[0, -0.06, 1.3]}>
            <boxGeometry args={[0.08, 0.14, 0.4]} />
            <meshStandardMaterial color="#eceff1" />
          </mesh>
          <Label text={String(start + i * 10)} position={[0, -0.95, 1.6]} size={0.8} />
        </group>
      ))}
      <Label text="m" position={[X0 - 0.9, -0.95, 1.6]} size={0.8} color="#a9c2d6" />

      {marks.map((x, i) => (
        <mesh key={i} position={[x, 0.3, -0.9]}>
          <sphereGeometry args={[0.2, 12, 8]} />
          <meshStandardMaterial color={MOTION_COLORS.marks} emissive={MOTION_COLORS.marks} emissiveIntensity={0.4} />
        </mesh>
      ))}

      <group position={[carX, 0, 0]} scale={1.3}>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.8, 0.6, 1.1]} />
          <meshStandardMaterial color={MOTION_COLORS.car} roughness={0.5} />
        </mesh>
        <mesh position={[-0.1, 1.05, 0]}>
          <boxGeometry args={[0.9, 0.45, 0.95]} />
          <meshStandardMaterial color="#ffe0b2" roughness={0.5} />
        </mesh>
        {[-0.6, 0.6].flatMap((x) =>
          [-0.55, 0.55].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.25, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.14, 16]} />
              <meshStandardMaterial color="#263238" />
            </mesh>
          )),
        )}
      </group>
    </group>
  )
}
