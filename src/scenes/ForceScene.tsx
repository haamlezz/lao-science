import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Arrow } from './Arrow'
import { netForce, stepCrateVelocity, POSITION_GAIN } from '../sims/force'

export const FORCE_COLORS = { f1: '#ff7043', f2: '#4fc3f7', net: '#ffd54f', weight: '#ce93d8' } as const
const SCALE = 0.07 // scene units per newton
const X_LIMIT = 6

interface Props {
  f1: number
  f2: number
  same: boolean // true: both forces push to the right; false: F1 pulls left, F2 pulls right
  mass: number
  weight: number
  autoRepeat?: boolean // restart from the start after the crate has reached the end of the track
}

/** A crate acted on by two forces on one line (same or opposite direction). Light friction stops it when the resultant is zero. */
export function ForceScene({ f1, f2, same, mass, weight, autoRepeat = false }: Props) {
  const crate = useRef<THREE.Group>(null)
  const v = useRef(0)
  const x = useRef(0)
  const stoppedAt = useRef<number | null>(null) // time (s) when the crate reached the end of the track
  const clock = useRef(0)
  const net = netForce(f1, f2, same)

  // changing the forces or the mass lets a crate that stopped at the end move again
  useEffect(() => {
    stoppedAt.current = null
  }, [net, mass])

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    clock.current += dt
    if (stoppedAt.current !== null) {
      // the crate stays at the end so the result is visible; then it restarts only if auto-repeat is on
      if (autoRepeat && clock.current - stoppedAt.current > 1.2) {
        stoppedAt.current = null
        x.current = 0
        v.current = 0
        crate.current?.position.setX(0)
      }
      return
    }
    // light friction (drag): speed settles in proportion to the resultant and falls to 0 when it is 0
    v.current = stepCrateVelocity(v.current, net, mass, dt)
    x.current += v.current * dt * POSITION_GAIN
    if (Math.abs(x.current) >= X_LIMIT) {
      x.current = Math.sign(x.current) * X_LIMIT
      v.current = 0
      stoppedAt.current = clock.current
    }
    crate.current?.position.setX(x.current)
  })

  const netDir: [number, number, number] = [net >= 0 ? 1 : -1, 0, 0]
  return (
    <group>
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[2 * X_LIMIT + 4, 0.3, 3]} />
        <meshStandardMaterial color="#546e7a" roughness={0.9} />
      </mesh>
      <group ref={crate}>
        <mesh>
          <boxGeometry args={[1.6, 1.6, 1.6]} />
          <meshStandardMaterial color="#c68642" roughness={0.7} />
        </mesh>
        {same ? (
          <>
            <Arrow origin={[0.85, 0.35, 0]} dir={[1, 0, 0]} len={f1 * SCALE} color={FORCE_COLORS.f1} />
            <Arrow origin={[0.85, -0.35, 0]} dir={[1, 0, 0]} len={f2 * SCALE} color={FORCE_COLORS.f2} />
          </>
        ) : (
          <>
            <Arrow origin={[-0.85, 0, 0]} dir={[-1, 0, 0]} len={f1 * SCALE} color={FORCE_COLORS.f1} />
            <Arrow origin={[0.85, 0, 0]} dir={[1, 0, 0]} len={f2 * SCALE} color={FORCE_COLORS.f2} />
          </>
        )}
        <Arrow origin={[0, -1.9, 1.2]} dir={netDir} len={Math.abs(net) * SCALE} color={FORCE_COLORS.net} />
        <Arrow origin={[0, 0, 1]} dir={[0, -1, 0]} len={Math.min(weight * 0.012, 2.2)} color={FORCE_COLORS.weight} />
      </group>
    </group>
  )
}
