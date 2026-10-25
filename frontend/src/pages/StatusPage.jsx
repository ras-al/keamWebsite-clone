// frontend/src/pages/StatusPage.jsx
// Assigned to Shan M A (B24CSA59)

import React, { useState } from 'react';

function StatusPage() {
  const [appNo, setAppNo] = useState('');
  const [dob, setDob] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!appNo || !dob) {
      setError('Please provide both application number and date of birth.');
      return;
    }
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
      setError('Failed to reach tracking server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '600px' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ color: 'var(--color-navy)', marginBottom: '1rem', textAlign: 'center' }}>Application Status Tracker</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Check your KEAM 2026 application verification status using your application number and DOB.
        </p>

        <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Application Number</label>
            <input
              type="text"
              value={appNo}
              onChange={(e) => setAppNo(e.target.value)}
              placeholder="e.g. 2600001"
              required
              className="form-input"
              style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="form-input"
              style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Querying Status...' : 'Check Status'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}>
            {error}
          </div>
        )}

        {statusResult && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '6px' }}>
            <h3 style={{ color: '#065F46', fontSize: 'var(--fs-md)', marginBottom: '0.5rem' }}>Status: {statusResult.status}</h3>
            <p style={{ fontSize: 'var(--fs-sm)', color: '#047857' }}>
              <strong>Candidate:</strong> {statusResult.candidateName}<br />
              <strong>App No:</strong> {statusResult.applicationNumber}<br />
              <strong>Remarks:</strong> {statusResult.remarks || 'No defect remarks.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusPage;
