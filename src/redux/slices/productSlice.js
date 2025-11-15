// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../services/productService';

const initialState = {
  products: [],
  product: null,
  featured: [],
  bestSellers: [],
  lowStock: [],
  isLoading: false,
  isError: false,
  message: '',
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
    count: 0
  },
  filters: {
    category: '',
    brand: '',
    vehicle: '',
    minPrice: 0,
    maxPrice: 100000,
    search: '',
    sort: '-createdAt',
    inStock: false
  }
};

// ========== PUBLIC ACTIONS ==========

// Get all products
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (params, thunkAPI) => {
    try {
      return await productService.getProducts(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single product
export const getProduct = createAsyncThunk(
  'products/getOne',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get featured products
export const getFeaturedProducts = createAsyncThunk(
  'products/getFeatured',
  async (_, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get best sellers
export const getBestSellers = createAsyncThunk(
  'products/getBestSellers',
  async (_, thunkAPI) => {
    try {
      return await productService.getBestSellers();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  'products/search',
  async (searchTerm, thunkAPI) => {
    try {
      return await productService.searchProducts(searchTerm);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ========== ADMIN ACTIONS ==========

// Get admin products
export const getAdminProducts = createAsyncThunk(
  'products/getAdmin',
  async (params, thunkAPI) => {
    try {
      return await productService.getAdminProducts(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, productData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle visibility
export const toggleVisibility = createAsyncThunk(
  'products/toggleVisibility',
  async (id, thunkAPI) => {
    try {
      return await productService.toggleProductVisibility(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get low stock
export const getLowStock = createAsyncThunk(
  'products/getLowStock',
  async (_, thunkAPI) => {
    try {
      return await productService.getLowStockProducts();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = null;
      state.isError = false;
      state.message = '';
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetProducts: (state) => {
      state.products = [];
      state.isError = false;
      state.message = '';
    },
    clearMessage: (state) => {
      state.message = '';
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          pages: action.payload.pages,
          count: action.payload.count
        };
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get single product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get featured
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload.products;
      })
      // Get best sellers
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload.products;
      })
      // Search
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get admin products
      .addCase(getAdminProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          pages: action.payload.pages,
          count: action.payload.count
        };
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload.product);
        state.message = 'Product created successfully';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p._id === action.payload.product._id);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        state.message = 'Product updated successfully';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(p => p._id !== action.meta.arg);
        state.message = 'Product deleted successfully';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Toggle visibility
      .addCase(toggleVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p._id === action.payload.product._id);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        state.message = action.payload.message;
      })
      .addCase(toggleVisibility.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Low stock
      .addCase(getLowStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLowStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lowStock = action.payload.products;
      })
      .addCase(getLowStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  resetProduct, 
  setFilters, 
  clearFilters, 
  resetProducts,
  clearMessage 
} = productSlice.actions;

export default productSlice.reducer;