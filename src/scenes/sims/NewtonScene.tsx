import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { Arrow } from '../Arrow'

export const NEWTON_COLORS = {
  weight: '#ef5350',
  normal: '#66bb6a',
  applied: '#4fc3f7',
  friction: '#ffb74d',
  reaction: '#a5d6a7',
  block: '#a1887f',
  surface: '#546e7a',
}

const PIVOT_X = -6.2
const FLOOR_Y = -3.2
const FLAT_HEIGHT = 2.2 // height of the flat table top above the floor
const RAMP_BASE = 0.8 // height of the ramp's low end above the floor
const ARROW_PER_N = 0.02 // scene units per newton
const MARK_SPACING = 0.9 // scene units between ground ticks (1 m)
const HALF_BLOCK = 0.6

interface Props {
  angleRad: number // 0 on the flat
  incline: boolean
  x: number // metres moved along the surface (scrolls the ground ticks)
  weight: number // N
  normal: number // N
  applied: number // N, along the surface (up the slope)
  friction: number // N, signed (+ up the slope / right)
  showForces: boolean
  is2D: boolean
}

type V2 = [number, number]

function DashedArrow({ from, dir, len, color }: { from: V2; dir: V2; len: number; color: string }) {
  if (len < 0.05) return null
  const head = 0.35
  const shaftEnd: [number, number, number] = [from[0] + dir[0] * (len - head), from[1] + dir[1] * (len - head), 0.05]
  const ang = Math.atan2(dir[1], dir[0]) - Math.PI / 2
  return (
    <group>
      <Line points={[[from[0], from[1], 0.05], shaftEnd]} color={color} lineWidth={3} dashed dashSize={0.12} gapSize={0.09} />
      <mesh position={[from[0] + dir[0] * (len - head / 2), from[1] + dir[1] * (len - head / 2), 0.05]} rotation={[0, 0, ang]}>
        <coneGeometry args={[0.18, head, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

/** Block on a flat table or a ramp. Forces are drawn from the block centre, scaled to magnitude. */
export function NewtonScene({ angleRad, incline, x, weight, normal, applied, friction, showForces, is2D }: Props) {
  const th = angleRad
  const c = Math.cos(th)
  const s = Math.sin(th)
  const surfLen = incline ? Math.min(12, 4.8 / Math.max(s, 0.05)) : 12.4
  const startY = FLOOR_Y + (incline ? RAMP_BASE : FLAT_HEIGHT) // where the surface line starts (at the pivot)
  const u = surfLen * 0.55 // block position along the surface
  // block centre in world coordinates
  const cx = PIVOT_X + u * c - HALF_BLOCK * s
  const cy = startY + u * s + HALF_BLOCK * c
  const along: V2 = [c, s]
  const norm: V2 = [-s, c]

  const wedge = useMemo(() => {
    const sh = new THREE.Shape()
    sh.moveTo(0, 0)
    sh.lineTo(surfLen * c, 0)
    sh.lineTo(surfLen * c, startY - FLOOR_Y + (incline ? surfLen * s : 0))
    sh.lineTo(0, startY - FLOOR_Y)
    sh.closePath()
    return sh
  }, [surfLen, c, s, incline, startY])

  // ground ticks every metre, sliding backwards as the block moves forward
  const ticks = Array.from({ length: Math.floor(surfLen / MARK_SPACING) }, (_, i) => {
    const raw = (i + 1) * MARK_SPACING - x * MARK_SPACING
    return ((raw % surfLen) + surfLen) % surfLen
  })

  const frictionDir: V2 = [Math.sign(friction) * along[0], Math.sign(friction) * along[1]]
  const L = (n: number) => n * ARROW_PER_N
  const tip = (dir: V2, n: number, off = 0.4): [number, number, number] => [cx + dir[0] * (L(n) + off), cy + dir[1] * (L(n) + off), 0.3]
  const contact: V2 = [cx - norm[0] * HALF_BLOCK, cy - norm[1] * HALF_BLOCK]

  return (
    <group rotation={[is2D ? 0 : 0.18, 0, 0]}>
      <mesh position={[0, FLOOR_Y - 0.15, 0]}>
        <boxGeometry args={[15.5, 0.3, 3.4]} />
        <meshStandardMaterial color="#37474f" roughness={0.9} />
      </mesh>
      <mesh position={[PIVOT_X, FLOOR_Y, -1.5]}>
        <extrudeGeometry args={[wedge, { depth: 3, bevelEnabled: false }]} />
        <meshStandardMaterial color={NEWTON_COLORS.surface} roughness={0.9} />
      </mesh>
      {/* ground ticks sit on the sloping surface */}
      <group position={[PIVOT_X, startY, 0]} rotation={[0, 0, th]}>
        {ticks.map((p, i) => (
          <mesh key={i} position={[p, 0.03, 1.55]}>
            <boxGeometry args={[0.07, 0.07, 0.12]} />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>
        ))}
        <group position={[u, HALF_BLOCK, 0]}>
          <mesh>
            <boxGeometry args={[HALF_BLOCK * 2, HALF_BLOCK * 2, 1.4]} />
            <meshStandardMaterial color={NEWTON_COLORS.block} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {showForces && (
        <group>
          <Arrow origin={[cx, cy, 0.8]} dir={[0, -1, 0]} len={L(weight)} color={NEWTON_COLORS.weight} />
          <Label text="W" position={tip([0, -1], weight)} size={0.6} color={NEWTON_COLORS.weight} />
          <Arrow origin={[cx, cy, 0.8]} dir={[norm[0], norm[1], 0]} len={L(normal)} color={NEWTON_COLORS.normal} />
          <Label text="N" position={tip(norm, normal)} size={0.6} color={NEWTON_COLORS.normal} />
          <Arrow origin={[cx, cy, 0.8]} dir={[along[0], along[1], 0]} len={L(applied)} color={NEWTON_COLORS.applied} />
          <Label text="F" position={tip(along, applied)} size={0.6} color={NEWTON_COLORS.applied} />
          {Math.abs(friction) > 1e-6 && (
            <>
              <Arrow origin={[cx, cy, 0.8]} dir={[frictionDir[0], frictionDir[1], 0]} len={L(Math.abs(friction))} color={NEWTON_COLORS.friction} />
              <Label text="f" position={tip(frictionDir, Math.abs(friction))} size={0.6} color={NEWTON_COLORS.friction} />
            </>
          )}
          {/* Newton's 3rd law: the block pushes on the surface with N' = N, opposite to N */}
          <DashedArrow from={contact} dir={[-norm[0], -norm[1]]} len={L(normal)} color={NEWTON_COLORS.reaction} />
          <Label
            text="N'"
            position={[contact[0] - norm[0] * (L(normal) + 0.35) + 0.3, contact[1] - norm[1] * (L(normal) + 0.35), 0.3]}
            size={0.55}
            color={NEWTON_COLORS.reaction}
          />
        </group>
      )}
    </group>
  )
}
