/* ============================================================
   ADMIN.JS
   Logic for Admin Panel
   Author: Shan M A
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Application Data (empty by default, to be populated from backend/API)
  const applications = [];

  const tableBody = document.getElementById('admin-table-body');
  const searchInput = document.getElementById('admin-search-input');
  const searchBtn = document.getElementById('admin-search-btn');

  // Render Table function
  function renderTable(data) {
    if (!tableBody) return;
    tableBody.innerHTML = ''; // clear existing rows

    if (!data || data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem; color: var(--color-gray-500, #666);">No applications found.</td></tr>`;
      return;
    }

    data.forEach(app => {
      let badgeClass = '';
      if (app.status === 'Pending') badgeClass = 'status-badge--pending';
      else if (app.status === 'Approved') badgeClass = 'status-badge--approved';
      else if (app.status === 'Rejected') badgeClass = 'status-badge--rejected';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${app.id}</strong></td>
        <td>${app.name}</td>
        <td>${app.course}</td>
        <td>${app.date}</td>
        <td><span class="status-badge ${badgeClass}">${app.status}</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-icon--view" title="View Details" onclick="alert('Application ID: ' + '${app.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            ${app.status === 'Pending' ? `
            <button class="btn-icon btn-icon--approve" title="Approve" onclick="updateStatus('${app.id}', 'Approved')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="btn-icon btn-icon--reject" title="Reject" onclick="updateStatus('${app.id}', 'Rejected')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            ` : ''}
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Make updateStatus available globally for inline onclick handlers
  window.updateStatus = function(id, newStatus) {
    if(confirm(`Are you sure you want to mark application ${id} as ${newStatus}?`)) {
      const appIndex = applications.findIndex(a => a.id === id);
      if(appIndex > -1) {
        applications[appIndex].status = newStatus;
        renderTable(applications);
        updateStats();
      }
    }
  };

  function updateStats() {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const approved = applications.filter(a => a.status === 'Approved').length;

    const totalEl = document.getElementById('stat-total');
    const pendingEl = document.getElementById('stat-pending');
    const approvedEl = document.getElementById('stat-approved');

    if (totalEl) totalEl.innerText = total.toLocaleString();
    if (pendingEl) pendingEl.innerText = pending.toLocaleString();
    if (approvedEl) approvedEl.innerText = approved.toLocaleString();
  }

  // Search Functionality
  function handleSearch() {
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    const filtered = applications.filter(app => 
      (app.id && app.id.toLowerCase().includes(query)) || 
      (app.name && app.name.toLowerCase().includes(query))
    );
    renderTable(filtered);
  }

  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if(e.key === 'Enter') handleSearch();
    });
  }

  // Initial Render
  renderTable(applications);
  updateStats();
});

