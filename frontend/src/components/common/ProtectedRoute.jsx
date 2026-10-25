// frontend/src/components/common/ProtectedRoute.jsx
// Route Guard Component
// Author: Ayman Riaz (B24CSA17)
// Study Reference: Slides 73, 85 (Protected Routes & Auth Guarding)

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1rem' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  // If not logged in, redirect to login page while preserving target path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires admin role and user is not an admin, redirect to candidate dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is an administrator accessing candidate-only routes (Dashboard or Application form), redirect to admin portal
  if (!requireAdmin && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
