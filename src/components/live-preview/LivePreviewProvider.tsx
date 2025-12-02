'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type LivePreviewContextType<T> = {
  data: T
  isLoading: boolean
}

const LivePreviewContext = createContext<LivePreviewContextType<unknown> | null>(null)

export function useLivePreviewData<T>() {
  const context = useContext(LivePreviewContext)
  if (!context) {
    throw new Error('useLivePreviewData must be used within LivePreviewProvider')
  }
  return context as LivePreviewContextType<T>
}

type LivePreviewProviderProps<T> = {
  initialData: T
  children: ReactNode
  serverURL: string
}

export function LivePreviewProvider<T extends object>({
  initialData,
  children,
  serverURL,
}: LivePreviewProviderProps<T>) {
  const { data, isLoading } = useLivePreview<T>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <LivePreviewContext.Provider value={{ data, isLoading }}>
      {children}
    </LivePreviewContext.Provider>
  )
}
