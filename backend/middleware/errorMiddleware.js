// 404 Not Found handler
const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message || 'Server error' });
};

module.exports = { notFound, errorHandler };
