// frontend/src/components/status/StatusForm.jsx
// Public Application Tracking Form Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 86-88 (Controlled Components)

import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';

function StatusForm({ onSearch, loading = false }) {
  const [appNo, setAppNo] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appNo.trim() || !dob) return;
    onSearch({ appNo: appNo.trim(), dob });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <InputField
        id="status-appNo"
        name="status-appNo"
        label="Application Number"
        type="text"
        placeholder="e.g. 2648219"
        value={appNo}
        onChange={(e) => setAppNo(e.target.value)}
        required
      />

      <InputField
        id="status-dob"
        name="status-dob"
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
      >
        {loading ? 'Checking Application Database...' : 'Track Application Status'}
      </Button>
    </form>
  );
}

export default StatusForm;
