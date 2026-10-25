// frontend/src/pages/LoginPage.jsx
// Candidate Authentication & Login Component
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 86–88 (Controlled Components, Form Handling)

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CaptchaBox from '../components/auth/CaptchaBox';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [appNo, setAppNo] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [activeCaptcha, setActiveCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Basic validation
    if (!appNo.trim() || !password.trim()) {
      setError('Please enter both application number and password.');
      return;
    }

    // 2. Validate CAPTCHA
    if (captchaInput.trim().toUpperCase() !== activeCaptcha.toUpperCase()) {
      setError('Incorrect CAPTCHA answer. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationNumber: appNo.trim(), password })
      });

      const data = await res.json();
      if (data.success && data.token) {
        const candidateInfo = data.candidate || {
          applicationNumber: appNo.trim(),
          fullName: 'Candidate',
          role: 'candidate'
        };

        // Update global AuthContext
        login(data.token, candidateInfo);

        // Check if user came from a protected route or redirect based on role
        const targetPath = location.state?.from?.pathname;
        if (targetPath) {
          navigate(targetPath);
        } else if (candidateInfo.role === 'admin' || candidateInfo.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Invalid Application Number or Password.');
      }
    } catch (err) {
      setError('Failed to connect to authentication server. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '480px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>Candidate Portal Login</h2>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)' }}>
            Enter your Application Number / Username and Password
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: 'var(--fs-sm)',
              marginBottom: '1rem',
              border: '1px solid #FCA5A5'
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              htmlFor="appNo"
              style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
            >
              Application Number / Admin Username <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              id="appNo"
              type="text"
              placeholder="e.g. 2648219 or admin"
              value={appNo}
              onChange={(e) => setAppNo(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                border: 'var(--border-light)',
                borderRadius: '4px',
                fontSize: 'var(--fs-sm)'
              }}
              required
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label
                htmlFor="password"
                style={{ fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)' }}
              >
                Password <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-navy)',
                  fontSize: 'var(--fs-xs)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                border: 'var(--border-light)',
                borderRadius: '4px',
                fontSize: 'var(--fs-sm)'
              }}
              required
            />
          </div>

          {/* CAPTCHA Challenge Box */}
          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)' }}>
              Security CAPTCHA <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <CaptchaBox onCaptchaChange={(code) => setActiveCaptcha(code)} />
            <input
              type="text"
              placeholder="Type the 5 characters above"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                border: 'var(--border-light)',
                borderRadius: '4px',
                fontSize: 'var(--fs-sm)',
                letterSpacing: '2px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
          Don't have an application account yet?{' '}
          <Link to="/register" style={{ color: 'var(--color-navy)', fontWeight: 'bold' }}>
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
