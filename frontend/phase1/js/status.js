/* ============================================================
   STATUS.JS
   Logic for Application Status Tracking (mock data)
   Author: Shan M A
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const statusForm = document.getElementById('status-form');
  const statusResults = document.getElementById('status-results');
  
  // Elements to update
  const resName = document.getElementById('res-name');
  const resAppNo = document.getElementById('res-app-no');
  const resCourse = document.getElementById('res-course');
  const resBadge = document.getElementById('res-badge');
  const resRemark = document.getElementById('res-remark');
  const alertBox = document.getElementById('status-alert');

  // Timeline Steps
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
    document.getElementById('step-5')
  ];

  // Mock Database
  const mockDB = {
    'KEAM260012': { name: 'Arjun K', course: 'Engineering', stage: 3, status: 'Pending', remark: 'Your documents are currently under review by the authority. Please check back later.' },
    'KEAM260089': { name: 'Meenakshi R', course: 'Medical', stage: 5, status: 'Approved', remark: 'Application verified and approved. Admit card will be available for download shortly.' },
    'KEAM260233': { name: 'Anjali V', course: 'LLB (5 Year)', stage: 3, status: 'Rejected', remark: 'Document verification failed. Nativity certificate uploaded is illegible. Please re-upload.' }
  };

  statusForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const appNo = document.getElementById('app-no').value.trim().toUpperCase();
    const dob = document.getElementById('dob').value;
    
    if(!appNo || !dob) {
      alert("Please enter both Application Number and Date of Birth.");
      return;
    }

    // Simulate API Call / Processing Delay
    const btn = statusForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Checking...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = originalText;
      btn.disabled = false;
      
      const data = mockDB[appNo];
      
      if(data) {
        displayResults(appNo, data);
      } else {
        // Fallback for unknown application numbers
        displayResults(appNo, { 
          name: 'Candidate User', 
          course: 'Engineering', 
          stage: 2, 
          status: 'Pending', 
          remark: 'Application form submitted. Awaiting document upload and fee payment.' 
        });
      }
    }, 800);
  });

  function displayResults(appNo, data) {
    // Update Profile Info
    resName.innerText = data.name;
    resAppNo.innerText = appNo;
    resCourse.innerText = data.course;
    resRemark.innerText = data.remark;

    // Reset Timeline
    steps.forEach(step => {
      step.classList.remove('completed', 'active', 'rejected');
      step.querySelector('p').innerText = 'Pending';
    });

    // Update Timeline Steps based on stage
    for (let i = 0; i < data.stage; i++) {
      if (i === data.stage - 1) {
        // Current Stage
        if (data.status === 'Rejected') {
          steps[i].classList.add('rejected');
          steps[i].querySelector('p').innerText = 'Failed/Rejected';
        } else if (data.status === 'Approved') {
          steps[i].classList.add('completed');
          steps[i].querySelector('p').innerText = 'Completed';
        } else {
          steps[i].classList.add('active');
          steps[i].querySelector('p').innerText = 'In Progress';
        }
      } else {
        // Past Stages
        steps[i].classList.add('completed');
        steps[i].querySelector('p').innerText = 'Completed';
      }
    }

    // Update Badge & Alert
    resBadge.className = 'status-badge'; // reset
    alertBox.className = 'status-alert'; // reset

    if (data.status === 'Approved') {
      resBadge.classList.add('status-badge--approved');
      resBadge.innerText = 'Approved';
      alertBox.classList.add('status-alert--success');
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div><strong>Status:</strong> <span id="res-remark">${data.remark}</span></div>
      `;
    } else if (data.status === 'Rejected') {
      resBadge.classList.add('status-badge--rejected');
      resBadge.innerText = 'Action Required';
      alertBox.classList.add('status-alert--warning'); // or error style if you prefer
      alertBox.style.backgroundColor = '#FFEBEE';
      alertBox.style.borderColor = '#FFCDD2';
      alertBox.style.color = 'var(--color-error)';
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div><strong>Issue Found:</strong> <span id="res-remark">${data.remark}</span></div>
      `;
    } else {
      resBadge.classList.add('status-badge--pending');
      resBadge.innerText = 'Pending Review';
      alertBox.classList.add('status-alert--warning');
      alertBox.removeAttribute('style'); // reset to css class styles
      alertBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <div><strong>Current Remark:</strong> <span id="res-remark">${data.remark}</span></div>
      `;
    }

    // Show Results
    statusResults.style.display = 'block';
    statusResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
