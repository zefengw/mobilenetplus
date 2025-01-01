'use client'
import Image from 'next/image'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-32 h-32 flex items-center justify-center">
            <Image
                src="/img/logo.png"
                alt="MobileNet Plus"
                width={180}
                height={60}
                className="object-contain"
              />
      </div>
    </div>
  )
}

