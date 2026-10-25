// frontend/src/components/status/MilestoneTracker.jsx
// Milestone Progress Tracker Visualizer Component
// Author: Shan M A (B24CSA59)
// Study Reference: Slides 23-24, 60 (Dynamic Styling & Conditional Rendering)

import React from 'react';

function MilestoneTracker({ data }) {
  if (!data) return null;

  const {
    applicationNumber,
    candidateName,
    status,
    currentStep = 1,
    remarks,
    steps = []
  } = data;

  const isDefective = status === 'Defective';
  const isRejected = status === 'Rejected';
  const isApproved = status === 'Approved';

  // Fallback default 5 milestones if steps array not populated
  const defaultSteps = [
    { title: 'Registration', status: currentStep >= 1 ? 'completed' : 'pending' },
    { title: 'Form Filling', status: currentStep >= 2 ? 'completed' : 'pending' },
    { title: 'Document Verification', status: currentStep >= 3 ? (isDefective ? 'active' : 'completed') : 'pending' },
    { title: 'Fee Payment', status: currentStep >= 4 ? 'completed' : 'pending' },
    { title: 'Final Approval', status: isApproved ? 'completed' : currentStep >= 5 ? 'active' : 'pending' }
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Result Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
          <div>
            <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.15rem' }}>
              {candidateName}
            </h3>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', fontFamily: 'monospace' }}>
              App No: #{applicationNumber}
            </span>
          </div>

          <span
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: 'var(--fs-xs)',
              fontWeight: 'bold',
              backgroundColor: isApproved ? '#DCFCE7' : isRejected ? '#FEE2E2' : isDefective ? '#FEF3C7' : '#E0F2FE',
              color: isApproved ? '#15803D' : isRejected ? '#B91C1C' : isDefective ? '#B45309' : '#0369A1'
            }}
          >
            {status}
          </span>
        </div>

        {/* Milestone Steps Timeline */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0', position: 'relative' }}>
          {/* Connector Line behind steps */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '5%',
              right: '5%',
              height: '3px',
              backgroundColor: '#E2E8F0',
              zIndex: 1
            }}
          />

          {displaySteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  width: `${100 / displaySteps.length}%`
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 'bold',
                    backgroundColor: isCompleted ? '#10B981' : isActive ? 'var(--color-navy)' : '#FFFFFF',
                    color: isCompleted || isActive ? '#FFFFFF' : 'var(--color-mid-gray)',
                    border: isCompleted || isActive ? 'none' : '2px solid #CBD5E1',
                    marginBottom: '0.5rem',
                    boxShadow: isActive ? '0 0 0 4px rgba(27, 54, 93, 0.15)' : 'none'
                  }}
                >
                  {isCompleted ? '' : idx + 1}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: isActive || isCompleted ? '600' : 'normal',
                    color: isActive ? 'var(--color-navy)' : isCompleted ? '#065F46' : 'var(--color-mid-gray)',
                    textAlign: 'center'
                  }}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Remarks Banner */}
        {remarks && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '6px',
              backgroundColor: isDefective ? '#FFFBEB' : '#F8FAFC',
              border: isDefective ? '1px solid #FCD34D' : '1px solid #E2E8F0',
              fontSize: 'var(--fs-sm)'
            }}
          >
            <div style={{ fontWeight: '600', color: isDefective ? '#B45309' : 'var(--color-navy)', marginBottom: '4px' }}>
              {isDefective ? 'Defect Remarks from Verification Officer:' : 'Official Verification Remarks:'}
            </div>
            <div style={{ color: 'var(--color-dark-gray)' }}>{remarks}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MilestoneTracker;
