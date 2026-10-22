import type { UiKey } from '../../i18n/strings'
import { m1 } from './m1'
import { m2 } from './m2'
import { m3 } from './m3'
import { m4 } from './m4'
import { upperLessons } from '../upper'
import { FIELD_COLORS } from './types'
import type { CustomLesson, Field, GradeKey, LessonDef, ReadyLesson } from './types'

export type { GradeKey, LessonDef, ReadyLesson, PlannedLesson, CustomLesson, Subject, QuizItem, SimKey, SimProps, Field } from './types'
export { FIELD_COLORS, GRADE_HOURS, SUBJECT_HOURS } from './types'

export interface GradeInfo {
  key: GradeKey
  level: 'lower' | 'upper'
  labelKey: UiKey // existing UI string: gradeM1 .. gradeM7
  route: string // '#/grade-m1' style route name without '#/'
}

export const GRADES: GradeInfo[] = [
  { key: 'm1', level: 'lower', labelKey: 'gradeM1', route: 'grade-m1' },
  { key: 'm2', level: 'lower', labelKey: 'gradeM2', route: 'grade-m2' },
  { key: 'm3', level: 'lower', labelKey: 'gradeM3', route: 'grade-m3' },
  { key: 'm4', level: 'lower', labelKey: 'gradeM4', route: 'grade-m4' },
  { key: 'm5', level: 'upper', labelKey: 'gradeM5', route: 'grade-m5' },
  { key: 'm6', level: 'upper', labelKey: 'gradeM6', route: 'grade-m6' },
  { key: 'm7', level: 'upper', labelKey: 'gradeM7', route: 'grade-m7' },
]

/** 41 lower topics (M.1 first) followed by 57 upper topics (p5, c5, b5, p6, ...). */
export const allLessons: LessonDef[] = [...m1, ...m2, ...m3, ...m4, ...upperLessons]

/** Old hashes that must keep working. */
export const LEGACY_ALIASES: Record<string, string> = {
  'chem-m5-atom': 'c5-03',
  'm2-force': 'm2-04',
  'm2-pressure': 'm2-05',
}

const SUBJECT_RANK: Record<Field, number> = { phys: 0, chem: 1, bio: 2, earth: 3, method: 4 }

/** Lower grades: by order. Upper grades: by subject (phys, chem, bio) then order. */
export function lessonsOfGrade(grade: GradeKey): LessonDef[] {
  const upper = GRADES.some((g) => g.key === grade && g.level === 'upper')
  return allLessons
    .filter((l) => l.grade === grade)
    .sort((a, b) =>
      upper ? SUBJECT_RANK[a.field] - SUBJECT_RANK[b.field] || a.order - b.order : a.order - b.order,
    )
}

export function lessonsOfSubject(grade: GradeKey, field: Field): LessonDef[] {
  return lessonsOfGrade(grade).filter((l) => l.field === field)
}

export function findLesson(id: string): LessonDef | undefined {
  const real = LEGACY_ALIASES[id] ?? id
  return allLessons.find((l) => l.id === real)
}
export const getLesson = findLesson

export function isReady(l: LessonDef | undefined): l is ReadyLesson {
  return l?.status === 'ready'
}

export function isCustom(l: LessonDef | undefined): l is CustomLesson {
  return l?.status === 'custom'
}

/** Ready or custom: something a card can open. */
export function isOpenable(l: LessonDef | undefined): l is ReadyLesson | CustomLesson {
  return l?.status === 'ready' || l?.status === 'custom'
}

export function gradeHasReady(grade: GradeKey): boolean {
  return lessonsOfGrade(grade).some(isOpenable)
}

export function lessonColor(l: LessonDef): string {
  return (l.status === 'ready' && l.color) || FIELD_COLORS[l.field]
}

export function isGradeKey(s: string): s is GradeKey {
  return GRADES.some((g) => g.key === s)
}

export type LowerRoute =
  | { kind: 'grade'; grade: GradeKey }
  | { kind: 'lesson'; lesson: ReadyLesson }
  | { kind: 'custom'; lesson: CustomLesson } // open '#/' + lesson.customRoute
  | { kind: 'none' }

/**
 * Resolve a hash ('#/m1-04', 'm2-force', '#/grade-m3') to a lower-secondary route.
 * Planned lessons and unknown ids return { kind: 'none' } (caller falls back to Home).
 */
export function resolveRoute(hash: string): LowerRoute {
  const name = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  const g = /^grade-(m\d)$/.exec(name)
  if (g && isGradeKey(g[1])) return { kind: 'grade', grade: g[1] }
  const l = findLesson(name)
  if (isReady(l)) return { kind: 'lesson', lesson: l }
  if (isCustom(l)) return { kind: 'custom', lesson: l }
  return { kind: 'none' }
}
