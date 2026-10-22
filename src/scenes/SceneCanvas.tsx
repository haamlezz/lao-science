import { Component, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

interface Props {
  is2D: boolean
  autoRotate: boolean
  resetKey: number
  camZ: number
  zoom2D: number
  fallback: ReactNode
  children: ReactNode
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export const supported = webglAvailable()

// Pull the camera back (3D) or zoom out (2D) on narrow stages so the whole scene stays visible.
function Fit({ camZ, zoom2D }: { camZ: number; zoom2D: number }) {
  const size = useThree((st) => st.size)
  const camera = useThree((st) => st.camera)
  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.z = camZ * Math.max(1, 1.5 / aspect)
      camera.updateProjectionMatrix()
    } else if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = zoom2D * Math.min(1, aspect / 1.5)
      camera.updateProjectionMatrix()
    }
  }, [size.width, size.height, camera, camZ, zoom2D])
  return null
}

/** 3D: perspective camera + free 360° rotation. 2D: orthographic front view, rotation locked. */
export function SceneCanvas({ is2D, autoRotate, resetKey, camZ, zoom2D, fallback, children }: Props) {
  if (!supported) return <>{fallback}</>
  return (
    <Boundary fallback={fallback}>
      <Canvas
        key={`${is2D ? '2d' : '3d'}-${resetKey}`}
        orthographic={is2D}
        camera={
          is2D
            ? { position: [0, 0, 30], zoom: zoom2D, near: 0.1, far: 100 }
            : { position: [0, 0, camZ], fov: 45, near: 0.1, far: 200 }
        }
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 10]} intensity={2.2} />
        <pointLight position={[-8, -5, 6]} intensity={40} />
        <Fit camZ={camZ} zoom2D={zoom2D} />
        {children}
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={!is2D}
          autoRotate={autoRotate && !is2D}
          autoRotateSpeed={1.4}
          enableDamping
          minDistance={5}
          maxDistance={60}
          minZoom={8}
          maxZoom={300}
        />
      </Canvas>
    </Boundary>
  )
}
