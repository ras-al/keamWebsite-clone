// frontend/src/App.jsx
// Top-Level Application Layout, AuthProvider & Client-Side Routing
// Author: Rasal Musthafa (B24CSA49) & Ayman Riaz (B24CSA17)
// Study Reference: Slides 14, 73–81, 84–85 (BrowserRouter, Routes, AuthContext, ProtectedRoute)

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Global Authentication Provider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Common Layout Components
import GovtBand from './components/common/GovtBand';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Routed Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationPage from './pages/ApplicationPage';
import AdminPage from './pages/AdminPage';
import StatusPage from './pages/StatusPage';

function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        {/* 1. Government Top Band */}
        <GovtBand />

        {/* 2. Global Navigation Bar */}
        <Navbar />

        {/* 3. Client-Side Page Routes */}
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Candidate Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application"
              element={
                <ProtectedRoute>
                  <ApplicationPage />
                </ProtectedRoute>
              }
            />

            {/* Administrator Protected Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Public Status Tracking */}
            <Route path="/status" element={<StatusPage />} />

            {/* Catch-all 404 fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* 4. Global Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
