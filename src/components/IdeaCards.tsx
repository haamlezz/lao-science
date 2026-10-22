import { useLang } from '../i18n/LangContext'
import type { L } from '../i18n/strings'

/** Numbered key-idea cards for the reading layout. `active` highlights the idea picked with ← →. */
export function IdeaCards({ ideas, active }: { ideas: L[]; active: number }) {
  const { tx } = useLang()
  return (
    <ol className="idea-cards">
      {ideas.map((idea, i) => (
        <li key={i} className={i === active ? 'on' : ''} aria-current={i === active ? 'true' : undefined}>
          <span className="idea-n" aria-hidden="true">
            {i + 1}
          </span>
          <span>{tx(idea)}</span>
        </li>
      ))}
    </ol>
  )
}
