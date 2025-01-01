'use client'

import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading 3D Scene...</p>
    </div>
  )
})

export default function Scene() {
  return (
    <div className="w-full h-full">
      {typeof window !== 'undefined' && <ThreeScene />}
    </div>
  )
} 