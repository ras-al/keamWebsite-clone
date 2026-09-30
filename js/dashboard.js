/* ============================================================
   DASHBOARD.JS - Page-specific JavaScript for dashboard.html
   Author: Faheem Shan
   Dependencies: js/main.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Mock Candidate Data -----
     Simulated data to populate the dashboard.
     In Phase 2, this will come from the backend API.
  */
  var candidateData = {
    name: 'Arjun Krishnan S',
    applicationNo: 'KEAM2026018374',
    exam: 'KEAM 2026 - Engineering',
    category: 'General',
    dob: '15-03-2008',
    gender: 'Male',
    phone: '+91 94976 XXXXX',
    email: 'arjun.k****@gmail.com',
    status: 'active',
    currentStep: 4  // 0-indexed: 0=Registration, 1=Application, 2=Payment, 3=Admit Card, 4=Exam, 5=Result, 6=Allotment
  };

  /* ----- Populate Profile Card ----- */
  var nameEl = qs('#profile-name');
  var appNoEl = qs('#profile-app-no');
  var examEl = qs('#profile-exam');
  var categoryEl = qs('#profile-category');
  var dobEl = qs('#profile-dob');
  var genderEl = qs('#profile-gender');
  var phoneEl = qs('#profile-phone');
  var emailEl = qs('#profile-email');

  if (nameEl) nameEl.textContent = candidateData.name;
  if (appNoEl) appNoEl.textContent = candidateData.applicationNo;
  if (examEl) examEl.textContent = candidateData.exam;
  if (categoryEl) categoryEl.textContent = candidateData.category;
  if (dobEl) dobEl.textContent = candidateData.dob;
  if (genderEl) genderEl.textContent = candidateData.gender;
  if (phoneEl) phoneEl.textContent = candidateData.phone;
  if (emailEl) emailEl.textContent = candidateData.email;

  /* ----- Timeline Step Interaction -----
     Mark steps as completed/active based on candidateData.currentStep
  */
  var timelineSteps = qsa('.timeline__step');
  timelineSteps.forEach(function (step, index) {
    if (index < candidateData.currentStep) {
      step.classList.add('timeline__step--completed');
      step.classList.remove('timeline__step--active');
    } else if (index === candidateData.currentStep) {
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
