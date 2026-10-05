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

## Phase 2 - Backend & MongoDB Integration (✅ Completed)

### Role: User Authentication, Security & Candidate Accounts

### My Files
| File | Purpose |
|------|---------|
| `backend/models/Candidate.js` | Mongoose schema — defines the shape of candidate data in MongoDB |
| `backend/controllers/authController.js` | Business logic — register, login, and get-profile handlers |
| `backend/routes/authRoutes.js` | URL mapping — connects HTTP endpoints to controller functions |
| `backend/middleware/auth.js` | JWT guard — protects routes that need login |
| `js/login.js` | Frontend — replaced `setTimeout` with real `fetch()` API calls |

---

### What I Built

I created the **complete authentication system** for the KEAM portal. Candidates can now register (which generates a unique Application Number and stores a bcrypt-hashed password in MongoDB Atlas), log in (which verifies credentials and returns a signed JWT token), and access protected routes using the JWT middleware.

---

### Backend & JS Concepts Used

| Concept | File | How I Used It |
|---------|------|---------------|
| `mongoose.Schema()` | Candidate.js | Defines the 9-field structure of candidate documents in MongoDB |
| `unique: true` | Candidate.js | Prevents duplicate emails and application numbers at the database level |
| `enum: [...]` | Candidate.js | Restricts gender field to only `'Male'`, `'Female'`, `'Transgender'` |
| `trim: true` | Candidate.js | Auto-removes leading/trailing spaces from names |
| `lowercase: true` | Candidate.js | Auto-converts email to lowercase before saving |
| `timestamps: true` | Candidate.js | Auto-adds `createdAt` and `updatedAt` fields to every document |
| `bcrypt.genSalt(10)` | authController.js | Creates random salt data to strengthen the password hash |
| `bcrypt.hash(password, salt)` | authController.js | Converts plain password `"Pass@123"` into irreversible hash `"$2a$10$..."` |
| `bcrypt.compare()` | authController.js | Checks if a typed password matches the stored hash (login verification) |
| `jwt.sign(payload, secret)` | authController.js | Creates a signed token encoding the user's ID and app number |
| `jwt.verify(token, secret)` | auth.js (middleware) | Decodes and validates a JWT token on protected routes |
| `Candidate.findOne({ email })` | authController.js | Searches MongoDB for one document matching the filter |
| `Candidate.create(data)` | authController.js | Inserts a new candidate document into the `candidates` collection |
| `Candidate.findById(id)` | auth.js (middleware) | Finds a candidate by their MongoDB `_id` |
| `.select('-password')` | auth.js (middleware) | Returns all fields EXCEPT password (security best practice) |
| `async / await` | authController.js | Handles asynchronous database operations in readable sequential style |
| `try / catch` | authController.js | Catches errors so the server responds with error messages instead of crashing |
| `res.status(201).json()` | authController.js | Sends HTTP response with status code and JSON body |
| `express.Router()` | authRoutes.js | Creates a modular mini-router for grouping related routes |
| `router.post('/register', fn)` | authRoutes.js | Maps POST requests at `/register` to the register handler |
| `router.get('/me', protect, fn)` | authRoutes.js | Chains middleware — runs `protect` first, then `getMe` |
| `fetch('/api/auth/login', opts)` | login.js | Sends HTTP POST request from browser to Express server |
| `JSON.stringify(obj)` | login.js | Converts JavaScript object to JSON string for the request body |
| `.then(res => res.json())` | login.js | Parses the server's JSON response into a JavaScript object |
| `.catch(err => {...})` | login.js | Handles network errors (server down, no internet) |
| `localStorage.setItem('token')` | login.js | Stores JWT token in browser storage for session persistence |
| `req.headers.authorization` | auth.js (middleware) | Reads the `Authorization: Bearer <token>` header from incoming requests |
| `next()` | auth.js (middleware) | Passes control to the next middleware or route handler in the chain |

---

### How It Works (Step by Step)

#### 1. Candidate Schema (`backend/models/Candidate.js`)

A Mongoose schema is like a **form template** — it tells MongoDB what fields each candidate record must have:

```javascript
// Every candidate document in MongoDB will have these fields
const candidateSchema = new mongoose.Schema({
  applicationNumber: { type: String, unique: true, required: true },
  fullName:          { type: String, required: true, trim: true },
  dob:               { type: String, required: true },
  email:             { type: String, required: true, unique: true, lowercase: true },
  mobileNumber:      { type: String, required: true },
  gender:            { type: String, enum: ['Male', 'Female', 'Transgender'] },
  category:          { type: String },
  password:          { type: String, required: true },
  role:              { type: String, default: 'candidate' }
}, { timestamps: true });
```

#### 2. Registration Logic (`backend/controllers/authController.js`)

When a candidate submits the registration form, the `register()` function:

```javascript
// 1. Check if email is already taken
const existingCandidate = await Candidate.findOne({ email });
if (existingCandidate) {
  return res.status(400).json({ success: false, message: 'This email is already registered.' });
}

// 2. Generate a unique 7-digit Application Number
const applicationNumber = '26' + Math.floor(10000 + Math.random() * 90000);

// 3. Hash the password (NEVER store plain text!)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
// Example: "Password@123" → "$2a$10$X7jK..." (irreversible one-way hash)

// 4. Save to MongoDB
const candidate = await Candidate.create({
  applicationNumber, fullName, dob, email,
  mobileNumber, gender, category,
  password: hashedPassword
});
```

**Response:**
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

#### 3. Login Logic (`backend/controllers/authController.js`)

When a candidate logs in, the `login()` function:

```javascript
// 1. Find candidate by Application Number
const candidate = await Candidate.findOne({ applicationNumber });

// 2. Compare typed password against stored hash
const isMatch = await bcrypt.compare(password, candidate.password);

// 3. Generate a JWT token (like a digital ID card)
const token = jwt.sign(
  { id: candidate._id, applicationNumber: candidate.applicationNumber },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

#### 4. JWT Auth Middleware (`backend/middleware/auth.js`)

The `protect` middleware acts as a **security guard** for protected routes:

```javascript
// Browser sends: Authorization: "Bearer eyJhbGciOi..."
// Middleware extracts and verifies the token
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Attach candidate to the request (excluding password)
req.candidate = await Candidate.findById(decoded.id).select('-password');

// If valid → next() lets the request continue
// If invalid → 401 Unauthorized error
```

#### 5. Route Mapping (`backend/routes/authRoutes.js`)

```javascript
router.post('/register', register);          // Public — anyone can register
router.post('/login', login);                // Public — anyone can log in
router.get('/me', protect, getMe);           // Protected — needs valid JWT
```

The `protect` middleware runs BEFORE `getMe` — if the token is invalid, `getMe` never executes.

#### 6. Frontend Integration (`js/login.js`)

Replaced the Phase 1 `setTimeout` simulation with real API calls using `fetch()`:

```javascript
// Registration — sends form data to the server
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName, dob, email, mobileNumber, gender, category, password
  })
})
  .then(function (res) { return res.json(); })
  .then(function (data) {
    if (data.success) {
      // Show the real Application Number from MongoDB
      alert('Your Application Number is: ' + data.data.applicationNumber);
    }
  });

// Login — sends credentials and stores the JWT token
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ applicationNumber, password })
})
  .then(function (res) { return res.json(); })
  .then(function (data) {
    if (data.success) {
      localStorage.setItem('token', data.token);           // store JWT
      localStorage.setItem('keam_candidate', JSON.stringify(data.candidate)); // store profile
      window.location.href = 'dashboard.html';             // redirect
    }
  });
```

---

### API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register new candidate & generate Application Number | Public |
| `POST` | `/api/auth/login` | Authenticate candidate & return JWT token | Public |
| `GET` | `/api/auth/me` | Get current logged-in candidate profile | Protected (JWT) |

---

### Testing

```bash
# 1. Test Registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","dob":"2005-04-12","email":"john@example.com","mobileNumber":"9876543210","gender":"Male","category":"General","password":"Password@123"}'

# 2. Test Login (use the applicationNumber from registration response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"applicationNumber":"26XXXXX","password":"Password@123"}'

# 3. Test Protected Route (use the token from login response)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Git Workflow for Pull Requests
1. Branch from `rasal` or `main`:
   ```bash
   git checkout -b feature/safdil-auth-api
   ```
2. Commit your changes:
   ```bash
   git add backend/models/Candidate.js backend/controllers/authController.js backend/routes/authRoutes.js backend/middleware/auth.js js/login.js
   git commit -m "feat(auth): candidate registration, bcrypt hashing, JWT login, auth middleware, and client API integration"
   ```
3. Submit a Pull Request to Team Leader Rasal for code review.
