// frontend/src/components/admin/TableRow.jsx
// Admin Applications Table Single Row Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 50-51 (Reusable Components & Props)

import React from 'react';

function TableRow({ application, onReview }) {
  const {
    _id,
    applicationNumber,
    personalDetails = {},
    status = 'Submitted',
    courseSelections = [],
    createdAt
  } = application;

  const candidateName = personalDetails.candidateName || 'N/A';
  const category = personalDetails.category || 'General';
  const courses = Array.isArray(courseSelections) && courseSelections.length > 0
    ? courseSelections.join(', ')
    : 'Not Specified';

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'N/A';

  // Badge styling based on application status
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'Approved':
        return { backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC' };
      case 'Rejected':
        return { backgroundColor: '#FEE2E2', color: '#B91C1C', border: '1px solid #FCA5A5' };
      case 'Defective':
        return { backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FCD34D' };
      default:
        return { backgroundColor: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' };
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.15s' }}>
      <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--color-navy)' }}>
        {applicationNumber}
      </td>
      <td style={{ padding: '0.85rem 1rem', fontWeight: '500' }}>
        {candidateName}
      </td>
      <td style={{ padding: '0.85rem 1rem', color: 'var(--color-mid-gray)', fontSize: 'var(--fs-sm)' }}>
        {category}
      </td>
      <td style={{ padding: '0.85rem 1rem', fontSize: 'var(--fs-sm)' }}>
        {courses}
      </td>
      <td style={{ padding: '0.85rem 1rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            fontSize: 'var(--fs-xs)',
            fontWeight: '600',
            ...getBadgeStyle(status)
          }}
        >
          {status}
        </span>
      </td>
      <td style={{ padding: '0.85rem 1rem', color: 'var(--color-mid-gray)', fontSize: 'var(--fs-xs)' }}>
        {formattedDate}
      </td>
      <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => onReview(application)}
          className="btn btn--secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: 'var(--fs-xs)' }}
        >
          Review
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
