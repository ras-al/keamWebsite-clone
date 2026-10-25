// frontend/src/pages/RegisterPage.jsx
// Candidate Registration Component
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 86–88 (Controlled Components, Event Handling, Validation)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrength from '../components/auth/PasswordStrength';
import SuccessModal from '../components/auth/SuccessModal';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobileNumber: '',
    gender: 'Male',
    category: 'General',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredCandidate, setRegisteredCandidate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!formData.dob) {
      setError('Please select your date of birth.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobileNumber.trim())) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          dob: formData.dob,
          email: formData.email.trim().toLowerCase(),
          mobileNumber: formData.mobileNumber.trim(),
          gender: formData.gender,
          category: formData.category,
          password: formData.password
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setRegisteredCandidate(data.data);
      } else {
        setError(data.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setError('Failed to reach registration server. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '560px' }}>
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
          <h2 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>Candidate Registration</h2>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)' }}>
            Register to generate your official KEAM 2026 Application Number
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: 'var(--fs-sm)',
              marginBottom: '1.25rem',
              border: '1px solid #FCA5A5'
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Full Name (as in Class 10 Certificate) <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Rahul Krishnan"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Date of Birth <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Gender <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Email Address <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="candidate@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Mobile Number <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="10-digit mobile"
                maxLength="10"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Reservation Category <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
            >
              <option value="General">General / Open Merit</option>
              <option value="OBC">Other Backward Classes (OBC)</option>
              <option value="EWS">Economically Weaker Sections (EWS)</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Choose Password (min 6 characters) <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
            />
            {/* Live Password Strength Meter */}
            <PasswordStrength password={formData.password} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Confirm Password <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Submitting Registration...' : 'Register & Generate Application No'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
          Already have an application number?{' '}
          <Link to="/login" style={{ color: 'var(--color-navy)', fontWeight: 'bold' }}>
            Login Here
          </Link>
        </div>
      </div>

      {/* Registration Success Confirmation Modal */}
      {registeredCandidate && (
        <SuccessModal
          candidateData={registeredCandidate}
          onClose={() => setRegisteredCandidate(null)}
        />
      )}
    </div>
  );
}

export default RegisterPage;
