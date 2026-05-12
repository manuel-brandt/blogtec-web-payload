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

// ─── XML parser (regex-based — happy-dom getElementsByTagNameNS is broken) ────

interface WPPost {
  id: string; title: string; slug: string; date: string; author: string
  content: string; excerpt: string; language: string
  translationGroup: string | null; categories: string[]
  yoastTitle: string | null; yoastDesc: string | null
  yoastNoIndex: boolean; coverImageUrl: string | null
}

// Extract text content of a tag (with optional namespace prefix), CDATA-aware.
function rx(block: string, tag: string): string {
  const t = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = block.match(new RegExp(`<${t}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${t}>`))
  return (m?.[1] ?? m?.[2] ?? '').trim()
}

// Extract all occurrences of a tag as an array of raw inner strings.
function rxAll(block: string, tag: string): string[] {
  const t = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`<${t}([\\s\\S]*?)<\\/${t}>`, 'g')
  const results: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(block)) !== null) results.push(m[0])
  return results
}


function getMetaRx(block: string, key: string): string | null {
  for (const meta of rxAll(block, 'wp:postmeta')) {
    if (rx(meta, 'wp:meta_key') === key) {
      return rx(meta, 'wp:meta_value') || null
    }
  }
  return null
}

function splitItems(xml: string): string[] {
  const items: string[] = []
  const re = /<item>([\s\S]*?)<\/item>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) items.push(m[0])
  return items
}

function parseXML(xmlPath: string): WPPost[] {
  const xml = readFileSync(xmlPath, 'utf-8')
  const posts: WPPost[] = []

  for (const item of splitItems(xml)) {
    const postType = rx(item, 'wp:post_type')
    const status = rx(item, 'wp:status')
    if (postType !== 'post' || status !== 'publish') continue

    const id = rx(item, 'wp:post_id')
    const title = rx(item, 'title')
    const slug = rx(item, 'wp:post_name')
    const date = rx(item, 'wp:post_date')
    const author = rx(item, 'dc:creator')
    const content = rx(item, 'content:encoded')
    const rawExcerpt = rx(item, 'excerpt:encoded').replace(/<[^>]+>/g, '').trim()

    let language = 'de'
    let translationGroup: string | null = null
    const categories: string[] = []

    // Parse <category domain="..." nicename="..."><![CDATA[...]]></category>
    const catRe = /<category[^>]*domain="([^"]*)"[^>]*nicename="([^"]*)"[^>]*>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([^<]*))<\/category>/g
    let catMatch: RegExpExecArray | null
    while ((catMatch = catRe.exec(item)) !== null) {
      const domain = catMatch[1]
      const nicename = catMatch[2]
      const text = (catMatch[3] ?? catMatch[4] ?? '').trim()
      if (domain === 'language') language = text === 'English' ? 'en' : 'de'
      if (domain === 'post_translations') translationGroup = nicename || null
      if (domain === 'category') categories.push(text)
    }

    const yoastTitle = getMetaRx(item, '_yoast_wpseo_title')
    const yoastDesc = getMetaRx(item, '_yoast_wpseo_metadesc')
    const yoastMeta = getMetaRx(item, '_yoast_wpseo_meta')
    const coverImageUrl = getMetaRx(item, '_yoast_wpseo_opengraph-image')

    posts.push({
      id, title, slug, date, author, content,
      excerpt: rawExcerpt.slice(0, 200),
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
