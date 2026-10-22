import { Line } from '@react-three/drei'
import { Label } from '../Label'

export const INDUCTION_COLORS = { north: '#ef5350', south: '#42a5f5', coil: '#ffb74d', field: '#ffd54f', needle: '#ef5350', loop: '#4fc3f7' }

type P3 = [number, number, number]

const UNITS_PER_M = 20 // magnet mode: 0.3 m -> 6 scene units
export const FULL_SCALE_V = 6 // needle full scale in magnet mode

/** Meter dial: needle deflects to the right for a positive value (-1..1 of full scale, +-60 degrees). */
export function Dial({ position, value, label, marks = true }: { position: P3; value: number; label: string; marks?: boolean }) {
  const clamped = Math.max(-1, Math.min(1, value))
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.25, 40]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>
      <mesh position={[0, 0, 0.14]}>
        <boxGeometry args={[0.05, 0.3, 0.02]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {marks && (
        <>
          <Label text="0" position={[0, 0.62, 0.2]} size={0.28} color="#263238" />
          <Label text="-" position={[-0.62, 0.3, 0.2]} size={0.3} color="#263238" />
          <Label text="+" position={[0.62, 0.3, 0.2]} size={0.3} color="#263238" />
        </>
      )}
      <group position={[0, -0.25, 0.2]} rotation={[0, 0, -clamped * (Math.PI / 3)]}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.07, 0.84, 0.04]} />
          <meshStandardMaterial color={INDUCTION_COLORS.needle} />
        </mesh>
      </group>
      <mesh position={[0, -0.25, 0.2]}>
        <sphereGeometry args={[0.1, 12, 8]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <Label text={label} position={[0, -1.4, 0.1]} size={0.65} color="#e8f1f8" />
    </group>
  )
}

interface MagnetProps {
  x: number // m, magnet centre relative to the coil centre
  turns: number
  polarity: 1 | -1 // +1: N pole at the +x end
  emf: number // V
  is2D: boolean
}

function FieldLoops({ cx, flip }: { cx: number; flip: boolean }) {
  const loops: P3[][] = []
  for (const b of [0.7, 1.15, 1.6]) {
    for (const side of [1, -1]) {
      const a = 0.9 + b * 0.9
      const pts: P3[] = Array.from({ length: 25 }, (_, i) => {
        const ph = (i / 24) * Math.PI
        const sx = flip ? -1 : 1
        return [cx + sx * a * Math.cos(ph), side * b * Math.sin(ph), 0]
      })
      loops.push(pts)
    }
  }
  return (
    <>
      {loops.map((pts, i) => (
        <Line key={i} points={pts} color={INDUCTION_COLORS.field} lineWidth={1.2} opacity={0.7} transparent />
      ))}
    </>
  )
}

/** Bar magnet moving through a coil, with a galvanometer. Field lines are schematic. */
export function MagnetScene({ x, turns, polarity, emf, is2D }: MagnetProps) {
  const cx = x * UNITS_PER_M
  const rings = Math.max(1, Math.round(turns / 20))
  const nSide = polarity === 1 ? 1 : -1
  return (
    <group position={[0, -0.4, 0]} rotation={[is2D ? 0 : 0.35, 0, 0]}>
      {Array.from({ length: rings }, (_, i) => (
        <mesh key={i} position={[(i - (rings - 1) / 2) * 0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.15, 0.06, 8, 28]} />
          <meshStandardMaterial color={INDUCTION_COLORS.coil} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      <Label text="coil" position={[0, -1.7, 0]} size={0.5} color={INDUCTION_COLORS.coil} />
      <FieldLoops cx={cx} flip={nSide === -1} />
      <group position={[cx, 0, 0]}>
        <mesh position={[-0.55 * nSide, 0, 0]}>
          <boxGeometry args={[1.1, 0.7, 0.7]} />
          <meshStandardMaterial color={INDUCTION_COLORS.south} roughness={0.5} />
        </mesh>
        <mesh position={[0.55 * nSide, 0, 0]}>
          <boxGeometry args={[1.1, 0.7, 0.7]} />
          <meshStandardMaterial color={INDUCTION_COLORS.north} roughness={0.5} />
        </mesh>
        <Label text="S" position={[-0.55 * nSide, 0, 0.45]} size={0.5} color="#ffffff" />
        <Label text="N" position={[0.55 * nSide, 0, 0.45]} size={0.5} color="#ffffff" />
      </group>
      <Line points={[[0, 1.15, 0], [2.5, 1.9, 0], [5.0, 1.0, 0]]} color="#b0bec5" lineWidth={2} />
      <Dial position={[5.4, 2.0, 0]} value={emf / FULL_SCALE_V} label="G" />
    </group>
  )
}

interface GeneratorProps {
  angle: number // rad, angle between the loop normal and B
  emfFraction: number // epsilon / peak, -1..1
}

/** Rectangular loop turning between two magnet poles; B points from N to S. */
export function GeneratorScene({ angle, emfFraction }: GeneratorProps) {
  const loop: P3[] = [
    [0, 1.3, 1.7],
    [0, 1.3, -1.7],
    [0, -1.3, -1.7],
    [0, -1.3, 1.7],
    [0, 1.3, 1.7],
  ]
  return (
    <group position={[0, -0.4, 0]}>
    <group position={[-1.0, 0, 0]} rotation={[0.9, 0, 0]}>
      <mesh position={[-3.6, 0, 0]}>
        <boxGeometry args={[1.0, 2.8, 2.8]} />
        <meshStandardMaterial color={INDUCTION_COLORS.north} roughness={0.5} />
      </mesh>
      <mesh position={[3.6, 0, 0]}>
        <boxGeometry args={[1.0, 2.8, 2.8]} />
        <meshStandardMaterial color={INDUCTION_COLORS.south} roughness={0.5} />
      </mesh>
      <Label text="N" position={[-3.6, 0, 1.6]} size={0.6} color="#ffffff" />
      <Label text="S" position={[3.6, 0, 1.6]} size={0.6} color="#ffffff" />
      {[-0.9, 0, 0.9].map((y) => (
        <Line key={y} points={[[-2.9, y, 0], [2.9, y, 0]]} color={INDUCTION_COLORS.field} lineWidth={1.5} dashed dashSize={0.3} gapSize={0.2} />
      ))}
      <Label text="B" position={[0, 2.0, 0]} size={0.6} color={INDUCTION_COLORS.field} />
      <group rotation={[0, angle, 0]}>
        <Line points={loop} color={INDUCTION_COLORS.loop} lineWidth={5} />
        <mesh>
          <planeGeometry args={[3.4, 2.6]} />
          <meshStandardMaterial color={INDUCTION_COLORS.loop} transparent opacity={0.28} side={2} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3.8, 8]} />
          <meshStandardMaterial color="#cfd8dc" />
        </mesh>
      </group>
    </group>
      <Dial position={[5.8, 1.9, 0]} value={emfFraction} label="V" />
    </group>
  )
}
