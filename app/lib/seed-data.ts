import { adminDb } from '../config/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

const mobileProducts = [
  {
    name: '5G Unlimited Plan',
    description: 'Unlimited data, calls, and texts with 5G coverage',
    price: 79.99,
    features: ['Unlimited 5G Data', 'Unlimited Calls & Texts', 'Mobile Hotspot 15GB'],
    location: 'Nationwide',
    isDeal: true,
    active: true,
    data: '∞',
    category: 'mobile',
  },
  {
    name: '10GB Plan',
    description: 'Perfect for moderate data users',
    price: 49.99,
    features: ['10GB Data', 'Unlimited Calls & Texts', 'Mobile Hotspot 5GB'],
    location: 'Nationwide',
    isDeal: false,
    active: true,
    data: '10GB',
    category: 'mobile',
  }
]

const internetProducts = [
  {
    name: 'Fiber Gig',
    description: 'Lightning-fast fiber internet',
    price: 89.99,
    features: ['1000 Mbps Download', '1000 Mbps Upload', 'No Data Caps'],
    location: 'Select Cities',
    isDeal: true,
    active: true,
    speed: '1000 Mbps',
    category: 'internet',
  },
  {
    name: 'Basic Internet',
    description: 'Reliable internet for everyday use',
    price: 49.99,
    features: ['100 Mbps Download', '10 Mbps Upload', 'No Contract'],
    location: 'Nationwide',
    isDeal: false,
    active: true,
    speed: '100 Mbps',
    category: 'internet',
  }
]

const tvProducts = [
  {
    name: 'Premium TV Package',
    description: 'All premium channels included',
    price: 129.99,
    features: ['300+ Channels', 'Premium Movie Channels', '4K Ultra HD'],
    location: 'Nationwide',
    isDeal: true,
    active: true,
    channels: '300+',
    category: 'tv',
  },
  {
    name: 'Basic TV Package',
    description: 'Essential channels for the family',
    price: 69.99,
    features: ['100+ Channels', 'Local Channels', 'HD Quality'],
    location: 'Nationwide',
    isDeal: false,
    active: true,
    channels: '100+',
    category: 'tv',
  }
]

const securityProducts = [
  {
    name: 'Complete Security',
    description: 'Full home security system',
    price: 49.99,
    features: ['24/7 Monitoring', 'Smart Cameras', 'Door Sensors', 'Mobile App'],
    location: 'Nationwide',
    isDeal: true,
    active: true,
    category: 'security',
  },
  {
    name: 'Basic Security',
    description: 'Essential home security',
    price: 29.99,
    features: ['Door Sensors', 'Mobile App', 'Email Alerts'],
    location: 'Nationwide',
    isDeal: false,
    active: true,
    category: 'security',
  }
]

const accessoryProducts = [
  {
    name: 'Premium Smartphone',
    description: 'Latest flagship smartphone',
    price: 999.99,
    features: ['5G Ready', '128GB Storage', 'Triple Camera'],
    location: 'All Stores',
    isDeal: true,
    active: true,
    category: 'accessories',
    imageUrl: 'https://example.com/smartphone.jpg',
  },
  {
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds',
    price: 199.99,
    features: ['Active Noise Cancellation', 'Water Resistant', '24h Battery'],
    location: 'All Stores',
    isDeal: false,
    active: true,
    category: 'accessories',
    imageUrl: 'https://example.com/earbuds.jpg',
  }
]

export async function seedDatabase() {
  try {
    // Seed mobile products
    for (const product of mobileProducts) {
      await adminDb.collection('products').doc('mobile').collection('items').add({
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }

    // Seed internet products
    for (const product of internetProducts) {
      await adminDb.collection('products').doc('internet').collection('items').add({
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }

    // Seed TV products
    for (const product of tvProducts) {
      await adminDb.collection('products').doc('tv').collection('items').add({
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }

    // Seed security products
    for (const product of securityProducts) {
      await adminDb.collection('products').doc('security').collection('items').add({
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }

    // Seed accessory products
    for (const product of accessoryProducts) {
      await adminDb.collection('products').doc('accessories').collection('items').add({
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
} 