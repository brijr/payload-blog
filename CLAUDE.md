# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal blog starter built with Next.js 15 and Payload CMS. This is a simple blog with posts, not a full SaaS application.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **CMS**: Payload CMS 3.65
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Storage**: Vercel Blob Storage
- **Package Manager**: pnpm

## Development Commands

```bash
pnpm dev              # Start development server
pnpm devsafe          # Clear .next cache and start dev server
pnpm build            # Build for production
pnpm lint             # Run linter
pnpm generate:types   # Generate Payload TypeScript types (run after modifying collections)
pnpm generate:importmap  # Generate Payload import map
```

## Architecture

### Route Structure
```
/(frontend)/(site)/*    Public routes (/, /posts, /posts/[slug])
/(payload)/admin/*      Payload CMS admin panel
```

### Collections
- `Posts` - Blog posts with title, slug, publishedAt, excerpt, content (rich text)
- `Users` - Admin users for Payload CMS
- `Media` - File uploads with Vercel Blob storage

### Key Directories
- `/src/collections/` - Payload collection definitions
- `/src/components/ds.tsx` - Design system: Section, Container, Nav, Main, Prose
- `/src/components/posts/` - Blog post components (PostCard, PostList)
- `/src/components/ui/` - shadcn/ui components
- `/src/payload.config.ts` - Payload configuration with plugins (SEO, Vercel Blob)

## Data Fetching Pattern

Posts are fetched server-side using Payload's local API:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const posts = await payload.find({
  collection: 'posts',
  sort: '-publishedAt',
})
```

## Environment Variables

```bash
DATABASE_URI=postgres://...       # PostgreSQL connection string
PAYLOAD_SECRET=...                # Payload secret key
NEXT_PUBLIC_SITE_URL=...          # Site URL for SEO/sitemap
BLOB_READ_WRITE_TOKEN=...         # Vercel Blob storage token
RESEND_API_KEY=...                # Optional: for email
EMAIL_FROM=...                    # Optional: sender address
```

## Adding a New Collection

1. Create file in `/src/collections/YourCollection.ts`
2. Add to `collections` array in `/src/payload.config.ts`
3. Run `pnpm generate:types`

## Design System Components

From `/src/components/ds.tsx`:
- `Section` - Wrapper with vertical padding
- `Container` - Centered max-width container
- `Prose` - Rich text styling (use `isArticle` for blog posts, `isSpaced` for heading spacing)
- `Nav`, `Main`, `Layout` - Page structure components

## Rich Text Rendering

Use Payload's Lexical RichText component:
```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'

<Prose isArticle isSpaced>
  <RichText data={post.content} />
</Prose>
```
