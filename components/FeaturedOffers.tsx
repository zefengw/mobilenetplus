'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/app/config/firebase-client'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { AccessoryProduct } from '@/app/types/product'

export default function FeaturedOffers() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dealProducts, setDealProducts] = useState<AccessoryProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDealProducts() {
      try {
        const accessoriesRef = collection(db, 'products', 'accessories', 'items')
        const q = query(accessoriesRef, where('isDeal', '==', true), where('active', '==', true))
        const querySnapshot = await getDocs(q)
        
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          category: 'accessories',
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as AccessoryProduct[]

        setDealProducts(items)
      } catch (error) {
        console.error('Error fetching deal products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDealProducts()
  }, [])

  useEffect(() => {
    if (dealProducts.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % dealProducts.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [dealProducts.length])

  const nextSlide = () => {
    if (dealProducts.length === 0) return
    setCurrentSlide((prevSlide) => (prevSlide + 1) % dealProducts.length)
  }

  const prevSlide = () => {
    if (dealProducts.length === 0) return
    setCurrentSlide((prevSlide) => (prevSlide - 1 + dealProducts.length) % dealProducts.length)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Accessories</h2>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (dealProducts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Accessories</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {dealProducts.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Link href="/accessories" className="block">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
                      <div className="w-full h-48 relative">
                        {item.imageUrl && item.imageUrl.startsWith('data:image') ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">${item.price}</span>
                          <span className="text-blue-600 font-semibold hover:underline">View Details</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {dealProducts.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

