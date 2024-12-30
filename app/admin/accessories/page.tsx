'use client'

import { useEffect, useState } from 'react'
import { ProductTable } from '@/app/components/ProductTable'
import { Product, ProductFormData } from '@/app/types/product'
import { db, storage } from '@/app/config/firebase'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export default function AccessoriesProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products', 'accessories', 'items'), 
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

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `accessories/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  const handleAdd = async (data: ProductFormData) => {
    let imageUrl = ''
    if (data.imageFile) {
      imageUrl = await uploadImage(data.imageFile)
    }

    await addDoc(collection(db, 'products', 'accessories', 'items'), {
      ...data,
      imageUrl,
      category: 'accessories',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const handleUpdate = async (id: string, data: ProductFormData) => {
    const product = products.find(p => p.id === id)
    let imageUrl = product?.imageUrl || ''

    if (data.imageFile) {
      // Delete old image if exists
      if (imageUrl) {
        try {
          const oldImageRef = ref(storage, imageUrl)
          await deleteObject(oldImageRef)
        } catch (error) {
          console.error('Error deleting old image:', error)
        }
      }
      // Upload new image
      imageUrl = await uploadImage(data.imageFile)
    }

    await updateDoc(doc(db, 'products', 'accessories', 'items', id), {
      ...data,
      imageUrl,
      updatedAt: serverTimestamp(),
    })
  }

  const handleDelete = async (id: string) => {
    const product = products.find(p => p.id === id)
    if (product?.imageUrl) {
      try {
        const imageRef = ref(storage, product.imageUrl)
        await deleteObject(imageRef)
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
    await deleteDoc(doc(db, 'products', 'accessories', 'items', id))
  }

  return (
    <ProductTable
      products={products}
      category="accessories"
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      enableImageUpload
    />
  )
} 