const bcrypt = require('bcryptjs');    // for hashing passwords
const jwt = require('jsonwebtoken');   // for creating login tokens
const Candidate = require('../models/Candidate');  // our database model

// ──────────────────────────────────────────────────────────
// A. REGISTER — Create a new candidate account
// ──────────────────────────────────────────────────────────
// Called when: POST /api/auth/register
// What it does:
//   1. Checks if email is already registered
//   2. Generates a unique 7-digit Application Number
//   3. Hashes the password with bcrypt
//   4. Saves the candidate to MongoDB
//   5. Returns the Application Number to the user
// ──────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    // 1. Pull out form data from the request body
    //    req.body = the JSON object that the frontend sent us
    const { fullName, dob, email, mobileNumber, gender, category, password } = req.body;

    // 2. Check if a candidate already exists with this email
    //    findOne() = searches MongoDB for ONE document matching the filter
    //    If found → return error (don't allow duplicate accounts)
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.'
      });
    }

    // 3. Generate a unique 7-digit Application Number
    //    '26' prefix + random 5 digits → e.g., "2648219"
    //    Math.floor(10000 + Math.random() * 90000) gives a number between 10000-99999
    const applicationNumber = '26' + Math.floor(10000 + Math.random() * 90000);

    // 4. Hash the password (NEVER store plain-text passwords!)
    //    Step a: genSalt(10) → creates random "salt" to mix into the hash
    //            10 = number of salt rounds (higher = slower but more secure)
    const salt = await bcrypt.genSalt(10);
    //    Step b: hash() → converts "Password@123" to "$2a$10$X7jK..." (irreversible!)
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create the candidate document in MongoDB
    //    Candidate.create() = inserts a new document into the "candidates" collection
    const candidate = await Candidate.create({
      applicationNumber,
      fullName,
      dob,
      email,
      mobileNumber,
      gender,
      category,
      password: hashedPassword  // store the HASH, not the original password
    });

    // 6. Send success response back to the browser
    //    status(201) = "201 Created" (standard HTTP code for successful creation)
    res.status(201).json({
      success: true,
      message: 'Registration successful! Save your Application Number.',
      data: {
        applicationNumber: candidate.applicationNumber,
        fullName: candidate.fullName,
        email: candidate.email
      }
    });

  } catch (error) {
    // If anything goes wrong (e.g., database error), send a 500 Internal Server Error
    res.status(500).json({ success: false, message: error.message });
  }
};


// ──────────────────────────────────────────────────────────
// B. LOGIN — Authenticate candidate and return JWT token
// ──────────────────────────────────────────────────────────
// Called when: POST /api/auth/login
// What it does:
//   1. Finds candidate by Application Number
//   2. Compares the password against the stored hash
//   3. Creates a JWT token (like a digital ID card)
//   4. Sends back the token + candidate profile
// ──────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    // 1. Get login credentials from the request body
    const { applicationNumber, password } = req.body;

    // 2. Find the candidate by their Application Number
    //    findOne() returns null if not found
    const candidate = await Candidate.findOne({ applicationNumber });
    if (!candidate) {
      // Security tip: Don't reveal WHETHER the app number or password was wrong
      // Just say "invalid credentials" so attackers can't guess valid app numbers
      return res.status(401).json({
        success: false,
        message: 'Invalid Application Number or Password.'
      });
    }

    // 3. Compare the typed password against the stored hash
    //    bcrypt.compare("Password@123", "$2a$10$X7jK...") → true/false
    //    It hashes the input the same way and checks if the result matches
    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Application Number or Password.'
      });
    }

    // 4. Create a JWT (JSON Web Token)
    //    jwt.sign(payload, secretKey, options)
    //    payload = data to encode inside the token (who is this user?)
    //    secretKey = our secret from .env (used to sign & verify the token)
    //    expiresIn = how long the token is valid ('7d' = 7 days)
    const token = jwt.sign(
      { id: candidate._id, applicationNumber: candidate.applicationNumber },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Send back the token + candidate profile (WITHOUT the password)
    res.json({
      success: true,
      message: 'Login successful!',
      token,
      candidate: {
        id: candidate._id,
        applicationNumber: candidate.applicationNumber,
        fullName: candidate.fullName,
        email: candidate.email,
        mobileNumber: candidate.mobileNumber,
        gender: candidate.gender,
        category: candidate.category,
        role: candidate.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ──────────────────────────────────────────────────────────
// C. GET PROFILE — Return logged-in candidate's data
// ──────────────────────────────────────────────────────────
// Called when: GET /api/auth/me  (protected route — needs JWT)
// The auth middleware (protect) already verified the token and
// attached the candidate to req.candidate, so we just return it.
// ──────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  // req.candidate was set by the protect middleware in auth.js
  res.json({
    success: true,
    candidate: req.candidate
  });
};


// Export all three functions so routes can use them
module.exports = { register, login, getMe };
