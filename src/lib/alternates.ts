export function getSiteBase(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

const BASE = getSiteBase()

// Root stays "/"; everything else gets a trailing slash.
function ts(path: string) {
  return path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`
}

/**
 * Builds Next.js `alternates` metadata for any canonical pathname.
 * Works for both EN (no prefix) and DE (/de prefix) URLs.
 * BASE URL is resolved from NEXT_PUBLIC_SITE_URL → VERCEL_URL → localhost.
 */
export function getAlternates(canonicalPath: string) {
  const isDE = canonicalPath.startsWith('/de')
  const enPath = isDE ? canonicalPath.slice(3) || '/' : canonicalPath
  const dePath = isDE ? canonicalPath : `/de${canonicalPath}`

  return {
    canonical: `${BASE}${ts(canonicalPath)}`,
    languages: {
      en: `${BASE}${ts(enPath)}`,
      de: `${BASE}${ts(dePath)}`,
      'x-default': `${BASE}${ts(enPath)}`,
    },
  }
}
