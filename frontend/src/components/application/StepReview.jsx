// frontend/src/components/application/StepReview.jsx
// Step 6: Application Review & Submission Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 86-87 (Form Review, Controlled Declarations & Submit Handler)

import React, { useState } from 'react';

function StepReview({ data, files = {}, onSubmit, onPrev, isSubmitting, submitError }) {
  const [declared, setDeclared] = useState(false);
  const [error, setError] = useState('');

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!declared) {
      setError('You must confirm the official declaration before submitting your application.');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Step 6: Review &amp; Final Submit</h2>
        <p className="form-card__desc">
          Carefully review all your information before final submission. Changes cannot be made after submission.
        </p>
      </div>

      <div className="form-card__body">
        {(submitError || error) && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              padding: '0.85rem 1.25rem',
              borderRadius: '6px',
              marginBottom: '1.5rem',
              fontSize: 'var(--fs-sm)'
            }}
          >
            {submitError || error}
          </div>
        )}

        {/* Section 1: Personal Details Review */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#F1F5F9', padding: '0.65rem 1rem', fontWeight: 'bold', color: 'var(--color-navy)', fontSize: 'var(--fs-sm)' }}>
            1. Personal Details
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', width: '35%', color: 'var(--color-mid-gray)' }}>Candidate Name</td>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>{data.candidateName || '-'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Date of Birth &amp; Gender</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.dob || '-'} ({data.gender || '-'})</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Category &amp; Nationality</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.category || '-'} ({data.nationality || 'Indian'})</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Father's Name</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.fatherName || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Mother's Name</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.motherName || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Academic Details Review */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#F1F5F9', padding: '0.65rem 1rem', fontWeight: 'bold', color: 'var(--color-navy)', fontSize: 'var(--fs-sm)' }}>
            2. Academic Background
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', width: '35%', color: 'var(--color-mid-gray)' }}>Qualifying Exam</td>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>{data.qualifyingExam || '-'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Board &amp; Year</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.board || '-'} ({data.passYear || '2026'})</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>School Last Attended</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.schoolName || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Percentage of Marks</td>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                  {data.percentage ? `${data.percentage}%` : '-'} {data.totalMarks ? `(${data.totalMarks} marks)` : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Communication Details Review */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#F1F5F9', padding: '0.65rem 1rem', fontWeight: 'bold', color: 'var(--color-navy)', fontSize: 'var(--fs-sm)' }}>
            3. Communication &amp; Address
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', width: '35%', color: 'var(--color-mid-gray)' }}>Permanent Address</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.permanentAddress || '-'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>District, State &amp; PIN</td>
                <td style={{ padding: '0.65rem 1rem' }}>
                  {data.district || '-'}, {data.state || 'Kerala'} - {data.pincode || '-'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Mobile &amp; Email</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.mobileNumber || '-'} | {data.email || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Exam Center Preference</td>
                <td style={{ padding: '0.65rem 1rem' }}>{data.examCenterPref || data.district || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Document Uploads & Fee Payment Status */}
        <div style={{ marginBottom: '1.5rem', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#F1F5F9', padding: '0.65rem 1rem', fontWeight: 'bold', color: 'var(--color-navy)', fontSize: 'var(--fs-sm)' }}>
            4. Uploads &amp; Fee Status
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.65rem 1rem', width: '35%', color: 'var(--color-mid-gray)' }}>Attached Documents</td>
                <td style={{ padding: '0.65rem 1rem' }}>
                  {files.photo ? 'Photograph Attached' : '- No photo selected'},{' '}
                  {files.signature ? 'Signature Attached' : '- No signature'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 1rem', color: 'var(--color-mid-gray)' }}>Payment Status</td>
                <td style={{ padding: '0.65rem 1rem' }}>
                  <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                    {data.paymentStatus === 'Paid' ? 'Fee Paid' : 'Pending'}
                  </span>{' '}
                  (₹{data.paymentAmount || 800} via {data.paymentMode || 'UPI'} - Ref: {data.transactionId || 'N/A'})
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Candidate Declaration */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '6px',
            marginBottom: '1rem'
          }}
        >
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: 'var(--fs-sm)' }}>
            <input
              type="checkbox"
              checked={declared}
              onChange={(e) => {
                setDeclared(e.target.checked);
                if (e.target.checked) setError('');
              }}
              style={{ marginTop: '3px' }}
            />
            <span style={{ color: '#92400E' }}>
              <strong>Declaration:</strong> I hereby declare that all the information provided in this application is true, complete, and correct to the best of my knowledge and belief. I understand that any false information will result in cancellation of my candidature.
            </span>
          </label>
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
        <button type="button" onClick={onPrev} className="btn btn--outline" disabled={isSubmitting}>
          ← Back to Payment
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="btn btn--primary"
          disabled={isSubmitting}
          style={{ minWidth: '180px' }}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}

export default StepReview;
