import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { Label } from '../Label'
import { Dots, r2 } from './BioParts'
import type { V3 } from './BioParts'

export const SEL_COLORS = {
  green: '#43a047',
  brown: '#6d4c41',
  barBrown: '#a1887f',
  bgGreen: '#9ccc65',
  bgBrown: '#bcaaa4',
  bird: '#e53935',
}

const FX0 = -6.3
const FX1 = -1.0
const FY0 = -2.45
const FY1 = 2.45
const CX0 = 0.95
const CX1 = 5.75
const CY0 = -2.3
const CY1 = 2.3
const MAX_GEN = 10
const N = 100

function Bird({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    if (active) t.current += dt
    if (ref.current) ref.current.position.set((FX0 + FX1) / 2 + Math.sin(t.current * 1.4) * 2.2, FY1 - 0.15 + Math.sin(t.current * 2.8) * 0.12, 0.6)
  })
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI]} scale={[1, 1, 0.5]}>
        <coneGeometry args={[0.28, 0.6, 3]} />
        <meshStandardMaterial color={SEL_COLORS.bird} />
      </mesh>
    </group>
  )
}

interface Props {
  background: 'green' | 'brown'
  /** Green share per generation, index 0..10. */
  series: number[]
  gen: number
  /** The predator flies while the run plays. */
  playing: boolean
}

/** Left: 100 beetles on the background (colour share = p of the current generation). Right: stacked bars + line of p. */
export function SelectionScene({ background, series, gen, playing }: Props) {
  const p = series[Math.min(gen, series.length - 1)] ?? 0
  const nGreen = Math.round(p * N)
  const pos = useMemo<V3[]>(
    () =>
      Array.from({ length: N }, (_, i) => {
        const [u, v] = r2(i + 1)
        return [FX0 + 0.25 + u * (FX1 - FX0 - 0.5), FY0 + 0.25 + v * (FY1 - FY0 - 0.9), 0.15] as V3
      }),
    [],
  )
  const px = (g: number) => CX0 + 0.3 + ((CX1 - CX0 - 0.6) * g) / MAX_GEN
  const py = (v: number) => CY0 + (CY1 - CY0) * v
  const linePts = (upTo: number): V3[] => series.slice(0, upTo + 1).map((v, g) => [px(g), py(v), 0.3] as V3)

  return (
    <group position={[0, 0.15, 0]}>
      <mesh position={[(FX0 + FX1) / 2, (FY0 + FY1) / 2, -0.1]}>
        <boxGeometry args={[FX1 - FX0, FY1 - FY0, 0.2]} />
        <meshStandardMaterial color={background === 'green' ? SEL_COLORS.bgGreen : SEL_COLORS.bgBrown} />
      </mesh>
      <Dots points={pos.slice(0, nGreen)} size={0.13} color={SEL_COLORS.green} cap={N} />
      <Dots points={pos.slice(nGreen)} size={0.13} color={SEL_COLORS.brown} cap={N} />
      <Bird active={playing} />

      {/* chart */}
      <mesh position={[(CX0 + CX1) / 2 + 0.3, (CY0 + CY1) / 2, -0.1]}>
        <boxGeometry args={[CX1 - CX0 + 1.5, CY1 - CY0 + 0.5, 0.1]} />
        <meshStandardMaterial color="#0d2236" />
      </mesh>
      {Array.from({ length: Math.min(gen, MAX_GEN) + 1 }, (_, g) => {
        const v = series[g] ?? 0
        const w = 0.36
        return (
          <group key={g}>
            <mesh position={[px(g), py(0) + ((py(v) - py(0)) / 2), 0]}>
              <boxGeometry args={[w, Math.max(py(v) - py(0), 0.001), 0.3]} />
              <meshStandardMaterial color={SEL_COLORS.green} />
            </mesh>
            <mesh position={[px(g), py(v) + (py(1) - py(v)) / 2, 0]}>
              <boxGeometry args={[w, Math.max(py(1) - py(v), 0.001), 0.3]} />
              <meshStandardMaterial color={SEL_COLORS.barBrown} />
            </mesh>
          </group>
        )
      })}
      {gen >= 1 && <Line points={linePts(Math.min(gen, MAX_GEN))} color="#ffeb3b" lineWidth={3} />}
      {linePts(Math.min(gen, MAX_GEN)).map((q, i) => (
        <mesh key={i} position={[q[0], q[1], 0.35]}>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshBasicMaterial color="#ffeb3b" />
        </mesh>
      ))}
      <Line points={[[CX0, CY1, 0.05], [CX0, CY0, 0.05], [CX1, CY0, 0.05]]} color="#eceff1" lineWidth={2} />
      <Label text="p" position={[CX0 - 0.1, CY1 + 0.45, 0.2]} size={0.5} />
      <Label text="gen" position={[CX1 + 0.65, CY0, 0.2]} size={0.42} color="#cfd8dc" />
      {[0, 5, 10].map((g) => (
        <Label key={g} text={String(g)} position={[px(g), CY0 - 0.33, 0.2]} size={0.4} color="#cfd8dc" />
      ))}
      {[0, 0.5, 1].map((v) => (
        <Label key={v} text={String(v)} position={[CX0 - 0.4, py(v), 0.2]} size={0.4} color="#cfd8dc" />
      ))}
    </group>
  )
}
