import { CurriculumNote } from '../components/CurriculumLink'
import { useLang } from '../i18n/LangContext'

export function gradeRoute(id: string): string {
  return `grade-${id}`
}

interface Props {
  onGo: (route: string) => void
}

function Overview({ onGo }: { onGo: (route: string) => void }) {
  const { t } = useLang()
  return (
    <>
      <h2 className="pick">{t('featuresTitle')}</h2>
      <div className="feature-grid">
        <button type="button" className="feature-btn" style={{ ['--c' as string]: '#ba68c8' }} onClick={() => onGo('periodic-table')}>
          <strong>{t('ptTitle')}</strong>
          <span>{t('ptCardDesc')}</span>
        </button>
      </div>
      <p className="faint home-hint">{t('homeNavHint')}</p>
      <CurriculumNote className="home-source faint" />
    </>
  )
}

export function Home({ onGo }: Props) {
  const { t } = useLang()
  return (
    <main className="home">
      <section className="hero">
        <h1>{t('appTitle')}</h1>
        <p>{t('appSubtitle')}</p>
      </section>
      <Overview onGo={onGo} />
    </main>
  )
}
