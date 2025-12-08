import { Container, Section } from '@/components/ds'
import { PostList } from '@/components/posts/post-list'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Home() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
  })

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-medium tracking-tight mb-8">Latest Posts</h1>
        <PostList posts={posts.docs} />
      </Container>
    </Section>
  )
}
