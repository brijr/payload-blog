import type { CollectionConfig } from 'payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const Posts: CollectionConfig = {
  slug: 'posts',
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc, { token }) => {
      if (doc?.slug) {
        return `${siteUrl}/api/preview?slug=${doc.slug}&collection=posts&token=${token}`
      }
      return null
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'A short summary for SEO and previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
