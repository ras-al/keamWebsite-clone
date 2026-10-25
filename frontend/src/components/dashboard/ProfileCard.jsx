// frontend/src/components/dashboard/ProfileCard.jsx
// Candidate Profile Card Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 42-44, 50 (Component Props & Destructuring)

import React from 'react';

function ProfileCard({ candidate, application }) {
  // Extract data with safe fallbacks from application and candidate props
  const name =
    application?.personalDetails?.candidateName ||
    candidate?.fullName ||
    candidate?.name ||
    'Registered Candidate';

  const appNo =
    application?.applicationNumber ||
    candidate?.applicationNumber ||
    candidate?.applicationNo ||
    candidate?.appNo ||
    '2600000';

  const exam =
    (application?.courseSelections && application.courseSelections.length > 0)
      ? application.courseSelections.join(', ')
      : (candidate?.exam || candidate?.course || 'Engineering (KEAM 2026)');

  const category =
    application?.personalDetails?.category ||
    candidate?.category ||
    'General';

  const dob =
    application?.personalDetails?.dob ||
    candidate?.dob ||
    '-';

  const gender =
    application?.personalDetails?.gender ||
    candidate?.gender ||
    '-';

  const phone =
    application?.communicationDetails?.mobileNumber ||
    candidate?.mobileNumber ||
    candidate?.phone ||
    '-';

  const email =
    application?.communicationDetails?.email ||
    candidate?.email ||
    '-';

  const status =
    application?.status ||
    candidate?.status ||
    'Active';

  // Photo URL if candidate uploaded a photo
  const photoUrl = application?.documents?.photoPath || candidate?.photoUrl || null;

  // Status tag styling
  const getStatusBadgeStyle = () => {
    switch (status) {
      case 'Submitted':
      case 'Approved':
        return { backgroundColor: 'var(--color-success)', color: '#fff' };
      case 'Defective':
        return { backgroundColor: 'var(--color-error)', color: '#fff' };
      default:
        return { backgroundColor: 'var(--color-info)', color: '#fff' };
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <div className="profile-card__avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div className="profile-card__identity">
          <div className="profile-card__name">{name}</div>
          <div className="profile-card__app-no">
            Application No: <span>{appNo}</span>
          </div>
          <span className="profile-card__status-tag" style={getStatusBadgeStyle()}>
            {status}
          </span>
        </div>
      </div>

      <div className="profile-card__body">
        <div className="profile-card__details">
          <div className="profile-card__field">
            <span className="profile-card__field-label">Exam Stream</span>
            <span className="profile-card__field-value">{exam}</span>
          </div>
          <div className="profile-card__field">
            <span className="profile-card__field-label">Category</span>
            <span className="profile-card__field-value">{category}</span>
          </div>
          <div className="profile-card__field">
            <span className="profile-card__field-label">Date of Birth</span>
            <span className="profile-card__field-value">{dob}</span>
          </div>
          <div className="profile-card__field">
            <span className="profile-card__field-label">Gender</span>
            <span className="profile-card__field-value" style={{ textTransform: 'capitalize' }}>{gender}</span>
          </div>
          <div className="profile-card__field">
            <span className="profile-card__field-label">Mobile</span>
            <span className="profile-card__field-value">{phone}</span>
          </div>
          <div className="profile-card__field">
            <span className="profile-card__field-label">Email</span>
            <span className="profile-card__field-value">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
