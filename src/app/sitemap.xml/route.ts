import { getSiteBase } from '@/lib/alternates'

export const dynamic = 'force-dynamic'

export function GET() {
  const base = getSiteBase()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/page-sitemap.xml</loc></sitemap>
  <sitemap><loc>${base}/post-sitemap.xml</loc></sitemap>
</sitemapindex>`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
