import { useMemo } from 'react'
import * as THREE from 'three'

interface Props {
  origin: [number, number, number]
  dir: [number, number, number] // need not be normalised
  len: number
  color: string
}

const HEAD = 0.4

/** Force arrow: tail at `origin`, tip `len` units along `dir`. */
export function Arrow({ origin, dir, len, color }: Props) {
  const q = useMemo(() => {
    const d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize()
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d)
  }, [dir[0], dir[1], dir[2]]) // eslint-disable-line react-hooks/exhaustive-deps
  if (len <= 0.02) return null
  const shaft = Math.max(len - HEAD, 0.01)
  return (
    <group position={origin} quaternion={q}>
      <mesh position={[0, shaft / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, shaft, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, shaft + HEAD / 2, 0]}>
        <coneGeometry args={[0.2, HEAD, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
