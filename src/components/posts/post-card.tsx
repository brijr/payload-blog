import Link from 'next/link'
import type { Post } from '@/payload-types'

export function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`} className="group block">
        <h2 className="text-lg font-medium group-hover:underline">{post.title}</h2>
        {post.excerpt && (
          <p className="text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
        )}
        {post.publishedAt && (
          <time className="text-sm text-muted-foreground/60 mt-2 block">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </Link>
    </article>
  )
}
