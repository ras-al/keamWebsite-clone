// frontend/src/components/common/SelectField.jsx
// Reusable Controlled Select/Dropdown Component
// Author: Ayman Riaz (B24CSA17)
// Study Reference: Slides 86-88 (Controlled Components)

import React from 'react';

function SelectField({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  style = {}
}) {
  const selectId = id || name;

  return (
    <div className="form-group" style={{ marginBottom: '1rem', ...style }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            display: 'block',
            fontSize: 'var(--fs-xs)',
            fontWeight: '600',
            color: 'var(--color-navy)',
            marginBottom: '4px'
          }}
        >
          {label} {required && <span style={{ color: '#DC2626' }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="form-select"
        style={{
          width: '100%',
          padding: '0.65rem 0.75rem',
          fontSize: 'var(--fs-sm)',
          border: error ? '1px solid #DC2626' : 'var(--border-light)',
          borderRadius: '4px',
          outline: 'none',
          backgroundColor: disabled ? '#F1F5F9' : '#FFFFFF'
        }}
      >
        {options.map((opt) => {
          const optValue = typeof opt === 'object' ? opt.value : opt;
          const optLabel = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
      {error && (
        <span style={{ display: 'block', color: '#DC2626', fontSize: 'var(--fs-xs)', marginTop: '4px' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default SelectField;
