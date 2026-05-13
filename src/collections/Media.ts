import type { CollectionConfig } from 'payload'

function blobBaseUrl(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
  const storeId = token.match(/vercel_blob_rw_([^_]+)_/)?.[1]
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : ''
}

const BLOB_BASE = blobBaseUrl()

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (
          BLOB_BASE &&
          doc.filename &&
          typeof doc.url === 'string' &&
          doc.url.startsWith('/api/media/file/')
        ) {
          doc.url = `${BLOB_BASE}/media/${doc.filename}`
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
