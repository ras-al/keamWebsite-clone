// backend/routes/adminRoutes.js
// Admin Routes - Shan M A (B24CSA59) & Rasal Musthafa (B24CSA49)
// Defines the API endpoints for admin panel, notification management, and public status tracking

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllApplications,
  updateApplicationStatus,
  trackStatus
} = require('../controllers/adminController');

const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} = require('../controllers/notificationController');

// ===== Admin Applications Endpoints =====

// GET /api/admin/applications
// Fetches all applications (with optional search/filter)
// Example: /api/admin/applications?search=faheem&status=Submitted
router.get('/applications', getAllApplications);

// PUT /api/admin/applications/:id/status
// Updates an application's status and remarks
// Body: { status: 'Approved', remarks: 'All docs verified.' }
router.put('/applications/:id/status', updateApplicationStatus);

// ===== Admin Notification Endpoints =====
router.route('/notifications')
  .get(getNotifications)
  .post(createNotification);

router.route('/notifications/:id')
  .get(getNotificationById)
  .put(updateNotification)
  .delete(deleteNotification);

// ===== Public Status Tracking =====

// GET /api/admin/status/:appNo?dob=YYYY-MM-DD
// Public endpoint - anyone can check their application status
// Example: /api/admin/status/2600124?dob=2005-06-15
router.get('/status/:appNo', trackStatus);

module.exports = router;
