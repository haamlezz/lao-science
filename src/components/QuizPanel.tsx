import { useCallback, useEffect, useReducer, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import type { QuizItem } from '../content/lower'

interface QuizState {
  index: number
  picked: number | null
  checked: boolean
  score: number
  done: boolean
}

type Action = { type: 'pick'; i: number } | { type: 'check'; answer: number } | { type: 'next'; total: number } | { type: 'retry' }

const START: QuizState = { index: 0, picked: null, checked: false, score: 0, done: false }

function reduce(s: QuizState, a: Action): QuizState {
  switch (a.type) {
    case 'pick':
      return s.checked ? s : { ...s, picked: a.i }
    case 'check':
      if (s.checked || s.picked === null) return s
      return { ...s, checked: true, score: s.score + (s.picked === a.answer ? 1 : 0) }
    case 'next':
      if (!s.checked) return s
      return s.index + 1 >= a.total ? { ...s, done: true } : { ...s, index: s.index + 1, picked: null, checked: false }
    case 'retry':
      return START
  }
}

export interface QuizController {
  state: QuizState
  pick: (i: number) => void
  check: (answer: number) => void
  next: (total: number) => void
  retry: () => void
}

/** Quiz progress lives in component state only (never persisted) and is lifted so tab switches keep it. */
export function useQuiz(): QuizController {
  const [state, dispatch] = useReducer(reduce, START)
  return {
    state,
    pick: useCallback((i: number) => dispatch({ type: 'pick', i }), []),
    check: useCallback((answer: number) => dispatch({ type: 'check', answer }), []),
    next: useCallback((total: number) => dispatch({ type: 'next', total }), []),
    retry: useCallback(() => dispatch({ type: 'retry' }), []),
  }
}

/** One question at a time: pick -> check (correct/incorrect + why) -> next -> score + try again. */
export function QuizPanel({ items, quiz }: { items: QuizItem[]; quiz: QuizController }) {
  const { t, tx } = useLang()
  const { state: s } = quiz
  const q = items[s.index]
  const doneRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (s.done) doneRef.current?.focus()
  }, [s.done])

  if (s.done) {
    return (
      <section className="quiz" data-quiz>
        <h3 className="quiz-score" tabIndex={-1} ref={doneRef} aria-live="polite">
          {t('quizScore')}: {s.score} / {items.length}
        </h3>
        <button type="button" className="btn btn-primary" onClick={quiz.retry}>
          ↺ {t('quizTryAgain')}
        </button>
      </section>
    )
  }

  const last = s.index + 1 >= items.length
  const right = s.picked === q.answer
  return (
    <section className="quiz" data-quiz>
      <p className="faint quiz-intro">{t('quizIntro')}</p>
      <p className="quiz-count" aria-live="polite">
        {t('quizQuestion')} {s.index + 1} / {items.length}
      </p>
      <fieldset className="quiz-set">
        <legend className="quiz-q">{tx(q.q)}</legend>
        {q.options.map((o, i) => {
          const mark = !s.checked
            ? null
            : i === q.answer
              ? s.picked === i
                ? `✓ ${t('quizCorrect')}`
                : `✓ ${t('quizRightAnswer')}`
              : s.picked === i
                ? `✗ ${t('quizWrong')}`
                : null
          const cls = !s.checked ? '' : i === q.answer ? 'good' : s.picked === i ? 'bad' : ''
          return (
            <label key={`${q.id}-${i}`} className={`quiz-opt ${cls} ${s.picked === i ? 'picked' : ''}`}>
              <input
                type="radio"
                name={`quiz-${q.id}`}
                checked={s.picked === i}
                disabled={s.checked}
                onChange={() => quiz.pick(i)}
              />
              <span className="quiz-opt-text">{tx(o)}</span>
              {mark && <b className="quiz-mark">{mark}</b>}
            </label>
          )
        })}
      </fieldset>
      {s.checked && (
        <div className={`quiz-why ${right ? 'good' : 'bad'}`} role="status">
          <strong>{right ? `✓ ${t('quizCorrect')}` : `✗ ${t('quizWrong')}`}</strong>
          <p>
            <b>{t('quizWhy')}: </b>
            {tx(q.why)}
          </p>
        </div>
      )}
      <button
        type="button"
        className="btn btn-primary quiz-go"
        disabled={!s.checked && s.picked === null}
        onClick={() => (s.checked ? quiz.next(items.length) : quiz.check(q.answer))}
      >
        {!s.checked ? t('quizCheck') : last ? t('quizFinish') : `${t('quizNext')} →`}
      </button>
    </section>
  )
}
