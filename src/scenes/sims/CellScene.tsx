import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Arrow } from '../Arrow'
import { Label } from '../Label'
import { Dots, Leader, r2 } from './BioParts'
import type { V3 } from './BioParts'
import { INSIDE_PERCENT, SOLUTION_PERCENT, getOrganelle, relativeVolume, waterDirection } from '../../sims/cell'
import type { CellType, OrganelleId, Solution, TransportCell } from '../../sims/cell'

export const CELL_COLORS: Record<OrganelleId, string> = {
  membrane: '#f48fb1',
  wall: '#9ccc65',
  nucleus: '#7e57c2',
  nucleoid: '#5c6bc0',
  mitochondrion: '#fb8c00',
  ribosome: '#eceff1',
  er: '#4dd0e1',
  golgi: '#ec407a',
  chloroplast: '#2e7d32',
  vacuole: '#4fc3f7',
}
const BODY: Record<CellType, string> = { animal: '#f8bbd0', plant: '#dcedc8', bacterium: '#ffe082' }
const HL = '#ffeb3b'

type Pick = (id: OrganelleId) => void

/** Semi-axes of the cell body (membrane) per type. */
const SEMI: Record<CellType, V3> = { animal: [2.1, 2.1, 2.1], plant: [2.7, 1.8, 1.8], bacterium: [2.6, 1.1, 1.1] }

const PLACE: Record<CellType, Partial<Record<OrganelleId, V3[]>>> = {
  animal: {
    nucleus: [[0.2, 0.3, 0]],
    er: [[0.2, 0.3, 0]],
    golgi: [[-1.15, -0.8, 0.5]],
    mitochondrion: [[1.2, -0.8, 0.4], [-0.2, -1.4, 0.3], [1.3, 1.0, 0.3]],
  },
  plant: {
    vacuole: [[0.4, -0.1, 0]],
    nucleus: [[-1.9, 0.9, 0.3]],
    er: [[-1.9, 0.9, 0.3]],
    golgi: [[-1.5, -1.0, 0.5]],
    chloroplast: [[1.75, 1.0, 0.5], [0.2, -1.3, 0.5], [2.0, -0.6, 0.4], [-0.4, 1.25, 0.4]],
    mitochondrion: [[-2.0, -0.1, 0.4], [-0.9, -1.3, 0.3]],
  },
  bacterium: { nucleoid: [[0, 0, 0]] },
}

interface LabelSpec {
  id: OrganelleId
  side: 1 | -1
  y: number
  /** Anchor override (the surface point for membrane / wall). */
  anchor?: V3
}

const LABELS: Record<CellType, LabelSpec[]> = {
  animal: [
    { id: 'nucleus', side: 1, y: 2.3, anchor: [0.8, 0.6, 0.3] },
    { id: 'mitochondrion', side: 1, y: 0.2 },
    { id: 'ribosome', side: 1, y: -2.0 },
    { id: 'membrane', side: -1, y: 2.3, anchor: [-1.5, 1.45, 0] },
    { id: 'er', side: -1, y: 0.7, anchor: [-0.75, 0.3, 0.2] },
    { id: 'golgi', side: -1, y: -1.5 },
  ],
  plant: [
    { id: 'wall', side: 1, y: 2.6, anchor: [2.85, 1.4, 0] },
    { id: 'vacuole', side: 1, y: 1.2, anchor: [1.9, 0.2, 0.3] },
    { id: 'chloroplast', side: 1, y: -0.2, anchor: [2.35, -0.6, 0.4] },
    { id: 'membrane', side: 1, y: -1.9, anchor: [2.2, -1.0, 0] },
    { id: 'nucleus', side: -1, y: 2.6, anchor: [-1.9, 1.4, 0.3] },
    { id: 'er', side: -1, y: 1.2, anchor: [-2.6, 0.9, 0.2] },
    { id: 'mitochondrion', side: -1, y: 0, anchor: [-2.4, -0.1, 0.4] },
    { id: 'golgi', side: -1, y: -1.2 },
    { id: 'ribosome', side: -1, y: -2.4 },
  ],
  bacterium: [
    { id: 'wall', side: 1, y: 1.6, anchor: [2.2, 0.85, 0] },
    { id: 'membrane', side: 1, y: -0.4, anchor: [2.1, -0.62, 0] },
    { id: 'nucleoid', side: -1, y: 1.4, anchor: [-0.4, 0.4, 0] },
    { id: 'ribosome', side: -1, y: -1.2 },
  ],
}

/** Ribosomes: points inside the cell, near the membrane, outside the big structures. */
function ribosomePoints(type: CellType): V3[] {
  const s = SEMI[type]
  const out: V3[] = []
  for (let i = 1; out.length < (type === 'bacterium' ? 22 : 16) && i < 400; i++) {
    const [u, v] = r2(i)
    const x = (u * 2 - 1) * s[0]
    const y = (v * 2 - 1) * s[1]
    const k = Math.hypot(x / s[0], y / s[1])
    if (k < (type === 'bacterium' ? 0.35 : 0.8) || k > 0.93) continue
    if (type === 'bacterium' && Math.abs(x) < 0.9 && Math.abs(y) < 0.8) continue
    out.push([x, y, 0.05 + 0.5 * Math.sin(i)])
  }
  return out
}

function Mat({ color, hl, opacity = 1 }: { color: string; hl: boolean; opacity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={hl ? HL : '#000000'}
      emissiveIntensity={hl ? 0.55 : 0}
      transparent={opacity < 1}
      opacity={opacity}
      roughness={0.55}
      depthWrite={opacity >= 1}
    />
  )
}

function OrganelleMesh({ id, pos, hl, type, i }: { id: OrganelleId; pos: V3; hl: boolean; type: CellType; i: number }) {
  const c = CELL_COLORS[id]
  if (id === 'nucleus') {
    const r = type === 'plant' ? 0.5 : 0.75
    return (
      <group position={pos}>
        <mesh>
          <sphereGeometry args={[r, 24, 16]} />
          <Mat color={c} hl={hl} />
        </mesh>
        <mesh position={[r * 0.25, r * 0.2, r * 0.7]}>
          <sphereGeometry args={[r * 0.28, 12, 8]} />
          <Mat color="#4527a0" hl={hl} />
        </mesh>
      </group>
    )
  }
  if (id === 'er') {
    const r = type === 'plant' ? 0.78 : 1.08
    return (
      <group position={pos}>
        <mesh rotation={[1.25, 0.2, 0]}>
          <torusGeometry args={[r, 0.08, 8, 32]} />
          <Mat color={c} hl={hl} />
        </mesh>
        <mesh rotation={[0.6, 0.9, 0.3]}>
          <torusGeometry args={[r * 0.92, 0.08, 8, 32]} />
          <Mat color={c} hl={hl} />
        </mesh>
      </group>
    )
  }
  if (id === 'golgi') {
    return (
      <group position={pos} rotation={[0, 0, 0.5]}>
        {[0, 1, 2, 3].map((k) => (
          <mesh key={k} position={[0, (k - 1.5) * 0.17, 0]} scale={[1, 1, 0.55]}>
            <cylinderGeometry args={[0.5 - k * 0.04, 0.5 - k * 0.04, 0.09, 20]} />
            <Mat color={c} hl={hl} />
          </mesh>
        ))}
      </group>
    )
  }
  if (id === 'mitochondrion') {
    return (
      <mesh position={pos} rotation={[0, 0, 0.6 + i * 1.1]} scale={[0.5, 0.26, 0.26]}>
        <sphereGeometry args={[1, 20, 12]} />
        <Mat color={c} hl={hl} />
      </mesh>
    )
  }
  if (id === 'chloroplast') {
    return (
      <mesh position={pos} rotation={[0, 0, 0.4 - i * 0.7]} scale={[0.48, 0.28, 0.28]}>
        <sphereGeometry args={[1, 20, 12]} />
        <Mat color={c} hl={hl} />
      </mesh>
    )
  }
  if (id === 'vacuole') {
    return (
      <mesh position={pos} scale={[1.5, 0.95, 0.95]}>
        <sphereGeometry args={[1, 28, 18]} />
        <Mat color={c} hl={hl} opacity={0.6} />
      </mesh>
    )
  }
  if (id === 'nucleoid') {
    return (
      <mesh position={pos} scale={[1.2, 0.9, 0.9]}>
        <torusKnotGeometry args={[0.42, 0.1, 64, 8]} />
        <Mat color={c} hl={hl} />
      </mesh>
    )
  }
  return null
}

interface SceneProps {
  type: CellType
  selected: OrganelleId | null
  cutaway: boolean
  onPick: Pick
}

/** Cell body (membrane), plant wall and structures. Cutaway removes a front wedge of the body. */
export function OrganelleScene({ type, selected, cutaway, onPick }: SceneProps) {
  const semi = SEMI[type]
  const wallEdges = useMemo(() => {
    if (type !== 'plant') return null
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(5.7, 3.9, 3.9))
  }, [type])
  const ribos = useMemo(() => ribosomePoints(type), [type])
  const labels = LABELS[type]
  const pick = (id: OrganelleId) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    onPick(id)
  }
  const place = PLACE[type]
  const bodyHl = selected === 'membrane'
  const wallHl = selected === 'wall'
  const ribHl = selected === 'ribosome'
  const anchorOf = (l: LabelSpec): V3 => l.anchor ?? (l.id === 'ribosome' ? (ribos[0] ?? [0, 0, 0]) : (place[l.id]?.[0] ?? [0, 0, 0]))

  return (
    <group position={[0, 0.1, 0]}>
      {/* membrane / cell body */}
      <mesh
        scale={semi}
        onClick={pick('membrane')}
      >
        {/* a wedge centred on +z is left open so the inside is visible */}
        <sphereGeometry
          args={cutaway ? [1, 40, 24, (3 * Math.PI) / 4, 1.5 * Math.PI] : [1, 40, 24]}
        />
        <meshStandardMaterial
          color={bodyHl ? HL : BODY[type]}
          emissive={bodyHl ? HL : '#000000'}
          emissiveIntensity={bodyHl ? 0.5 : 0}
          transparent
          opacity={cutaway ? 0.5 : 0.28}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {(type === 'plant' || type === 'bacterium') && (
        <group onClick={pick('wall')}>
          {type === 'plant' ? (
            <>
              <mesh>
                <boxGeometry args={[5.7, 3.9, 3.9]} />
                <meshStandardMaterial
                  color={wallHl ? HL : CELL_COLORS.wall}
                  emissive={wallHl ? HL : '#000000'}
                  emissiveIntensity={wallHl ? 0.5 : 0}
                  transparent
                  opacity={0.16}
                  depthWrite={false}
                />
              </mesh>
              {wallEdges && (
                <lineSegments geometry={wallEdges}>
                  <lineBasicMaterial color={wallHl ? HL : '#aed581'} />
                </lineSegments>
              )}
            </>
          ) : (
            <mesh scale={[semi[0] * 1.1, semi[1] * 1.18, semi[2] * 1.18]}>
              <sphereGeometry args={[1, 32, 20]} />
              <meshStandardMaterial
                color={wallHl ? HL : CELL_COLORS.wall}
                emissive={wallHl ? HL : '#000000'}
                emissiveIntensity={wallHl ? 0.5 : 0}
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      )}

      {(Object.keys(place) as OrganelleId[]).map((id) =>
        (place[id] ?? []).map((p, i) => (
          <group key={`${id}-${i}`} onClick={pick(id)}>
            <OrganelleMesh id={id} pos={p} hl={selected === id} type={type} i={i} />
          </group>
        )),
      )}
      <group onClick={pick('ribosome')}>
        <Dots points={ribos} size={ribHl ? 0.13 : 0.09} color={ribHl ? HL : CELL_COLORS.ribosome} cap={32} />
      </group>

      {labels.map((l) => {
        const text = getOrganelle(l.id).label
        const hl = selected === l.id
        return (
          <Leader
            key={l.id}
            text={text}
            at={[l.side * 5.3, l.y]}
            anchor={anchorOf(l)}
            side={l.side}
            color={hl ? '#102027' : '#ffffff'}
            bg={hl ? HL : undefined}
          />
        )
      })}
    </group>
  )
}

// ---------- osmosis ----------

const SOLUTION_LABEL: Record<Solution, string> = { water: 'Pure water', saline09: '0.9 % NaCl', saline5: '5 % NaCl' }
const MEDIUM: Record<Solution, { color: string; opacity: number }> = {
  water: { color: '#4fc3f7', opacity: 0.12 },
  saline09: { color: '#80cbc4', opacity: 0.16 },
  saline5: { color: '#ffb74d', opacity: 0.2 },
}

/** Points in the unit ball (deterministic). */
function ballPoints(n: number): V3[] {
  const out: V3[] = []
  for (let i = 1; out.length < n && i < 500; i++) {
    const [u, v] = r2(i)
    const x = u * 2 - 1
    const y = v * 2 - 1
    if (x * x + y * y > 0.7) continue
    out.push([x, y, 0.4 * Math.sin(i * 1.7)])
  }
  return out
}

function outsidePoints(n: number, hole: [number, number]): V3[] {
  const out: V3[] = []
  for (let i = 1; out.length < n && i < 1200; i++) {
    const [u, v] = r2(i + 40)
    const x = (u * 2 - 1) * 6.0
    const y = (v * 2 - 1) * 2.9
    if ((x / hole[0]) ** 2 + (y / hole[1]) ** 2 < 1) continue
    out.push([x, y, 0.8 * Math.sin(i * 2.3)])
  }
  return out
}

/** Protoplast that eases from its start size to the outcome size; remounted by `key` on every run. */
function Protoplast({ cell, target }: { cell: TransportCell; target: number }) {
  const ref = useRef<THREE.Group>(null)
  const s = useRef(cell === 'plant' ? 0.88 : 1)
  const dots = useMemo(() => ballPoints(cell === 'plant' ? 18 : 12), [cell])
  useFrame((_, dt) => {
    s.current += (target - s.current) * Math.min(1, dt * 1.1)
    ref.current?.scale.setScalar(s.current)
  })
  const semi: V3 = cell === 'plant' ? [2.1, 1.45, 1.45] : [1.5, 1.5, 1.5]
  return (
    <group ref={ref} scale={s.current}>
      <mesh scale={semi}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color={cell === 'plant' ? '#a5d6a7' : '#ef9a9a'} transparent opacity={0.8} />
      </mesh>
      <group scale={[semi[0] * 0.7, semi[1] * 0.7, semi[2] * 0.7]}>
        <Dots points={dots} size={0.1} color="#fff59d" cap={24} />
      </group>
    </group>
  )
}

export function TransportScene({ cell, solution, run }: { cell: TransportCell; solution: Solution; run: number }) {
  const target = Math.sqrt(relativeVolume(cell, solution))
  const dir = waterDirection(cell, solution)
  const diff = Math.abs(SOLUTION_PERCENT[solution] - INSIDE_PERCENT[cell])
  const n = diff >= 3 ? 8 : 6
  const rx = cell === 'plant' ? 2.2 : 1.85
  const ry = cell === 'plant' ? 1.55 : 1.85
  const saltCount = solution === 'water' ? 0 : solution === 'saline09' ? 14 : 48
  const salt = useMemo(() => outsidePoints(saltCount, [rx + 1.4, ry + 1.0]), [saltCount, rx, ry])
  const med = MEDIUM[solution]
  const wallEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(4.5, 3.1, 3.1)), [])
  const ring = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2 + Math.PI / n)

  return (
    <group position={[0, 0.1, 0]}>
      <mesh position={[0, 0, -1.8]}>
        <boxGeometry args={[12.4, 6.2, 0.4]} />
        <meshStandardMaterial color={med.color} transparent opacity={med.opacity + 0.1} depthWrite={false} />
      </mesh>
      <Dots points={salt} size={0.1} color="#ffd54f" cap={64} />

      <Protoplast key={`${cell}-${solution}-${run}`} cell={cell} target={target} />
      {cell === 'plant' && (
        <lineSegments geometry={wallEdges}>
          <lineBasicMaterial color="#9ccc65" />
        </lineSegments>
      )}

      {dir !== 'none' &&
        ring.map((a, i) => {
          const c = Math.cos(a)
          const s = Math.sin(a)
          const inner = 0.35
          const outer = 1.15
          const p = (k: number): V3 => [(rx + k) * c, (ry + k) * s, 0.2]
          return dir === 'in' ? (
            <Arrow key={i} origin={p(outer)} dir={[-c, -s, 0]} len={0.8} color="#29b6f6" />
          ) : (
            <Arrow key={i} origin={p(inner)} dir={[c, s, 0]} len={0.8} color="#29b6f6" />
          )
        })}

      <Label text={SOLUTION_LABEL[solution]} position={[-4.6, 2.85, 0.5]} size={0.56} color="#ffffff" />
      <Label
        text={cell === 'plant' ? 'Plant cell' : 'Red blood cell'}
        position={[4.2, -2.7, 0.5]}
        size={0.52}
        color="#c8e6c9"
      />
    </group>
  )
}

