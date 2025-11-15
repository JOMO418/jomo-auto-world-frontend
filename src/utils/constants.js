// src/utils/constants.js

// Vehicle models
export const VEHICLES = [
    { name: 'Toyota Probox', slug: 'probox', image: '/Probox.jpg' },
    { name: 'Toyota Belta', slug: 'belta', image: '/Belta.jpg' },
    { name: 'Toyota Wish', slug: 'wish', image: '/wish 2.jpg' },
    { name: 'Toyota Sienta', slug: 'sienta', image: '/Sienta.jpg' },
    { name: 'Toyota 5L Shark', slug: '5l-shark', image: '/5L.jpg' },
    { name: 'Toyota Fielder', slug: 'fielder', image: '/fielder.jpg' },
    { name: 'Toyota Corolla', slug: 'corolla', image: '/corolla.jpg' },
    { name: 'Nissan Wingroad', slug: 'wingroad', image: '/wingroad.jpg' },
  ];
  
  // Categories
  export const CATEGORIES = [
    { name: 'Suspension', slug: 'suspension', icon: 'wrench', image: '/suspe.jpeg' },
    { name: 'Engine Parts', slug: 'engine', icon: 'gauge', image: '/engine.jpg' },
    { name: 'Brakes', slug: 'brakes', icon: 'circle-dot', image: '/brakedisk.png' },
    { name: 'Electrical', slug: 'electrical', icon: 'zap', image: '/electrical.jpeg' },
    { name: 'Body Parts', slug: 'body', icon: 'paint-bucket', image: 'body2.jpg' },
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
    phone: '+25798433973',
    email: 'info@jomoauto.co.ke',
    address: 'Kirinyaga Road, Nairobi, Kenya',
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

  // Admin Constants
export const MAX_IMAGES_PER_PRODUCT = 5;
export const IMAGE_MAX_SIZE_MB = 5;
export const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Admin Routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCTS: '/admin/products',
  ADD_PRODUCT: '/admin/products/add',
  EDIT_PRODUCT: '/admin/products/edit',
  ORDERS: '/admin/orders',
  ORDER_DETAILS: '/admin/orders',
  SETTINGS: '/admin/settings',
};

// Product Conditions
export const PRODUCT_CONDITIONS = [
  { value: 'New', label: 'New' },
  { value: 'Ex-Japan', label: 'Ex-Japan' },
  
];

// Order Status Options (for admin)
export const ORDER_STATUS_OPTIONS = [
  { value: 'processing', label: 'Processing', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'packed', label: 'Packed', color: 'purple' },
  { value: 'shipped', label: 'Shipped', color: 'indigo' },
  { value: 'delivered', label: 'Delivered', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' }
];

// Vehicle Makes (for admin dropdown)
export const VEHICLE_MAKES = [
  'Toyota',
  'Nissan', 
  'Mazda',
  'Honda',
  'Subaru',
  'Mitsubishi',
  'Other'
];

// Cloudinary Config (public info only)
export const CLOUDINARY_UPLOAD_PRESET = 'jomo_auto_products';
export const CLOUDINARY_CLOUD_NAME = 'dzdusdhcd2'; // From your .env