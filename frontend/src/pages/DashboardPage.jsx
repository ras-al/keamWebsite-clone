// frontend/src/pages/DashboardPage.jsx
// Authenticated Student Dashboard Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 14, 71-72 (Component Lifecycle & API Fetching with useEffect)

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import DigitalClock from '../components/dashboard/DigitalClock';
import ProfileCard from '../components/dashboard/ProfileCard';
import ProgressTimeline from '../components/dashboard/ProgressTimeline';

function DashboardPage() {
  const navigate = useNavigate();

  // State management (Slides 31-35)
  const [candidate, setCandidate] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionAlert, setActionAlert] = useState('');

  // 1. Authentication Guard & Initial Data Fetch (Slide 71)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCandidate = localStorage.getItem('keam_candidate') || localStorage.getItem('candidate');

    let parsedCandidate = null;
    if (storedCandidate) {
      try {
        parsedCandidate = JSON.parse(storedCandidate);
        setCandidate(parsedCandidate);
      } catch (e) {
        console.error('Error parsing stored candidate:', e);
      }
    }

    // Check cached application record for instant UI rendering
    const cachedAppStr = localStorage.getItem('keam_application');
    if (cachedAppStr) {
      try {
        const parsedApp = JSON.parse(cachedAppStr);
        setApplication(parsedApp);
      } catch (e) {
        console.error('Error parsing cached application:', e);
      }
    }

    // Fetch live application status from backend API
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
          // Token expired or invalid
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        if (data.success && data.data) {
          setApplication(data.data);
          localStorage.setItem('keam_application', JSON.stringify(data.data));
        } else if (data.candidate && !parsedCandidate) {
          setCandidate(data.candidate);
        }
      } catch (err) {
        console.warn('Backend API offline or unreachable, using offline cache:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [navigate]);

  // 2. Logout Handler
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('candidate');
    localStorage.removeItem('keam_candidate');
    localStorage.removeItem('keam_application');
    navigate('/login');
  };

  // 3. Calculate active timeline step index (0 to 6)
  let activeStepIndex = 1; // Default: Registered, application submission pending
  if (application && (application.status === 'Submitted' || application.status === 'Approved')) {
    activeStepIndex = 3; // Registration, Submission, and Fee are complete; Admit Card is active
  } else if (application && typeof application.currentStep === 'number') {
    activeStepIndex = application.currentStep;
  } else if (candidate && typeof candidate.currentStep === 'number') {
    activeStepIndex = candidate.currentStep;
  }

  // 4. Quick Action Click Handlers
  const handleQuickAction = (actionName, message) => {
    setActionAlert(`${actionName}: ${message}`);
    setTimeout(() => setActionAlert(''), 4500);
  };

  const handleDownloadAdmitCard = (e) => {
    e.preventDefault();
    if (activeStepIndex >= 3) {
      handleQuickAction(
        'Admit Card',
        'Your Admit Card for KEAM 2026 is downloading. Report to your allocated venue by 8:30 AM.'
      );
    } else {
      handleQuickAction(
        'Admit Card',
        'Admit Card will be available once your application and document verification is approved.'
      );
    }
  };

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
          <div className="dashboard-header__actions" style={{ alignItems: 'center' }}>
            <DigitalClock />
            <Link to="/application" className="btn btn--primary">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              My Application
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn--outline"
              style={{ background: 'transparent', cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* ===== Main Dashboard Layout ===== */}
      <main className="dashboard-layout" style={{ padding: '2rem 0' }}>
        <div className="container">
          {/* Quick Action Notification Toast */}
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
              <span>ℹ {actionAlert}</span>
              <button
                type="button"
                onClick={() => setActionAlert('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                x
              </button>
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
            <ProfileCard candidate={candidate} application={application} />

            {/* 2. 7-Stage Timeline Visualizer Component */}
            <ProgressTimeline activeStepIndex={activeStepIndex} />

            {/* 3. Quick Actions Grid */}
            <section className="quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions__grid">
                <a href="#admit-card" className="action-card" onClick={handleDownloadAdmitCard}>
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <span className="action-card__label">Download Admit Card</span>
                  <span className="action-card__desc">Hall ticket for exam day</span>
                </a>

                <a
                  href="#rank-card"
                  className="action-card"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickAction('Rank Card', 'Rank card publication will open after evaluation.');
                  }}
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
                </a>

                <a
                  href="#allotment"
                  className="action-card"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickAction('Seat Allotment', 'Centralized Allotment Process (CAP) begins after rank list release.');
                  }}
                >
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="action-card__label">Check Allotment</span>
                  <span className="action-card__desc">Seat allotment status</span>
                </a>

                <Link to="/application" className="action-card">
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="action-card__label">Upload Documents</span>
                  <span className="action-card__desc">Certificates & photo</span>
                </Link>

                <a
                  href="#option-reg"
                  className="action-card"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickAction('Option Registration', 'College and course option registration opens in October 2026.');
                  }}
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
                </a>

                <Link to="/application" className="action-card">
                  <div className="action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <span className="action-card__label">Pay Fee</span>
                  <span className="action-card__desc">Application & Exam fee</span>
                </Link>
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
                    <div className="dates-list__subtitle">Paper I & II • Reporting at 8:30 AM</div>
                  </div>
                </li>

                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Aug</div>
                    <div className="dates-list__day">15</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">PG Dental - Application Deadline</div>
                    <div className="dates-list__subtitle">Last date for online submission</div>
                  </div>
                </li>

                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Sep</div>
                    <div className="dates-list__day">05</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">KEAM 2026 - Result Publication</div>
                    <div className="dates-list__subtitle">Rank list expected (tentative)</div>
                  </div>
                </li>

                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Oct</div>
                    <div className="dates-list__day">01</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">Option Registration Opens</div>
                    <div className="dates-list__subtitle">College-course preference entry</div>
                  </div>
                </li>

                <li className="dates-list__item">
                  <div className="dates-list__date-box">
                    <div className="dates-list__month">Oct</div>
                    <div className="dates-list__day">20</div>
                  </div>
                  <div className="dates-list__info">
                    <div className="dates-list__title">First Phase Allotment</div>
                    <div className="dates-list__subtitle">CAP Phase 1 result publication</div>
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
                      <a href="#notif">Your admit card for Engineering Paper I & II is scheduled for generation.</a>
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
                        {application?.status === 'Submitted'
                          ? `Application fee of ₹${application?.paymentDetails?.amount || 800} successfully processed.`
                          : 'Online application window for KEAM 2026 is currently active.'}
                      </a>
                    </div>
                    <div className="notification-list__time">CEE Desk</div>
                  </div>
                </li>

                <li className="notification-list__item">
                  <span className="notification-list__icon notification-list__icon--info"></span>
                  <div className="notification-list__content">
                    <div className="notification-list__text">
                      <a href="#notif">Photo and signature correction window guidelines published.</a>
                    </div>
                    <div className="notification-list__time">Notice Board</div>
                  </div>
                </li>

                <li className="notification-list__item">
                  <span className="notification-list__icon notification-list__icon--warning"></span>
                  <div className="notification-list__content">
                    <div className="notification-list__text">
                      <a href="#notif">Please ensure community certificate upload is completed before deadline for reservation benefits.</a>
                    </div>
                    <div className="notification-list__time">Advisory</div>
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
    </div>
  );
}

export default DashboardPage;
