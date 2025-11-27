import { Container, Section, Prose } from '@/components/ds'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

type Params = Promise<{ slug: string }>

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  return (
    <Section>
      <Container>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>
        <Prose isArticle isSpaced>
          <h1>{post.title}</h1>
          {post.publishedAt && (
            <p className="text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <RichText data={post.content} />
        </Prose>
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
