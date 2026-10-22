import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { FC, ReactNode } from 'react'
import { useLang } from '../../i18n/LangContext'
import type { UiKey } from '../../i18n/strings'
import type { SimProps } from '../../content/lower'
import { SceneCanvas, supported } from '../SceneCanvas'

/** Contract of one simulation module (spec 6.4). `S` is the sim's own state. */
export interface SimDef<S extends object> {
  initial: S
  camera: { camZ: number; zoom2D: number }
  /** Shown after the 2D/3D hint when true (exaggerated / schematic drawings). */
  notToScale: boolean
  /** True when the sim's own controls already show a Reset button. */
  ownReset?: boolean
  Scene: FC<{ state: S; is2D: boolean }>
  /** `reset` restores every control and the camera, same as the R key. */
  Controls: FC<{ state: S; set: (patch: Partial<S>) => void; simProps?: SimProps; reset: () => void }>
  legend: (state: S, t: (k: UiKey) => string) => { color: string; label: string }[]
  readout?: (state: S, t: (k: UiKey) => string) => ReactNode
}

/** What LessonPage passes to a sim: view state it owns, plus lesson accent colour and props. */
export interface SimHostProps {
  is2D: boolean
  autoRotate: boolean
  resetKey: number
  /** Bumped by the R key: restores the sim's initial state (camera uses resetKey). */
  simResetKey: number
  onToggleAuto: () => void
  onResetView: () => void
  accent: string
  simProps?: SimProps
}

/** Wraps a SimDef into a self-contained stage + controls component that owns the sim state. */
export function makeSimHost<S extends object>(def: SimDef<S>): FC<SimHostProps> {
  const { Scene, Controls } = def
  function SimHost({ is2D, autoRotate, resetKey, simResetKey, onToggleAuto, onResetView, accent, simProps }: SimHostProps) {
    const { t } = useLang()
    const [state, setState] = useState<S>(def.initial)
    const set = useCallback((patch: Partial<S>) => setState((s) => ({ ...s, ...patch })), [])
    const lastReset = useRef(simResetKey)
    useEffect(() => {
      if (lastReset.current !== simResetKey) {
        lastReset.current = simResetKey
        setState(def.initial)
      }
    }, [simResetKey])
    const resetAll = () => {
      setState(def.initial)
      onResetView()
    }

    const fallback = (
      <div className="webgl-fail">
        <p>{t('webglFail')}</p>
      </div>
    )

    // in presentation mode the readout lives in the right-hand column (slot), so the controls strip stays short
    const [slot, setSlot] = useState<HTMLElement | null>(null)
    useEffect(() => {
      setSlot(document.getElementById('sim-readout-slot'))
    })
    const readoutNode = def.readout?.(state, t)

    return (
      <>
      <section className="stage-col">
        <div className="stage" style={{ ['--accent' as string]: accent }}>
          <SceneCanvas
            is2D={is2D}
            autoRotate={autoRotate}
            resetKey={resetKey}
            camZ={def.camera.camZ}
            zoom2D={def.camera.zoom2D}
            fallback={fallback}
          >
            <Scene state={state} is2D={is2D} />
          </SceneCanvas>
          {supported && <div className="stage-tools">
            {!is2D && (
              <button type="button" className={`btn btn-tool ${autoRotate ? 'on' : ''}`} aria-pressed={autoRotate} onClick={onToggleAuto}>
                ⟳ {t('autoRotate')}
              </button>
            )}
            <button type="button" className="btn btn-tool" onClick={onResetView}>
              ⌖ {t('resetView')}
            </button>
          </div>}
          <ul className="legend">
            {def.legend(state, t).map((l) => (
              <li key={l.label}>
                <i style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
          {supported && (
            <div className="stage-hint sim-hint">
              {is2D ? t('hint2d') : t('hint3d')}
              {def.notToScale ? ` · ${t('notToScale')}` : ''}
            </div>
          )}
        </div>

        <div className="controls m2-controls">
          {!def.ownReset && (
            <div className="ctl-row sim-reset-row">
              <button type="button" className="btn btn-ghost" onClick={resetAll}>
                ↺ {t('simReset')}
              </button>
            </div>
          )}
          <Controls state={state} set={set} simProps={simProps} reset={resetAll} />
          {!slot && readoutNode}
        </div>
      </section>
      {slot && readoutNode && createPortal(<div className="m2-controls sim-readout-moved">{readoutNode}</div>, slot)}
      </>
    )
  }
  return SimHost
}
