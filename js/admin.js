/* ============================================================
   ADMIN.JS
   Logic for Admin Panel (mock data & actions)
   Author: Shan M A
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Data for Applications
  const mockApplications = [
    { id: 'KEAM260012', name: 'Arjun K', course: 'Engineering', date: '2026-05-12', status: 'Pending' },
    { id: 'KEAM260089', name: 'Meenakshi R', course: 'Medical', date: '2026-05-14', status: 'Approved' },
    { id: 'KEAM260104', name: 'Rahul S', course: 'Architecture', date: '2026-05-15', status: 'Pending' },
    { id: 'KEAM260233', name: 'Anjali V', course: 'LLB (5 Year)', date: '2026-05-18', status: 'Rejected' },
    { id: 'KEAM260341', name: 'Vishnu P', course: 'Engineering', date: '2026-05-20', status: 'Approved' },
    { id: 'KEAM260405', name: 'Devika M', course: 'PG Medical', date: '2026-05-21', status: 'Pending' }
  ];

  const tableBody = document.getElementById('admin-table-body');
  const searchInput = document.getElementById('admin-search-input');
  const searchBtn = document.getElementById('admin-search-btn');

  // Render Table function
  function renderTable(data) {
    tableBody.innerHTML = ''; // clear existing rows

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem;">No applications found.</td></tr>`;
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
            <button class="btn-icon btn-icon--view" title="View Details" onclick="alert('Viewing details for ${app.id}')">
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
      const appIndex = mockApplications.findIndex(a => a.id === id);
      if(appIndex > -1) {
        mockApplications[appIndex].status = newStatus;
        // Re-render and update stats
        renderTable(mockApplications);
        updateStats();
      }
    }
  };

  function updateStats() {
    const total = mockApplications.length;
    const pending = mockApplications.filter(a => a.status === 'Pending').length;
    const approved = mockApplications.filter(a => a.status === 'Approved').length;

    // We keep a static base and add the mock array counts to it to simulate a larger DB
    document.getElementById('stat-total').innerText = (1240 + total).toLocaleString();
    document.getElementById('stat-pending').innerText = (310 + pending).toLocaleString();
    document.getElementById('stat-approved').innerText = (888 + approved).toLocaleString();
  }

  // Search Functionality
  function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = mockApplications.filter(app => 
      app.id.toLowerCase().includes(query) || 
      app.name.toLowerCase().includes(query)
    );
    renderTable(filtered);
  }

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') handleSearch();
  });

  // Initial Render
  renderTable(mockApplications);
  updateStats();
});
