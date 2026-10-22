import { useEffect, useRef, useState } from 'react'
import { CurriculumNote } from './CurriculumLink'
import { useLang } from '../i18n/LangContext'

const KEY = 'lao-science-notice-seen'
const WHATSAPP_HREF = 'https://wa.me/8562059698610'
const WHATSAPP_TEXT = '+856 20 5969 8610'

function seenThisSession(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Warning shown on the home page: the site is AI-generated and may contain errors; users are asked to report them. */
export function NoticeDialog() {
  const { t } = useLang()
  const [open, setOpen] = useState(() => !seenThisSession())
  const okRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode: the notice simply shows again next visit */
    }
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    okRef.current?.focus()
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [open])

  if (!open) return null
  return (
    <div className="notice-overlay" onClick={close}>
      <div
        className="notice-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="notice-title"
        aria-describedby="notice-body"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notice-icon" aria-hidden="true">
          ⚠
        </div>
        <h2 id="notice-title">{t('noticeTitle')}</h2>
        <div id="notice-body">
          <p className="notice-lead">{t('noticeAi')}</p>
          <p>{t('noticeReport')}</p>
          <CurriculumNote className="notice-source" />
          <a className="btn notice-wa" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP_TEXT}
          </a>
        </div>
        <button ref={okRef} type="button" className="btn btn-primary notice-ok" onClick={close}>
          {t('noticeOk')}
        </button>
      </div>
    </div>
  )
}
