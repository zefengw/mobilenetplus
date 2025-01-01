'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { MapPin, Phone, Mail } from 'lucide-react'
import Breadcrumb from '../../components/Breadcrumb'
import { scrollToTop } from '../utils/scroll-to-top'
import Image from 'next/image'

const locations = {
  'Location 1': {
    address: '224 Hunt Club Road, Ottawa, ON, Canada',
    phone: '+1 613-800-6130',
    email: 'mobilenetplus88@gmail.com',
    coordinates: { lat: 45.3466, lng: -75.6961 },
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.944440838357!2d-75.69830492326746!3d45.34660457107095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0718cc4a6ad7%3A0x117a2d3e5f36753f!2s224%20Hunt%20Club%20Rd%2C%20Ottawa%2C%20ON%20K1V%201C1!5e0!3m2!1sen!2sca!4v1704949358035!5m2!1sen!2sca'
  },
  'Location 2': {
    address: '300 Eagleson Road, Ottawa, ON, Canada',
    phone: '+1 XXX-XXX-XXXX',
    email: 'mobilenetplus88@gmail.com',
    coordinates: { lat: 45.3466, lng: -75.6961 },
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.944440838357!2d-75.84930492326746!3d45.29660457107095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd200889668e5ab%3A0xc9d7b898e7374638!2s300%20Eagleson%20Rd%2C%20Kanata%2C%20ON%20K2M%201C9!5e0!3m2!1sen!2sca!4v1704949358035!5m2!1sen!2sca'
  }
}

const ContactUs = () => {
  const [location, setLocation] = useState('Location 1')

  useEffect(() => {
    scrollToTop()
  }, [])

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
  }

  const currentLocation = locations[location as keyof typeof locations]

  return (
    <div className="min-h-[calc(100vh+400px)] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Breadcrumb items={[{ label: 'Contact Us', href: '/contact' }]} />
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="flex items-center"><MapPin className="mr-2" /> {currentLocation.address}</p>
                <p className="flex items-center"><Phone className="mr-2" /> {currentLocation.phone}</p>
                <p className="flex items-center"><Mail className="mr-2" /> {currentLocation.email}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Join Our Community</h2>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <img src="/img/qr_wechat.png" alt="WeChat QR Code" className="w-32 h-32 mb-2" />
                  <p>WeChat Group</p>
                </div>
                <div className="text-center">
                  <img src="/img/qr_fb.png" alt="Facebook QR Code" className="w-32 h-32 mb-2" />
                  <p>Facebook Group</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Our Locations</h2>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${location === 'Location 1' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handleLocationChange('Location 1')}
                >
                  Location 1
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${location === 'Location 2' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handleLocationChange('Location 2')}
                >
                  Location 2
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Map</h2>
              <iframe
                src={currentLocation.mapSrc}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactUs

