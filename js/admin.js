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

  // ===== 6. INITIAL LOAD =====
  // Load all applications when the page first opens
  loadApplications();
});
