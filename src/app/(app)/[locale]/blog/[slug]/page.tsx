import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const lang = locale === 'en' ? 'en' : 'de'
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      locale: lang as 'de' | 'en',
      depth: 1,
      limit: 1,
    })
    const post = docs[0]
    if (post) {
      // Use locale-specific meta; fall back to the localized post.title / post.excerpt.
      // Never cross-fetch the other locale — that would bleed EN meta onto the DE page.
      const title = post.meta?.title || post.title
      const description = post.meta?.description || post.excerpt || undefined
      const cover =
        post.coverImage && typeof post.coverImage === 'object'
          ? (post.coverImage as Media)
          : null
      const ogImages = cover?.url
        ? [{ url: cover.url, width: cover.width ?? 1200, height: cover.height ?? 630, alt: cover.alt ?? title }]
        : []
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'article',
          ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
          ...(ogImages.length > 0 ? { images: ogImages } : {}),
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          ...(cover?.url ? { images: [cover.url] } : {}),
        },
      }
    }
  } catch {}
  return { title: slug.replace(/-/g, ' ') }
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
    back: '← Zurück zum Blog',
    backAll: '← Alle Beiträge ansehen',
  },
  en: {
    back: '← Back to Blog',
    backAll: '← View all posts',
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const lang = locale === 'en' ? 'en' : 'de'
  const blogUrl = lang === 'de' ? '/de/blog' : '/blog'
  const t = ui[lang as keyof typeof ui]

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    locale: lang as 'de' | 'en',
    depth: 1,
    limit: 1,
  })

  const post = docs[0]
  if (!post) notFound()

  const cover =
    post.coverImage && typeof post.coverImage === 'object' ? (post.coverImage as Media) : null
  const authorAvatar =
    post.author?.avatar && typeof post.author.avatar === 'object'
      ? (post.author.avatar as Media)
      : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-50 border-b border-gray-200 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href={blogUrl}
              className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
              {t.back}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}
                >
                  {post.category}
                </span>
              )}
              {post.publishedAt && (
                <span className="text-sm text-gray-400">{formatDate(post.publishedAt, lang)}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
            )}

            {post.author?.name && (
              <div className="flex items-center gap-3 mt-6">
                {authorAvatar?.url && (
                  <Image
                    src={authorAvatar.url}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
              </div>
            )}
          </div>
        </section>

        {/* Cover image */}
        {cover?.url && (
          <div className="max-w-4xl mx-auto px-4 pt-10">
            <Image
              src={cover.url}
              alt={cover.alt ?? post.title ?? ''}
              width={1200}
              height={630}
              className="w-full rounded-2xl object-cover shadow-sm"
            />
          </div>
        )}

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-gray prose-lg max-w-none">
          {post.body && <RichText data={post.body} />}
        </article>

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <Link href={blogUrl} className="text-sm text-blue-600 hover:underline">
            {t.backAll}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
