// frontend/src/pages/LoginPage.jsx
// Assigned to Safdil Arafath (B24CSA50)

import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '480px' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ color: 'var(--color-navy)', marginBottom: '1.5rem', textAlign: 'center' }}>Candidate Login</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Enter your Application Number and Password to access your candidate dashboard.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Application Number" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <input type="password" placeholder="Password" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <button type="button" className="btn btn--primary" style={{ width: '100%' }}>Login</button>
        </div>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)' }}>
          Don't have an application number? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
