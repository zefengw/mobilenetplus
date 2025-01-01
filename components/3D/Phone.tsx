'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'

export default function Phone() {
  const meshRef = useRef<Mesh>(null!)
  const { scene } = useGLTF('/models/phone.glb')

  // Adjust materials for better visibility
  scene.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
      child.material.metalness = 0.3
      child.material.roughness = 0.2
      child.material.envMapIntensity = 1.5
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  useFrame(() => {
    if (meshRef.current) {
      // Rotate slowly around the Y axis
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} scale={[0.01, 0.01, 0.01]} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </mesh>
  )
}

// Preload the model
useGLTF.preload('/models/phone.glb') 