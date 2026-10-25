// frontend/src/pages/LoginPage.jsx
// Candidate Authentication & Login Component
// Assigned to Safdil Arafath (B24CSA50)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [appNo, setAppNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!appNo || !password) {
      setError('Please enter both application number and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationNumber: appNo, password })
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        const candidateInfo = data.candidate || { applicationNumber: appNo, fullName: 'Candidate' };
        localStorage.setItem('keam_candidate', JSON.stringify(candidateInfo));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid Application Number or Password.');
      }
    } catch (err) {
      setError('Failed to connect to authentication server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '480px' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ color: 'var(--color-navy)', marginBottom: '1rem', textAlign: 'center' }}>Candidate Login</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Enter your Application Number and Password to access your candidate dashboard.
        </p>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Application Number</label>
            <input
              type="text"
              placeholder="e.g. 2648219"
              value={appNo}
              onChange={(e) => setAppNo(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)' }}>
          Don't have an application number? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
