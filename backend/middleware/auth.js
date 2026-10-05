// backend/middleware/auth.js
// JWT Authentication Guard - Ayman Riaz (B24CSA17)
// Protects private routes by verifying the Bearer token from Authorization header

const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');

/**
 * protect - Middleware function that checks for a valid JWT token.
 *
 * How it works:
 * 1. Reads the Authorization header from the incoming request
 * 2. Checks if it starts with 'Bearer' (standard JWT format)
 * 3. Extracts the token string after 'Bearer '
 * 4. Verifies the token using the secret key from .env
 * 5. Finds the candidate in the database and attaches to req.candidate
 * 6. Also attaches the decoded token payload to req.user for convenience
 * 7. Calls next() so the request continues to the controller
 * 8. If anything fails, sends back a 401 Unauthorized response
 */
const protect = async (req, res, next) => {
  let token;

  // Step 1: Check if Authorization header exists and has Bearer format
  // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Step 2: Extract token from 'Bearer <token>'
      // "Bearer eyJhbGci..." → "eyJhbGci..."
      token = req.headers.authorization.split(' ')[1];

      // Step 3: Verify token with our secret key
      // jwt.verify() checks if the token was signed with our JWT_SECRET
      // and whether it has expired. Returns the payload: { id, applicationNumber, iat, exp }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Step 4: Find the candidate in the database using the ID from the token
      // .select('-password') returns all fields EXCEPT the password
      req.candidate = await Candidate.findById(decoded.id).select('-password');

      if (!req.candidate) {
        return res.status(401).json({
          success: false,
          message: 'Account not found. Please log in again.',
        });
      }

      // Step 5: Also attach decoded payload to req.user for convenience
      // Controllers can access req.user.id, req.candidate.applicationNumber, etc.
      req.user = decoded;

      // Step 6: Token is valid, move to the next middleware or controller
      return next();
    } catch (error) {
      // Token exists but is invalid or expired
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }
  }

  // Step 7: No token was provided at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

module.exports = { protect };
