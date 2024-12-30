'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/config/firebase-client'
import { collection, query, where, getDocs, orderBy, Firestore } from 'firebase/firestore'
import { InternetProduct } from '@/app/types/product'
import { Card, CardContent } from '@/components/ui/card'

export default function InternetPage() {
  const [products, setProducts] = useState<InternetProduct[]>([])

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
        })) as InternetProduct[]
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Internet Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col h-full">
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {product.speed && (
                  <p className="text-blue-600 font-semibold mb-4">
                    Speed: {product.speed}
                  </p>
                )}
              </div>
              <div>
                <div className="text-3xl font-bold mb-4">${product.price}/mo</div>
                {product.isDeal && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Special Deal
                  </span>
                )}
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Choose Plan
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

