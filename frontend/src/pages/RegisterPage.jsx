// frontend/src/pages/RegisterPage.jsx
// Candidate Registration Component
// Assigned to Safdil Arafath (B24CSA50)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobileNumber: '',
    gender: 'male',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          dob: formData.dob,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          gender: formData.gender,
          category: formData.category,
          password: formData.password
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setRegisteredCandidate(data.data);
      } else {
        setError(data.message || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      setError('Failed to reach registration server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '520px' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <h2 style={{ color: 'var(--color-navy)', marginBottom: '1rem', textAlign: 'center' }}>Candidate Registration</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Register to generate your official KEAM 2026 Application Number.
        </p>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1.25rem' }}>
            ⚠️ {error}
          </div>
        )}

        {registeredCandidate ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#DCFCE7', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1rem' }}>
              ✓
            </div>
            <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Registration Successful!</h3>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-dark-gray)', marginBottom: '1.25rem' }}>
              Please note down your Application Number carefully. You will need it to sign in.
            </p>

            <div style={{ backgroundColor: '#F1F5F9', padding: '1.25rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', textTransform: 'uppercase' }}>
                Your Application Number
              </div>
              <div style={{ fontSize: 'var(--fs-2xl)', fontWeight: 'bold', color: 'var(--color-navy)', letterSpacing: '2px', marginTop: '4px' }}>
                {registeredCandidate.applicationNumber}
              </div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-dark-gray)', marginTop: '4px' }}>
                Name: <strong>{registeredCandidate.fullName}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={() => navigate('/login')}
              style={{ width: '100%', padding: '0.75rem' }}
            >
              Proceed to Candidate Login →
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Full Name <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="text"
                name="fullName"
                placeholder="As in Class 10 Certificate"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Date of Birth <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Gender <span style={{ color: 'var(--color-error)' }}>*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                  style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Category <span style={{ color: 'var(--color-error)' }}>*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                  style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                  required
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBH">OBH</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Email Address <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="candidate@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Mobile Number <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="tel"
                name="mobileNumber"
                maxLength="10"
                placeholder="10-digit mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Create Password <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'bold' }}>Confirm Password <span style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%', padding: '0.65rem', border: 'var(--border-light)', borderRadius: '4px', marginTop: '4px' }}
                required
              />
            </div>

            <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        )}

        {!registeredCandidate && (
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--fs-sm)' }}>
            Already registered? <Link to="/login">Login Here</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
