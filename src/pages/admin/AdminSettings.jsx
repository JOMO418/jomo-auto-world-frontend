// src/pages/admin/AdminSettings.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { 
  User, 
  Shield, 
  Bell, 
  Info,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const AdminSettings = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your admin account and preferences
        </p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
              <Shield className="w-3 h-3" />
              ADMIN
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Email</span>
            </div>
            <p className="text-black font-semibold">{user?.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Phone</span>
            </div>
            <p className="text-black font-semibold">{user?.phone || 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Store Information */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-black mb-4">Store Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Store Name</h4>
              <p className="text-gray-600">Jomo Auto World</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Contact Number</h4>
              <p className="text-gray-600">+254 798 433 973</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Email</h4>
              <p className="text-gray-600">info@jomoauto.co.ke</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Location</h4>
              <p className="text-gray-600">Kirinyaga Road, Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Admin Dashboard Access</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-sm font-medium">Full Product Management</span>
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-sm font-medium">Order Processing</span>
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-sm font-medium">Sales Analytics</span>
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-lg font-bold text-black">Notifications</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">New Order Alerts</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">Low Stock Warnings</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">Daily Sales Report</span>
            <input type="checkbox" className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
          </label>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <p className="text-sm text-gray-600 mb-2">Jomo Auto World Admin Dashboard</p>
        <p className="text-xs text-gray-500">Version 1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">© 2025 All rights reserved</p>
      </div>
    </div>
  );
};

export default AdminSettings;