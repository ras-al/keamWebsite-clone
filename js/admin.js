/* ============================================================
   ADMIN.JS
   Logic for Admin Panel — connects to backend API
   Author: Shan M A (B24CSA59)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== 0. AUTHENTICATION & ROLE GUARD =====
  const token = localStorage.getItem('token');
  let currentCandidate = null;
  try {
    const raw = localStorage.getItem('keam_candidate') || localStorage.getItem('candidate');
    if (raw) currentCandidate = JSON.parse(raw);
  } catch (e) {
    currentCandidate = null;
  }

  // If not logged in at all, redirect to login page
  if (!token) {
    alert('Access restricted: Please log in as an administrator to access this page.');
    window.location.href = 'login.html';
    return;
  }

  // If logged in as a candidate without admin role, redirect to student dashboard
  if (currentCandidate && currentCandidate.role && currentCandidate.role !== 'admin' && currentCandidate.role !== 'superadmin') {
    alert('Access denied: Administrator privileges required.');
    window.location.href = 'dashboard.html';
    return;
  }

  // DOM element references
  const tableBody = document.getElementById('admin-table-body');
  const searchInput = document.getElementById('admin-search-input');
  const searchBtn = document.getElementById('admin-search-btn');

  // ===== 1. LOAD APPLICATIONS FROM BACKEND =====
  // Fetches all applications from /api/admin/applications
  // Uses the shared API.get() helper from api.js

  async function loadApplications() {
    try {
      const result = await API.get('/api/admin/applications');

      if (result.success) {
        renderTable(result.data);     // draw the table rows
        updateStatsCards(result.data); // update the stat numbers
      } else {
        console.error('Failed to load applications:', result.message);
        renderTable([]);  // show empty table
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      renderTable([]);
    }
  }

  // ===== 2. RENDER TABLE ROWS =====
  // Takes an array of application objects and builds HTML table rows
  // Uses template literals to create each row's HTML

  function renderTable(data) {
    if (!tableBody) return;
    tableBody.innerHTML = ''; // clear existing rows

    // If no data, show a "no applications found" message
    if (!data || data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem; color: var(--color-gray-500, #666);">No applications found.</td></tr>`;
      return;
    }

    // Loop through each application and create a table row
    data.forEach(app => {
      // Get display-friendly values from the nested application object
      const appId = app.applicationNumber || app._id;
      const name = app.personalDetails?.candidateName || 'N/A';
      const course = (app.courseSelections && app.courseSelections[0]) || 'Engineering';
      const date = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A';
      const status = app.status || 'Submitted';

      // Pick the right CSS class for the status badge
      let badgeClass = '';
      if (status === 'Submitted' || status === 'Under Verification') {
        badgeClass = 'status-badge--pending';
      } else if (status === 'Approved') {
        badgeClass = 'status-badge--approved';
      } else if (status === 'Rejected' || status === 'Defective') {
        badgeClass = 'status-badge--rejected';
      }

      // Build the row HTML using template literals
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${appId}</strong></td>
        <td>${name}</td>
        <td>${course}</td>
        <td>${date}</td>
        <td><span class="status-badge ${badgeClass}">${status}</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-icon--view" title="View Details" onclick="alert('Application: ${appId}\\nName: ${name}\\nCourse: ${course}\\nStatus: ${status}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            ${status !== 'Approved' && status !== 'Rejected' ? `
            <button class="btn-icon btn-icon--approve" title="Approve" onclick="updateStatus('${app._id}', 'Approved')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="btn-icon btn-icon--reject" title="Reject" onclick="updateStatus('${app._id}', 'Rejected')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            ` : ''}
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // ===== 3. UPDATE APPLICATION STATUS =====
  // Sends a PUT request to the backend to approve/reject an application
  // Uses the shared API.put() helper from api.js

  window.updateStatus = async function(id, newStatus) {
    // Ask admin for a remark (reason for approval/rejection)
    const remarks = prompt(`Enter remarks for ${newStatus}:`);

    // If admin clicks Cancel on the prompt, do nothing
    if (remarks === null) return;

    try {
      // Send PUT request to update the status
      const result = await API.put(`/api/admin/applications/${id}/status`, {
        status: newStatus,
        remarks: remarks
      });

      if (result.success) {
        alert(`Application ${newStatus} successfully!`);
        loadApplications(); // Refresh the table with updated data
      } else {
        alert('Error: ' + (result.message || 'Failed to update status'));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update application status. Please try again.');
    }
  };

  // ===== 4. UPDATE STATS CARDS =====
  // Counts total, pending, and approved applications and updates the UI

  function updateStatsCards(data) {
    const total = data.length;
    const pending = data.filter(a =>
      a.status === 'Submitted' || a.status === 'Under Verification'
    ).length;
    const approved = data.filter(a => a.status === 'Approved').length;

    // Update the stat card numbers in the HTML
    const totalEl = document.getElementById('stat-total');
    const pendingEl = document.getElementById('stat-pending');
    const approvedEl = document.getElementById('stat-approved');

    if (totalEl) totalEl.innerText = total.toLocaleString();
    if (pendingEl) pendingEl.innerText = pending.toLocaleString();
    if (approvedEl) approvedEl.innerText = approved.toLocaleString();
  }

  // ===== 5. SEARCH FUNCTIONALITY =====
  // Filters applications by sending search query to the backend API

  async function handleSearch() {
    if (!searchInput) return;
    const query = searchInput.value.trim();

    if (!query) {
      // If search box is empty, load all applications
      loadApplications();
      return;
    }

    try {
      // Send search query to backend — server does the filtering
      const result = await API.get(`/api/admin/applications?search=${encodeURIComponent(query)}`);

      if (result.success) {
        renderTable(result.data);
        updateStatsCards(result.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  // Attach event listeners for search button and Enter key
  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }

  // ===== 6. ANNOUNCEMENTS & LIVE TICKER MANAGEMENT =====
  // Managed by Admin: full CRUD without predefined seed data fallback
  const noticeTableBody = document.getElementById('admin-notifications-body');
  const noticeFormContainer = document.getElementById('notice-form-container');
  const noticeForm = document.getElementById('notice-form');
  const btnToggleNoticeForm = document.getElementById('btn-toggle-notice-form');
  const btnCloseNoticeForm = document.getElementById('btn-close-notice-form');
  const btnCancelNotice = document.getElementById('btn-cancel-notice');
  const noticeIdInput = document.getElementById('notice-id');
  const noticeTitleInput = document.getElementById('notice-title');
  const noticeCategoryInput = document.getElementById('notice-category');
  const noticeTypeInput = document.getElementById('notice-type');
  const noticeLinkInput = document.getElementById('notice-link');
  const noticeBadgeInput = document.getElementById('notice-badge');
  const noticeFormModeTitle = document.getElementById('notice-form-mode-title');
  const btnSaveNotice = document.getElementById('btn-save-notice');
  const statNotifications = document.getElementById('stat-notifications');
  const filterPills = document.querySelectorAll('#notice-filter-pills .filter-pill');

  let allNotices = [];
  let currentNoticeFilter = 'all';

  // Open / Close Form
  function openNoticeForm(isEdit = false) {
    if (!noticeFormContainer) return;
    noticeFormContainer.style.display = 'block';
    if (!isEdit) {
      noticeForm.reset();
      noticeIdInput.value = '';
      noticeLinkInput.value = '#';
      noticeCategoryInput.value = 'General';
      noticeTypeInput.value = 'ticker';
      noticeBadgeInput.value = '';
      if (noticeFormModeTitle) noticeFormModeTitle.textContent = 'Create Announcement';
      if (btnSaveNotice) btnSaveNotice.textContent = 'Publish Announcement';
    }
    noticeTitleInput?.focus();
  }

  function closeNoticeForm() {
    if (!noticeFormContainer) return;
    noticeFormContainer.style.display = 'none';
    noticeForm.reset();
    noticeIdInput.value = '';
  }

  if (btnToggleNoticeForm) {
    btnToggleNoticeForm.addEventListener('click', () => {
      if (noticeFormContainer.style.display === 'none') {
        openNoticeForm(false);
      } else {
        closeNoticeForm();
      }
    });
  }

  if (btnCloseNoticeForm) btnCloseNoticeForm.addEventListener('click', closeNoticeForm);
  if (btnCancelNotice) btnCancelNotice.addEventListener('click', closeNoticeForm);

  // Load announcements from API
  async function loadNotifications() {
    try {
      const result = await API.get('/api/notifications');
      if (result.success && Array.isArray(result.data)) {
        allNotices = result.data;
        if (statNotifications) statNotifications.innerText = allNotices.length.toLocaleString();
        renderNotificationsTable();
      } else {
        allNotices = [];
        if (statNotifications) statNotifications.innerText = '0';
        renderNotificationsTable();
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
      allNotices = [];
      renderNotificationsTable();
    }
  }

  // Render notifications table
  function renderNotificationsTable() {
    if (!noticeTableBody) return;
    noticeTableBody.innerHTML = '';

    let filtered = allNotices;
    if (currentNoticeFilter === 'ticker') {
      filtered = allNotices.filter(n => n.isTicker);
    } else if (currentNoticeFilter === 'list') {
      filtered = allNotices.filter(n => !n.isTicker);
    }

    if (filtered.length === 0) {
      noticeTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 2.5rem; color: var(--color-gray-500, #666);">
            No announcements found in this category. Click <strong>"New Announcement"</strong> to publish one!
          </td>
        </tr>`;
      return;
    }

    filtered.forEach(notice => {
      const row = document.createElement('tr');
      const isTicker = Boolean(notice.isTicker);
      const placementClass = isTicker ? 'badge-placement--ticker' : 'badge-placement--board';
      const placementText = isTicker ? '📢 Ticker' : '📋 Notice Board';
      const nextPlacementText = isTicker ? 'Switch to Notice Board' : 'Switch to Ticker';
      const badgeHTML = notice.badge
        ? `<span class="badge-tag">${notice.badge}</span>`
        : '<span style="color: var(--color-gray-400, #999);">-</span>';
      const dateText = notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : 'N/A';
      const linkText = notice.link && notice.link !== '#'
        ? `<div style="font-size: var(--fs-xs); color: var(--color-gray-500, #666); margin-top: 2px;"><a href="${notice.link}" target="_blank" style="color: var(--color-primary);">${notice.link}</a></div>`
        : '';

      row.innerHTML = `
        <td>
          <span class="badge-placement ${placementClass}">${placementText}</span>
        </td>
        <td>
          <strong>${notice.title}</strong>
          ${linkText}
        </td>
        <td>
          <span class="badge-tag badge-tag--general">${notice.category || 'General'}</span>
        </td>
        <td>${badgeHTML}</td>
        <td>${dateText}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-icon--toggle" title="${nextPlacementText}" onclick="toggleNoticePlacement('${notice._id}', ${isTicker})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            </button>
            <button class="btn-icon btn-icon--edit" title="Edit Announcement" onclick="editNotice('${notice._id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="btn-icon btn-icon--delete" title="Delete Announcement" onclick="deleteNotice('${notice._id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      `;
      noticeTableBody.appendChild(row);
    });
  }

  // Filter Pills listener
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('filter-pill--active'));
      pill.classList.add('filter-pill--active');
      currentNoticeFilter = pill.getAttribute('data-filter') || 'all';
      renderNotificationsTable();
    });
  });

  // Toggle placement between Ticker and Notice Board
  window.toggleNoticePlacement = async function (id, currentIsTicker) {
    try {
      const result = await API.put(`/api/notifications/${id}`, {
        isTicker: !currentIsTicker
      });
      if (result.success) {
        loadNotifications();
      } else {
        alert(result.message || 'Failed to toggle placement');
      }
    } catch (err) {
      console.error('Error toggling placement:', err);
      alert('Network error while toggling placement');
    }
  };

  // Edit notice
  window.editNotice = function (id) {
    const notice = allNotices.find(n => n._id === id);
    if (!notice) return;

    noticeIdInput.value = notice._id;
    noticeTitleInput.value = notice.title || '';
    noticeCategoryInput.value = notice.category || 'General';
    noticeTypeInput.value = notice.isTicker ? 'ticker' : 'list';
    noticeLinkInput.value = notice.link || '#';
    noticeBadgeInput.value = notice.badge || '';

    if (noticeFormModeTitle) noticeFormModeTitle.textContent = 'Edit Announcement';
    if (btnSaveNotice) btnSaveNotice.textContent = 'Update Announcement';

    openNoticeForm(true);
    noticeFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Delete notice
  window.deleteNotice = async function (id) {
    if (!confirm('Are you sure you want to permanently delete this announcement?')) return;

    try {
      const result = await API.delete(`/api/notifications/${id}`);
      if (result.success) {
        loadNotifications();
      } else {
        alert(result.message || 'Failed to delete announcement');
      }
    } catch (err) {
      console.error('Error deleting announcement:', err);
      alert('Network error while deleting announcement');
    }
  };

  // Form submit (Create or Update)
  if (noticeForm) {
    noticeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = noticeIdInput.value.trim();
      const payload = {
        title: noticeTitleInput.value.trim(),
        category: noticeCategoryInput.value,
        isTicker: noticeTypeInput.value === 'ticker',
        link: noticeLinkInput.value.trim() || '#',
        badge: noticeBadgeInput.value
      };

      if (!payload.title) {
        alert('Please enter an announcement headline.');
        return;
      }

      try {
        let result;
        if (id) {
          result = await API.put(`/api/notifications/${id}`, payload);
        } else {
          result = await API.post('/api/notifications', payload);
        }

        if (result.success) {
          closeNoticeForm();
          loadNotifications();
        } else {
          alert(result.message || 'Failed to save announcement');
        }
      } catch (err) {
        console.error('Error saving announcement:', err);
        alert('Network error while saving announcement');
      }
    });
  }

  // Sidebar link highlighting
  const navApp = document.getElementById('nav-applications-link');
  const navNotice = document.getElementById('nav-notifications-link');
  if (navApp && navNotice) {
    navApp.addEventListener('click', () => {
      navApp.classList.add('admin-nav__link--active');
      navNotice.classList.remove('admin-nav__link--active');
    });
    navNotice.addEventListener('click', () => {
      navNotice.classList.add('admin-nav__link--active');
      navApp.classList.remove('admin-nav__link--active');
    });
  }

  // ===== 7. INITIAL LOAD =====
  // Load applications and announcements when page opens
  loadApplications();
  loadNotifications();
});
