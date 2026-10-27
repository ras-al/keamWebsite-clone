// frontend/src/components/admin/StatusModal.jsx
// Complete Admin Application Management Console
// Author: Shan M A (B24CSA59) & Rasal Musthafa (B24CSA49)
// Study Reference: Slides 56-57 (Modals, Controlled Tabs & Administrative State)

import React, { useState } from 'react';

const KERALA_COLLEGES = [
  'T.K.M. College of Engineering, Kollam',
  'College of Engineering Trivandrum (CET)',
  'Government Engineering College, Barton Hill, Thiruvananthapuram',
  'Government Engineering College, Thrissur',
  'Model Engineering College, Thrikkakara, Kochi',
  'NSS College of Engineering, Palakkad',
  'Government College of Engineering, Kannur',
  'Mar Athanasius College of Engineering, Kothamangalam'
];

const ENGINEERING_COURSES = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science'
];

const EXAM_CENTERS = [
  'Govt Model Higher Secondary School, Thiruvananthapuram',
  'St. Joseph Higher Secondary School, Kollam',
  'Government Model Boys HSS, Ernakulam',
  'St. Thomas College Higher Secondary School, Thrissur',
  'Govt Higher Secondary School, Kozhikode'
];

function StatusModal({ application, onClose, onStatusUpdated }) {
  if (!application) return null;

  const [activeTab, setActiveTab] = useState('verification'); // 'verification' | 'admitCard' | 'rank' | 'allotment'

  // Tab 1: Verification & Status
  const [newStatus, setNewStatus] = useState(application.status || 'Approved');
  const [remarks, setRemarks] = useState(application.remarks || '');

  // Tab 2: Admit Card Issuance
  const [issueAdmitCard, setIssueAdmitCard] = useState(Boolean(application.admitCard?.issued));
  const [rollNumber, setRollNumber] = useState(
    application.admitCard?.rollNumber || `26${application.applicationNumber ? application.applicationNumber.slice(-5) : '10001'}`
  );
  const [examCenter, setExamCenter] = useState(
    application.admitCard?.examCenter || EXAM_CENTERS[0]
  );
  const [paper1Schedule, setPaper1Schedule] = useState(
    application.admitCard?.paper1Schedule || '10 Aug 2026 (10:00 AM - 12:30 PM)'
  );
  const [paper2Schedule, setPaper2Schedule] = useState(
    application.admitCard?.paper2Schedule || '10 Aug 2026 (02:00 PM - 04:30 PM)'
  );

  // Tab 3: Score & Rank Publishing
  const [publishRank, setPublishRank] = useState(Boolean(application.rankDetails?.published));
  const [paper1Score, setPaper1Score] = useState(application.rankDetails?.paper1Score ?? '');
  const [paper2Score, setPaper2Score] = useState(application.rankDetails?.paper2Score ?? '');
  const [standardizedScore, setStandardizedScore] = useState(application.rankDetails?.standardizedScore ?? '');
  const [stateMeritRank, setStateMeritRank] = useState(application.rankDetails?.stateMeritRank ?? '');
  const [categoryRank, setCategoryRank] = useState(application.rankDetails?.categoryRank ?? '');

  // Tab 4: Seat Allotment (CAP Phase 1)
  const [allotSeat, setAllotSeat] = useState(Boolean(application.seatAllotment?.allotted));
  const [allottedInstitution, setAllottedInstitution] = useState(
    application.seatAllotment?.institution || KERALA_COLLEGES[0]
  );
  const [allottedCourse, setAllottedCourse] = useState(
    application.seatAllotment?.course || ENGINEERING_COURSES[0]
  );
  const [allottedOptionNo, setAllottedOptionNo] = useState(
    application.seatAllotment?.optionNo || 1
  );
  const [allottedQuota, setAllottedQuota] = useState(
    application.seatAllotment?.quota || 'State Merit Quota (SM)'
  );
  const [reportingDate, setReportingDate] = useState(
    application.seatAllotment?.reportingDate || '25 October 2026 - 04:00 PM'
  );

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

  // Auto-calculate standardized score if paper scores change
  const handleScoreChange = (p1, p2) => {
    setPaper1Score(p1);
    setPaper2Score(p2);
    const num1 = parseFloat(p1);
    const num2 = parseFloat(p2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setStandardizedScore((num1 + num2).toFixed(2));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        status: newStatus,
        remarks: remarks.trim(),
        admitCard: {
          issued: issueAdmitCard,
          rollNumber: rollNumber.trim(),
          examCenter: examCenter.trim(),
          paper1Schedule: paper1Schedule.trim(),
          paper2Schedule: paper2Schedule.trim()
        },
        rankDetails: {
          published: publishRank,
          paper1Score: paper1Score !== '' ? Number(paper1Score) : null,
          paper2Score: paper2Score !== '' ? Number(paper2Score) : null,
          standardizedScore: standardizedScore !== '' ? Number(standardizedScore) : null,
          stateMeritRank: stateMeritRank !== '' ? Number(stateMeritRank) : null,
          categoryRank: categoryRank !== '' ? Number(categoryRank) : null
        },
        seatAllotment: {
          allotted: allotSeat,
          institution: allottedInstitution.trim(),
          course: allottedCourse.trim(),
          optionNo: Number(allottedOptionNo) || 1,
          quota: allottedQuota.trim(),
          reportingDate: reportingDate.trim()
        }
      };

      const res = await fetch(`/api/admin/applications/${_id}/manage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        onStatusUpdated(data.data);
        onClose();
      } else {
        setError(data.message || 'Failed to update application.');
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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
          maxWidth: '780px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
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
            <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.2rem' }}>
              Admin Management Console - App #{applicationNumber}
            </h3>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)' }}>
              Candidate: <strong>{personalDetails.candidateName || 'N/A'}</strong> | Current Status: <strong>{application.status}</strong>
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

        {/* Tab Navigation Ribbon */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F1F5F9' }}>
          <button
            type="button"
            onClick={() => setActiveTab('verification')}
            style={{
              flex: 1,
              padding: '0.75rem 0.5rem',
              background: activeTab === 'verification' ? '#FFFFFF' : 'none',
              border: 'none',
              borderBottom: activeTab === 'verification' ? '3px solid var(--color-navy)' : '3px solid transparent',
              fontWeight: activeTab === 'verification' ? 'bold' : 'normal',
              color: activeTab === 'verification' ? 'var(--color-navy)' : '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            1. Verification & Status
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admitCard')}
            style={{
              flex: 1,
              padding: '0.75rem 0.5rem',
              background: activeTab === 'admitCard' ? '#FFFFFF' : 'none',
              border: 'none',
              borderBottom: activeTab === 'admitCard' ? '3px solid var(--color-navy)' : '3px solid transparent',
              fontWeight: activeTab === 'admitCard' ? 'bold' : 'normal',
              color: activeTab === 'admitCard' ? 'var(--color-navy)' : '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            2. Admit Card {issueAdmitCard ? '(Issued)' : ''}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rank')}
            style={{
              flex: 1,
              padding: '0.75rem 0.5rem',
              background: activeTab === 'rank' ? '#FFFFFF' : 'none',
              border: 'none',
              borderBottom: activeTab === 'rank' ? '3px solid var(--color-navy)' : '3px solid transparent',
              fontWeight: activeTab === 'rank' ? 'bold' : 'normal',
              color: activeTab === 'rank' ? 'var(--color-navy)' : '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            3. Score & Rank {publishRank ? '(Published)' : ''}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('allotment')}
            style={{
              flex: 1,
              padding: '0.75rem 0.5rem',
              background: activeTab === 'allotment' ? '#FFFFFF' : 'none',
              border: 'none',
              borderBottom: activeTab === 'allotment' ? '3px solid var(--color-navy)' : '3px solid transparent',
              fontWeight: activeTab === 'allotment' ? 'bold' : 'normal',
              color: activeTab === 'allotment' ? 'var(--color-navy)' : '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            4. Seat Allotment {allotSeat ? '(Allotted)' : ''}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            {/* ========================================================= */}
            {/* TAB 1: Verification & Status */}
            {/* ========================================================= */}
            {activeTab === 'verification' && (
              <div>
                {/* Candidate Dossier Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: 'var(--fs-sm)' }}>
                  <div><strong>Full Name:</strong> {personalDetails.candidateName || 'N/A'}</div>
                  <div><strong>Gender / DOB:</strong> {personalDetails.gender || 'N/A'} | {personalDetails.dob || 'N/A'}</div>
                  <div><strong>Category:</strong> {personalDetails.category || 'General'}</div>
                  <div><strong>Qualifying Exam:</strong> {academicDetails.qualifyingExam || 'Plus Two'} ({academicDetails.board || 'DHSE'})</div>
                  <div><strong>Exam Stream:</strong> {(application.courseSelections || []).join(', ') || 'Engineering'}</div>
                  <div><strong>Exam Center Pref:</strong> {communicationDetails.examCenterPref || communicationDetails.district || 'Thiruvananthapuram'}</div>
                  <div><strong>Mobile:</strong> {communicationDetails.mobileNumber || 'N/A'}</div>
                  <div><strong>Email:</strong> {communicationDetails.email || 'N/A'}</div>
                  <div><strong>Permanent Address:</strong> {communicationDetails.permanentAddress || 'N/A'}, {communicationDetails.district || ''} - {communicationDetails.pincode || ''}</div>
                  <div><strong>Payment:</strong> <span style={{ color: '#16A34A', fontWeight: 'bold' }}>{paymentDetails.status || 'Paid'}</span> ({paymentDetails.amount ? `Rs. ${paymentDetails.amount}` : 'Rs. 800'})</div>
                </div>

                {/* Uploaded Verification Files */}
                <div style={{ marginBottom: '1.25rem', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-navy)', margin: '0 0 0.5rem 0' }}>Uploaded Verification Files:</h4>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {documents.photoPath ? (
                      <a href={documents.photoPath} target="_blank" rel="noreferrer" className="btn btn--secondary" style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.65rem' }}>
                        View Photograph
                      </a>
                    ) : (
                      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)' }}>Photograph: Attached</span>
                    )}

                    {documents.signaturePath && (
                      <a href={documents.signaturePath} target="_blank" rel="noreferrer" className="btn btn--secondary" style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.65rem' }}>
                        View Signature
                      </a>
                    )}

                    {documents.sslcPath && (
                      <a href={documents.sslcPath} target="_blank" rel="noreferrer" className="btn btn--secondary" style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.65rem' }}>
                        View SSLC (DOB Proof)
                      </a>
                    )}
                  </div>
                </div>

                {/* Status Decision Selector */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                    Application Decision / Status <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => {
                      setNewStatus(e.target.value);
                      if (e.target.value === 'Approved' && !issueAdmitCard) {
                        // Suggest auto-enabling admit card when approved
                        setRemarks('All documents verified and approved for KEAM 2026 examination.');
                      }
                    }}
                    className="form-select"
                    style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px' }}
                  >
                    <option value="Approved">Approved (Verification cleared - eligible for Admit Card)</option>
                    <option value="Defective">Defective (Flag document defect for candidate correction)</option>
                    <option value="Rejected">Rejected (Disqualified / Ineligible)</option>
                    <option value="Submitted">Submitted (Under Scrutiny queue)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                    Verification Remarks / Instructions to Candidate:
                  </label>
                  <textarea
                    rows="3"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter instructions for candidate if defective, or approval note."
                    className="form-input"
                    style={{ width: '100%', padding: '0.65rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)', fontFamily: 'inherit' }}
                  />
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: Admit Card Issuance */}
            {/* ========================================================= */}
            {activeTab === 'admitCard' && (
              <div>
                <div style={{ padding: '0.85rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#1E40AF' }}>
                  <strong>Admit Card Control:</strong> Admit cards are only issued to candidates whose application has been reviewed and marked as <strong>Approved</strong>.
                </div>

                <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    id="issueAdmitCardCheck"
                    checked={issueAdmitCard}
                    onChange={(e) => setIssueAdmitCard(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="issueAdmitCardCheck" style={{ fontWeight: 'bold', color: 'var(--color-navy)', cursor: 'pointer' }}>
                    Issue Official KEAM 2026 Admit Card to Candidate
                  </label>
                </div>

                {issueAdmitCard && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Roll Number:
                      </label>
                      <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="form-input"
                        placeholder="e.g. 2613609"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Allocated Examination Center:
                      </label>
                      <select
                        value={examCenter}
                        onChange={(e) => setExamCenter(e.target.value)}
                        className="form-select"
                        style={{ width: '100%', padding: '0.5rem' }}
                      >
                        {EXAM_CENTERS.map((center) => (
                          <option key={center} value={center}>{center}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Paper 1 Schedule (Physics &amp; Chemistry):
                      </label>
                      <input
                        type="text"
                        value={paper1Schedule}
                        onChange={(e) => setPaper1Schedule(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Paper 2 Schedule (Mathematics):
                      </label>
                      <input
                        type="text"
                        value={paper2Schedule}
                        onChange={(e) => setPaper2Schedule(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: Score & Rank Publishing */}
            {/* ========================================================= */}
            {activeTab === 'rank' && (
              <div>
                <div style={{ padding: '0.85rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#166534' }}>
                  <strong>Score &amp; Rank Management:</strong> Admin can record entrance exam paper marks and assign official State Merit Rank (SM) and Category Rank.
                </div>

                <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    id="publishRankCheck"
                    checked={publishRank}
                    onChange={(e) => setPublishRank(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="publishRankCheck" style={{ fontWeight: 'bold', color: 'var(--color-navy)', cursor: 'pointer' }}>
                    Publish Results &amp; Rank Card for Candidate
                  </label>
                </div>

                {publishRank && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Paper 1 Score (out of 240.0):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={paper1Score}
                        onChange={(e) => handleScoreChange(e.target.value, paper2Score)}
                        className="form-input"
                        placeholder="e.g. 210.5"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Paper 2 Score (out of 240.0):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={paper2Score}
                        onChange={(e) => handleScoreChange(paper1Score, e.target.value)}
                        className="form-input"
                        placeholder="e.g. 224.0"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Standardized Total (out of 600.0):
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={standardizedScore}
                        onChange={(e) => setStandardizedScore(e.target.value)}
                        className="form-input"
                        placeholder="e.g. 542.50"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: '#16A34A', marginBottom: '4px' }}>
                        State Merit (SM) Rank:
                      </label>
                      <input
                        type="number"
                        value={stateMeritRank}
                        onChange={(e) => setStateMeritRank(e.target.value)}
                        className="form-input"
                        placeholder="e.g. 142"
                        style={{ width: '100%', padding: '0.5rem', fontWeight: 'bold' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Category Rank ({personalDetails.category || 'General'}):
                      </label>
                      <input
                        type="number"
                        value={categoryRank}
                        onChange={(e) => setCategoryRank(e.target.value)}
                        className="form-input"
                        placeholder="e.g. 35"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: Seat Allotment (CAP Phase 1) */}
            {/* ========================================================= */}
            {activeTab === 'allotment' && (
              <div>
                <div style={{ padding: '0.85rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#92400E' }}>
                  <strong>Centralized Allotment Process (CAP):</strong> Only verified candidates who have qualified and participated in option registration can be allotted a seat by CEE administration.
                </div>

                <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    id="allotSeatCheck"
                    checked={allotSeat}
                    onChange={(e) => setAllotSeat(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="allotSeatCheck" style={{ fontWeight: 'bold', color: 'var(--color-navy)', cursor: 'pointer' }}>
                    Process Seat Allotment &amp; Issue Allotment Memo
                  </label>
                </div>

                {allotSeat && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Allotted Institution:
                      </label>
                      <select
                        value={allottedInstitution}
                        onChange={(e) => setAllottedInstitution(e.target.value)}
                        className="form-select"
                        style={{ width: '100%', padding: '0.5rem' }}
                      >
                        {KERALA_COLLEGES.map((col) => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Allotted Course / Branch:
                      </label>
                      <select
                        value={allottedCourse}
                        onChange={(e) => setAllottedCourse(e.target.value)}
                        className="form-select"
                        style={{ width: '100%', padding: '0.5rem' }}
                      >
                        {ENGINEERING_COURSES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Allotted Option Number:
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={allottedOptionNo}
                        onChange={(e) => setAllottedOptionNo(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        Quota Category:
                      </label>
                      <select
                        value={allottedQuota}
                        onChange={(e) => setAllottedQuota(e.target.value)}
                        className="form-select"
                        style={{ width: '100%', padding: '0.5rem' }}
                      >
                        <option value="State Merit Quota (SM)">State Merit Quota (SM)</option>
                        <option value="Economically Weaker Section (EWS)">Economically Weaker Section (EWS)</option>
                        <option value="Other Backward Hindu (BH)">Other Backward Hindu (BH)</option>
                        <option value="Muslim (MU)">Muslim (MU)</option>
                        <option value="Latin Catholic (LC)">Latin Catholic (LC)</option>
                        <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
                        <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 'bold', color: 'var(--color-navy)', marginBottom: '4px' }}>
                        College Reporting Deadline:
                      </label>
                      <input
                        type="text"
                        value={reportingDate}
                        onChange={(e) => setReportingDate(e.target.value)}
                        className="form-input"
                        placeholder="e.g. 25 October 2026 - 04:00 PM"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn--secondary"
                disabled={submitting}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={submitting}
              >
                {submitting ? 'Saving All Settings...' : 'Save & Update Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
