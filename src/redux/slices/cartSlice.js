// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const calculateTotals = (items, shippingCost = 500) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = items.length > 0 ? (subtotal >= 10000 ? 0 : shippingCost) : 0;
  const total = subtotal + shipping;
  
  return { subtotal, totalItems, shipping, total };
};

const initialTotals = calculateTotals(cartItems);

const initialState = {
  cartItems: cartItems,
  totalItems: initialTotals.totalItems,
  subtotal: initialTotals.subtotal,
  shippingCost: initialTotals.shipping,
  total: initialTotals.total,
  freeShippingThreshold: 10000,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(x => x._id === item._id);

      if (existingItem) {
        // Update quantity if item already in cart
        state.cartItems = state.cartItems.map(x =>
          x._id === existingItem._id 
            ? { ...x, quantity: Math.min(x.quantity + item.quantity, item.stock) }
            : x
        );
      } else {
        // Add new item to cart
        state.cartItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          partNumber: item.partNumber,
          quantity: item.quantity,
          stock: item.stock
        });
      }

      // Update totals
      const totals = calculateTotals(state.cartItems, state.shippingCost);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.shippingCost = totals.shipping;
      state.total = totals.total;

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
      
      // Update totals
      const totals = calculateTotals(state.cartItems, state.shippingCost);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.shippingCost = totals.shipping;
      state.total = totals.total;

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(x => x._id === id);
      
      if (item && quantity > 0 && quantity <= item.stock) {
        item.quantity = quantity;
      }

      // Update totals
      const totals = calculateTotals(state.cartItems, state.shippingCost);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.shippingCost = totals.shipping;
      state.total = totals.total;

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.shippingCost = 0;
      state.total = 0;
      localStorage.removeItem('cartItems');
    },

    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
      state.total = state.subtotal + state.shippingCost;
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  setShippingCost 
} = cartSlice.actions;

export default cartSlice.reducer;