// src/utils/helpers.js

// Format currency (Kenyan Shillings)
export const formatCurrency = (amount) => {
    return `KES ${Number(amount).toLocaleString()}`;
  };
  
  // Format date
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format date with time
  export const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format phone number
  export const formatPhoneNumber = (phone) => {
    // Convert to standard Kenyan format
    phone = phone.toString().replace(/\s/g, '');
    
    if (phone.startsWith('0')) {
      return '+254' + phone.slice(1);
    } else if (phone.startsWith('254')) {
      return '+' + phone;
    } else if (phone.startsWith('+254')) {
      return phone;
    }
    
    return '+254' + phone;
  };
  
  // Validate email
  export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validate Kenyan phone number
  export const isValidKenyanPhone = (phone) => {
    const regex = /^(\+254|0)[17]\d{8}$/;
    return regex.test(phone);
  };
  
  // Calculate discount percentage
  export const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };
  
  // Truncate text
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Get status color
  export const getStatusColor = (status) => {
    const colors = {
      processing: 'yellow',
      confirmed: 'blue',
      packed: 'purple',
      shipped: 'indigo',
      delivered: 'green',
      cancelled: 'red',
      pending: 'yellow',
      completed: 'green',
      failed: 'red',
      refunded: 'gray',
    };
    
    return colors[status] || 'gray';
  };
  
  // Debounce function
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Scroll to top
  export const scrollToTop = (behavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior
    });
  };
  
  // Get initials from name
  export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  // Check if item is in stock
  export const isInStock = (stock) => {
    return stock > 0;
  };
  
  // Get stock status
  export const getStockStatus = (stock, threshold = 5) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'red' };
    if (stock <= threshold) return { label: `Only ${stock} left`, color: 'orange' };
    return { label: 'In Stock', color: 'green' };
  };
  
  // Generate random ID
  export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };