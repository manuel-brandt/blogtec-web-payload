import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteBase } from '@/lib/alternates'

export const dynamic = 'force-dynamic'

function urlBlock(base: string, enPath: string, dePath: string, priority = '0.8') {
  return `
  <url>
    <loc>${base}${enPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${base}${dePath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${enPath}"/>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${base}${dePath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${base}${dePath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${enPath}"/>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'pages', limit: 100, depth: 0 })
    const base = getSiteBase()

    const urls = docs.map((page) => {
      const enPath = page.slug === 'home' ? '/' : `/${page.slug}`
      const dePath = page.slug === 'home' ? '/de' : `/de/${page.slug}`
      const priority = page.slug === 'home' ? '1.0' : '0.8'
      return urlBlock(base, enPath, dePath, priority)
    }).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
  } catch (err) {
    console.error('[page-sitemap]', err)
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { status: 500, headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    )
  }
}
