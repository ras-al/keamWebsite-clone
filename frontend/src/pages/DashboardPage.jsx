// frontend/src/pages/DashboardPage.jsx
// Authenticated Student Dashboard Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 14, 71-72 (Component Lifecycle & API Fetching with useEffect)

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import DigitalClock from '../components/dashboard/DigitalClock';
import ProfileCard from '../components/dashboard/ProfileCard';
import ProgressTimeline from '../components/dashboard/ProgressTimeline';

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State management
  const [candidate, setCandidate] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionAlert, setActionAlert] = useState('');

  // Interactive Modal States
  const [activeModal, setActiveModal] = useState(null); // 'admit' | 'rank' | 'allotment' | 'options' | null

  // 1. Initial Authentication & Live Data Fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCandidateStr = localStorage.getItem('keam_candidate');

    let currentCandidate = user;
    if (!currentCandidate && storedCandidateStr) {
      try {
        currentCandidate = JSON.parse(storedCandidateStr);
      } catch (e) {
        console.error('Error parsing stored candidate:', e);
      }
    }

    if (currentCandidate) {
      setCandidate(currentCandidate);
    }

    // Verify cached application belongs to this specific candidate
    const cachedAppStr = localStorage.getItem('keam_application');
    if (cachedAppStr && currentCandidate?.applicationNumber) {
      try {
        const parsedApp = JSON.parse(cachedAppStr);
        if (parsedApp.applicationNumber === currentCandidate.applicationNumber) {
          setApplication(parsedApp);
        } else {
          // Stale cache from another candidate account - drop immediately
          localStorage.removeItem('keam_application');
          setApplication(null);
        }
      } catch (e) {
        console.error('Error reading cached application:', e);
      }
    } else {
      setApplication(null);
    }

    // Fetch live application record from backend API
    const fetchApplicationData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/application/my-application', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          logout();
          navigate('/login');
          return;
        }

        const resData = await response.json();
        if (resData.success) {
          if (resData.data) {
            setApplication(resData.data);
            localStorage.setItem('keam_application', JSON.stringify(resData.data));
          } else {
            // Newly registered candidate: no application submitted yet
            setApplication(null);
            localStorage.removeItem('keam_application');
            if (resData.candidate) {
              setCandidate(resData.candidate);
              localStorage.setItem('keam_candidate', JSON.stringify(resData.candidate));
            }
          }
        }
      } catch (err) {
        console.warn('API fetch warning:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user, navigate, logout]);

  // 2. Logout Handler
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  // 3. Compute active progress timeline step based on real database state
  let activeStepIndex = 1; // Default: Registered
  if (application) {
    if (application.seatAllotment?.allotted) {
      activeStepIndex = 7; // Allotment completed
    } else if (application.rankDetails?.published) {
      activeStepIndex = 6; // Results / Rank published
    } else if (application.admitCard?.issued) {
      activeStepIndex = 4; // Examination / Admit card issued
    } else if (application.status === 'Approved') {
      activeStepIndex = 3; // Verified & Approved
    } else if (application.status === 'Submitted') {
      activeStepIndex = 2; // Submitted & Fee Paid
    } else if (application.status === 'Defective') {
      activeStepIndex = 2; // Needs correction
    }
  }

  // Quick Action Notification Toast
  const triggerToast = (message) => {
    setActionAlert(message);
    setTimeout(() => setActionAlert(''), 4500);
  };

  // Safe candidate details
  const displayCandidate = candidate || user || {};
  const candidateName = displayCandidate.fullName || displayCandidate.name || 'Candidate';
  const appNumber = displayCandidate.applicationNumber || '2600000';

  return (
    <div className="dashboard-page">
      {/* ===== Dashboard Header ===== */}
      <section className="dashboard-header">
        <div className="container">
          <div className="dashboard-header__left">
            <img
              src="/assets/logo.png"
              alt="CEE Kerala Emblem"
              className="dashboard-header__emblem"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="dashboard-header__title">Candidate Dashboard</h1>
              <p className="dashboard-header__subtitle">
                Office of the Commissioner for Entrance Examinations, Kerala
              </p>
            </div>
          </div>
          <div className="dashboard-header__actions" style={{ alignItems: 'center', gap: '0.75rem', display: 'flex', flexWrap: 'wrap' }}>
            <DigitalClock />
            <Link to="/application" className="btn btn--primary">
              {application ? 'View / Edit Application' : 'Fill Application Form'}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn--outline"
              style={{ background: 'transparent', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* ===== Main Dashboard Layout ===== */}
      <main className="dashboard-layout" style={{ padding: '2rem 0' }}>
        <div className="container">
          {/* Action Alert Notification Banner */}
          {actionAlert && (
            <div
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                border: '1px solid #BFDBFE',
                padding: '0.85rem 1.25rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                fontSize: 'var(--fs-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{actionAlert}</span>
              <button
                type="button"
                onClick={() => setActionAlert('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                x
              </button>
            </div>
          )}

          {/* New Registration Notice: If candidate has not submitted application yet */}
          {!application && !loading && (
            <div
              style={{
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                padding: '1.25rem 1.5rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.1rem', fontWeight: 700 }}>
                  Welcome, {candidateName}! Registration Complete
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#047857' }}>
                  Your official Application Number is <strong>{appNumber}</strong>. Please complete your 6-step KEAM application form to upload documents and confirm your stream.
                </p>
              </div>
              <Link
                to="/application"
                className="btn btn--primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                Fill Application Form Now
              </Link>
            </div>
          )}

          {/* Defect Warning Alert Banner */}
          {application?.status === 'Defective' && (
            <div
              id="defect-banner"
              style={{
                background: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeeba',
                padding: '14px 20px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '14px'
              }}
            >
              <strong>Attention Required:</strong> Your application has been marked as <em>Defective</em>.
              <br />
              Remarks: {application.remarks || 'Please verify and re-upload required documents.'}
              <Link
                to="/application"
                style={{
                  color: '#533f03',
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  marginLeft: '8px'
                }}
              >
                Fix Application
              </Link>
            </div>
          )}

          <div className="dashboard-grid">
            {/* 1. Profile Card Component */}
            <ProfileCard candidate={displayCandidate} application={application} />

            {/* 2. 7-Stage Timeline Visualizer Component */}
            <ProgressTimeline activeStepIndex={activeStepIndex} />

            {/* 3. Quick Actions Grid */}
            <section className="quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions__grid">
                {/* Admit Card Button */}
                <button
                  type="button"
                  className="action-card"
                  onClick={() => setActiveModal('admit')}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <span className="action-card__label">Download Admit Card</span>
                  <span className="action-card__desc">Hall ticket for exam day</span>
                </button>

                {/* Rank Card Button */}
                <button
                  type="button"
                  className="action-card"
                  onClick={() => setActiveModal('rank')}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <span className="action-card__label">View Rank Card</span>
                  <span className="action-card__desc">Score & rank details</span>
                </button>

                {/* Seat Allotment Button */}
                <button
                  type="button"
                  className="action-card"
                  onClick={() => setActiveModal('allotment')}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="action-card__label">Check Allotment</span>
                  <span className="action-card__desc">Seat allotment status</span>
                </button>

                {/* Upload Documents / Fill Application */}
                <Link to="/application" className="action-card">
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="action-card__label">Upload Documents</span>
                  <span className="action-card__desc">Certificates & photo</span>
                </Link>

                {/* Option Registration Button */}
                <button
                  type="button"
                  className="action-card"
                  onClick={() => setActiveModal('options')}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                    </svg>
                  </div>
                  <span className="action-card__label">Option Registration</span>
                  <span className="action-card__desc">College preferences</span>
                </button>

                {/* Print Application Summary Button */}
                <button
                  type="button"
                  className="action-card"
                  onClick={() => window.print()}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                  </div>
                  <span className="action-card__label">Print Summary</span>
                  <span className="action-card__desc">Print application dossier</span>
                </button>
              </div>
            </section>

            {/* 4. Important Dates Section */}
            <section className="important-dates">
              <h2 className="section-title">Important Dates</h2>
              <ul className="dates-list">
                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Aug</div>
                    <div className="dates-list__day">10</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">KEAM 2026 - Engineering Exam</div>
                    <div className="dates-list__subtitle">Paper I & II reporting at 8:30 AM</div>
                  </div>
                </li>
                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Aug</div>
                    <div className="dates-list__day">15</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">Application Scrutiny Closes</div>
                    <div className="dates-list__subtitle">Document defect clearance deadline</div>
                  </div>
                </li>
                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Sep</div>
                    <div className="dates-list__day">05</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">KEAM 2026 - Result Publication</div>
                    <div className="dates-list__subtitle">Rank list release on official portal</div>
                  </div>
                </li>
                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Oct</div>
                    <div className="dates-list__day">01</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">Option Registration Opens</div>
                    <div className="dates-list__subtitle">Centralized Allotment Process (CAP)</div>
                  </div>
                </li>
              </ul>
            </section>

            {/* 5. Recent Notifications Section */}
            <section className="recent-notifications">
              <h2 className="section-title">Recent Notifications</h2>
              <ul className="notification-list">
                <li className="notification-list__item">
                  <span className="notification-list__icon notification-list__icon--new"></span>
                  <div className="notification-list__content">
                    <div className="notification-list__text">
                      <a href="#notif">Admit card generation schedule and examination guidelines published.</a>
                      <span className="notification-list__badge">New</span>
                    </div>
                    <div className="notification-list__time">Live Update</div>
                  </div>
                </li>
                <li className="notification-list__item">
                  <span className="notification-list__icon notification-list__icon--success"></span>
                  <div className="notification-list__content">
                    <div className="notification-list__text">
                      <a href="#notif">
                        {application?.status === 'Submitted' || application?.status === 'Approved'
                          ? `Application fee of Rs. ${application?.paymentDetails?.amount || 800} successfully reconciled.`
                          : 'Online application registration window for KEAM 2026 is currently active.'}
                      </a>
                    </div>
                    <div className="notification-list__time">CEE Desk</div>
                  </div>
                </li>
                <li className="notification-list__item">
                  <span className="notification-list__icon notification-list__icon--info"></span>
                  <div className="notification-list__content">
                    <div className="notification-list__text">
                      <a href="#notif">Document defect correction window guidelines released.</a>
                    </div>
                    <div className="notification-list__time">Notice Board</div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* ===== Helpline Band ===== */}
      <section className="helpline" id="helpline">
        <div className="container">
          <h4 className="helpline__title">Helpline &amp; Contact</h4>
          <div className="helpline__details">
            <div className="helpline__item">
              <span className="helpline__item-label">Phone:</span>
              <span className="helpline__item-value">0471-2525300</span>
            </div>
            <div className="helpline__item">
              <span className="helpline__item-label">Email:</span>
              <span className="helpline__item-value">caborhelp@cee.kerala.gov.in</span>
            </div>
            <div className="helpline__item">
              <span className="helpline__item-label">Office:</span>
              <span className="helpline__item-value">CEE, Housing Board Buildings, Santhi Nagar, Thiruvananthapuram</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* INTERACTIVE MODALS */}
      {/* ======================================================== */}

      {/* 1. Admit Card Modal */}
      {activeModal === 'admit' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ borderBottom: '2px solid var(--color-navy)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                Government of Kerala - Commissioner for Entrance Examinations
              </div>
              <h2 style={{ color: 'var(--color-navy)', margin: '0.25rem 0', fontSize: '1.35rem' }}>
                KEAM 2026 Admit Card
              </h2>
            </div>

            {!application ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#991B1B', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Admit Card Not Available
                  </p>
                  <p style={{ color: '#7F1D1D', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    You have not submitted an application form yet. Admit cards are generated only after completing application submission and approval by CEE officials.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Link to="/application" onClick={() => setActiveModal(null)} className="btn btn--primary">
                    Fill Application Form Now
                  </Link>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : application.status !== 'Approved' ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#92400E', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Admit Card Under Scrutiny (Status: {application.status})
                  </p>
                  <p style={{ color: '#78350F', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    {application.status === 'Defective'
                      ? `Your application has defects flagged by CEE: "${application.remarks || 'Please upload the requested correction documents.'}"`
                      : 'Your application is currently under verification by CEE officials. Admit cards are issued only after verification is approved.'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Link to="/application" onClick={() => setActiveModal(null)} className="btn btn--primary">
                    {application.status === 'Defective' ? 'Fix Defective Application' : 'View Application'}
                  </Link>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : !application.admitCard?.issued ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#1E40AF', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Application Approved - Admit Card Schedule Pending
                  </p>
                  <p style={{ color: '#1E3A8A', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    Your application has been verified and approved by CEE admin. The examination controller has not yet released the admit card schedule for your registration. Please check back soon.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <table style={{ width: '100%', fontSize: '0.9rem', marginBottom: '1.25rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B', width: '40%' }}>Candidate Name:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{candidateName}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Application Number:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{appNumber}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Roll Number:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700, color: 'var(--color-navy)' }}>{application.admitCard.rollNumber || appNumber}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Exam Center:</td>
                      <td style={{ padding: '0.5rem 0' }}>{application.admitCard.examCenter || 'Govt Model Higher Secondary School, Thiruvananthapuram'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Paper I Schedule:</td>
                      <td style={{ padding: '0.5rem 0' }}>{application.admitCard.paper1Schedule || '10 Aug 2026 (10:00 AM - 12:30 PM)'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Paper II Schedule:</td>
                      <td style={{ padding: '0.5rem 0' }}>{application.admitCard.paper2Schedule || '10 Aug 2026 (02:00 PM - 04:30 PM)'}</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => window.print()} className="btn btn--primary">
                    Print / Download PDF
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Rank Card Modal */}
      {activeModal === 'rank' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              maxWidth: '540px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ borderBottom: '2px solid var(--color-navy)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                Entrance Examination Results 2026
              </div>
              <h2 style={{ color: 'var(--color-navy)', margin: '0.25rem 0', fontSize: '1.35rem' }}>
                Score &amp; Rank Certificate
              </h2>
            </div>

            {!application ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#991B1B', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Rank Card Not Available
                  </p>
                  <p style={{ color: '#7F1D1D', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    You have not submitted an application for KEAM 2026 yet. Rank cards are published only for candidates who submit applications and sit for the exam.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Link to="/application" onClick={() => setActiveModal(null)} className="btn btn--primary">
                    Fill Application Form
                  </Link>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : !application.rankDetails?.published ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#1E40AF', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Results &amp; Rank List Pending
                  </p>
                  <p style={{ color: '#1E3A8A', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    The KEAM 2026 entrance examination results and rank list have not been published by CEE administration for this application yet. Please check the official announcements ticker for result publication dates.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <table style={{ width: '100%', fontSize: '0.9rem', marginBottom: '1.25rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B', width: '45%' }}>Candidate Name:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{candidateName}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Application Number:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{appNumber}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Paper I Score:</td>
                      <td style={{ padding: '0.5rem 0' }}>{application.rankDetails.paper1Score !== null ? `${application.rankDetails.paper1Score} / 240.0` : 'N/A'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Paper II Score:</td>
                      <td style={{ padding: '0.5rem 0' }}>{application.rankDetails.paper2Score !== null ? `${application.rankDetails.paper2Score} / 240.0` : 'N/A'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Standardized Score:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700, color: 'var(--color-navy)' }}>
                        {application.rankDetails.standardizedScore !== null ? `${application.rankDetails.standardizedScore} / 600.00` : 'N/A'}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>State Merit (SM) Rank:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700, color: '#16A34A', fontSize: '1.1rem' }}>
                        #{application.rankDetails.stateMeritRank || 'Pending'}
                      </td>
                    </tr>
                    {application.rankDetails.categoryRank && (
                      <tr>
                        <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Category Rank ({application.personalDetails?.category || 'General'}):</td>
                        <td style={{ padding: '0.5rem 0', fontWeight: 700, color: 'var(--color-navy)' }}>
                          #{application.rankDetails.categoryRank}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => window.print()} className="btn btn--primary">
                    Print Rank Certificate
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Seat Allotment Modal */}
      {activeModal === 'allotment' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              maxWidth: '540px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ borderBottom: '2px solid var(--color-navy)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                Centralized Allotment Process (CAP) Phase 1
              </div>
              <h2 style={{ color: 'var(--color-navy)', margin: '0.25rem 0', fontSize: '1.35rem' }}>
                First Phase Seat Allotment Memo
              </h2>
            </div>

            {!application ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#991B1B', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Seat Allotment Not Available
                  </p>
                  <p style={{ color: '#7F1D1D', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    You cannot receive a seat allotment without submitting an application. Please complete and submit your application form first.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Link to="/application" onClick={() => setActiveModal(null)} className="btn btn--primary">
                    Fill Application Form
                  </Link>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : !application.seatAllotment?.allotted ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#92400E', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Seat Allotment Not Published Yet
                  </p>
                  <p style={{ color: '#78350F', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    No seat allotment has been issued for your application in this phase. Allotments are processed by CEE administration based on verified qualifications, entrance rank, and registered options.
                  </p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#B45309' }}>
                    Current Application Status: <strong>{application.status}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <table style={{ width: '100%', fontSize: '0.9rem', marginBottom: '1.25rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B', width: '40%' }}>Candidate Name:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{candidateName} ({appNumber})</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Allotted Institution:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 700 }}>{application.seatAllotment.institution}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Branch / Course:</td>
                      <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>{application.seatAllotment.course}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Allotted Option No:</td>
                      <td style={{ padding: '0.5rem 0' }}>Option {application.seatAllotment.optionNo || 1} ({application.seatAllotment.quota || 'State Merit Quota'})</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Reporting Deadline:</td>
                      <td style={{ padding: '0.5rem 0', color: '#DC2626', fontWeight: 600 }}>{application.seatAllotment.reportingDate || '25 October 2026 - 04:00 PM'}</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => window.print()} className="btn btn--primary">
                    Print Allotment Memo
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Option Registration Modal */}
      {activeModal === 'options' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ borderBottom: '2px solid var(--color-navy)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                Centralized Allotment Process (CAP)
              </div>
              <h2 style={{ color: 'var(--color-navy)', margin: '0.25rem 0', fontSize: '1.35rem' }}>
                Course &amp; College Option Registration
              </h2>
            </div>

            {!application ? (
              <div>
                <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#991B1B', margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                    Option Registration Not Available
                  </p>
                  <p style={{ color: '#7F1D1D', margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                    You must submit your KEAM application form before entering college and course preferences.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Link to="/application" onClick={() => setActiveModal(null)} className="btn btn--primary">
                    Fill Application Form
                  </Link>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
                  Registered preferences for Candidate: <strong>{candidateName}</strong> (App No: {appNumber})
                </p>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                  {application.optionRegistration?.options?.length > 0 ? (
                    <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#1E293B', lineHeight: 1.8, margin: 0 }}>
                      {application.optionRegistration.options.map((opt, idx) => (
                        <li key={idx}>
                          <strong>{opt.college}</strong> - {opt.course}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#1E293B', lineHeight: 1.8, margin: 0 }}>
                      <li><strong>T.K.M. College of Engineering, Kollam</strong> - Computer Science &amp; Engineering</li>
                      <li><strong>College of Engineering Trivandrum (CET)</strong> - Computer Science &amp; Engineering</li>
                      <li><strong>Government Engineering College, Barton Hill</strong> - Information Technology</li>
                    </ol>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={async () => {
                      const token = localStorage.getItem('token');
                      if (token) {
                        try {
                          const res = await fetch('/api/application/options', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                              locked: true,
                              options: [
                                { priority: 1, college: 'T.K.M. College of Engineering, Kollam', course: 'Computer Science & Engineering' },
                                { priority: 2, college: 'College of Engineering Trivandrum (CET)', course: 'Computer Science & Engineering' },
                                { priority: 3, college: 'Government Engineering College, Barton Hill', course: 'Information Technology' }
                              ]
                            })
                          });
                          const data = await res.json();
                          if (data.success && data.data) {
                            setApplication(data.data);
                            localStorage.setItem('keam_application', JSON.stringify(data.data));
                          }
                        } catch (e) {
                          console.error(e);
                        }
                      }
                      triggerToast('College and course options saved and locked for CAP Phase 1.');
                      setActiveModal(null);
                    }}
                    className="btn btn--primary"
                  >
                    Lock &amp; Confirm Preferences
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--outline">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
