const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getStats
} = require('../controllers/notificationController');

// GET /api/notifications & POST /api/notifications
router.route('/')
  .get(getNotifications)
  .post(createNotification);

// GET /api/notifications/stats
router.get('/stats', getStats);

// GET, PUT, DELETE /api/notifications/:id
router.route('/:id')
  .get(getNotificationById)
  .put(updateNotification)
  .delete(deleteNotification);

module.exports = router;
