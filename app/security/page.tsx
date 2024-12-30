'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { useRouter } from 'next/navigation'
import { useTranslation } from '../contexts/TranslationContext'

interface SecurityPlan {
  id: number
  name: string
  price: number
  location: string
  features: string
  details: string
  isDeal?: boolean // Added isDeal property
}

const SecurityPlans = () => {
  const [plans, setPlans] = useState<SecurityPlan[]>([])
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const dummyPlans: SecurityPlan[] = [
      { id: 1, name: 'Basic Security', price: 25, location: 'Urban Areas', features: 'Essential Protection', details: '24/7 monitoring and mobile app access', isDeal: false },
      { id: 2, name: 'Advanced Security', price: 45, location: 'Urban Areas', features: 'Smart Protection', details: 'Includes cameras and smart sensors', isDeal: true },
      { id: 3, name: 'Premium Security', price: 65, location: 'Urban Areas', features: 'Complete Protection', details: 'Full home automation and security', isDeal: false },
    ]
    setPlans(dummyPlans.sort((a, b) => a.price - b.price))
  }, [])

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'Home Security Plans', href: '/security' }]} />
        <h1 className="text-3xl font-bold mb-8">Home Security Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-6 shadow-md relative">
              {plan.isDeal && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Deal
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-2xl font-bold text-blue-600 mb-4">${plan.price}/month</p>
              <p className="mb-2">Location: {plan.location}</p>
              <p className="mb-2">Features: {plan.features}</p>
              <p className="mb-4">{plan.details}</p>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => router.push('/contact')}
              >
                {t('plans.contact')}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SecurityPlans

