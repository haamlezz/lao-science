import { CurriculumNote } from '../components/CurriculumLink'
import { useLang } from '../i18n/LangContext'

const links = [
  { label: 'Facebook', href: 'https://www.facebook.com/edventuretech', text: 'facebook.com/edventuretech' },
  { label: 'YouTube', href: 'https://www.youtube.com/@edventuretech', text: 'youtube.com/@edventuretech' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@edventuretech', text: 'tiktok.com/@edventuretech' },
  { label: 'Instagram', href: 'https://www.instagram.com/edventuretech', text: 'instagram.com/edventuretech' },
  { label: 'WhatsApp', href: 'https://wa.me/8562059698610', text: '+856 20 5969 8610' },
]

export function About({ onHome }: { onHome: () => void }) {
  const { t } = useLang()
  return (
    <main className="about">
      <button type="button" className="btn btn-ghost" onClick={onHome}>
        ← {t('back')}
      </button>
      <section className="about-card">
        <img src="./edventure-logo.jpg" alt="Edventure Tech" width={200} height={200} className="about-logo" />
        <div>
          <h1>Edventure Tech</h1>
          <p className="about-slogan">{t('aboutSlogan')}</p>
          <p>{t('aboutIntro')}</p>
        </div>
      </section>
      <CurriculumNote className="about-source" />
      <h2 className="pick">{t('aboutFollow')}</h2>
      <p className="faint">{t('aboutOnline')}</p>
      <ul className="about-links">
        {links.map((l) => (
          <li key={l.label}>
            <a className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
              <strong>{l.label}</strong> <span className="faint">{l.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
