import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')
  const token = searchParams.get('token')

  if (!slug || !collection) {
    return new Response('Missing required parameters', { status: 400 })
  }

  if (!token) {
    return new Response('Token required', { status: 401 })
  }

  // Verify the token by checking if user is authenticated
  const payload = await getPayload({ config })

  try {
    const { user } = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    })

    if (!user) {
      return new Response('Invalid token', { status: 401 })
    }
  } catch {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the post page
  if (collection === 'posts') {
    redirect(`/posts/${slug}`)
  }

  return new Response('Unknown collection', { status: 400 })
}
