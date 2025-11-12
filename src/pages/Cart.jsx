// src/pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingCost, total, totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart`);
  };

  const handleUpdateQuantity = (id, newQuantity, stock) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      toast.error(`Only ${stock} items available`);
      return;
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-dark">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h2 className="heading-md text-dark dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/parts" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        <h1 className="heading-lg text-dark dark:text-white mb-8">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {shippingCost > 0 && (
              <div className="card p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {amountToFreeShipping > 0 ? (
                      <>Add <span className="font-bold text-primary">{formatCurrency(amountToFreeShipping)}</span> more for FREE shipping!</>
                    ) : (
                      <span className="text-green-500 font-bold">🎉 You've qualified for FREE shipping!</span>
                    )}
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Items */}
            {cartItems.map((item) => (
              <div key={item._id} className="card p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <Link to={`/product/${item._id}`} className="flex-shrink-0">
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1">
                    <Link 
                      to={`/product/${item._id}`}
                      className="font-bold text-dark dark:text-white hover:text-primary line-clamp-2 mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Part #: {item.partNumber}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1, item.stock)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1, item.stock)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item._id, item.name)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-xl text-dark dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg text-dark dark:text-white">Total</span>
                    <span className="font-bold text-2xl text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mb-3"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/parts"
                className="block text-center text-primary hover:text-red-700 font-semibold text-sm"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-3">
                  🔒 Secure Checkout | 1-Year Warranty | Same Day Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;