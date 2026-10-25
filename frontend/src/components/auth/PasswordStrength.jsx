// frontend/src/components/auth/PasswordStrength.jsx
// Live Password Strength Visualizer Component
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 23-24 (Dynamic Styling Based on State)

import React from 'react';

function PasswordStrength({ password = '' }) {
  // Calculate score (0 to 4)
  const calculateScore = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const score = calculateScore(password);

  const getTier = (s) => {
    switch (s) {
      case 1:
        return { label: 'Weak', color: '#EF4444', width: '25%' };
      case 2:
        return { label: 'Fair', color: '#F59E0B', width: '50%' };
      case 3:
        return { label: 'Good', color: '#3B82F6', width: '75%' };
      case 4:
        return { label: 'Strong', color: '#10B981', width: '100%' };
      default:
        return { label: '', color: '#E2E8F0', width: '0%' };
    }
  };

  if (!password) return null;

  const tier = getTier(score);

  return (
    <div style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>
      <div
        style={{
          height: '6px',
          width: '100%',
          backgroundColor: '#E2E8F0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: tier.width,
            backgroundColor: tier.color,
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          fontSize: 'var(--fs-xs)',
          color: tier.color,
          fontWeight: 'bold'
        }}
      >
        <span>Password Strength:</span>
        <span>{tier.label}</span>
      </div>
    </div>
  );
}

export default PasswordStrength;
