import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import type { UiKey } from '../i18n/strings'
import { GRADES, GRADE_HOURS, SUBJECT_HOURS, isCustom, isOpenable, lessonColor, lessonsOfGrade, lessonsOfSubject } from '../content/lower'
import { FIELD_COLORS } from '../content/lower'
import type { Field, GradeKey, LessonDef } from '../content/lower'

const UPPER_SUBJECTS: Field[] = ['phys', 'chem', 'bio']

const FIELD_LABEL: Record<Field, UiKey> = {
  bio: 'fieldBio',
  chem: 'fieldChem',
  phys: 'fieldPhys',
  earth: 'fieldEarth',
  method: 'fieldMethod',
}

/** Groups keep the curriculum order inside the group; groups appear in order of their first topic. */
function groupByField(lessons: LessonDef[]): { field: Field; items: LessonDef[] }[] {
  const groups: { field: Field; items: LessonDef[] }[] = []
  for (const l of lessons) {
    const g = groups.find((x) => x.field === l.field)
    if (g) g.items.push(l)
    else groups.push({ field: l.field, items: [l] })
  }
  return groups
}

function TopicCard({ lesson, onOpen }: { lesson: LessonDef; onOpen: (id: string) => void }) {
  const { t, tx } = useLang()
  const ready = isOpenable(lesson)
  const interactive = isCustom(lesson) || (lesson.status === 'ready' && lesson.sim !== undefined)
  const target = isCustom(lesson) ? lesson.customRoute : lesson.id
  return (
    <article
      className={`card topic ${ready ? '' : 'soon'}`}
      style={{ ['--c' as string]: lessonColor(lesson) }}
      aria-disabled={ready ? undefined : true}
    >
      <p className="topic-no">
        {t('topicNumber')} {lesson.order}
      </p>
      <div className="card-top">
        <span className="swatch" />
        <h3>{tx(lesson.title)}</h3>
      </div>
      {isOpenable(lesson) && <p>{tx(lesson.summary)}</p>}
      <p className="faint">
        {lesson.hours} {t('hours')}
      </p>
      {ready ? (
        <>
          <p>
            <span className="chip chip-solo">{interactive ? t('chipInteractive') : t('chipLessonQuiz')}</span>
          </p>
          <button type="button" className="btn btn-primary" onClick={() => onOpen(target)}>
            {t('open')} →
          </button>
        </>
      ) : (
        <p>
          <span className="chip chip-solo chip-soon">{t('soon')}</span>
        </p>
      )}
    </article>
  )
}

interface Props {
  grade: GradeKey
  onGo: (route: string) => void
  onHome: () => void
}

/** Lists every topic of one lower-secondary grade; ready ones open, planned ones are muted. */
export function GradePage({ grade, onGo, onHome }: Props) {
  const { t } = useLang()
  const [grouped, setGrouped] = useState(false)
  const info = GRADES.find((g) => g.key === grade)
  const lessons = lessonsOfGrade(grade)
  const readyCount = lessons.filter(isOpenable).length
  const upper = info?.level === 'upper'
  const hours = GRADE_HOURS[grade]
  return (
    <main className="home">
      <button type="button" className="btn btn-ghost" onClick={onHome}>
        ← {t('back')}
      </button>
      <section className="hero grade-hero">
        <h1>{info ? t(info.labelKey) : ''}</h1>
        <p>
          {`${t(upper ? 'levelUpper' : 'levelLower')} · ${lessons.length} ${t('gradeTopics')} · ${hours} ${t('gradeTotalHours')} · ${readyCount} / ${lessons.length} ${t('topicsReady')}`}
        </p>
      </section>
      {!upper && (
        <label className="group-toggle">
          <input type="checkbox" checked={grouped} onChange={(e) => setGrouped(e.target.checked)} /> {t('groupByArea')}
        </label>
      )}
      {upper ? (
        UPPER_SUBJECTS.map((f) => {
          const items = lessonsOfSubject(grade, f)
          if (items.length === 0) return null
          const h = SUBJECT_HOURS[grade as 'm5' | 'm6' | 'm7']?.[f as 'phys' | 'chem' | 'bio']
          return (
            <section key={f} aria-labelledby={`subj-${f}`} className="subject-section" style={{ ['--c' as string]: FIELD_COLORS[f] }}>
              <h2 className="pick subject-heading" id={`subj-${f}`}>
                <span className="swatch" /> {t(FIELD_LABEL[f])}
                <span className="faint subject-hours">
                  {' · '}
                  {h ?? items.reduce((n, l) => n + l.hours, 0)} {t('hours')}
                </span>
              </h2>
              <div className="cards">
                {items.map((l) => (
                  <TopicCard key={l.id} lesson={l} onOpen={onGo} />
                ))}
              </div>
            </section>
          )
        })
      ) : grouped ? (
        groupByField(lessons).map((g) => (
          <section key={g.field} aria-labelledby={`field-${g.field}`}>
            <h2 className="pick" id={`field-${g.field}`}>
              {t(FIELD_LABEL[g.field])}
            </h2>
            <div className="cards">
              {g.items.map((l) => (
                <TopicCard key={l.id} lesson={l} onOpen={onGo} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="cards">
          {[...lessons]
            .sort((a, b) => a.order - b.order)
            .map((l) => (
              <TopicCard key={l.id} lesson={l} onOpen={onGo} />
            ))}
        </div>
      )}
    </main>
  )
}
