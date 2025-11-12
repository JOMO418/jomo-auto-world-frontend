// src/services/orderService.js
import api from './api';

// Create order
export const createOrder = async (orderData) => {
  // Remove /api prefix since it's already in baseURL
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get user orders
export const getMyOrders = async (params = {}) => {
  const queryParams = new URLSearchParams(params);
  const response = await api.get(`/orders?${queryParams.toString()}`);
  return response.data;
};

// Get single order
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Cancel order
export const cancelOrder = async (id, reason) => {
  const response = await api.put(`/orders/${id}/cancel`, { reason });
  return response.data;
};

// Update order status (Admin only)
export const updateOrderStatus = async (id, status, note) => {
  const response = await api.put(`/orders/${id}/status`, { status, note });
  return response.data;
};