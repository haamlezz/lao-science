import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import type { BasicResult, OhmResult, Arrangement, Wiring } from '../../sims/circuit'

export const CIRCUIT_COLORS = { wire: '#ffcc80', dead: '#90a4ae', bulb: '#ffd54f', resistor: '#bcaaa4', cell: '#4fc3f7', dot: '#fff59d' }

// Loop geometry (scene units). Left wire holds ammeter / battery / switch; components sit on the top wire or on rungs.
const X0 = -5
const X1 = 5
const YT = 2.8
const YB = -2.8
const GW = 0.55 // half gap left in a wire for a bulb / resistor / meter

type P = [number, number]
const v3 = (p: P, z = 0): [number, number, number] => [p[0], p[1], z]

/** Horizontal wire from x0 to x1 at y with gaps (centre x values) cut out. */
function hLine(y: number, x0: number, x1: number, gaps: number[]): P[] {
  const out: P[] = []
  let cur = x0
  for (const g of [...gaps].sort((a, b) => a - b)) {
    out.push([cur, y], [g - GW, y])
    cur = g + GW
  }
  out.push([cur, y], [x1, y])
  return out
}

function vLine(x: number, y0: number, y1: number): P[] {
  return [[x, y0], [x, y1]]
}

// ---------------------------------------------------------------- parts

function Wires({ pairs, live }: { pairs: P[]; live: boolean }) {
  return (
    <Line
      points={pairs.map((p) => v3(p))}
      segments
      color={live ? CIRCUIT_COLORS.wire : CIRCUIT_COLORS.dead}
      lineWidth={4}
    />
  )
}

/** n cells in series, long plate (+) on top. Spans y in [-0.25n, 0.25n]. Terminals touch the wire ends. */
function Cells({ n }: { n: number }) {
  const half = 0.25 * n
  return (
    <group position={[X0, 0, 0]}>
      {Array.from({ length: n }, (_, i) => {
        const y = -half + 0.25 + 0.5 * i
        return (
          <group key={i}>
            <mesh position={[0, y + 0.1, 0]}>
              <boxGeometry args={[1.3, 0.07, 0.4]} />
              <meshStandardMaterial color={CIRCUIT_COLORS.cell} />
            </mesh>
            <mesh position={[0, y - 0.1, 0]}>
              <boxGeometry args={[0.7, 0.15, 0.4]} />
              <meshStandardMaterial color="#455a64" />
            </mesh>
            {i < n - 1 && (
              <mesh position={[0, y + 0.25, 0]}>
                <boxGeometry args={[0.05, 0.3, 0.05]} />
                <meshStandardMaterial color={CIRCUIT_COLORS.dead} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

function Bulb({ x, y, glow, present }: { x: number; y: number; glow: number; present: boolean }) {
  const g = Math.sqrt(Math.min(Math.max(glow, 0), 1))
  return (
    <group position={[x, y, 0]}>
      {present ? (
        <>
          <mesh>
            <sphereGeometry args={[0.5, 20, 14]} />
            <meshStandardMaterial
              color={g > 0 ? '#fff3c4' : '#cfd8dc'}
              emissive="#ffb300"
              emissiveIntensity={g > 0 ? 0.3 + 1.5 * g : 0}
              transparent
              opacity={g > 0 ? 1 : 0.75}
            />
          </mesh>
          {g > 0 && (
            <mesh>
              <sphereGeometry args={[0.55 + 0.55 * g, 16, 12]} />
              <meshBasicMaterial color="#ffe082" transparent opacity={0.4 * g} depthWrite={false} />
            </mesh>
          )}
        </>
      ) : (
        <mesh>
          <sphereGeometry args={[0.5, 12, 8]} />
          <meshBasicMaterial color="#78909c" wireframe />
        </mesh>
      )}
    </group>
  )
}

function Resistor({ x, y, vertical }: { x: number; y: number; vertical: boolean }) {
  return (
    <mesh position={[x, y, 0]} rotation={[0, 0, vertical ? Math.PI / 2 : 0]}>
      <boxGeometry args={[1.1, 0.5, 0.5]} />
      <meshStandardMaterial color={CIRCUIT_COLORS.resistor} />
    </mesh>
  )
}

function Meter({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <group position={[x, y, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      <Label text={text} position={[0, 0, 0.3]} size={0.55} color={color} />
    </group>
  )
}

/** Switch on the left wire between y = -1.6 and y = -2.2; the lever lifts away when open. */
function SwitchSymbol({ closed }: { closed: boolean }) {
  const top: P = [X0, -1.6]
  const bottom: P = [X0, -2.2]
  const tip: P = closed ? top : [X0 + 0.55, -1.75]
  return (
    <group>
      {[top, bottom].map((p, i) => (
        <mesh key={i} position={v3(p)}>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color="#eceff1" />
        </mesh>
      ))}
      <Line points={[v3(bottom), v3(tip)]} color={closed ? CIRCUIT_COLORS.wire : '#ef5350'} lineWidth={5} />
    </group>
  )
}

interface Loop {
  pts: P[] // closed polyline (last point connects back to first)
  speed: number // units per second, 0 = hidden
}

const DOTS_PER_LOOP = 14
const MAX_DOTS = DOTS_PER_LOOP * 3
const dummy = new THREE.Object3D()

/** Charge dots circulating along each loop; speed follows the current. Hidden when the loop carries no current. */
function Flow({ loops }: { loops: Loop[] }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const phase = useRef<number[]>([0, 0, 0])
  const geo = useMemo(
    () =>
      loops.map((l) => {
        const lens: number[] = []
        let total = 0
        for (let i = 0; i < l.pts.length; i++) {
          const a = l.pts[i]
          const b = l.pts[(i + 1) % l.pts.length]
          const d = Math.hypot(b[0] - a[0], b[1] - a[1])
          lens.push(d)
          total += d
        }
        return { lens, total }
      }),
    [loops],
  )
  useFrame((_s, dt) => {
    const m = ref.current
    if (!m) return
    let k = 0
    loops.forEach((l, li) => {
      if (l.speed <= 0) return
      const { lens, total } = geo[li]
      phase.current[li] = (phase.current[li] + l.speed * Math.min(dt, 0.1)) % total
      for (let d = 0; d < DOTS_PER_LOOP && k < MAX_DOTS; d++, k++) {
        let s = (phase.current[li] + (d * total) / DOTS_PER_LOOP) % total
        let seg = 0
        while (s > lens[seg]) {
          s -= lens[seg]
          seg = (seg + 1) % lens.length
        }
        const a = l.pts[seg]
        const b = l.pts[(seg + 1) % l.pts.length]
        const f = lens[seg] > 0 ? s / lens[seg] : 0
        dummy.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 0.15)
        dummy.updateMatrix()
        m.setMatrixAt(k, dummy.matrix)
      }
    })
    m.count = k
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_DOTS]} frustumCulled={false}>
      <sphereGeometry args={[0.1, 8, 6]} />
      <meshBasicMaterial color={CIRCUIT_COLORS.dot} />
    </instancedMesh>
  )
}

const speedFor = (amps: number) => (amps > 1e-6 ? 0.6 + 2.4 * Math.min(1, Math.sqrt(amps / 3)) : 0)

// ---------------------------------------------------------------- layouts

type Placed = { x: number; y: number; vertical: boolean }

/** Component centres for n items: on the top wire (series) or on rungs (parallel). */
function place(n: number, wiring: Wiring, xsParallel: number[]): Placed[] {
  if (wiring === 'series') {
    const xs = n === 1 ? [0] : n === 2 ? [-1.8, 1.8] : [-3, 0, 3]
    return xs.map((x) => ({ x, y: YT, vertical: false }))
  }
  return xsParallel.slice(0, n).map((x) => ({ x, y: 0, vertical: true }))
}

function leftWire(cells: number): P[] {
  const h = 0.25 * cells - 0.15
  return [
    ...vLine(X0, YT, 2.3), // top corner down to the ammeter
    ...vLine(X0, 1.5, h),
    ...vLine(X0, -h, -1.6),
    ...vLine(X0, -2.2, YB),
  ]
}

interface Frame {
  wiring: Wiring
  placed: Placed[]
  cells: number
}

function frameWires(f: Frame): P[] {
  const { wiring, placed, cells } = f
  const out = leftWire(cells)
  if (wiring === 'series') {
    out.push(...hLine(YT, X0, X1, placed.map((p) => p.x)))
    out.push(...vLine(X1, YT, YB))
    out.push(...hLine(YB, X0, X1, []))
  } else {
    const xl = Math.max(...placed.map((p) => p.x)) + 1
    out.push(...hLine(YT, X0, xl, []), ...hLine(YB, X0, xl, []))
    for (const p of placed) {
      out.push(...vLine(p.x, YT, GW), ...vLine(p.x, -GW, YB))
    }
  }
  return out
}

function loopsFor(f: Frame, currents: number[]): Loop[] {
  if (f.wiring === 'series') {
    return [{ pts: [[X0, YT], [X1, YT], [X1, YB], [X0, YB]], speed: speedFor(currents[0] ?? 0) }]
  }
  return f.placed.map((p, i) => ({
    pts: [[X0, YT], [p.x, YT], [p.x, YB], [X0, YB]] as P[],
    speed: speedFor(currents[i] ?? 0),
  }))
}

const fmt = (n: number, d = 2) => n.toFixed(d)

// ---------------------------------------------------------------- scenes

interface BasicProps {
  cells: number
  bulbs: number
  wiring: Wiring
  switchOn: boolean
  result: BasicResult
}

export function BasicCircuitScene({ cells, bulbs, wiring, switchOn, result }: BasicProps) {
  const placed = place(bulbs, wiring, [-3, 0, 3])
  const frame: Frame = { wiring, placed, cells }
  const live = result.closed
  const loops = loopsFor(
    frame,
    result.bulbs.map((b) => b.current),
  )
  return (
    <group position={[0.9, 0, 0]}>
      <Wires pairs={frameWires(frame)} live={live} />
      <Cells n={cells} />
      <Label text={`${fmt(result.emf, 1)} V`} position={[-6.3, 0, 0]} size={0.5} color="#e1f5fe" />
      <Meter x={X0} y={1.9} text="A" color="#fff59d" />
      <Label text={`${fmt(result.current)} A`} position={[-6.3, 1.9, 0]} size={0.5} color="#fff59d" />
      <SwitchSymbol closed={switchOn} />
      <Label text={switchOn ? 'ON' : 'OFF'} position={[-6.2, -1.9, 0]} size={0.5} color={switchOn ? '#a5d6a7' : '#ef9a9a'} />
      {placed.map((p, i) => {
        const b = result.bulbs[i]
        return (
          <group key={i}>
            <Bulb x={p.x} y={p.y} glow={b.glow} present={b.present} />
            <Label
              text={b.present ? `${fmt(b.power)} W` : '--'}
              position={wiring === 'series' ? [p.x, 1.75, 0] : [p.x + 1.45, 0, 0]}
              size={0.55}
              color={b.lit ? '#fff59d' : '#b0bec5'}
            />
          </group>
        )
      })}
      {live && <Flow loops={loops} />}
    </group>
  )
}

interface OhmProps {
  volts: number
  r1: number
  r2: number
  arrangement: Arrangement
  result: OhmResult
}

export function OhmCircuitScene({ volts, r1, r2, arrangement, result }: OhmProps) {
  const wiring: Wiring = arrangement === 'parallel' ? 'parallel' : 'series'
  const n = arrangement === 'single' ? 1 : 2
  const placed = place(n, wiring, [-2, 2.4])
  const frame: Frame = { wiring, placed, cells: 3 }
  const live = result.current > 1e-9
  const ohms = [r1, r2]
  const currents = result.branches.map((b) => b.current)
  const loops = wiring === 'series' ? loopsFor(frame, [result.current]) : loopsFor(frame, currents)
  return (
    <group position={[0.9, 0, 0]}>
      <Wires pairs={frameWires(frame)} live={live} />
      <Cells n={3} />
      <Label text={`${volts} V`} position={[-6.3, 0, 0]} size={0.5} color="#e1f5fe" />
      <Meter x={X0} y={1.9} text="A" color="#fff59d" />
      <Label text={`${fmt(result.current)} A`} position={[-6.3, 1.9, 0]} size={0.5} color="#fff59d" />
      {/* the source is always connected in this mode: switch drawn closed for a complete loop */}
      <SwitchSymbol closed />
      {placed.map((p, i) => {
        const br = result.branches[i]
        const series = wiring === 'series'
        const rx = p.x
        const vx = series ? p.x : p.x + 1.4
        const vy = series ? 1.3 : 0
        const aLo: P = series ? [p.x - 0.55, YT] : [p.x, 0.55]
        const aHi: P = series ? [p.x + 0.55, YT] : [p.x, -0.55]
        return (
          <group key={i}>
            <Resistor x={rx} y={p.y} vertical={p.vertical} />
            <Label
              text={`R${i + 1} = ${ohms[i]} Ω`}
              position={series ? [p.x, 3.6, 0] : [p.x - 1.5, 0.35, 0]}
              size={0.55}
              color="#d7ccc8"
            />
            <Line points={[v3(aLo), [vx, vy + 0.3, 0]]} color="#b0bec5" lineWidth={1.5} dashed dashSize={0.12} gapSize={0.1} />
            <Line points={[v3(aHi), [vx, vy + 0.3, 0]]} color="#b0bec5" lineWidth={1.5} dashed dashSize={0.12} gapSize={0.1} />
            <Meter x={vx} y={vy} text="V" color="#80d8ff" />
            <Label text={`${fmt(br.voltage)} V`} position={[vx, vy - 0.8, 0]} size={0.55} color="#80d8ff" />
            {!series && <Label text={`${fmt(br.current)} A`} position={[p.x - 1.5, -0.35, 0]} size={0.55} color="#fff59d" />}
          </group>
        )
      })}
      {live && <Flow loops={loops} />}
    </group>
  )
}
