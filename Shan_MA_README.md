# Shan M A - README

## Profile
- **Name:** Shan M A
- **Roll Number:** B24CSA59
- **Role:** Admin Panel & Status Tracking | Admin Controller & Application Tracking API

---

## Phase 1 - Frontend UI & Dynamic Tables (✅ Completed)

### My Work
I built the Admin Panel (`pages/admin.html`) for managing applications and the Status Tracking page (`pages/status.html`) for applicants to check their progress. The admin page features a searchable data table built entirely from mock JSON data, and the status page renders a dynamic approval timeline.

### JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| Template Literals | Builds multi-line HTML table rows from data objects |
| `Array.filter()` | Filters applications based on search input |
| `innerHTML = ''` | Clears old table rows before re-rendering |
| `forEach` | Loops through data to build and insert new rows |
| `window.updateStatus` | Binds functions to window for inline onclick handlers |
| `keyup` listener | Triggers search filter as user types |
| `e.key === 'Enter'` | Handles Enter key press in search input |

---

## Phase 2 - Backend & MongoDB Integration

### Role: Admin Management & Application Status Tracking API

### Assigned Files
- `backend/models/Admin.js` (Admin Account Mongoose Schema)
- `backend/controllers/adminController.js` (Admin & Tracking Logic)
- `backend/routes/adminRoutes.js` (Admin endpoints & public status tracking)
- `js/admin.js` & `js/status.js` (Frontend Dynamic Data Binding)

---

### Step-by-Step Implementation Instructions

#### 1. Setup Backend Environment
Ensure the backend is running with dependencies installed:
```bash
cd backend
npm install
npm run dev
```

#### 2. Create `backend/models/Admin.js`
Define the schema for administrator credentials:
- **Location**: `backend/models/Admin.js`
- **Fields**:
  - `username`: String, required: true, unique: true
  - `email`: String, required: true, unique: true
  - `password`: String, required: true (hashed with `bcryptjs`)
  - `role`: String, enum: `['admin', 'superadmin']`, default: `'admin'`
  - `timestamps`: true

#### 3. Create `backend/controllers/adminController.js`
Implement the following controller functions:

**A. `getAllApplications(req, res)`**:
- Query all candidate applications from MongoDB Atlas `Application` collection:
  ```javascript
  const { search, category, status } = req.query;
  let query = {};
  if (category && category !== 'all') query['courseSelections'] = category;
  if (status && status !== 'all') query['status'] = status;
  // Support searching by applicant name or application number
  if (search) {
    query.$or = [
      { applicationNumber: { $regex: search, $options: 'i' } },
      { 'personalDetails.candidateName': { $regex: search, $options: 'i' } }
    ];
  }
  const applications = await Application.find(query).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: applications.length, data: applications });
  ```

**B. `updateApplicationStatus(req, res)`**:
- Update an application's verification status and remarks:
  - Route: `PUT /api/admin/applications/:id/status`
  - Body: `{ status: 'Approved' | 'Rejected' | 'Defective', remarks: '...' }`
  - Update `status`, `remarks`, and update `currentStep` accordingly:
    - If `'Approved'`, set `currentStep = 6`
    - If `'Rejected'` or `'Defective'`, set `currentStep = 3` with remarks
  - Save and return updated application document.

**C. `trackStatus(req, res)`**:
- Public status tracking:
  - Route: `GET /api/admin/status/:appNo` (or `GET /api/application/status/:appNo`)
  - Parameters: `appNo` in route, `dob` in query string (`?dob=YYYY-MM-DD`)
  - Find matching `Application` and verify with candidate's date of birth.
  - Return current step, milestone timeline status, and remarks:
    ```json
    {
      "success": true,
      "data": {
        "applicationNumber": "2600124",
        "candidateName": "Faheem Shan",
        "status": "Under Verification",
        "currentStep": 3,
        "remarks": "Documents under verification by CEE officer.",
        "steps": [
          { "title": "Registration", "status": "completed" },
          { "title": "Form Filling", "status": "completed" },
          { "title": "Document Verification", "status": "active" },
          { "title": "Fee Payment", "status": "pending" },
          { "title": "Approval", "status": "pending" }
        ]
      }
    }
    ```

#### 4. Create `backend/routes/adminRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  updateApplicationStatus,
  trackStatus
} = require('../controllers/adminController');

// Admin endpoints
router.get('/applications', getAllApplications);
router.put('/applications/:id/status', updateApplicationStatus);

// Public status tracking endpoint
router.get('/status/:appNo', trackStatus);

module.exports = router;
```

Uncomment the admin route mount in `backend/server.js`:
```javascript
app.use('/api/admin', require('./routes/adminRoutes'));
```

#### 5. Connect Frontend Pages

**A. Admin Panel (`js/admin.js`)**:
- Replace the mock data array with a live fetch:
  ```javascript
  async function loadApplications() {
    const res = await fetch('/api/admin/applications');
    const result = await res.json();
    if (result.success) {
      renderTable(result.data);
      updateStatsCards(result.data);
    }
  }
  ```
- Update `updateStatus(id, newStatus)` function:
  ```javascript
  async function updateStatus(id, newStatus) {
    const remarks = prompt(`Enter remarks for ${newStatus}:`);
    const res = await fetch(`/api/admin/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, remarks })
    });
    const result = await res.json();
    if (result.success) {
      loadApplications(); // Refresh table
    }
  }
  ```

**B. Status Tracking Page (`js/status.js`)**:
- Intercept the status lookup form submission:
  ```javascript
  const appNo = document.querySelector('#app-number').value.trim();
  const dob = document.querySelector('#dob').value.trim();

  const res = await fetch(`/api/admin/status/${appNo}?dob=${encodeURIComponent(dob)}`);
  const result = await res.json();
  if (result.success) {
    displayTimeline(result.data);
  } else {
    showStatusError(result.message || 'No application found with matching details.');
  }
  ```

---

## Testing Your Implementation

```bash
# 1. Test fetching all applications
curl http://localhost:5000/api/admin/applications

# 2. Test status update
curl -X PUT http://localhost:5000/api/admin/applications/<APP_ID>/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Approved","remarks":"All certificates verified successfully."}'

# 3. Test public status tracking
curl "http://localhost:5000/api/admin/status/2600124?dob=2005-06-15"
```

---

## Git Workflow for Pull Requests
1. Branch from `rasal` or `main`:
   ```bash
   git checkout -b feature/shan-admin-status-api
   ```
2. Commit your changes:
   ```bash
   git add backend/models/Admin.js backend/controllers/adminController.js backend/routes/adminRoutes.js js/admin.js js/status.js
   git commit -m "feat(admin): applications datatable API, status verification, and live tracking"
   ```
3. Submit a Pull Request to Team Leader Rasal for code review.
