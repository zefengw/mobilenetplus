import type { MobilePlan, InternetPlan, TVPlan, SecurityPlan } from '../types/plans'

export const mobilePlans: MobilePlan[] = [
  { 
    id: 101, // Changed from 1 to 101
    name: 'Basic Plan', 
    price: 20, 
    location: 'Nationwide', 
    data: '2GB', 
    details: 'Unlimited calls and texts',
    isDeal: true
  },
  { 
    id: 102, // Changed from 2 to 102
    name: 'Standard Plan', 
    price: 30, 
    location: 'Nationwide', 
    data: '5GB', 
    details: 'Unlimited calls and texts + Free Premium Apps',
    isDeal: true
  },
  { 
    id: 103, // Changed from 3 to 103
    name: 'Premium Plan', 
    price: 40, 
    location: 'Nationwide', 
    data: '10GB', 
    details: 'Unlimited calls and texts',
    isDeal: false
  }
]

export const internetPlans: InternetPlan[] = [
  { 
    id: 201, // Changed from 1 to 201
    name: 'Basic Internet', 
    price: 30, 
    location: 'Urban Areas', 
    speed: '25 Mbps', 
    details: 'Suitable for light browsing and email',
    isDeal: false
  },
  { 
    id: 202, // Changed from 2 to 202
    name: 'Standard Internet', 
    price: 50, 
    location: 'Urban Areas', 
    speed: '100 Mbps', 
    details: 'Great for streaming and gaming + Free Installation',
    isDeal: true
  },
  { 
    id: 203, // Changed from 3 to 203
    name: 'Premium Internet', 
    price: 70, 
    location: 'Urban Areas', 
    speed: '500 Mbps', 
    details: 'Ultra-fast for heavy users and businesses',
    isDeal: false
  }
]

export const tvPlans: TVPlan[] = [
  { 
    id: 301, // Changed from 1 to 301
    name: 'Basic TV', 
    price: 40, 
    location: 'Nationwide', 
    channels: '60+ Channels', 
    details: 'Essential entertainment channels',
    isDeal: false
  },
  { 
    id: 302, // Changed from 2 to 302
    name: 'Standard TV', 
    price: 60, 
    location: 'Nationwide', 
    channels: '120+ Channels', 
    details: 'Sports and movie channels + Free Premium Movie Package',
    isDeal: true
  },
  { 
    id: 303, // Changed from 3 to 303
    name: 'Premium TV', 
    price: 80, 
    location: 'Nationwide', 
    channels: '200+ Channels', 
    details: 'All channels plus premium content',
    isDeal: false
  }
]

export const securityPlans: SecurityPlan[] = [
  { 
    id: 401, // Changed from 1 to 401
    name: 'Basic Security', 
    price: 25, 
    location: 'Urban Areas', 
    features: 'Essential Protection', 
    details: '24/7 monitoring and mobile app access',
    isDeal: false
  },
  { 
    id: 402, // Changed from 2 to 402
    name: 'Advanced Security', 
    price: 45, 
    location: 'Urban Areas', 
    features: 'Smart Protection', 
    details: 'Includes cameras and smart sensors + Free Installation',
    isDeal: true
  },
  { 
    id: 403, // Changed from 3 to 403
    name: 'Premium Security', 
    price: 65, 
    location: 'Urban Areas', 
    features: 'Complete Protection', 
    details: 'Full home automation and security',
    isDeal: false
  }
]

