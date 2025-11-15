// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, token } = useSelector((state) => state.auth);

  // Check if user is logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;