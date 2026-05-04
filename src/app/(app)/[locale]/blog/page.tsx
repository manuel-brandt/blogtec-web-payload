import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const lang = locale === 'en' ? 'en' : 'de'
  try {
    const payload = await getPayload({ config })
    const otherLang = lang === 'de' ? 'en' : 'de'
    const findPage = async (locale: 'de' | 'en') => {
      const { docs } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'blog' } },
        locale,
        depth: 0,
        limit: 1,
      })
      return docs[0] as { meta?: { title?: string | null; description?: string | null } } | undefined
    }
    let page = await findPage(lang as 'de' | 'en')
    let metaTitle = page?.meta?.title?.trim() || undefined
    let metaDescription = page?.meta?.description?.trim() || undefined
    if (!metaTitle && !metaDescription) {
      page = await findPage(otherLang)
      metaTitle = page?.meta?.title?.trim() || undefined
      metaDescription = page?.meta?.description?.trim() || undefined
    }
    if (metaTitle || metaDescription) {
      return {
        title: metaTitle,
        description: metaDescription,
      }
    }
  } catch {}
  return {
    title: 'Blog',
    description:
      lang === 'de'
        ? 'Strategien, Tipps und Trends rund um SEO, Content Marketing und digitales Wachstum.'
        : 'Strategies, tips and trends around SEO, content marketing and digital growth.',
  }
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const categoryColors: Record<string, string> = {
  SEO: 'bg-blue-100 text-blue-700',
  Content: 'bg-purple-100 text-purple-700',
  'Link Building': 'bg-green-100 text-green-700',
  'Google Ads': 'bg-orange-100 text-orange-700',
  'Social Media': 'bg-pink-100 text-pink-700',
  Allgemein: 'bg-gray-100 text-gray-700',
}

const ui = {
  de: {
    label: 'Blog',
    heading: 'Marketing-Wissen & Insights',
    subheading:
      'Strategien, Tipps und Trends rund um SEO, Content Marketing und digitales Wachstum.',
    empty: 'Noch keine Beiträge vorhanden.',
    readMore: 'Weiterlesen →',
  },
  en: {
    label: 'Blog',
    heading: 'Marketing Knowledge & Insights',
    subheading: 'Strategies, tips and trends around SEO, content marketing and digital growth.',
    empty: 'No posts yet.',
    readMore: 'Read more →',
  },
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === 'en' ? 'en' : 'de'
  const postUrl = (slug: string) => lang === 'de' ? `/de/blog/${slug}` : `/blog/${slug}`
  const t = ui[lang as keyof typeof ui]

  const payload = await getPayload({ config })
  const { docs: posts } = await payload
    .find({
      collection: 'blog-posts',
      locale: lang as 'de' | 'en',
      sort: '-publishedAt',
      depth: 1,
      pagination: false,
    })
    .catch(() => ({ docs: [] }))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
              {t.label}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.heading}</h1>
            <p className="text-lg text-gray-500 max-w-2xl">{t.subheading}</p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">{t.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const cover =
                  post.coverImage && typeof post.coverImage === 'object'
                    ? (post.coverImage as Media)
                    : null
                return (
                  <Link
                    key={post.slug}
                    href={postUrl(post.slug)}
                    className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    {/* Cover image */}
                    <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                      {cover?.url ? (
                        <Image
                          src={cover.url}
                          alt={cover.alt ?? post.title ?? ''}
                          width={640}
                          height={360}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}
                          >
                            {post.category}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="text-xs text-gray-400">
                            {formatDate(post.publishedAt, lang)}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-3 flex-1">{post.excerpt}</p>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        {post.author?.name && (
                          <span className="text-xs text-gray-400">{post.author.name}</span>
                        )}
                        <span className="text-sm font-medium text-blue-600 group-hover:underline ml-auto">
                          {t.readMore}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
