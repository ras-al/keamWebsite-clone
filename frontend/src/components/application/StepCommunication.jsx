// frontend/src/components/application/StepCommunication.jsx
// Step 3: Communication & Address Details Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 86-88 (Controlled Components with Strict Regex Validation)

import React, { useState } from 'react';

const KERALA_DISTRICTS = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
];

function StepCommunication({ data, onUpdate, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.permanentAddress?.trim()) errs.permanentAddress = 'Permanent address is required';
    if (!data.district) errs.district = 'Please select your district';
    if (!data.state?.trim()) errs.state = 'State is required';
    
    // PIN code validation: 6 digits
    if (!data.pincode?.trim() || !/^\d{6}$/.test(data.pincode.trim())) {
      errs.pincode = 'Please enter a valid 6-digit PIN code';
    }

    // Mobile number validation: 10 digits
    if (!data.mobileNumber?.trim() || !/^\d{10}$/.test(data.mobileNumber.trim())) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email?.trim() || !emailRegex.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!data.examCenterPref?.trim()) {
      errs.examCenterPref = 'Please select your preferred examination center';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAutoFillSample = () => {
    onUpdate({
      permanentAddress: data.permanentAddress || 'TC 14/230, Near Medical College, Kowdiar PO',
      district: data.district || 'Thiruvananthapuram',
      state: 'Kerala',
      pincode: data.pincode || '695003',
      examCenterPref: data.examCenterPref || 'Thiruvananthapuram'
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card" noValidate>
      <div className="form-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 className="form-card__title">Step 3: Communication Details</h2>
          <p className="form-card__desc">
            Provide your permanent residential address and valid contact credentials. All fields marked with <span style={{ color: 'var(--color-error)' }}>*</span> are mandatory.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAutoFillSample}
          className="btn btn--outline"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
        >
          Auto-Fill Sample Data
        </button>
      </div>

      <div className="form-card__body">
        {/* Permanent Address */}
        <div className="form-group">
          <label className="form-label" htmlFor="permanentAddress">
            Permanent Address <span className="form-label__required">*</span>
          </label>
          <textarea
            id="permanentAddress"
            rows="3"
            className={`form-input ${errors.permanentAddress ? 'form-input--error' : ''}`}
            placeholder="House name/number, street, locality"
            value={data.permanentAddress || ''}
            onChange={(e) => {
              onUpdate({ permanentAddress: e.target.value });
              if (errors.permanentAddress) setErrors({ ...errors, permanentAddress: '' });
            }}
            required
          ></textarea>
          {errors.permanentAddress && (
            <span className="form-error form-error--visible">{errors.permanentAddress}</span>
          )}
        </div>

        {/* Row 1: District and State */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="district">
              District <span className="form-label__required">*</span>
            </label>
            <select
              id="district"
              className={`form-select ${errors.district ? 'form-select--error' : ''}`}
              value={data.district || 'Thiruvananthapuram'}
              onChange={(e) => {
                onUpdate({ district: e.target.value });
                if (errors.district) setErrors({ ...errors, district: '' });
              }}
              required
            >
              <option value="">Select district</option>
              {KERALA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            {errors.district && <span className="form-error form-error--visible">{errors.district}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="state">
              State <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="state"
              className={`form-input ${errors.state ? 'form-input--error' : ''}`}
              value={data.state || 'Kerala'}
              onChange={(e) => {
                onUpdate({ state: e.target.value });
                if (errors.state) setErrors({ ...errors, state: '' });
              }}
              required
            />
            {errors.state && <span className="form-error form-error--visible">{errors.state}</span>}
          </div>
        </div>

        {/* Row 2: PIN Code and Exam Center Preference */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="pincode">
              PIN Code <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              maxLength="6"
              className={`form-input ${errors.pincode ? 'form-input--error' : ''}`}
              placeholder="e.g. 695001"
              value={data.pincode || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                onUpdate({ pincode: val });
                if (errors.pincode) setErrors({ ...errors, pincode: '' });
              }}
              required
            />
            {errors.pincode && <span className="form-error form-error--visible">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="examCenterPref">
              Preferred Examination Center <span className="form-label__required">*</span>
            </label>
            <select
              id="examCenterPref"
              className={`form-select ${errors.examCenterPref ? 'form-select--error' : ''}`}
              value={data.examCenterPref || data.district || 'Thiruvananthapuram'}
              onChange={(e) => {
                onUpdate({ examCenterPref: e.target.value });
                if (errors.examCenterPref) setErrors({ ...errors, examCenterPref: '' });
              }}
              required
            >
              <option value="">Select Exam Center</option>
              {KERALA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Dubai (UAE)">Dubai (UAE)</option>
            </select>
            {errors.examCenterPref && <span className="form-error form-error--visible">{errors.examCenterPref}</span>}
          </div>
        </div>

        {/* Row 3: Mobile Number and Email */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="mobileNumber">
              Mobile Number (10 Digits) <span className="form-label__required">*</span>
            </label>
            <input
              type="tel"
              id="mobileNumber"
              maxLength="10"
              className={`form-input ${errors.mobileNumber ? 'form-input--error' : ''}`}
              placeholder="e.g. 9876543210"
              value={data.mobileNumber || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                onUpdate({ mobileNumber: val });
                if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
              }}
              required
            />
            {errors.mobileNumber && (
              <span className="form-error form-error--visible">{errors.mobileNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address <span className="form-label__required">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              placeholder="candidate@example.com"
              value={data.email || ''}
              onChange={(e) => {
                onUpdate({ email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              required
            />
            {errors.email && <span className="form-error form-error--visible">{errors.email}</span>}
          </div>
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
        <button type="button" onClick={onPrev} className="btn btn--outline">
          Back to Academic
        </button>
        <button type="submit" className="btn btn--primary">
          Continue to Document Uploads
        </button>
      </div>
    </form>
  );
}

export default StepCommunication;
