import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from '../Label'
import { IONIC, MOLECULES, SHELLS, ionCharge, ionShells } from '../../sims/bonding'
import type { IonicCompound, Molecule } from '../../sims/bonding'
import { ease } from '../common'
import { ELEMENT_COLORS, Slab, hash, ionLabel, tri } from './chemShared'

export const BOND_COLORS = { electron: '#4fc3f7', shared: '#ffd54f', cation: '#ab47bc', anion: '#9ccc65' }

export type BondView = 'electron-dot' | 'ball-and-stick' | 'shells'

const DEG = Math.PI / 180

function Dot({ x, y, z = 0, color = BOND_COLORS.electron, r = 0.1 }: { x: number; y: number; z?: number; color?: string; r?: number }) {
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[r, 12, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
    </mesh>
  )
}

function Ring({ x, r, opacity = 1, color = '#8fb3cc' }: { x: number; r: number; opacity?: number; color?: string }) {
  const pts = useMemo<[number, number, number][]>(
    () => Array.from({ length: 49 }, (_, i) => [x + Math.cos((i / 48) * Math.PI * 2) * r, Math.sin((i / 48) * Math.PI * 2) * r, 0]),
    [x, r],
  )
  return <Line points={pts} color={color} lineWidth={1.5} transparent opacity={opacity} />
}

// ------------------------------------------------------------------ ionic: electron transfer

const ringR = (k: number) => 0.55 + 0.42 * k

interface IonicAtom {
  sym: string
  x: number
  /** angles (rad) towards each partner atom */
  partners: number[]
  role: 'cation' | 'anion'
}

function ionicAtoms(c: IonicCompound): IonicAtom[] {
  if (c.cations === 1 && c.anions === 1) {
    return [
      { sym: c.cation, x: -2.6, partners: [0], role: 'cation' },
      { sym: c.anion, x: 2.6, partners: [Math.PI], role: 'anion' },
    ]
  }
  return [
    { sym: c.anion, x: -4.4, partners: [0], role: 'anion' },
    { sym: c.cation, x: 0, partners: [Math.PI, 0], role: 'cation' },
    { sym: c.anion, x: 4.4, partners: [Math.PI], role: 'anion' },
  ]
}

function IonicShells({ compound, valenceOnly, p }: { compound: IonicCompound; valenceOnly: boolean; p: number }) {
  const atoms = ionicAtoms(compound)
  const e = ease(p)
  const cat = atoms.find((a) => a.role === 'cation')!
  const q = ionCharge(compound.cation)
  const anions = atoms.filter((a) => a.role === 'anion')
  const gain = -ionCharge(compound.anion)
  // outer-ring position of electron j of the cation (faces its partner, or spreads over the partners)
  const catAngle = (j: number): number =>
    cat.partners.length === 2 ? cat.partners[j] : cat.partners[0] + (j - (q - 1) / 2) * 0.5
  const dots: { key: string; x: number; y: number; color: string }[] = []
  const labels: { key: string; x: number; y: number; text: string; color: string }[] = []
  const rings: { key: string; x: number; r: number; opacity: number }[] = []

  for (const a of atoms) {
    const sh = SHELLS[a.sym]
    const ion = ionShells(a.sym)
    const last = sh.length - 1
    sh.forEach((cnt, k) => {
      const r = valenceOnly ? 0.95 : ringR(k)
      if (valenceOnly && k !== last) return
      const isOuter = k === last
      if (a.role === 'cation' && isOuter) {
        rings.push({ key: `${a.x}-${k}`, x: a.x, r, opacity: valenceOnly ? 0 : 1 - e })
        return // outer electrons are the moving ones, drawn below
      }
      rings.push({ key: `${a.x}-${k}`, x: a.x, r, opacity: valenceOnly ? 0 : 1 })
      if (a.role === 'anion' && isOuter) {
        const cf = ion[ion.length - 1]
        // slots 0..gain-1 face the metal and receive the transferred electrons; the rest are the atom's own
        for (let s = gain; s < cf; s++) {
          const ang = a.partners[0] + (2 * Math.PI * s) / cf
          dots.push({ key: `${a.x}-o${s}`, x: a.x + Math.cos(ang) * r, y: Math.sin(ang) * r, color: BOND_COLORS.electron })
        }
      } else {
        for (let j = 0; j < cnt; j++) {
          const ang = (2 * Math.PI * j) / cnt + k * 0.45
          dots.push({ key: `${a.x}-${k}-${j}`, x: a.x + Math.cos(ang) * r, y: Math.sin(ang) * r, color: BOND_COLORS.electron })
        }
      }
    })
    const top = (valenceOnly ? 0.95 : ringR(last)) + 0.55
    const charge = a.role === 'cation' ? q : -gain
    labels.push({
      key: `c${a.x}`,
      x: a.x,
      y: top,
      text: e > 0.85 ? ionLabel(a.sym, charge) : a.sym,
      color: e > 0.85 ? (a.role === 'cation' ? BOND_COLORS.cation : BOND_COLORS.anion) : '#eceff1',
    })
  }
  // transferred electrons travel from the cation's outer ring to the anion slots that face it
  const moving: { key: string; x: number; y: number }[] = []
  const catR = valenceOnly ? 0.95 : ringR(SHELLS[cat.sym].length - 1)
  let idx = 0
  for (const an of anions) {
    for (let s = 0; s < gain; s++) {
      const j = idx % Math.max(q, 1)
      idx++
      const a0 = catAngle(cat.partners.length === 2 ? (an.x < cat.x ? 0 : 1) : j)
      const sx = cat.x + Math.cos(a0) * catR
      const sy = Math.sin(a0) * catR
      const anR = valenceOnly ? 0.95 : ringR(SHELLS[an.sym].length - 1)
      const cf = ionShells(an.sym)[ionShells(an.sym).length - 1]
      const ang = an.partners[0] + (2 * Math.PI * s) / cf
      const ex = an.x + Math.cos(ang) * anR
      const ey = Math.sin(ang) * anR
      moving.push({ key: `m${an.x}-${s}`, x: sx + (ex - sx) * e, y: sy + (ey - sy) * e })
    }
  }
  return (
    <group>
      {rings.map((r) => (r.opacity > 0.02 ? <Ring key={r.key} x={r.x} r={r.r} opacity={r.opacity} /> : null))}
      {dots.map((d) => (
        <Dot key={d.key} x={d.x} y={d.y} color={d.color} />
      ))}
      {moving.map((d) => (
        <Dot key={d.key} x={d.x} y={d.y} color={BOND_COLORS.shared} r={0.13} />
      ))}
      {atoms.map((a) => (
        <Label key={`s${a.x}`} text={a.sym} position={[a.x, 0, 0.1]} size={0.5} color="#eceff1" bg="#102a43" />
      ))}
      {labels.map((l) => (
        <Label key={l.key} text={l.text} position={[l.x, l.y, 0.1]} size={0.5} color={l.color} />
      ))}
    </group>
  )
}

// ------------------------------------------------------------------ ionic lattice (ball model)

function IonicLattice({ compound, p }: { compound: IonicCompound; p: number }) {
  const cationCol = new THREE.Color('#9e9e9e').lerp(new THREE.Color(BOND_COLORS.cation), p)
  const anionCol = new THREE.Color('#9e9e9e').lerp(new THREE.Color(BOND_COLORS.anion), p)
  const cells: { pos: [number, number, number]; cation: boolean }[] = []
  if (compound.cations === compound.anions) {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++) cells.push({ pos: [(i - 1) * 1.25, (j - 1) * 1.25, (k - 1) * 1.25], cation: (i + j + k) % 2 === 0 })
  } else {
    // CaCl2: formula units 1 cation : 2 anions (schematic, not the real fluorite cell)
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 2; c++) {
        const y = (r - 1) * 1.5
        const x0 = (c - 0.5) * 3.6
        cells.push({ pos: [x0 - 1.1, y, 0], cation: false }, { pos: [x0, y, 0], cation: true }, { pos: [x0 + 1.1, y, 0], cation: false })
      }
  }
  const rc = compound.cations === compound.anions ? 0.38 : 0.34
  const ra = compound.cations === compound.anions ? 0.5 : 0.46
  return (
    <group>
      {cells.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[c.cation ? rc : ra, 20, 14]} />
          <meshStandardMaterial color={c.cation ? cationCol : anionCol} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// ------------------------------------------------------------------ covalent

const L2 = 1.6 // schematic bond length in the Lewis views
const L3 = 1.5 // bond length in the ball-and-stick view

/** 2D bond directions (deg) from the central atom for the Lewis views. */
const LEWIS_ANGLES: Record<string, number[]> = {
  'H₂O': [270 - 52.25, 270 + 52.25],
  'NH₃': [180, 0, 270],
  'CH₄': [0, 90, 180, 270],
  'CO₂': [0, 180],
}

interface LAtom {
  sym: string
  x: number
  y: number
  dirs: number[] // rad, towards bonded atoms
  lone: number
}

function lewisLayout(m: Molecule): { atoms: LAtom[]; bonds: [number, number][] } {
  const diatomic = m.formula.length === 2
  const termLone = (sym: string) => (sym === 'H' ? 0 : (8 - 2 * m.bondOrder) / 2)
  if (diatomic) {
    const sym = m.central
    return {
      atoms: [
        { sym, x: -L2 / 2, y: 0, dirs: [0], lone: m.lonePairsOnCentral },
        { sym, x: L2 / 2, y: 0, dirs: [Math.PI], lone: m.lonePairsOnCentral },
      ],
      bonds: [[0, 1]],
    }
  }
  const angles = (LEWIS_ANGLES[m.formula] ?? [0, 180]).map((a) => a * DEG)
  const sym = m.terminals[0].symbol
  const atoms: LAtom[] = [{ sym: m.central, x: 0, y: 0, dirs: angles, lone: m.lonePairsOnCentral }]
  const bonds: [number, number][] = []
  angles.forEach((a, i) => {
    atoms.push({ sym, x: Math.cos(a) * L2, y: Math.sin(a) * L2, dirs: [a + Math.PI], lone: termLone(sym) })
    bonds.push([0, i + 1])
  })
  return { atoms, bonds }
}

/** Directions (rad) for lone pairs: spread behind a single bond, otherwise bisect the largest gaps. */
function lonePairDirs(dirs: number[], n: number): number[] {
  if (n === 0) return []
  if (dirs.length === 1) return Array.from({ length: n }, (_, i) => dirs[0] + Math.PI + (i - (n - 1) / 2) * 100 * DEG)
  const all = dirs.map((d) => ((d % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)).sort((a, b) => a - b)
  const out: number[] = []
  for (let k = 0; k < n; k++) {
    let best = 0
    let bestGap = -1
    for (let i = 0; i < all.length; i++) {
      const a = all[i]
      const b = i + 1 < all.length ? all[i + 1] : all[0] + 2 * Math.PI
      if (b - a > bestGap) {
        bestGap = b - a
        best = a + (b - a) / 2
      }
    }
    out.push(best)
    all.push(((best % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI))
    all.sort((a, b) => a - b)
  }
  return out
}

function CovalentLewis({ m, shellsView, p }: { m: Molecule; shellsView: boolean; p: number }) {
  const { atoms, bonds } = useMemo(() => lewisLayout(m), [m])
  const e = ease(p)
  const k = m.bondOrder
  const els: { key: string; x: number; y: number; color: string }[] = []
  atoms.forEach((a, i) => {
    lonePairDirs(a.dirs, a.lone).forEach((d, j) => {
      const perp = [-Math.sin(d), Math.cos(d)]
      for (const s of [-1, 1])
        els.push({ key: `l${i}-${j}-${s}`, x: a.x + Math.cos(d) * 0.66 + perp[0] * 0.14 * s, y: a.y + Math.sin(d) * 0.66 + perp[1] * 0.14 * s, color: BOND_COLORS.electron })
    })
  })
  bonds.forEach(([ia, ib], bi) => {
    const a = atoms[ia]
    const b = atoms[ib]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    const px = -uy
    const py = ux
    for (let q = 0; q < k; q++) {
      const s = (q - (k - 1) / 2) * 0.34
      // each atom contributes one electron: it moves from beside its own atom into the shared pair
      const lerp = (sx: number, sy: number, ex: number, ey: number): [number, number] => [sx + (ex - sx) * e, sy + (ey - sy) * e]
      const pa = lerp(a.x + ux * 0.62 + px * s, a.y + uy * 0.62 + py * s, mx + px * s - ux * 0.13, my + py * s - uy * 0.13)
      const pb = lerp(b.x - ux * 0.62 + px * s, b.y - uy * 0.62 + py * s, mx + px * s + ux * 0.13, my + py * s + uy * 0.13)
      els.push({ key: `s${bi}-${q}-a`, x: pa[0], y: pa[1], color: BOND_COLORS.shared })
      els.push({ key: `s${bi}-${q}-b`, x: pb[0], y: pb[1], color: BOND_COLORS.shared })
    }
  })
  return (
    <group>
      {shellsView && atoms.map((a, i) => <Ring key={`r${i}`} x={a.x} r={0.95} color="#8fb3cc" />)}
      {els.map((d) => (
        <Dot key={d.key} x={d.x} y={d.y} color={d.color} r={0.1} />
      ))}
      {atoms.map((a, i) => (
        <Label key={`t${i}`} text={a.sym} position={[a.x, a.y, 0.1]} size={0.55} color="#eceff1" bg="#102a43" />
      ))}
    </group>
  )
}

type V3 = [number, number, number]

/** 3D atom positions (centre first) with the angles listed in the spec; bond length L3. */
export function moleculePositions(m: Molecule): V3[] {
  const n = m.terminals.reduce((c, t) => c + t.count, 0)
  if (m.formula.length === 2) return [[-L3 / 2, 0, 0], [L3 / 2, 0, 0]]
  const out: V3[] = [[0, 0, 0]]
  if (m.geometry === 'linear') {
    out.push([-L3, 0, 0], [L3, 0, 0])
  } else if (m.geometry === 'bent') {
    const h = ((m.angle ?? 104.5) / 2) * DEG
    out[0] = [0, 0.4, 0]
    out.push([-L3 * Math.sin(h), 0.4 - L3 * Math.cos(h), 0], [L3 * Math.sin(h), 0.4 - L3 * Math.cos(h), 0])
  } else if (m.geometry === 'trigonal pyramidal') {
    const c = Math.cos((m.angle ?? 107) * DEG)
    const cos2 = (c + 0.5) / 1.5
    const cp = Math.sqrt(cos2)
    const sp = Math.sqrt(1 - cos2)
    out[0] = [0, 0.5, 0]
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 + Math.PI / 2
      out.push([L3 * sp * Math.cos(a), 0.5 - L3 * cp, L3 * sp * Math.sin(a)])
    }
  } else {
    const t: V3[] = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
    for (let i = 0; i < n; i++) out.push([(t[i][0] * L3) / Math.sqrt(3), (t[i][1] * L3) / Math.sqrt(3), (t[i][2] * L3) / Math.sqrt(3)])
  }
  return out
}

const ATOM_R: Record<string, number> = { H: 0.3, C: 0.45, N: 0.45, O: 0.45 }

function Stick({ a, b, order }: { a: V3; b: V3; order: number }) {
  const va = new THREE.Vector3(...a)
  const vb = new THREE.Vector3(...b)
  const dir = vb.clone().sub(va)
  const len = dir.length()
  const mid = va.clone().add(vb).multiplyScalar(0.5)
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  // offset direction perpendicular to the bond and to the view axis
  const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1))
  if (perp.lengthSq() < 1e-6) perp.set(0, 1, 0)
  perp.normalize()
  return (
    <>
      {Array.from({ length: order }, (_, i) => {
        const o = perp.clone().multiplyScalar((i - (order - 1) / 2) * 0.2)
        return (
          <mesh key={i} position={mid.clone().add(o)} quaternion={q}>
            <cylinderGeometry args={[0.07, 0.07, len, 10]} />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>
        )
      })}
    </>
  )
}

function CovalentBall({ m, p }: { m: Molecule; p: number }) {
  const pos = moleculePositions(m)
  const e = ease(p)
  const terms: string[] = m.formula.length === 2 ? [m.central] : m.terminals.flatMap((t) => Array.from({ length: t.count }, () => t.symbol))
  const centre = pos[0]
  const stretch = 1 + (1 - e) * 1.2 // atoms approach each other as the bonds form
  const placed: V3[] = pos.map((q, i) => (i === 0 ? q : [centre[0] + (q[0] - centre[0]) * stretch, centre[1] + (q[1] - centre[1]) * stretch, centre[2] + (q[2] - centre[2]) * stretch]))
  const syms = [m.central, ...terms]
  return (
    <group>
      {placed.map((q, i) => (
        <group key={i}>
          <mesh position={q}>
            <sphereGeometry args={[ATOM_R[syms[i]] ?? 0.4, 24, 16]} />
            <meshStandardMaterial color={ELEMENT_COLORS[syms[i]] ?? '#90a4ae'} roughness={0.45} />
          </mesh>
          <Label text={syms[i]} position={[q[0], q[1], q[2] + 0.55]} size={0.4} color="#102a43" bg="#ffffffcc" />
        </group>
      ))}
      {e > 0.97 && placed.slice(1).map((q, i) => <Stick key={i} a={placed[0]} b={q} order={m.bondOrder} />)}
    </group>
  )
}

// ------------------------------------------------------------------ metallic

const SEA = 30
const dummy = new THREE.Object3D()

function SeaOfElectrons() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const ph = useRef(Float32Array.from({ length: SEA * 3 }, (_, i) => hash(i, 9) * 2))
  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const h = Math.min(dt, 0.1)
    for (let i = 0; i < SEA; i++) {
      for (let c = 0; c < 3; c++) ph.current[i * 3 + c] += h * (0.18 + 0.2 * hash(i, c + 3))
      dummy.position.set((tri(ph.current[i * 3]) - 0.5) * 3.9, (tri(ph.current[i * 3 + 1]) - 0.5) * 3.9, (tri(ph.current[i * 3 + 2]) - 0.5) * 3.9)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, SEA]} frustumCulled={false}>
      <sphereGeometry args={[0.1, 10, 8]} />
      <meshStandardMaterial color={BOND_COLORS.electron} emissive={BOND_COLORS.electron} emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function Metallic() {
  const cells: V3[] = []
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) cells.push([(i - 1) * 1.4, (j - 1) * 1.4, (k - 1) * 1.4])
  return (
    <group>
      {cells.map((c, i) => (
        <mesh key={i} position={c}>
          <sphereGeometry args={[0.36, 18, 12]} />
          <meshStandardMaterial color={BOND_COLORS.cation} roughness={0.4} />
        </mesh>
      ))}
      <SeaOfElectrons />
      <Label text={ionLabel('Na', 1)} position={[-3.6, 2.2, 0]} size={0.5} color={BOND_COLORS.cation} />
      <Label text="e" position={[3.6, 2.2, 0]} size={0.5} color={BOND_COLORS.electron} sub="-" />
    </group>
  )
}

// ------------------------------------------------------------------ scene

export type BondType = 'ionic' | 'covalent' | 'metallic'

interface Props {
  type: BondType
  compound: string
  view: BondView
  p: number
}

export function BondingScene({ type, compound, view, p }: Props) {
  const ionicC = IONIC.find((c) => c.formula === compound) ?? IONIC[0]
  const mol = MOLECULES.find((m) => m.formula === compound) ?? MOLECULES[3]
  return (
    <group>
      <Slab w={11.4} h={6.6} y={0} />
      {type === 'ionic' && view !== 'ball-and-stick' && <IonicShells compound={ionicC} valenceOnly={view === 'electron-dot'} p={p} />}
      {type === 'ionic' && view === 'ball-and-stick' && <IonicLattice compound={ionicC} p={p} />}
      {type === 'covalent' && view === 'ball-and-stick' && <CovalentBall m={mol} p={p} />}
      {type === 'covalent' && view !== 'ball-and-stick' && <CovalentLewis m={mol} shellsView={view === 'shells'} p={p} />}
      {type === 'metallic' && <Metallic />}
    </group>
  )
}
