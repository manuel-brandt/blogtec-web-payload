'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const isGerman = pathname.startsWith('/de')

  const enUrl = isGerman ? pathname.replace(/^\/de/, '') || '/' : pathname
  const deUrl = isGerman ? pathname : pathname === '/' ? '/de' : `/de${pathname}`

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold">
      <Link
        href={enUrl}
        className={
          !isGerman
            ? 'text-gray-900'
            : 'text-gray-400 hover:text-gray-700 transition-colors'
        }
      >
        EN
      </Link>
      <span className="text-gray-300">|</span>
      <Link
        href={deUrl}
        className={
          isGerman
            ? 'text-gray-900'
            : 'text-gray-400 hover:text-gray-700 transition-colors'
        }
      >
        DE
      </Link>
    </div>
  )
}
