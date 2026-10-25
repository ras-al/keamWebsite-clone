// frontend/src/components/common/Button.jsx
// Reusable UI Button Component
// Author: Ayman Riaz (B24CSA17)
// Study Reference: Slides 50–51 (Component Props & Reusability)

import React from 'react';

function Button({
  text,
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  style = {}
}) {
  const baseClass = `btn btn--${variant} ${className}`.trim();

  return (
    <button
      type={type}
      className={baseClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text || children}
    </button>
  );
}

export default Button;
