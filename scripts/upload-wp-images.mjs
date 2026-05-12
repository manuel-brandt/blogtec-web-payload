#!/usr/bin/env node
/**
 * Upload WordPress images to Payload CMS media library.
 * Run from the repo root on your local machine:
 *
 *   PAYLOAD_URL=https://your-preview.vercel.app \
 *   PAYLOAD_EMAIL=you@example.com \
 *   PAYLOAD_PASSWORD=yourpassword \
 *   node scripts/upload-wp-images.mjs
 *
 * Optional env var:
 *   WP_BACKUP_DIR=/path/to/blogtec-web-backup-26-05-12
 *   (defaults to ~/Desktop/Code Backups/blogtec-web-backup-26-05-12)
 *
 * Outputs: scripts/image-map.json  { "https://blogtec.io/.../img.jpg": "payloadMediaId" }
 *
 * After running:
 *   1. git add scripts/image-map.json && git commit && git push
 *   2. Delete all blog-posts in Payload admin (if any exist from a previous run)
 *   3. Call /api/migrate-wp?secret=migrate-blogtec-2026 again
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─── Load .env.local ──────────────────────────────────────────────────────────
try {
  const env = readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8')
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
  }
} catch { /* no .env.local */ }

const PAYLOAD_URL = (process.env.PAYLOAD_URL || '').replace(/\/$/, '')
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL || ''
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD || ''
const WP_BACKUP_DIR = process.env.WP_BACKUP_DIR ||
  path.join(process.env.HOME || '', 'Desktop', 'Code Backups', 'blogtec-web-backup-26-05-12')
const XML_PATH = path.join(__dirname, 'wp-export.xml')
const MAP_PATH = path.join(__dirname, 'image-map.json')

function die(msg) { console.error(`❌ ${msg}`); process.exit(1) }

if (!PAYLOAD_URL) die('Set PAYLOAD_URL= (e.g. https://your-preview.vercel.app)')
if (!PAYLOAD_EMAIL) die('Set PAYLOAD_EMAIL=')
if (!PAYLOAD_PASSWORD) die('Set PAYLOAD_PASSWORD=')
if (!existsSync(XML_PATH)) die(`wp-export.xml not found at ${XML_PATH}`)

// ─── Extract all WP image URLs from XML ──────────────────────────────────────

function extractImageUrls(xml) {
  const urls = new Set()

  // img src attributes in post content
  const imgRe = /src="(https?:\/\/blogtec\.io\/wp-content\/uploads\/[^"]+)"/g
  let m
  while ((m = imgRe.exec(xml)) !== null) urls.add(m[1])

  // OG / cover images in Yoast meta
  const ogRe = /<wp:meta_value[^>]*>(?:<!\[CDATA\[)?(https?:\/\/blogtec\.io\/wp-content\/uploads\/[^\]<]+?)(?:\]\]>)?<\/wp:meta_value>/g
  while ((m = ogRe.exec(xml)) !== null) {
    const val = m[1].trim()
    if (val.match(/\.(jpe?g|png|webp|gif|svg)(\?.*)?$/i)) urls.add(val)
  }

  // Filter out scaled variants like -300x200.jpg in favour of originals
  // We keep both because in-content may reference the scaled version directly
  return [...urls].filter(u => !u.includes('?'))
}

function wpUrlToLocal(url) {
  const rel = url.replace('https://blogtec.io/', '')
  return path.join(WP_BACKUP_DIR, rel)
}

// Try to find image: exact path, then try stripping -WxH size suffix
function findLocalFile(url) {
  const exact = wpUrlToLocal(url)
  if (existsSync(exact)) return exact

  // Try original: image-300x200.jpg → image.jpg
  const noSize = exact.replace(/-\d+x\d+(\.[^.]+)$/, '$1')
  if (noSize !== exact && existsSync(noSize)) return noSize

  return null
}

// ─── Payload auth ─────────────────────────────────────────────────────────────

async function login() {
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
  })
  if (!res.ok) die(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  if (!data.token) die(`Login response missing token: ${JSON.stringify(data)}`)
  return data.token
}

// ─── Upload one image to Payload /api/media ───────────────────────────────────

async function uploadImage(localPath, token) {
  const filename = path.basename(localPath)
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const mimeType = { png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' }[ext] ?? 'image/jpeg'

  const fileBuffer = readFileSync(localPath)
  const form = new FormData()
  form.append('_payload', JSON.stringify({ alt: filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '') }))
  form.append('file', new Blob([fileBuffer], { type: mimeType }), filename)

  const res = await fetch(`${PAYLOAD_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${text.slice(0, 200)}`)
  }

  const data = await res.json()
  const id = data.doc?.id
  if (!id) throw new Error(`No doc.id in response: ${JSON.stringify(data).slice(0, 200)}`)
  return id
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`📂 WP backup: ${WP_BACKUP_DIR}`)
  console.log(`🌐 Payload:   ${PAYLOAD_URL}\n`)

  const xml = readFileSync(XML_PATH, 'utf-8')
  const urls = extractImageUrls(xml)
  console.log(`🖼  Found ${urls.length} unique image URLs in XML`)

  // Load existing map (resume support)
  let imageMap = {}
  if (existsSync(MAP_PATH)) {
    imageMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'))
    const already = Object.keys(imageMap).length
    if (already > 0) console.log(`📋 Resuming — ${already} already mapped\n`)
  }

  console.log('🔑 Logging in...')
  let token = await login()
  console.log('✅ Logged in\n')

  let uploaded = 0, skipped = 0, notFound = 0, failed = 0
  let lastSave = Date.now()

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]

    if (imageMap[url]) { skipped++; continue }

    const localPath = findLocalFile(url)
    if (!localPath) {
      console.warn(`⚠️  Not found: ${url.replace('https://blogtec.io/wp-content/uploads/', '')}`)
      notFound++
      continue
    }

    try {
      const mediaId = await uploadImage(localPath, token)
      imageMap[url] = mediaId
      uploaded++
      process.stdout.write(`  [${i + 1}/${urls.length}] ✅ ${uploaded} uploaded\r`)
    } catch (err) {
      console.warn(`\n⚠️  Upload failed for ${path.basename(localPath)}: ${err.message}`)
      failed++
    }

    // Re-login every 150 uploads (JWT expiry)
    if (uploaded > 0 && uploaded % 150 === 0) {
      try { token = await login() } catch { /* carry on */ }
    }

    // Auto-save progress every 30s
    if (Date.now() - lastSave > 30_000) {
      writeFileSync(MAP_PATH, JSON.stringify(imageMap, null, 2))
      lastSave = Date.now()
    }
  }

  writeFileSync(MAP_PATH, JSON.stringify(imageMap, null, 2))

  console.log(`\n\n${'─'.repeat(50)}`)
  console.log(`✅ Uploaded:  ${uploaded}`)
  console.log(`⏭  Skipped:   ${skipped} (already in map)`)
  console.log(`🔍 Not found: ${notFound} (missing from backup)`)
  console.log(`❌ Failed:    ${failed}`)
  console.log(`💾 Saved:     scripts/image-map.json (${Object.keys(imageMap).length} entries)`)
  console.log(`\nNext steps:`)
  console.log(`  1. git add scripts/image-map.json && git commit -m "add image-map" && git push`)
  console.log(`  2. Delete all blog-posts in Payload admin (if any exist)`)
  console.log(`  3. Hit: ${PAYLOAD_URL}/api/migrate-wp?secret=migrate-blogtec-2026`)
}

main().catch(err => { console.error(err); process.exit(1) })
