// frontend/src/App.jsx
// Top-Level Application Layout & Client-Side Routing
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 14, 84-85 (BrowserRouter, Routes, Route Orchestration)

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Common Components
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/status" element={<StatusPage />} />
          {/* Catch-all 404 fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
