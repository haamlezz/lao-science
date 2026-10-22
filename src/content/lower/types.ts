import type { L } from '../../i18n/strings'

export type GradeKey = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7'
export type Subject = 'phys' | 'chem' | 'bio'
export type Field = 'bio' | 'chem' | 'phys' | 'earth' | 'method'
export type SimKey =
  | 'motion'
  | 'photosynthesis'
  | 'thermal'
  | 'force'
  | 'pressure'
  | 'foodweb'
  | 'reflection'
  | 'pendulum'
  | 'circuit'
  | 'states'
  | 'solenoid'
  | 'lens'
  | 'kinematics'
  | 'newton'
  | 'projectile'
  | 'wave'
  | 'induction'
  | 'photoelectric'
  | 'mole'
  | 'gaslaw'
  | 'periodic'
  | 'bonding'
  | 'rate'
  | 'acidbase'
  | 'electrochem'
  | 'cell'
  | 'heart'
  | 'population'
  | 'genetics'
  | 'selection'

export type SimProps = Record<string, string | number | boolean>

export interface QuizItem {
  id: string // unique inside the lesson, e.g. 'q1'
  q: L
  options: L[] // 3 or 4 options
  answer: number // zero-based index into options
  why: L // explanation shown after checking
}

export interface LessonBase {
  id: string // 'm1-04'; route is '#/m1-04'
  grade: GradeKey
  order: number // 1-based, curriculum order
  title: L
  hours: number
  field: Field
}

export interface PlannedLesson extends LessonBase {
  status: 'planned'
}

export interface ReadyLesson extends LessonBase {
  status: 'ready'
  summary: L
  objectives: L[] // 2-5
  keyIdeas: L[] // 3-5
  questions: L[] // exactly 2
  activity: L
  minutes: number
  quiz: QuizItem[] // 3-5
  sim?: SimKey // present = interactive
  simProps?: SimProps // e.g. { mode: 'ohm' }
  color?: string // overrides the field colour
}

/** Opens an existing bespoke page instead of the generic LessonPage (e.g. 'chem-m5-atom'). */
export interface CustomLesson extends LessonBase {
  status: 'custom'
  customRoute: string // hash name without '#/'
  summary: L // shown on the grade card
}

export type LessonDef = PlannedLesson | ReadyLesson | CustomLesson

export const FIELD_COLORS: Record<Field, string> = {
  chem: '#4fc3f7',
  phys: '#ffb74d',
  bio: '#81c784',
  earth: '#a1887f',
  method: '#ba68c8',
}

export const GRADE_HOURS: Record<GradeKey, number> = {
  m1: 132,
  m2: 132,
  m3: 165,
  m4: 165,
  m5: 204,
  m6: 203,
  m7: 238,
}

/** Hours per subject for the upper grades (m6 biology sums to 67 as printed in the curriculum). */
export const SUBJECT_HOURS: Record<'m5' | 'm6' | 'm7', Record<Subject, number>> = {
  m5: { phys: 68, chem: 68, bio: 68 },
  m6: { phys: 68, chem: 68, bio: 67 },
  m7: { phys: 102, chem: 68, bio: 68 },
}
