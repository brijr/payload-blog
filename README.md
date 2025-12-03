# Payload Blog

A minimal blog starter built with Next.js 15 and Payload CMS.

## Features

- **Blog**
  - Posts collection with rich text content
  - Dynamic routes (`/posts`, `/posts/[slug]`)
  - Draft versioning with autosave
  - Automatic sitemap generation
  - SEO-friendly with robots.txt

- **Live Preview & Preview Links**
  - Real-time preview in admin panel as you edit
  - Responsive breakpoints (mobile, tablet, desktop)
  - Preview links to open drafts in new tab
  - Draft mode with secure token authentication

- **Tech Stack**
  - Next.js 15+ with App Router
  - Payload CMS 3+ for content management
  - TypeScript 5+
  - PostgreSQL database
  - Tailwind CSS 4+
  - shadcn/ui components
  - Dark/light mode
  - Vercel Blob Storage

## Getting Started

### Prerequisites

- Node.js and pnpm
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brijr/payload-blog.git
   cd payload-blog
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Visit `http://localhost:3000/admin` to create your first post.

## Environment Variables

```bash
# Database
DATABASE_URI=postgres://user:password@localhost:5432/dbname

# Payload
PAYLOAD_SECRET=your-secret-key-here

# Site URL (for sitemap)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxx

# Email (optional)
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
```

## Project Structure

```
/src
  /app
    /(frontend)/(site)
      /posts              # Posts listing
      /posts/[slug]       # Individual post
    /(payload)            # Payload CMS admin
  /collections
    Posts.ts              # Posts collection
    Users.ts              # Admin users
    Media.ts              # Media uploads
  /components
    /ds.tsx               # Design system (Prose, Section, Container)
    /ui                   # shadcn/ui components
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/posts` | Posts listing |
| `/posts/[slug]` | Individual post |
| `/admin` | Payload CMS admin |
| `/api/preview` | Enable draft mode (used by preview links) |
| `/api/exit-preview` | Disable draft mode |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Robots file |

## License

MIT

---

Created by [brijr](https://github.com/brijr)
