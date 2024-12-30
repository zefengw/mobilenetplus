'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/config/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

interface Stats {
  users: number
  products: {
    mobile: number
    internet: number
    tv: number
    security: number
    accessories: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    products: {
      mobile: 0,
      internet: 0,
      tv: 0,
      security: 0,
      accessories: 0
    }
  })

  useEffect(() => {
    // Subscribe to users collection
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setStats(prev => ({ ...prev, users: snapshot.size }))
    })

    // Subscribe to each product category
    const categories = ['mobile', 'internet', 'tv', 'security', 'accessories']
    const unsubProducts = categories.map(category => 
      onSnapshot(collection(db, 'products', category, 'items'), (snapshot) => {
        setStats(prev => ({
          ...prev,
          products: {
            ...prev.products,
            [category]: snapshot.size
          }
        }))
      })
    )

    return () => {
      unsubUsers()
      unsubProducts.forEach(unsub => unsub())
    }
  }, [])

  const statCards = [
    { label: 'Total Users', value: stats.users },
    { label: 'Mobile Plans', value: stats.products.mobile },
    { label: 'Internet Plans', value: stats.products.internet },
    { label: 'TV Plans', value: stats.products.tv },
    { label: 'Security Plans', value: stats.products.security },
    { label: 'Accessories', value: stats.products.accessories },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-gray-500 text-sm font-medium">{stat.label}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 