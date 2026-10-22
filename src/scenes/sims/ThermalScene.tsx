import { useMemo } from 'react'
import * as THREE from 'three'
import { Label } from '../Label'
import { EXAGGERATION, START_C, linearExpansion } from '../../sims/thermal'
import type { Solid } from '../../sims/thermal'

export const THERMAL_COLORS = { solid: '#ef5350', liquid: '#d81b60', gas: '#ffb74d' }

const BAR_UNITS = 2.8 // drawn length of the 1 m bar
const COLD = new THREE.Color('#4fc3f7')
const HOT = new THREE.Color('#ff5722')

const heat = (tC: number) => COLD.clone().lerp(HOT, THREE.MathUtils.clamp((tC - 0) / 100, 0, 1))

function Flame({ x, tC }: { x: number; tC: number }) {
  const s = Math.max(0.15, (tC - 0) / 100)
  return (
    <mesh position={[x, -1.95 + s * 0.35, 0]} scale={[1, s, 1]}>
      <coneGeometry args={[0.35, 0.9, 12]} />
      <meshStandardMaterial color="#ff9800" emissive="#ff6d00" emissiveIntensity={0.6} />
    </mesh>
  )
}

interface Props {
  material: Solid
  tC: number
  barMm: number // true expansion of the 1 m bar, mm (display)
  liquidFraction: number
  gasRatio: number
}

/** Three panels: bar (left), thermometer (middle), gas syringe (right). Expansion is drawn EXAGGERATION x larger. */
export function ThermalScene({ material, tC, barMm, liquidFraction, gasRatio }: Props) {
  const color = useMemo(() => heat(tC), [tC])
  const barExtra = linearExpansion(material, 1, tC - START_C) * EXAGGERATION * BAR_UNITS
  const barLen = Math.max(0.3, BAR_UNITS + barExtra)
  const barX0 = -6.6 // fixed left end
  const colH = Math.max(0.15, 1.0 + liquidFraction * 10)
  const gasLen = 1.9 * gasRatio

  return (
    <group>
      {/* (a) bar fixed at a wall; the ruler mark shows where the end was at 20 C */}
      <mesh position={[barX0 - 0.15, 0, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.8]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      <mesh position={[barX0 + barLen / 2, 0, 0]}>
        <boxGeometry args={[barLen, 0.4, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[barX0 + BAR_UNITS, 0.55, 0]}>
        <boxGeometry args={[0.05, 0.8, 0.2]} />
        <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
      <Flame x={barX0 + 1.4} tC={tC} />
      <Label text={material === 'steel' ? 'Steel 1 m' : material === 'copper' ? 'Copper 1 m' : 'Aluminium 1 m'} position={[barX0 + 1.8, 1.55, 0]} size={0.6} />
      <Label text={`+${barMm.toFixed(2)} mm`} position={[barX0 + 2.2, -0.75, 0]} size={0.6} color="#fff" bg="#37474f" />

      {/* (b) thermometer: bulb + tube, column height is exaggerated */}
      <group position={[-0.6, 0, 0]}>
        <mesh position={[0, -1.1, 0]}>
          <sphereGeometry args={[0.38, 20, 14]} />
          <meshStandardMaterial color={THERMAL_COLORS.liquid} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 4.3, 20]} />
          <meshStandardMaterial color="#cfd8dc" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <mesh position={[0, -1.1 + colH / 2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, colH, 12]} />
          <meshStandardMaterial color={THERMAL_COLORS.liquid} />
        </mesh>
        <Flame x={0} tC={tC} />
        <Label text="Alcohol" position={[0, 3.4, 0]} size={0.6} />
        <Label text={`+${(liquidFraction * 100).toFixed(1)} %`} position={[1.5, -1.1 + colH, 0]} size={0.6} color="#fff" bg="#37474f" />
      </group>

      {/* (c) gas syringe: horizontal barrel, plunger moves out as the gas expands */}
      <group position={[4.2, 0, 0]}>
        <mesh position={[-1.2 + 2.6 / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.55, 0.55, 2.6, 24, 1, true]} />
          <meshStandardMaterial color="#cfd8dc" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh position={[-1.2 + gasLen / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, gasLen, 24]} />
          <meshStandardMaterial color={THERMAL_COLORS.gas} transparent opacity={0.75} />
        </mesh>
        <mesh position={[-1.2 + gasLen + 0.1, 0, 0]}>
          <boxGeometry args={[0.2, 1.1, 0.9]} />
          <meshStandardMaterial color="#455a64" />
        </mesh>
        <Flame x={0} tC={tC} />
        <Label text="Gas" position={[0.3, 1.5, 0]} size={0.6} />
        <Label text={`V x${gasRatio.toFixed(2)}`} position={[0.3, -0.95, 0]} size={0.6} color="#fff" bg="#37474f" />
      </group>
    </group>
  )
}
