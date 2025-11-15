// src/services/authService.js
import api from './api';

// Register user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getMe = async () => {
  const response = await api.get('/auth/me');
  
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data.user;
};

// Update profile
export const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData);
  
  if (response.data.user) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...currentUser, ...response.data.user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password });
  return response.data;
};

// Change password
export const changePassword = async (passwords) => {
  const response = await api.put('/auth/change-password', passwords);
  return response.data;
};