import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteBase } from '@/lib/alternates'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { publishedAt: { less_than_equal: now } },
    sort: '-publishedAt',
    limit: 1000,
    depth: 0,
  })
  const base = getSiteBase()

  const urls = docs.map((post) => {
    const enPath = `/blog/${post.slug}`
    const dePath = `/de/blog/${post.slug}`
    const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : ''
    return `
  <url>
    <loc>${base}${enPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${base}${dePath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${enPath}"/>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${base}${dePath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${base}${dePath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${enPath}"/>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
