/**
 * WordPress → Payload CMS migration script
 * Reads the WP XML export, converts posts to Payload blog-posts with EN/DE locales.
 *
 * Run: node --env-file=.env.local --import tsx/esm scripts/migrate-wp.ts
 */

import { readFileSync } from 'node:fs'
import { Window } from 'happy-dom'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.js'

const XML_PATH = process.argv[2] ?? new URL('./wp-export.xml', import.meta.url).pathname

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

// ─── PHP serialized noindex parser ───────────────────────────────────────────

function parseYoastNoIndex(serialized: string | null): boolean {
  if (!serialized) return false
  // Yoast stores "robots-noindex" as i:1 (noindex) or i:2 (index)
  const match = serialized.match(/"robots-noindex";i:(\d)/)
  return match ? match[1] === '1' : false
}

// ─── HTML → Lexical JSON converter ───────────────────────────────────────────

type LexicalNode = Record<string, unknown>

function textNode(text: string, format = 0): LexicalNode {
  return { detail: 0, format, mode: 'normal', style: '', text, type: 'text', version: 1 }
}

function paragraphNode(children: LexicalNode[]): LexicalNode {
  return { children, direction: children.length ? 'ltr' : null, format: '', indent: 0, type: 'paragraph', version: 1 }
}

function headingNode(tag: string, children: LexicalNode[]): LexicalNode {
  return { children, direction: 'ltr', format: '', indent: 0, tag, type: 'heading', version: 1 }
}

function listNode(listType: 'bullet' | 'number', tag: string, children: LexicalNode[]): LexicalNode {
  return { children, direction: 'ltr', format: '', indent: 0, listType, start: 1, tag, type: 'list', version: 1 }
}

function listItemNode(children: LexicalNode[], value: number): LexicalNode {
  return { children, direction: 'ltr', format: '', indent: 0, type: 'listitem', value, version: 1 }
}

function quoteNode(children: LexicalNode[]): LexicalNode {
  return { children, direction: 'ltr', format: '', indent: 0, type: 'quote', version: 1 }
}

function linkNode(url: string, newTab: boolean, children: LexicalNode[]): LexicalNode {
  return {
    children,
    direction: 'ltr',
    fields: { linkType: 'custom', newTab, rel: null, title: null, url },
    format: '',
    indent: 0,
    type: 'link',
    version: 3,
  }
}

function convertChildNodes(nodes: ChildNode[], format = 0): LexicalNode[] {
  const result: LexicalNode[] = []
  for (const node of nodes) {
    if (node.nodeType === 3 /* TEXT_NODE */) {
      const text = (node as Text).textContent ?? ''
      if (text) result.push(textNode(text, format))
    } else if (node.nodeType === 1 /* ELEMENT_NODE */) {
      const el = node as Element
      const tag = el.tagName.toLowerCase()
      if (tag === 'strong' || tag === 'b') {
        result.push(...convertChildNodes(Array.from(el.childNodes) as ChildNode[], format | 1))
      } else if (tag === 'em' || tag === 'i') {
        result.push(...convertChildNodes(Array.from(el.childNodes) as ChildNode[], format | 2))
      } else if (tag === 'a') {
        const href = el.getAttribute('href') ?? '#'
        const newTab = el.getAttribute('target') === '_blank'
        const children = convertChildNodes(Array.from(el.childNodes) as ChildNode[], format)
        if (children.length) result.push(linkNode(href, newTab, children))
      } else if (tag === 'br') {
        result.push(textNode('\n', format))
      } else if (tag === 'code') {
        result.push(textNode(el.textContent ?? '', format | 16))
      } else {
        // fall through — recurse
        result.push(...convertChildNodes(Array.from(el.childNodes) as ChildNode[], format))
      }
    }
  }
  return result
}

function convertElement(el: Element): LexicalNode[] {
  const tag = el.tagName.toLowerCase()

  if (['p', 'div'].includes(tag)) {
    const children = convertChildNodes(Array.from(el.childNodes) as ChildNode[])
    const text = el.textContent?.trim()
    if (!text) return []
    return [paragraphNode(children.length ? children : [textNode(text)])]
  }

  if (['h2', 'h3', 'h4'].includes(tag)) {
    const children = convertChildNodes(Array.from(el.childNodes) as ChildNode[])
    const text = el.textContent?.trim()
    if (!text) return []
    return [headingNode(tag, children.length ? children : [textNode(text)])]
  }

  if (tag === 'ul' || tag === 'ol') {
    const listType = tag === 'ul' ? 'bullet' : 'number'
    const items: LexicalNode[] = []
    let idx = 1
    for (const li of Array.from(el.querySelectorAll(':scope > li'))) {
      const children = convertChildNodes(Array.from(li.childNodes) as ChildNode[])
      const text = li.textContent?.trim()
      if (text) items.push(listItemNode(children.length ? children : [textNode(text)], idx++))
    }
    return items.length ? [listNode(listType, tag, items)] : []
  }

  if (tag === 'blockquote') {
    const children = convertChildNodes(Array.from(el.childNodes) as ChildNode[])
    const text = el.textContent?.trim()
    if (!text) return []
    return [quoteNode(children.length ? children : [textNode(text)])]
  }

  if (tag === 'figure' || tag === 'img') return [] // skip images

  // Generic: recurse into children looking for block elements
  const blocks: LexicalNode[] = []
  for (const child of Array.from(el.children)) {
    blocks.push(...convertElement(child as Element))
  }
  return blocks
}

function htmlToLexical(html: string): LexicalNode {
  // Strip Gutenberg block comments (including self-closing ones like <!-- wp:uagb/... /-->)
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').trim()

  const win = new Window()
  const doc = win.document
  const wrapper = doc.createElement('div')
  wrapper.innerHTML = clean

  const children: LexicalNode[] = []
  for (const child of Array.from(wrapper.childNodes)) {
    if (child.nodeType === 3 /* TEXT_NODE */) {
      const text = (child as unknown as Text).textContent?.trim()
      if (text) children.push(paragraphNode([textNode(text)]))
    } else if (child.nodeType === 1 /* ELEMENT_NODE */) {
      children.push(...convertElement(child as unknown as Element))
    }
  }

  return {
    root: {
      children: children.length ? children : [paragraphNode([])],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// ─── XML parser ──────────────────────────────────────────────────────────────

interface WPPost {
  id: string
  title: string
  slug: string
  date: string
  author: string
  content: string
  excerpt: string
  language: string
  translationGroup: string | null
  categories: string[]
  yoastTitle: string | null
  yoastDesc: string | null
  yoastNoIndex: boolean
  coverImageUrl: string | null
}

function getText(el: Element, tag: string, ns?: string): string {
  const child = ns ? el.getElementsByTagNameNS(ns, tag.split(':')[1] ?? tag)[0]
                   : el.getElementsByTagName(tag)[0]
  return child?.textContent?.trim() ?? ''
}

function getMeta(item: Element, key: string, wpNs: string): string | null {
  const metas = item.getElementsByTagNameNS(wpNs, 'postmeta')
  for (const meta of Array.from(metas)) {
    const k = meta.getElementsByTagNameNS(wpNs, 'meta_key')[0]?.textContent?.trim()
    if (k === key) {
      return meta.getElementsByTagNameNS(wpNs, 'meta_value')[0]?.textContent?.trim() ?? null
    }
  }
  return null
}

function parseXML(): WPPost[] {
  const xml = readFileSync(XML_PATH, 'utf-8')
  const win = new Window()
  const doc = win.document
  const parser = new win.DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml') as unknown as Document

  const WP_NS = 'http://wordpress.org/export/1.2/'
  const DC_NS = 'http://purl.org/dc/elements/1.1/'
  const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/'
  const EXCERPT_NS = 'http://wordpress.org/export/1.2/excerpt/'

  const items = Array.from(xmlDoc.getElementsByTagName('item'))
  const posts: WPPost[] = []

  for (const item of items) {
    const postType = item.getElementsByTagNameNS(WP_NS, 'post_type')[0]?.textContent?.trim()
    const status = item.getElementsByTagNameNS(WP_NS, 'status')[0]?.textContent?.trim()
    if (postType !== 'post' || status !== 'publish') continue

    const id = item.getElementsByTagNameNS(WP_NS, 'post_id')[0]?.textContent?.trim() ?? ''
    const title = item.getElementsByTagName('title')[0]?.textContent?.trim() ?? ''
    const slug = item.getElementsByTagNameNS(WP_NS, 'post_name')[0]?.textContent?.trim() ?? ''
    const date = item.getElementsByTagNameNS(WP_NS, 'post_date')[0]?.textContent?.trim() ?? ''
    const author = item.getElementsByTagNameNS(DC_NS, 'creator')[0]?.textContent?.trim() ?? ''
    const content = item.getElementsByTagNameNS(CONTENT_NS, 'encoded')[0]?.textContent?.trim() ?? ''
    const excerpt = item.getElementsByTagNameNS(EXCERPT_NS, 'encoded')[0]?.textContent?.trim()
      ?.replace(/<[^>]+>/g, '').trim() ?? ''

    let language = 'de'
    let translationGroup: string | null = null
    const categories: string[] = []

    const catEls = item.getElementsByTagName('category')
    for (const cat of Array.from(catEls)) {
      const domain = cat.getAttribute('domain') ?? ''
      const text = cat.textContent?.trim() ?? ''
      if (domain === 'language') language = text === 'English' ? 'en' : 'de'
      if (domain === 'post_translations') translationGroup = cat.getAttribute('nicename')
      if (domain === 'category') categories.push(text)
    }

    const yoastTitle = getMeta(item, '_yoast_wpseo_title', WP_NS)
    const yoastDesc = getMeta(item, '_yoast_wpseo_metadesc', WP_NS)
    const yoastMeta = getMeta(item, '_yoast_wpseo_meta', WP_NS)
    const yoastNoIndex = parseYoastNoIndex(yoastMeta)
    const coverImageUrl = getMeta(item, '_yoast_wpseo_opengraph-image', WP_NS)

    // Skip Yoast title templates (%%title%% etc)
    const cleanYoastTitle =
      yoastTitle && !yoastTitle.includes('%%') ? yoastTitle : null

    posts.push({
      id, title, slug, date, author, content, excerpt,
      language, translationGroup, categories,
      yoastTitle: cleanYoastTitle,
      yoastDesc: yoastDesc || null,
      yoastNoIndex,
      coverImageUrl: coverImageUrl || null,
    })
  }

  return posts
}

// ─── Author mapping ──────────────────────────────────────────────────────────

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

// ─── Main migration ──────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting WordPress → Payload migration...\n')

  const payload = await getPayload({ config: await configPromise })

  const allPosts = parseXML()
  console.log(`📄 Parsed ${allPosts.length} published posts from XML`)

  const byLang = allPosts.reduce<Record<string, number>>((acc, p) => {
    acc[p.language] = (acc[p.language] ?? 0) + 1
    return acc
  }, {})
  console.log(`   Languages: ${JSON.stringify(byLang)}`)

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
  const pairedBoth = pairs.filter(p => p.de && p.en)
  const pairedOne = pairs.filter(p => !(p.de && p.en))
  console.log(`   ${pairedBoth.length} DE+EN pairs, ${pairedOne.length} single-language groups, ${ungrouped.length} ungrouped\n`)

  let created = 0
  let failed = 0

  // Helper: build Payload data for one locale
  function buildLocaleData(post: WPPost, includeSlug: boolean) {
    const lexicalBody = htmlToLexical(post.content)
    const safeExcerpt = post.excerpt.slice(0, 200) || undefined

    const data: Record<string, unknown> = {
      title: post.title,
      excerpt: safeExcerpt,
      body: lexicalBody,
      noIndex: post.yoastNoIndex,
      'author.name': AUTHOR_MAP[post.author] ?? post.author,
      publishedAt: new Date(post.date).toISOString(),
      category: mapCategory(post.categories),
      meta: {
        ...(post.yoastTitle ? { title: post.yoastTitle } : {}),
        ...(post.yoastDesc ? { description: post.yoastDesc } : {}),
      },
    }

    if (includeSlug) data.slug = post.slug

    return data
  }

  // Process paired DE+EN posts
  for (const pair of pairedBoth) {
    const de = pair.de!
    const en = pair.en!
    // Prefer EN slug (cleaner), fall back to DE
    const slug = en.slug || de.slug

    try {
      // Create with DE locale first (DE is the default locale)
      const created_doc = await payload.create({
        collection: 'blog-posts',
        locale: 'de',
        data: {
          ...buildLocaleData(de, false),
          slug,
          publishedAt: new Date(de.date).toISOString(),
          category: mapCategory(de.categories),
        } as any,
      })

      // Update with EN locale
      await payload.update({
        collection: 'blog-posts',
        id: created_doc.id,
        locale: 'en',
        data: buildLocaleData(en, false) as any,
      })

      created++
      if (created % 10 === 0) console.log(`   ✓ ${created} posts migrated...`)
    } catch (err: any) {
      console.error(`   ✗ Failed pair DE:"${de.title}" / EN:"${en.title}": ${err?.message}`)
      failed++
    }
  }

  // Process single-language groups and ungrouped
  const singles = [
    ...pairedOne.map(p => p.de ?? p.en!),
    ...ungrouped,
  ]

  for (const post of singles) {
    try {
      await payload.create({
        collection: 'blog-posts',
        locale: post.language as 'de' | 'en',
        data: buildLocaleData(post, true) as any,
      })
      created++
      if (created % 10 === 0) console.log(`   ✓ ${created} posts migrated...`)
    } catch (err: any) {
      console.error(`   ✗ Failed "${post.title}": ${err?.message}`)
      failed++
    }
  }

  console.log(`\n✅ Done! ${created} posts created, ${failed} failed.`)
  console.log(`   Cover images were skipped (need to be uploaded manually or via FTP).`)

  process.exit(0)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
