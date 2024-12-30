'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { scrollToTop } from '../utils/scroll-to-top'
import { useTranslation } from '../contexts/TranslationContext'

const SpinTheWheel = () => {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState('')
  const wheelRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const sections = [
    { color: '#2563EB', prize: 'Free Month', image: '/placeholder.svg?height=50&width=50' },
    { color: '#DC2626', prize: '50% Off', image: '/placeholder.svg?height=50&width=50' },
    { color: '#059669', prize: '$100 Credit', image: '/placeholder.svg?height=50&width=50' },
    { color: '#D97706', prize: 'Free Device', image: '/placeholder.svg?height=50&width=50' },
    { color: '#2563EB', prize: 'Extra Data', image: '/placeholder.svg?height=50&width=50' },
    { color: '#32A897', prize: 'Mystery Prize', image: '/placeholder.svg?height=50&width=50' }
  ]

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    if (!wheelRef.current) return

    // Clear existing content
    wheelRef.current.innerHTML = ''

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.style.width = '100%'
    svg.style.height = '100%'

    const centerX = 50
    const centerY = 50
    const radius = 45

    sections.forEach((section, index) => {
      const startAngle = (index * 60) - 90 // Start at top (-90 degrees)
      const endAngle = ((index + 1) * 60) - 90

      // Create section path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180
      
      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)
      
      const largeArcFlag = 0
      const sweepFlag = 1
      
      const d = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`,
        'Z'
      ].join(' ')
      
      path.setAttribute('d', d)
      path.setAttribute('fill', section.color)
      svg.appendChild(path)

      // Add image
      const imageAngle = startAngle + 30
      const imageRad = (imageAngle * Math.PI) / 180
      const imageX = centerX + (radius * 0.6) * Math.cos(imageRad)
      const imageY = centerY + (radius * 0.6) * Math.sin(imageRad)

      const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      image.setAttribute('x', `${imageX - 4}`)
      image.setAttribute('y', `${imageY - 4}`)
      image.setAttribute('width', '8')
      image.setAttribute('height', '8')
      image.setAttribute('href', section.image)
      image.setAttribute('transform', `rotate(${startAngle + 30} ${imageX} ${imageY})`)
      svg.appendChild(image)
    })

    // Add center circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', '50')
    circle.setAttribute('cy', '50')
    circle.setAttribute('r', '8')
    circle.setAttribute('fill', 'white')
    circle.setAttribute('stroke', 'black')
    circle.setAttribute('stroke-width', '0.5')
    svg.appendChild(circle)

    wheelRef.current.appendChild(svg)
  }, [])

  const handleSpin = () => {
    if (spinning) return

    setSpinning(true)
    const newRotation = rotation + 3600 + Math.random() * 360
    setRotation(newRotation)

    setTimeout(() => {
      const normalizedRotation = newRotation % 360
      const sectionIndex = Math.floor((360 - normalizedRotation) / (360 / sections.length))
      setResult(sections[sectionIndex].prize)
      setSpinning(false)
    }, 10000)
  }

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: t('nav.spinWin'), href: '/spin-the-wheel' }]} />
        <h1 className="text-3xl font-bold mb-8 text-center">{t('nav.spinWin')}</h1>
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
            <div 
              ref={wheelRef}
              className="absolute inset-0 rounded-full overflow-hidden shadow-xl border-5 border-black"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 10s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              }}
            />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-black"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
            />
          </div>
          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg"
            onClick={handleSpin}
            disabled={spinning}
          >
            {spinning ? t('spinning') : t('spinForPrice')}
          </button>
          {result && (
            <div className="text-2xl font-bold text-center bg-white p-4 rounded-lg shadow-lg">
              {t('youWon')}: {result}! 🎉
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SpinTheWheel

