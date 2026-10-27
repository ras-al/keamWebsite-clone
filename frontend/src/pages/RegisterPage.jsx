// frontend/src/pages/RegisterPage.jsx
// Candidate Registration Component
// Author: Safdil Arafath (B24CSA50)
// Study Reference: Slides 86-88 (Controlled Components, Event Handling, Validation)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrength from '../components/auth/PasswordStrength';
import SuccessModal from '../components/auth/SuccessModal';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';
import Button from '../components/common/Button';

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
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Reusable InputField for Full Name */}
          <InputField
            id="fullName"
            name="fullName"
            label="Full Name (as in Class 10 Certificate)"
            type="text"
            placeholder="e.g. Rahul Krishnan"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InputField
              id="dob"
              name="dob"
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <SelectField
              id="gender"
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              options={['Male', 'Female', 'Transgender']}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InputField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="candidate@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <InputField
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              type="tel"
              placeholder="10-digit mobile"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <SelectField
            id="category"
            name="category"
            label="Reservation Category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'General', label: 'General / Open Merit' },
              { value: 'OBC', label: 'Other Backward Classes (OBC)' },
              { value: 'EWS', label: 'Economically Weaker Sections (EWS)' },
              { value: 'SC', label: 'Scheduled Caste (SC)' },
              { value: 'ST', label: 'Scheduled Tribe (ST)' }
            ]}
            required
          />

          <div>
            <InputField
              id="password"
              name="password"
              label="Choose Password (min 6 characters)"
              type="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Live Password Strength Meter */}
            <PasswordStrength password={formData.password} />
          </div>

          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
          >
            {loading ? 'Submitting Registration...' : 'Register & Generate Application No'}
          </Button>
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
