// frontend/src/components/common/InputField.jsx
// Reusable Controlled Form Input Component
// Author: Ayman Riaz (B24CSA17)
// Study Reference: Slides 86–88 (Controlled Components)

import React from 'react';

function InputField({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  disabled = false,
  style = {}
}) {
  const inputId = id || name;

  return (
    <div className="form-group" style={{ marginBottom: '1rem', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
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
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="form-input"
        style={{
          width: '100%',
          padding: '0.65rem 0.75rem',
          fontSize: 'var(--fs-sm)',
          border: error ? '1px solid #DC2626' : 'var(--border-light)',
          borderRadius: '4px',
          outline: 'none',
          backgroundColor: disabled ? '#F1F5F9' : '#FFFFFF'
        }}
      />
      {error && (
        <span style={{ display: 'block', color: '#DC2626', fontSize: 'var(--fs-xs)', marginTop: '4px' }}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span style={{ display: 'block', color: 'var(--color-mid-gray)', fontSize: 'var(--fs-xs)', marginTop: '4px' }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

export default InputField;
