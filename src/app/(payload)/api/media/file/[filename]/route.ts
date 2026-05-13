import { type NextRequest } from 'next/server'

// Override the @payloadcms/storage-vercel-blob static handler.
// The plugin's handler calls head() (a Vercel Blob API op) on every request,
// which drains the 2,000-operation free-tier limit fast.
// This route redirects directly to the public CDN URL — zero API ops.
function getBlobBase(): string {
  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) return process.env.STORAGE_VERCEL_BLOB_BASE_URL
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
  const storeId = token.split('_')[3]?.toLowerCase()
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : ''
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params
  const base = getBlobBase()
  if (!base) {
    return new Response('Blob storage not configured', { status: 503 })
  }
  const cdnUrl = `${base}/media/${filename}`
  return Response.redirect(cdnUrl, 302)
}
