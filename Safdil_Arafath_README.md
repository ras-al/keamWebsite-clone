# Safdil Arafath - README

## Profile
- **Name:** Safdil Arafath
- **Roll Number:** B24CSA54
- **Role:** Login & Registration Pages | Candidate Authentication & Security

---

## Phase 1 - Frontend UI & Client Validation (✅ Completed)

### My Work
I built the Login and Registration pages (`pages/login.html` & `pages/register.html`). My pages include a random CAPTCHA generator, a 4-tier password strength meter, togglable password visibility, and full form validation -- all in pure JavaScript with no external libraries.

### JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `Math.random()` | Generates random 5-character CAPTCHA strings |
| `setAttribute('data-captcha')` | Stores CAPTCHA answer on the DOM element |
| `input.type` swap | Toggles password field between text and password |
| `input` event listener | Evaluates password strength in real-time as user types |
| Regex | Checks for uppercase, digits, symbols, and length |
| `classList.add('active')` | Lights up strength meter bars based on score |
| `preventDefault()` | Intercepts form submit for client-side validation |
| `setTimeout` | Simulates server processing delay |
| `window.location.href` | Redirects to dashboard after successful login |

---

## Phase 2 - Backend & MongoDB Integration

### Role: User Authentication, Security & Candidate Accounts

### Assigned Files
- `backend/models/Candidate.js` (Candidate Account Mongoose Schema)
- `backend/controllers/authController.js` (Registration & Login Logic)
- `backend/routes/authRoutes.js` (Auth API endpoints)
- `js/login.js` (Frontend API Connection & JWT Session Storage)

---

### Step-by-Step Implementation Instructions

#### 1. Setup Backend Environment
Ensure the backend is running with dependencies installed:
```bash
cd backend
npm install
npm run dev
```

#### 2. Create `backend/models/Candidate.js`
Define the Mongoose schema for candidate accounts:
- **Location**: `backend/models/Candidate.js`
- **Fields**:
  - `applicationNumber`: String, unique: true, required: true (7-digit number, e.g. `'2610543'`)
  - `fullName`: String, required: true, trim: true
  - `dob`: String or Date, required: true (Format: `YYYY-MM-DD` or `DD-MM-YYYY`)
  - `email`: String, required: true, unique: true, lowercase: true
  - `mobileNumber`: String, required: true
  - `gender`: String, enum: `['Male', 'Female', 'Transgender']`
  - `category`: String (e.g., `'General'`, `'SEBC'`, `'SC'`, `'ST'`)
  - `password`: String, required: true (hashed with `bcryptjs`)
  - `role`: String, default: `'candidate'`
  - `timestamps`: true

#### 3. Create `backend/controllers/authController.js`
Implement `register` and `login` handlers:

**A. `register(req, res)`**:
1. Destructure `fullName`, `dob`, `email`, `mobileNumber`, `gender`, `category`, `password` from `req.body`.
2. Check if a candidate already exists with the given email:
   ```javascript
   const existingCandidate = await Candidate.findOne({ email });
   if (existingCandidate) {
     return res.status(400).json({ success: false, message: 'Email already registered' });
   }
   ```
3. Generate a unique 7-digit Application Number:
   ```javascript
   const applicationNumber = '26' + Math.floor(10000 + Math.random() * 90000);
   ```
4. Hash the password with `bcryptjs`:
   ```javascript
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   ```
5. Save the candidate record in MongoDB Atlas.
6. Return a success response:
   ```json
   {
     "success": true,
     "message": "Registration successful! Save your Application Number.",
     "data": {
       "applicationNumber": "2648219",
       "fullName": "Safdil Arafath",
       "email": "safdil@example.com"
     }
   }
   ```

**B. `login(req, res)`**:
1. Destructure `applicationNumber` and `password` from `req.body`.
2. Find candidate by `applicationNumber`:
   ```javascript
   const candidate = await Candidate.findOne({ applicationNumber });
   if (!candidate) {
     return res.status(401).json({ success: false, message: 'Invalid Application Number or Password' });
   }
   ```
3. Compare provided password against hashed password:
   ```javascript
   const isMatch = await bcrypt.compare(password, candidate.password);
   if (!isMatch) {
     return res.status(401).json({ success: false, message: 'Invalid Application Number or Password' });
   }
   ```
4. Generate signed JWT:
   ```javascript
   const token = jwt.sign(
     { id: candidate._id, applicationNumber: candidate.applicationNumber },
     process.env.JWT_SECRET,
     { expiresIn: '7d' }
   );
   ```
5. Return JWT token and candidate profile data (excluding password).

#### 4. Create `backend/routes/authRoutes.js`
Create and export the router:
```javascript
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

Uncomment the auth route mount in `backend/server.js`:
```javascript
app.use('/api/auth', require('./routes/authRoutes'));
```

#### 5. Connect Frontend (`js/login.js`)

**A. Registration Form**:
- In the registration submit listener, after CAPTCHA and password validation passes:
- Send `POST` to `/api/auth/register` with form data:
  ```javascript
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, dob, email, mobileNumber, gender, category, password })
  });
  const data = await res.json();
  if (data.success) {
    alert(`Registration Successful! Your Application Number is: ${data.data.applicationNumber}. Please write this down for logging in.`);
    window.location.href = 'login.html';
  } else {
    showError(data.message);
  }
  ```

**B. Login Form**:
- In the login submit listener:
- Send `POST` to `/api/auth/login`:
  ```javascript
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ applicationNumber, password })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('candidate', JSON.stringify(data.candidate));
    window.location.href = 'dashboard.html';
  } else {
    showError(data.message);
  }
  ```

---

## Testing Your Implementation

```bash
# 1. Test Registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","dob":"2005-04-12","email":"john@example.com","mobileNumber":"9876543210","gender":"Male","category":"General","password":"Password@123"}'

# 2. Test Login with returned Application Number
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"applicationNumber":"2612345","password":"Password@123"}'
```

---

## Git Workflow for Pull Requests
1. Branch from `rasal` or `main`:
   ```bash
   git checkout -b feature/safdil-auth-api
   ```
2. Commit your changes:
   ```bash
   git add backend/models/Candidate.js backend/controllers/authController.js backend/routes/authRoutes.js js/login.js
   git commit -m "feat(auth): candidate registration, bcrypt hashing, JWT login, and client auth integration"
   ```
3. Submit a Pull Request to Team Leader Rasal for code review.
