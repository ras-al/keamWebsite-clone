// frontend/src/components/admin/StatusModal.jsx
// Admin Application Verification & Status Update Modal Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 56–57 (Modals & State Callbacks)

import React, { useState } from 'react';

function StatusModal({ application, onClose, onStatusUpdated }) {
  if (!application) return null;

  const [newStatus, setNewStatus] = useState(application.status || 'Approved');
  const [remarks, setRemarks] = useState(application.remarks || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    _id,
    applicationNumber,
    personalDetails = {},
    academicDetails = {},
    communicationDetails = {},
    documents = {},
    paymentDetails = {}
  } = application;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/applications/${_id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          remarks: remarks.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        onStatusUpdated(data.data);
        onClose();
      } else {
        setError(data.message || 'Failed to update application status.');
      }
    } catch (err) {
      setError('Communication error. Failed to reach backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div>
            <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.15rem' }}>
              Verify Application #{applicationNumber}
            </h3>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)' }}>
              Candidate: {personalDetails.candidateName || 'N/A'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-mid-gray)'
            }}
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1rem' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Candidate Dossier Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: 'var(--fs-sm)' }}>
            <div>
              <strong>Gender / DOB:</strong> {personalDetails.gender || 'N/A'} | {personalDetails.dob || 'N/A'}
            </div>
            <div>
              <strong>Category:</strong> {personalDetails.category || 'General'}
            </div>
            <div>
              <strong>Qualifying Exam:</strong> {academicDetails.qualifyingExam || 'Plus Two'}
            </div>
            <div>
              <strong>Exam Center:</strong> {communicationDetails.examCenterPref || 'Thiruvananthapuram'}
            </div>
            <div>
              <strong>Payment Status:</strong> {paymentDetails.paymentStatus || 'Verified'} ({paymentDetails.amount ? `₹${paymentDetails.amount}` : '₹800'})
            </div>
            <div>
              <strong>Mobile:</strong> {communicationDetails.mobileNumber || 'N/A'}
            </div>
          </div>

          {/* Uploaded Documents */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Uploaded Verification Files:</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {documents.photoPath ? (
                <a
                  href={documents.photoPath}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--secondary"
                  style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.65rem' }}
                >
                  🖼️ View Photograph
                </a>
              ) : (
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)' }}>Photograph: Default Attached</span>
              )}

              {documents.signaturePath && (
                <a
                  href={documents.signaturePath}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--secondary"
                  style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.65rem' }}
                >
                  ✍️ View Signature
                </a>
              )}
            </div>
          </div>

          {/* Status Update Form */}
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Application Decision / Status <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="form-select"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
              >
                <option value="Approved">Approved (Admit Card / Verification cleared)</option>
                <option value="Defective">Defective (Flag document defect for correction)</option>
                <option value="Rejected">Rejected (Ineligible / Disqualified)</option>
                <option value="Submitted">Submitted (Keep in pending queue)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Verification Remarks / Defect Instructions:
              </label>
              <textarea
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. All documents verified. Approved for KEAM 2026 Examination."
                className="form-input"
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn--secondary"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={submitting}
              >
                {submitting ? 'Saving Decision...' : 'Save Decision'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
