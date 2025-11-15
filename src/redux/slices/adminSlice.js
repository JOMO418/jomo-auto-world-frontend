// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

const initialState = {
  dashboardStats: null,
  recentActivity: null,
  orders: [],
  ordersPagination: {
    total: 0,
    page: 1,
    pages: 1,
    count: 0
  },
  isLoading: false,
  isError: false,
  message: ''
};

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, thunkAPI) => {
    try {
      return await adminService.getDashboardStats();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get recent activity
export const getRecentActivity = createAsyncThunk(
  'admin/getRecentActivity',
  async (_, thunkAPI) => {
    try {
      return await adminService.getRecentActivity();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all orders
export const getAllOrders = createAsyncThunk(
  'admin/getAllOrders',
  async (params, thunkAPI) => {
    try {
      return await adminService.getAllOrders(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status, note }, thunkAPI) => {
    try {
      return await adminService.updateOrderStatus(orderId, status, note);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = '';
      state.isError = false;
    },
    resetAdmin: (state) => {
      state.dashboardStats = null;
      state.recentActivity = null;
      state.orders = [];
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Get dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload.stats;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get recent activity
      .addCase(getRecentActivity.fulfilled, (state, action) => {
        state.recentActivity = action.payload;
      })
      // Get all orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.ordersPagination = {
          total: action.payload.total,
          page: action.payload.page,
          pages: action.payload.pages,
          count: action.payload.count
        };
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload.order._id);
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
        state.message = action.payload.message;
      });
  }
});

export const { clearMessage, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;