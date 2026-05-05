import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteBase } from '@/lib/alternates'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const base = getSiteBase()

    const [{ docs: enDocs }, { docs: deDocs }] = await Promise.all([
      payload.find({ collection: 'blog-posts', where: { noIndex: { not_equals: true } }, locale: 'en', sort: '-publishedAt', limit: 1000, depth: 0 }),
      payload.find({ collection: 'blog-posts', where: { noIndex: { not_equals: true } }, locale: 'de', sort: '-publishedAt', limit: 1000, depth: 0 }),
    ])

    const enSlugs = new Set(enDocs.map((p) => p.slug))
    const deSlugs = new Set(deDocs.map((p) => p.slug))
    const allSlugs = new Set([...enSlugs, ...deSlugs])

    // Build slug → updatedAt map from whichever locale has it
    const updatedAtMap = new Map<string, string>()
    for (const doc of [...enDocs, ...deDocs]) {
      if (doc.slug && doc.updatedAt && !updatedAtMap.has(doc.slug)) {
        updatedAtMap.set(doc.slug, new Date(doc.updatedAt).toISOString().split('T')[0])
      }
    }

    const urls = Array.from(allSlugs).map((slug) => {
      const enPath = `/blog/${slug}/`
      const dePath = `/de/blog/${slug}/`
      const lastmod = updatedAtMap.get(slug) ?? ''
      const enIndexed = enSlugs.has(slug)
      const deIndexed = deSlugs.has(slug)

      const hreflang = [
        enIndexed ? `<xhtml:link rel="alternate" hreflang="en" href="${base}${enPath}"/>` : '',
        deIndexed ? `<xhtml:link rel="alternate" hreflang="de" href="${base}${dePath}"/>` : '',
        `<xhtml:link rel="alternate" hreflang="x-default" href="${base}${enIndexed ? enPath : dePath}"/>`,
      ].filter(Boolean).join('\n    ')

      return [
        enIndexed ? `
  <url>
    <loc>${base}${enPath}</loc>
    ${hreflang}
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>` : '',
        deIndexed ? `
  <url>
    <loc>${base}${dePath}</loc>
    ${hreflang}
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>` : '',
      ].join('')
    }).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
  } catch (err) {
    console.error('[post-sitemap]', err)
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { status: 500, headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    )
  }
}
