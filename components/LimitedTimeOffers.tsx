'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '@/app/config/firebase-client'
import { collection, query, where, getDocs, Firestore } from 'firebase/firestore'

interface DealProduct {
  id: string
  name: string
  price: number
  description: string
  category: string
}

export default function LimitedTimeOffers() {
  const router = useRouter()
  const [deals, setDeals] = useState<DealProduct[]>([])

  useEffect(() => {
    async function fetchDeals() {
      if (!db) return

      try {
        const categories = ['mobile', 'internet', 'tv', 'security']
        const allDeals: DealProduct[] = []

        for (const category of categories) {
          const productsRef = collection(db as Firestore, 'products', category, 'items')
          const q = query(
            productsRef,
            where('active', '==', true),
            where('isDeal', '==', true)
          )
          const querySnapshot = await getDocs(q)
          const categoryDeals = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            category
          })) as DealProduct[]
          allDeals.push(...categoryDeals)
        }

        setDeals(allDeals)
      } catch (error) {
        console.error('Error fetching deals:', error)
      }
    }

    fetchDeals()
  }, [])

  // Function to truncate description to roughly 2 lines (about 100 characters)
  const truncateDescription = (text: string) => {
    if (text.length <= 100) return text
    return text.slice(0, 97) + '...'
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Limited Time Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl flex flex-col">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                Special Deal
              </span>
              <h3 className="text-2xl font-bold mb-2">{deal.name}</h3>
              <p className="text-xl font-bold mb-2">${deal.price}/month</p>
              <p className="mb-4 opacity-90 min-h-[3rem] flex-grow">{truncateDescription(deal.description)}</p>
              <button 
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 mt-auto"
                onClick={() => router.push('/contact')}
              >
                Contact Us
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}