/* ============================================================
   MAIN.JS — Shared JavaScript utilities
   All team members can use these helpers in their pages.
   ============================================================ */

/**
 * Shortcut for document.querySelector
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to search within
 * @returns {Element|null}
 */
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Shortcut for document.querySelectorAll (returns real Array)
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to search within
 * @returns {Element[]}
 */
function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Format a Date object to "DD-MM-YYYY" string
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

/**
 * Format a Date object to a readable day/time string
 * e.g. "Tue, 22-07-2026 11:38:22"
 * @param {Date} date
 * @returns {string}
 */
function formatDateTime(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');
  return `${day}, ${dd}-${mm}-${yyyy} ${hh}:${min}:${sec}`;
}

/**
 * Show/hide an element by toggling a CSS class
 * @param {Element} el
 * @param {string} [className='hidden']
 */
function toggleVisibility(el, className = 'hidden') {
  if (el) el.classList.toggle(className);
}

/* ----- DOM Ready ----- */
document.addEventListener('DOMContentLoaded', function () {
  // Update the date/time display if one exists on the page
  var dateEl = qs('#current-datetime');
  if (dateEl) {
    dateEl.textContent = formatDateTime(new Date());
  }
});
