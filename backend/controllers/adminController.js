// backend/controllers/adminController.js
// Admin Controller - Shan M A (B24CSA59)
// Handles: fetching all applications, updating status, and public status tracking

const Application = require('../models/Application');
const Candidate = require('../models/Candidate');

/**
 * 1. GET ALL APPLICATIONS
 * Route: GET /api/admin/applications
 * Access: Admin
 *
 * What it does:
 * - Fetches all candidate applications from MongoDB
 * - Supports optional search, category, and status filters via query params
 * - Returns applications sorted by newest first
 *
 * Query params example:
 *   /api/admin/applications?search=faheem&category=Engineering&status=Submitted
 */
const getAllApplications = async (req, res) => {
  try {
    // Step 1: Read filter values from the URL query string
    const { search, category, status } = req.query;

    // Step 2: Build a dynamic MongoDB query object
    // Start with empty object = "find everything"
    let query = {};

    // If category filter is set (and not 'all'), add it to the query
    if (category && category !== 'all') {
      query['courseSelections'] = category;
    }

    // If status filter is set (and not 'all'), add it to the query
    if (status && status !== 'all') {
      query['status'] = status;
    }

    // If search text is provided, search by application number OR candidate name
    // $or means "match ANY of these conditions"
    // $regex does partial matching (like SQL LIKE '%search%')
    // $options: 'i' makes it case-insensitive
    if (search) {
      query.$or = [
        { applicationNumber: { $regex: search, $options: 'i' } },
        { 'personalDetails.candidateName': { $regex: search, $options: 'i' } }
      ];
    }

    // Step 3: Run the query and sort by newest first
    const applications = await Application.find(query).sort({ createdAt: -1 });

    // Step 4: Send back the results
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch applications'
    });
  }
};

/**
 * 2. UPDATE APPLICATION STATUS
 * Route: PUT /api/admin/applications/:id/status
 * Access: Admin
 *
 * What it does:
 * - Finds an application by its MongoDB _id
 * - Updates its status (Approved / Rejected / Defective) and remarks
 * - Also updates currentStep based on the new status:
 *     Approved → step 6 (final approval done)
 *     Rejected or Defective → step 3 (sent back for correction)
 *
 * Request body example:
 *   { "status": "Approved", "remarks": "All documents verified." }
 */
const updateApplicationStatus = async (req, res) => {
  try {
    // Step 1: Get the application ID from the URL
    const { id } = req.params;

    // Step 2: Get status and remarks from the request body
    const { status, remarks } = req.body;

    // Step 3: Find the application in the database
    const application = await Application.findById(id);

    // If no application found with that ID, return 404
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Step 4: Update the status field
    application.status = status;

    // Step 5: Update remarks (admin's comment)
    application.remarks = remarks || '';

    // Step 6: Update currentStep based on new status
    // Approved = step 6 (approval complete)
    // Rejected or Defective = step 3 (back to verification)
    if (status === 'Approved') {
      application.currentStep = 6;
    } else if (status === 'Rejected' || status === 'Defective') {
      application.currentStep = 3;
    }

    // Step 7: Save the updated document to MongoDB
    await application.save();

    // Step 8: Return the updated application
    res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
      data: application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update application status'
    });
  }
};

/**
 * 3. TRACK APPLICATION STATUS (Public)
 * Route: GET /api/admin/status/:appNo?dob=YYYY-MM-DD
 * Access: Public (no login needed)
 *
 * What it does:
 * - Allows anyone to check their application status
 * - Requires application number (in URL) and date of birth (in query string)
 * - Verifies both match before showing status
 * - Returns current step, milestone timeline, and admin remarks
 *
 * Example:
 *   GET /api/admin/status/2600124?dob=2005-06-15
 */
const trackStatus = async (req, res) => {
  try {
    // Step 1: Get appNo from URL and dob from query string
    const { appNo } = req.params;
    const { dob } = req.query;

    // Step 2: Validate that both fields are provided
    if (!appNo || !dob) {
      return res.status(400).json({
        success: false,
        message: 'Both Application Number and Date of Birth are required'
      });
    }

    // Step 3: Find the application by its application number
    let application = await Application.findOne({ applicationNumber: appNo });

    // Step 4: If application not found, check if Candidate is registered
    if (!application) {
      const candidate = await Candidate.findOne({ applicationNumber: appNo });
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'No application or registration found with this Application Number'
        });
      }

      // Verify date of birth for registered candidate
      const candidateDob = (candidate.dob || '').trim();
      if (dob.trim() !== candidateDob) {
        return res.status(400).json({
          success: false,
          message: 'Date of Birth does not match our records'
        });
      }

      // Candidate registered but hasn't submitted application form
      return res.status(200).json({
        success: true,
        data: {
          applicationNumber: candidate.applicationNumber,
          candidateName: candidate.fullName,
          status: 'Registered',
          currentStep: 2,
          remarks: 'Registration complete. Please sign in to fill and submit your application form.',
          steps: [
            { title: 'Registration', status: 'completed' },
            { title: 'Form Filling', status: 'active' },
            { title: 'Document Verification', status: 'pending' },
            { title: 'Fee Payment', status: 'pending' },
            { title: 'Approval', status: 'pending' }
          ]
        }
      });
    }

    // Verify date of birth matches for application (security check)
    const storedDob = (application.personalDetails && application.personalDetails.dob) || '';
    if (dob.trim() !== storedDob.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Date of Birth does not match our records'
      });
    }

    // Step 5: Build the timeline steps array
    // Each step has a title and a status: 'completed', 'active', or 'pending'
    const currentStep = application.currentStep || 1;

    const stepTitles = [
      'Registration',
      'Form Filling',
      'Document Verification',
      'Fee Payment',
      'Approval'
    ];

    // Map each step to completed/active/pending based on currentStep
    const steps = stepTitles.map((title, index) => {
      const stepNumber = index + 1;
      let stepStatus = 'pending';

      if (stepNumber < currentStep) {
        stepStatus = 'completed';    // past steps are done
      } else if (stepNumber === currentStep) {
        stepStatus = 'active';       // current step is in progress
      }

      return { title, status: stepStatus };
    });

    // Step 6: Send back the tracking data
    res.status(200).json({
      success: true,
      data: {
        applicationNumber: application.applicationNumber,
        candidateName: application.personalDetails.candidateName,
        status: application.status,
        currentStep: currentStep,
        remarks: application.remarks || 'No remarks at this time.',
        steps: steps
      }
    });
  } catch (error) {
    console.error('Error tracking status:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to track application status'
    });
  }
};

// Export all controller functions so routes can use them
module.exports = {
  getAllApplications,
  updateApplicationStatus,
  trackStatus
};
