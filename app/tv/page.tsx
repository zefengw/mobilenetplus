'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/Breadcrumb'
import { useRouter } from 'next/navigation'
import { useTranslation } from '../../components/TranslationContext'

interface TVPlan {
  id: number
  name: string
  price: number
  location: string
  channels: string
  details: string
  isDeal?: boolean // Added isDeal property
}

const TVPlans = () => {
  const [plans, setPlans] = useState<TVPlan[]>([])
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const dummyPlans: TVPlan[] = [
      { id: 1, name: 'Basic TV', price: 40, location: 'Nationwide', channels: '60+ Channels', details: 'Essential entertainment channels', isDeal: false },
      { id: 2, name: 'Standard TV', price: 60, location: 'Nationwide', channels: '120+ Channels', details: 'Sports and movie channels included', isDeal: true },
      { id: 3, name: 'Premium TV', price: 80, location: 'Nationwide', channels: '200+ Channels', details: 'All channels plus premium content', isDeal: false },
    ]
    setPlans(dummyPlans.sort((a, b) => a.price - b.price))
  }, [])

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'TV Plans', href: '/tv' }]} />
        <h1 className="text-3xl font-bold mb-8">TV Plans</h1>
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
              <p className="mb-2">Channels: {plan.channels}</p>
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

export default TVPlans

