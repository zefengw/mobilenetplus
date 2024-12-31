'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/app/config/firebase-client'
import { collection, query, where, getDocs, orderBy, Firestore } from 'firebase/firestore'
import { AccessoryProduct } from '@/app/types/product'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Package } from 'lucide-react'

const categories = [
  { id: 'all-brand', name: 'All Brand' },
  { id: 'phones', name: 'Phones' },
  { id: 'tablets', name: 'Tablets' },
  { id: 'laptops', name: 'Laptops' },
  { id: 'wireless', name: 'Wireless' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'miscellaneous', name: 'Miscellaneous' }
]

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all-brand')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [accessories, setAccessories] = useState<AccessoryProduct[]>([])
  const [availableBrands, setAvailableBrands] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchAccessories() {
      if (!db) {
        console.error('Firestore is not initialized')
        return
      }

      setLoading(true)
      setError(null)
      try {
        const accessoriesRef = collection(db as Firestore, 'products', 'accessories', 'items')
        const q = query(
          accessoriesRef,
          where('active', '==', true),
          orderBy('price', 'asc')
        )
        const querySnapshot = await getDocs(q)
        
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            category: 'accessories',
            imageUrl: data.imageUrl || '',
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          } as AccessoryProduct
        })
        
        setAccessories(items)
        
        // Extract unique brands from active products
        const brands = new Set(items.filter(item => item.brand).map(item => item.brand))
        setAvailableBrands(brands)
      } catch (error) {
        if (error instanceof Error && error.message.includes('requires an index')) {
          console.error('Please create the following index in Firebase Console:', error.message)
        } else {
          console.error('Error fetching accessories:', error)
          setError('Failed to load accessories. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAccessories()
  }, [])

  const filteredAccessories = accessories.filter(item => {
    if (selectedCategory !== 'all-brand' && item.subcategory !== selectedCategory) return false
    if (selectedBrand !== 'all' && item.brand?.toLowerCase() !== selectedBrand) return false
    return true
  })

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[calc(100vh+400px)] flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading accessories...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh+400px)] flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'Accessories', href: '/accessories' }]} />
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => {
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        if (category.id !== 'all-brand') {
                          setSelectedBrand('all')
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                        selectedCategory === category.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Brands - Only show when All Brand category is selected */}
            {selectedCategory === 'all-brand' && availableBrands.size > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {Array.from(availableBrands).map(brand => (
                  <button
                    key={brand}
                    onClick={() => {
                      if (selectedBrand === brand.toLowerCase()) {
                        setSelectedBrand('all')
                      } else {
                        setSelectedBrand(brand.toLowerCase())
                      }
                    }}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedBrand === brand.toLowerCase()
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <p className="text-sm text-center font-medium">{brand}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAccessories.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="relative w-full h-48">
                    {item.imageUrl && item.imageUrl.startsWith('data:image') ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                              <svg class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                              </svg>
                            </div>
                          `
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-lg font-bold text-primary">${item.price}</span>
                      <button 
                        onClick={() => router.push('/contact')}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

