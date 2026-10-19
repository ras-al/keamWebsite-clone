# Shan M A - README

## Profile
- **Name:** Shan M A
- **Roll Number:** B24CSA59
- **Role:** Admin Panel & Status Tracking | Admin Controller & Tracking API | React Admin Management Portal & Public Status Tracker

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

## Phase 2 - Backend & MongoDB Integration (✅ Completed)

### My Work
I implemented the Admin panel backend API and connected it to the frontend, along with public status tracking:
1. **Admin Model (`backend/models/Admin.js`)**: Designed a Mongoose schema for administrator credentials (`username`, `email`, `password`, `role`).
2. **Admin Controller (`backend/controllers/adminController.js`)**: Created controller logic for fetching all applications with search/filter (`getAllApplications`), approving/rejecting applications (`updateApplicationStatus`), and public tracking with DOB validation (`trackStatus`).
3. **Admin Routes (`backend/routes/adminRoutes.js`)**: Configured the endpoints for the admin actions and mounted them in `server.js`.
4. **Frontend Integration (`js/admin.js`, `js/status.js`)**: Updated the admin panel to fetch live application data from the backend using the shared API helper, and updated the status page to securely query application progress.

### Implemented & Assigned Files

| File | Type | Purpose |
|------|------|---------|
| `backend/models/Admin.js` | Mongoose Schema | Database schema for administrator accounts |
| `backend/controllers/adminController.js` | Controller | Logic for fetching/updating applications and public tracking |
| `backend/routes/adminRoutes.js` | Express Routes | Endpoints for admin panel and status lookups |
| `backend/server.js` | Server Configuration | Route mounting for `/api/admin` |
| `js/admin.js` | Frontend JS | Admin panel logic, live API calls, and status updates |
| `js/status.js` | Frontend JS | Public application status timeline rendering via API |

---

### Application Architecture & Data Flow

```
+-----------------------------------------------------------------------------------+
|                                ADMIN WORKFLOW                                     |
+-----------------------------------------------------------------------------------+
       |
       | 1. Admin logs into Dashboard & Views Applications
       v
+------------------------+
|   js/admin.js          | ---> GET /api/admin/applications (with filters)
+------------------------+
       |
       v
+------------------------+
| backend/controllers/   | ---> Fetches all candidate records from MongoDB
| adminController        |      (Supports search by Name or App Number)
+------------------------+
       |
       | 2. Admin Reviews Application -> Approves / Rejects
       v
+------------------------+
|   js/admin.js          | ---> PUT /api/admin/applications/:id/status
+------------------------+
       |
       v
+------------------------+
| backend/controllers/   | ---> Updates `status`, `remarks`, and `currentStep`
| adminController        |      in MongoDB Atlas
+------------------------+
       |
       | 3. Candidate Checks Status (Public)
       v
+------------------------+
|   js/status.js         | ---> GET /api/admin/status/:appNo?dob=YYYY-MM-DD
+------------------------+
       |
       v
+------------------------+
| backend/controllers/   | ---> Validates DOB and returns timeline data
| adminController        |      to render visual progress steps
+------------------------+
```

---

### Implemented API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/admin/applications` | Admin | Fetches all applications with optional search and filters |
| `PUT` | `/api/admin/applications/:id/status` | Admin | Updates verification status and adds remarks |
| `GET` | `/api/admin/status/:appNo` | Public | Looks up application status securely using DOB |

---

## Git Workflow for Pull Requests
1. **Active Branch**: `feature/shan-admin-status-api`
2. **Commit History**:
   - `feat(admin): admin schema, controllers, and routes`
   - `feat(frontend): connect admin and status pages to live API`
3. **Files Committed**:
   - `backend/models/Admin.js`
   - `backend/controllers/adminController.js`
   - `backend/routes/adminRoutes.js`
   - `backend/server.js`
   - `js/admin.js`
   - `js/status.js`
   - `Shan_MA_README.md`
4. **Merge Compatibility**: Verified — **0 conflicts** with `main` and ready for Pull Request review.

---

## Phase 3 - Admin Management Portal & Public Status Tracking (🚀 Next Phase)

### Role: Admin Application Review Portal & Public Application Status Tracker

In Phase 3, my responsibility is to develop the React components for the Admin management workspace (table view, status updater, search/filters) and the public application milestone status tracking interface.

### My Phase 3 Assigned Components & Files

| Component / File | Purpose & Responsibilities | Study Reference |
|---|---|---|
| `frontend/src/pages/AdminPage.jsx` | Administrator dashboard container. Fetches all candidate records via `useEffect` from `/api/admin/applications` and coordinates search, filter, and review workflows. | Slides 14, 71–72 |
| `frontend/src/components/admin/ApplicationTable.jsx` | Data table rendering candidate records with `applications.map()`. Supports column sorting and action triggers. | Slides 48–49 |
| `frontend/src/components/admin/TableRow.jsx` | Reusable row receiving candidate record and click handlers via props. Destructures `appNo`, `fullName`, `course`, `status`. | Slides 50–51 |
| `frontend/src/components/admin/SearchFilter.jsx` | Controlled search input and status dropdown (`All`, `Pending`, `Approved`, `Defective`) managing filter states with `useState`. | Slides 86–88 |
| `frontend/src/components/admin/StatusModal.jsx` | Modal dialog for updating verification status (`PUT /api/admin/applications/:id/status`) and writing admin remarks. | Slides 56–57 |
| `frontend/src/pages/StatusPage.jsx` | Public tracking view for candidates to inspect real-time application processing milestones without logging in. | Slides 14, 86–88 |
| `frontend/src/components/status/StatusForm.jsx` | Controlled search form taking Application Number and Date of Birth with `onSubmit`. | Slides 86–88 |
| `frontend/src/components/status/MilestoneTracker.jsx` | Stepper timeline visualizer rendering progress steps and defect remark alerts using conditional rendering. | Slides 23–24, 60 |

---

### React Concepts Used (from Study Material)

1. **Rendering Lists with `Array.prototype.map()` & Unique Keys (Slides 48–49)**:
   - Iterating over applications to render table rows:
     ```jsx
     <tbody>
       {filteredApps.map((app) => (
         <TableRow key={app._id} application={app} onSelect={handleSelectApp} />
       ))}
     </tbody>
     ```
2. **Controlled Form Inputs (Slides 86–88)**:
   - Managing search text and status filters in `SearchFilter.jsx`:
     ```jsx
     <input
       type="text"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       placeholder="Search by candidate name or application no..."
     />
     ```
3. **Data Fetching with `useEffect` (Slides 36, 67, 71–72)**:
   - Fetching applications list on component load with an empty dependency array `[]`.
4. **Conditional Rendering with Switch Case (Slide 61)**:
   - Handling asynchronous API status states in `StatusPage.jsx`:
     ```jsx
     function renderStatusView() {
       switch (statusState) {
         case 'loading': return <p>Loading application details...</p>;
         case 'found': return <MilestoneTracker data={statusData} />;
         case 'error': return <div className="alert-danger">Application not found</div>;
         default: return <p>Enter your details above to check status.</p>;
       }
     }
     ```
5. **Passing Callback Props / Lifting State Up (Slides 52–55)**:
   - Modal calls `onStatusUpdated(updatedApp)` to update the parent table's `applications` state without full page reload.

---

### Educational Code Style Reference

#### 1. Applications Table Component (`ApplicationTable.jsx`) - Slides 48–51 Pattern:
```jsx
import React from 'react';

function ApplicationTable({ applications, onReview }) {
  if (applications.length === 0) {
    return <p className="text-center">No applications found matching the criteria.</p>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>App No</th>
          <th>Candidate Name</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app._id}>
            <td>{app.applicationNumber}</td>
            <td>{app.candidateName}</td>
            <td>{app.category}</td>
            <td>
              <span className={`status-badge status-${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </td>
            <td>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => onReview(app)}
              >
                Review
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationTable;
```

#### 2. Public Status Lookup Component (`StatusForm.jsx`) - Slides 86–88 Pattern:
```jsx
import React, { useState } from 'react';

function StatusForm({ onSearch, loading }) {
  const [appNo, setAppNo] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ appNo, dob });
  };

  return (
    <form onSubmit={handleSubmit} className="status-search-box">
      <div className="form-group">
        <label>Application Number:</label>
        <input
          type="text"
          value={appNo}
          onChange={(e) => setAppNo(e.target.value)}
          placeholder="e.g. 2601001"
          required
        />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Checking...' : 'Track Application'}
      </button>
    </form>
  );
}

export default StatusForm;
```

