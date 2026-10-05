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
