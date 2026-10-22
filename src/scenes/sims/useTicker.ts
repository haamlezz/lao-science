import { useEffect, useRef } from 'react'

/** Calls `onTick(dt seconds)` every animation frame while `active`. dt is capped at 0.1 s (tab was hidden). */
export function useTicker(active: boolean, onTick: (dt: number) => void): void {
  const cb = useRef(onTick)
  useEffect(() => {
    cb.current = onTick
  })
  useEffect(() => {
    if (!active) return
    let id = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      cb.current(dt)
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [active])
}
