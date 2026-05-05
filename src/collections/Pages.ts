import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Static pages — content is hardcoded in code. Edit SEO metadata in the SEO tab.',
  },
  fields: [
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Exclude from search engines and remove from sitemap (same as Yoast noindex).',
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page name for identification, e.g. "Homepage" or "Blog".',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL identifier, e.g. "home" or "blog". Use consistent values.',
      },
    },
  ],
}
