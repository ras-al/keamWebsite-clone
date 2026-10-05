const mongoose = require('mongoose');

// mongoose.Schema() = defines the structure of a document in MongoDB
// Think of it as a "form template" that every candidate document must follow
const candidateSchema = new mongoose.Schema(
  {
    // Application Number — auto-generated 7-digit ID (e.g., "2648219")
    applicationNumber: {
      type: String,       // stored as text, not a number
      unique: true,       // no two candidates can share the same app number
      required: true      // this field MUST be provided
    },

    // Full Name — candidate's name
    fullName: {
      type: String,
      required: true,
      trim: true          // removes extra spaces: " Safdil " → "Safdil"
    },

    // Date of Birth — stored as string in YYYY-MM-DD format
    dob: {
      type: String,
      required: true
    },

    // Email — must be unique (one account per email)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true     // auto-converts "JOHN@Gmail.com" → "john@gmail.com"
    },

    // Mobile Number — 10-digit Indian phone number
    mobileNumber: {
      type: String,
      required: true
    },

    // Gender — only allows these 3 specific values
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Transgender']  // enum = only these values are valid
    },

    // Category — reservation category
    category: {
      type: String
    },

    // Password — stored as a bcrypt HASH (never plain text!)
    password: {
      type: String,
      required: true
    },

    // Role — defaults to 'candidate' (could be 'admin' in future)
    role: {
      type: String,
      default: 'candidate'
    }
  },
  {
    timestamps: true  // auto-adds createdAt and updatedAt fields
  }
);

// mongoose.model('Candidate', schema) creates a "candidates" collection in MongoDB
module.exports = mongoose.model('Candidate', candidateSchema);
