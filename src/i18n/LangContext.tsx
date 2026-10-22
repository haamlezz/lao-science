import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ui } from './strings'
import type { L, Lang, UiKey } from './strings'

interface LangValue {
  lang: Lang
  toggle: () => void
  t: (key: UiKey) => string
  tx: (text: L) => string
}

const STORAGE_KEY = 'science-lab-lang'

function readStored(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'lo' || v === 'en') return v
  } catch {
    // storage may be blocked; fall through to default
  }
  return 'lo'
}

const Ctx = createContext<LangValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStored)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'lo' ? 'en' : 'lo')), [])

  const value = useMemo<LangValue>(
    () => ({
      lang,
      toggle,
      t: (key) => ui[key][lang],
      tx: (text) => text[lang],
    }),
    [lang, toggle],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangValue {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLang must be used inside LangProvider')
  return v
}
