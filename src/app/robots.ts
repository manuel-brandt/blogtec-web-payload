import type { MetadataRoute } from 'next'
import { getSiteBase } from '@/lib/alternates'

export default function robots(): MetadataRoute.Robots {
  const base = getSiteBase()
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${base}/sitemap.xml`,
  }
}
