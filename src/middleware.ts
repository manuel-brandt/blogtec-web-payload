import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getBlobBase(): string {
  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) return process.env.STORAGE_VERCEL_BLOB_BASE_URL
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
  const storeId = token.split('_')[3]?.toLowerCase()
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : ''
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Intercept media file requests before they reach Payload
  // to avoid the plugin's head() API call that drains free-tier operations
  if (pathname.startsWith('/api/media/file/')) {
    const filename = pathname.split('/').pop()
    if (filename) {
      const base = getBlobBase()
      if (base) {
        const cdnUrl = `${base}/media/${filename}`
        return NextResponse.redirect(cdnUrl, 302)
      }
    }
  }

  // Skip Next.js internals, Payload admin, API, static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/media') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect /en/... → /... so English never has a locale prefix (301)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const cleaned = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(new URL(cleaned, request.url), 301)
  }

  // German routes pass through unchanged
  if (pathname.startsWith('/de')) {
    const next = NextResponse.next()
    next.headers.set('x-pathname', pathname)
    return next
  }

  // English blog routes: /blog → internally /en/blog so [locale] receives 'en'
  if (pathname.startsWith('/blog')) {
    const rewrite = NextResponse.rewrite(new URL(`/en${pathname}`, request.url))
    rewrite.headers.set('x-pathname', pathname)
    return rewrite
  }

  const next = NextResponse.next()
  next.headers.set('x-pathname', pathname)
  return next
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
