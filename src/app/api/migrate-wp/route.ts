/**
 * One-time WordPress → Payload migration endpoint.
 * DELETE this file after the migration is complete.
 *
 * Call: GET /api/migrate-wp?secret=migrate-blogtec-2026
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Window } from 'happy-dom'

const SECRET = 'migrate-blogtec-2026'

// ─── Category mapping ────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string> = {
  'Basic SEO-Wissen': 'SEO',
  'Advanced SEO-Wissen': 'SEO',
  'Basic SEO Knowledge': 'SEO',
  'Advanced SEO Knowledge': 'SEO',
  'Content Wissen': 'Content',
  'Content Knowledge': 'Content',
  'Link Building': 'Link Building',
  'Google Ads': 'Google Ads',
  'Social Media': 'Social Media',
}

function mapCategory(wpCats: string[]): string {
  for (const cat of wpCats) {
    if (CATEGORY_MAP[cat]) return CATEGORY_MAP[cat]
  }
  return 'Allgemein'
}

function parseYoastNoIndex(serialized: string | null): boolean {
  if (!serialized) return false
  const match = serialized.match(/"robots-noindex";i:(\d)/)
  return match ? match[1] === '1' : false
}

const AUTHOR_MAP: Record<string, string> = {
  Manuel: 'Manuel Brandt',
  Jonas: 'Jonas Dießelberg',
  Lukas: 'Lukas Hoffmann',
  Christine: 'Christine Pichler',
  Susann: 'Susann',
  Katja: 'Katja Goldmann',
  Oliver: 'Oliver Schlupp',
  Marketing: 'Blogtec Team',
  Louie: 'Louie',
}

// ─── HTML → Lexical ──────────────────────────────────────────────────────────

type LexicalNode = Record<string, unknown>

const textNode = (text: string, format = 0): LexicalNode =>
  ({ detail: 0, format, mode: 'normal', style: '', text, type: 'text', version: 1 })

const paragraphNode = (children: LexicalNode[]): LexicalNode =>
  ({ children, direction: children.length ? 'ltr' : null, format: '', indent: 0, type: 'paragraph', version: 1 })

const headingNode = (tag: string, children: LexicalNode[]): LexicalNode =>
  ({ children, direction: 'ltr', format: '', indent: 0, tag, type: 'heading', version: 1 })

const listNode = (listType: 'bullet' | 'number', tag: string, children: LexicalNode[]): LexicalNode =>
  ({ children, direction: 'ltr', format: '', indent: 0, listType, start: 1, tag, type: 'list', version: 1 })

const listItemNode = (children: LexicalNode[], value: number): LexicalNode =>
  ({ children, direction: 'ltr', format: '', indent: 0, type: 'listitem', value, version: 1 })

const quoteNode = (children: LexicalNode[]): LexicalNode =>
  ({ children, direction: 'ltr', format: '', indent: 0, type: 'quote', version: 1 })

const linkNode = (url: string, newTab: boolean, children: LexicalNode[]): LexicalNode => ({
  children, direction: 'ltr',
  fields: { linkType: 'custom', newTab, rel: null, title: null, url },
  format: '', indent: 0, type: 'link', version: 3,
})

function convertInline(nodes: ChildNode[], format = 0): LexicalNode[] {
  const result: LexicalNode[] = []
  for (const node of nodes) {
    if (node.nodeType === 3) {
      const text = (node as unknown as Text).textContent ?? ''
      if (text) result.push(textNode(text, format))
    } else if (node.nodeType === 1) {
      const el = node as unknown as Element
      const tag = el.tagName.toLowerCase()
      if (tag === 'strong' || tag === 'b') {
        result.push(...convertInline(Array.from(el.childNodes) as ChildNode[], format | 1))
      } else if (tag === 'em' || tag === 'i') {
        result.push(...convertInline(Array.from(el.childNodes) as ChildNode[], format | 2))
      } else if (tag === 'a') {
        const href = el.getAttribute('href') ?? '#'
        const children = convertInline(Array.from(el.childNodes) as ChildNode[], format)
        if (children.length) result.push(linkNode(href, el.getAttribute('target') === '_blank', children))
      } else if (tag === 'br') {
        result.push(textNode('\n', format))
      } else if (tag === 'code') {
        result.push(textNode(el.textContent ?? '', format | 16))
      } else {
        result.push(...convertInline(Array.from(el.childNodes) as ChildNode[], format))
      }
    }
  }
  return result
}

function convertBlock(el: Element): LexicalNode[] {
  const tag = el.tagName.toLowerCase()
  if (tag === 'p' || tag === 'div') {
    const text = el.textContent?.trim()
    if (!text) return []
    return [paragraphNode(convertInline(Array.from(el.childNodes) as ChildNode[]))]
  }
  if (['h2', 'h3', 'h4'].includes(tag)) {
    const text = el.textContent?.trim()
    if (!text) return []
    return [headingNode(tag, convertInline(Array.from(el.childNodes) as ChildNode[]))]
  }
  if (tag === 'ul' || tag === 'ol') {
    const items: LexicalNode[] = []
    let idx = 1
    for (const li of Array.from(el.querySelectorAll(':scope > li'))) {
      const text = li.textContent?.trim()
      if (text) items.push(listItemNode(convertInline(Array.from(li.childNodes) as ChildNode[]), idx++))
    }
    return items.length ? [listNode(tag === 'ul' ? 'bullet' : 'number', tag, items)] : []
  }
  if (tag === 'blockquote') {
    const text = el.textContent?.trim()
    if (!text) return []
    return [quoteNode(convertInline(Array.from(el.childNodes) as ChildNode[]))]
  }
  if (tag === 'figure' || tag === 'img' || tag === 'table') return []
  const blocks: LexicalNode[] = []
  for (const child of Array.from(el.children)) blocks.push(...convertBlock(child as Element))
  return blocks
}

function htmlToLexical(html: string): LexicalNode {
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').trim()
  const win = new Window()
  const wrapper = win.document.createElement('div')
  wrapper.innerHTML = clean
  const children: LexicalNode[] = []
  for (const child of Array.from(wrapper.childNodes)) {
    if (child.nodeType === 3) {
      const text = (child as unknown as Text).textContent?.trim()
      if (text) children.push(paragraphNode([textNode(text)]))
    } else if (child.nodeType === 1) {
      children.push(...convertBlock(child as unknown as Element))
    }
  }
  return {
    root: {
      children: children.length ? children : [paragraphNode([])],
      direction: 'ltr', format: '', indent: 0, type: 'root', version: 1,
    },
  }
}

// ─── XML parser ──────────────────────────────────────────────────────────────

interface WPPost {
  id: string; title: string; slug: string; date: string; author: string
  content: string; excerpt: string; language: string
  translationGroup: string | null; categories: string[]
  yoastTitle: string | null; yoastDesc: string | null
  yoastNoIndex: boolean; coverImageUrl: string | null
}

function getMeta(item: Element, key: string, WP_NS: string): string | null {
  for (const meta of Array.from(item.getElementsByTagNameNS(WP_NS, 'postmeta'))) {
    if (meta.getElementsByTagNameNS(WP_NS, 'meta_key')[0]?.textContent?.trim() === key) {
      return meta.getElementsByTagNameNS(WP_NS, 'meta_value')[0]?.textContent?.trim() ?? null
    }
  }
  return null
}

function parseXML(xmlPath: string): WPPost[] {
  const xml = readFileSync(xmlPath, 'utf-8')
  const win = new Window()
  const xmlDoc = new win.DOMParser().parseFromString(xml, 'text/xml') as unknown as Document
  const WP_NS = 'http://wordpress.org/export/1.2/'
  const DC_NS = 'http://purl.org/dc/elements/1.1/'
  const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/'
  const EXCERPT_NS = 'http://wordpress.org/export/1.2/excerpt/'
  const posts: WPPost[] = []
  for (const item of Array.from(xmlDoc.getElementsByTagName('item'))) {
    const postType = item.getElementsByTagNameNS(WP_NS, 'post_type')[0]?.textContent?.trim()
    const status = item.getElementsByTagNameNS(WP_NS, 'status')[0]?.textContent?.trim()
    if (postType !== 'post' || status !== 'publish') continue
    const id = item.getElementsByTagNameNS(WP_NS, 'post_id')[0]?.textContent?.trim() ?? ''
    const title = item.getElementsByTagName('title')[0]?.textContent?.trim() ?? ''
    const slug = item.getElementsByTagNameNS(WP_NS, 'post_name')[0]?.textContent?.trim() ?? ''
    const date = item.getElementsByTagNameNS(WP_NS, 'post_date')[0]?.textContent?.trim() ?? ''
    const author = item.getElementsByTagNameNS(DC_NS, 'creator')[0]?.textContent?.trim() ?? ''
    const content = item.getElementsByTagNameNS(CONTENT_NS, 'encoded')[0]?.textContent?.trim() ?? ''
    const excerpt = (item.getElementsByTagNameNS(EXCERPT_NS, 'encoded')[0]?.textContent?.trim() ?? '')
      .replace(/<[^>]+>/g, '').trim()
    let language = 'de', translationGroup: string | null = null
    const categories: string[] = []
    for (const cat of Array.from(item.getElementsByTagName('category'))) {
      const domain = cat.getAttribute('domain') ?? ''
      const text = cat.textContent?.trim() ?? ''
      if (domain === 'language') language = text === 'English' ? 'en' : 'de'
      if (domain === 'post_translations') translationGroup = cat.getAttribute('nicename')
      if (domain === 'category') categories.push(text)
    }
    const yoastTitle = getMeta(item, '_yoast_wpseo_title', WP_NS)
    const yoastDesc = getMeta(item, '_yoast_wpseo_metadesc', WP_NS)
    const yoastMeta = getMeta(item, '_yoast_wpseo_meta', WP_NS)
    const coverImageUrl = getMeta(item, '_yoast_wpseo_opengraph-image', WP_NS)
    posts.push({
      id, title, slug, date, author, content,
      excerpt: excerpt.slice(0, 200),
      language, translationGroup, categories,
      yoastTitle: yoastTitle && !yoastTitle.includes('%%') ? yoastTitle : null,
      yoastDesc: yoastDesc || null,
      yoastNoIndex: parseYoastNoIndex(yoastMeta),
      coverImageUrl: coverImageUrl || null,
    })
  }
  return posts
}

// ─── Route handler ───────────────────────────────────────────────────────────

export const maxDuration = 300 // Vercel Pro max

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const xmlPath = path.join(process.cwd(), 'scripts', 'wp-export.xml')
  const payload = await getPayload({ config: await configPromise })

  let allPosts: WPPost[]
  try {
    allPosts = parseXML(xmlPath)
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to parse XML', detail: err?.message }, { status: 500 })
  }

  // Build translation pairs
  const groupMap = new Map<string, { de?: WPPost; en?: WPPost }>()
  const ungrouped: WPPost[] = []
  for (const post of allPosts) {
    if (post.translationGroup) {
      const entry = groupMap.get(post.translationGroup) ?? {}
      entry[post.language as 'de' | 'en'] = post
      groupMap.set(post.translationGroup, entry)
    } else {
      ungrouped.push(post)
    }
  }

  const pairs = Array.from(groupMap.values())
  const results: string[] = []
  let created = 0, failed = 0

  function buildData(post: WPPost) {
    return {
      title: post.title,
      excerpt: post.excerpt || undefined,
      body: htmlToLexical(post.content),
      noIndex: post.yoastNoIndex,
      publishedAt: new Date(post.date).toISOString(),
      category: mapCategory(post.categories),
      author: { name: AUTHOR_MAP[post.author] ?? post.author },
      meta: {
        ...(post.yoastTitle ? { title: post.yoastTitle } : {}),
        ...(post.yoastDesc ? { description: post.yoastDesc } : {}),
      },
    }
  }

  // Paired DE+EN posts
  for (const pair of pairs.filter(p => p.de && p.en)) {
    const { de, en } = pair as { de: WPPost; en: WPPost }
    const slug = en.slug || de.slug
    try {
      const doc = await payload.create({
        collection: 'blog-posts',
        locale: 'de',
        data: { ...buildData(de), slug } as any,
      })
      await payload.update({
        collection: 'blog-posts',
        id: doc.id,
        locale: 'en',
        data: buildData(en) as any,
      })
      created++
    } catch (err: any) {
      failed++
      results.push(`FAIL pair "${de.title}": ${err?.message}`)
    }
  }

  // Single-locale posts
  const singles = [
    ...pairs.filter(p => !(p.de && p.en)).map(p => (p.de ?? p.en)!),
    ...ungrouped,
  ]
  for (const post of singles) {
    try {
      await payload.create({
        collection: 'blog-posts',
        locale: post.language as 'de' | 'en',
        data: { ...buildData(post), slug: post.slug } as any,
      })
      created++
    } catch (err: any) {
      failed++
      results.push(`FAIL "${post.title}": ${err?.message}`)
    }
  }

  return NextResponse.json({
    message: `Migration complete: ${created} created, ${failed} failed`,
    total: allPosts.length,
    created,
    failed,
    errors: results.slice(0, 20),
  })
}
