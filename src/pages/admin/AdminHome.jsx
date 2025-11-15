// src/pages/admin/AdminHome.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import { getDashboardStats, getRecentActivity } from '../../redux/slices/adminSlice';
import { getLowStock } from '../../redux/slices/productSlice';
import StatsCard from '../../components/admin/StatsCard';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { dashboardStats, recentActivity, isLoading } = useSelector((state) => state.admin);
  const { lowStock } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentActivity());
    dispatch(getLowStock());
  }, [dispatch]);

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

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, Jomo! 👋
            </h1>
            <p className="text-red-100 text-sm md:text-base">
              Here's what's happening with your store today
            </p>
          </div>
          <div className="hidden md:block">
            <Clock className="w-12 h-12 text-red-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Revenue"
          value={formatCurrency(dashboardStats?.today?.revenue || 0)}
          subtitle={`${dashboardStats?.today?.orders || 0} orders`}
          icon={DollarSign}
          color="green"
          loading={isLoading}
        />
        
        <StatsCard
          title="Pending Orders"
          value={dashboardStats?.orders?.pending || 0}
          subtitle="Need attention"
          icon={ShoppingCart}
          color="yellow"
          loading={isLoading}
        />
        
        <StatsCard
          title="Low Stock Items"
          value={dashboardStats?.products?.lowStock || 0}
          subtitle="Restock soon"
          icon={AlertCircle}
          color="red"
          loading={isLoading}
        />
        
        <StatsCard
          title="Total Products"
          value={dashboardStats?.products?.total || 0}
          subtitle={`${dashboardStats?.products?.outOfStock || 0} out of stock`}
          icon={Package}
          color="blue"
          loading={isLoading}
        />
      </div>

      {/* This Week */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black">This Week</h2>
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-600">Revenue</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(dashboardStats?.week?.revenue || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-600">This Month</span>
            <span className="text-lg font-bold text-blue-600">
              {formatCurrency(dashboardStats?.month?.revenue || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock && lowStock.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black mb-1">Low Stock Alert</h3>
              <p className="text-sm text-gray-600">
                {lowStock.length} products need restocking
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            {lowStock.slice(0, 3).map((product) => (
              <div key={product._id} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-black truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.partNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">
                    {product.stock}
                  </span>
                  <p className="text-xs text-gray-500">left</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/admin/products"
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      {recentActivity?.recentOrders && recentActivity.recentOrders.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivity.recentOrders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black text-sm">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.user?.name} • {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                    order.orderStatus === 'delivered' 
                      ? 'bg-green-100 text-green-700'
                      : order.orderStatus === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/admin/products"
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-xl transition-all"
        >
          <Package className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-1">Manage Products</h3>
          <p className="text-sm text-blue-100">Add or edit products</p>
        </Link>
        
        <Link
          to="/admin/orders"
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white hover:shadow-xl transition-all"
        >
          <ShoppingCart className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-1">View Orders</h3>
          <p className="text-sm text-purple-100">Process orders</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;