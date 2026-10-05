// backend/controllers/applicationController.js
// Application Controller - Faheem Shan (B24CSA20)
// Handles submission, file path association, and retrieval of candidate applications

const Application = require('../models/Application');
const Candidate = require('../models/Candidate');

/**
 * 1. SUBMIT APPLICATION
 * Route: POST /api/application/submit
 * Access: Private (Candidate only - protected with JWT)
 *
 * Description:
 * - Reads multipart form data & files (photo, signature, certificates).
 * - Maps uploaded files to file paths (/uploads/filename).
 * - Creates or updates the Application record for the logged-in candidate.
 * - Sets status to 'Submitted' and advances currentStep to 4 (Verification / Admit Card).
 */
const submitApplication = async (req, res) => {
  try {
    // Step 1: Identify authenticated candidate from token
    const candidateId = req.user?.id || req.candidate?._id;
    const applicationNumber =
      req.user?.applicationNumber ||
      req.candidate?.applicationNumber ||
      req.body.applicationNumber;

    if (!candidateId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in first.'
      });
    }

    // Step 2: Extract uploaded document files from req.files (if any)
    const files = req.files || {};
    const photoFile = files.photo ? files.photo[0] : null;
    const signatureFile = files.signature ? files.signature[0] : null;
    const certificateFile = files.certificate ? files.certificate[0] : null;
    const sslcFile = files.sslc ? files.sslc[0] : null;
    const plus2File = files.plus2 ? files.plus2[0] : null;
    const communityFile = files.community ? files.community[0] : null;
    const incomeFile = files.income ? files.income[0] : null;

    // Helper: Safely parse JSON string or return default object
    const safeParse = (value, fallback = {}) => {
      if (typeof value === 'object' && value !== null) return value;
      try {
        return value ? JSON.parse(value) : fallback;
      } catch (err) {
        return fallback;
      }
    };

    const parsedPersonal = safeParse(req.body.personalDetails);
    const parsedAcademic = safeParse(req.body.academicDetails);
    const parsedCommunication = safeParse(req.body.communicationDetails);
    const parsedPayment = safeParse(req.body.paymentDetails);

    // Step 3: Build structured data from nested or flat form fields
    const personalDetails = {
      candidateName:
        parsedPersonal.candidateName ||
        req.body.candidateName ||
        req.body.fullName ||
        req.candidate?.fullName ||
        '',
      dob: parsedPersonal.dob || req.body.dob || req.candidate?.dob || '',
      gender: parsedPersonal.gender || req.body.gender || req.candidate?.gender || 'male',
      category: parsedPersonal.category || req.body.category || req.candidate?.category || 'General',
      religion: parsedPersonal.religion || req.body.religion || '',
      nationality: parsedPersonal.nationality || req.body.nationality || 'Indian',
      aadhaarNumber: parsedPersonal.aadhaarNumber || req.body.aadhaarNumber || req.body.aadhaar || '',
      fatherName: parsedPersonal.fatherName || req.body.fatherName || req.body['father-name'] || '',
      motherName: parsedPersonal.motherName || req.body.motherName || req.body['mother-name'] || '',
      guardianName: parsedPersonal.guardianName || req.body.guardianName || req.body['guardian-name'] || '',
      guardianOccupation:
        parsedPersonal.guardianOccupation ||
        req.body.guardianOccupation ||
        req.body['guardian-occupation'] ||
        ''
    };

    const academicDetails = {
      qualifyingExam:
        parsedAcademic.qualifyingExam ||
        req.body.qualifyingExam ||
        req.body['qualifying-exam'] ||
        'Plus Two (HSE Kerala)',
      board: parsedAcademic.board || req.body.board || 'DHSE Kerala',
      passYear: parsedAcademic.passYear || req.body.passYear || req.body['pass-year'] || '2026',
      totalMarks: parsedAcademic.totalMarks || req.body.totalMarks || req.body['total-marks'] || '',
      percentage: parsedAcademic.percentage || req.body.percentage || '',
      schoolName: parsedAcademic.schoolName || req.body.schoolName || req.body['school-name'] || '',
      schoolDistrict:
        parsedAcademic.schoolDistrict ||
        req.body.schoolDistrict ||
        req.body['school-district'] ||
        '',
      subjects:
        parsedAcademic.subjects ||
        (Array.isArray(req.body.subjects) ? req.body.subjects : req.body.subjects ? [req.body.subjects] : [])
    };

    const communicationDetails = {
      permanentAddress:
        parsedCommunication.permanentAddress ||
        req.body.permanentAddress ||
        req.body.address ||
        '',
      district: parsedCommunication.district || req.body.district || 'Thiruvananthapuram',
      state: parsedCommunication.state || req.body.state || 'Kerala',
      pincode: parsedCommunication.pincode || req.body.pincode || '',
      mobileNumber:
        parsedCommunication.mobileNumber ||
        req.body.mobileNumber ||
        req.body.mobile ||
        req.candidate?.mobileNumber ||
        '',
      email:
        parsedCommunication.email ||
        req.body.email ||
        req.candidate?.email ||
        '',
      altPhone: parsedCommunication.altPhone || req.body.altPhone || req.body['alt-phone'] || '',
      examCenterPref:
        parsedCommunication.examCenterPref ||
        req.body.examCenterPref ||
        req.body['exam-center-pref'] ||
        ''
    };

    // Step 4: Existing application check to preserve already uploaded document paths
    let existingApp = await Application.findOne({ candidateId });

    const documents = {
      photoPath: photoFile
        ? `/uploads/${photoFile.filename}`
        : existingApp?.documents?.photoPath || '',
      signaturePath: signatureFile
        ? `/uploads/${signatureFile.filename}`
        : existingApp?.documents?.signaturePath || '',
      certificatePath: certificateFile
        ? `/uploads/${certificateFile.filename}`
        : existingApp?.documents?.certificatePath || '',
      sslcPath: sslcFile
        ? `/uploads/${sslcFile.filename}`
        : existingApp?.documents?.sslcPath || '',
      plus2Path: plus2File
        ? `/uploads/${plus2File.filename}`
        : existingApp?.documents?.plus2Path || '',
      communityPath: communityFile
        ? `/uploads/${communityFile.filename}`
        : existingApp?.documents?.communityPath || '',
      incomePath: incomeFile
        ? `/uploads/${incomeFile.filename}`
        : existingApp?.documents?.incomePath || ''
    };

    // Step 5: Setup payment confirmation details
    const paymentDetails = {
      amount: parsedPayment.amount || req.body.amount || 800,
      paymentMethod:
        parsedPayment.paymentMethod ||
        req.body.paymentMethod ||
        req.body['payment-method'] ||
        'Net Banking',
      transactionId:
        parsedPayment.transactionId ||
        req.body.transactionId ||
        `TXN${Date.now()}${Math.floor(100 + Math.random() * 900)}`,
      status: 'Paid',
      paidAt: new Date()
    };

    // Step 6: Assemble full application record
    const applicationData = {
      candidateId,
      applicationNumber: applicationNumber || existingApp?.applicationNumber,
      personalDetails,
      academicDetails,
      courseSelections: req.body.courseSelections
        ? (Array.isArray(req.body.courseSelections) ? req.body.courseSelections : [req.body.courseSelections])
        : ['Engineering'],
      communicationDetails,
      documents,
      paymentDetails,
      status: 'Submitted',
      currentStep: 4, // Verification / Admit Card stage
      remarks: ''
    };

    // Step 7: Save or update document in MongoDB
    const application = await Application.findOneAndUpdate(
      { candidateId },
      applicationData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Step 8: Return success response
    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application'
    });
  }
};

/**
 * 2. GET CANDIDATE APPLICATION
 * Route: GET /api/application/my-application
 * Access: Private (Candidate only - protected with JWT)
 *
 * Description:
 * - Finds the application belonging to the authenticated candidate.
 * - Returns application details, document upload status, timeline step, and payment status.
 */
const getMyApplication = async (req, res) => {
  try {
    const candidateId = req.user?.id || req.candidate?._id;
    const applicationNumber = req.user?.applicationNumber || req.candidate?.applicationNumber;

    if (!candidateId && !applicationNumber) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in first.'
      });
    }

    // Search by candidateId first, fallback to applicationNumber
    let application = null;
    if (candidateId) {
      application = await Application.findOne({ candidateId }).populate(
        'candidateId',
        'fullName email mobileNumber applicationNumber category dob gender'
      );
    }

    if (!application && applicationNumber) {
      application = await Application.findOne({ applicationNumber });
    }

    if (!application) {
      // If no application submitted yet, return basic candidate info so dashboard can still render
      const candidate = candidateId ? await Candidate.findById(candidateId).select('-password') : null;

      return res.json({
        success: true,
        data: null,
        candidate: candidate,
        message: 'No application submitted yet'
      });
    }

    return res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch application'
    });
  }
};

module.exports = {
  submitApplication,
  getMyApplication
};
