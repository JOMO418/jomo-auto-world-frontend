// src/utils/constants.js

// Vehicle models
export const VEHICLES = [
    { name: 'Toyota Probox', slug: 'probox', image: '/Probox.jpg' },
    { name: 'Toyota Belta', slug: 'belta', image: '/Belta.jpg' },
    { name: 'Toyota Wish', slug: 'wish', image: '/wish 2.jpg' },
    { name: 'Toyota Sienta', slug: 'sienta', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600' },
    { name: 'Toyota 5L Shark', slug: '5l-shark', image: '/5L.jpg' },
    { name: 'Toyota Fielder', slug: 'fielder', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600' },
    { name: 'Toyota Corolla', slug: 'corolla', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=600' },
    { name: 'Nissan Wingroad', slug: 'wingroad', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600' },
  ];
  
  // Categories
  export const CATEGORIES = [
    { name: 'Suspension', slug: 'suspension', icon: 'wrench', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600' },
    { name: 'Engine Parts', slug: 'engine', icon: 'gauge', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600' },
    { name: 'Brakes', slug: 'brakes', icon: 'circle-dot', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600' },
    { name: 'Electrical', slug: 'electrical', icon: 'zap', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600' },
    { name: 'Body Parts', slug: 'body', icon: 'paint-bucket', image: 'https://images.unsplash.com/photo-1530040561668-7556a36f5152?q=80&w=600' },
  ];
  
  // Brands
  export const BRANDS = [
    'Bosch',
    'NGK',
    'KYB',
    'Denso',
    'Brembo',
    'Sachs',
    'Monroe',
    'Genuine',
    'OEM',
    'Mann Filter',
    'Other'
  ];
  
  // Sort options
  export const SORT_OPTIONS = [
    { label: 'Newest First', value: '-createdAt' },
    { label: 'Oldest First', value: 'createdAt' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' },
    { label: 'Highest Rated', value: 'rating' },
  ];
  
  // Order status
  export const ORDER_STATUS = {
    processing: { label: 'Processing', color: 'yellow' },
    confirmed: { label: 'Confirmed', color: 'blue' },
    packed: { label: 'Packed', color: 'purple' },
    shipped: { label: 'Shipped', color: 'indigo' },
    delivered: { label: 'Delivered', color: 'green' },
    cancelled: { label: 'Cancelled', color: 'red' },
  };
  
  // Payment status
  export const PAYMENT_STATUS = {
    pending: { label: 'Pending', color: 'yellow' },
    completed: { label: 'Completed', color: 'green' },
    failed: { label: 'Failed', color: 'red' },
    refunded: { label: 'Refunded', color: 'gray' },
  };
  
  // Contact info
  export const CONTACT_INFO = {
    phone: '+254 712 345 678',
    email: 'info@jomoauto.co.ke',
    address: 'Kenyatta Road, Nairobi, Kenya',
    whatsapp: '+254712345678',
  };
  
  // Social media
  export const SOCIAL_MEDIA = {
    facebook: 'https://facebook.com/jomoauto',
    twitter: 'https://twitter.com/jomoauto',
    instagram: 'https://instagram.com/jomoauto',
  };
  
  // Free shipping threshold
  export const FREE_SHIPPING_THRESHOLD = 10000;