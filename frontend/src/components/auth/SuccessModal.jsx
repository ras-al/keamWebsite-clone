// frontend/src/components/auth/SuccessModal.jsx
// Candidate Registration Success Confirmation Modal
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 56-57 (Conditional Rendering & Modals)

import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessModal({ candidateData, onClose }) {
  const navigate = useNavigate();

  if (!candidateData) return null;

  const handleProceedLogin = () => {
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          maxWidth: '460px',
          width: '100%',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#DCFCE7',
            color: '#16A34A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Registration Successful!</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-dark-gray)', marginBottom: '1.5rem' }}>
          Your KEAM 2026 application account has been created. Please save your official Application Number.
        </p>

        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '2px dashed #CBD5E1',
            borderRadius: '6px',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Official Application Number
          </div>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: 'var(--color-navy)',
              margin: '0.4rem 0',
              fontFamily: 'monospace'
            }}
          >
            {candidateData.applicationNumber}
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)' }}>
            Candidate: <strong>{candidateData.fullName}</strong>
          </div>
        </div>

        <p style={{ fontSize: 'var(--fs-xs)', color: '#DC2626', marginBottom: '1.5rem', fontWeight: '500' }}>
          Please take a screenshot or write this down. You will need it to login and complete your application.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => window.print()}
          >
            Print / Save
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleProceedLogin}
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
