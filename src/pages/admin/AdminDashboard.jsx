// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

// Import admin pages
import AdminHome from './AdminHome';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* DESKTOP SIDEBAR - Classic Professional */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex-col z-40">
        
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div>
            <h1 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Jomo Auto World
            </p>
          </div>
        </div>

        {/* Navigation - Classic Style */}
        <nav className="flex-1 px-3 py-4">
          <div className="mb-3 px-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Navigation
            </h3>
          </div>
          
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 
                    transition-all border-l-4 text-sm font-medium
                    ${active
                      ? 'border-red-600 bg-gray-100 text-gray-900 font-bold'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button - Bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-sm rounded-md border border-transparent hover:border-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE - NO HEADER, Just Bottom Nav */}
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar (when menu opened) */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div>
            <h1 className="text-lg font-bold text-gray-900 uppercase">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500">Jomo Auto World</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="px-3 py-4">
          <div className="mb-3 px-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Navigation
            </h3>
          </div>
          
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 
                    transition-all border-l-4 text-sm font-medium
                    ${active
                      ? 'border-red-600 bg-gray-100 text-gray-900 font-bold'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-sm rounded-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 pb-20 lg:pb-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>

      {/* BOTTOM NAVIGATION - Mobile Only (Classic Style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-pb">
        <div className="grid grid-cols-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center justify-center gap-1 py-2.5 
                  transition-all border-t-2 touch-manipulation
                  ${active
                    ? 'border-red-600 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-600 active:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* MOBILE MENU BUTTON - Floating (Optional quick access to sidebar) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 w-10 h-10 bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg flex items-center justify-center transition-all touch-manipulation"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default AdminDashboard;