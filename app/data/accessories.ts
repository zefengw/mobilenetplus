export interface AccessoryItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'all-brand',
    name: 'All Brand',
    icon: 'smartphone',
    subcategories: ['All Brand Cell Phone Brand']
  },
  {
    id: 'powerbank',
    name: 'Powerbank',
    icon: 'battery-charging',
    subcategories: ['Powerbank']
  },
  {
    id: 'bluetooth',
    name: 'Bluetooth',
    icon: 'bluetooth',
    subcategories: ['Bluetooth Handsfree', 'Speaker', 'Adapter']
  },
  {
    id: 'charger',
    name: 'Charger',
    icon: 'plug',
    subcategories: ['Home Charger', 'Car Charger']
  },
  {
    id: 'data-cable',
    name: 'Data Cable',
    icon: 'cable',
    subcategories: ['Phone Cable', 'Tablet Cable', 'USB Cable']
  },
  {
    id: 'handsfree',
    name: 'Handsfree',
    icon: 'headphones',
    subcategories: ['Universal Handsfree']
  },
  {
    id: 'leather-pouch',
    name: 'Leather Pouch',
    icon: 'shopping-bag',
    subcategories: ['Daul Layer', 'Vertical', 'Horizontal']
  },
  {
    id: 'memory-card',
    name: 'Memory Card',
    icon: 'sd-card',
    subcategories: ['Kingston', 'Micro SD', 'USB Flash Drive']
  }
];

export const accessories: AccessoryItem[] = [
  {
    id: '1',
    name: 'Wireless Power Bank 10000mAh',
    brand: 'Samsung',
    category: 'powerbank',
    price: 49.99,
    description: 'Fast charging wireless power bank with 10000mAh capacity',
    image: '/placeholder.svg?height=200&width=200',
    featured: true
  },
  {
    id: '2',
    name: 'Bluetooth Earbuds Pro',
    brand: 'Apple',
    category: 'bluetooth',
    price: 199.99,
    description: 'Premium wireless earbuds with noise cancellation',
    image: '/placeholder.svg?height=200&width=200',
    featured: true
  },
  {
    id: '3',
    name: 'Fast Charging Adapter',
    brand: 'Google',
    category: 'charger',
    price: 29.99,
    description: '30W USB-C power adapter for fast charging',
    image: '/placeholder.svg?height=200&width=200',
    featured: true
  },
  {
    id: '4',
    name: 'Premium Leather Case',
    brand: 'Apple',
    category: 'leather-pouch',
    price: 59.99,
    description: 'Genuine leather case with card slots',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: '5',
    name: 'USB-C to Lightning Cable',
    brand: 'Apple',
    category: 'data-cable',
    price: 19.99,
    description: 'Original 1m charging cable',
    image: '/placeholder.svg?height=200&width=200',
    featured: true
  }
];

export const brands = [
  { id: 'apple', name: 'Apple', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'samsung', name: 'Samsung', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'google', name: 'Google', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'motorola', name: 'Motorola', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'tcl', name: 'TCL', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'other', name: 'Other Brand', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'alcatel', name: 'Alcatel', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'huawei', name: 'Huawei', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'zte', name: 'ZTE', logo: '/placeholder.svg?height=100&width=100' },
  { id: 'lg', name: 'LG', logo: '/placeholder.svg?height=100&width=100' }
];

