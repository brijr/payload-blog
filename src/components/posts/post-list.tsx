import type { Post } from '@/payload-types'
import { PostCard } from './post-card'

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>
  }

  return (
    <div className="divide-y">
      {posts.map((post) => (
        <div key={post.id} className="py-6 first:pt-0 last:pb-0">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}
