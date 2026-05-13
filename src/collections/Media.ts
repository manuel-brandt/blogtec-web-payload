import type { CollectionConfig } from 'payload'

function getBlobBase(): string {
  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) return process.env.STORAGE_VERCEL_BLOB_BASE_URL
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
  const storeId = token.split('_')[3]?.toLowerCase() // same logic as @vercel/blob package
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : ''
}

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc.filename && typeof doc.url === 'string' && doc.url.startsWith('/api/media/file/')) {
          const base = getBlobBase()
          if (base) doc.url = `${base}/media/${doc.filename}`
        }
        return doc
      },
    ],
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 225,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 432,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for screen readers and SEO. Describe what is in the image.',
      },
    },
  ],
}
