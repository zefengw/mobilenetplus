'use client'

import { useState, useEffect } from 'react'
import { ProductTable } from '@/app/components/ProductTable'
import { ProductFormData, Product } from '@/app/types/product'
import { db } from '@/app/config/firebase-client'
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore'

export default function AccessoriesAdminPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products', 'accessories', 'items'),
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          category: 'accessories',
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Product[]
        setProducts(productsData)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleAdd = async (data: ProductFormData) => {
    try {
      const accessoriesRef = collection(db, 'products', 'accessories', 'items')
      const docRef = await addDoc(accessoriesRef, {
        ...data,
        category: 'accessories',
        imageUrl: data.imageUrl || '',  // Ensure imageUrl is saved
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: ProductFormData) => {
    try {
      const docRef = doc(db, 'products', 'accessories', 'items', id)
      await updateDoc(docRef, {
        ...data,
        imageUrl: data.imageUrl || '',  // Ensure imageUrl is saved
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating document: ', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, 'products', 'accessories', 'items', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting document: ', error)
      throw error
    }
  }

  return (
    <div className="p-6">
      <ProductTable
        products={products}
        category="accessories"
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
} 