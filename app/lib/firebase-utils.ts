import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/app/config/firebase-client'
import { Product } from '@/app/types/product'

export async function getProducts(category: string): Promise<Product[]> {
  if (!db) throw new Error('Firebase is not initialized')
  const productsRef = collection(db, 'products', category, 'items')
  const snapshot = await getDocs(productsRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
}

export async function getActiveProducts(category: string): Promise<Product[]> {
  if (!db) throw new Error('Firebase is not initialized')
  const productsRef = collection(db, 'products', category, 'items')
  const q = query(productsRef, where('active', '==', true))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
}

export async function getDealProducts(): Promise<Product[]> {
  if (!db) throw new Error('Firebase is not initialized')
  const categories = ['mobile', 'internet', 'tv', 'security', 'accessories']
  const deals: Product[] = []
  
  for (const category of categories) {
    const productsRef = collection(db, 'products', category, 'items')
    const q = query(productsRef, where('isDeal', '==', true))
    const snapshot = await getDocs(q)
    deals.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)))
  }
  
  return deals
} 