# Faheem Shan - README

## Profile
- **Name:** Faheem Shan
- **Roll Number:** B24CSA20
- **Role:** Dashboard & Application Form | Backend Application & Upload Controller

---

## Phase 1 - Frontend UI & Multi-Step Logic (✅ Completed)

### My Work
I built the Student Dashboard (`pages/dashboard.html`) and the 6-step Application Form (`pages/application.html`). The dashboard shows student profile info, a progress timeline, and a live clock. The application form handles validation, drag-and-drop file uploads, and a final review summary.

### JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `textContent` | Injects mock candidate data into the profile card |
| `classList.add/remove` | Marks timeline steps as completed or active |
| `setInterval` | Updates the live clock every 1 second |
| `createElement` | Dynamically creates a `<style>` tag for badge animation |
| `querySelectorAll('[required]')` | Finds all required fields for validation |
| Regex | Validates email and phone number formats |
| `FileReader.readAsDataURL` | Shows image preview without server upload |
| `scrollIntoView` | Scrolls to first error or top of form on step change |
| `style.display` | Toggles Next/Submit buttons based on current step |

---

## Phase 2 - Backend & MongoDB Integration

### Role: Application Form Submission, Document Upload & Dashboard API

### Assigned Files
- `backend/models/Application.js` (Mongoose Schema)
- `backend/middleware/upload.js` (Multer File Upload Configuration)
- `backend/controllers/applicationController.js` (Application business logic)
- `backend/routes/applicationRoutes.js` (Application endpoints)
- `js/application.js` & `js/dashboard.js` (Frontend API connections)

---

### Step-by-Step Implementation Instructions

#### 1. Setup Backend Environment
Ensure the backend is running with dependencies installed:
```bash
cd backend
npm install
npm run dev
```

#### 2. Create `backend/models/Application.js`
Define the comprehensive Mongoose schema for KEAM candidates:
- **Location**: `backend/models/Application.js`
- **Fields**:
  - `candidateId`: ObjectId reference to `Candidate` model (required)
  - `applicationNumber`: String, required, unique (e.g. `2600124`)
  - `personalDetails`: Object
    - `candidateName`, `dob`, `gender`, `category`, `fatherName`, `motherName`, `nationality`, `aadhaarNumber`
  - `academicDetails`: Object
    - `qualifyingExam` (Plus Two / CBSE / ISC), `board`, `physicsMarks`, `chemistryMarks`, `mathsMarks`, `totalMarks`, `percentage`
  - `courseSelections`: Array of Strings (e.g. `['Engineering', 'Architecture']`)
  - `communicationDetails`: Object
    - `permanentAddress`, `district`, `pincode`, `mobileNumber`, `email`
  - `documents`: Object
    - `photoPath`: String
    - `signaturePath`: String
    - `certificatePath`: String
  - `paymentDetails`: Object
    - `amount`: Number (default: 800)
    - `transactionId`: String
    - `status`: String (`'Pending'`, `'Paid'`, `'Failed'`)
    - `paidAt`: Date
  - `status`: String (`'Draft'`, `'Submitted'`, `'Under Verification'`, `'Approved'`, `'Defective'`)
  - `currentStep`: Number (default: 1, range 1-7)
  - `remarks`: String
  - `timestamps`: true

#### 3. Create `backend/middleware/upload.js`
Configure `multer` to handle candidate file uploads (photo, signature, nativity certificate):
- **Location**: `backend/middleware/upload.js`
- **Upload Directory**: `backend/uploads/`
- **Allowed MIME types**: `image/jpeg`, `image/png`, `application/pdf`
- **Max file size**: 2MB per file
- **Fields to accept**:
  - `upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }, { name: 'certificate', maxCount: 1 }])`

**Sample Multer Setup**:
```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = upload;
```

#### 4. Create `backend/controllers/applicationController.js`
Implement the core controller functions:
- **`submitApplication(req, res)`**:
  - Receives form data and uploaded files (`req.files`).
  - Associates submission with authenticated candidate (`req.user.id`).
  - Saves or updates the candidate's `Application` document in MongoDB.
  - Sets `status: 'Submitted'`, `currentStep: 4` (Verification phase).
  - Returns `{ success: true, message: 'Application submitted successfully', data: application }`.
- **`getMyApplication(req, res)`**:
  - Finds the application for `req.user.id` or `req.user.applicationNumber`.
  - Returns `{ success: true, data: application }`.

#### 5. Create `backend/routes/applicationRoutes.js`
Mount routes and protect them with Ayman's `protect` auth middleware:
```javascript
const express = require('express');
const router = express.Router();
const { submitApplication, getMyApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post(
  '/submit',
  protect,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]),
  submitApplication
);

router.get('/my-application', protect, getMyApplication);

module.exports = router;
```

Uncomment the application route mount in `backend/server.js`:
```javascript
app.use('/api/application', require('./routes/applicationRoutes'));
```

#### 6. Connect Frontend Pages

**A. Multi-Step Application Form (`js/application.js`)**:
- At Step 6 ("Review & Submit"), update the submit handler:
- Gather all form inputs into a `FormData` object.
- Append files from the file input elements:
  ```javascript
  const formData = new FormData();
  formData.append('photo', photoFileInput.files[0]);
  formData.append('signature', signatureFileInput.files[0]);
  formData.append('certificate', certificateFileInput.files[0]);
  // Append form JSON data or individual fields
  ```
- Send POST request to `/api/application/submit` with `Authorization: Bearer <token>` header (or use `API.upload('/api/application/submit', formData)`).
- On success, redirect to `pages/dashboard.html` with success message.

**B. Student Dashboard (`js/dashboard.js`)**:
- On `DOMContentLoaded`, check if `localStorage.getItem('token')` exists. If not, redirect to `pages/login.html`.
- Fetch `GET /api/application/my-application` with token.
- Replace mock data:
  - Candidate Name, Application Number, Roll Number, Stream, Category.
  - Dynamic Timeline Steps: Update step indicators (0 to 6) based on `application.currentStep` and `application.status`.
  - Display admin remarks if status is `'Defective'`.

---

## Testing Your Implementation

```bash
# 1. Test submitting application with token via cURL
curl -X POST http://localhost:5000/api/application/submit \
  -H "Authorization: Bearer <VALID_JWT_TOKEN>" \
  -F "candidateName=Faheem Shan" \
  -F "category=General" \
  -F "photo=@test_photo.jpg"

# 2. Test fetching submitted application
curl -H "Authorization: Bearer <VALID_JWT_TOKEN>" http://localhost:5000/api/application/my-application
```

---

## Git Workflow for Pull Requests
1. Branch from `rasal` or `main`:
   ```bash
   git checkout -b feature/faheem-application-api
   ```
2. Commit your changes:
   ```bash
   git add backend/models/Application.js backend/controllers/applicationController.js backend/routes/applicationRoutes.js backend/middleware/upload.js js/application.js js/dashboard.js
   git commit -m "feat(application): multi-step form upload backend and dashboard data binding"
   ```
3. Submit a Pull Request to Team Leader Rasal for code review.
