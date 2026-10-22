import { useLayoutEffect, useRef } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { Arrow } from '../Arrow'
import { droppedY, flightTime, maxHeight, range, timeToApex, trace, vx, vyAt, xAt, yAt } from '../../sims/projectile'
import type { LaunchParams } from '../../sims/projectile'
import { niceStep, ticksBetween } from './physUtil'

export const PROJECTILE_COLORS = {
  ball: '#ff7043',
  trace: '#ffd54f',
  dropped: '#81d4fa',
  vx: '#4fc3f7',
  vy: '#f48fb1',
  v: '#fff176',
  landing: '#a5d6a7',
  ground: '#455a64',
}

export const MAX_DOTS = 120 // spec particle cap
const X_LEFT = -7.0
const X_SPAN = 14.0
const GROUND_Y = -2.5
const V_SPAN = 5.2
const ARROW_PER_MS = 0.05

/** Dots are every 0.25 s; a very long flight (Moon) widens the interval so the cap is never exceeded. */
export function traceInterval(T: number): number {
  return Math.max(0.25, T / (MAX_DOTS - 1))
}

function Dots({ pts, color, radius }: { pts: [number, number][]; color: string; radius: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const d = new THREE.Object3D()
    const n = Math.min(pts.length, MAX_DOTS)
    for (let i = 0; i < n; i++) {
      d.position.set(pts[i][0], pts[i][1], 0)
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
    }
    m.count = n
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_DOTS]} frustumCulled={false}>
      <sphereGeometry args={[radius, 10, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

interface Props {
  params: LaunchParams
  t: number
  showComponents: boolean
  dropSecond: boolean
  is2D: boolean
}

/** Ground with metre ticks, launcher, ball, trace dots every 0.25 s, velocity vectors and the landing marker. */
export function ProjectileScene({ params, t, showComponents, dropSecond, is2D }: Props) {
  const R = range(params)
  const H = maxHeight(params)
  const wm = Math.max(R * 1.05, 10)
  const hm = Math.max(H * 1.05, params.h0 * 1.1, 5)
  const s = Math.min(X_SPAN / wm, V_SPAN / hm) // same scale on both axes: angles look right
  const X = (m: number) => X_LEFT + m * s
  const Y = (m: number) => GROUND_Y + m * s

  const apexX = vx(params) * timeToApex(params)
  const step = niceStep(X_SPAN / s, 7)
  const ticks = ticksBetween(0, X_SPAN / s, step)

  const all = trace(params, traceInterval(flightTime(params)))
  const shown = all.filter((p) => p.t <= t + 1e-9).map((p): [number, number] => [X(p.x), Y(p.y)])
  const bx = X(xAt(params, t))
  const by = Y(yAt(params, t))
  const vxv = vx(params)
  const vyv = vyAt(params, t)
  const launchAng = (params.angleDeg * Math.PI) / 180
  const dy = Y(droppedY(params, t))

  return (
    <group rotation={[is2D ? 0 : 0.2, 0, 0]}>
      <mesh position={[0, GROUND_Y - 0.2, 0]}>
        <boxGeometry args={[15.6, 0.4, 3]} />
        <meshStandardMaterial color={PROJECTILE_COLORS.ground} roughness={0.9} />
      </mesh>
      {ticks.map((m) => (
        <group key={m} position={[X(m), GROUND_Y, 0]}>
          <mesh position={[0, 0.02, 1.4]}>
            <boxGeometry args={[0.06, 0.1, 0.3]} />
            <meshStandardMaterial color="#eceff1" />
          </mesh>
          <Label text={String(m)} position={[0, -0.6, 1.6]} size={0.5} />
        </group>
      ))}
      <Label text="m" position={[X_LEFT + X_SPAN + 0.55, GROUND_Y - 0.6, 1.6]} size={0.5} color="#a9c2d6" />

      {/* launch tower (h0) and gun barrel */}
      {params.h0 > 0 && (
        <mesh position={[X(0) - 0.35, GROUND_Y + (params.h0 * s) / 2, 0]}>
          <boxGeometry args={[0.5, params.h0 * s, 1.0]} />
          <meshStandardMaterial color="#607d8b" />
        </mesh>
      )}
      <group position={[X(0), Y(params.h0), 0]} rotation={[0, 0, launchAng]}>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.16, 0.9, 12]} />
          <meshStandardMaterial color="#90a4ae" />
        </mesh>
      </group>

      {/* apex height H and landing point R */}
      {H > params.h0 + 0.01 && (
        <>
          <Line points={[[X(0), Y(H), 0], [X(apexX), Y(H), 0]]} color="#ffd54f" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.15} />
          <Label text="H" position={[X(apexX) + 0.45, Y(H) + 0.1, 0]} size={0.5} color="#ffd54f" />
        </>
      )}
      <mesh position={[X(R), GROUND_Y + 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.07, 8, 24]} />
        <meshStandardMaterial color={PROJECTILE_COLORS.landing} emissive={PROJECTILE_COLORS.landing} emissiveIntensity={0.5} />
      </mesh>
      {R > 0.01 && (
        <>
          <Line points={[[X(0), GROUND_Y + 0.35, 0.2], [X(R), GROUND_Y + 0.35, 0.2]]} color={PROJECTILE_COLORS.landing} lineWidth={2} />
          <Label text="R" position={[X(R / 2), GROUND_Y + 0.75, 0.2]} size={0.5} color={PROJECTILE_COLORS.landing} />
        </>
      )}

      <Dots pts={shown} color={PROJECTILE_COLORS.trace} radius={0.07} />

      {dropSecond && (
        <>
          <Line points={[[X(0), dy, -0.1], [Math.max(bx, X(0) + 0.01), dy, -0.1]]} color={PROJECTILE_COLORS.dropped} lineWidth={1} dashed dashSize={0.12} gapSize={0.12} />
          <mesh position={[X(0), dy + 0.22, 0]}>
            <sphereGeometry args={[0.22, 20, 14]} />
            <meshStandardMaterial color={PROJECTILE_COLORS.dropped} roughness={0.4} />
          </mesh>
        </>
      )}

      <mesh position={[bx, by + 0.22, 0]}>
        <sphereGeometry args={[0.22, 20, 14]} />
        <meshStandardMaterial color={PROJECTILE_COLORS.ball} roughness={0.4} />
      </mesh>

      {/* velocity vectors at the ball (scene units are 0.05 per m/s) */}
      <Arrow origin={[bx, by + 0.22, 0.3]} dir={[vxv, vyv, 0.0001]} len={Math.hypot(vxv, vyv) * ARROW_PER_MS} color={PROJECTILE_COLORS.v} />
      {showComponents && (
        <>
          {Math.abs(vxv) > 0.05 && <Arrow origin={[bx, by + 0.22, 0.3]} dir={[1, 0, 0]} len={Math.abs(vxv) * ARROW_PER_MS} color={PROJECTILE_COLORS.vx} />}
          {Math.abs(vyv) > 0.05 && (
            <Arrow origin={[bx, by + 0.22, 0.3]} dir={[0, vyv >= 0 ? 1 : -1, 0]} len={Math.abs(vyv) * ARROW_PER_MS} color={PROJECTILE_COLORS.vy} />
          )}
        </>
      )}
    </group>
  )
}
