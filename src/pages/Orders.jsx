// src/pages/Orders.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/slices/orderSlice';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import Loader from '../components/common/Loader';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        <h1 className="heading-lg text-dark dark:text-white mb-8">
          My <span className="text-primary">Orders</span>
        </h1>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No orders yet</p>
            <Link to="/parts" className="btn-primary inline-flex">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="card p-6 hover:shadow-xl transition-shadow block"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold bg-${getStatusColor(order.orderStatus)}-100 text-${getStatusColor(order.orderStatus)}-800`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    {order.items.length} items
                  </p>
                  <p className="font-bold text-xl text-primary">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;