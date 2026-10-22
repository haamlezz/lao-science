import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLang } from '../i18n/LangContext'
import { ptElements, metalClassOf } from '../data/periodicTable'
import type { PtElement } from '../data/periodicTable'
import { categories, states, metalClassName } from '../content/periodicTable'
import { SceneCanvas } from '../scenes/SceneCanvas'
import { ElementAtomScene, atomExtent } from '../scenes/ElementAtomScene'

type Mode = 'category' | 'state'

const catByKey = Object.fromEntries(categories.map((c) => [c.key, c]))
const stateByKey = Object.fromEntries(states.map((s) => [s.key, s]))

function keyOf(el: PtElement, mode: Mode): string {
  return mode === 'category' ? el.category : el.state
}
function colorOf(el: PtElement, mode: Mode): string {
  return mode === 'category' ? catByKey[el.category].color : stateByKey[el.state].color
}
function massText(el: PtElement): string {
  return el.massIsApprox ? `[${el.mass}]` : String(el.mass)
}

function ShellDiagram({ el }: { el: PtElement }) {
  const n = el.shells.length
  const step = 70 / n
  return (
    <svg viewBox="-100 -100 200 200" className="shell-svg" role="img" aria-label={el.shells.join('-')}>
      <circle r={9} fill="#ff7043" />
      <text y={3.5} textAnchor="middle" fontSize={9} fontWeight={700} fill="#0f1d2b">
        {el.Z}+
      </text>
      {el.shells.map((count, i) => {
        const r = 20 + (i + 1) * step
        return (
          <g key={i}>
            <circle r={r} fill="none" stroke="#7f93a6" strokeWidth={0.8} />
            {Array.from({ length: count }, (_, k) => {
              const a = (2 * Math.PI * k) / count - Math.PI / 2
              return <circle key={k} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={n > 5 ? 2.4 : 3.2} fill="#0a6c8f" />
            })}
          </g>
        )
      })}
    </svg>
  )
}

function Detail({ el, onClose, onStep }: { el: PtElement; onClose: () => void; onStep: (d: number) => void }) {
  const { t, tx } = useLang()
  const closeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isFull, setIsFull] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const cat = catByKey[el.category]
  const st = stateByKey[el.state]
  const A = Math.round(el.mass)
  // Z <= 18 always follows 2-8-8; for heavier elements say so only when a shell exceeds 8 before the last one.
  const beyond8 = el.Z > 18 && el.Z < 104

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Real browser fullscreen when available; otherwise the same layout via CSS only.
  const [cssFull, setCssFull] = useState(false)
  useEffect(() => {
    const on = () => setIsFull(document.fullscreenElement === overlayRef.current)
    document.addEventListener('fullscreenchange', on)
    return () => {
      document.removeEventListener('fullscreenchange', on)
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
    }
  }, [])
  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined)
    } else if (cssFull) {
      setCssFull(false)
    } else if (overlayRef.current?.requestFullscreen) {
      overlayRef.current.requestFullscreen().catch(() => setCssFull(true))
    } else {
      setCssFull(true)
    }
  }, [cssFull])
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') toggleFull()
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [toggleFull])
  const full = isFull || cssFull

  return (
    <div ref={overlayRef} className={`pt-overlay ${full ? 'full' : ''}`} onClick={onClose}>
      <div
        className="pt-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${el.name} (${el.symbol})`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-dialog-head">
          <div className="pt-big" style={{ background: cat.color }}>
            <span className="pt-big-z">{el.Z}</span>
            <span className="pt-big-sym">{el.symbol}</span>
            <span className="pt-big-mass">{massText(el)}</span>
          </div>
          <div className="pt-title">
            <h2>{el.name}</h2>
            <p className="faint">{tx(cat.name)}</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={toggleFull} aria-pressed={full}>
            {full ? `⤡ ${t('ptExitFull')}` : `⤢ ${t('ptFull')}`}
          </button>
          <button ref={closeRef} type="button" className="btn btn-ghost" onClick={onClose}>
            {t('ptClose')} ✕
          </button>
        </div>

        <div className="pt-dialog-body">
          <dl className="pt-facts">
            <dt>{t('ptAtomicNumber')}</dt>
            <dd>{el.Z}</dd>
            <dt>{t('ptMass')}</dt>
            <dd>{massText(el)}</dd>
            <dt>{t('ptCategory')}</dt>
            <dd>
              <span className="dot" style={{ background: cat.color }} /> {tx(cat.name)}
            </dd>
            <dt>{t('ptClass')}</dt>
            <dd>{tx(metalClassName[metalClassOf(el.category)])}</dd>
            <dt>{t('ptState')}</dt>
            <dd>
              <span className="dot" style={{ background: st.color }} /> {tx(st.name)}
            </dd>
            <dt>{t('ptPeriod')}</dt>
            <dd>{el.period}</dd>
            <dt>{t('ptGroup')}</dt>
            <dd>{el.group ?? '—'}</dd>
          </dl>

          <div className="pt-atom">
            <div className="pt-stage">
              <SceneCanvas
                is2D={false}
                autoRotate={autoRotate}
                resetKey={resetKey}
                camZ={atomExtent(el.shells.length) * 2.6 + 2}
                zoom2D={1}
                fallback={<ShellDiagram el={el} />}
              >
                <ElementAtomScene protons={el.Z} neutrons={A - el.Z} shells={el.shells} />
              </SceneCanvas>
              <div className="pt-stage-tools">
                <button type="button" className={`btn btn-tool ${autoRotate ? 'on' : ''}`} onClick={() => setAutoRotate((v) => !v)}>
                  {t('autoRotate')}
                </button>
                <button type="button" className="btn btn-tool" onClick={() => setResetKey((k) => k + 1)}>
                  {t('resetView')}
                </button>
              </div>
              <p className="pt-stage-hint">{t('hint3d')}</p>
            </div>
            <ul className="pt-mini-legend">
              <li><i style={{ background: '#ef5350' }} /> {t('bohrP')}</li>
              <li><i style={{ background: '#b0bec5' }} /> {t('bohrN')}</li>
              <li><i style={{ background: '#4fc3f7' }} /> {t('bohrE')}</li>
            </ul>
            <p>
              <strong>{t('ptShells')}:</strong> {el.shells.join(' – ')}
            </p>
            {beyond8 && <p className="faint">{t('ptShellsException')}</p>}
            {el.Z >= 104 && <p className="faint">{t('ptShellsPredicted')}</p>}
            <p className="faint">
              <strong>{t('ptSubatomic')}:</strong> {t('bohrP')} {el.Z} · {t('bohrN')} ≈ {A - el.Z} · {t('bohrE')}{' '}
              {el.Z}
            </p>
            {el.massIsApprox && <p className="faint">{t('ptMassNote')}</p>}
          </div>
        </div>

        <div className="pt-dialog-foot">
          <button type="button" className="btn" disabled={el.Z <= 1} onClick={() => onStep(-1)}>
            ← {t('ptPrev')}
          </button>
          <button type="button" className="btn" disabled={el.Z >= 118} onClick={() => onStep(1)}>
            {t('ptNext')} →
          </button>
        </div>
      </div>
    </div>
  )
}

/** Default cell width on phones so that 18 columns scroll sideways instead of shrinking to unreadable boxes. */
function defaultCellPx(): number {
  return window.innerWidth <= 640 ? 46 : 62
}

export function PeriodicTable({ onHome }: { onHome: () => void }) {
  const { t, tx } = useLang()
  const [mode, setMode] = useState<Mode>('category')
  const [focusKey, setFocusKey] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const legend = mode === 'category' ? categories : states
  const counts = useMemo(() => {
    const m = new Map<string, number>()
    for (const el of ptElements) m.set(keyOf(el, mode), (m.get(keyOf(el, mode)) ?? 0) + 1)
    return m
  }, [mode])

  const open = (Z: number) => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setSelected(Z)
  }
  const close = useCallback(() => {
    setSelected(null)
    returnFocus.current?.focus()
  }, [])
  const step = useCallback((d: number) => {
    setSelected((z) => (z === null ? z : Math.min(118, Math.max(1, z + d))))
  }, [])

  useEffect(() => {
    if (selected === null) return
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [selected, close, step])

  // phones: cell width in px (null = default for the screen); the table scrolls sideways and can be zoomed
  const [cellPx, setCellPx] = useState<number | null>(null)
  const zoom = (d: number) => setCellPx((c) => Math.min(96, Math.max(30, (c ?? defaultCellPx()) + d)))

  const fixedGrid = cellPx !== null || window.innerWidth <= 640
  const effPx = cellPx ?? defaultCellPx()

  const switchMode = (m: Mode) => {
    setMode(m)
    setFocusKey(null)
  }

  const current = selected === null ? null : ptElements[selected - 1]

  return (
    <main className="pt-page">
      <div className="pt-bar">
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ← {t('back')}
        </button>
        <h1 className="pt-h1">{t('ptTitle')}</h1>
        <div className="pt-mode">
          <span className="faint">{t('ptColorBy')}</span>
          <div className="seg" role="group" aria-label={t('ptColorBy')}>
            <button type="button" className={mode === 'category' ? 'on' : ''} onClick={() => switchMode('category')}>
              {t('ptByCategory')}
            </button>
            <button type="button" className={mode === 'state' ? 'on' : ''} onClick={() => switchMode('state')}>
              {t('ptByState')}
            </button>
          </div>
        </div>
      </div>

      <section className="pt-legend" aria-label={t('ptLegend')}>
        <h2 className="pt-legend-title">
          {t('ptLegend')}
          {focusKey && (
            <button type="button" className="btn btn-ghost pt-clear" onClick={() => setFocusKey(null)}>
              {t('ptShowAll')}
            </button>
          )}
        </h2>
        <ul>
          {legend.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                className={`pt-key ${focusKey === item.key ? 'on' : ''}`}
                aria-pressed={focusKey === item.key}
                onClick={() => setFocusKey(focusKey === item.key ? null : item.key)}
              >
                <i style={{ background: item.color }} />
                <span>
                  <strong>{tx(item.name)}</strong> <span className="faint">({counts.get(item.key) ?? 0})</span>
                  <small>{tx(item.desc)}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-zoom" role="group" aria-label={t('ptZoomLabel')}>
        <button type="button" className="btn btn-ghost" onClick={() => zoom(-8)} aria-label={t('ptZoomOut')}>
          −
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => zoom(8)} aria-label={t('ptZoomIn')}>
          +
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setCellPx(null)}>
          {t('ptZoomFit')}
        </button>
      </div>

      <div className="pt-scroll">
        <div
          className={`pt-grid ${fixedGrid ? 'fixed' : ''} ${fixedGrid && effPx < 60 ? 'compact' : ''}`}
          style={fixedGrid ? ({ ['--pt-cell' as string]: `${effPx}px` } as CSSProperties) : undefined}
        >
          {ptElements.map((el) => {
            const dim = focusKey !== null && keyOf(el, mode) !== focusKey
            return (
              <button
                key={el.Z}
                type="button"
                className={`pt-cell ${dim ? 'dim' : ''}`}
                style={{ gridRow: el.row, gridColumn: el.col, background: colorOf(el, mode) }}
                onClick={() => open(el.Z)}
                aria-label={`${el.Z} ${el.name} ${el.symbol}`}
              >
                <span className="pt-z">{el.Z}</span>
                <span className="pt-sym">{el.symbol}</span>
                <span className="pt-name">{el.name}</span>
                <span className="pt-mass">{massText(el)}</span>
              </button>
            )
          })}
          <div className="pt-fnote" style={{ gridRow: 9, gridColumn: '1 / 3' }}>
            {t('ptLanthPlaceholder')}
          </div>
          <div className="pt-fnote" style={{ gridRow: 10, gridColumn: '1 / 3' }}>
            {t('ptActPlaceholder')}
          </div>
        </div>
      </div>

      <p className="faint pt-hint">{t('ptHint')}</p>

      {current && <Detail el={current} onClose={close} onStep={step} />}
    </main>
  )
}
