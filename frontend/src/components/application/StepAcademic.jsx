// frontend/src/components/application/StepAcademic.jsx
// Step 2: Academic Details Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 86-88 (Controlled Components with Strict Validation)

import React, { useState } from 'react';

function StepAcademic({ data, onUpdate, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.qualifyingExam?.trim()) {
      errs.qualifyingExam = 'Qualifying examination is required';
    }
    if (!data.board?.trim()) {
      errs.board = 'Board or examination authority is required';
    }
    if (!data.passYear) {
      errs.passYear = 'Year of passing is required';
    }
    if (!data.rollNumber?.trim()) {
      errs.rollNumber = 'Board register / roll number is required';
    }
    if (!data.schoolName?.trim()) {
      errs.schoolName = 'School / institution name is required';
    }
    // For already passed candidates (2025 or earlier), require marks
    const isAppearing = data.passYear === '2026';
    if (!isAppearing) {
      if (!data.totalMarks?.toString().trim()) {
        errs.totalMarks = 'Total marks obtained is required for passed candidates';
      }
      if (!data.percentage?.toString().trim()) {
        errs.percentage = 'Percentage of marks is required for passed candidates';
      }
    }

    if (data.percentage?.toString().trim()) {
      const pct = parseFloat(data.percentage);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        errs.percentage = 'Please enter a valid percentage between 0 and 100';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAutoFillSample = () => {
    onUpdate({
      qualifyingExam: 'Plus Two (HSE Kerala)',
      board: 'DHSE Kerala',
      passYear: '2026',
      rollNumber: '8493012',
      schoolName: 'Govt Model Higher Secondary School',
      totalMarks: '560',
      percentage: '93.3'
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
          <h2 className="form-card__title">Step 2: Academic Details</h2>
          <p className="form-card__desc">
            Enter your qualifying examination background (Plus Two / Class 12 or equivalent). All fields marked with <span style={{ color: 'var(--color-error)' }}>*</span> are mandatory.
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
        {/* Row 1: Exam & Board */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="qualifyingExam">
              Qualifying Examination <span className="form-label__required">*</span>
            </label>
            <select
              id="qualifyingExam"
              className={`form-select ${errors.qualifyingExam ? 'form-select--error' : ''}`}
              value={data.qualifyingExam || 'Plus Two (HSE Kerala)'}
              onChange={(e) => {
                onUpdate({ qualifyingExam: e.target.value });
                if (errors.qualifyingExam) setErrors({ ...errors, qualifyingExam: '' });
              }}
              required
            >
              <option value="Plus Two (HSE Kerala)">Plus Two (HSE Kerala)</option>
              <option value="VHSE Kerala">VHSE Kerala</option>
              <option value="CBSE Class 12">CBSE (Class XII)</option>
              <option value="CISCE (ISC Class 12)">CISCE (ISC Class XII)</option>
              <option value="Other State Board">Other State Board</option>
            </select>
            {errors.qualifyingExam && <span className="form-error form-error--visible">{errors.qualifyingExam}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="board">
              Board / Examination Authority <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="board"
              className={`form-input ${errors.board ? 'form-input--error' : ''}`}
              placeholder="e.g. DHSE Kerala or CBSE"
              value={data.board || 'DHSE Kerala'}
              onChange={(e) => {
                onUpdate({ board: e.target.value });
                if (errors.board) setErrors({ ...errors, board: '' });
              }}
              required
            />
            {errors.board && <span className="form-error form-error--visible">{errors.board}</span>}
          </div>
        </div>

        {/* Row 2: Year of Passing & Roll Number */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="passYear">
              Year of Passing <span className="form-label__required">*</span>
            </label>
            <select
              id="passYear"
              className={`form-select ${errors.passYear ? 'form-select--error' : ''}`}
              value={data.passYear || '2026'}
              onChange={(e) => {
                onUpdate({ passYear: e.target.value });
                if (errors.passYear) setErrors({ ...errors, passYear: '' });
              }}
              required
            >
              <option value="2026">2026 (Appearing)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            {errors.passYear && <span className="form-error form-error--visible">{errors.passYear}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rollNumber">
              Board Register / Roll Number <span className="form-label__required">*</span>
            </label>
            <input
              type="text"
              id="rollNumber"
              className={`form-input ${errors.rollNumber ? 'form-input--error' : ''}`}
              placeholder="e.g. 8493012"
              value={data.rollNumber || ''}
              onChange={(e) => {
                onUpdate({ rollNumber: e.target.value });
                if (errors.rollNumber) setErrors({ ...errors, rollNumber: '' });
              }}
              required
            />
            {errors.rollNumber && <span className="form-error form-error--visible">{errors.rollNumber}</span>}
          </div>
        </div>

        {/* Row 3: School Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="schoolName">
            School / Institution Name <span className="form-label__required">*</span>
          </label>
          <input
            type="text"
            id="schoolName"
            className={`form-input ${errors.schoolName ? 'form-input--error' : ''}`}
            placeholder="Name and place of school last attended"
            value={data.schoolName || ''}
            onChange={(e) => {
              onUpdate({ schoolName: e.target.value });
              if (errors.schoolName) setErrors({ ...errors, schoolName: '' });
            }}
            required
          />
          {errors.schoolName && <span className="form-error form-error--visible">{errors.schoolName}</span>}
        </div>

        {/* Row 4: Total Marks & Percentage */}
        <div className="form-row form-row--2col">
          <div className="form-group">
            <label className="form-label" htmlFor="totalMarks">
              Total Marks Obtained <span className="form-label__required">*</span>
            </label>
            <input
              type="number"
              id="totalMarks"
              className={`form-input ${errors.totalMarks ? 'form-input--error' : ''}`}
              placeholder="e.g. 480 (out of 500/600)"
              value={data.totalMarks || ''}
              onChange={(e) => {
                onUpdate({ totalMarks: e.target.value });
                if (errors.totalMarks) setErrors({ ...errors, totalMarks: '' });
              }}
              required
            />
            {errors.totalMarks && <span className="form-error form-error--visible">{errors.totalMarks}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="percentage">
              Percentage of Marks (%) <span className="form-label__required">*</span>
            </label>
            <input
              type="number"
              id="percentage"
              step="0.01"
              min="0"
              max="100"
              className={`form-input ${errors.percentage ? 'form-input--error' : ''}`}
              placeholder="e.g. 96.00"
              value={data.percentage || ''}
              onChange={(e) => {
                onUpdate({ percentage: e.target.value });
                if (errors.percentage) setErrors({ ...errors, percentage: '' });
              }}
              required
            />
            {errors.percentage && <span className="form-error form-error--visible">{errors.percentage}</span>}
          </div>
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
        <button type="button" onClick={onPrev} className="btn btn--outline">
          Back to Personal
        </button>
        <button type="submit" className="btn btn--primary">
          Continue to Communication
        </button>
      </div>
    </form>
  );
}

export default StepAcademic;
