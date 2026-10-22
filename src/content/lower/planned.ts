import type { Field, GradeKey, PlannedLesson } from './types'

const SUBJECT_LETTER: Partial<Record<Field, string>> = { phys: 'p', chem: 'c', bio: 'b' }

/** Lower ids are 'm1-04'; upper ids are 'p5-01' (subject letter + grade digit). */
function idPrefix(grade: GradeKey, field: Field): string {
  const letter = SUBJECT_LETTER[field]
  return grade >= 'm5' && letter ? `${letter}${grade.slice(1)}` : grade
}

/** Compact constructor for topics that are not built yet (shown as "Coming soon"). */
export function planned(
  grade: GradeKey,
  order: number,
  lo: string,
  en: string,
  hours: number,
  field: Field,
): PlannedLesson {
  return {
    id: `${idPrefix(grade, field)}-${String(order).padStart(2, '0')}`,
    grade,
    order,
    title: { lo, en },
    hours,
    field,
    status: 'planned',
  }
}
