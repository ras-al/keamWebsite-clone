/* ============================================================
   STATUS.JS
   Logic for Application Status Tracking — connects to backend API
   Author: Shan M A (B24CSA59)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const statusForm = document.getElementById('status-form');
  const statusResults = document.getElementById('status-results');
  
  // Elements to update with results
  const resName = document.getElementById('res-name');
  const resAppNo = document.getElementById('res-app-no');
  const resCourse = document.getElementById('res-course');
  const resBadge = document.getElementById('res-badge');
  const resRemark = document.getElementById('res-remark');
  const alertBox = document.getElementById('status-alert');

  // Timeline Steps (5 steps in the status page)
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
    document.getElementById('step-5')
  ];

  // Not found error box
  const notFoundBox = document.getElementById('status-not-found');
  const notFoundMsg = document.getElementById('status-not-found-msg');

  // ===== FORM SUBMIT HANDLER =====
  // When user clicks "Check Status", fetch data from backend API

  statusForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Step 1: Get input values
    const appNo = document.getElementById('app-no').value.trim();
    const dob = document.getElementById('dob').value;
    
    // Step 2: Validate inputs
    if (!appNo || !dob) {
      alert('Please enter both Application Number and Date of Birth.');
      return;
    }

    // Step 3: Hide previous results
    if (notFoundBox) notFoundBox.style.display = 'none';
    if (statusResults) statusResults.style.display = 'none';

    // Step 4: Show loading state on button
    const btn = statusForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Checking...';
    btn.disabled = true;

    try {
      // Step 5: Call the backend API
      // GET /api/admin/status/:appNo?dob=YYYY-MM-DD
      const result = await API.get(
        `/api/admin/status/${encodeURIComponent(appNo)}?dob=${encodeURIComponent(dob)}`
      );

      // Step 6: Reset button
      btn.innerText = originalText;
      btn.disabled = false;

      // Step 7: Handle the response
      if (result.success) {
        // Hide error box and show results
        if (notFoundBox) notFoundBox.style.display = 'none';
        displayResults(result.data);
      } else {
        // Show error message
        if (statusResults) statusResults.style.display = 'none';
        showNotFound(result.message || 'No application found with matching details.');
      }
    } catch (error) {
      // Network error — reset button and show error
      btn.innerText = originalText;
      btn.disabled = false;
      console.error('Status check error:', error);
      showNotFound('Unable to connect to the server. Please try again later.');
    }
  });

  // ===== SHOW NOT FOUND ERROR =====
  function showNotFound(message) {
    if (notFoundBox) {
      if (notFoundMsg) {
        notFoundMsg.innerHTML = message;
      }
      notFoundBox.style.display = 'flex';
      notFoundBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ===== DISPLAY RESULTS =====
  // Shows the tracking data returned from the API

  function displayResults(data) {
    // Update Profile Info
    resName.innerText = data.candidateName || 'Candidate';
    resAppNo.innerText = data.applicationNumber || '-';
    resCourse.innerText = 'KEAM 2026';
    resRemark.innerText = data.remarks || 'No remarks at this time.';

    // Reset all timeline steps to default
    steps.forEach(step => {
      if (!step) return;
      step.classList.remove('completed', 'active', 'rejected');
      step.querySelector('p').innerText = 'Pending';
    });

    // Update timeline steps using the steps array from backend
    if (data.steps && data.steps.length > 0) {
      data.steps.forEach((stepData, index) => {
        if (!steps[index]) return;

        if (stepData.status === 'completed') {
          steps[index].classList.add('completed');
          steps[index].querySelector('p').innerText = 'Completed';
        } else if (stepData.status === 'active') {
          // If application is rejected/defective, show that on the active step
          if (data.status === 'Rejected' || data.status === 'Defective') {
            steps[index].classList.add('rejected');
            steps[index].querySelector('p').innerText = 'Failed/Rejected';
          } else {
            steps[index].classList.add('active');
            steps[index].querySelector('p').innerText = 'In Progress';
          }
        }
        // 'pending' steps stay as default (no class added)
      });
    }

    // Update Status Badge & Alert Box based on overall status
    resBadge.className = 'status-badge'; // reset classes
    alertBox.className = 'status-alert'; // reset classes

    if (data.status === 'Approved') {
      resBadge.classList.add('status-badge--approved');
      resBadge.innerText = 'Approved';
      alertBox.classList.add('status-alert--success');
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div><strong>Status:</strong> <span id="res-remark">${data.remarks || 'Application approved successfully.'}</span></div>
      `;
    } else if (data.status === 'Rejected' || data.status === 'Defective') {
      resBadge.classList.add('status-badge--rejected');
      resBadge.innerText = 'Action Required';
      alertBox.classList.add('status-alert--warning');
      alertBox.style.backgroundColor = '#FFEBEE';
      alertBox.style.borderColor = '#FFCDD2';
      alertBox.style.color = 'var(--color-error)';
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div><strong>Issue Found:</strong> <span id="res-remark">${data.remarks || 'Please contact the examination authority.'}</span></div>
      `;
    } else {
      resBadge.classList.add('status-badge--pending');
      resBadge.innerText = 'Pending Review';
      alertBox.classList.add('status-alert--warning');
      alertBox.removeAttribute('style'); // reset to css class styles
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div><strong>Current Remark:</strong> <span id="res-remark">${data.remarks || 'Your application is under review.'}</span></div>
      `;
    }

    // Show results section and scroll to it
    statusResults.style.display = 'block';
    statusResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
