const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getStats,
  createNotification
} = require('../controllers/notificationController');

// GET /api/notifications & POST /api/notifications
router.route('/')
  .get(getNotifications)
  .post(createNotification);

// GET /api/notifications/stats
router.get('/stats', getStats);

module.exports = router;
