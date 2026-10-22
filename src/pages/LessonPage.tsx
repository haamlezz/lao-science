import { Suspense, useCallback, useEffect, useState } from 'react'
import { usePresentSvgText } from './usePresentSvgText'
import type { ReactNode } from 'react'
import { CurriculumLink } from '../components/CurriculumLink'
import { useLang } from '../i18n/LangContext'
import type { UiKey } from '../i18n/strings'
import { GRADES, lessonColor } from '../content/lower'
import type { ReadyLesson } from '../content/lower'
import { getSimComponent } from '../scenes/sims/registry'
import { QuizPanel, useQuiz } from '../components/QuizPanel'
import { IdeaCards } from '../components/IdeaCards'

const SUBJ_KEY: Partial<Record<string, UiKey>> = { phys: 'subjPhys', chem: 'subjChem', bio: 'subjBio' }

type Tab = 'learn' | 'obj' | 'teacher' | 'quiz'

const TABS: [Tab, UiKey][] = [
  ['learn', 'tabLearn'],
  ['obj', 'tabObjectives'],
  ['teacher', 'tabTeacher'],
  ['quiz', 'tabQuiz'],
]

type Slide = { kind: 'intro' } | { kind: 'idea' | 'question'; i: number } | { kind: 'activity' } | { kind: 'quiz' }

/** Shortcuts must not fire while typing, on sliders/selects, or anywhere inside the quiz. */
function isTyping(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName) || el.closest('[data-quiz]') !== null
}

interface Props {
  lesson: ReadyLesson
  onBack: () => void
}

/** Generic lesson page for any ready lesson: with a simulation (stage + controls) or content-only (reading layout). */
export function LessonPage({ lesson, onBack }: Props) {
  const { t, tx, toggle } = useLang()
  const Sim = lesson.sim ? getSimComponent(lesson.sim) : undefined
  const hasSim = Sim !== undefined
  const grade = GRADES.find((g) => g.key === lesson.grade)
  const accent = lessonColor(lesson)

  const [is2D, setIs2D] = useState(false)
  const [auto, setAuto] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [simResetKey, setSimResetKey] = useState(0)
  const [tab, setTab] = useState<Tab>('learn')
  const [present, setPresent] = useState(false)
  usePresentSvgText(present)
  const [idea, setIdea] = useState(-1)
  const [slide, setSlide] = useState(0)
  const quiz = useQuiz()

  const slides: Slide[] = [
    { kind: 'intro' },
    ...lesson.keyIdeas.map((_, i): Slide => ({ kind: 'idea', i })),
    ...lesson.questions.map((_, i): Slide => ({ kind: 'question', i })),
    { kind: 'activity' },
    { kind: 'quiz' },
  ]
  const slideMode = present && !hasSim

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

  const nIdeas = lesson.keyIdeas.length
  const nSlides = lesson.keyIdeas.length + lesson.questions.length + 3
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (k === 'p') (present ? exitPresent : enterPresent)()
      else if (k === 'escape' && present) exitPresent()
      else if (k === 'l') toggle()
      else if (k === '2' && hasSim) setIs2D(true)
      else if (k === '3' && hasSim) setIs2D(false)
      else if (k === 'r' && hasSim) {
        setResetKey((n) => n + 1)
        setSimResetKey((n) => n + 1)
      }
      else if (k === 'arrowright' || k === 'arrowleft') {
        const d = k === 'arrowright' ? 1 : -1
        if (slideMode) setSlide((s) => Math.min(Math.max(s + d, 0), nSlides - 1))
        else setIdea((i) => Math.min(Math.max(i + d, 0), nIdeas - 1))
      }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [present, enterPresent, exitPresent, toggle, hasSim, slideMode, nSlides, nIdeas])

  const gradeLabel = grade ? t(grade.labelKey) : ''

  const learnBody = (withQuiz: boolean): ReactNode => (
    <div className="tab-body" role="tabpanel">
      <h2>{tx(lesson.title)}</h2>
      <p className="lead">{tx(lesson.summary)}</p>
      <h3>{t('keyIdeas')}</h3>
      <IdeaCards ideas={lesson.keyIdeas} active={idea} />
      {withQuiz && (
        <>
          <h3>{t('tabQuiz')}</h3>
          <QuizPanel items={lesson.quiz} quiz={quiz} />
        </>
      )}
    </div>
  )

  const panel = (
    <div className="panel">
      <div className="tabs" role="tablist">
        {TABS.map(([k, label]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
            {t(label)}
          </button>
        ))}
      </div>
      {(tab === 'learn' || present) && learnBody(!hasSim)}
      {tab === 'obj' && !present && (
        <div className="tab-body" role="tabpanel">
          <h2>
            {t('objectivesTitle')} · {gradeLabel}
          </h2>
          <ul className="objs">
            {lesson.objectives.map((o, i) => (
              <li key={i}>
                <span>{tx(o)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'teacher' && !present && (
        <div className="tab-body" role="tabpanel">
          <h2>{t('tabTeacher')}</h2>
          <p className="faint">
            {t('suggestedTime')}: {lesson.minutes} {t('minutes')}
          </p>
          <h3>{t('questions')}</h3>
          <ol className="ideas">
            {lesson.questions.map((q, i) => (
              <li key={i}>{tx(q)}</li>
            ))}
          </ol>
          <h3>{t('activity')}</h3>
          <p>{tx(lesson.activity)}</p>
        </div>
      )}
      {tab === 'quiz' && !present && (
        <div className="tab-body" role="tabpanel">
          <h2>{t('tabQuiz')}</h2>
          <QuizPanel items={lesson.quiz} quiz={quiz} />
        </div>
      )}
    </div>
  )

  const draft = !present && (
    <p className="draft" role="note">
      {t(lesson.field === 'chem' ? 'draftBadge' : lesson.field === 'phys' ? 'draftBadgePhys' : lesson.field === 'bio' ? 'draftBadgeBio' : 'draftBadgeGen')}
    </p>
  )

  const slideView = (() => {
    const s = slides[Math.min(slide, slides.length - 1)]
    return (
      <main className="slides" style={{ ['--accent' as string]: accent }}>
        <div className="slide" aria-live="polite">
          {s.kind === 'intro' && (
            <>
              <h2>{tx(lesson.title)}</h2>
              <p className="lead">{tx(lesson.summary)}</p>
            </>
          )}
          {s.kind === 'idea' && (
            <>
              <h3>
                {t('keyIdeas')} {s.i + 1} / {nIdeas}
              </h3>
              <p>{tx(lesson.keyIdeas[s.i])}</p>
            </>
          )}
          {s.kind === 'question' && (
            <>
              <h3>
                {t('questions')} {s.i + 1} / {lesson.questions.length}
              </h3>
              <p>{tx(lesson.questions[s.i])}</p>
            </>
          )}
          {s.kind === 'activity' && (
            <>
              <h3>{t('activity')}</h3>
              <p>{tx(lesson.activity)}</p>
            </>
          )}
          {s.kind === 'quiz' && (
            <>
              <h3>{t('tabQuiz')}</h3>
              <QuizPanel items={lesson.quiz} quiz={quiz} />
            </>
          )}
        </div>
        <div className="slide-nav">
          <button type="button" className="btn" disabled={slide === 0} onClick={() => setSlide((n) => Math.max(n - 1, 0))}>
            ← {t('prev')}
          </button>
          <span className="slide-count">
            {t('slideOf')} {slide + 1} / {slides.length}
          </span>
          <button type="button" className="btn btn-primary" disabled={slide >= slides.length - 1} onClick={() => setSlide((n) => Math.min(n + 1, slides.length - 1))}>
            {t('next')} →
          </button>
        </div>
      </main>
    )
  })()

  return (
    <div className={`lesson-wrap ${present ? 'present' : ''}`} data-stage={hasSim ? 'sim' : 'reading'}>
      <div className="lesson-bar">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← {t('backToGrade')}
        </button>
        <h1 className="lesson-title">
          {tx(lesson.title)}
          <span className="chip">{gradeLabel}</span>
          {SUBJ_KEY[lesson.field] && <span className="chip chip-subject">{t(SUBJ_KEY[lesson.field] as UiKey)}</span>}
        </h1>
        <div className="bar-actions">
          {hasSim && (
            <div className="seg" role="radiogroup" aria-label="2D / 3D">
              <button type="button" role="radio" aria-checked={is2D} className={is2D ? 'on' : ''} onClick={() => setIs2D(true)}>
                {t('view2d')}
              </button>
              <button type="button" role="radio" aria-checked={!is2D} className={!is2D ? 'on' : ''} onClick={() => setIs2D(false)}>
                {t('view3d')}
              </button>
            </div>
          )}
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

      {slideMode ? (
        slideView
      ) : hasSim ? (
        <main className="lesson">
          <Suspense
            fallback={
              <section className="stage-col">
                <div className="stage">
                  <div className="webgl-fail">
                    <p>{t('simLoading')}</p>
                  </div>
                </div>
              </section>
            }
          >
            <Sim
              is2D={is2D}
              autoRotate={auto}
              resetKey={resetKey}
              simResetKey={simResetKey}
              onToggleAuto={() => setAuto((a) => !a)}
              onResetView={() => setResetKey((k) => k + 1)}
              accent={accent}
              simProps={lesson.simProps}
            />
          </Suspense>
          <aside className="panel-col">
            {present && <div id="sim-readout-slot" />}
            {panel}
            {draft}
          </aside>
        </main>
      ) : (
        <main className="reading" style={{ ['--accent' as string]: accent }}>
          {panel}
          {draft}
        </main>
      )}

      {!present && (
        <footer className="foot">
          <span>{t(hasSim ? 'lessonKeyHelp' : 'readingKeyHelp')}</span>
          <span>
            {t(grade?.level === 'upper' ? 'upperSource' : 'm2Source')} · <CurriculumLink />
          </span>
        </footer>
      )}
    </div>
  )
}
