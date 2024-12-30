'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToTop } from '../utils/scroll-utils'
import Header from '../../components/Header'
import ScrollProgressBar from '../../components/ScrollProgressBar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  return (
    <>
      <Header />
      <ScrollProgressBar />
      {children}
    </>
  )
} 