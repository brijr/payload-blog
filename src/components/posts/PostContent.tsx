'use client'

import { useLivePreviewData } from '@/components/live-preview/LivePreviewProvider'
import { Prose } from '@/components/ds'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Post } from '@/payload-types'

export function PostContent() {
  const { data: post, isLoading } = useLivePreviewData<Post>()

  return (
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
      {post.content && <RichText data={post.content} />}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
          Updating...
        </div>
      )}
    </Prose>
  )
}
