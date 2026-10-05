// backend/routes/applicationRoutes.js
// Application Routes - Faheem Shan (B24CSA20)
// Defines endpoints for candidate application form submission, file uploads, and status retrieval

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  submitApplication,
  getMyApplication
} = require('../controllers/applicationController');

// Import authentication guard and file upload middleware
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @route   POST /api/application/submit
 * @desc    Submit candidate application form along with document attachments
 * @access  Private (Candidate JWT required)
 */
router.post(
  '/submit',
  protect,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'sslc', maxCount: 1 },
    { name: 'plus2', maxCount: 1 },
    { name: 'community', maxCount: 1 },
    { name: 'income', maxCount: 1 }
  ]),
  submitApplication
);

/**
 * @route   GET /api/application/my-application
 * @desc    Fetch application record of currently authenticated candidate
 * @access  Private (Candidate JWT required)
 */
router.get('/my-application', protect, getMyApplication);

module.exports = router;
