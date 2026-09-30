# Shan M A - README

## Profile
- **Name:** Shan M A
- **Roll Number:** B24CSA59
- **Role:** Admin Panel & Status Tracking

## My Work
I built the Admin Panel (`admin.html`) for managing applications and the Status Tracking page (`status.html`) for applicants to check their progress. The admin page features a searchable data table built entirely from mock JSON data, and the status page renders a dynamic approval timeline.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| Template Literals | Builds multi-line HTML table rows from data objects |
| `Array.filter()` | Filters applications based on search input |
| `innerHTML = ''` | Clears old table rows before re-rendering |
| `forEach` | Loops through data to build and insert new rows |
| `window.updateStatus` | Binds functions to window for inline onclick handlers |
| `keyup` listener | Triggers search filter as user types |
| `e.key === 'Enter'` | Handles Enter key press in search input |

## DOM Flow

```
Page Loads
    |
    v
Create mock JSON array of applications
    |
    v
Build HTML table rows via template literals
    |
    v
Inject rows into tbody via innerHTML
    |
    v
User types in search box
    |
    v
keyup listener fires
    |
    v
Array.filter() on data
    |
    +-- name/number matches query? --+
    |                                |
   YES                               NO
    |                                |
 keep in results               exclude
    |                                |
    +--------------------------------+
    |
    v
Clear tbody, rebuild rows from filtered results
    |
    v
Done
```

## File Dependencies

```
style.css --> components.css --> admin.css / status.css --> admin.html & status.html
main.js   --> admin.js  ---------------------------------->^
          --> status.js ----------------------------------->|
navbar.js & footer.js ---------------------------------->|
```

## Phase 2 - Backend & MongoDB Integration

### Role: Admin Management & Application Status Tracking API

- **Assigned Files**:
  - `models/Admin.js` (Admin account schema)
  - `controllers/adminController.js` (Admin management logic)
  - `routes/adminRoutes.js` (Admin and status endpoints)
- **Key Responsibilities**:
  1. Define the Mongoose `Admin` schema with credentials and authorization roles for system administrators.
  2. Implement `GET /api/admin/applications` to retrieve all candidate applications with search and category filtering support.
  3. Implement `PUT /api/admin/applications/:id/status` to enable admins to approve or reject applications and attach administrative remarks.
  4. Implement `GET /api/application/status/:appNo` as a public tracking endpoint taking an application number and date of birth to return current milestone progress.
  5. Connect `js/admin.js` with `/api/admin/applications` to dynamically render candidate records and trigger status updates.
  6. Connect `js/status.js` with `/api/application/status/:appNo` to replace simulated progress with actual database status updates and admin remarks.

