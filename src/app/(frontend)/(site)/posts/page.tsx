import { Container, Section } from '@/components/ds'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
  })

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-medium tracking-tight mb-8">Posts</h1>
        {posts.docs.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts.docs.map((post) => (
              <li key={post.id}>
                <Link href={`/posts/${post.slug}`} className="group block">
                  <h2 className="text-xl font-medium group-hover:underline">{post.title}</h2>
                  {post.publishedAt && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
