// frontend/src/components/common/Navbar.jsx
// Shared Navigation Component (Matching Ayman's components/navbar.js exactly)
// Author: Ayman Riaz (B24CSA17) | React Migration: Rasal Musthafa

import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <header id="navbar">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="navbar__brand">
          <img src="/assets/logo.png" alt="CEE Kerala" className="navbar__logo" onError={(e) => (e.target.style.display = 'none')} />
          <span className="navbar__title">
            CEE Kerala
            <span className="navbar__title-sub">Entrance Examination Portal</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          <li>
            <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              Home
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/application" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                  Application
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                    Admin
                  </NavLink>
                </li>
              )}
            </>
          )}

          <li>
            <NavLink to="/status" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              Status
            </NavLink>
          </li>

          <li>
            {isAuthenticated ? (
              <a href="#logout" onClick={handleLogout} className="navbar__link navbar__link--cta" id="logout-btn">
                Logout
              </a>
            ) : (
              <Link to="/login" className="navbar__link navbar__link--cta">
                Login / Register
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Toggle Hamburger */}
        <button
          className="navbar__toggle"
          id="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`} id="mobile-menu">
        <NavLink to="/" className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`} onClick={() => setMobileOpen(false)}>
          Home
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`} onClick={() => setMobileOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/application" className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`} onClick={() => setMobileOpen(false)}>
              Application
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`} onClick={() => setMobileOpen(false)}>
                Admin
              </NavLink>
            )}
          </>
        )}
        <NavLink to="/status" className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`} onClick={() => setMobileOpen(false)}>
          Status
        </NavLink>
        {isAuthenticated ? (
          <a href="#logout" onClick={handleLogout} className="navbar__mobile-link navbar__mobile-link--cta">
            Logout
          </a>
        ) : (
          <Link to="/login" className="navbar__mobile-link navbar__mobile-link--cta" onClick={() => setMobileOpen(false)}>
            Login / Register
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
