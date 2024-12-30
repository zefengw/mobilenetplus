'use client'

import { useState, useEffect } from 'react'

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = `${scrollPx / winHeightPx * 100}%`
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-[68px] left-0 right-0 h-1 bg-gray-200 z-50">
      <div 
        className="h-1 bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: scrollProgress }}
      ></div>
    </div>
  )
}

export default ScrollProgressBar

