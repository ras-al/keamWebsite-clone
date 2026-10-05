// backend/middleware/auth.js
// JWT Authentication Guard - Ayman Riaz (B24CSA17)
// Protects private routes by verifying the Bearer token from Authorization header

const jwt = require('jsonwebtoken');

/**
 * protect - Middleware function that checks for a valid JWT token.
 *
 * How it works:
 * 1. Reads the Authorization header from the incoming request
 * 2. Checks if it starts with 'Bearer' (standard JWT format)
 * 3. Extracts the token string after 'Bearer '
 * 4. Verifies the token using the secret key from .env
 * 5. Attaches the decoded payload (candidate id, appNo) to req.user
 * 6. Calls next() so the request continues to the controller
 * 7. If anything fails, sends back a 401 Unauthorized response
 */
const protect = async (req, res, next) => {
  let token;

  // Step 1: Check if Authorization header exists and has Bearer format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Step 2: Extract token from 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];

      // Step 3: Verify token with our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Step 4: Attach decoded user info to the request object
      // Controllers can now access req.user.id, req.user.appNo, etc.
      req.user = decoded;

      // Step 5: Token is valid, move to the next middleware or controller
      return next();
    } catch (error) {
      // Token exists but is invalid or expired
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token',
      });
    }
  }

  // Step 6: No token was provided at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

module.exports = { protect };
