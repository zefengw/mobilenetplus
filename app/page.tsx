import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen'
import { Check, Wifi, Tv, Shield, Phone } from 'lucide-react'
import Link from 'next/link'
import FeaturedOffers from '../components/FeaturedOffers'
import LimitedTimeOffers from '../components/LimitedTimeOffers'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen />
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose MobileNet Plus?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
                <p className="text-gray-600">24/7 customer support and guaranteed uptime for all services.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">Best-in-class services at unbeatable prices with flexible plans.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Latest Technology</h3>
                <p className="text-gray-600">Stay connected with cutting-edge technology and equipment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/internet" className="group hover:bg-blue-600 bg-white p-6 rounded-xl shadow-md transition-all duration-300">
                <Wifi className="w-12 h-12 text-blue-600 group-hover:text-white mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Internet</h3>
                <p className="text-gray-600 group-hover:text-white/90">High-speed fiber internet with unlimited data.</p>
              </Link>
              <Link href="/mobile" className="group hover:bg-blue-600 bg-white p-6 rounded-xl shadow-md transition-all duration-300">
                <Phone className="w-12 h-12 text-blue-600 group-hover:text-white mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Mobile</h3>
                <p className="text-gray-600 group-hover:text-white/90">Nationwide coverage with flexible data plans.</p>
              </Link>
              <Link href="/tv" className="group hover:bg-blue-600 bg-white p-6 rounded-xl shadow-md transition-all duration-300">
                <Tv className="w-12 h-12 text-blue-600 group-hover:text-white mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">TV</h3>
                <p className="text-gray-600 group-hover:text-white/90">Premium channels and on-demand content.</p>
              </Link>
              <Link href="/security" className="group hover:bg-blue-600 bg-white p-6 rounded-xl shadow-md transition-all duration-300">
                <Shield className="w-12 h-12 text-blue-600 group-hover:text-white mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Security</h3>
                <p className="text-gray-600 group-hover:text-white/90">Smart home security and monitoring.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Accessories Section */}
        <FeaturedOffers />

        {/* Limited Time Offers Section */}
        <LimitedTimeOffers />

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Connected Life?</h2>
              <p className="text-xl mb-8 opacity-90">
                Contact us today to learn more about our services and find the perfect solution for your needs.
              </p>
              <Link 
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

