import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'

const DELAY_MS = 1200

/**
 * For experiments that end (reach the target / finish the run): when a running experiment ends and the
 * option is on, restart it after a short pause so the result stays visible first. Off by default.
 */
export function useAutoRepeat(finished: boolean, playing: boolean, restart: () => void): ReactNode {
  const { t } = useLang()
  const [on, setOn] = useState(false)
  const wasPlaying = useRef(false)
  const cb = useRef(restart)
  useEffect(() => {
    cb.current = restart
  })
  const endedByRun = wasPlaying.current && finished && !playing
  useEffect(() => {
    wasPlaying.current = playing
  }, [playing])
  useEffect(() => {
    if (!on || !endedByRun) return
    const id = window.setTimeout(() => cb.current(), DELAY_MS)
    return () => window.clearTimeout(id)
  }, [on, endedByRun])
  return (
    <label className="auto-repeat">
      <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <span>↻ {t('autoRepeat')}</span>
    </label>
  )
}
