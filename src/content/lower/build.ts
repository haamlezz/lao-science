import type { L } from '../../i18n/strings'
import type { Field, GradeKey, QuizItem, ReadyLesson, SimKey, SimProps } from './types'

/** [lo, en] pair, converted to an `L` by the helpers below. */
export type P = readonly [lo: string, en: string]

const l = ([lo, en]: P): L => ({ lo, en })

export function quizItem(id: string, q: P, options: P[], answer: number, why: P): QuizItem {
  return { id, q: l(q), options: options.map(l), answer, why: l(why) }
}

export interface ReadySpec {
  id: string // 'm1-05'
  title: P
  hours: number
  field: Field
  minutes: number
  summary: P
  objectives: P[]
  keyIdeas: P[]
  questions: P[]
  activity: P
  quiz: QuizItem[]
  sim?: SimKey
  simProps?: SimProps
}

/** 'm1-04' -> m1/4; 'p5-01' / 'c6-02' / 'b7-03' -> m5/1, m6/2, m7/3. Throws on anything else. */
export function parseLessonId(id: string): { grade: GradeKey; order: number; field?: Field } {
  const lower = /^(m[1-4])-(\d+)$/.exec(id)
  if (lower) return { grade: lower[1] as GradeKey, order: Number(lower[2]) }
  const upper = /^([pcb])([5-7])-(\d+)$/.exec(id)
  if (upper) {
    const field: Field = upper[1] === 'p' ? 'phys' : upper[1] === 'c' ? 'chem' : 'bio'
    return { grade: `m${upper[2]}` as GradeKey, order: Number(upper[3]), field }
  }
  throw new Error(`bad lesson id ${id}`)
}

/** Compact constructor for a fully written lesson; grade and order come from the id. */
export function ready(s: ReadySpec): ReadyLesson {
  const { grade, order } = parseLessonId(s.id)
  return {
    id: s.id,
    grade,
    order,
    title: l(s.title),
    hours: s.hours,
    field: s.field,
    status: 'ready',
    summary: l(s.summary),
    objectives: s.objectives.map(l),
    keyIdeas: s.keyIdeas.map(l),
    questions: s.questions.map(l),
    activity: l(s.activity),
    minutes: s.minutes,
    quiz: s.quiz,
    ...(s.sim ? { sim: s.sim } : {}),
    ...(s.simProps ? { simProps: s.simProps } : {}),
  }
}
