'use client'

import { ReactNode } from 'react'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  if (typeof window === 'undefined') return null
  return <>{children}</>
} 