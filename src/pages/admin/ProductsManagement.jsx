// src/pages/admin/ProductsManagement.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Package,
  Filter,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  getAdminProducts, 
  deleteProduct, 
  toggleVisibility,
  clearMessage 
} from '../../redux/slices/productSlice';
import AddProductModal from '../../components/admin/AddProductModal';
import EditProductModal from '../../components/admin/EditProductModal';

const ProductsManagement = () => {
  const dispatch = useDispatch();
  const { products, isLoading, message, isError, pagination } = useSelector((state) => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterVisible, setFilterVisible] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    if (message && !isError) {
      toast.success(message);
      dispatch(clearMessage());
      loadProducts();
    }
    if (message && isError) {
      toast.error(message);
      dispatch(clearMessage());
    }
  }, [message, isError, dispatch]);

  const loadProducts = () => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (filterVisible !== 'all') params.isVisible = filterVisible === 'visible';
    dispatch(getAdminProducts(params));
  };

  const handleSearch = () => {
    loadProducts();
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Delete "${productName}"?\n\nThis will soft-delete the product.`)) {
      await dispatch(deleteProduct(productId));
    }
  };

  const handleToggleVisibility = async (productId) => {
    await dispatch(toggleVisibility(productId));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Products</h1>
          <p className="text-sm text-gray-500">
            {pagination.total} total products
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or part number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-colors"
          >
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors lg:hidden"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
          <button
            onClick={() => setFilterVisible('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filterVisible === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilterVisible('visible')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filterVisible === 'visible'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Visible
          </button>
          <button
            onClick={() => setFilterVisible('hidden')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filterVisible === 'hidden'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hidden
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try a different search term' : 'Start by adding your first product'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Visibility Badge */}
                <div className="absolute top-3 right-3">
                  {product.isVisible ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                      <Eye className="w-3 h-3" />
                      VISIBLE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded-full">
                      <EyeOff className="w-3 h-3" />
                      HIDDEN
                    </span>
                  )}
                </div>

                {/* Stock Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    product.stock === 0
                      ? 'bg-red-600 text-white'
                      : product.stock <= 5
                      ? 'bg-yellow-500 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-black mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.partNumber}</p>
                <p className="text-xl font-bold text-red-600 mb-4">
                  {formatCurrency(product.price)}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  
                  <button
                    onClick={() => handleToggleVisibility(product._id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm transition-colors"
                  >
                    {product.isVisible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {product.isVisible ? 'Hide' : 'Show'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsManagement;