const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');

// ──────────────────────────────────────────────────────────
// JWT Authentication Middleware
// ──────────────────────────────────────────────────────────
// This middleware acts as a "security guard" — it checks if
// the incoming request has a valid JWT token before allowing
// access to protected routes (like viewing the dashboard).
//
// HOW IT WORKS:
// 1. Browser sends: Authorization: "Bearer eyJhbGciOi..."
// 2. Middleware extracts the token after "Bearer "
// 3. jwt.verify() checks if the token is valid & not expired
// 4. If valid → attaches candidate info to req.candidate
// 5. If invalid → sends 401 Unauthorized error
// ──────────────────────────────────────────────────────────

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer"
  // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token part (everything after "Bearer ")
      // "Bearer eyJhbGci..." → "eyJhbGci..."
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      // jwt.verify() decodes the token and checks:
      //   - Was it signed with our JWT_SECRET?
      //   - Has it expired?
      // If valid, returns the payload: { id, applicationNumber, iat, exp }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the candidate in the database using the ID from the token
      // .select('-password') = return all fields EXCEPT password
      req.candidate = await Candidate.findById(decoded.id).select('-password');

      if (!req.candidate) {
        return res.status(401).json({
          success: false,
          message: 'Account not found. Please log in again.'
        });
      }

      // Token is valid and candidate exists → allow the request to continue
      // next() passes control to the next middleware or route handler
      next();

    } catch (error) {
      // Token is invalid or expired
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.'
      });
    }
  }

  // No token found in headers
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. No token provided.'
    });
  }
};

module.exports = { protect };
