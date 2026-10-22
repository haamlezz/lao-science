import { describe, expect, it } from 'vitest'
import { GRADE_HOURS } from './types'
import type { L } from '../../i18n/strings'
import { GRADES, LEGACY_ALIASES, allLessons, findLesson, lessonsOfGrade, resolveRoute } from './index'
import type { ReadyLesson } from './index'

const lowerGrades = GRADES.filter((g) => g.level === 'lower')
const lowerLessons = allLessons.filter((l) => lowerGrades.some((g) => g.key === l.grade))
const ready = lowerLessons.filter((l): l is ReadyLesson => l.status === 'ready')
const BATCH_A = ['m1-01', 'm1-02', 'm1-03', 'm1-04', 'm2-04', 'm2-05']
const M1_REST = ['m1-05', 'm1-06', 'm1-07', 'm1-08', 'm1-09']
const M2_REST = ['m2-01', 'm2-02', 'm2-03', 'm2-06', 'm2-07', 'm2-08', 'm2-09', 'm2-10', 'm2-11', 'm2-12']

function strings(l: L, where: string): [string, string][] {
  return [
    [`${where}.lo`, l.lo],
    [`${where}.en`, l.en],
  ]
}

describe('registry', () => {
  it('has 41 topics with unique ids', () => {
    expect(lowerLessons).toHaveLength(41)
    expect(new Set(lowerLessons.map((l) => l.id)).size).toBe(41)
  })
  it('has the right topic counts and hour sums per grade', () => {
    expect(lessonsOfGrade('m1')).toHaveLength(9)
    expect(lessonsOfGrade('m2')).toHaveLength(12)
    expect(lessonsOfGrade('m3')).toHaveLength(9)
    expect(lessonsOfGrade('m4')).toHaveLength(11)
    for (const g of lowerGrades) {
      const sum = lessonsOfGrade(g.key).reduce((n, l) => n + l.hours, 0)
      expect(sum, g.key).toBe(GRADE_HOURS[g.key])
    }
  })
  it('orders are 1..n and ids follow grade-order', () => {
    for (const g of lowerGrades) {
      lessonsOfGrade(g.key).forEach((l, i) => {
        expect(l.order).toBe(i + 1)
        expect(l.id).toBe(`${g.key}-${String(i + 1).padStart(2, '0')}`)
      })
    }
  })
  it('all M.1 and M.2 lessons are ready', () => {
    const ids = ready.filter((l) => l.grade === 'm1' || l.grade === 'm2').map((l) => l.id)
    expect(ids.sort()).toEqual([...BATCH_A, ...M1_REST, ...M2_REST].sort())
    expect(ids).toHaveLength(21)
  })
  it('all M.3 and M.4 lessons are ready, with the planned sims', () => {
    const ids = ready.filter((l) => l.grade === 'm3' || l.grade === 'm4').map((l) => l.id)
    expect(ids).toHaveLength(20)
    expect(lessonsOfGrade('m3').every((l) => l.status === 'ready')).toBe(true)
    expect(lessonsOfGrade('m4').every((l) => l.status === 'ready')).toBe(true)
    const sims = ready.filter((l) => (l.grade === 'm3' || l.grade === 'm4') && l.sim).map((l) => [l.id, l.sim, l.simProps])
    expect(sims).toEqual([
      ['m3-03', 'pendulum', undefined],
      ['m3-06', 'circuit', { mode: 'basic' }],
      ['m3-07', 'states', undefined],
      ['m4-03', 'circuit', { mode: 'ohm' }],
      ['m4-05', 'solenoid', undefined],
      ['m4-07', 'lens', undefined],
    ])
  })
  it('titles are non-empty in both languages', () => {
    for (const l of lowerLessons) for (const [k, v] of strings(l.title, l.id)) expect(v.trim(), k).not.toBe('')
  })
  it('sim keys and legacy aliases', () => {
    const sim = (id: string) => (findLesson(id) as ReadyLesson).sim
    expect(sim('m1-04')).toBe('motion')
    expect(sim('m2-04')).toBe('force')
    expect(sim('m2-05')).toBe('pressure')
    expect(sim('m1-08')).toBe('photosynthesis')
    expect(sim('m2-02')).toBe('thermal')
    expect(sim('m2-06')).toBe('foodweb')
    expect(sim('m2-11')).toBe('reflection')
    expect(LEGACY_ALIASES['m2-force']).toBe('m2-04')
    expect(findLesson('m2-force')?.id).toBe('m2-04')
    expect(findLesson('m2-pressure')?.id).toBe('m2-05')
    expect(findLesson('nope')).toBeUndefined()
  })
  it('resolveRoute', () => {
    expect(resolveRoute('#/grade-m3')).toEqual({ kind: 'grade', grade: 'm3' })
    expect(resolveRoute('#/m2-force')).toMatchObject({ kind: 'lesson', lesson: { id: 'm2-04' } })
    expect(resolveRoute('m1-01')).toMatchObject({ kind: 'lesson' })
    expect(resolveRoute('#/m1-05')).toMatchObject({ kind: 'lesson', lesson: { id: 'm1-05' } })
    expect(resolveRoute('#/nope-01')).toEqual({ kind: 'none' })
    expect(resolveRoute('#/grade-m9')).toEqual({ kind: 'none' })
    expect(resolveRoute('#/')).toEqual({ kind: 'none' })
  })
})

describe('ready lessons content', () => {
  for (const l of ready) {
    describe(l.id, () => {
      it('has bilingual non-empty text everywhere', () => {
        const all: [string, string][] = [
          ...strings(l.title, 'title'),
          ...strings(l.summary, 'summary'),
          ...strings(l.activity, 'activity'),
          ...l.objectives.flatMap((o, i) => strings(o, `objectives[${i}]`)),
          ...l.keyIdeas.flatMap((o, i) => strings(o, `keyIdeas[${i}]`)),
          ...l.questions.flatMap((o, i) => strings(o, `questions[${i}]`)),
          ...l.quiz.flatMap((q, i) => [
            ...strings(q.q, `quiz[${i}].q`),
            ...strings(q.why, `quiz[${i}].why`),
            ...q.options.flatMap((o, j) => strings(o, `quiz[${i}].options[${j}]`)),
          ]),
        ]
        for (const [k, v] of all) expect(v.trim(), `${l.id} ${k}`).not.toBe('')
      })
      it('has the required counts', () => {
        expect(l.objectives.length).toBeGreaterThanOrEqual(2)
        expect(l.objectives.length).toBeLessThanOrEqual(5)
        expect(l.keyIdeas.length).toBeGreaterThanOrEqual(3)
        expect(l.keyIdeas.length).toBeLessThanOrEqual(5)
        expect(l.questions).toHaveLength(2)
        expect(l.quiz.length).toBeGreaterThanOrEqual(3)
        expect(l.quiz.length).toBeLessThanOrEqual(5)
        expect(l.minutes).toBeGreaterThan(0)
      })
      it('has valid quiz items', () => {
        expect(new Set(l.quiz.map((q) => q.id)).size).toBe(l.quiz.length)
        for (const q of l.quiz) {
          expect(q.options.length).toBeGreaterThanOrEqual(3)
          expect(q.options.length).toBeLessThanOrEqual(4)
          expect(Number.isInteger(q.answer)).toBe(true)
          expect(q.answer).toBeGreaterThanOrEqual(0)
          expect(q.answer).toBeLessThan(q.options.length)
        }
      })
    })
  }
})
