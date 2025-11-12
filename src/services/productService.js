// src/services/productService.js
import api from './api';

// Get all products with filters
export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
      queryParams.append(key, params[key]);
    }
  });
  
  const response = await api.get(`/api/products?${queryParams.toString()}`);
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await api.get('/api/products/featured');
  return response.data;
};

// Get best sellers
export const getBestSellers = async () => {
  const response = await api.get('/api/products/best-sellers');
  return response.data;
};

// Search products
export const searchProducts = async (searchTerm) => {
  const response = await api.get(`/api/products/search?q=${searchTerm}`);
  return response.data;
};