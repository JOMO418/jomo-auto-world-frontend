// src/services/paymentService.js
import api from './api';

// Initiate M-Pesa payment
export const initiateMpesaPayment = async (orderId, phoneNumber) => {
  const response = await api.post('/api/payment/mpesa/initiate', {
    orderId,
    phoneNumber
  });
  return response.data;
};

// Check M-Pesa payment status
export const checkMpesaStatus = async (checkoutRequestId) => {
  const response = await api.get(`/api/payment/mpesa/status/${checkoutRequestId}`);
  return response.data;
};