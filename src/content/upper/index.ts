import type { LessonDef } from '../lower/types'
import { p5 } from './p5'
import { c5 } from './c5'
import { b5 } from './b5'
import { p6 } from './p6'
import { c6 } from './c6'
import { b6 } from './b6'
import { p7 } from './p7'
import { c7 } from './c7'
import { b7 } from './b7'

/** All 57 upper-secondary topics: per grade, physics then chemistry then biology. */
export const upperLessons: LessonDef[] = [...p5, ...c5, ...b5, ...p6, ...c6, ...b6, ...p7, ...c7, ...b7]
