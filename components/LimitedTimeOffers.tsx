'use client'

import { useRouter } from 'next/navigation'
import { mobilePlans, internetPlans, tvPlans, securityPlans } from '../data/plans'

export default function LimitedTimeOffers() {
  const router = useRouter()

  // Get all plans with deals
  const deals = [
    ...mobilePlans.filter(plan => plan.isDeal),
    ...internetPlans.filter(plan => plan.isDeal),
    ...tvPlans.filter(plan => plan.isDeal),
    ...securityPlans.filter(plan => plan.isDeal)
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Limited Time Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((plan) => (
            <div key={plan.id} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                Special Deal
              </span>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-xl font-bold mb-2">${plan.price}/month</p>
              <p className="mb-4 opacity-90">{plan.details}</p>
              <button 
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
                onClick={() => router.push('/contact')}
              >
                Contact Us
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

