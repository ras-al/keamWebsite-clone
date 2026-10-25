// frontend/src/pages/RegisterPage.jsx
// Assigned to Safdil Arafath (B24CSA50)

import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '520px' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ color: 'var(--color-navy)', marginBottom: '1.5rem', textAlign: 'center' }}>Candidate Registration</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Register to generate your official KEAM 2026 Application Number.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Full Name (as in Class 10 Certificate)" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <input type="date" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <input type="email" placeholder="Email Address" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <input type="tel" placeholder="Mobile Number" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <input type="password" placeholder="Create Password" className="form-input" style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px' }} />
          <button type="button" className="btn btn--primary" style={{ width: '100%' }}>Register</button>
        </div>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)' }}>
          Already registered? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
