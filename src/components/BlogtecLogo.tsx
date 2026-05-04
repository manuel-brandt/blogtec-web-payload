import Link from 'next/link'
import Image from 'next/image'

interface BlogtecLogoProps {
  href?: string
  /** Rendered height in px. Width auto-scales to the image aspect ratio (~4.33:1). */
  height?: number
  /** Use the SVG fallback with white text (for dark backgrounds like the footer). */
  dark?: boolean
  /** Legacy: square size for the SVG fallback. */
  size?: number
}

export function BlogtecLogo({ href = '/', height = 36, dark = false, size = 36 }: BlogtecLogoProps) {
  if (dark) {
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
          <circle cx="23" cy="10" r="3.5" fill="white" />
          <line x1="10" y1="27" x2="21" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M19 16 L29 11 L26 21 Z" fill="white" />
          <path d="M15 21 L7 18 L10 26 Z" fill="white" opacity="0.7" />
          <path d="M7 32 Q9 28 11 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xl font-black tracking-tight text-white">Blogtec</span>
      </Link>
    )
  }

  // Source image is 16243x3750 (≈4.33:1)
  const width = Math.round(height * (16243 / 3750))
  return (
    <Link href={href} className="flex items-center shrink-0">
      <Image
        src="/images/header-logo.webp"
        alt="Blogtec"
        width={width}
        height={height}
        priority
        style={{ height, width: 'auto' }}
      />
    </Link>
  )
}
