/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        http: false,
        https: false,
        crypto: false,
        child_process: false,
      }
    }
    
    // Add rules for Three.js and GLB files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource'
    })
    config.module.rules.push({
      test: /react-three-fiber|three/,
      sideEffects: false
    })

    return config
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
}

module.exports = nextConfig 