import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const returnUrl = searchParams.get('return') || '/'

  const draft = await draftMode()
  draft.disable()

  redirect(returnUrl)
}
