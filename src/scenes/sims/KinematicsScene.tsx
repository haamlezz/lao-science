import { Label } from '../Label'
import { Arrow } from '../Arrow'
import { duration, effectiveAccel, kinState, maxHeight, sample } from '../../sims/kinematics'
import type { KinParams } from '../../sims/kinematics'
import { niceStep, ticksBetween } from './physUtil'

export const KIN_COLORS = { car: '#ffb74d', velocity: '#4fc3f7', accel: '#ef5350', marks: '#aed581', ground: '#455a64', ruler: '#eceff1' }

const HALF_W = 6.8 // track half length in scene units
const GROUND_Y = -3.0
const TOP_Y = 2.6

/** Axis extent [lo, hi] (m) that contains the whole run, on a nice grid. */
export function trackExtent(p: KinParams): { lo: number; hi: number; step: number } {
  const pts = sample(p, duration(p), 41).map((s) => s.x)
  const lo0 = Math.min(0, ...pts)
  const hi0 = Math.max(0, ...pts)
  const step = niceStep(Math.max(hi0 - lo0, 1), 8)
  let lo = Math.floor(lo0 / step) * step
  let hi = Math.ceil(hi0 / step) * step
  if (hi === lo) hi = lo + step
  lo = Math.min(lo, hi - step)
  return { lo, hi, step }
}

function maxSpeed(p: KinParams): number {
  return Math.max(1e-6, ...sample(p, duration(p), 41).map((s) => Math.abs(s.v)))
}

interface Props {
  params: KinParams
  t: number
  is2D: boolean
}

function Car({ x, y }: { x: number; y: number }) {
  return (
    <group position={[x, y, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.6, 0.5, 1.0]} />
        <meshStandardMaterial color={KIN_COLORS.car} roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.8, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.85]} />
        <meshStandardMaterial color="#ffe0b2" roughness={0.5} />
      </mesh>
      {[-0.5, 0.5].flatMap((dx) =>
        [-0.5, 0.5].map((z) => (
          <mesh key={`${dx}${z}`} position={[dx, 0.18, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 16]} />
            <meshStandardMaterial color="#263238" />
          </mesh>
        )),
      )}
    </group>
  )
}

/** Car on a ruler (uniform, accelerated) or a ball beside a vertical ruler (free fall). Arrows: v and a. */
export function KinematicsScene({ params, t, is2D }: Props) {
  const st = kinState(params, t)
  const vmax = maxSpeed(params)
  const a = effectiveAccel(params)
  const dots: number[] = []
  const dotEvery = params.mode === 'freefall' ? 0.5 : 1
  for (let s = 0; s <= st.t + 1e-9; s += dotEvery) dots.push(s)

  if (params.mode === 'freefall') {
    const top = Math.max(maxHeight(params.x0, params.v0), 1)
    const step = niceStep(top, 6)
    const hi = Math.ceil(top / step) * step
    const Y = (m: number) => GROUND_Y + ((TOP_Y - GROUND_Y) * m) / hi
    const ticks = ticksBetween(0, hi, step)
    const ballX = -1.5
    const apex = maxHeight(params.x0, params.v0)
    return (
      <group rotation={[is2D ? 0 : 0.35, 0, 0]}>
        <mesh position={[0, GROUND_Y - 0.15, 0]}>
          <boxGeometry args={[HALF_W * 2, 0.3, 3]} />
          <meshStandardMaterial color={KIN_COLORS.ground} roughness={0.9} />
        </mesh>
        <mesh position={[-HALF_W + 0.8, (GROUND_Y + TOP_Y) / 2, 0]}>
          <boxGeometry args={[0.08, TOP_Y - GROUND_Y + 0.2, 0.08]} />
          <meshStandardMaterial color={KIN_COLORS.ruler} />
        </mesh>
        {ticks.map((m) => (
          <group key={m} position={[-HALF_W + 0.8, Y(m), 0]}>
            <mesh position={[0.25, 0, 0]}>
              <boxGeometry args={[0.5, 0.05, 0.08]} />
              <meshStandardMaterial color={KIN_COLORS.ruler} />
            </mesh>
            <Label text={String(m)} position={[-0.55, 0, 0.2]} size={0.5} />
          </group>
        ))}
        <Label text="m" position={[-HALF_W - 0.1, TOP_Y + 0.4, 0]} size={0.5} color="#a9c2d6" />
        {apex > params.x0 + 0.01 && (
          <>
            <mesh position={[ballX + 1.2, Y(apex), -0.3]}>
              <boxGeometry args={[4.4, 0.03, 0.03]} />
              <meshStandardMaterial color="#ffd54f" emissive="#ffd54f" emissiveIntensity={0.4} />
            </mesh>
            <Label text="H" position={[ballX + 3.6, Y(apex) + 0.35, 0]} size={0.5} color="#ffd54f" />
          </>
        )}
        {dots.map((s, i) => (
          <mesh key={i} position={[ballX + 0.9 + 0.35 * i, Y(kinState(params, s).x), 0]}>
            <sphereGeometry args={[0.12, 12, 8]} />
            <meshStandardMaterial color={KIN_COLORS.marks} emissive={KIN_COLORS.marks} emissiveIntensity={0.4} />
          </mesh>
        ))}
        <mesh position={[ballX, Y(st.x) + 0.35, 0]}>
          <sphereGeometry args={[0.35, 24, 16]} />
          <meshStandardMaterial color={KIN_COLORS.car} roughness={0.4} />
        </mesh>
        <Arrow
          origin={[ballX - 0.8, Y(st.x) + 0.35, 0]}
          dir={[0, st.v >= 0 ? 1 : -1, 0]}
          len={Math.abs(st.v) < 1e-3 ? 0 : 0.3 + (2.0 * Math.abs(st.v)) / vmax}
          color={KIN_COLORS.velocity}
        />
        <Arrow origin={[ballX + 0.8, Y(st.x) + 0.35, 0]} dir={[0, -1, 0]} len={1.0} color={KIN_COLORS.accel} />
      </group>
    )
  }

  const { lo, hi, step } = trackExtent(params)
  const X = (m: number) => -HALF_W + ((2 * HALF_W) * (m - lo)) / (hi - lo)
  const ticks = ticksBetween(lo, hi, step)
  const carX = X(st.x)
  const vLen = Math.abs(st.v) < 1e-3 ? 0 : 0.3 + (2.2 * Math.abs(st.v)) / vmax
  return (
    <group position={[0, -0.2, 0]} rotation={[is2D ? 0 : 0.5, 0, 0]}>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[HALF_W * 2 + 1, 0.5, 3]} />
        <meshStandardMaterial color={KIN_COLORS.ground} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[HALF_W * 2, 0.04, 0.08]} />
        <meshStandardMaterial color={KIN_COLORS.ruler} />
      </mesh>
      {ticks.map((m) => (
        <group key={m} position={[X(m), 0, 0]}>
          <mesh position={[0, -0.06, 1.3]}>
            <boxGeometry args={[0.08, 0.14, 0.4]} />
            <meshStandardMaterial color={KIN_COLORS.ruler} />
          </mesh>
          <Label text={String(m)} position={[0, -0.8, 1.6]} size={0.6} />
        </group>
      ))}
      <Label text="x (m)" position={[-HALF_W - 0.2, -1.5, 1.6]} size={0.55} color="#a9c2d6" />
      {dots.map((s, i) => (
        <mesh key={i} position={[X(kinState(params, s).x), 0.15, -1.0]}>
          <sphereGeometry args={[0.16, 12, 8]} />
          <meshStandardMaterial color={KIN_COLORS.marks} emissive={KIN_COLORS.marks} emissiveIntensity={0.4} />
        </mesh>
      ))}
      <Car x={carX} y={0} />
      <Arrow origin={[carX, 1.7, 0]} dir={[st.v >= 0 ? 1 : -1, 0, 0]} len={vLen} color={KIN_COLORS.velocity} />
      <Arrow
        origin={[carX, 2.4, 0]}
        dir={[a >= 0 ? 1 : -1, 0, 0]}
        len={Math.abs(a) < 1e-9 ? 0 : 0.3 + (1.2 * Math.abs(a)) / 5}
        color={KIN_COLORS.accel}
      />
    </group>
  )
}
