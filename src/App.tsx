import { useEffect, useState } from 'react'
import { LangProvider, useLang } from './i18n/LangContext'
import { NoticeDialog } from './components/NoticeDialog'
import { Home, gradeRoute } from './pages/Home'
import { Lesson } from './pages/Lesson'
import { PeriodicTable } from './pages/PeriodicTable'
import { About } from './pages/About'
import { GradePage } from './pages/GradePage'
import { LessonPage } from './pages/LessonPage'
import { GRADES, resolveRoute } from './content/lower'
import { topic } from './content/chemM5Atom'

function useHash(): [string, (h: string) => void] {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#\/?/, ''))
  useEffect(() => {
    const on = () => setHash(window.location.hash.replace(/^#\/?/, ''))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return [hash, (h) => (window.location.hash = h ? `#/${h}` : '#/')]
}

function Shell() {
  const { t, toggle } = useLang()
  const [route, go] = useHash()
  const lower = resolveRoute(route)
  const inLesson = route === topic.id || lower.kind === 'custom'
  // Lesson pages handle their own keys; every other page gets the L shortcut here.
  const ownKeys = inLesson || lower.kind === 'lesson'
  useEffect(() => {
    if (ownKeys) return
    const on = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.toLowerCase() !== 'l') return
      const el = e.target
      if (el instanceof HTMLElement && (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName) || el.closest('[data-quiz]'))) return
      toggle()
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [ownKeys, toggle])

  return (
    <div className="app">
      <header className="header">
        <button type="button" className="brand" onClick={() => go('')} aria-label={t('appTitle')}>
          <img src="./favicon.svg" alt="" width={34} height={34} />
          <span>{t('appTitle')}</span>
        </button>
        <nav className="top-nav" aria-label={t('navLabel')}>
          {GRADES.map((g) => (
            <button
              key={g.key}
              type="button"
              className={`nav-link ${lower.kind === 'grade' && lower.grade === g.key || (lower.kind === 'lesson' && lower.lesson.grade === g.key) ? 'active' : ''}`}
              onClick={() => go(g.route)}
            >
              {t(g.labelKey)}
            </button>
          ))}
          <button type="button" className={`nav-link ${route === 'periodic-table' ? 'active' : ''}`} onClick={() => go('periodic-table')}>
            {t('ptTitle')}
          </button>
        </nav>
        <div className="header-right">
          <a className="btn contact-dev" aria-label={t('contactDev')} href="https://wa.me/8562059698610" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">💬</span> <span className="contact-dev-text">{t('contactDev')}</span>
          </a>
          <button type="button" className="logo-badge" onClick={() => go('about')} aria-label={t('aboutTitle')} title="Edventure Tech">
            <img src="./edventure-logo.jpg" alt="Edventure Tech" width={44} height={44} />
          </button>
        <button type="button" className="btn btn-lang" onClick={toggle} aria-label={t('langSwitchLabel')}>
          {t('langSwitch')}
        </button>
        </div>
      </header>
      <button type="button" className="corner-logo" onClick={() => go('about')} aria-label={t('aboutTitle')}>
        <img src="./edventure-logo.jpg" alt="Edventure Tech" width={56} height={56} />
      </button>
      {inLesson ? (
        <Lesson onHome={() => go(gradeRoute('m5'))} />
      ) : lower.kind === 'lesson' ? (
        <LessonPage
          key={lower.lesson.id}
          lesson={lower.lesson}
          onBack={() => go(gradeRoute(lower.lesson.grade))}
        />
      ) : lower.kind === 'grade' ? (
        <GradePage key={lower.grade} grade={lower.grade} onGo={go} onHome={() => go('')} />
      ) : route === 'about' ? (
        <About onHome={() => go('')} />
      ) : route === 'periodic-table' ? (
        <PeriodicTable onHome={() => go('')} />
      ) : (
        <>
          <Home onGo={go} />
          <NoticeDialog />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  )
}
