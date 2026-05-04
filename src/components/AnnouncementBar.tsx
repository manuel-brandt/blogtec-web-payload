'use client'

import { useState } from 'react'
import Link from 'next/link'

const ui = {
  en: {
    text: 'Buy backlinks cheaper than ever with our Link Center',
    cta: 'LEARN MORE',
  },
  de: {
    text: 'Kaufe Backlinks günstiger denn je mit unserem Link Center',
    cta: 'MEHR ERFAHREN',
  },
}

export default function AnnouncementBar({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const [dismissed, setDismissed] = useState(false)
  const t = ui[locale]

  if (dismissed) return null

  return (
    <div className="bg-[#1A1A1A] text-white text-center py-3 px-4 flex items-center justify-center gap-3 text-sm relative">
      <span className="text-[#F9E90A]">🔗</span>
      <span>{t.text}</span>
      <Link
        href={locale === 'de' ? '/de/link-center' : '/link-center'}
        className="bg-[#F9E90A] text-black font-bold px-4 py-1.5 rounded-pill text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors whitespace-nowrap"
      >
        {t.cta}
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
