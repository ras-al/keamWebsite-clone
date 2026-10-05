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

## Phase 2 - Backend & MongoDB Integration (✅ Completed)

### My Work
I implemented the complete application submission pipeline and dynamic dashboard data binding:
1. **Application Model (`backend/models/Application.js`)**: Designed a comprehensive Mongoose schema linking candidate applications to Candidate records, with personal, academic, communication, document file paths, payment status, and a 7-stage application pipeline.
2. **Multer File Upload Middleware (`backend/middleware/upload.js`)**: Configured disk storage, filename sanitization, a 2MB file size limit, and MIME type validation (`image/jpeg`, `image/png`, `application/pdf`) to securely store candidate photos, signatures, and certificates.
3. **Application Controller (`backend/controllers/applicationController.js`)**: Built `submitApplication` to handle multipart FormData submissions, map file uploads, record simulated payments, advance pipeline status, and `getMyApplication` to retrieve candidate application records.
4. **Application Routes (`backend/routes/applicationRoutes.js`) & Server Integration (`backend/server.js`)**: Created protected routes using JWT auth middleware, wired upload fields, and mounted the routes and static `/uploads` file server in `server.js`.
5. **Frontend API Connections (`js/application.js` & `js/dashboard.js`)**: Upgraded the multi-step application form with auto-prefill, multipart FormData submission via `API.upload`, and connected the student dashboard to dynamically reflect real application status, 7-step timeline progress, and admin defect notifications.

### Implemented & Assigned Files

| File | Type | Purpose |
|------|------|---------|
| `backend/models/Application.js` | Mongoose Schema | Database schema for application records, documents, payment, and status |
| `backend/middleware/upload.js` | Middleware | Multer configuration for file uploads (photos, signatures, certificates) |
| `backend/controllers/applicationController.js` | Controller | Business logic for submitting applications and fetching candidate details |
| `backend/routes/applicationRoutes.js` | Express Routes | Protected `/api/application/submit` and `/api/application/my-application` routes |
| `backend/server.js` | Server Configuration | Route mounting and static file serving for `/uploads` directory |
| `js/application.js` | Frontend JS | Multi-step form data collection, file upload, API submission, and fallback |
| `js/dashboard.js` | Frontend JS | Authenticated profile display, dynamic timeline (steps 1–7), and logout |

---

### JS, Node.js & Mongoose Concepts Used

| Concept | Where I Used It | What It Does |
|---------|-----------------|--------------|
| `mongoose.Schema()` | `backend/models/Application.js` | Defines the structured document layout and data types for MongoDB |
| `mongoose.Schema.Types.ObjectId` | `backend/models/Application.js` | Creates a foreign-key relationship referencing the `Candidate` model |
| `timestamps: true` | `backend/models/Application.js` | Automatically adds `createdAt` and `updatedAt` tracking fields |
| `multer.diskStorage()` | `backend/middleware/upload.js` | Controls upload directory destination and custom unique file naming |
| `fileFilter` | `backend/middleware/upload.js` | Validates file MIME types to allow only JPEGs, PNGs, and PDFs |
| `limits: { fileSize: 2MB }` | `backend/middleware/upload.js` | Enforces max file size to prevent oversized uploads from crashing server |
| `upload.fields([...])` | `backend/routes/applicationRoutes.js` | Accepts specific named file fields (`photo`, `signature`, `certificate`, etc.) |
| `protect` middleware | `backend/routes/applicationRoutes.js` | Ensures only candidates with valid JWT tokens can submit or access applications |
| `findOneAndUpdate(..., { upsert: true })` | `backend/controllers/applicationController.js` | Updates existing application or inserts a new one if not found |
| `req.files` | `backend/controllers/applicationController.js` | Reads uploaded file metadata and disk filenames from Multer |
| `express.static('/uploads')` | `backend/server.js` | Exposes uploaded document files as public static URLs |
| `new FormData()` | `js/application.js` | Constructs multipart/form-data payload with text inputs and files for submission |
| `API.upload(url, formData)` | `js/application.js` | Sends HTTP POST with FormData and auto-attached JWT Authorization header |
| `API.get(url)` | `js/dashboard.js` | Fetches candidate application status from backend on page load |
| `localStorage` session handling | `js/application.js` & `js/dashboard.js` | Persists auth tokens and provides seamless client fallback |
| Dynamic Timeline DOM logic | `js/dashboard.js` | Dynamically updates classes (`timeline__step--completed`, `--active`) across 7 steps |

---

### Application Architecture & Data Flow

```
+-----------------------------------------------------------------------------------+
|                              CANDIDATE WORKFLOW                                    |
+-----------------------------------------------------------------------------------+
       |
       | 1. Candidate fills Multi-step Form & selects documents (Photo, Sign, Docs)
       v
+------------------------+
|   js/application.js    | ---> Builds FormData (Fields + Files)
+------------------------+
       |
       | 2. POST /api/application/submit (with Bearer Token)
       v
+------------------------+
| backend/middleware/    | ---> Validates JWT, verifies token signature,
| auth.js (protect)      |      and attaches candidate payload to req.user
+------------------------+
       |
       v
+------------------------+
| backend/middleware/    | ---> Validates MIME type & 2MB size limit,
| upload.js (Multer)     |      writes files to backend/uploads/
+------------------------+
       |
       v
+------------------------+
| backend/controllers/   | ---> Maps form data & /uploads/ file paths,
| applicationController  |      sets status: 'Submitted', currentStep: 4
+------------------------+
       |
       | 3. findOneAndUpdate({ candidateId }, data, { upsert: true })
       v
+------------------------+
| MongoDB Atlas Database |
| (Application document) |
+------------------------+
       |
       | 4. Success Response { success: true, data: application }
       v
+------------------------+
| Student Dashboard      | ---> GET /api/application/my-application
| (pages/dashboard.html  |      Updates Profile Card, 7-Step Progress Timeline,
|  & js/dashboard.js)    |      Quick Actions, and Defect alerts
+------------------------+
```

---

### Implemented API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/application/submit` | Private (Candidate JWT) | Submits full application details and uploads candidate documents |
| `GET` | `/api/application/my-application` | Private (Candidate JWT) | Fetches the logged-in candidate's submitted application record |
| `GET` | `/uploads/:filename` | Public | Serves uploaded document files (photos, signatures, certificates) |

---

### Step-by-Step Testing Guide

#### 1. Test Submitting Application with Documents (via cURL)
```bash
# Obtain your JWT token via login or registration first
curl -X POST http://localhost:5000/api/application/submit \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -F "candidateName=Faheem Shan" \
  -F "dob=2006-05-15" \
  -F "gender=male" \
  -F "category=General" \
  -F "fatherName=Shan M" \
  -F "motherName=Amina" \
  -F "qualifyingExam=Plus Two (HSE Kerala)" \
  -F "board=DHSE Kerala" \
  -F "totalMarks=480" \
  -F "percentage=96" \
  -F "permanentAddress=Shan House, Santhi Nagar" \
  -F "district=Thiruvananthapuram" \
  -F "pincode=695001" \
  -F "mobileNumber=9876543210" \
  -F "email=faheem@example.com" \
  -F "photo=@test_photo.jpg"
```

#### 2. Test Fetching Submitted Application
```bash
curl -X GET http://localhost:5000/api/application/my-application \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### 3. Test Frontend Flow in Browser
1. Log in via `pages/login.html` (Application number and password).
2. Navigate to `pages/application.html` — verified prefill of registered candidate details.
3. Complete Step 1 through Step 5 (Personal, Academic, Communication, Document upload, Fee payment).
4. Review all entered details at Step 6, agree to the declaration, and click **Submit Application**.
5. Modal displays with your Application Number; click **Go to Dashboard**.
6. `pages/dashboard.html` dynamically displays candidate profile, marks Registration, Application Submitted, and Fee Payment as complete, and places Admit Card at the active stage.

---

## Git Workflow for Pull Requests

1. **Active Branch**: `faheem`
2. **Commit History**:
   - `82211d6`: Merge remote-tracking branch 'origin/main' into faheem (Clean fast-forward merge)
   - `b19f625`: `feat(application): multi-step form upload backend and dashboard data binding`
3. **Files Committed**:
   - `backend/models/Application.js`
   - `backend/middleware/upload.js`
   - `backend/controllers/applicationController.js`
   - `backend/routes/applicationRoutes.js`
   - `backend/server.js`
   - `backend/uploads/.gitkeep`
   - `js/application.js`
   - `js/dashboard.js`
   - `Faheem_Shan_README.md`
4. **Merge Compatibility**: Verified with `git merge-tree` — **0 conflicts** with `main` and ready for Pull Request review.
