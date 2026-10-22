import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Label } from '../Label'
import { ptElements } from '../../data/periodicTable'
import { SERIES, heatFraction, seriesValues, valueOf } from '../../sims/periodic'
import type { Property, SeriesKey } from '../../sims/periodic'
import { Slab } from './chemShared'

export const PERIODIC_COLORS = { bar: '#4fc3f7', dip: '#ff9800', selected: '#ffee58' }

const COLS = 18
const ROWS = 7
const CELL_PX = 56
const TABLE_W = 9.6
const TABLE_H = (TABLE_W * ROWS) / COLS

/** Heat ramp 0..1: dark blue -> teal -> yellow -> red. */
function heat(f: number): string {
  const stops = [
    [38, 70, 160],
    [0, 150, 160],
    [250, 220, 70],
    [230, 60, 40],
  ]
  const x = Math.min(Math.max(f, 0), 1) * (stops.length - 1)
  const i = Math.min(Math.floor(x), stops.length - 2)
  const k = x - i
  const c = stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * k))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

function useTableTexture(prop: Property, series: SeriesKey, selected: string): THREE.CanvasTexture {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = COLS * CELL_PX
    c.height = ROWS * CELL_PX
    const g = c.getContext('2d')!
    g.fillStyle = '#0b1b2b'
    g.fillRect(0, 0, c.width, c.height)
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = `700 22px system-ui, sans-serif`
    const inSeries = new Set(SERIES[series])
    for (const el of ptElements) {
      if (el.row > ROWS || el.col < 1) continue
      const x = (el.col - 1) * CELL_PX
      const y = (el.row - 1) * CELL_PX
      const v = valueOf(el.symbol, prop)
      g.fillStyle = v === null ? '#37474f' : heat(heatFraction(prop, v))
      g.fillRect(x + 2, y + 2, CELL_PX - 4, CELL_PX - 4)
      g.fillStyle = v !== null && heatFraction(prop, v) > 0.35 && heatFraction(prop, v) < 0.8 ? '#102a43' : '#ffffff'
      g.fillText(el.symbol, x + CELL_PX / 2, y + CELL_PX / 2 + 1)
      if (inSeries.has(el.symbol)) {
        g.strokeStyle = '#ffffff'
        g.lineWidth = 5
        g.strokeRect(x + 4, y + 4, CELL_PX - 8, CELL_PX - 8)
      }
      if (el.symbol === selected) {
        g.strokeStyle = PERIODIC_COLORS.selected
        g.lineWidth = 6
        g.strokeRect(x + 3, y + 3, CELL_PX - 6, CELL_PX - 6)
      }
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [prop, series, selected])
  useEffect(() => () => tex.dispose(), [tex])
  return tex
}

interface Props {
  prop: Property
  series: SeriesKey
  showTable: boolean
  selected: string
  dipSymbols: string[]
}

const fmtValue = (prop: Property, v: number) => (prop === 'en' ? v.toFixed(2) : String(v))

export function PeriodicScene({ prop, series, showTable, selected, dipSymbols }: Props) {
  const pts = seriesValues(series, prop)
  const tex = useTableTexture(prop, series, selected)
  const base = showTable ? 0.55 : -2.2
  const hMax = showTable ? 2.4 : 4.6
  const maxV = Math.max(...pts.map((p) => p.value ?? 0))
  const spacing = 9.2 / pts.length
  return (
    <group>
      <Slab w={10.8} h={8.1} y={0} />
      {pts.map((p, i) => {
        const x = -4.6 + spacing * (i + 0.5)
        const isSel = p.symbol === selected
        const colour = isSel ? PERIODIC_COLORS.selected : dipSymbols.includes(p.symbol) ? PERIODIC_COLORS.dip : PERIODIC_COLORS.bar
        const f = p.value === null ? 0 : p.value / maxV
        const labelColor = '#eceff1'
        if (prop === 'radius' && p.value !== null) {
          // radius shown as a sphere (area-true circle in 2D); the spheres are not to scale with real atoms
          const r = Math.max(f * Math.min(spacing * 0.46, hMax / 2), 0.1)
          return (
            <group key={p.symbol}>
              <mesh position={[x, base + r, 0]}>
                <sphereGeometry args={[r, 28, 18]} />
                <meshStandardMaterial color={colour} roughness={0.45} />
              </mesh>
              <Label text={fmtValue(prop, p.value)} position={[x, base + 2 * r + 0.3, 0]} size={0.42} color={labelColor} />
              <Label text={p.symbol} position={[x, base - 0.32, 0]} size={0.42} color={selected === p.symbol ? PERIODIC_COLORS.selected : labelColor} />
            </group>
          )
        }
        const h = p.value === null ? 0.08 : Math.max(f * hMax, 0.08)
        return (
          <group key={p.symbol}>
            <mesh position={[x, base + h / 2, 0]}>
              <boxGeometry args={[Math.min(spacing * 0.6, 0.9), h, 0.5]} />
              <meshStandardMaterial color={p.value === null ? '#607d8b' : colour} roughness={0.5} />
            </mesh>
            <Label text={p.value === null ? '-' : fmtValue(prop, p.value)} position={[x, base + h + 0.3, 0.3]} size={0.42} color={labelColor} />
            <Label text={p.symbol} position={[x, base - 0.32, 0]} size={0.42} color={selected === p.symbol ? PERIODIC_COLORS.selected : labelColor} />
          </group>
        )
      })}
      <mesh position={[0, base - 0.02, 0]}>
        <boxGeometry args={[9.4, 0.04, 0.3]} />
        <meshStandardMaterial color="#cfd8dc" />
      </mesh>
      {showTable && (
        <mesh position={[0, -2.0, 0]}>
          <planeGeometry args={[TABLE_W, TABLE_H]} />
          <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}
