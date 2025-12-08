# Payload Blog

A minimal, production-ready blog starter built with Next.js 16, Payload CMS 3, and Tailwind CSS 4. Get a beautiful, fast blog up and running in minutes.

## Features

**Content Management**
- Rich text editor with Lexical
- Draft versioning with autosave
- Live preview as you edit
- SEO fields on every post

**Modern Stack**
- Next.js 16 App Router
- Payload CMS 3.65
- PostgreSQL + Vercel Blob Storage
- Tailwind CSS 4 + shadcn/ui
- Dark/light mode

**Production Ready**
- Automatic sitemap generation
- SEO-optimized meta tags
- Responsive design
- Type-safe with TypeScript

## Quick Start

```bash
# Clone and install
git clone https://github.com/brijr/payload-blog.git
cd payload-blog
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URI and PAYLOAD_SECRET

# Start developing
pnpm dev
```

Open [localhost:3000/admin](http://localhost:3000/admin) to create your first post.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Secret key for Payload CMS |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL (for sitemap/SEO) |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage token |
| `RESEND_API_KEY` | No | For email notifications |
| `EMAIL_FROM` | No | Sender email address |

## Project Structure

```
src/
├── app/
│   ├── (frontend)/(site)/     # Public routes
│   │   ├── page.tsx           # Homepage
│   │   └── posts/             # Blog posts
│   └── (payload)/             # Admin panel
├── collections/
│   ├── Posts.ts               # Blog posts
│   ├── Media.ts               # File uploads
│   └── Users.ts               # Admin users
└── components/
    ├── ds.tsx                 # Design system
    ├── posts/                 # Post components
    └── ui/                    # shadcn/ui
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm generate:types` | Regenerate Payload types |
| `pnpm lint` | Run ESLint |
| `pnpm devsafe` | Clear cache and start dev |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/posts` | All posts |
| `/posts/[slug]` | Single post |
| `/admin` | CMS admin panel |
| `/sitemap.xml` | Auto-generated sitemap |

## Extending

**Add a new collection:**
1. Create `/src/collections/YourCollection.ts`
2. Add to `collections` array in `/src/payload.config.ts`
3. Run `pnpm generate:types`

**Add a new page:**
1. Create `/src/app/(frontend)/(site)/your-page/page.tsx`
2. Use the design system components from `/src/components/ds.tsx`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brijr/payload-blog)

Or deploy manually:
1. Set up a PostgreSQL database (Neon, Supabase, etc.)
2. Configure environment variables
3. Deploy to Vercel, Railway, or any Node.js host

## License

MIT

---

Built by [brijr](https://github.com/brijr)
