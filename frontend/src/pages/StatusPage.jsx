// frontend/src/pages/StatusPage.jsx
// Public Application Milestone Tracker Page
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 14, 86-88 (Public Status Tracking View)

import React, { useState } from 'react';
import StatusForm from '../components/status/StatusForm';
import MilestoneTracker from '../components/status/MilestoneTracker';

function StatusPage() {
  const [statusResult, setStatusResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async ({ appNo, dob }) => {
    setError('');
    setLoading(true);
    setStatusResult(null);

    try {
      const res = await fetch(`/api/admin/status/${appNo}?dob=${dob}`);
      const data = await res.json();
      if (data.success) {
        setStatusResult(data.data);
      } else {
        setError(data.message || 'No application record found for the provided details.');
      }
    } catch (err) {
      setError('Failed to reach tracking server. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '680px' }}>
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
          <h2 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
            Application Status Tracker
          </h2>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)' }}>
            Check your KEAM 2026 application progress, defect notifications, and verification status
          </p>
        </div>

        <StatusForm onSearch={handleTrack} loading={loading} />

        {error && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              borderRadius: '6px',
              fontSize: 'var(--fs-sm)',
              border: '1px solid #FCA5A5'
            }}
          >
            {error}
          </div>
        )}
      </div>

      {statusResult && <MilestoneTracker data={statusResult} />}
    </div>
  );
}

export default StatusPage;
