/* ============================================================
   FOOTER.JS - Shared footer component
   Author: Ayman Riaz (B24CSA17)

   Injects a styled, multi-column footer into #footer
   on every page. Auto-detects root vs. subpage paths.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var footer = document.getElementById('footer');
    if (!footer) return;

    // --- Detect if we are in root (index.html) or in pages/ subfolder ---
    var isSubPage = window.location.pathname.indexOf('/pages/') !== -1;
    var rootPrefix = isSubPage ? '../' : '';
    var pagesPrefix = isSubPage ? '' : 'pages/';

    // --- Current year for copyright ---
    var year = new Date().getFullYear();

    // --- SVG icons for contact section ---
    var iconPhone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>' +
      '</svg>';

    var iconMail = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>' +
      '<polyline points="22,6 12,13 2,6"/>' +
      '</svg>';

    var iconMap = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>' +
      '<circle cx="12" cy="10" r="3"/>' +
      '</svg>';

    var iconClock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="10"/>' +
      '<polyline points="12 6 12 12 16 14"/>' +
      '</svg>';

    // --- Inject footer HTML ---
    footer.innerHTML =
      '<div class="footer">' +

      '<div class="footer__grid">' +

      // Column 1: Quick Links
      '<div class="footer__col">' +
      '<h4 class="footer__heading">Quick Links</h4>' +
      '<ul class="footer__list">' +
      '<li><a href="' + rootPrefix + 'index.html">Home</a></li>' +
      '<li><a href="' + pagesPrefix + 'dashboard.html">Candidate Dashboard</a></li>' +
      '<li><a href="' + pagesPrefix + 'application.html">Application Form</a></li>' +
      '<li><a href="' + pagesPrefix + 'login.html">Login / Register</a></li>' +
      '<li><a href="' + pagesPrefix + 'admin.html">Admin Panel</a></li>' +
      '<li><a href="' + pagesPrefix + 'status.html">Application Status</a></li>' +
      '</ul>' +
      '</div>' +

      // Column 2: Contact Information
      '<div class="footer__col">' +
      '<h4 class="footer__heading">Contact Us</h4>' +
      '<div class="footer__contact-item">' +
      '<span class="footer__contact-icon">' + iconPhone + '</span>' +
      '<span>0471-2525300 / 2338487</span>' +
      '</div>' +
      '<div class="footer__contact-item">' +
      '<span class="footer__contact-icon">' + iconMail + '</span>' +
      '<span>caborhelp@cee.kerala.gov.in</span>' +
      '</div>' +
      '<div class="footer__contact-item">' +
      '<span class="footer__contact-icon">' + iconMap + '</span>' +
      '<span>Office of the Commissioner for Entrance Examinations,<br>Housing Board Buildings, Santhi Nagar,<br>Thiruvananthapuram - 695001</span>' +
      '</div>' +
      '<div class="footer__contact-item">' +
      '<span class="footer__contact-icon">' + iconClock + '</span>' +
      '<span>Mon - Sat: 10:00 AM - 5:00 PM</span>' +
      '</div>' +
      '</div>' +

      // Column 3: About
      '<div class="footer__col">' +
      '<h4 class="footer__heading">About This Project</h4>' +
      '<p class="footer__about-text">' +
      'This is an academic clone of the CEE Kerala entrance examination portal, ' +
      'developed as part of the Advanced Web Technologies (AWT) course at ' +
      'TKM College of Engineering, Kollam.' +
      '</p>' +
      '<p class="footer__about-text">' +
      'Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).' +
      '</p>' +
      '<span class="footer__disclaimer">' +
      '⚠ Academic use only - Not affiliated with the Government of Kerala.' +
      '</span>' +
      '</div>' +

      '</div>' +

      // Bottom copyright bar
      '<div class="footer__bottom">' +
      '<span>&copy; ' + year + ' KEAM Portal Clone - TKM College of Engineering, Kollam</span>' +
      '<span>AWT Project &middot; Faculty Guide: Dr. Reshma Sheikh</span>' +
      '</div>' +

      '</div>';
  });
})();
