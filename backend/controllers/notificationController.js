// backend/controllers/notificationController.js
// Notification & Portal Stats Controller
// Author: Rasal Musthafa (B24CSA49)
// Provides full CRUD operations for announcements and live portal statistics.
// All notifications are dynamically created and managed by the Admin Dashboard.

const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');

const SYSTEM_USER_ID = new mongoose.Types.ObjectId('000000000000000000000000');

/**
 * 1. GET ALL NOTIFICATIONS
 * Route: GET /api/notifications
 * Supports query params:
 *   ?type=ticker  -> only ticker items
 *   ?type=list    -> only board/list items
 *   ?category=... -> category filter
 *   ?search=...   -> title search
 */
const getNotifications = async (req, res) => {
  try {
    const { type, category, search } = req.query;
    const filter = {};

    if (type === 'ticker') {
      filter.isTicker = true;
    } else if (type === 'list') {
      filter.isTicker = false;
    }

    if (category && category !== 'All' && category !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (search && search.trim() !== '') {
      filter.title = { $regex: search.trim(), $options: 'i' };
    }

    const data = await Notification.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch notifications'
    });
  }
};

/**
 * 2. GET SINGLE NOTIFICATION BY ID
 * Route: GET /api/notifications/:id
 */
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID'
      });
    }

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

/**
 * 3. CREATE A NEW NOTIFICATION (Admin Dashboard)
 * Route: POST /api/notifications
 */
const createNotification = async (req, res) => {
  try {
    const { title, message, category, badge, isTicker, link, isRead } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Notification title is required'
      });
    }

    const payload = {
      userId: req.body.userId || SYSTEM_USER_ID,
      title: title.trim(),
      message: (message && message.trim()) ? message.trim() : title.trim(),
      isRead: Boolean(isRead),
      badge: (badge || '').trim(),
      category: (category || 'General').trim(),
      isTicker: Boolean(isTicker),
      link: (link && link.trim()) ? link.trim() : '#'
    };

    const notification = await Notification.create(payload);
    res.status(201).json({
      success: true,
      message: 'Announcement published successfully',
      data: notification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create notification'
    });
  }
};

/**
 * 4. UPDATE A NOTIFICATION (Admin Dashboard)
 * Route: PUT /api/notifications/:id
 */
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID'
      });
    }

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    if (req.body.title !== undefined) notification.title = req.body.title.trim();
    if (req.body.message !== undefined) notification.message = req.body.message.trim();
    if (req.body.category !== undefined) notification.category = req.body.category.trim();
    if (req.body.badge !== undefined) notification.badge = req.body.badge.trim();
    if (req.body.isTicker !== undefined) notification.isTicker = Boolean(req.body.isTicker);
    if (req.body.link !== undefined) notification.link = req.body.link.trim();
    if (req.body.isRead !== undefined) notification.isRead = Boolean(req.body.isRead);

    const updatedNotification = await notification.save();
    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: updatedNotification
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update notification'
    });
  }
};

/**
 * 5. DELETE A NOTIFICATION (Admin Dashboard)
 * Route: DELETE /api/notifications/:id
 */
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID'
      });
    }

    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete notification'
    });
  }
};

/**
 * 6. GET PORTAL LIVE STATISTICS
 * Route: GET /api/stats (or /api/notifications/stats)
 */
const getStats = async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments();
    const tickerCount = await Notification.countDocuments({ isTicker: true });
    const listCount = await Notification.countDocuments({ isTicker: false });
    const registeredCandidates = await Candidate.countDocuments();
    const applicationsSubmitted = await Application.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        activeCourses: 12,
        registeredCandidates,
        applicationsSubmitted,
        totalNotifications,
        tickerCount,
        listCount,
        currentPhase: 'Second Phase Allotment',
        helplineNumber: '0471-2525300',
        helplineEmail: 'caborhelp@cee.kerala.gov.in'
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to load stats'
    });
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getStats
};
