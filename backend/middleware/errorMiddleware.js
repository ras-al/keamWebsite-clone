// backend/middleware/errorMiddleware.js
// Centralized Error Handlers - Enhanced by Ayman Riaz (B24CSA17)
// Handles 404 Not Found, CastError, Validation errors, and generic 500 errors

/**
 * notFound - Catches requests to routes that don't exist.
 *
 * How it works:
 * - Express calls this when no route matched the request URL
 * - It sends back a 404 status with a JSON error message
 * - The original URL is included so the client knows what went wrong
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

/**
 * errorHandler - Catches all errors thrown in controllers/middleware.
 *
 * How it works:
 * 1. Sets the status code (uses the one already set, or defaults to 500)
 * 2. Checks for specific Mongoose error types:
 *    - CastError: happens when an invalid MongoDB ObjectId is passed (e.g. /api/user/abc123)
 *    - ValidationError: happens when required fields are missing or data is wrong
 * 3. Sends a standardized JSON response with the error message
 * 4. In development mode, includes the stack trace for debugging
 *
 * Parameters: (err, req, res, next) — Express recognizes 4-param functions as error handlers
 */
const errorHandler = (err, req, res, next) => {
  // Use the status code from the response if it was set, otherwise 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server error';

  // Handle Mongoose CastError (invalid ObjectId)
  // Example: GET /api/application/not-a-valid-id
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Handle Mongoose ValidationError (missing required fields, wrong data types)
  // Example: POST /api/auth/register with missing email field
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Extract individual field error messages and join them
    const fields = Object.values(err.errors).map((e) => e.message);
    message = fields.join(', ');
  }

  // Send standardized error response
  res.status(statusCode).json({
    success: false,
    message: message,
    // Only show stack trace in development for debugging, hide in production
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = { notFound, errorHandler };
