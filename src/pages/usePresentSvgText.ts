import { useEffect } from 'react'

const MIN_PX = 28.1

/**
 * In presentation mode every graph (SVG scaled by its viewBox) gets tick/axis text of at least
 * MIN_PX effective screen pixels: the user-unit font size is divided by the current scale.
 */
export function usePresentSvgText(active: boolean): void {
  useEffect(() => {
    if (!active) return
    const apply = () => {
      document.querySelectorAll<SVGSVGElement>('.m2-controls svg[viewBox]').forEach((svg) => {
        const m = svg.getScreenCTM()
        const scale = m ? Math.hypot(m.a, m.b) : 0
        if (scale <= 0) return
        const size = `${(MIN_PX / scale).toFixed(2)}px`
        svg.querySelectorAll<SVGTextElement>('.pg-tick, .pg-label, .mo-tick, .mo-label').forEach((el) => {
          if (el.style.fontSize !== size) el.style.fontSize = size
        })
      })
    }
    let raf = 0
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      mo.disconnect()
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [active])
}
