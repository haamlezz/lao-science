import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { Label } from '../Label'
import { Dots, r2 } from './BioParts'
import type { V3 } from './BioParts'
import { TIME_MAX, dotsFor, exponential, inflectionSize, logistic, timeToReachLogistic } from '../../sims/population'

export const POP_COLORS = { exp: '#ffb74d', log: '#4dd0e1', k: '#ef5350', dot: '#fff59d', field: '#33691e' }

export type PopModel = 'exponential' | 'logistic' | 'both'

// graph box in scene units
const GX0 = 1.2
const GX1 = 6.3
const GY0 = -2.45
const GY1 = 2.55

interface Props {
  model: PopModel
  n0: number
  r: number
  k: number
  t: number
}

/** Left: a field with one dot per individual (capped). Right: N-t graph with J and S curves, K and K/2 marks. */
export function PopulationScene({ model, n0, r, k, t }: Props) {
  // exponential only: the vertical scale follows the J-curve so it stays on the graph (K line may sit near the bottom)
  const tcNow = Math.min(t, TIME_MAX)
  const yMax = model === 'exponential' ? Math.max(k * 1.2, exponential(n0, r, tcNow) * 1.1) : k * 1.2
  const px = (time: number) => GX0 + ((GX1 - GX0) * time) / TIME_MAX
  const py = (n: number) => GY0 + ((GY1 - GY0) * Math.min(n, yMax)) / yMax

  const curve = (f: (time: number) => number, upTo: number): V3[] => {
    const pts: V3[] = []
    for (let time = 0; time <= upTo + 1e-9; time += 0.25) {
      const n = f(time)
      if (n > yMax) {
        // stop at the top edge: the J-curve leaves the graph
        pts.push([px(time), GY1, 0.1])
        break
      }
      pts.push([px(time), py(n), 0.1])
    }
    return pts
  }
  const fExp = (time: number) => exponential(n0, r, time)
  const fLog = (time: number) => logistic(n0, r, k, time)
  const showExp = model !== 'logistic'
  const showLog = model !== 'exponential'

  const nShown = model === 'exponential' ? fExp(t) : fLog(t)
  const { dots, each } = dotsFor(nShown)
  const field = useMemo<V3[]>(
    () =>
      Array.from({ length: 150 }, (_, i) => {
        const [u, v] = r2(i + 1)
        return [-6.2 + u * 5.2, -2.5 + v * 4.9, 0.15] as V3
      }),
    [],
  )
  const tHalf = timeToReachLogistic(n0, r, k, inflectionSize(k))
  const yK = py(k)
  const full = (pts: V3[], color: string) => (pts.length > 1 ? <Line points={pts} color={color} lineWidth={2} transparent opacity={0.3} /> : null)
  const live = (pts: V3[], color: string) => (pts.length > 1 ? <Line points={pts} color={color} lineWidth={3.5} /> : null)
  const tc = Math.min(t, TIME_MAX)

  return (
    <group position={[0, 0.15, 0]}>
      {/* field */}
      <mesh position={[-3.6, -0.05, -0.1]}>
        <boxGeometry args={[5.5, 5.2, 0.2]} />
        <meshStandardMaterial color={POP_COLORS.field} />
      </mesh>
      <Dots points={field.slice(0, dots)} size={0.1} color={POP_COLORS.dot} cap={150} />
      {each > 1 && <Label text={`1 dot = ${each}`} position={[-5.3, 2.85, 0.3]} size={0.46} color="#fff59d" />}

      {/* graph panel and axes */}
      <mesh position={[(GX0 + GX1) / 2, (GY0 + GY1) / 2, -0.1]}>
        <boxGeometry args={[GX1 - GX0 + 0.5, GY1 - GY0 + 0.4, 0.1]} />
        <meshStandardMaterial color="#0d2236" />
      </mesh>
      <Line points={[[GX0, GY1, 0.05], [GX0, GY0, 0.05], [GX1, GY0, 0.05]]} color="#eceff1" lineWidth={2} />
      <Label text="N" position={[GX0 - 0.35, GY1 - 0.1, 0.2]} size={0.5} />
      <Label text="t" position={[GX1 + 0.4, GY0, 0.2]} size={0.5} />
      {[0, 10, 20].map((x) => (
        <Label key={x} text={String(x)} position={[px(x), GY0 - 0.35, 0.2]} size={0.4} color="#cfd8dc" />
      ))}
      <Label text={`K=${k}`} position={[GX0 - 0.75, yK, 0.2]} size={0.42} color="#ef9a9a" />
      <Line points={[[GX0, yK, 0.05], [GX1, yK, 0.05]]} color={POP_COLORS.k} lineWidth={1.5} dashed dashSize={0.2} gapSize={0.15} />

      {showExp && full(curve(fExp, TIME_MAX), POP_COLORS.exp)}
      {showExp && live(curve(fExp, tc), POP_COLORS.exp)}
      {showLog && full(curve(fLog, TIME_MAX), POP_COLORS.log)}
      {showLog && live(curve(fLog, tc), POP_COLORS.log)}

      {showExp && fExp(tc) <= yMax && (
        <mesh position={[px(tc), py(fExp(tc)), 0.25]}>
          <sphereGeometry args={[0.13, 12, 8]} />
          <meshBasicMaterial color={POP_COLORS.exp} />
        </mesh>
      )}
      {showLog && (
        <mesh position={[px(tc), py(fLog(tc)), 0.25]}>
          <sphereGeometry args={[0.13, 12, 8]} />
          <meshBasicMaterial color={POP_COLORS.log} />
        </mesh>
      )}
      {showLog && tHalf !== null && (
        <group>
          <mesh position={[px(tHalf), py(k / 2), 0.2]}>
            <sphereGeometry args={[0.1, 10, 8]} />
            <meshBasicMaterial color="#ffeb3b" />
          </mesh>
          <Label text="K/2" position={[px(tHalf) + 0.55, py(k / 2) - 0.35, 0.3]} size={0.4} color="#ffeb3b" />
        </group>
      )}
    </group>
  )
}
