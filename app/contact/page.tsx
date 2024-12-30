'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { MapPin, Phone, Mail } from 'lucide-react'
import Breadcrumb from '../../components/Breadcrumb'
import { scrollToTop } from '../utils/scroll-to-top'

const locations = {
  'Location 1': {
    address: '123 Main St, City 1, Country',
    phone: '+1 234-567-8901',
    email: 'contact1@mobilenetplus.com',
    coordinates: { lat: 40.7589, lng: -73.9872 },
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1635181106977!5m2!1sen!2sus'
  },
  'Location 2': {
    address: '456 Oak St, City 2, Country',
    phone: '+1 987-654-3210',
    email: 'contact2@mobilenetplus.com',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203581424!2d-118.24370684857918!3d34.052235180615325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos+Angeles%2C+CA!5e0!3m2!1sen!2sus!4v1635181106977!5m2!1sen!2sus'
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
                  <img src="/qr-wechat.png" alt="WeChat QR Code" className="w-32 h-32 mb-2" />
                  <p>WeChat Group</p>
                </div>
                <div className="text-center">
                  <img src="/qr-facebook.png" alt="Facebook QR Code" className="w-32 h-32 mb-2" />
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

