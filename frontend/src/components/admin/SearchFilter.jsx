// frontend/src/components/admin/SearchFilter.jsx
// Admin Search and Filter Controls Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 86–88 (Controlled Inputs & Form Handling)

import React from 'react';

function SearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  onReset
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        padding: '1.25rem',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {/* Search Input */}
      <div style={{ flex: '2 1 240px' }}>
        <label
          htmlFor="admin-search"
          style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
        >
          Search Candidate
        </label>
        <input
          id="admin-search"
          type="text"
          placeholder="Search by name or 7-digit App No..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-input"
          style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
        />
      </div>

      {/* Status Filter */}
      <div style={{ flex: '1 1 150px' }}>
        <label
          htmlFor="admin-status"
          style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
        >
          Status Filter
        </label>
        <select
          id="admin-status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="form-select"
          style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
        >
          <option value="all">All Statuses</option>
          <option value="Submitted">Submitted (Pending)</option>
          <option value="Approved">Approved</option>
          <option value="Defective">Defective</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Course/Category Filter */}
      <div style={{ flex: '1 1 150px' }}>
        <label
          htmlFor="admin-category"
          style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}
        >
          Course Stream
        </label>
        <select
          id="admin-category"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form-select"
          style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
        >
          <option value="all">All Courses</option>
          <option value="Engineering">Engineering</option>
          <option value="Medical">Medical</option>
          <option value="Architecture">Architecture</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
      </div>

      {/* Reset Button */}
      <div style={{ alignSelf: 'flex-end' }}>
        <button
          type="button"
          onClick={onReset}
          className="btn btn--secondary"
          style={{ padding: '0.6rem 1rem', fontSize: 'var(--fs-sm)' }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
