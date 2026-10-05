const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');

const SYSTEM_USER_ID = new mongoose.Types.ObjectId('000000000000000000000000');

// Default notices matching keam_portal_db schema
const defaultData = [
  { userId: SYSTEM_USER_ID, title: 'Engineering: Second phase allotment results published.', message: 'Engineering allotment results are now live.', category: 'Engineering', isTicker: true },
  { userId: SYSTEM_USER_ID, title: 'Architecture: First phase allotment is now available.', message: 'Architecture candidates may verify seat status.', category: 'Architecture', isTicker: true },
  { userId: SYSTEM_USER_ID, title: 'Medical Courses: Document rectification window is active.', message: 'Rectify defective certificates before deadline.', category: 'Medical', isTicker: true },
  { userId: SYSTEM_USER_ID, title: 'PG Dental 2026: Online registration portal is open.', message: 'Submit applications for PG dental courses.', category: 'PG Dental', isTicker: true },
  { userId: SYSTEM_USER_ID, title: 'LLM 2026 - Admit cards available for download', message: 'Download admit cards from candidate portal.', badge: 'New', category: 'Law', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'PG Nursing 2026 - Admit card download available', message: 'Admit card download window is active.', badge: 'New', category: 'Medical', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'LLM 2026 - Facility for photo/signature correction is open', message: 'Correction window active for registered candidates.', category: 'Law', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'PG Nursing 2026 - Photo correction window is active', message: 'Upload correct photo and signature.', category: 'Medical', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'Three Year LL.B 2026 - Final answer key published', message: 'Check answer key and candidate response sheet.', category: 'Law', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'Five Year LL.B 2026 - Final answer key published', message: 'Check answer key and candidate response sheet.', category: 'Law', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'KEAM 2026 - Engineering rank list has been published', message: 'Engineering state rank list available.', category: 'Engineering', isTicker: false },
  { userId: SYSTEM_USER_ID, title: 'PG Dental 2026 - Submission deadline extended to Aug 15', message: 'Extended registration timeline for PG Dental.', category: 'PG Dental', isTicker: false }
];

// 1. Get all notifications (optional: ?type=ticker or ?type=list)
const getNotifications = async (req, res) => {
  try {
    const count = await Notification.countDocuments();
    if (count === 0) {
      await Notification.insertMany(defaultData);
    }

    const { type, category } = req.query;
    const filter = {};

    if (type === 'ticker') filter.isTicker = true;
    if (type === 'list') filter.isTicker = false;
    if (category) filter.category = category;

    const data = await Notification.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get portal statistics
const getStats = async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments();
    const registeredCandidates = await Candidate.countDocuments();
    const applicationsSubmitted = await Application.countDocuments();
    res.json({
      success: true,
      data: {
        activeCourses: 12,
        registeredCandidates,
        applicationsSubmitted,
        totalNotifications,
        currentPhase: 'Second Phase Allotment',
        helplineNumber: '0471-2525300'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Create a notification
const createNotification = async (req, res) => {
  try {
    const payload = {
      userId: req.body.userId || SYSTEM_USER_ID,
      title: req.body.title,
      message: req.body.message || req.body.title,
      isRead: Boolean(req.body.isRead),
      badge: req.body.badge || '',
      category: req.body.category || 'General',
      isTicker: Boolean(req.body.isTicker),
      link: req.body.link || '#'
    };

    const notification = await Notification.create(payload);
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getNotifications, getStats, createNotification };
