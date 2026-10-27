// frontend/src/context/AuthContext.jsx
// Global Authentication Context Provider
// Author: Ayman Riaz (B24CSA17)
// Study Reference: Slides 73-81 (Context API: createContext, Provider, useContext)

import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Read initial token and candidate profile from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('keam_candidate') || localStorage.getItem('keam_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync token changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Sync user profile changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('keam_candidate', JSON.stringify(user));
      localStorage.setItem('keam_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('keam_candidate');
      localStorage.removeItem('keam_user');
    }
  }, [user]);

  // Login handler
  const login = (newToken, userData) => {
    // Clear any previous user's cached application data to prevent cross-account bleeding
    localStorage.removeItem('keam_application');
    localStorage.removeItem('application');

    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('keam_candidate', JSON.stringify(userData));
    localStorage.setItem('keam_user', JSON.stringify(userData));
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('candidate');
    localStorage.removeItem('keam_candidate');
    localStorage.removeItem('keam_user');
    localStorage.removeItem('keam_application');
    localStorage.removeItem('application');
  };

  const isAuthenticated = Boolean(token);
  const isAdmin = Boolean(user && (user.role === 'admin' || user.role === 'superadmin'));

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for simple consumption across all components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
