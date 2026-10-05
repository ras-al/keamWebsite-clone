// backend/middleware/upload.js
// Multer File Upload Configuration - Faheem Shan (B24CSA20)
// Configures file storage, size limits, and allowed types for candidate documents

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Step 1: Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Step 2: Configure storage destination and filename generator
const storage = multer.diskStorage({
  // Where to store the uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // How to name each uploaded file
  // Format: fieldname-timestamp-random.ext (e.g. photo-1718000000000-123456.jpg)
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedField = file.fieldname.replace(/[^a-zA-Z0-9_-]/g, '');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${sanitizedField}-${uniqueSuffix}${ext}`);
  }
});

// Step 3: File type filter - accept only images (JPEG/PNG) and PDF documents
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and PDF are allowed.`), false);
  }
};

// Step 4: Create and export the Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB max file size per file
  }
});

module.exports = upload;
