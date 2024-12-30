'use client'

import { useEffect, useState } from 'react'
import { ProductTable } from '@/app/components/ProductTable'
import { Product, ProductFormData } from '@/app/types/product'
import { db } from '@/app/config/firebase'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore'

export default function TVProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products', 'tv', 'items'), 
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Product[]
        setProducts(productsData)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleAdd = async (data: ProductFormData) => {
    await addDoc(collection(db, 'products', 'tv', 'items'), {
      ...data,
      category: 'tv',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const handleUpdate = async (id: string, data: ProductFormData) => {
    await updateDoc(doc(db, 'products', 'tv', 'items', id), {
      ...data,
      updatedAt: serverTimestamp(),
    })
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', 'tv', 'items', id))
  }

  return (
    <ProductTable
      products={products}
      category="tv"
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  )
} 