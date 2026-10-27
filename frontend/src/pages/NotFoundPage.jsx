// frontend/src/pages/NotFoundPage.jsx
// 404 Page Not Found Component
// Author: Rasal Musthafa (B24CSA34)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundColor: 'var(--color-bg, #F4F7FB)'
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: '2.5rem 2rem',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            color: 'var(--color-navy, #0B2545)',
            lineHeight: 1,
            marginBottom: '0.5rem',
            letterSpacing: '-1px'
          }}
        >
          404
        </div>

        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: 'var(--color-gold, #C59B27)',
            margin: '0.5rem auto 1.5rem auto',
            borderRadius: '2px'
          }}
        />

        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--color-navy, #0B2545)',
            marginBottom: '0.75rem'
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: '#475569',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}
        >
          The page or resource you are looking for does not exist on the KEAM Admission Portal server. It may have been moved, renamed, or is temporarily unavailable.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '1.75rem'
          }}
        >
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            Go to Home Page
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/login')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            Candidate Login
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/status')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            Track Status
          </Button>
        </div>

        <div
          style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: '1rem',
            fontSize: '0.82rem',
            color: '#64748B'
          }}
        >
          Need assistance? Contact the CEE Citizen Facilitation Centre at{' '}
          <strong style={{ color: 'var(--color-navy, #0B2545)' }}>0471-2335120</strong>.
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
