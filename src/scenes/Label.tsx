import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { formulaRuns } from './formula'

// Labels on the canvas are drawn as sprites (Latin letters, digits and symbols only, e.g. "H", "K n=1").
// Lao sentences never go on the canvas; they stay in the HTML panels where text shaping is reliable.

function useFontReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    Promise.all([
      document.fonts.load('700 48px "Noto Sans Lao"'),
      document.fonts.load('500 48px "Noto Sans Lao"'),
    ])
      .catch(() => undefined)
      .then(() => {
        if (alive) setReady(true)
      })
    return () => {
      alive = false
    }
  }, [])
  return ready
}

interface Props {
  text: string
  sub?: string
  position?: [number, number, number]
  color?: string
  bg?: string
  size?: number
  opacity?: number
  /** Draw digits after letters as real subscripts (chemical formulas). */
  formula?: boolean
}

export function Label({ text, sub, position = [0, 0, 0], color = '#ffffff', bg, size = 0.5, opacity = 1, formula = false }: Props) {
  const ready = useFontReady()
  const { tex, aspect } = useMemo(() => {
    const H = 128
    const mainPx = 72
    const subPx = 40
    const c = document.createElement('canvas')
    const g = c.getContext('2d')!
    const family = '"Noto Sans Lao", system-ui, sans-serif'
    g.font = `700 ${mainPx}px ${family}`
    const runs = formula ? formulaRuns(text) : [{ s: text, sub: false }]
    const subMain = Math.round(mainPx * 0.62)
    const fontOf = (sub: boolean) => `700 ${sub ? subMain : mainPx}px ${family}`
    let mw = 0
    for (const r of runs) {
      g.font = fontOf(r.sub)
      mw += g.measureText(r.s).width
    }
    g.font = `500 ${subPx}px ${family}`
    const sw = sub ? g.measureText(sub).width + 14 : 0
    const pad = bg ? 26 : 8
    const W = Math.ceil(mw + sw + pad * 2)
    c.width = W
    c.height = H
    if (bg) {
      g.fillStyle = bg
      g.beginPath()
      g.roundRect(2, 14, W - 4, H - 28, 26)
      g.fill()
    }
    g.textBaseline = 'alphabetic'
    g.fillStyle = color
    const base = H / 2 + mainPx * 0.34
    let x = pad
    for (const r of runs) {
      g.font = fontOf(r.sub)
      g.fillText(r.s, x, r.sub ? base + mainPx * 0.16 : base)
      x += g.measureText(r.s).width
    }
    if (sub) {
      g.font = `500 ${subPx}px ${family}`
      g.fillText(sub, pad + mw + 14, H / 2 + mainPx * 0.34)
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    return { tex: t, aspect: W / H }
    // `ready` is a dependency so the texture is redrawn once the font has loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, sub, color, bg, ready, formula])

  useEffect(() => () => tex.dispose(), [tex])

  return (
    <sprite position={position} scale={[size * aspect, size, 1]} renderOrder={10}>
      <spriteMaterial map={tex} transparent depthTest={false} depthWrite={false} opacity={opacity} />
    </sprite>
  )
}
