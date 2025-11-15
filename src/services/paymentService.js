// src/services/paymentService.js
import api from './api';

// Initiate M-Pesa payment
export const initiateMpesaPayment = async (orderId, phoneNumber) => {
  const response = await api.post('/payment/mpesa/initiate', {
    orderId,
    phoneNumber
  });
  return response.data;
};

// Check M-Pesa payment status
export const checkMpesaStatus = async (checkoutRequestId) => {
  const response = await api.get(`/payment/mpesa/status/${checkoutRequestId}`);
  return response.data;
};