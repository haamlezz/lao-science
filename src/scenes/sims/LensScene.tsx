import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Arrow } from '../Arrow'
import { Label } from '../Label'
import { OBJECT_HEIGHT_CM, imageOf, principalRays } from '../../sims/lens'
import type { LensType, Point } from '../../sims/lens'

export const LENS_COLORS = {
  lens: '#80deea',
  object: '#ffd54f',
  image: '#ce93d8',
  parallel: '#ffb74d',
  centre: '#81c784',
  focal: '#64b5f6',
  axis: '#90a4ae',
}

const XV = 6.4 // half width of the drawing area (units)
const YV = 4.4 // half height
const SY = 0.65 // units per cm vertically (exaggerated)
const HL = 3.6 // half height of the lens

type V2 = [number, number]
type V3 = [number, number, number]

/** Liang-Barsky: part of segment a-b inside the box, or null. */
function clip(a: V2, b: V2): [V2, V2] | null {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  let t0 = 0
  let t1 = 1
  const test = (p: number, q: number) => {
    if (p === 0) return q >= 0
    const r = q / p
    if (p < 0) {
      if (r > t1) return false
      if (r > t0) t0 = r
    } else {
      if (r < t0) return false
      if (r < t1) t1 = r
    }
    return true
  }
  if (!(test(-dx, a[0] + XV) && test(dx, XV - a[0]) && test(-dy, a[1] + YV) && test(dy, YV - a[1]))) return null
  return [
    [a[0] + t0 * dx, a[1] + t0 * dy],
    [a[0] + t1 * dx, a[1] + t1 * dy],
  ]
}

function LensBody({ type }: { type: LensType }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    if (type === 'convex') {
      s.moveTo(0, HL)
      s.quadraticCurveTo(0.7, 0, 0, -HL)
      s.quadraticCurveTo(-0.7, 0, 0, HL)
    } else {
      s.moveTo(-0.3, HL)
      s.lineTo(0.3, HL)
      s.quadraticCurveTo(0, 0, 0.3, -HL)
      s.lineTo(-0.3, -HL)
      s.quadraticCurveTo(0, 0, -0.3, HL)
    }
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: false, curveSegments: 16 })
    g.translate(0, 0, -0.25)
    return g
  }, [type])
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={LENS_COLORS.lens} transparent opacity={0.55} depthWrite={false} />
    </mesh>
  )
}

/** True when the image lies outside the drawn area (u close to f, or very large |v|). */
export function imageOffView(type: LensType, f: number, u: number): boolean {
  const info = imageOf(type, f, u)
  if (info.atInfinity || info.v === null) return false
  const extent = Math.max(u * 1.15, f * 2.6)
  return Math.abs(info.v * (XV / extent)) > XV - 0.25
}

interface Props {
  type: LensType
  f: number // |f|, cm
  u: number // cm
}

export function LensScene({ type, f, u }: Props) {
  const info = imageOf(type, f, u)
  // horizontal scale adapts so object, foci and (most) images stay inside the view at every slider value
  const extent = Math.max(u * 1.15, f * 2.6)
  const sx = XV / extent
  const rays = principalRays(type, f, u, extent)
  const toU = (p: Point): V2 => [p.x * sx, p.y * SY]

  const drawRay = (r: NonNullable<typeof rays.focal>, color: string, key: string) => {
    const segs: { pts: [V2, V2]; dashed: boolean }[] = []
    const add = (s: [Point, Point], dashed: boolean) => {
      const c = clip(toU(s[0]), toU(s[1]))
      if (c) segs.push({ pts: c, dashed })
    }
    add(r.incoming, false)
    add(r.outgoing, false)
    if (r.virtualBack) add(r.virtualBack, true)
    return segs.map((s, i) => (
      <Line
        key={`${key}${i}`}
        points={s.pts.map((p): V3 => [p[0], p[1], 0.1])}
        color={color}
        lineWidth={s.dashed ? 2 : 2.8}
        dashed={s.dashed}
        dashSize={0.18}
        gapSize={0.14}
      />
    ))
  }

  // image
  let image: ReactNode = null
  let offView = false
  if (!info.atInfinity && info.v !== null && info.imageHeight !== null) {
    const x = info.v * sx
    const yRaw = info.imageHeight * SY
    const clipped = Math.abs(yRaw) > YV - 0.2
    const y = Math.max(-(YV - 0.2), Math.min(YV - 0.2, yRaw))
    if (Math.abs(x) > XV - 0.25) {
      offView = true
    } else if (info.real) {
      image = clipped ? (
        <Line points={[[x, 0, 0], [x, y, 0]]} color={LENS_COLORS.image} lineWidth={4} />
      ) : (
        <Arrow origin={[x, 0, 0]} dir={[0, Math.sign(y), 0]} len={Math.abs(y)} color={LENS_COLORS.image} />
      )
    } else {
      const sg = Math.sign(y) || 1
      image = (
        <group>
          <Line points={[[x, 0, 0], [x, y, 0]]} color={LENS_COLORS.image} lineWidth={3} dashed dashSize={0.16} gapSize={0.12} />
          {!clipped && (
            <Line
              points={[[x - 0.22, y - sg * 0.4, 0], [x, y, 0], [x + 0.22, y - sg * 0.4, 0]]}
              color={LENS_COLORS.image}
              lineWidth={3}
              dashed
              dashSize={0.1}
              gapSize={0.08}
            />
          )}
        </group>
      )
    }
  }

  const ticks = [f, 2 * f]
  return (
    <group>
      <Line points={[[-XV, 0, 0], [XV, 0, 0]]} color={LENS_COLORS.axis} lineWidth={1.5} />
      {ticks.flatMap((d, i) =>
        [-1, 1].map((s) => (
          <group key={`${i}${s}`}>
            <Line points={[[s * d * sx, -0.18, 0], [s * d * sx, 0.18, 0]]} color={LENS_COLORS.axis} lineWidth={3} />
            <Label text={i === 0 ? 'F' : '2F'} position={[s * d * sx, -0.7, 0]} size={0.55} color="#eceff1" bg="rgba(11, 27, 43, 0.9)" />
          </group>
        )),
      )}
      <LensBody type={type} />

      <Arrow origin={[-u * sx, 0, 0]} dir={[0, 1, 0]} len={OBJECT_HEIGHT_CM * SY} color={LENS_COLORS.object} />

      {drawRay(rays.parallel, LENS_COLORS.parallel, 'p')}
      {drawRay(rays.centre, LENS_COLORS.centre, 'c')}
      {/* the ray through the focus is dropped when it would meet the lens plane outside the lens */}
      {rays.focal && Math.abs(rays.focal.incoming[1].y * SY) <= HL && drawRay(rays.focal, LENS_COLORS.focal, 'f')}
      {image}
      {info.atInfinity && <Label text="∞" position={[XV - 0.8, 0.7, 0]} size={0.7} color={LENS_COLORS.image} />}
      {offView && info.v !== null && (
        <Label
          text={`v = ${info.v.toFixed(0)} cm ${info.v > 0 ? '>>' : '<<'}`}
          position={[(info.v > 0 ? 1 : -1) * (XV - 1.6), 0.7, 0]}
          size={0.45}
          color={LENS_COLORS.image}
          bg="#37474f"
        />
      )}
    </group>
  )
}
