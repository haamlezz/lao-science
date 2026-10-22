import { useLang } from '../i18n/LangContext'

export const CURRICULUM_URL = 'https://dge.moes.edu.la/learning-resources.php'

/** Link to the official curriculum documents of the Department of General Education (DGE), MoES. Needs internet. */
export function CurriculumLink() {
  const { t } = useLang()
  return (
    <a href={CURRICULUM_URL} target="_blank" rel="noopener noreferrer" className="curriculum-link">
      {t('curriculumLinkText')}
    </a>
  )
}

/** One sentence: the content follows the official curriculum, with the link. */
export function CurriculumNote({ className }: { className?: string }) {
  const { t } = useLang()
  return (
    <p className={className}>
      {t('curriculumNote')} <CurriculumLink />
    </p>
  )
}
