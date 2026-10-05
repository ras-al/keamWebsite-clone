const express = require('express');
const router = express.Router();

// Import controller functions (the actual logic)
const { register, login, getMe } = require('../controllers/authController');

// Import the JWT auth middleware (the "security guard")
const { protect } = require('../middleware/auth');

// ──────────────────────────────────────────────────────────
// Route Mapping:
// These routes are mounted at /api/auth in server.js
// So "/register" below becomes "/api/auth/register"
// ──────────────────────────────────────────────────────────

// POST /api/auth/register → calls register() — Public (anyone can register)
router.post('/register', register);

// POST /api/auth/login → calls login() — Public (anyone can log in)
router.post('/login', login);

// GET /api/auth/me → calls getMe() — Protected (needs valid JWT token)
// The 'protect' middleware runs FIRST, verifies the token,
// then passes control to getMe() via next()
router.get('/me', protect, getMe);

module.exports = router;
