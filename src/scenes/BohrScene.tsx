import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { elements, shellCounts } from '../data/elements'
import { COLORS, circlePoints, ease, lerp, wavelengthToColor } from './common'
import { Nucleus } from './Parts'
import { Label } from './Label'

export interface PhotonEvent {
  id: number
  kind: 'absorb' | 'emit'
  from: number
  to: number
  nm: number | null
  eV: number | null
}

interface Props {
  flat: boolean
  Z: number
  hi: number
  lo: number
  playId: number
  onEvent: (e: Omit<PhotonEvent, 'id'>) => void
}

interface Trans {
  kind: 'absorb' | 'emit'
  from: number
  to: number
}

interface Elec {
  shell: number
  angle: number
  level: number
}

export const MAX_SHELL = 5
const SHELL_LETTER = ['', 'K', 'L', 'M', 'N', 'O']
const radius = (n: number) => 1.1 + 0.95 * (n - 1)
const omega = (level: number) => 1.9 / Math.pow(level, 1.5)
const TILTS: [number, number][] = [
  [0, 0],
  [0, 0],
  [1.05, 0.25],
  [-0.85, 0.9],
  [0.45, -1.25],
  [1.3, 0.55],
]
const FAR = 9

/** Hydrogen energy levels: exact for Z = 1 only. */
export function hydrogenPhoton(from: number, to: number): { nm: number; eV: number } {
  const hiN = Math.max(from, to)
  const loN = Math.min(from, to)
  const k = 1 / (loN * loN) - 1 / (hiN * hiN)
  return { nm: 1e9 / (1.0968e7 * k), eV: 13.606 * k }
}

export function BohrScene({ flat, Z, hi, lo, playId, onEvent }: Props) {
  const el = elements[Z - 1]
  const counts = useMemo(() => shellCounts(Z), [Z])
  const elec = useMemo<Elec[]>(() => {
    const out: Elec[] = []
    counts.forEach((c, si) => {
      const n = si + 1
      for (let i = 0; i < c; i++) out.push({ shell: n, angle: (i / c) * Math.PI * 2 + n * 0.7, level: n })
    })
    return out
  }, [counts])
  const quats = useMemo(
    () =>
      TILTS.map(([x, y]) => new THREE.Quaternion().setFromEuler(new THREE.Euler(flat ? 0 : x, flat ? 0 : y, 0))),
    [flat],
  )
  const ringPts = useMemo(() => Array.from({ length: MAX_SHELL + 1 }, (_, n) => (n ? circlePoints(radius(n)) : [])), [])

  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const photon = useRef<THREE.Group>(null)
  const photonMats = useRef<THREE.MeshBasicMaterial[]>([])
  const anim = useRef({
    queue: [] as Trans[],
    cur: null as Trans | null,
    tt: 0,
    fired: false,
    dir: new THREE.Vector3(1, 0, 0),
    from: new THREE.Vector3(),
  })
  const onEventRef = useRef(onEvent)
  useEffect(() => {
    onEventRef.current = onEvent
  })

  const last = elec.length - 1
  const startShell = elec[last]?.shell ?? 1

  // Reset any running animation when the element changes.
  useEffect(() => {
    const a = anim.current
    a.queue = []
    a.cur = null
    elec.forEach((e) => (e.level = e.shell))
    if (photon.current) photon.current.visible = false
  }, [elec])

  // Start a new excite -> fall sequence on each press of the button.
  useEffect(() => {
    if (playId === 0) return
    const a = anim.current
    const s = startShell
    const h = Math.max(hi, s + 1)
    const l = Math.min(Math.max(lo, s), h - 1)
    const seq: Trans[] = [
      { kind: 'absorb', from: s, to: h },
      { kind: 'emit', from: h, to: l },
    ]
    if (l > s) seq.push({ kind: 'emit', from: l, to: s })
    a.queue = seq
    a.cur = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playId])

  const tmpV = useMemo(() => new THREE.Vector3(), [])
  const tmpQ = useMemo(() => new THREE.Quaternion(), [])
  const elecPos = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const a = anim.current

    if (!a.cur && a.queue.length) {
      a.cur = a.queue.shift() ?? null
      a.tt = 0
      a.fired = false
    }
    const c = a.cur
    if (c) a.tt += dt

    // progress of the outer electron's jump (0..1) and photon state
    let s = 0
    let photonProg = -1
    let done = false
    if (c) {
      if (c.kind === 'absorb') {
        if (a.tt < 0.8) photonProg = a.tt / 0.8
        else s = ease((a.tt - 0.8) / 0.6)
        if (a.tt >= 1.9) done = true
      } else {
        s = ease(a.tt / 0.6)
        if (a.tt >= 0.6) photonProg = (a.tt - 0.6) / 1.3
        if (a.tt >= 2.3) done = true
      }
    }

    // advance every electron
    elec.forEach((e, i) => {
      const isActive = i === last
      let level = e.shell
      let p = tmpV
      if (isActive) {
        const nFrom = c ? c.from : e.level
        const nTo = c ? c.to : e.level
        level = lerp(nFrom, nTo, s)
        e.angle += omega(level) * dt
        const r = lerp(radius(nFrom), radius(nTo), s)
        tmpQ.copy(quats[nFrom]).slerp(quats[nTo], s)
        p.set(r * Math.cos(e.angle), r * Math.sin(e.angle), 0).applyQuaternion(tmpQ)
        elecPos.copy(p)
      } else {
        e.angle += omega(level) * dt
        p.set(radius(e.shell) * Math.cos(e.angle), radius(e.shell) * Math.sin(e.angle), 0).applyQuaternion(quats[e.shell])
      }
      meshes.current[i]?.position.copy(p)
    })

    // photon
    const ph = photon.current
    if (ph) {
      if (c && photonProg >= 0) {
        const info = Z === 1 ? hydrogenPhoton(c.from, c.to) : null
        const color = info ? wavelengthToColor(info.nm) : '#fff3b0'
        photonMats.current.forEach((m) => m.color.set(color))
        if (c.kind === 'absorb') {
          if (!a.fired) {
            a.fired = true
            onEventRef.current({ kind: 'absorb', from: c.from, to: c.to, nm: info?.nm ?? null, eV: info?.eV ?? null })
            a.dir.set(1, 0.45, 0.2).normalize()
          }
          // travels in from far away to the electron
          ph.position.copy(a.dir).multiplyScalar(FAR * (1 - ease(photonProg))).add(elecPos)
          ph.scale.setScalar(1)
        } else {
          if (!a.fired) {
            a.fired = true
            onEventRef.current({ kind: 'emit', from: c.from, to: c.to, nm: info?.nm ?? null, eV: info?.eV ?? null })
            a.dir.copy(elecPos).normalize()
            a.from.copy(elecPos)
          }
          ph.position.copy(a.from).addScaledVector(a.dir, FAR * photonProg)
          ph.scale.setScalar(Math.max(0.2, 1 - 0.6 * photonProg))
        }
        ph.visible = true
      } else {
        ph.visible = false
      }
    }

    if (c && done) {
      elec[last].level = c.to
      a.cur = null
    }
  })

  const occupied = counts.length
  const labelPos = (n: number): [number, number, number] =>
    new THREE.Vector3(radius(n) * Math.cos(0.9), radius(n) * Math.sin(0.9), 0).applyQuaternion(quats[n]).toArray()

  return (
    <group>
      <Nucleus protons={Z} neutrons={el.A - Z} flat={flat} radius={flat ? 0.14 : 0.16} />
      {Array.from({ length: MAX_SHELL }, (_, i) => i + 1).map((n) => {
        const used = n <= occupied
        return (
          <group key={n} quaternion={quats[n]}>
            <Line
              points={ringPts[n]}
              color={used ? '#8fc4e8' : '#4f6b82'}
              lineWidth={used ? 1.6 : 1.1}
              dashed={!used}
              dashSize={0.14}
              gapSize={0.12}
              transparent
              opacity={used ? 0.8 : 0.4}
            />
          </group>
        )
      })}
      {Array.from({ length: MAX_SHELL }, (_, i) => i + 1).map((n) => (
        <Label
          key={`l${n}`}
          text={SHELL_LETTER[n]}
          sub={`n=${n}`}
          position={labelPos(n)}
          color="#cfe8f9"
          bg="rgba(11,27,43,0.65)"
          size={0.62}
          opacity={n <= occupied ? 1 : 0.5}
        />
      ))}
      {elec.map((e, i) => (
        <mesh
          key={`${Z}-${i}`}
          ref={(m) => {
            meshes.current[i] = m
          }}
          position={[radius(e.shell), 0, 0]}
        >
          <sphereGeometry args={[0.17, 20, 20]} />
          <meshStandardMaterial
            color={COLORS.electron}
            emissive={COLORS.electron}
            emissiveIntensity={i === last ? 0.9 : 0.45}
            roughness={0.3}
          />
        </mesh>
      ))}
      <group ref={photon} visible={false}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) photonMats.current[0] = m
            }}
            color="#ffffff"
          />
        </mesh>
        <mesh scale={2.4}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) photonMats.current[1] = m
            }}
            color="#ffffff"
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}
