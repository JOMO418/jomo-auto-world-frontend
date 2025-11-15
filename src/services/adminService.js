// src/services/adminService.js
import api from './api';

// Get dashboard statistics
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard-stats');  
  return response.data;
};

// Get recent activity
export const getRecentActivity = async () => {
  const response = await api.get('/admin/recent-activity');  
  return response.data;
};

// Get all orders (admin)
export const getAllOrders = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
      queryParams.append(key, params[key]);
    }
  });
  
  const response = await api.get(`/admin/orders?${queryParams.toString()}`); 
  return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId, status, note) => {
  const response = await api.patch(`/admin/orders/${orderId}/status`, {  
    status,
    note
  });
  return response.data;
};

// Get admin products
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

// Get low stock products
export const getLowStockProducts = async () => {
  const response = await api.get('/admin/products/low-stock');  
  return response.data;
};