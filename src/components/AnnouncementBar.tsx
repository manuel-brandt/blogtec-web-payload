'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-[#1A1A1A] text-white text-center py-3 px-4 flex items-center justify-center gap-3 text-sm relative">
      <span className="text-[#F9E90A]">🔗</span>
      <span>Buy backlinks cheaper than ever with our Link Center</span>
      <Link
        href="/link-center"
        className="bg-[#F9E90A] text-black font-bold px-4 py-1.5 rounded-pill text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors whitespace-nowrap"
      >
        LEARN MORE
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
