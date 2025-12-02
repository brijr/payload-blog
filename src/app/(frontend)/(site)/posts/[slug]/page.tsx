import { Container, Section } from '@/components/ds'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import type { Media, Post } from '@/payload-types'
import { LivePreviewProvider } from '@/components/live-preview/LivePreviewProvider'
import { PostContent } from '@/components/posts/PostContent'

type Params = Promise<{ slug: string }>

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: isDraftMode,
  })

  const post = posts.docs[0]

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const ogImage = post.meta?.image as Media | undefined

  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || undefined,
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      ...(ogImage?.url && { images: [{ url: ogImage.url }] }),
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: isDraftMode,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  return (
    <Section>
      <Container>
        <Link
          href="/posts"
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          &larr; Back to posts
        </Link>

        {isDraftMode && (
          <div className="mb-6 p-4 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg flex items-center justify-between">
            <span className="text-amber-800 dark:text-amber-200 font-medium">
              Preview Mode - Viewing draft content
            </span>
            <Link
              href={`/api/exit-preview?return=/posts/${slug}`}
              className="text-sm text-amber-700 dark:text-amber-300 underline hover:no-underline"
            >
              Exit Preview
            </Link>
          </div>
        )}

        <LivePreviewProvider<Post> initialData={post} serverURL={serverURL}>
          <PostContent />
        </LivePreviewProvider>
      </Container>
    </Section>
  )
}

export async function generateStaticParams() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
    return []
  }

  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}
