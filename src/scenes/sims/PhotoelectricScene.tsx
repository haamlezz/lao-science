import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { VISIBLE_RANGE, hydrogenLevel, isVisible, spectralRegion, transitionWavelength, wavelengthColor } from '../../sims/photoelectric'
import type { MetalKey } from '../../sims/photoelectric'
import { Dial } from './InductionScene'

export const PHOTO_COLORS = {
  electron: '#4dd0e1',
  plate: { Cs: '#d4af37', Na: '#b0bec5', Zn: '#90a4ae', Cu: '#c8794b' } as Record<MetalKey, string>,
  collector: '#78909c',
  level: '#90a4ae',
  active: '#ffd54f',
  photonDim: '#9e9e9e',
}

/** Level n on the diagram: spacing shrinks towards the limit (not to scale; the energies are printed). */
const LEVEL_TOP = 3.0
const LEVEL_BOT = -3.0
const levelY = (n: number) => LEVEL_BOT + ((LEVEL_TOP - LEVEL_BOT) * (1 - 1 / Math.sqrt(n))) / (1 - 1 / Math.sqrt(6))

const MAX_FLOW = 10
const FULL_SCALE_VS = 5 // volts at full deflection

interface PhotoProps {
  metal: MetalKey
  wavelength: number
  intensity: number
  emits: boolean
  kMax: number
  stoppingVoltage: number
  showVs: boolean
}

const LAMP: [number, number] = [-6.3, 1.9]
const PLATE_Y = -2.2
const COLLECTOR_Y = 2.4
const PLATE_X0 = -3.4
const PLATE_W = 6.4

function Photons({ count, color, from }: { count: number; color: string; from: [number, number] }) {
  const refs = useRef<(THREE.Group | null)[]>([])
  useFrame((state) => {
    const tt = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const g = refs.current[i]
      if (!g) continue
      const hitX = PLATE_X0 + (PLATE_W * (i + 0.5)) / Math.max(count, 1)
      const p = (tt * 0.45 + i / Math.max(count, 1)) % 1
      g.position.set(from[0] + (hitX - from[0]) * p, from[1] + (PLATE_Y + 0.2 - from[1]) * p, 0.4)
      g.rotation.z = Math.atan2(PLATE_Y + 0.2 - from[1], hitX - from[0]) - Math.PI / 2
    }
  })
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} ref={(el) => void (refs.current[i] = el)}>
          <mesh position={[0, -0.12, 0]}>
            <coneGeometry args={[0.13, 0.28, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Electrons({ count, kMax }: { count: number; kMax: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame((state) => {
    const tt = state.clock.elapsedTime
    const speed = 0.3 + 0.3 * Math.sqrt(kMax) // drawn speed grows with K_max (illustrative)
    for (let i = 0; i < count; i++) {
      const m = refs.current[i]
      if (!m) continue
      const p = (tt * speed + i * 0.37) % 1
      const x = PLATE_X0 + (PLATE_W * (i + 0.5)) / Math.max(count, 1)
      m.position.set(x + 0.25 * p, PLATE_Y + 0.35 + p * (COLLECTOR_Y - PLATE_Y - 0.7), 0.4)
    }
  })
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(el) => void (refs.current[i] = el)}>
          <sphereGeometry args={[0.13, 12, 8]} />
          <meshStandardMaterial color={PHOTO_COLORS.electron} emissive={PHOTO_COLORS.electron} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </>
  )
}

/** Light on a metal plate in a vacuum: photons arrive, electrons leave only when E > W0. */
export function PhotoelectricScene({ metal, wavelength, intensity, emits, kMax, stoppingVoltage, showVs }: PhotoProps) {
  const color = wavelengthColor(wavelength)
  const n = Math.min(Math.max(Math.round(intensity), 0), MAX_FLOW)
  const dx = PLATE_X0 + PLATE_W / 2
  return (
    <group>
      <mesh position={[dx, PLATE_Y, 0]}>
        <boxGeometry args={[PLATE_W, 0.35, 2]} />
        <meshStandardMaterial color={PHOTO_COLORS.plate[metal]} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[dx, COLLECTOR_Y, 0]}>
        <boxGeometry args={[PLATE_W, 0.25, 2]} />
        <meshStandardMaterial color={PHOTO_COLORS.collector} metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[dx, (PLATE_Y + COLLECTOR_Y) / 2, 0]}>
        <boxGeometry args={[PLATE_W + 0.8, COLLECTOR_Y - PLATE_Y + 0.9, 2.4]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <Label text={metal} position={[PLATE_X0 - 0.9, PLATE_Y, 0.3]} size={0.7} color={PHOTO_COLORS.plate[metal]} />
      <mesh position={[LAMP[0], LAMP[1], 0]} rotation={[0, 0, -0.75]}>
        <coneGeometry args={[0.55, 1.1, 20]} />
        <meshStandardMaterial color={n > 0 ? color : '#546e7a'} emissive={n > 0 ? color : '#000000'} emissiveIntensity={0.8} />
      </mesh>
      <Photons count={n} color={color} from={[LAMP[0] + 0.6, LAMP[1] - 0.5]} />
      {emits && n > 0 && <Electrons count={n} kMax={kMax} />}
      {showVs && (
        <>
          <Line points={[[PLATE_X0 + PLATE_W + 0.3, PLATE_Y, 0], [6.0, PLATE_Y, 0], [6.0, -0.35, 0]]} color="#b0bec5" lineWidth={2} />
          <Line points={[[PLATE_X0 + PLATE_W + 0.3, COLLECTOR_Y, 0], [6.0, COLLECTOR_Y, 0], [6.0, 1.5, 0]]} color="#b0bec5" lineWidth={2} />
          <Dial position={[6.0, 0.55, 0]} value={(2 * stoppingVoltage) / FULL_SCALE_VS - 1} label="Vs" marks={false} />
        </>
      )}
    </group>
  )
}

interface SpectrumProps {
  nInitial: number
  nFinal: number
}

const STRIP_X0 = 0.4
const STRIP_W = 7.0
const STRIP_Y = -1.9
const SEGMENTS = 36
const STRIP_RANGE = VISIBLE_RANGE.max - VISIBLE_RANGE.min

const stripX = (nm: number) => STRIP_X0 + (STRIP_W * (nm - VISIBLE_RANGE.min)) / STRIP_RANGE

/** Energy-level diagram of hydrogen, one jump, and where the emitted photon falls on the visible spectrum. */
export function SpectrumScene({ nInitial, nFinal }: SpectrumProps) {
  const lambda = transitionWavelength(nInitial, nFinal)
  const region = spectralRegion(lambda)
  const visible = isVisible(lambda)
  const col = wavelengthColor(lambda)
  const ptrNm = Math.min(Math.max(lambda, VISIBLE_RANGE.min), VISIBLE_RANGE.max)
  const ptrX = stripX(ptrNm)
  const yi = levelY(nInitial)
  const yf = levelY(nFinal)
  const jumpX = -2.6
  const midY = (yi + yf) / 2
  const dxp = ptrX - jumpX
  const dyp = STRIP_Y + 0.9 - midY
  const len = Math.hypot(dxp, dyp)
  const wave: [number, number, number][] = Array.from({ length: 61 }, (_, i) => {
    const s = i / 60
    const off = 0.16 * Math.sin(s * len * 4.5)
    return [jumpX + dxp * s - (dyp / len) * off, midY + dyp * s + (dxp / len) * off, 0.2]
  })
  const otherLines = Array.from({ length: 6 - nFinal }, (_, i) => nFinal + 1 + i)
    .map((ni) => ({ ni, nm: transitionWavelength(ni, nFinal) }))
    .filter((o) => isVisible(o.nm))
  return (
    <group>
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[16, 7.2, 0.08]} />
        <meshStandardMaterial color="#12324a" transparent opacity={0.55} />
      </mesh>
      {[1, 2, 3, 4, 5, 6].map((n) => {
        const on = n === nInitial || n === nFinal
        return (
          <group key={n}>
            <Line points={[[-6.4, levelY(n), 0], [-1.6, levelY(n), 0]]} color={on ? PHOTO_COLORS.active : PHOTO_COLORS.level} lineWidth={on ? 4 : 2} />
            <Label text={`n=${n}`} position={[-7.1, levelY(n), 0]} size={0.36} color={on ? PHOTO_COLORS.active : '#b0bec5'} />
            <Label text={`${hydrogenLevel(n).toFixed(2)} eV`} position={[-0.55, levelY(n), 0]} size={0.34} color={on ? PHOTO_COLORS.active : '#78909c'} />
          </group>
        )
      })}
      <mesh position={[-6.4 + 0.5, yi + 0.12, 0.1]}>
        <sphereGeometry args={[0.14, 12, 8]} />
        <meshStandardMaterial color={PHOTO_COLORS.electron} emissive={PHOTO_COLORS.electron} emissiveIntensity={0.6} />
      </mesh>
      <Line points={[[jumpX, yi, 0.1], [jumpX, yf + 0.08, 0.1]]} color="#ffffff" lineWidth={3} />
      <mesh position={[jumpX, yf + 0.15, 0.1]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.16, 0.3, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Line points={wave} color={visible ? col : '#cfd8dc'} lineWidth={4} />

      {Array.from({ length: SEGMENTS }, (_, i) => {
        const nm = VISIBLE_RANGE.min + ((i + 0.5) / SEGMENTS) * STRIP_RANGE
        return (
          <mesh key={i} position={[STRIP_X0 + ((i + 0.5) / SEGMENTS) * STRIP_W, STRIP_Y, 0]}>
            <boxGeometry args={[STRIP_W / SEGMENTS + 0.01, 0.6, 0.1]} />
            <meshBasicMaterial color={wavelengthColor(nm)} />
          </mesh>
        )
      })}
      {[400, 500, 600, 700].map((nm) => (
        <Label key={nm} text={String(nm)} position={[stripX(nm), STRIP_Y - 0.65, 0]} size={0.4} color="#cfd8dc" />
      ))}
      <Label text="nm" position={[STRIP_X0 + STRIP_W + 0.4, STRIP_Y - 0.65, 0]} size={0.4} color="#a9c2d6" />
      {otherLines.map((o) => (
        <mesh key={o.ni} position={[stripX(o.nm), STRIP_Y, 0.1]}>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshBasicMaterial color={o.ni === nInitial ? '#ffffff' : '#000000'} />
        </mesh>
      ))}
      <mesh position={[ptrX, STRIP_Y + 0.55, 0.15]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.2, 0.4, 10]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <Label
        text={`${Math.round(lambda)} nm${visible ? '' : region === 'ultraviolet' ? ' UV' : ' IR'}`}
        position={[Math.min(Math.max(ptrX, STRIP_X0 + 1.2), STRIP_X0 + STRIP_W - 1.2), STRIP_Y + 1.35, 0.2]}
        size={0.5}
        color="#ffffff"
      />
    </group>
  )
}
