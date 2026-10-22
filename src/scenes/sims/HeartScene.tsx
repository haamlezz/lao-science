import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { Label } from '../Label'
import { atrialSystoleDuration, cycleLength, stateAt, systoleDuration } from '../../sims/heart'
import type { Chamber } from '../../sims/heart'
import type { V3 } from './BioParts'

export const HEART_COLORS = {
  rich: '#e53935',
  poor: '#4a6fe3',
  neutral: '#d9948f',
  open: '#43a047',
  closed: '#e53935',
}

/** Closed loop of the double circulation (x, y). Segments 8..15 carry oxygen-rich blood. */
const LOOP: [number, number][] = [
  [-2.3, -2.9], // 0 body, left end
  [-2.75, -1.2], // 1 vena cava (VC)
  [-2.35, 0.7], // 2
  [-1.45, 0.65], // 3 right atrium
  [-1.2, -0.1], // 4 tricuspid valve
  [-0.95, -0.9], // 5 right ventricle
  [-0.5, -0.2], // 6 pulmonary valve
  [-0.3, 1.0], // 7 pulmonary artery (PA)
  [-0.3, 2.3], // 8 lungs (left)
  [1.2, 2.5], // 9 lungs (right)
  [1.65, 1.5], // 10 pulmonary vein (PV)
  [1.45, 0.65], // 11 left atrium
  [1.25, -0.1], // 12 mitral valve
  [1.05, -0.9], // 13 left ventricle
  [1.95, -1.5], // 14 aortic valve
  [2.75, -1.5], // 15 aorta (Ao)
  [2.65, -2.9], // 16 body, right end
  [0, -2.9], // 17 body, middle
]
const RICH_FROM = 8
const RICH_TO = 16 // segments i in [8, 16) are oxygen-rich

const SEG_LEN = LOOP.map((p, i) => {
  const q = LOOP[(i + 1) % LOOP.length]
  return Math.hypot(q[0] - p[0], q[1] - p[1])
})
const TOTAL = SEG_LEN.reduce((a, b) => a + b, 0)

function pointAt(f: number): { x: number; y: number; rich: boolean } {
  let d = (((f % 1) + 1) % 1) * TOTAL
  for (let i = 0; i < LOOP.length; i++) {
    if (d <= SEG_LEN[i]) {
      const p = LOOP[i]
      const q = LOOP[(i + 1) % LOOP.length]
      const k = SEG_LEN[i] === 0 ? 0 : d / SEG_LEN[i]
      return { x: p[0] + (q[0] - p[0]) * k, y: p[1] + (q[1] - p[1]) * k, rich: i >= RICH_FROM && i < RICH_TO }
    }
    d -= SEG_LEN[i]
  }
  return { x: LOOP[0][0], y: LOOP[0][1], rich: false }
}

const vessel = (from: number, to: number) => LOOP.slice(from, to + 1).map(([x, y]): V3 => [x, y, 0.1])
// stable arrays: drei <Line> rebuilds its geometry whenever the points prop changes identity
const VESSEL_POOR1 = vessel(0, 8)
const VESSEL_RICH = vessel(8, 16)
const VESSEL_POOR2 = [LOOP[16], LOOP[17], LOOP[0]].map(([x, y]): V3 => [x, y, 0.1])

const PARTICLES = 36

const BLOOD_OBJ = new THREE.Object3D()
const BLOOD_COL = new THREE.Color()

function Blood({ t, hr, colour }: { t: number; hr: number; colour: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const d = BLOOD_OBJ
    const c = BLOOD_COL
    // one lap every 4 beats (illustrative)
    const lap = (t / cycleLength(hr)) / 4
    for (let i = 0; i < PARTICLES; i++) {
      const p = pointAt(i / PARTICLES + lap)
      d.position.set(p.x, p.y, 0.55)
      d.scale.setScalar(0.1)
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
      c.set(colour ? (p.rich ? HEART_COLORS.rich : HEART_COLORS.poor) : '#ffffff')
      m.setColorAt(i, c)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [t, hr, colour])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PARTICLES]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

interface ChamberProps {
  pos: V3
  semi: V3
  color: string
  contracting: boolean
}

function ChamberMesh({ pos, semi, color, contracting }: ChamberProps) {
  const ref = useRef<THREE.Mesh>(null)
  const s = useRef(1)
  useFrame((_, dt) => {
    s.current += ((contracting ? 0.84 : 1) - s.current) * Math.min(1, dt * 14)
    ref.current?.scale.set(semi[0] * s.current, semi[1] * s.current, semi[2] * s.current)
  })
  return (
    <mesh ref={ref} position={pos} scale={semi}>
      <sphereGeometry args={[1, 28, 18]} />
      <meshStandardMaterial
        color={color}
        emissive={contracting ? '#ffffff' : '#000000'}
        emissiveIntensity={contracting ? 0.28 : 0}
        roughness={0.5}
      />
    </mesh>
  )
}

function Valve({ pos, open, angle }: { pos: [number, number]; open: boolean; angle: number }) {
  // closed: a bar across the flow; open: the bar turned along the flow
  return (
    <mesh position={[pos[0], pos[1], 0.75]} rotation={[0, 0, angle + (open ? 0 : Math.PI / 2)]}>
      <boxGeometry args={[0.62, 0.13, 0.3]} />
      <meshStandardMaterial
        color={open ? HEART_COLORS.open : HEART_COLORS.closed}
        emissive={open ? HEART_COLORS.open : HEART_COLORS.closed}
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

/** Illustrative pulse curve value (0..1) at time x within a cycle of length `period`. */
function pulseAt(hr: number, time: number): number {
  const period = cycleLength(hr)
  const x = ((time % period) + period) % period
  const ts = systoleDuration(hr)
  const ta = atrialSystoleDuration(hr)
  if (x < ts) return 0.15 + 0.85 * Math.sin((Math.PI * x) / ts)
  if (x >= period - ta) return 0.1 + 0.1 * Math.sin((Math.PI * (x - (period - ta))) / ta)
  return 0.08
}

const WINDOW_S = 3

const PULSE_N = 60
const PULSE_INIT: V3[] = Array.from({ length: PULSE_N + 1 }, (_, i): V3 => [3.55 + (i / PULSE_N) * 2.7, 0.55, 0.1])

function Pulse({ hr, t }: { hr: number; t: number }) {
  // the curve is rewritten in place each tick; the Line element itself never re-renders its geometry
  const line = useRef<{ geometry: { setPositions: (a: number[]) => void } }>(null)
  const buf = useRef<number[]>(new Array((PULSE_N + 1) * 3))
  useLayoutEffect(() => {
    const a = buf.current
    for (let i = 0; i <= PULSE_N; i++) {
      const tau = t - WINDOW_S + (i / PULSE_N) * WINDOW_S
      a[i * 3] = 3.55 + (i / PULSE_N) * 2.7
      a[i * 3 + 1] = 0.55 + pulseAt(hr, Math.max(tau, 0)) * 1.3
      a[i * 3 + 2] = 0.1
    }
    line.current?.geometry.setPositions(a)
  }, [hr, t])
  return (
    <group>
      <mesh position={[4.9, 1.2, -0.05]}>
        <boxGeometry args={[2.95, 1.9, 0.05]} />
        <meshStandardMaterial color="#0d2236" />
      </mesh>
      <Line ref={line as never} points={PULSE_INIT} color="#ffeb3b" lineWidth={2} />
      <Label text="Pulse" position={[4.9, 2.4, 0.2]} size={0.46} color="#ffe082" />
      <Label text="3 s" position={[6.0, 0.3, 0.2]} size={0.4} color="#b0bec5" />
    </group>
  )
}

interface Props {
  hr: number
  t: number
  bloodColour: boolean
  valves: boolean
}

/** Simplified four-chamber heart with double circulation. Planar (thick ellipsoids), works in 2D and 3D. */
export function HeartScene({ hr, t, bloodColour, valves }: Props) {
  const st = stateAt(hr, t)
  const col = (c: Chamber) =>
    bloodColour ? (c === 'LA' || c === 'LV' ? HEART_COLORS.rich : HEART_COLORS.poor) : HEART_COLORS.neutral
  const av = st.atrioventricular === 'open'
  const sl = st.semilunar === 'open'
  const poorColor = bloodColour ? HEART_COLORS.poor : '#b0bec5'
  const richColor = bloodColour ? HEART_COLORS.rich : '#b0bec5'

  return (
    <group position={[-0.6, 0.15, 0]}>
      {/* vessels as faint wide lines under the chambers */}
      <Line points={VESSEL_POOR1} color={poorColor} lineWidth={7} transparent opacity={0.45} />
      <Line points={VESSEL_RICH} color={richColor} lineWidth={7} transparent opacity={0.45} />
      <Line points={VESSEL_POOR2} color={poorColor} lineWidth={7} transparent opacity={0.45} />

      <ChamberMesh pos={[-1.5, 0.7, 0]} semi={[0.95, 0.8, 0.7]} color={col('RA')} contracting={st.contracting.RA} />
      <ChamberMesh pos={[1.5, 0.7, 0]} semi={[0.9, 0.75, 0.7]} color={col('LA')} contracting={st.contracting.LA} />
      <ChamberMesh pos={[-0.9, -0.9, 0]} semi={[1.0, 1.05, 0.8]} color={col('RV')} contracting={st.contracting.RV} />
      <ChamberMesh pos={[1.1, -0.9, 0]} semi={[1.15, 1.2, 0.9]} color={col('LV')} contracting={st.contracting.LV} />

      {/* lungs and body */}
      {[-0.8, 1.3].map((x) => (
        <mesh key={x} position={[x, 2.45, 0]} scale={[1.0, 0.55, 0.5]}>
          <sphereGeometry args={[1, 20, 12]} />
          <meshStandardMaterial color="#f8bbd0" transparent opacity={0.85} />
        </mesh>
      ))}
      <mesh position={[0, -2.95, 0]}>
        <boxGeometry args={[5.3, 0.34, 0.6]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>

      {valves && (
        <>
          <Valve pos={LOOP[4]} open={av} angle={Math.PI / 2} />
          <Valve pos={LOOP[12]} open={av} angle={Math.PI / 2} />
          <Valve pos={LOOP[6]} open={sl} angle={Math.PI / 3} />
          <Valve pos={LOOP[14]} open={sl} angle={0} />
        </>
      )}

      <Blood t={t} hr={hr} colour={bloodColour} />

      <Label text="RA" position={[-1.5, 1.0, 0.9]} size={0.5} />
      <Label text="LA" position={[1.5, 1.0, 0.9]} size={0.5} />
      <Label text="RV" position={[-0.95, -1.15, 0.9]} size={0.5} />
      <Label text="LV" position={[1.2, -1.15, 0.9]} size={0.5} />
      <Label text="VC" position={[-3.3, -0.8, 0.5]} size={0.46} color="#bcd0ff" />
      <Label text="PA" position={[-0.65, 1.6, 0.5]} size={0.46} color="#bcd0ff" />
      <Label text="PV" position={[2.3, 1.7, 0.5]} size={0.46} color="#ffcdd2" />
      <Label text="Ao" position={[3.35, -1.1, 0.5]} size={0.46} color="#ffcdd2" />
      <Label text="Lungs" position={[0.25, 3.1, 0.5]} size={0.5} />
      <Label text="Body" position={[0, -2.5, 0.8]} size={0.5} color="#ffe0b2" />

      <Pulse hr={hr} t={t} />
    </group>
  )
}
