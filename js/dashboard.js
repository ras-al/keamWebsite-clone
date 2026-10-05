/* ============================================================
   DASHBOARD.JS - Page-specific JavaScript for dashboard.html
   Author: Faheem Shan (B24CSA20)
   Role: Student Dashboard Controller & Application API Binding
   Dependencies: js/main.js, js/api.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', async function () {

  /* ──────────────────────────────────────────────────────────
     1. AUTHENTICATION GUARD
     Check if the candidate has a valid session.
     If no token or saved candidate exists, redirect to login.
     ────────────────────────────────────────────────────────── */
  var token = localStorage.getItem('token');
  var savedCandidate = null;

  try {
    var storedCandidateStr = localStorage.getItem('keam_candidate');
    if (storedCandidateStr) {
      savedCandidate = JSON.parse(storedCandidateStr);
    }
  } catch (e) {
    savedCandidate = null;
  }

  // If user is completely unauthenticated, redirect to login page
  if (!token && !savedCandidate) {
    var isPagesFolder = window.location.pathname.includes('/pages/');
    window.location.href = isPagesFolder ? 'login.html' : 'pages/login.html';
    return;
  }


  /* ──────────────────────────────────────────────────────────
     2. DOM ELEMENT SELECTORS
     ────────────────────────────────────────────────────────── */
  var nameEl = qs('#profile-name');
  var appNoEl = qs('#profile-app-no');
  var examEl = qs('#profile-exam');
  var categoryEl = qs('#profile-category');
  var dobEl = qs('#profile-dob');
  var genderEl = qs('#profile-gender');
  var phoneEl = qs('#profile-phone');
  var emailEl = qs('#profile-email');
  var statusTagEl = qs('.profile-card__status-tag');
  var timelineSteps = qsa('.timeline__step');


  /* ──────────────────────────────────────────────────────────
     3. RENDER PROFILE CARD & TIMELINE
     Populates UI with data from candidate or application object.
     ────────────────────────────────────────────────────────── */
  function renderDashboard(candidate, application) {
    // A. Personal Details
    var name =
      application?.personalDetails?.candidateName ||
      candidate?.fullName ||
      candidate?.name ||
      'Candidate';

    var appNo =
      application?.applicationNumber ||
      candidate?.applicationNumber ||
      candidate?.applicationNo ||
      candidate?.appNo ||
      '-';

    var exam =
      (application?.courseSelections && application.courseSelections.length > 0)
        ? application.courseSelections.join(', ')
        : (candidate?.exam || candidate?.course || 'Engineering (KEAM 2026)');

    var category =
      application?.personalDetails?.category ||
      candidate?.category ||
      'General';

    var dob =
      application?.personalDetails?.dob ||
      candidate?.dob ||
      '-';

    var gender =
      application?.personalDetails?.gender ||
      candidate?.gender ||
      '-';

    var phone =
      application?.communicationDetails?.mobileNumber ||
      candidate?.mobileNumber ||
      candidate?.phone ||
      candidate?.mobile ||
      '-';

    var email =
      application?.communicationDetails?.email ||
      candidate?.email ||
      '-';

    var status =
      application?.status ||
      candidate?.status ||
      'Active';

    // B. Inject text into DOM
    if (nameEl) nameEl.textContent = name;
    if (appNoEl) appNoEl.textContent = appNo;
    if (examEl) examEl.textContent = exam;
    if (categoryEl) categoryEl.textContent = category;
    if (dobEl) dobEl.textContent = dob;
    if (genderEl) genderEl.textContent = gender;
    if (phoneEl) phoneEl.textContent = phone;
    if (emailEl) emailEl.textContent = email;
    if (statusTagEl) {
      statusTagEl.textContent = status;
      // Style tag color depending on status
      statusTagEl.className = 'profile-card__status-tag';
      if (status === 'Defective') {
        statusTagEl.style.backgroundColor = 'var(--color-error)';
        statusTagEl.style.color = '#fff';
      } else if (status === 'Submitted' || status === 'Approved') {
        statusTagEl.style.backgroundColor = 'var(--color-success)';
        statusTagEl.style.color = '#fff';
      }
    }

    // C. Dynamic Timeline Steps (0 to 6)
    // 0: Registration
    // 1: Application Submitted
    // 2: Fee Payment
    // 3: Admit Card
    // 4: Examination
    // 5: Results
    // 6: Allotment
    var activeStepIndex = 1; // Default: Registered, application in progress

    if (application && application.status === 'Submitted') {
      // Once submitted with simulated fee payment:
      // Steps 0 (Registration), 1 (Application Submitted), and 2 (Fee Payment) are complete!
      // Step 3 (Admit Card) is the current active stage.
      activeStepIndex = 3;
    } else if (application && application.status === 'Approved') {
      activeStepIndex = 3;
    } else if (candidate && typeof candidate.currentStep === 'number') {
      activeStepIndex = candidate.currentStep;
    }

    timelineSteps.forEach(function (step, index) {
      step.classList.remove('timeline__step--completed', 'timeline__step--active');
      if (index < activeStepIndex) {
        step.classList.add('timeline__step--completed');
      } else if (index === activeStepIndex) {
        step.classList.add('timeline__step--active');
      }
    });

    // D. Show Defective Notice Banner if admin flagged defects
    if (status === 'Defective' && application?.remarks) {
      showDefectBanner(application.remarks);
    }
  }

  /**
   * Display a warning banner if the application requires corrections
   */
  function showDefectBanner(remarks) {
    var existingBanner = qs('#defect-banner');
    if (existingBanner) return;

    var banner = document.createElement('div');
    banner.id = 'defect-banner';
    banner.style.cssText =
      'background: #fff3cd; color: #856404; border: 1px solid #ffeeba; ' +
      'padding: 14px 20px; border-radius: 8px; margin-bottom: 24px; font-size: 14px;';
    banner.innerHTML =
      '<strong>Attention Required:</strong> Your application has been marked as <em>Defective</em>. ' +
      '<br>Remarks: ' + (remarks || 'Please verify and re-upload required documents.') +
      ' <a href="application.html" style="color: #533f03; text-decoration: underline; font-weight: bold; margin-left: 8px;">Fix Application</a>';

    var container = qs('.dashboard-layout .container');
    if (container) {
      container.insertBefore(banner, container.firstChild);
    }
  }


  /* ──────────────────────────────────────────────────────────
     4. LOAD INITIAL DATA & SYNC WITH BACKEND API
     ────────────────────────────────────────────────────────── */
  var cachedApp = null;
  try {
    var storedAppStr = localStorage.getItem('keam_application');
    if (storedAppStr) {
      cachedApp = JSON.parse(storedAppStr);
    }
  } catch (e) {
    cachedApp = null;
  }

  // Render immediately from cache for fastest response
  renderDashboard(savedCandidate, cachedApp);

  // If token is present, fetch the fresh application record from backend
  if (token && typeof API !== 'undefined') {
    try {
      var res = await API.get('/api/application/my-application');
      if (res && res.success && res.data) {
        var liveApp = res.data;
        localStorage.setItem('keam_application', JSON.stringify(liveApp));
        renderDashboard(savedCandidate, liveApp);
      }
    } catch (err) {
      console.warn('Backend API connection offline, running in offline mode:', err);
    }
  }


  /* ──────────────────────────────────────────────────────────
     5. LOGOUT BUTTON HANDLER
     ────────────────────────────────────────────────────────── */
  var logoutBtns = qsa('a[href="login.html"], .dashboard-header__actions .btn--outline');
  logoutBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Clear authentication credentials
      localStorage.removeItem('token');
      localStorage.removeItem('keam_candidate');
      localStorage.removeItem('candidate');
      localStorage.removeItem('keam_application');

      // Redirect to login page
      var isPagesFolder = window.location.pathname.includes('/pages/');
      window.location.href = isPagesFolder ? 'login.html' : 'pages/login.html';
    });
  });


  /* ──────────────────────────────────────────────────────────
     6. QUICK ACTION CARD HANDLERS
     ────────────────────────────────────────────────────────── */
  var actionCards = qsa('.action-card:not(.action-card--disabled)');
  actionCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      var id = card.id;

      if (id === 'action-documents') {
        // Go straight to application form documents step
        e.preventDefault();
        window.location.href = 'application.html#step-documents';
        return;
      }

      if (id === 'action-admit-card') {
        e.preventDefault();
        alert('Admit card will be generated once application verification is finalized by CEE.');
        return;
      }

      if (id === 'action-rank-card' || id === 'action-allotment') {
        e.preventDefault();
        alert('This phase will open following the KEAM Entrance Examination.');
        return;
      }

      // Visual feedback click effect
      card.style.borderColor = 'var(--color-gold)';
      setTimeout(function () {
        card.style.borderColor = '';
      }, 600);
    });
  });


  /* ──────────────────────────────────────────────────────────
     7. LIVE CLOCK
     ────────────────────────────────────────────────────────── */
  var datetimeEl = qs('#current-datetime');
  if (datetimeEl) {
    datetimeEl.textContent = formatDateTime(new Date());
    setInterval(function () {
      datetimeEl.textContent = formatDateTime(new Date());
    }, 1000);
  }

  /* ──────────────────────────────────────────────────────────
     8. NOTIFICATION "NEW" BADGE PULSE
     ────────────────────────────────────────────────────────── */
  var newBadges = qsa('.notification-list__badge');
  newBadges.forEach(function (badge) {
    badge.style.animation = 'badgePulse 2s ease-in-out infinite';
  });

  if (newBadges.length > 0) {
    var style = document.createElement('style');
    style.textContent = '@keyframes badgePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }';
    document.head.appendChild(style);
  }

});
