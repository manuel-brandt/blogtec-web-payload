'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const languages = {
  de: { flag: '🇩🇪', label: 'Deutsch' },
  en: { flag: '🇬🇧', label: 'English' },
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isGerman = pathname.startsWith('/de')
  const current = isGerman ? 'de' : 'en'
  const other = isGerman ? 'en' : 'de'

  const enUrl = isGerman ? pathname.replace(/^\/de/, '') || '/' : pathname
  const deUrl = isGerman ? pathname : pathname === '/' ? '/de' : `/de${pathname}`
  const otherUrl = other === 'de' ? deUrl : enUrl

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium border border-gray-300 rounded-full px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{languages[current].flag}</span>
        <span>{languages[current].label}</span>
        <ChevronDown
          size={13}
          className={`text-gray-500 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[130px]">
          <a
            href={otherUrl}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            <span className="text-base leading-none">{languages[other].flag}</span>
            <span>{languages[other].label}</span>
          </a>
        </div>
      )}
    </div>
  )
}
