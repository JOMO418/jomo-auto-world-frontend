// src/pages/admin/OrdersManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingCart, 
  Search, 
  Phone,
  MapPin,
  Package,
  Clock,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus } from '../../redux/slices/adminSlice';
import { ORDER_STATUS_OPTIONS } from '../../utils/constants';

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, ordersPagination } = useSelector((state) => state.admin);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  const loadOrders = () => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (statusFilter !== 'all') params.status = statusFilter;
    dispatch(getAllOrders(params));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const result = await dispatch(updateOrderStatus({ 
      orderId, 
      status: newStatus,
      note: `Status updated to ${newStatus}` 
    }));
    
    if (result.type === 'admin/updateOrderStatus/fulfilled') {
      toast.success('Order status updated');
      loadOrders();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
      packed: 'bg-purple-100 text-purple-700 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      delivered: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Orders</h1>
          <p className="text-sm text-gray-500">
            {ordersPagination.total} total orders
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number, name, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && loadOrders()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={loadOrders}
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-colors"
          >
            Search
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Orders
          </button>
          {ORDER_STATUS_OPTIONS.map(status => (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                statusFilter === status.value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try a different search term' : 'Orders will appear here'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-black">
                        {order.orderNumber}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="font-bold text-black">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Status Update */}
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {ORDER_STATUS_OPTIONS.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-4 md:p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Customer</h4>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-black">
                        {order.shippingAddress.name}
                      </p>
                      <a 
                        href={`tel:${order.shippingAddress.phone}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <Phone className="w-4 h-4" />
                        {order.shippingAddress.phone}
                      </a>
                      <a 
                        href={`https://wa.me/${order.shippingAddress.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Delivery Address</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.county}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <img
                          src={item.image || item.product?.images[0]?.url}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-black truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="font-bold text-black">
                          {formatCurrency(item.quantity * item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Payment Status:</span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      order.paymentStatus === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.paymentStatus === 'failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.paymentStatus === 'completed' && <CheckCircle className="w-3 h-3" />}
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;