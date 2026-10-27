// backend/models/Application.js
// KEAM Portal - Candidate Application Model
// Author: Faheem Shan (B24CSA20)
// Defines the MongoDB schema for candidate applications, including personal details,
// academic background, uploaded document paths, and payment information.

const mongoose = require('mongoose');

// Define the Application Schema
const applicationSchema = new mongoose.Schema(
  {
    // 1. Reference to the Candidate user account
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: [true, 'Candidate ID is required']
    },

    // 2. Unique 7-digit Application Number (e.g., '2648219')
    applicationNumber: {
      type: String,
      required: [true, 'Application Number is required'],
      unique: true,
      trim: true
    },

    // 3. Personal Details (Step 1 of Application Form)
    personalDetails: {
      candidateName: {
        type: String,
        required: [true, 'Candidate name is required'],
        trim: true
      },
      dob: {
        type: String,
        required: [true, 'Date of birth is required']
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other', 'Male', 'Female', 'Other'],
        required: [true, 'Gender is required']
      },
      category: {
        type: String,
        required: [true, 'Category is required']
      },
      religion: {
        type: String,
        default: ''
      },
      nationality: {
        type: String,
        default: 'Indian'
      },
      aadhaarNumber: {
        type: String,
        default: ''
      },
      fatherName: {
        type: String,
        required: [true, "Father's name is required"],
        trim: true
      },
      motherName: {
        type: String,
        required: [true, "Mother's name is required"],
        trim: true
      },
      guardianName: {
        type: String,
        default: ''
      },
      guardianOccupation: {
        type: String,
        default: ''
      }
    },

    // 4. Academic Details (Step 2 of Application Form)
    academicDetails: {
      qualifyingExam: {
        type: String,
        required: [true, 'Qualifying examination is required']
      },
      board: {
        type: String,
        required: [true, 'Board / University is required']
      },
      passYear: {
        type: String,
        default: '2026'
      },
      rollNumber: {
        type: String,
        default: ''
      },
      totalMarks: {
        type: String,
        default: ''
      },
      percentage: {
        type: String,
        default: ''
      },
      schoolName: {
        type: String,
        default: ''
      },
      schoolDistrict: {
        type: String,
        default: ''
      },
      physicsMarks: {
        type: Number,
        default: null
      },
      chemistryMarks: {
        type: Number,
        default: null
      },
      mathsMarks: {
        type: Number,
        default: null
      },
      subjects: [
        {
          type: String
        }
      ]
    },

    // 5. Course Selections (e.g. ['Engineering', 'Architecture', 'Pharmacy'])
    courseSelections: {
      type: [String],
      default: ['Engineering']
    },

    // 6. Communication Details (Step 3 of Application Form)
    communicationDetails: {
      permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required']
      },
      district: {
        type: String,
        required: [true, 'District is required']
      },
      state: {
        type: String,
        default: 'Kerala'
      },
      pincode: {
        type: String,
        required: [true, 'PIN code is required']
      },
      mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
      },
      altPhone: {
        type: String,
        default: ''
      },
      examCenterPref: {
        type: String,
        default: ''
      }
    },

    // 7. Uploaded Documents (Step 4 of Application Form)
    documents: {
      photoPath: {
        type: String,
        default: ''
      },
      signaturePath: {
        type: String,
        default: ''
      },
      certificatePath: {
        type: String,
        default: ''
      },
      sslcPath: {
        type: String,
        default: ''
      },
      plus2Path: {
        type: String,
        default: ''
      },
      communityPath: {
        type: String,
        default: ''
      },
      incomePath: {
        type: String,
        default: ''
      }
    },

    // 8. Payment Details (Step 5 of Application Form)
    paymentDetails: {
      amount: {
        type: Number,
        default: 800
      },
      paymentMethod: {
        type: String,
        default: 'Net Banking'
      },
      transactionId: {
        type: String,
        default: ''
      },
      status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Paid'
      },
      paidAt: {
        type: Date,
        default: Date.now
      }
    },

    // 9. Overall Application Status
    // Draft: User started filling
    // Submitted: Form completed & submitted
    // Under Verification: Documents being verified by CEE
    // Approved: Verified & admit card eligible
    // Defective: Defect flagged by admin for candidate correction
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Verification', 'Approved', 'Defective', 'Rejected'],
      default: 'Submitted'
    },

    // 10. Current Step in Application Pipeline (1 to 7)
    // 1: Registration, 2: Application Submitted, 3: Fee Payment, 4: Admit Card, etc.
    currentStep: {
      type: Number,
      default: 4,
      min: 1,
      max: 7
    },

    // 11. Admin Remarks (e.g. instructions if defective)
    remarks: {
      type: String,
      default: ''
    },

    // 12. Admit Card Details (Managed by Admin)
    admitCard: {
      issued: {
        type: Boolean,
        default: false
      },
      rollNumber: {
        type: String,
        default: ''
      },
      examCenter: {
        type: String,
        default: ''
      },
      paper1Schedule: {
        type: String,
        default: '10 Aug 2026 (10:00 AM - 12:30 PM)'
      },
      paper2Schedule: {
        type: String,
        default: '10 Aug 2026 (02:00 PM - 04:30 PM)'
      },
      issuedAt: {
        type: Date,
        default: null
      }
    },

    // 13. Examination Rank & Scores (Managed by Admin)
    rankDetails: {
      published: {
        type: Boolean,
        default: false
      },
      paper1Score: {
        type: Number,
        default: null
      },
      paper2Score: {
        type: Number,
        default: null
      },
      standardizedScore: {
        type: Number,
        default: null
      },
      stateMeritRank: {
        type: Number,
        default: null
      },
      categoryRank: {
        type: Number,
        default: null
      },
      publishedAt: {
        type: Date,
        default: null
      }
    },

    // 14. Centralized Allotment Process (CAP) Seat Allotment (Managed by Admin)
    seatAllotment: {
      allotted: {
        type: Boolean,
        default: false
      },
      institution: {
        type: String,
        default: ''
      },
      course: {
        type: String,
        default: ''
      },
      optionNo: {
        type: Number,
        default: null
      },
      quota: {
        type: String,
        default: 'State Merit Quota'
      },
      reportingDate: {
        type: String,
        default: ''
      },
      memoIssued: {
        type: Boolean,
        default: false
      },
      allottedAt: {
        type: Date,
        default: null
      }
    },

    // 15. Candidate College & Course Preferences
    optionRegistration: {
      locked: {
        type: Boolean,
        default: false
      },
      options: [
        {
          priority: Number,
          college: String,
          course: String
        }
      ]
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Application', applicationSchema);
