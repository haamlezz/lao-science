import { useLayoutEffect, useMemo } from 'react'
import type { ReactElement } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { Arrow } from '../Arrow'
import {
  STRING_LENGTH,
  angularFrequency,
  antinodePositions,
  nodePositions,
  standingWavelength,
  standingY,
  superpositionY,
  travellingY,
  waveNumber,
} from '../../sims/wave'
import type { WaveMode } from '../../sims/wave'

export const WAVE_COLORS = { w1: '#4fc3f7', w2: '#ffb74d', sum: '#fff176', node: '#ef5350', antinode: '#ffd54f', particle: '#ff7043', axis: '#78909c' }

type P3 = [number, number, number]

const WINDOW_M = 6 // metres shown in the travelling / superposition views
const X_HALF = 7 // half width of the drawing in scene units
const Y_PER_A = 1.45 // scene units per unit of amplitude
const POINTS = 121
const GRID_X = 63 // ripple grid segments (<= 64 x 64 vertices)
const GRID_Z = 40
const SURF_W = 14
const SURF_D = 9
const RIPPLE_Y = 0.3 // scene units per unit of amplitude on the ripple surface
const SOURCE_SEP = 3.6 // scene units between the two point sources

export interface WaveProps {
  mode: WaveMode
  frequency: number
  wavelength: number
  amp1: number
  amp2: number
  phaseDeg: number
  harmonic: number
  stringSpeed: number
  t: number
  is2D: boolean
}

function Particle({ x, y }: { x: number; y: number }) {
  return (
    <mesh position={[x, y, 0.1]}>
      <sphereGeometry args={[0.22, 20, 14]} />
      <meshStandardMaterial color={WAVE_COLORS.particle} roughness={0.4} />
    </mesh>
  )
}

function travelling(p: WaveProps): ReactElement {
  const upm = (2 * X_HALF) / WINDOW_M
  const X = (m: number) => -X_HALF + m * upm
  const sup = p.mode === 'superposition'
  const xs = Array.from({ length: POINTS }, (_, i) => (i / (POINTS - 1)) * WINDOW_M)
  const line = (fn: (x: number) => number): P3[] => xs.map((x) => [X(x), fn(x) * Y_PER_A, 0])
  const y1 = (x: number) => travellingY(p.amp1, p.frequency, p.wavelength, x, p.t)
  const y2 = (x: number) => travellingY(p.amp2, p.frequency, p.wavelength, x, p.t, p.phaseDeg)
  const ysum = (x: number) => superpositionY(p.amp1, p.amp2, p.frequency, p.wavelength, p.phaseDeg, x, p.t)
  const main = sup ? ysum : y1
  const xp = WINDOW_M / 2
  // a crest of wave 1 (kx - wt = pi/2 + 2 pi m) shows that the pattern moves while the particle does not
  const k = waveNumber(p.wavelength)
  const crestX = ((Math.PI / 2 + angularFrequency(p.frequency) * p.t) % (2 * Math.PI)) / k
  return (
    <group>
      <Line points={[[-X_HALF, 0, 0], [X_HALF, 0, 0]]} color={WAVE_COLORS.axis} lineWidth={1} />
      {sup && <Line points={line(y1)} color={WAVE_COLORS.w1} lineWidth={2} />}
      {sup && <Line points={line(y2)} color={WAVE_COLORS.w2} lineWidth={2} />}
      <Line points={line(main)} color={sup ? WAVE_COLORS.sum : WAVE_COLORS.w1} lineWidth={sup ? 5 : 4} />
      <Line points={[[X(xp), -3, 0], [X(xp), 3, 0]]} color={WAVE_COLORS.axis} lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
      <Particle x={X(xp)} y={main(xp) * Y_PER_A} />
      {!sup && crestX <= WINDOW_M && (
        <mesh position={[X(crestX), p.amp1 * Y_PER_A, 0.1]}>
          <torusGeometry args={[0.28, 0.06, 8, 24]} />
          <meshStandardMaterial color={WAVE_COLORS.antinode} emissive={WAVE_COLORS.antinode} emissiveIntensity={0.5} />
        </mesh>
      )}
      <Arrow origin={[X_HALF - 2.4, 3.15, 0]} dir={[1, 0, 0]} len={1.6} color="#eceff1" />
      <Label text="v" position={[X_HALF - 0.5, 3.15, 0]} size={0.5} color="#eceff1" />
      {sup && (
        <>
          <Label text="y1" formula position={[-X_HALF + 0.6, -3.1, 0]} size={0.5} color={WAVE_COLORS.w1} />
          <Label text="y2" formula position={[-X_HALF + 1.6, -3.1, 0]} size={0.5} color={WAVE_COLORS.w2} />
          <Label text="y1 + y2" formula position={[-X_HALF + 3.2, -3.1, 0]} size={0.5} color={WAVE_COLORS.sum} />
        </>
      )}
    </group>
  )
}

function standing(p: WaveProps): ReactElement {
  const n = p.harmonic
  const lam = standingWavelength(n)
  const upm = (2 * X_HALF - 2) / STRING_LENGTH
  const X = (m: number) => -X_HALF + 1 + m * upm
  const xs = Array.from({ length: POINTS }, (_, i) => (i / (POINTS - 1)) * STRING_LENGTH)
  const f = (n * p.stringSpeed) / (2 * STRING_LENGTH)
  const y = (x: number) => standingY(p.amp1, f, lam, x, p.t) * Y_PER_A
  const env = (s: number) => xs.map((x): P3 => [X(x), s * 2 * p.amp1 * Math.abs(Math.sin(waveNumber(lam) * x)) * Y_PER_A, 0])
  const nodes = nodePositions(n)
  const anti = antinodePositions(n)
  return (
    <group>
      <Line points={[[X(0), 0, 0], [X(STRING_LENGTH), 0, 0]]} color={WAVE_COLORS.axis} lineWidth={1} />
      <Line points={env(1)} color={WAVE_COLORS.axis} lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
      <Line points={env(-1)} color={WAVE_COLORS.axis} lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
      <Line points={xs.map((x): P3 => [X(x), y(x), 0])} color={WAVE_COLORS.sum} lineWidth={5} />
      {[0, STRING_LENGTH].map((x) => (
        <mesh key={x} position={[X(x), 0, 0]}>
          <boxGeometry args={[0.35, 1.6, 0.6]} />
          <meshStandardMaterial color="#607d8b" />
        </mesh>
      ))}
      {nodes.map((x, i) => (
        <group key={`n${i}`}>
          <mesh position={[X(x), 0, 0.15]}>
            <sphereGeometry args={[0.17, 16, 12]} />
            <meshStandardMaterial color={WAVE_COLORS.node} emissive={WAVE_COLORS.node} emissiveIntensity={0.4} />
          </mesh>
          <Label text="N" position={[X(x), -0.6, 0]} size={0.5} color={WAVE_COLORS.node} />
        </group>
      ))}
      {anti.map((x, i) => (
        <group key={`a${i}`}>
          <mesh position={[X(x), y(x), 0.15]}>
            <sphereGeometry args={[0.2, 16, 12]} />
            <meshStandardMaterial color={WAVE_COLORS.antinode} emissive={WAVE_COLORS.antinode} emissiveIntensity={0.4} />
          </mesh>
          <Label text="A" position={[X(x), 2 * p.amp1 * Y_PER_A + 0.45, 0]} size={0.5} color={WAVE_COLORS.antinode} />
        </group>
      ))}
    </group>
  )
}

/** Water-like ripple surface from two point sources (3D view of travelling / superposition). */
function Ripple({ p }: { p: WaveProps }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(SURF_W, SURF_D, GRID_X, GRID_Z)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
  useLayoutEffect(() => () => geo.dispose(), [geo])
  const upm = (2 * X_HALF) / WINDOW_M
  const two = p.mode === 'superposition'
  useLayoutEffect(() => {
    const pos = geo.attributes.position as THREE.BufferAttribute
    const s1x = -SOURCE_SEP / 2
    const s2x = SOURCE_SEP / 2
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const r1 = Math.hypot(x - s1x, z) / upm
      let y = travellingY(p.amp1, p.frequency, p.wavelength, r1, p.t)
      if (two) {
        const r2 = Math.hypot(x - s2x, z) / upm
        y += travellingY(p.amp2, p.frequency, p.wavelength, r2, p.t, p.phaseDeg)
      }
      pos.setY(i, y * RIPPLE_Y)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })
  return (
    <group rotation={[0.85, 0, 0]} scale={0.75} position={[0, 0.3, 0]}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#29b6f6" roughness={0.35} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {[-SOURCE_SEP / 2, ...(two ? [SOURCE_SEP / 2] : [])].map((x, i) => (
        <group key={i} position={[x, 0.15, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 12]} />
            <meshStandardMaterial color={i === 0 ? WAVE_COLORS.w1 : WAVE_COLORS.w2} emissive="#ffffff" emissiveIntensity={0.3} />
          </mesh>
          <Label text={i === 0 ? 'S1' : 'S2'} formula position={[0, 0.7, 0]} size={0.6} color="#ffffff" />
        </group>
      ))}
    </group>
  )
}

/** 2D: wave line(s) with a marked particle. 3D: ripple surface (travelling / superposition) or the standing string. */
export function WaveScene(p: WaveProps) {
  if (p.mode === 'standing') return standing(p)
  if (p.is2D) return travelling(p)
  return <Ripple p={p} />
}
