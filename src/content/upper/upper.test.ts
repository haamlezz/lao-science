import { describe, expect, it } from 'vitest'
import type { L } from '../../i18n/strings'
import {
  GRADES,
  GRADE_HOURS,
  SUBJECT_HOURS,
  allLessons,
  findLesson,
  isOpenable,
  lessonsOfGrade,
  lessonsOfSubject,
  resolveRoute,
} from '../lower'
import type { Field, GradeKey, LessonDef, ReadyLesson, SimKey } from '../lower'
import { parseLessonId } from '../lower/build'
import { upperLessons } from '.'

const UPPER: ('m5' | 'm6' | 'm7')[] = ['m5', 'm6', 'm7']
const SUBJECTS: ('phys' | 'chem' | 'bio')[] = ['phys', 'chem', 'bio']
const COUNTS: Record<string, [number, number, number]> = { m5: [7, 6, 6], m6: [5, 5, 5], m7: [10, 7, 6] }
const NEW_SIMS: SimKey[] = [
  'kinematics', 'newton', 'projectile', 'wave', 'induction', 'photoelectric', 'mole', 'gaslaw', 'periodic',
  'bonding', 'rate', 'acidbase', 'electrochem', 'cell', 'heart', 'population', 'genetics', 'selection',
]

const nonEmpty = (l: L) => l.lo.trim() !== '' && l.en.trim() !== ''
const readyUpper = upperLessons.filter((l): l is ReadyLesson => l.status === 'ready')

describe('upper registry', () => {
  it('has 57 upper topics, 98 in total, unique ids', () => {
    expect(upperLessons).toHaveLength(57)
    expect(allLessons).toHaveLength(98)
    expect(new Set(allLessons.map((l) => l.id)).size).toBe(98)
  })
  it('upper grades are registered as level upper', () => {
    expect(GRADES.filter((g) => g.level === 'upper').map((g) => g.key)).toEqual(UPPER)
  })
  it('counts and hours per grade and subject', () => {
    for (const g of UPPER) {
      SUBJECTS.forEach((s, i) => {
        const ls = lessonsOfSubject(g, s)
        expect(ls, `${g} ${s}`).toHaveLength(COUNTS[g][i])
        expect(ls.reduce((n, l) => n + l.hours, 0), `${g} ${s} hours`).toBe(SUBJECT_HOURS[g][s])
        expect(ls.map((l) => l.order)).toEqual(ls.map((_, k) => k + 1))
      })
      const sum = lessonsOfGrade(g).reduce((n, l) => n + l.hours, 0)
      expect(sum, g).toBe(GRADE_HOURS[g])
    }
    expect(SUBJECT_HOURS.m6.bio).toBe(67)
  })
  it('ids follow subject letter + grade digit + order, and fields match', () => {
    const letter: Record<Field, string> = { phys: 'p', chem: 'c', bio: 'b', earth: '?', method: '?' }
    for (const l of upperLessons) {
      expect(l.id).toBe(`${letter[l.field]}${l.grade.slice(1)}-${String(l.order).padStart(2, '0')}`)
      expect(parseLessonId(l.id)).toMatchObject({ grade: l.grade, order: l.order })
    }
  })
  it('lessonsOfGrade groups by subject then order for upper grades', () => {
    expect(lessonsOfGrade('m5').map((l) => l.id).slice(0, 8)).toEqual([
      'p5-01', 'p5-02', 'p5-03', 'p5-04', 'p5-05', 'p5-06', 'p5-07', 'c5-01',
    ])
  })
  it('titles are bilingual', () => {
    for (const l of upperLessons) expect(nonEmpty(l.title), l.id).toBe(true)
  })
  it('status counts add up', () => {
    const by = (s: LessonDef['status']) => upperLessons.filter((l) => l.status === s).length
    expect(by('ready') + by('planned') + by('custom')).toBe(57)
    expect(by('custom')).toBe(1)
  })
  it('c5-03 is the custom bespoke lesson', () => {
    const c = findLesson('c5-03')
    expect(c).toMatchObject({ id: 'c5-03', status: 'custom', customRoute: 'chem-m5-atom', grade: 'm5', hours: 10 })
    expect(findLesson('chem-m5-atom')).toBe(c)
    expect(isOpenable(c)).toBe(true)
    expect(resolveRoute('#/chem-m5-atom')).toMatchObject({ kind: 'custom', lesson: { id: 'c5-03' } })
    expect(resolveRoute('#/c5-03')).toMatchObject({ kind: 'custom' })
  })
  it('resolveRoute for upper ids and grades', () => {
    expect(resolveRoute('#/grade-m5')).toEqual({ kind: 'grade', grade: 'm5' as GradeKey })
    expect(resolveRoute('#/grade-m7')).toEqual({ kind: 'grade', grade: 'm7' })
    expect(resolveRoute('#/p5-99')).toEqual({ kind: 'none' })
    // planned lessons do not open; ready ones do
    for (const l of upperLessons) {
      const r = resolveRoute(`#/${l.id}`)
      expect(r.kind).toBe(l.status === 'ready' ? 'lesson' : l.status === 'custom' ? 'custom' : 'none')
    }
  })
  it('SimKey list is accepted by the type (compile-time) and unique', () => {
    expect(new Set(NEW_SIMS).size).toBe(18)
  })
  it('parseLessonId rejects bad ids', () => {
    expect(() => parseLessonId('x5-01')).toThrow()
    expect(() => parseLessonId('p8-01')).toThrow()
    expect(parseLessonId('m3-07')).toEqual({ grade: 'm3', order: 7 })
  })
})

describe('ready upper lessons', () => {
  it('every ready lesson id is a known upper id', () => {
    expect(readyUpper.every((l) => parseLessonId(l.id).grade === l.grade)).toBe(true)
  })
  for (const l of readyUpper) {
    it(`${l.id} has the required shape`, () => {
      expect(nonEmpty(l.title) && nonEmpty(l.summary) && nonEmpty(l.activity)).toBe(true)
      expect(l.objectives.length).toBeGreaterThanOrEqual(2)
      expect(l.objectives.length).toBeLessThanOrEqual(5)
      expect(l.keyIdeas.length).toBeGreaterThanOrEqual(3)
      expect(l.keyIdeas.length).toBeLessThanOrEqual(5)
      expect(l.questions).toHaveLength(2)
      expect([...l.objectives, ...l.keyIdeas, ...l.questions].every(nonEmpty)).toBe(true)
      expect(l.minutes).toBeGreaterThan(0)
      expect(l.quiz.length).toBeGreaterThanOrEqual(3)
      expect(l.quiz.length).toBeLessThanOrEqual(5)
      expect(new Set(l.quiz.map((q) => q.id)).size).toBe(l.quiz.length)
      for (const q of l.quiz) {
        expect(nonEmpty(q.q) && nonEmpty(q.why) && q.options.every(nonEmpty)).toBe(true)
        expect(q.options.length).toBeGreaterThanOrEqual(3)
        expect(q.options.length).toBeLessThanOrEqual(4)
        expect(q.answer).toBeGreaterThanOrEqual(0)
        expect(q.answer).toBeLessThan(q.options.length)
      }
    })
  }
})
