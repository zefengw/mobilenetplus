'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { scrollToTop } from '../utils/scroll-to-top'
import { useTranslation } from '../contexts/TranslationContext'
import type { MobilePlan } from '../types/plans'

const MobilePlans = () => {
  const [plans, setPlans] = useState<MobilePlan[]>([])
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    scrollToTop()
    // In a real application, you would fetch this data from an API
    const dummyPlans: MobilePlan[] = [
      { 
        id: 1, 
        name: 'Basic Plan', 
        price: 20, 
        location: 'Nationwide', 
        data: '2GB', 
        details: 'Unlimited calls and texts',
        isDeal: true
      },
      { 
        id: 2, 
        name: 'Standard Plan', 
        price: 30, 
        location: 'Nationwide', 
        data: '5GB', 
        details: 'Unlimited calls and texts',
        isDeal: true
      },
      { 
        id: 3, 
        name: 'Premium Plan', 
        price: 40, 
        location: 'Nationwide', 
        data: '10GB', 
        details: 'Unlimited calls and texts',
        isDeal: false
      },
    ]
    setPlans(dummyPlans.sort((a, b) => a.price - b.price))
  }, [])

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'Mobile Plans', href: '/mobile' }]} />
        <h1 className="text-3xl font-bold mb-8">Mobile Phone Plans</h1>
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
              <p className="mb-2">Data: {plan.data}</p>
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

export default MobilePlans

