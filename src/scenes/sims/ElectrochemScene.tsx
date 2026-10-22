import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { HALF_CELLS } from '../../sims/electrochem'
import type { Metal } from '../../sims/electrochem'
import { ELEMENT_COLORS, Slab, ionLabel } from './chemShared'

export const EC_COLORS = { electron: '#ffd54f', cation: '#ab47bc', anion: '#66bb6a' }

const SOLUTION: Record<Metal, string> = { Mg: '#cfd8dc', Zn: '#cfd8dc', Fe: '#a5d6a7', Cu: '#4fc3f7', Ag: '#e0e0e0' }
const CX = 3.2 // beaker centre offset
const WIRE_Y = 2.6
const BRIDGE_Y = 0.95

const dummy = new THREE.Object3D()
const col = new THREE.Color()

type P3 = [number, number, number]

/** Position at fraction u (0..1) along a polyline. */
function along(path: P3[], u: number): P3 {
  const seg = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]))
  const total = seg.reduce((a, b) => a + b, 0)
  let d = ((u % 1) + 1) % 1 * total
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const f = seg[i] === 0 ? 0 : d / seg[i]
      return [path[i][0] + (path[i + 1][0] - path[i][0]) * f, path[i][1] + (path[i + 1][1] - path[i][1]) * f, path[i][2]]
    }
    d -= seg[i]
  }
  return path[path.length - 1]
}

/** Moving dots along paths: electrons in the wire (anode -> cathode), ions in the salt bridge. */
function Flow({ wire, bridge, running }: { wire: P3[]; bridge: P3[]; running: boolean }) {
  const eRef = useRef<THREE.InstancedMesh>(null)
  const iRef = useRef<THREE.InstancedMesh>(null)
  const u = useRef(0)
  const NE = 8
  const NI = 6
  useFrame((_, dt) => {
    if (running) u.current += Math.min(dt, 0.1) * 0.22
    const e = eRef.current
    const ion = iRef.current
    if (!e || !ion) return
    e.visible = running
    ion.visible = running
    if (!running) return
    for (let i = 0; i < NE; i++) {
      const p = along(wire, u.current + i / NE)
      dummy.position.set(p[0], p[1], 0.2)
      dummy.updateMatrix()
      e.setMatrixAt(i, dummy.matrix)
    }
    e.instanceMatrix.needsUpdate = true
    // anions travel towards the anode (wire start side), cations towards the cathode
    for (let i = 0; i < NI; i++) {
      const forward = i % 2 === 0
      const f = (u.current * 0.8 + i / NI) % 1
      const p = along(bridge, forward ? f : 1 - f)
      dummy.position.set(p[0], p[1], 0.25)
      dummy.updateMatrix()
      ion.setMatrixAt(i, dummy.matrix)
      ion.setColorAt(i, col.set(forward ? EC_COLORS.cation : EC_COLORS.anion))
    }
    ion.instanceMatrix.needsUpdate = true
    if (ion.instanceColor) ion.instanceColor.needsUpdate = true
  })
  return (
    <>
      <instancedMesh ref={eRef} args={[undefined, undefined, NE]} frustumCulled={false}>
        <sphereGeometry args={[0.12, 10, 8]} />
        <meshStandardMaterial color={EC_COLORS.electron} emissive={EC_COLORS.electron} emissiveIntensity={0.6} />
      </instancedMesh>
      <instancedMesh ref={iRef} args={[undefined, undefined, NI]} frustumCulled={false}>
        <sphereGeometry args={[0.14, 10, 8]} />
        <meshStandardMaterial />
      </instancedMesh>
    </>
  )
}

interface Props {
  left: Metal
  right: Metal
  anode: Metal
  emf: number
  closed: boolean
  running: boolean
  progress: number // 0..1 electrode change
}

function Beaker({ x, metal, role, progress }: { x: number; metal: Metal; role: 'anode' | 'cathode'; progress: number }) {
  const h = role === 'anode' ? 2.8 * (1 - 0.3 * progress) : 2.8 * (1 + 0.1 * progress)
  const w = role === 'cathode' ? 0.5 + 0.18 * progress : 0.5
  const pts: P3[] = [[x - 1.5, 0.8, 0], [x - 1.5, -2.2, 0], [x + 1.5, -2.2, 0], [x + 1.5, 0.8, 0]]
  const topY = 1.7 // electrode top stays at the wire
  return (
    <group>
      <mesh position={[x, -0.7, 0]}>
        <boxGeometry args={[2.9, 2.8, 0.9]} />
        <meshStandardMaterial color={SOLUTION[metal]} transparent opacity={0.5} />
      </mesh>
      <Line points={pts} color="#eceff1" lineWidth={3} />
      <mesh position={[x - 0.4, topY - h / 2, 0]}>
        <boxGeometry args={[w, h, 0.4]} />
        <meshStandardMaterial color={ELEMENT_COLORS[metal] ?? '#b0bec5'} roughness={0.5} metalness={0.3} />
      </mesh>
      <Label text={`${metal} (${role === 'anode' ? '-' : '+'})`} position={[x, -2.8, 0.3]} size={0.55} color="#ffffff" />
      <Label text={ionLabel(metal, HALF_CELLS[metal].charge)} position={[x + 0.7, -1.2, 0.5]} size={0.45} color="#102a43" bg="#ffffffcc" />
    </group>
  )
}

export function ElectrochemScene({ left, right, anode, emf, closed, running, progress }: Props) {
  const xa = anode === left ? -CX : CX // anode electrode wire end
  const xc = -xa
  const wireAnode = xa - 0.4
  const wireCathode = xc - 0.4
  const wire = useMemo<P3[]>(
    () => [[wireAnode, 1.7, 0], [wireAnode, WIRE_Y, 0], [wireCathode, WIRE_Y, 0], [wireCathode, 1.7, 0]],
    [wireAnode, wireCathode],
  )
  // salt bridge from the anode beaker to the cathode beaker; cations flow with the path, anions against it
  const bridge = useMemo<P3[]>(
    () => [[xa * 0.7, -0.6, 0], [xa * 0.7, BRIDGE_Y, 0], [xc * 0.7, BRIDGE_Y, 0], [xc * 0.7, -0.6, 0]],
    [xa, xc],
  )
  return (
    <group>
      <Slab w={11.4} h={7} y={0} />
      <Beaker x={-CX} metal={left} role={left === anode ? 'anode' : 'cathode'} progress={closed && progress > 0 ? progress : 0} />
      <Beaker x={CX} metal={right} role={right === anode ? 'anode' : 'cathode'} progress={closed && progress > 0 ? progress : 0} />
      <Line points={bridge} color="#b39ddb" lineWidth={9} />
      <Line points={wire} color={closed ? '#ffcc80' : '#78909c'} lineWidth={3} dashed={!closed} dashSize={0.2} gapSize={0.15} />
      <mesh position={[0, WIRE_Y, -0.05]}>
        <boxGeometry args={[2.2, 0.95, 0.3]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      <Label text={`${emf.toFixed(2)} V`} position={[0, WIRE_Y, 0.2]} size={0.5} color="#a5d6a7" />
      <Flow wire={wire} bridge={bridge} running={running && closed} />
    </group>
  )
}
