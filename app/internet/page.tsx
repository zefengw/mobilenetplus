'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/config/firebase-client'
import { collection, query, where, getDocs, orderBy, Firestore } from 'firebase/firestore'
import { Product } from '@/app/types/product'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { useRouter } from 'next/navigation'

export default function InternetPage() {
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchProducts() {
      if (!db) {
        console.error('Firestore is not initialized')
        return
      }

      try {
        const productsRef = collection(db as Firestore, 'products', 'internet', 'items')
        const q = query(
          productsRef,
          where('active', '==', true),
          orderBy('price', 'asc')
        )
        const querySnapshot = await getDocs(q)
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[]
        setProducts(fetchedProducts)
      } catch (error) {
        if (error instanceof Error && error.message.includes('requires an index')) {
          console.error('Please create the following index in Firebase Console:', error.message)
        } else {
          console.error('Error fetching products:', error)
        }
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-64px)]">
        <Breadcrumb items={[{ label: 'Internet Plans', href: '/internet' }]} />
        <h1 className="text-3xl font-bold mb-8">Internet Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-6 shadow-md relative flex flex-col h-full">
              {product.isDeal && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Deal
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}/month</p>
                <p className="mb-2">Location: {product.location}</p>
                <p className="mb-2">Features: {product.features.join(', ')}</p>
                <p className="mb-4">{product.description}</p>
              </div>
              <button 
                onClick={() => router.push('/contact')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-auto"
              >
                Contact Us
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

