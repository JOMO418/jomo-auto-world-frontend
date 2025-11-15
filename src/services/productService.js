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
  
  const response = await api.get(`/products?${queryParams.toString()}`); // ✅ Removed /api
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`); // ✅ Removed /api
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured'); // ✅ Removed /api
  return response.data;
};

// Get best sellers
export const getBestSellers = async () => {
  const response = await api.get('/products/best-sellers'); // ✅ Removed /api
  return response.data;
};

// Search products
export const searchProducts = async (searchTerm) => {
  const response = await api.get(`/products/search?q=${searchTerm}`); // ✅ Removed /api
  return response.data;
};
// ========== ADMIN FUNCTIONS ==========

// Get all products (admin view - includes hidden)
export const getAdminProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
      queryParams.append(key, params[key]);
    }
  });
  
  const response = await api.get(`/admin/products?${queryParams.toString()}`);
  return response.data;
};

// Create product (admin)
// Create product (admin)
export const createProduct = async (productData) => {
  console.log('📤 Sending to API:', productData);
  
  const response = await api.post('/admin/products', productData);
  return response.data;
};
// Update product (admin)
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/admin/products/${id}`, productData);
  return response.data;
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

// Toggle product visibility (admin)
export const toggleProductVisibility = async (id) => {
  const response = await api.patch(`/admin/products/${id}/visibility`);
  return response.data;
};

// Get low stock products (admin)
export const getLowStockProducts = async () => {
  const response = await api.get('/admin/products/low-stock');
  return response.data;
};