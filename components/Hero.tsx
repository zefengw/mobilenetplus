'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

// Import Scene with no SSR
const Scene = dynamic(() => import('./3D/Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 rounded-2xl animate-pulse" />
})

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      <div className="container mx-auto px-4 h-screen flex items-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              One Provider, Endless Possibilities
            </h1>
            <p className="text-xl opacity-90">
              Experience seamless connectivity with our comprehensive suite of services - 
              from lightning-fast internet to smart home security solutions.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 flex items-center space-x-2 group">
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="hidden lg:block h-[600px] relative">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

