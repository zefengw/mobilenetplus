'use client'

import { useEffect, useState } from 'react'
import { ProductTable } from '@/app/components/ProductTable'
import { Product, ProductFormData } from '@/app/types/product'
import { db } from '@/app/config/firebase-client'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore'

export default function SecurityProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products', 'security', 'items'), 
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
    // Remove undefined fields and imageUrl if it's not set
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Remove imageUrl if it's null or undefined
    if ('imageUrl' in cleanData && !cleanData.imageUrl) {
      delete cleanData.imageUrl;
    }

    await addDoc(collection(db, 'products', 'security', 'items'), {
      ...cleanData,
      category: 'security',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const handleUpdate = async (id: string, data: ProductFormData) => {
    // Clean the data before update
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Remove imageUrl if it's null or undefined
    if ('imageUrl' in cleanData && !cleanData.imageUrl) {
      delete cleanData.imageUrl;
    }

    await updateDoc(doc(db, 'products', 'security', 'items', id), {
      ...cleanData,
      updatedAt: serverTimestamp(),
    })
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', 'security', 'items', id))
  }

  return (
    <div className="p-6">
      <ProductTable
        products={products}
        category="security"
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
} 