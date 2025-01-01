'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Environment } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Phone = dynamic(() => import('./Phone'), {
  ssr: false
})

function Loader() {
  return (
    <Html center>
      <div className="text-gray-500">Loading 3D Model...</div>
    </Html>
  )
}

export default function ThreeScene() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 40 }}
        gl={{ antialias: true }}
      >
        {/* Environment light for overall illumination */}
        <Environment preset="studio" />
        
        {/* Bright ambient light */}
        <ambientLight intensity={2} />
        
        {/* Main front light */}
        <directionalLight 
          position={[0, 0, 5]} 
          intensity={3} 
          castShadow
        />
        
        {/* Top light */}
        <directionalLight 
          position={[0, 5, 0]} 
          intensity={2}
        />
        
        {/* Fill lights from sides */}
        <pointLight position={[-5, 0, 3]} intensity={1.5} />
        <pointLight position={[5, 0, 3]} intensity={1.5} />
        
        {/* Fill light from bottom */}
        <pointLight position={[0, -3, 2]} intensity={1} />

        <Suspense fallback={<Loader />}>
          <Phone />
        </Suspense>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
} 