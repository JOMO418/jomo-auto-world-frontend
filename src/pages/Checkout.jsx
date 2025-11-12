// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingCost, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: 'Nairobi',
    county: 'Nairobi',
    paymentMethod: 'M-Pesa'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity
      })),
      shippingAddress: {
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        county: formData.county
      },
      paymentMethod: formData.paymentMethod
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate(`/orders/${result.order._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom max-w-5xl">
        <h1 className="heading-lg text-dark dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-6 space-y-6">
              <h2 className="font-bold text-xl">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name"
                  className="input"
                  required
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone Number"
                  className="input"
                  required
                />
              </div>

              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                placeholder="Street Address"
                className="input"
                required
              />

              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                className="input"
              >
                <option value="M-Pesa">M-Pesa</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              <button type="submit" className="w-full btn-primary">
                Place Order
              </button>
            </form>
          </div>

          <div>
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;