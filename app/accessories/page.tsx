'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/Breadcrumb'
import { categories, accessories, brands, type AccessoryItem } from '../data/accessories'
import { TypeIcon as type, LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const router = useRouter()

  const filteredAccessories = accessories.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand) return false
    return true
  })

  const getIcon = (iconName: string): LucideIcon => {
    return Icons[iconName as keyof typeof Icons] as LucideIcon || Icons.Smartphone
  }

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'Accessories', href: '/accessories' }]} />
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === 'all' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(category => {
                  const Icon = getIcon(category.icon)
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                        selectedCategory === category.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Brands */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {brands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`p-4 rounded-lg border transition-colors ${
                    selectedBrand === brand.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-20 object-contain mb-2"
                  />
                  <p className="text-sm text-center font-medium">{brand.name}</p>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAccessories.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-bold text-primary">${item.price}</span>
                      <button 
                        onClick={() => router.push('/contact')}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

