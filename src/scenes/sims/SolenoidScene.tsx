import { useLayoutEffect, useMemo, useRef } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { MAX_PINS } from '../../sims/solenoid'
import type { SolenoidMode, SolenoidResult } from '../../sims/solenoid'

export const SOLENOID_COLORS = { north: '#ef5350', south: '#42a5f5', line: '#ffd54f', coil: '#ffb74d', pin: '#cfd8dc', core: '#78909c' }

type P3 = [number, number, number]
const HALF = 2.1 // half length of the bar / coil drawing
const CORE_HALF = 2.4

/** Direction of the field at (x, y) of a bar magnet / solenoid with +x north (s = 1) or −x north (s = −1). */
function fieldDir(x: number, y: number, s: number): [number, number] {
  if (Math.abs(x) < HALF && Math.abs(y) < 0.9) return [s, 0]
  const r2 = x * x + y * y
  const bx = (3 * x * x) / r2 - 1
  const by = (3 * x * y) / r2
  const n = Math.hypot(bx, by) || 1
  return [(s * bx) / n, (s * by) / n]
}

function Needle({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <group position={[x, y, 0.1]} rotation={[0, 0, angle]}>
      <mesh position={[0.17, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.34, 8]} />
        <meshStandardMaterial color={SOLENOID_COLORS.north} />
      </mesh>
      <mesh position={[-0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.34, 8]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>
    </group>
  )
}

function Head({ x, y, dx, dy, size = 0.3 }: { x: number; y: number; dx: number; dy: number; size?: number }) {
  return (
    <mesh position={[x, y, 0.05]} rotation={[0, 0, Math.atan2(dy, dx) - Math.PI / 2]}>
      <coneGeometry args={[size * 0.5, size, 10]} />
      <meshStandardMaterial color={SOLENOID_COLORS.line} emissive={SOLENOID_COLORS.line} emissiveIntensity={0.4} />
    </mesh>
  )
}

const LOOPS = [
  { a: 0, h: 3.5, w: 2.2 },
  { a: 0.3, h: 2.5, w: 1.6 },
  { a: -0.3, h: 2.5, w: 1.6 },
]

function bezier(p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], n = 24): P3[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    const u = 1 - t
    const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0]
    const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]
    return [x, y, 0]
  })
}

/** Closed field lines of a bar magnet / solenoid: straight inside (S to N), arcs outside. s = +1 means N on the right. */
function AxialLines({ s, e, width, count }: { s: number; e: number; width: number; count: number }) {
  const loops = LOOPS.slice(0, count)
  return (
    <group>
      {loops.map(({ a, h, w }, i) => {
        const top = bezier([e, a], [e + w, a + h], [-e - w, a + h], [-e, a])
        const bottom = bezier([e, a], [e + w, a - h], [-e - w, a - h], [-e, a])
        const inside: P3[] = [[-e, a, 0], [e, a, 0]]
        return (
          <group key={i}>
            <Line points={inside} color={SOLENOID_COLORS.line} lineWidth={width} />
            <Line points={top} color={SOLENOID_COLORS.line} lineWidth={width} />
            <Line points={bottom} color={SOLENOID_COLORS.line} lineWidth={width} />
            <Head x={0} y={a} dx={s} dy={0} />
            <Head x={0} y={a + 0.75 * h} dx={-s} dy={0} />
            <Head x={0} y={a - 0.75 * h} dx={-s} dy={0} />
          </group>
        )
      })}
    </group>
  )
}

function Pins({ pins, e, show }: { pins: number; e: number; show: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const d = new THREE.Object3D()
    for (let k = 0; k < MAX_PINS; k++) {
      if (k < pins) {
        const side = k % 2 === 0 ? 1 : -1
        const idx = Math.floor(k / 2)
        d.position.set(side * (e + 0.2 + idx * 0.17), -0.4 - (idx % 2) * 0.12, 0)
        d.rotation.set(0, 0, 0)
      } else {
        d.position.set(-3.6 + ((k * 7) % MAX_PINS) * 0.38, -3.35, 0)
        d.rotation.set(0, 0, Math.PI / 2)
      }
      d.updateMatrix()
      m.setMatrixAt(k, d.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  }, [pins, e, show])
  if (!show) return null
  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, MAX_PINS]} frustumCulled={false}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
        <meshStandardMaterial color={SOLENOID_COLORS.pin} metalness={0.5} roughness={0.4} />
      </instancedMesh>
      <mesh position={[0, -3.62, 0]}>
        <boxGeometry args={[9, 0.12, 1.2]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
    </group>
  )
}

function Coil({ turns }: { turns: number }) {
  const pts = useMemo<P3[]>(() => {
    const loops = turns / 10
    const n = Math.round(loops * 20)
    return Array.from({ length: n + 1 }, (_, i) => {
      const f = i / n
      const phi = f * loops * Math.PI * 2
      return [-2 + 4 * f, 0.7 * Math.cos(phi), 0.7 * Math.sin(phi)] as P3
    })
  }, [turns])
  return <Line points={pts} color={SOLENOID_COLORS.coil} lineWidth={3} />
}

interface Props {
  mode: SolenoidMode
  turns: number
  signedCurrent: number
  ironCore: boolean
  showLines: boolean
  result: SolenoidResult
}

export function SolenoidScene({ mode, turns, signedCurrent, ironCore, showLines, result }: Props) {
  const nRight = result.polarity === 'N-right'
  const s = result.polarity === 'N-left' ? -1 : 1
  const hasField = mode === 'bar' || signedCurrent !== 0
  const e = mode === 'bar' ? HALF : ironCore ? CORE_HALF : 2
  const width = 1.5 + 2.5 * result.strength
  const lineCount = result.strength > 0.25 ? 3 : 1
  const ccw = signedCurrent > 0 // wire mode: sense of the circulation

  const needles = useMemo(() => {
    const out: { x: number; y: number }[] = []
    if (mode === 'wire') {
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8
        out.push({ x: 1.6 * Math.cos(a), y: 1.6 * Math.sin(a) })
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2
        out.push({ x: 2.7 * Math.cos(a), y: 2.7 * Math.sin(a) })
      }
      return out
    }
    for (const y of [-2.2, -1.2, 1.2, 2.2]) for (const x of [-4.2, -2.1, 0, 2.1, 4.2]) out.push({ x, y })
    out.push({ x: -4.6, y: 0 }, { x: 4.6, y: 0 })
    return out
  }, [mode])

  const needleAngle = (x: number, y: number): number => {
    if (!hasField) return Math.PI / 2 // no field: needles settle towards Earth's north (up)
    if (mode === 'wire') {
      const dir = ccw ? 1 : -1
      return Math.atan2(dir * x, -dir * y) // tangent of the circle: (−y, x) for counter-clockwise
    }
    const [dx, dy] = fieldDir(x, y, s)
    return Math.atan2(dy, dx)
  }

  return (
    <group>
      {mode === 'bar' && (
        <group>
          <mesh position={[HALF / 2, 0, 0]}>
            <boxGeometry args={[HALF, 0.9, 0.9]} />
            <meshStandardMaterial color={SOLENOID_COLORS.north} />
          </mesh>
          <mesh position={[-HALF / 2, 0, 0]}>
            <boxGeometry args={[HALF, 0.9, 0.9]} />
            <meshStandardMaterial color={SOLENOID_COLORS.south} />
          </mesh>
        </group>
      )}

      {mode === 'solenoid' && (
        <group>
          <Coil turns={turns} />
          {ironCore && (
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.45, 0.45, CORE_HALF * 2, 20]} />
              <meshStandardMaterial color={SOLENOID_COLORS.core} metalness={0.6} roughness={0.4} />
            </mesh>
          )}
        </group>
      )}

      {mode === 'wire' && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 6, 16]} />
            <meshStandardMaterial color={SOLENOID_COLORS.coil} />
          </mesh>
          {/* end-on marker: dot = current towards the viewer (I > 0), cross = away (I < 0) */}
          {signedCurrent > 0 && (
            <mesh position={[0, 0, 3.05]}>
              <sphereGeometry args={[0.12, 12, 8]} />
              <meshBasicMaterial color="#212121" />
            </mesh>
          )}
          {signedCurrent < 0 &&
            [Math.PI / 4, -Math.PI / 4].map((r) => (
              <mesh key={r} position={[0, 0, 3.05]} rotation={[0, 0, r]}>
                <boxGeometry args={[0.5, 0.07, 0.05]} />
                <meshBasicMaterial color="#212121" />
              </mesh>
            ))}
        </group>
      )}

      {/* field display */}
      {showLines && hasField && mode !== 'wire' && <AxialLines s={s} e={e} width={width} count={lineCount} />}
      {showLines &&
        hasField &&
        mode === 'wire' &&
        [1.1, 1.9, 2.7].map((r) => {
          const pts: P3[] = Array.from({ length: 49 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2
            return [r * Math.cos(a), r * Math.sin(a), 0]
          })
          const d = ccw ? 1 : -1
          return (
            <group key={r}>
              <Line points={pts} color={SOLENOID_COLORS.line} lineWidth={width} />
              {[0, 1, 2, 3].map((q) => {
                const a = (q / 4) * Math.PI * 2 + Math.PI / 4
                return <Head key={q} x={r * Math.cos(a)} y={r * Math.sin(a)} dx={-d * Math.sin(a)} dy={d * Math.cos(a)} />
              })}
            </group>
          )
        })}
      {!showLines && needles.map((n, i) => <Needle key={i} x={n.x} y={n.y} angle={needleAngle(n.x, n.y)} />)}

      {/* poles */}
      {result.polarity !== 'none' && (
        <>
          <Label text="N" position={[(nRight ? 1 : -1) * (e + 0.55), 1.15, 0.2]} size={0.7} color="#fff" bg={SOLENOID_COLORS.north} />
          <Label text="S" position={[(nRight ? -1 : 1) * (e + 0.55), 1.15, 0.2]} size={0.7} color="#fff" bg={SOLENOID_COLORS.south} />
        </>
      )}

      <Pins pins={result.pins} e={e} show={mode !== 'wire'} />
    </group>
  )
}
