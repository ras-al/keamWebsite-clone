// frontend/src/components/admin/ApplicationTable.jsx
// Admin Applications Data Table Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 48-51 (Lists, Keys & Reusable Table)

import React from 'react';
import TableRow from './TableRow';

function ApplicationTable({ applications = [], onReview, loading = false }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-mid-gray)' }}>
        <p>Loading application records from database...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '6px',
          border: '1px dashed #CBD5E1',
          color: 'var(--color-mid-gray)'
        }}
      >
        <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}></p>
        <p style={{ fontWeight: '600', color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
          No applications found
        </p>
        <p style={{ fontSize: 'var(--fs-sm)' }}>
          No candidate applications match the selected filter criteria or database is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--fs-sm)' }}>
        <thead>
          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: 'var(--color-navy)', textTransform: 'uppercase', fontSize: 'var(--fs-xs)', letterSpacing: '0.5px' }}>
            <th style={{ padding: '0.85rem 1rem' }}>App No</th>
            <th style={{ padding: '0.85rem 1rem' }}>Candidate Name</th>
            <th style={{ padding: '0.85rem 1rem' }}>Category</th>
            <th style={{ padding: '0.85rem 1rem' }}>Courses</th>
            <th style={{ padding: '0.85rem 1rem' }}>Status</th>
            <th style={{ padding: '0.85rem 1rem' }}>Submitted On</th>
            <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <TableRow key={app._id} application={app} onReview={onReview} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;
