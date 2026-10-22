import { CurriculumLink } from '../components/CurriculumLink'
import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'
import type { UiKey } from '../i18n/strings'
import { objectives, stages, topic } from '../content/chemM5Atom'
import type { Stage } from '../content/chemM5Atom'
import { elements, shellCounts } from '../data/elements'
import { SceneCanvas, supported } from '../scenes/SceneCanvas'
import { DaltonScene } from '../scenes/DaltonScene'
import { ThomsonScene } from '../scenes/ThomsonScene'
import { RutherfordScene } from '../scenes/RutherfordScene'
import { BohrScene, MAX_SHELL } from '../scenes/BohrScene'
import type { PhotonEvent } from '../scenes/BohrScene'
import { COLORS, wavelengthToColor } from '../scenes/common'

type Tab = 'learn' | 'obj' | 'teacher'

const CAMERA: Record<Stage['id'], { camZ: number; zoom2D: number }> = {
  dalton: { camZ: 11, zoom2D: 62 },
  thomson: { camZ: 10, zoom2D: 66 },
  rutherford: { camZ: 17, zoom2D: 40 },
  bohr: { camZ: 12.5, zoom2D: 46 },
}

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)

function isTyping(el: EventTarget | null): boolean {
  return el instanceof HTMLElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)
}

export function Lesson({ onHome }: { onHome: () => void }) {
  const { t, tx, lang, toggle } = useLang()
  const [idx, setIdx] = useState(0)
  const [is2D, setIs2D] = useState(false)
  const [auto, setAuto] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [tab, setTab] = useState<Tab>('learn')
  const [present, setPresent] = useState(false)

  const [react, setReact] = useState(false)
  const [fire, setFire] = useState(true)
  const [Z, setZState] = useState(1)
  const [hi, setHi] = useState(3)
  const [lo, setLo] = useState(2)
  const [playId, setPlayId] = useState(0)
  const [events, setEvents] = useState<PhotonEvent[]>([])

  const stage = stages[idx]
  const cam = CAMERA[stage.id]

  const step = useCallback((d: number) => setIdx((i) => clamp(i + d, 0, stages.length - 1)), [])
  const enterPresent = useCallback(() => {
    setPresent(true)
    document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])
  const exitPresent = useCallback(() => {
    setPresent(false)
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  }, [])

  useEffect(() => {
    const onFs = () => {
      if (!document.fullscreenElement) setPresent(false)
    }
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.ctrlKey || e.metaKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          step(1)
          break
        case 'ArrowLeft':
        case 'PageUp':
          step(-1)
          break
        case 'p':
        case 'P':
          if (present) exitPresent()
          else enterPresent()
          break
        case 'Escape':
          if (present) exitPresent()
          break
        case '2':
          setIs2D(true)
          break
        case '3':
          setIs2D(false)
          break
        case 'l':
        case 'L':
          toggle()
          break
        case 'r':
        case 'R':
          setResetKey((k) => k + 1)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [present, step, enterPresent, exitPresent, toggle])

  // Bohr controls
  const el = elements[Z - 1]
  const startShell = shellCounts(Z).length
  const hiEff = clamp(hi, startShell + 1, MAX_SHELL)
  const loEff = clamp(lo, startShell, hiEff - 1)
  const setZ = (z: number) => {
    setZState(clamp(z, 1, 18))
    setEvents([])
  }
  const onEvent = useCallback((e: Omit<PhotonEvent, 'id'>) => {
    setEvents((prev) => [...prev, { ...e, id: Date.now() + Math.random() }].slice(-4))
  }, [])

  const fallback = (
    <div className="webgl-fail" role="note">
      {t('webglFail')}
    </div>
  )

  const scene: ReactNode = (() => {
    switch (stage.id) {
      case 'dalton':
        return <DaltonScene flat={is2D} react={react} />
      case 'thomson':
        return <ThomsonScene flat={is2D} />
      case 'rutherford':
        return <RutherfordScene flat={is2D} fire={fire} />
      case 'bohr':
        return <BohrScene flat={is2D} Z={Z} hi={hiEff} lo={loEff} playId={playId} onEvent={onEvent} />
    }
  })()

  const legend: { color: string; label: string }[] = (() => {
    switch (stage.id) {
      case 'dalton':
        return [
          { color: '#f5f5f5', label: 'H · Hydrogen' },
          { color: '#e04b47', label: 'O · Oxygen' },
        ]
      case 'thomson':
        return [
          { color: COLORS.positive, label: t('legendPositive') },
          { color: COLORS.electron, label: t('legendElectron') },
        ]
      case 'rutherford':
        return [
          { color: COLORS.proton, label: t('legendNucleus') },
          { color: COLORS.electron, label: t('legendElectron') },
          { color: COLORS.alpha, label: t('legendAlpha') },
        ]
      case 'bohr':
        return [
          { color: COLORS.proton, label: t('legendProton') },
          { color: COLORS.neutron, label: t('legendNeutron') },
          { color: COLORS.electron, label: t('legendElectron') },
        ]
    }
  })()

  const region = (nm: number): UiKey => (nm < 380 ? 'regionUV' : nm > 750 ? 'regionIR' : 'regionVis')

  return (
    <div className={`lesson-wrap ${present ? 'present' : ''}`} data-stage={stage.id}>
      <div className="lesson-bar">
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ← {t('back')}
        </button>
        <h1 className="lesson-title">
          {tx(topic.title)}
          <span className="chip">{t('gradeM5')}</span>
        </h1>
        <div className="bar-actions">
          <div className="seg" role="radiogroup" aria-label="2D / 3D">
            <button type="button" role="radio" aria-checked={is2D} className={is2D ? 'on' : ''} onClick={() => setIs2D(true)}>
              {t('view2d')}
            </button>
            <button type="button" role="radio" aria-checked={!is2D} className={!is2D ? 'on' : ''} onClick={() => setIs2D(false)}>
              {t('view3d')}
            </button>
          </div>
          <button type="button" className="btn btn-primary" onClick={present ? exitPresent : enterPresent}>
            {present ? `✕ ${t('exitPresent')}` : `▶ ${t('present')}`}
          </button>
          {present && (
            <button type="button" className="btn btn-ghost" onClick={toggle} aria-label={t('langSwitchLabel')}>
              {t('langSwitch')}
            </button>
          )}
        </div>
      </div>

      <main className="lesson">
        <section className="stage-col">
          <div className="stage" style={{ ['--accent' as string]: stage.accent }}>
            <SceneCanvas
              is2D={is2D}
              autoRotate={auto}
              resetKey={resetKey}
              camZ={cam.camZ}
              zoom2D={cam.zoom2D}
              fallback={fallback}
            >
              {scene}
            </SceneCanvas>
            <div className="stage-badge" aria-live="polite">
              <span className="year">{stage.year}</span>
              <span className="who">{stage.scientist}</span>
              <span className="model">{tx(stage.model)}</span>
            </div>
            {supported && <div className="stage-tools">
              {!is2D && (
                <button type="button" className={`btn btn-tool ${auto ? 'on' : ''}`} aria-pressed={auto} onClick={() => setAuto((a) => !a)}>
                  ⟳ {t('autoRotate')}
                </button>
              )}
              <button type="button" className="btn btn-tool" onClick={() => setResetKey((k) => k + 1)}>
                ⌖ {t('resetView')}
              </button>
            </div>}
            <ul className="legend">
              {legend.map((l) => (
                <li key={l.label}>
                  <i style={{ background: l.color }} />
                  {l.label}
                </li>
              ))}
            </ul>
            {supported && (
              <div className="stage-hint">
                {is2D ? t('hint2d') : t('hint3d')}
                {(stage.id === 'rutherford' || stage.id === 'bohr' || stage.id === 'thomson') && ` · ${t('notToScale')}`}
              </div>
            )}
          </div>

          <div className="controls">
            {stage.id === 'dalton' && (
              <div className="ctl-row">
                <button type="button" className="btn btn-primary" onClick={() => setReact((r) => !r)}>
                  {react ? `↺ ${t('daltonReset')}` : `▶ ${t('daltonRearrange')}`}
                </button>
                <span className="eq" aria-label="2H2 + O2 → 2H2O">
                  2H₂ + O₂ → 2H₂O
                </span>
                <span className="count">
                  {t('daltonCount')}: {t('daltonBefore')} H 4 · O 2 &nbsp;|&nbsp; {t('daltonAfter')} H 4 · O 2
                </span>
                <span className="note">{t('daltonSame')}</span>
              </div>
            )}
            {stage.id === 'thomson' && <p className="note">{tx(stage.summary)}</p>}
            {stage.id === 'rutherford' && (
              <div className="ctl-row">
                <button type="button" className="btn btn-primary" aria-pressed={fire} onClick={() => setFire((f) => !f)}>
                  {fire ? `■ ${t('ruthStop')}` : `▶ ${t('ruthAlpha')}`}
                </button>
                <span className="note">{tx(stage.keyIdeas[1])}</span>
              </div>
            )}
            {stage.id === 'bohr' && (
              <div className="bohr-ctl">
                <div className="el-strip" role="group" aria-label={t('bohrPick')}>
                  {elements.map((e) => (
                    <button
                      key={e.Z}
                      type="button"
                      className={`el ${e.Z === Z ? 'on' : ''}`}
                      aria-pressed={e.Z === Z}
                      title={`${e.name} (Z = ${e.Z})`}
                      onClick={() => setZ(e.Z)}
                    >
                      <small>{e.Z}</small>
                      {e.symbol}
                    </button>
                  ))}
                </div>
                <div className="bohr-row">
                  <div className="el-card">
                    <div className="el-sym">
                      <small>{el.A}</small>
                      <b>{el.symbol}</b>
                      <small>{el.Z}</small>
                    </div>
                    <div className="el-facts">
                      <strong>{el.name}</strong>
                      <span>
                        {t('bohrZ')} = {el.Z} · {t('bohrA')} = {el.A}
                      </span>
                      <span className="faint">{t('bohrAnote')}</span>
                      <span>
                        <i className="dot" style={{ background: COLORS.proton }} />
                        {t('bohrP')} {el.Z} <i className="dot" style={{ background: COLORS.neutron }} />
                        {t('bohrN')} {el.A - el.Z} <i className="dot" style={{ background: COLORS.electron }} />
                        {t('bohrE')} {el.Z}
                      </span>
                      <span>
                        {t('bohrArr')}: <b>{shellCounts(Z).join(', ')}</b>
                      </span>
                    </div>
                  </div>
                  <div className="excite">
                    <div className="sel-row">
                      <label>
                        {t('bohrJumpUp')}
                        <select value={hiEff} onChange={(e) => setHi(Number(e.target.value))}>
                          {Array.from({ length: MAX_SHELL - startShell }, (_, i) => startShell + 1 + i).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        {t('bohrFallTo')}
                        <select value={loEff} onChange={(e) => setLo(Number(e.target.value))}>
                          {Array.from({ length: hiEff - startShell }, (_, i) => startShell + i).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setPlayId((p) => p + 1)}>
                      ⚡ {t('bohrExcite')}
                    </button>
                  </div>
                  <div className="log" aria-live="polite">
                    <strong>{t('bohrLog')}</strong>
                    {events.length === 0 && <span className="faint">{t('bohrNoEvents')}</span>}
                    {events.map((e) => (
                      <span key={e.id} className="log-item">
                        <i
                          className="dot big"
                          style={{ background: e.nm ? wavelengthToColor(e.nm) : '#fff3b0' }}
                        />
                        {e.kind === 'absorb' ? t('absorbed') : t('emitted')} n = {e.from} → {e.to}
                        {e.nm !== null && e.eV !== null && (
                          <>
                            {' '}
                            · {e.nm.toFixed(0)} nm · {e.eV.toFixed(2)} eV · {t(region(e.nm))}
                          </>
                        )}
                      </span>
                    ))}
                    {Z !== 1 && <span className="faint">{t('bohrHonly')}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="panel-col">
          <div className="panel">
            <div className="tabs" role="tablist">
              {(
                [
                  ['learn', 'tabLearn'],
                  ['obj', 'tabObjectives'],
                  ['teacher', 'tabTeacher'],
                ] as [Tab, UiKey][]
              ).map(([k, label]) => (
                <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                  {t(label)}
                </button>
              ))}
            </div>

            {(tab === 'learn' || present) && (
              <div className="tab-body">
                <h2>
                  {stage.scientist} · {stage.year}
                </h2>
                <p className="lead">{tx(stage.summary)}</p>
                <h3>{t('keyIdeas')}</h3>
                <ul className="ideas">
                  {stage.keyIdeas.map((k, i) => (
                    <li key={i}>{tx(k)}</li>
                  ))}
                </ul>
                <h3>{t('evidence')}</h3>
                <p>{tx(stage.evidence)}</p>
                <h3>{t('limits')}</h3>
                <ul className="ideas limits">
                  {stage.limits.map((k, i) => (
                    <li key={i}>{tx(k)}</li>
                  ))}
                </ul>
              </div>
            )}
            {tab === 'obj' && !present && (
              <div className="tab-body">
                <h2>{t('objTitle')}</h2>
                <ul className="objs">
                  {objectives.map((o, i) => (
                    <li key={i}>
                      <span>{tx(o.text)}</span>
                      <em className={o.coverage}>{o.coverage === 'full' ? t('objFull') : t('objPartial')}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tab === 'teacher' && !present && (
              <div className="tab-body">
                <h2>{t('tabTeacher')}</h2>
                <p className="faint">
                  {t('suggestedTime')}: {stage.minutes} {t('minutes')}
                </p>
                <h3>{t('questions')}</h3>
                <ol className="ideas">
                  {stage.questions.map((q, i) => (
                    <li key={i}>{tx(q)}</li>
                  ))}
                </ol>
                <h3>{t('activity')}</h3>
                <p>{tx(stage.activity)}</p>
              </div>
            )}
          </div>
          {!present && (
            <p className="draft" role="note">
              {t('draftBadge')}
            </p>
          )}
        </aside>
      </main>

      <nav className="timeline" aria-label={t('stepsLabel')}>
        <button type="button" className="btn btn-ghost" disabled={idx === 0} onClick={() => step(-1)}>
          ◀ <span className="hide-sm">{t('prev')}</span>
        </button>
        <ol>
          {stages.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`node ${i === idx ? 'on' : ''} ${i < idx ? 'past' : ''}`}
                aria-current={i === idx ? 'step' : undefined}
                style={{ ['--c' as string]: s.accent }}
                onClick={() => setIdx(i)}
              >
                <b>{s.year}</b>
                <span>{s.scientist}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-ghost" disabled={idx === stages.length - 1} onClick={() => step(1)}>
          <span className="hide-sm">{t('next')}</span> ▶
        </button>
      </nav>
      {!present && (
        <footer className="foot">
          <span>{t('keyboardHelp')}</span>
          <span>
            {t('source')} · <CurriculumLink />
          </span>
        </footer>
      )}
      <span hidden>{lang}</span>
    </div>
  )
}
