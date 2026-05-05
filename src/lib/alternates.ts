const BASE = 'https://blogtec.io'

/**
 * Builds Next.js `alternates` metadata for any canonical pathname.
 * Works for both EN (no prefix) and DE (/de prefix) URLs.
 */
export function getAlternates(canonicalPath: string) {
  const isDE = canonicalPath.startsWith('/de')
  const enPath = isDE ? canonicalPath.slice(3) || '/' : canonicalPath
  const dePath = isDE ? canonicalPath : `/de${canonicalPath}`

  return {
    canonical: `${BASE}${canonicalPath}`,
    languages: {
      en: `${BASE}${enPath}`,
      de: `${BASE}${dePath}`,
      'x-default': `${BASE}${enPath}`,
    },
  }
}
