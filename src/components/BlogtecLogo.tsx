import Link from 'next/link'

interface BlogtecLogoProps {
  dark?: boolean
  href?: string
  size?: number
}

export function BlogtecLogo({ dark = false, href = '/', size = 36 }: BlogtecLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2 shrink-0">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="18" fill="#E9204F" />
        {/* Head */}
        <circle cx="23" cy="10" r="3.5" fill="white" />
        {/* Body */}
        <line x1="10" y1="27" x2="21" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right wing */}
        <path d="M19 16 L29 11 L26 21 Z" fill="white" />
        {/* Left arm */}
        <path d="M15 21 L7 18 L10 26 Z" fill="white" opacity="0.7" />
        {/* Swoosh trail */}
        <path d="M7 32 Q9 28 11 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className={`text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-black'}`}>
        Blogtec
      </span>
    </Link>
  )
}
