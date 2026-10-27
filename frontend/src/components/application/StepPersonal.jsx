// frontend/src/components/application/StepPersonal.jsx
// Step 1: Personal Details Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 86-88 (Controlled Components with Strict Validation)

import React, { useState } from 'react';

function StepPersonal({ data, onUpdate, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.candidateName?.trim()) errs.candidateName = 'Candidate full name is required';
    if (!data.dob?.trim()) errs.dob = 'Date of birth is required';
    if (!data.gender) errs.gender = 'Gender selection is required';
    if (!data.category) errs.category = 'Category is required';
    if (!data.fatherName?.trim()) errs.fatherName = "Father's name is required";
    if (!data.motherName?.trim()) errs.motherName = "Mother's name is required";
    if (!data.nationality?.trim()) errs.nationality = 'Nationality is required';
    if (!data.aadhaarNumber?.trim() || data.aadhaarNumber.length !== 12) {
      errs.aadhaarNumber = 'Valid 12-digit Aadhaar number is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAutoFillSample = () => {
    onUpdate({
      fatherName: data.fatherName || 'Mohan Kumar',
      motherName: data.motherName || 'Lakshmi Kumar',
      guardianName: data.guardianName || 'Mohan Kumar',
      guardianOccupation: 'Government Service',
      nationality: 'Indian',
      aadhaarNumber: data.aadhaarNumber || '987654321098'
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
          <h2 className="form-card__title">Step 1: Personal Details</h2>
          <p className="form-card__desc">
            Enter your personal information as it appears in your official Class 10 certificate. All fields marked with <span style={{ color: 'var(--color-error)' }}>*</span> are mandatory.
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
        {/* Row 1: Name and DOB */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="candidateName">
              Full Name <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="candidateName"
              className={`form-input ${errors.candidateName ? 'form-input--error' : ''}`}
              placeholder="As in SSLC / 10th certificate"
              value={data.candidateName || ''}
              onChange={(e) => {
                onUpdate({ candidateName: e.target.value });
                if (errors.candidateName) setErrors({ ...errors, candidateName: '' });
              }}
              required
            />
            {errors.candidateName && <span className="form-error form-error--visible">{errors.candidateName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="dob">
              Date of Birth <span className="form-label__required">*</span>
            </label>
            <input
              type="date"
              id="dob"
              className={`form-input ${errors.dob ? 'form-input--error' : ''}`}
              value={data.dob || ''}
              onChange={(e) => {
                onUpdate({ dob: e.target.value });
                if (errors.dob) setErrors({ ...errors, dob: '' });
              }}
              required
            />
            {errors.dob && <span className="form-error form-error--visible">{errors.dob}</span>}
          </div>
        </div>

        {/* Row 2: Gender and Category */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label">
              Gender <span className="form-label__required">*</span>
            </label>
            <div className="form-radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === 'male' || data.gender === 'Male'}
                  onChange={(e) => {
                    onUpdate({ gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: '' });
                  }}
                />
                Male
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === 'female' || data.gender === 'Female'}
                  onChange={(e) => {
                    onUpdate({ gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: '' });
                  }}
                />
                Female
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={data.gender === 'other' || data.gender === 'Other'}
                  onChange={(e) => {
                    onUpdate({ gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: '' });
                  }}
                />
                Other
              </label>
            </div>
            {errors.gender && <span className="form-error form-error--visible">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category <span className="form-label__required">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? 'form-select--error' : ''}`}
              value={data.category || ''}
              onChange={(e) => {
                onUpdate({ category: e.target.value });
                if (errors.category) setErrors({ ...errors, category: '' });
              }}
              required
            >
              <option value="">Select category</option>
              <option value="General">General</option>
              <option value="OBC">OBC (Non-Creamy Layer)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="OBH">OBH (Other Backward Hindu)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
            </select>
            {errors.category && <span className="form-error form-error--visible">{errors.category}</span>}
          </div>
        </div>

        {/* Row 3: Parents' Names */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="fatherName">
              Father's Name <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="fatherName"
              className={`form-input ${errors.fatherName ? 'form-input--error' : ''}`}
              placeholder="Full name of father"
              value={data.fatherName || ''}
              onChange={(e) => {
                onUpdate({ fatherName: e.target.value });
                if (errors.fatherName) setErrors({ ...errors, fatherName: '' });
              }}
              required
            />
            {errors.fatherName && <span className="form-error form-error--visible">{errors.fatherName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="motherName">
              Mother's Name <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="motherName"
              className={`form-input ${errors.motherName ? 'form-input--error' : ''}`}
              placeholder="Full name of mother"
              value={data.motherName || ''}
              onChange={(e) => {
                onUpdate({ motherName: e.target.value });
                if (errors.motherName) setErrors({ ...errors, motherName: '' });
              }}
              required
            />
            {errors.motherName && <span className="form-error form-error--visible">{errors.motherName}</span>}
          </div>
        </div>

        {/* Row 4: Nationality & Aadhaar */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="nationality">
              Nationality <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="nationality"
              className={`form-input ${errors.nationality ? 'form-input--error' : ''}`}
              value={data.nationality || 'Indian'}
              onChange={(e) => {
                onUpdate({ nationality: e.target.value });
                if (errors.nationality) setErrors({ ...errors, nationality: '' });
              }}
              required
            />
            {errors.nationality && <span className="form-error form-error--visible">{errors.nationality}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="aadhaarNumber">
              Aadhaar Number (12 Digits) <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              maxLength="12"
              className={`form-input ${errors.aadhaarNumber ? 'form-input--error' : ''}`}
              placeholder="12-digit Aadhaar number"
              value={data.aadhaarNumber || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                onUpdate({ aadhaarNumber: val });
                if (errors.aadhaarNumber) setErrors({ ...errors, aadhaarNumber: '' });
              }}
              required
            />
            {errors.aadhaarNumber && <span className="form-error form-error--visible">{errors.aadhaarNumber}</span>}
          </div>
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.25rem 2rem' }}>
        <button type="submit" className="btn btn--primary">
          Continue to Academic Details
        </button>
      </div>
    </form>
  );
}

export default StepPersonal;
