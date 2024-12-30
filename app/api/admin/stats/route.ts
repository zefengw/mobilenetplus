import { NextResponse } from 'next/server'
import { adminDb } from '@/app/config/firebase-admin'

type Product = {
  id: string
  active: boolean
  isDeal: boolean
  [key: string]: any
}

export async function GET() {
  try {
    const categories = ['mobile', 'internet', 'tv', 'security', 'accessories'] as const
    let total = 0
    let active = 0
    let deals = 0
    const categoryStats: Record<string, number> = {
      mobile: 0,
      internet: 0,
      tv: 0,
      security: 0,
      accessories: 0
    }

    for (const category of categories) {
      const snapshot = await adminDb.collection('products').doc(category).collection('items').get()
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[]
      
      categoryStats[category] = products.length
      total += products.length
      active += products.filter(p => p.active).length
      deals += products.filter(p => p.isDeal).length
    }

    return NextResponse.json({
      totalProducts: total,
      activeProducts: active,
      deals,
      categories: categoryStats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 