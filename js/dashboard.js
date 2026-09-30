/* ============================================================
   DASHBOARD.JS - Page-specific JavaScript for dashboard.html
   Author: Faheem Shan
   Dependencies: js/main.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Candidate Data -----
     Populate dynamically from authenticated candidate session or storage.
     In Phase 2, this is provided by GET /api/application/my-application.
  */
  var candidateData = null;
  try {
    var stored = localStorage.getItem('keam_candidate') || localStorage.getItem('keam_application');
    if (stored) {
      candidateData = JSON.parse(stored);
    }
  } catch (e) {
    candidateData = null;
  }

  /* ----- Populate Profile Card ----- */
  var nameEl = qs('#profile-name');
  var appNoEl = qs('#profile-app-no');
  var examEl = qs('#profile-exam');
  var categoryEl = qs('#profile-category');
  var dobEl = qs('#profile-dob');
  var genderEl = qs('#profile-gender');
  var phoneEl = qs('#profile-phone');
  var emailEl = qs('#profile-email');
  var statusTagEl = qs('.profile-card__status-tag');

  if (candidateData) {
    if (nameEl) nameEl.textContent = candidateData.fullName || candidateData.name || '-';
    if (appNoEl) appNoEl.textContent = candidateData.applicationNo || candidateData.appNo || '-';
    if (examEl) examEl.textContent = candidateData.exam || candidateData.course || '-';
    if (categoryEl) categoryEl.textContent = candidateData.category || '-';
    if (dobEl) dobEl.textContent = candidateData.dob || '-';
    if (genderEl) genderEl.textContent = candidateData.gender || '-';
    if (phoneEl) phoneEl.textContent = candidateData.phone || candidateData.mobile || '-';
    if (emailEl) emailEl.textContent = candidateData.email || '-';
    if (statusTagEl) statusTagEl.textContent = candidateData.status || 'Active';
  } else {
    if (nameEl) nameEl.textContent = 'Candidate Profile';
    if (appNoEl) appNoEl.textContent = '-';
    if (examEl) examEl.textContent = '-';
    if (categoryEl) categoryEl.textContent = '-';
    if (dobEl) dobEl.textContent = '-';
    if (genderEl) genderEl.textContent = '-';
    if (phoneEl) phoneEl.textContent = '-';
    if (emailEl) emailEl.textContent = '-';
    if (statusTagEl) statusTagEl.textContent = 'Not Logged In';
  }

  /* ----- Timeline Step Interaction -----
     Mark steps as completed/active based on candidateData.currentStep
  */
  var currentStep = (candidateData && typeof candidateData.currentStep === 'number') ? candidateData.currentStep : -1;
  var timelineSteps = qsa('.timeline__step');
  timelineSteps.forEach(function (step, index) {
    if (currentStep >= 0 && index < currentStep) {
      step.classList.add('timeline__step--completed');
      step.classList.remove('timeline__step--active');
    } else if (currentStep >= 0 && index === currentStep) {
      step.classList.add('timeline__step--active');
      step.classList.remove('timeline__step--completed');
    } else {
      step.classList.remove('timeline__step--completed');
      step.classList.remove('timeline__step--active');
    }
  });

  /* ----- Quick Action Card Click -----
     Simple click handler for non-disabled action cards
  */
  var actionCards = qsa('.action-card:not(.action-card--disabled)');
  actionCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var label = qs('.action-card__label', card);
      if (label) {
        // In Phase 1, just show a brief visual feedback
        card.style.borderColor = 'var(--color-gold)';
        setTimeout(function () {
          card.style.borderColor = '';
        }, 600);
      }
    });
  });

  /* ----- Update Date/Time in header ----- */
  var datetimeEl = qs('#current-datetime');
  if (datetimeEl) {
    datetimeEl.textContent = formatDateTime(new Date());
    // Update every second
    setInterval(function () {
      datetimeEl.textContent = formatDateTime(new Date());
    }, 1000);
  }

  /* ----- Notification "New" badge pulse -----
     Add a subtle animation class to new badges
  */
  var newBadges = qsa('.notification-list__badge');
  newBadges.forEach(function (badge) {
    badge.style.animation = 'badgePulse 2s ease-in-out infinite';
  });

  // Add pulse keyframes dynamically
  if (newBadges.length > 0) {
    var style = document.createElement('style');
    style.textContent = '@keyframes badgePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }';
    document.head.appendChild(style);
  }

});
