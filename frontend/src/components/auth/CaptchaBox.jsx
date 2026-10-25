// frontend/src/components/auth/CaptchaBox.jsx
// Alphanumeric CAPTCHA Generator Component
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 31–32, 38–41 (State & Event Handling)

import React, { useState, useEffect } from 'react';

function CaptchaBox({ onCaptchaChange }) {
  const [captchaCode, setCaptchaCode] = useState('');

  // Generate random 5-character alphanumeric string
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude confusing chars like 0, O, 1, I
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    if (onCaptchaChange) {
      onCaptchaChange(result);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        margin: '0.5rem 0 1rem'
      }}
    >
      {/* CAPTCHA Visual Badge */}
      <div
        style={{
          flex: 1,
          padding: '0.6rem 1rem',
          backgroundColor: '#E2E8F0',
          backgroundImage: 'radial-gradient(#CBD5E1 15%, transparent 16%)',
          backgroundSize: '8px 8px',
          borderRadius: '4px',
          border: '1px solid #CBD5E1',
          letterSpacing: '8px',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          color: 'var(--color-navy)',
          textAlign: 'center',
          userSelect: 'none',
          fontFamily: 'monospace',
          textDecoration: 'line-through'
        }}
      >
        {captchaCode}
      </div>

      {/* Refresh Button */}
      <button
        type="button"
        onClick={generateCaptcha}
        title="Generate new CAPTCHA"
        className="btn btn--secondary"
        style={{ padding: '0.6rem 0.85rem' }}
      >
        🔄 Refresh
      </button>
    </div>
  );
}

export default CaptchaBox;
