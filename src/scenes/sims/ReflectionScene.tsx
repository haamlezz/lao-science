import { Line } from '@react-three/drei'
import { Arrow } from '../Arrow'
import { Label } from '../Label'
import { imagePosition, incidentDirection, reflectedDirection } from '../../sims/reflection'

export const REFLECT_COLORS = { incident: '#ffd54f', reflected: '#4fc3f7', normal: '#eceff1', image: '#ce93d8' }

const RAY_LEN = 4.4
const CANDLE_X = 4.6
const MIRROR_W = 12.4

function arc(r: number, from: number, to: number, key: string, color: string) {
  // ring segment between two angles (radians, from +x axis)
  return (
    <mesh key={key} position={[0, 0, 0.05]}>
      <ringGeometry args={[r - 0.05, r, 32, 1, from, to - from]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Candle({ y, flip, ghost }: { y: number; flip?: boolean; ghost?: boolean }) {
  // the image is laterally inverted: drawn upside-down about the mirror
  const s = flip ? -1 : 1
  return (
    <group position={[CANDLE_X, y, 0]} scale={[1.5, 1.5 * s, 1.5]}>
      <mesh position={[0, 0.3 * s * s, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#fafafa" transparent={ghost} opacity={ghost ? 0.4 : 1} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.14, 0.4, 12]} />
        <meshStandardMaterial
          color="#ffb300"
          emissive="#ff6f00"
          emissiveIntensity={0.7}
          transparent={ghost}
          opacity={ghost ? 0.4 : 1}
        />
      </mesh>
    </group>
  )
}

interface Props {
  i: number // degrees
  d: number // object distance, cells
  showImage: boolean
  showNormal: boolean
  secondMirrorDeg: number | null // angle of a second mirror to the first (0 = none)
}

/** Mirror along y = 0, normal up. Incident ray comes from the lamp at fixed slant length; angles are from the normal. */
export function ReflectionScene({ i, d, showImage, showNormal, secondMirrorDeg }: Props) {
  const inc = incidentDirection(i)
  const ref = reflectedDirection(i)
  const lamp: [number, number, number] = [-inc.x * RAY_LEN, -inc.y * RAY_LEN, 0]
  const lampImage = imagePosition({ x: lamp[0], y: lamp[1] })
  const rad = (i * Math.PI) / 180
  const half = Math.PI / 2
  // Angle labels sit beside their ray, clear of the arcs (radius <= 1.5): outside the ray for small i,
  // above the ray for large i (outside would fall below the mirror). side: -1 incident (left), +1 reflected (right).
  const angleLabel = (side: -1 | 1): [number, number, number] => {
    const c = Math.cos(rad)
    const s = Math.sin(rad)
    const along = 3.4
    const outward = i <= 55
    const off = outward ? 1.6 : 0.9
    const px = outward ? -c : c
    const py = outward ? -s : s
    return [side * (s * along - px * off), c * along + py * off, 0.1]
  }
  const LABEL_BG = 'rgba(11, 27, 43, 0.85)'
  return (
    <group>
      {/* mirror with a little thickness so it never disappears edge-on in 3D */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[MIRROR_W, 0.2, 1.4]} />
        <meshStandardMaterial color="#90caf9" metalness={0.6} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.28, 0]}>
        <boxGeometry args={[MIRROR_W, 0.16, 1.4]} />
        <meshStandardMaterial color="#455a64" />
      </mesh>

      {showNormal && (
        <>
          <Line points={[[0, -3.4, 0], [0, 5.2, 0]]} color={REFLECT_COLORS.normal} lineWidth={2} dashed dashSize={0.2} gapSize={0.15} />
          <Label text="N" position={[0.35, 5.0, 0]} size={0.65} />
        </>
      )}

      {/* rays: incident from the lamp to the hit point O, reflected away from O; thick arrows keep them readable */}
      <mesh position={lamp}>
        <sphereGeometry args={[0.2, 16, 12]} />
        <meshStandardMaterial color="#ffd54f" emissive="#ffb300" emissiveIntensity={0.6} />
      </mesh>
      <Arrow origin={lamp} dir={[inc.x, inc.y, 0]} len={RAY_LEN} color={REFLECT_COLORS.incident} />
      <Arrow origin={[0, 0, 0]} dir={[ref.x, ref.y, 0]} len={RAY_LEN} color={REFLECT_COLORS.reflected} />

      {i > 0 && (
        <>
          {arc(1.2, half, half + rad, 'ai', REFLECT_COLORS.incident)}
          {arc(1.5, half - rad, half, 'ar', REFLECT_COLORS.reflected)}
          <Label text={`i = ${i}°`} position={angleLabel(-1)} size={0.65} color={REFLECT_COLORS.incident} bg={LABEL_BG} />
          <Label text={`r = ${i}°`} position={angleLabel(1)} size={0.65} color={REFLECT_COLORS.reflected} bg={LABEL_BG} />
        </>
      )}

      {/* virtual image of the lamp: dashed extension of the reflected ray behind the mirror */}
      {showImage && (
        <>
          <Line
            points={[[0, 0, 0], [lampImage.x, lampImage.y, 0]]}
            color={REFLECT_COLORS.image}
            lineWidth={2}
            dashed
            dashSize={0.2}
            gapSize={0.15}
          />
          <mesh position={[lampImage.x, lampImage.y, 0]}>
            <sphereGeometry args={[0.2, 16, 12]} />
            <meshStandardMaterial color={REFLECT_COLORS.image} transparent opacity={0.45} />
          </mesh>
        </>
      )}

      {/* object (candle) at distance d and its image the same distance behind the mirror */}
      <Candle y={d} />
      <Label text={`d = ${d}`} position={[CANDLE_X + 1.1, d / 2, 0]} size={0.65} />
      {showImage && (
        <>
          <Candle y={-d} flip ghost />
          <Label text={`d = ${d}`} position={[CANDLE_X + 1.1, -d / 2, 0]} size={0.65} color={REFLECT_COLORS.image} />
          <Line
            points={[[CANDLE_X, d, 0], [CANDLE_X, -d, 0]]}
            color={REFLECT_COLORS.image}
            lineWidth={1.5}
            dashed
            dashSize={0.15}
            gapSize={0.15}
          />
        </>
      )}

      {secondMirrorDeg !== null && (
        <group rotation={[0, 0, (secondMirrorDeg * Math.PI) / 180]}>
          <mesh position={[3, 0, 0]}>
            <boxGeometry args={[6, 0.14, 1.4]} />
            <meshStandardMaterial color="#b0bec5" metalness={0.6} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  )
}
