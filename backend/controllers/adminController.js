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
 *     Approved -> step 6 (final approval done)
 *     Rejected or Defective -> step 3 (sent back for correction)
 *
 * Request body example:
 *   { "status": "Approved", "remarks": "All documents verified." }
 */
const updateApplicationStatus = async (req, res) => {
  try {
    // Step 1: Get the application ID from the URL
    const { id } = req.params;

    // Step 2: Extract admin management fields from the request body
    const {
      status,
      remarks,
      admitCard,
      rankDetails,
      seatAllotment
    } = req.body;

    // Step 3: Find the application in the database
    const application = await Application.findById(id);

    // If no application found with that ID, return 404
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Step 4: Update status and remarks
    if (status) {
      application.status = status;
    }

    if (remarks !== undefined) {
      application.remarks = remarks.trim();
    }

    // Step 5: Update Admit Card details if provided
    if (admitCard) {
      application.admitCard = {
        issued: Boolean(admitCard.issued),
        rollNumber: (admitCard.rollNumber || application.admitCard?.rollNumber || `26${application.applicationNumber.slice(-5)}`).trim(),
        examCenter: (admitCard.examCenter || application.admitCard?.examCenter || 'Govt Model Higher Secondary School, Thiruvananthapuram').trim(),
        paper1Schedule: admitCard.paper1Schedule || application.admitCard?.paper1Schedule || '10 Aug 2026 (10:00 AM - 12:30 PM)',
        paper2Schedule: admitCard.paper2Schedule || application.admitCard?.paper2Schedule || '10 Aug 2026 (02:00 PM - 04:30 PM)',
        issuedAt: admitCard.issued ? (application.admitCard?.issuedAt || new Date()) : null
      };
    }

    // Step 6: Update Rank details if provided
    if (rankDetails) {
      const p1 = rankDetails.paper1Score !== undefined && rankDetails.paper1Score !== ''
        ? Number(rankDetails.paper1Score)
        : application.rankDetails?.paper1Score;
      const p2 = rankDetails.paper2Score !== undefined && rankDetails.paper2Score !== ''
        ? Number(rankDetails.paper2Score)
        : application.rankDetails?.paper2Score;
      const std = rankDetails.standardizedScore !== undefined && rankDetails.standardizedScore !== ''
        ? Number(rankDetails.standardizedScore)
        : (p1 !== null && p2 !== null && p1 !== undefined && p2 !== undefined ? Number((p1 + p2).toFixed(2)) : null);

      application.rankDetails = {
        published: Boolean(rankDetails.published),
        paper1Score: p1,
        paper2Score: p2,
        standardizedScore: std,
        stateMeritRank: rankDetails.stateMeritRank !== undefined && rankDetails.stateMeritRank !== ''
          ? Number(rankDetails.stateMeritRank)
          : application.rankDetails?.stateMeritRank,
        categoryRank: rankDetails.categoryRank !== undefined && rankDetails.categoryRank !== ''
          ? Number(rankDetails.categoryRank)
          : application.rankDetails?.categoryRank,
        publishedAt: rankDetails.published ? (application.rankDetails?.publishedAt || new Date()) : null
      };
    }

    // Step 7: Update Seat Allotment details if provided
    if (seatAllotment) {
      application.seatAllotment = {
        allotted: Boolean(seatAllotment.allotted),
        institution: (seatAllotment.institution || application.seatAllotment?.institution || '').trim(),
        course: (seatAllotment.course || application.seatAllotment?.course || '').trim(),
        optionNo: seatAllotment.optionNo !== undefined && seatAllotment.optionNo !== ''
          ? Number(seatAllotment.optionNo)
          : (application.seatAllotment?.optionNo || 1),
        quota: (seatAllotment.quota || application.seatAllotment?.quota || 'State Merit Quota').trim(),
        reportingDate: (seatAllotment.reportingDate || application.seatAllotment?.reportingDate || '25 October 2026 - 04:00 PM').trim(),
        memoIssued: Boolean(seatAllotment.allotted),
        allottedAt: seatAllotment.allotted ? (application.seatAllotment?.allottedAt || new Date()) : null
      };
    }

    // Step 8: Update pipeline currentStep accurately
    if (application.seatAllotment?.allotted) {
      application.currentStep = 7; // Allotment issued
    } else if (application.rankDetails?.published) {
      application.currentStep = 6; // Rank list published
    } else if (application.admitCard?.issued) {
      application.currentStep = 5; // Admit Card released
    } else if (application.status === 'Approved') {
      application.currentStep = 4; // Verified and Approved
    } else if (application.status === 'Rejected' || application.status === 'Defective') {
      application.currentStep = 3; // Correction flagged
    } else if (application.status === 'Submitted') {
      application.currentStep = 2; // Submitted
    }

    // Step 9: Save the updated document to MongoDB
    await application.save();

    // Step 10: Return the updated application
    res.status(200).json({
      success: true,
      message: 'Application managed and saved successfully',
      data: application
    });
  } catch (error) {
    console.error('Error updating application by admin:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update application'
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
    let candidateDob = '';
    if (application.candidateId) {
      const cand = await Candidate.findById(application.candidateId);
      if (cand && cand.dob) candidateDob = cand.dob;
    }

    const cleanInput = (dob || '').trim();
    const cleanStored = storedDob.trim();
    const cleanCandDob = candidateDob.trim();

    if (cleanInput !== cleanStored && cleanInput !== cleanCandDob) {
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
