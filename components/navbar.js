/* ============================================================
   NAVBAR.JS — Shared navigation component
   Author: Ayman Riaz (B24CSA17)

   Injects a fully styled, responsive navbar into #navbar
   on every page. Auto-detects root vs. subpage paths.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    // --- Detect if we are in root (index.html) or in pages/ subfolder ---
    var isSubPage = window.location.pathname.indexOf('/pages/') !== -1;
    var rootPrefix = isSubPage ? '../' : '';
    var pagesPrefix = isSubPage ? '' : 'pages/';

    // --- Detect current page for active link highlighting ---
    var path = window.location.pathname.toLowerCase();
    function isActive(page) {
      if (page === 'index' || page === 'home') {
        return path.endsWith('index.html') || path.endsWith('/') || path === '';
      }
      return path.indexOf(page) !== -1;
    }

    function activeClass(page) {
      return isActive(page) ? 'navbar__link--active' : '';
    }

    function mobileActiveClass(page) {
      return isActive(page) ? 'navbar__mobile-link--active' : '';
    }

    // --- Navigation items ---
    var navItems = [
      { label: 'Home',        page: 'index',       href: rootPrefix + 'index.html' },
      { label: 'Dashboard',   page: 'dashboard',   href: pagesPrefix + 'dashboard.html' },
      { label: 'Application', page: 'application', href: pagesPrefix + 'application.html' },
      { label: 'Admin',       page: 'admin',       href: pagesPrefix + 'admin.html' },
      { label: 'Status',      page: 'status',      href: pagesPrefix + 'status.html' }
    ];

    var ctaItem = { label: 'Login / Register', page: 'login', href: pagesPrefix + 'login.html' };

    // --- Build desktop nav links ---
    var desktopLinks = '';
    navItems.forEach(function (item) {
      desktopLinks += '<li><a href="' + item.href + '" class="navbar__link ' + activeClass(item.page) + '">' + item.label + '</a></li>';
    });
    desktopLinks += '<li><a href="' + ctaItem.href + '" class="navbar__link navbar__link--cta ' + activeClass(ctaItem.page) + '">' + ctaItem.label + '</a></li>';

    // --- Build mobile menu links ---
    var mobileLinks = '';
    navItems.forEach(function (item) {
      mobileLinks += '<a href="' + item.href + '" class="navbar__mobile-link ' + mobileActiveClass(item.page) + '">' + item.label + '</a>';
    });
    mobileLinks += '<a href="' + ctaItem.href + '" class="navbar__mobile-link navbar__mobile-link--cta ' + mobileActiveClass(ctaItem.page) + '">&#x1F512; ' + ctaItem.label + '</a>';

    // --- Inject navbar HTML ---
    navbar.innerHTML =
      '<nav class="navbar" role="navigation" aria-label="Main navigation">' +
        '<a href="' + rootPrefix + 'index.html" class="navbar__brand">' +
          '<img src="' + rootPrefix + 'assets/logo.png" alt="CEE Kerala" class="navbar__logo">' +
          '<span class="navbar__title">' +
            'CEE Kerala' +
            '<span class="navbar__title-sub">Entrance Examination Portal</span>' +
          '</span>' +
        '</a>' +

        '<ul class="navbar__links">' +
          desktopLinks +
        '</ul>' +

        '<button class="navbar__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<line x1="3" y1="6"  x2="21" y2="6" />' +
            '<line x1="3" y1="12" x2="21" y2="12" />' +
            '<line x1="3" y1="18" x2="21" y2="18" />' +
          '</svg>' +
        '</button>' +
      '</nav>' +

      '<div class="navbar__mobile-menu" id="mobile-menu">' +
        mobileLinks +
      '</div>';

    // --- Mobile menu toggle ---
    var toggleBtn = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        // Animate hamburger to X
        if (isOpen) {
          toggleBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="18" y1="6"  x2="6"  y2="18" />' +
              '<line x1="6"  y1="6"  x2="18" y2="18" />' +
            '</svg>';
        } else {
          toggleBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="3" y1="6"  x2="21" y2="6" />' +
              '<line x1="3" y1="12" x2="21" y2="12" />' +
              '<line x1="3" y1="18" x2="21" y2="18" />' +
            '</svg>';
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="3" y1="6"  x2="21" y2="6" />' +
              '<line x1="3" y1="12" x2="21" y2="12" />' +
              '<line x1="3" y1="18" x2="21" y2="18" />' +
            '</svg>';
        }
      });
    }
  });
})();
