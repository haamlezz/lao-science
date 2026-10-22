import { useMemo } from 'react'
import { Arrow } from '../Arrow'
import { Label } from '../Label'
import { pyramid } from '../../sims/foodweb'
import type { Effect, FoodGraph } from '../../sims/foodweb'

export const LEVEL_COLORS = ['#66bb6a', '#d4e157', '#ffb74d', '#ef5350', '#ab47bc']
export const EFFECT_COLORS = { up: '#00e676', down: '#ff5252' }

const ROW_H = 1.25
const PYRAMID_X = 4.6
const rowY = (level: number) => (level - 3) * ROW_H

interface NodePos {
  id: string
  x: number
  y: number
}

/** Organisms of one trophic level share a row, centred around x = -2.6. */
function layout(g: FoodGraph): Map<string, NodePos> {
  const out = new Map<string, NodePos>()
  const byLevel = new Map<number, string[]>()
  for (const o of g.organisms) byLevel.set(o.level, [...(byLevel.get(o.level) ?? []), o.id])
  for (const [level, ids] of byLevel) {
    ids.forEach((id, i) => out.set(id, { id, x: -2.6 + (i - (ids.length - 1) / 2) * 3.4, y: rowY(level) }))
  }
  return out
}

function fmtKj(e: number): string {
  return `${e >= 1 ? Math.round(e) : e} kJ`
}

interface Props {
  graph: FoodGraph
  e0: number
  effects: Record<string, Effect>
}

/** Left: organisms as nodes with energy-flow arrows (eaten -> eater). Right: energy pyramid, one bar per level. */
export function FoodwebScene({ graph, e0, effects }: Props) {
  const pos = useMemo(() => layout(graph), [graph])
  const levels = Math.max(...graph.organisms.map((o) => o.level))
  const energies = pyramid(e0, levels)

  return (
    <group position={[-1, 0.5, 0]}>
      {graph.eats.map(([eater, eaten]) => {
        const a = pos.get(eaten)
        const b = pos.get(eater)
        if (!a || !b) return null
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.hypot(dx, dy)
        const gone = effects[eaten] === 'removed' || effects[eater] === 'removed'
        const len = dist - 0.9
        if (len < 0.5) return null
        const u = [dx / dist, dy / dist]
        return (
          <Arrow
            key={`${eater}-${eaten}`}
            origin={[a.x + u[0] * 0.45, a.y + u[1] * 0.45, 0]}
            dir={[dx, dy, 0]}
            len={len}
            color={gone ? '#607d8b' : '#eceff1'}
          />
        )
      })}

      {graph.organisms.map((o) => {
        const p = pos.get(o.id)
        if (!p) return null
        const eff = effects[o.id] ?? 'none'
        const removed = eff === 'removed'
        return (
          <group key={o.id} position={[p.x, p.y, 0]}>
            <mesh scale={removed ? 0.7 : 1}>
              <sphereGeometry args={[0.38, 20, 14]} />
              <meshStandardMaterial
                color={removed ? '#78909c' : LEVEL_COLORS[(o.level - 1) % LEVEL_COLORS.length]}
                transparent={removed}
                opacity={removed ? 0.45 : 1}
              />
            </mesh>
            <Label text={o.name.en} position={[0, -0.7, 0.4]} size={0.45} color={removed ? '#90a4ae' : '#ffffff'} />
            {(eff === 'up' || eff === 'down') && (
              <Arrow
                origin={[0.75, eff === 'up' ? -0.1 : 0.55, 0]}
                dir={[0, eff === 'up' ? 1 : -1, 0]}
                len={0.7}
                color={EFFECT_COLORS[eff]}
              />
            )}
          </group>
        )
      })}

      {/* decomposers return nutrients to the producers */}
      <mesh position={[-2.6, rowY(1) - 1.3, 0]}>
        <boxGeometry args={[2.6, 0.5, 0.5]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <Label text="Decomposers" position={[-2.6, rowY(1) - 1.3, 0.4]} size={0.45} />
      <Arrow origin={[-4.4, rowY(1) - 1.0, 0]} dir={[0, 1, 0]} len={0.85} color="#8d6e63" />

      {energies.map((e, i) => {
        const level = i + 1
        // bar width follows log10(E) so ten-fold steps stay visible; the numbers are exact
        const w = 0.5 + 0.55 * Math.max(Math.log10(e) + 1, 0)
        const allGone = graph.organisms.filter((o) => o.level === level).every((o) => effects[o.id] === 'removed')
        return (
          <group key={level} position={[PYRAMID_X, rowY(level), 0]}>
            <mesh>
              <boxGeometry args={[w, 0.8, 0.6]} />
              <meshStandardMaterial color={allGone ? '#607d8b' : LEVEL_COLORS[(level - 1) % LEVEL_COLORS.length]} />
            </mesh>
            <Label text={fmtKj(e)} position={[0, 0, 0.5]} size={0.5} color="#102027" bg="#ffffff" />
          </group>
        )
      })}
    </group>
  )
}
