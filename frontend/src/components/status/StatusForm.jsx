// frontend/src/components/status/StatusForm.jsx
// Public Application Tracking Form Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 86-88 (Controlled Components)

import React, { useState } from 'react';

function StatusForm({ onSearch, loading = false }) {
  const [appNo, setAppNo] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appNo.trim() || !dob) return;
    onSearch({ appNo: appNo.trim(), dob });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          htmlFor="status-appNo"
          style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
        >
          Application Number <span style={{ color: '#DC2626' }}>*</span>
        </label>
        <input
          id="status-appNo"
          type="text"
          placeholder="e.g. 2648219"
          value={appNo}
          onChange={(e) => setAppNo(e.target.value)}
          required
          className="form-input"
          style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
        />
      </div>

      <div>
        <label
          htmlFor="status-dob"
          style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
        >
          Date of Birth <span style={{ color: '#DC2626' }}>*</span>
        </label>
        <input
          id="status-dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="form-input"
          style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
        disabled={loading}
      >
        {loading ? 'Checking Application Database...' : 'Track Application Status'}
      </button>
    </form>
  );
}

export default StatusForm;
