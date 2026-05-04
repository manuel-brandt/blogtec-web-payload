import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  BlockquoteFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = (data.title as string)
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'Auto-generated from title on first save. Override if needed.',
              },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'category',
              type: 'select',
              options: [
                { label: 'SEO', value: 'SEO' },
                { label: 'Content', value: 'Content' },
                { label: 'Link Building', value: 'Link Building' },
                { label: 'Google Ads', value: 'Google Ads' },
                { label: 'Social Media', value: 'Social Media' },
                { label: 'Allgemein', value: 'Allgemein' },
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              maxLength: 200,
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'author',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'body',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlockquoteFeature(),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  LinkFeature({}),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          { name: 'alt', type: 'text' },
                          { name: 'caption', type: 'text' },
                        ],
                      },
                    },
                  }),
                ],
              }),
            },
          ],
        },
      ],
    },
  ],
}
