# Ayman Riaz - README

## Profile
- **Name:** Ayman Riaz
- **Roll Number:** B24CSA17
- **Role:** Shared Components (Navbar & Footer) | Backend Middleware & Shared API Client

---

## Phase 1 - Shared Components & CSS Design System (✅ Completed)

### My Work
I built the reusable Navbar (`components/navbar.js`) and Footer (`components/footer.js`) components that get injected into every page via JavaScript. This avoids duplicating HTML across files. I also styled the global form inputs and buttons in `css/components.css`.

### JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| IIFE | Wraps navbar logic to avoid polluting global scope |
| `getElementById` | Finds the `#navbar` container element |
| `window.location.pathname` | Detects if user is in root or subfolder |
| `innerHTML` | Injects the full navbar HTML into the container |
| `classList.toggle` | Shows/hides mobile menu on hamburger click |
| `setAttribute` | Updates `aria-expanded` for accessibility |
| `contains()` | Detects clicks outside navbar to auto-close menu |

### DOM Flow

```
Script loads (IIFE runs)
    |
    v
Find #navbar element
    |
    +-- Found? --+
    |             |
   NO            YES
    |             |
  stop         Check URL path
               |
               +-- In subfolder? --+
               |                   |
              YES                  NO
               |                   |
         prefix = '../'     prefix = 'pages/'
               |                   |
               +-------------------+
               |
               v
         Build HTML string with links
               |
               v
         navbar.innerHTML = HTML
               |
               v
         Attach hamburger click listener
               |
               v
           Done
```

### File Dependencies

```
style.css --> components.css --> All .html pages
navbar.js ----------------------^
footer.js ----------------------|
```

---

## Phase 2 - Backend Middleware & Frontend API Client

### Role: Shared Middleware, Error Handling & Frontend API Client

### Assigned Files
- `backend/middleware/auth.js` (JWT authentication guard)
- `backend/middleware/errorMiddleware.js` (Centralized 404 & 500 error handlers)
- `js/api.js` (Shared frontend HTTP client wrapper)

---

### Step-by-Step Implementation Instructions

#### 1. Setup Backend Environment
Ensure the backend is running with dependencies installed:
```bash
cd backend
npm install
npm run dev
```

#### 2. Implement `backend/middleware/auth.js`
Create the authentication middleware that verifies the candidate's JSON Web Token (JWT) sent in the HTTP `Authorization` header:
- **Location**: `backend/middleware/auth.js`
- **Logic**:
  1. Read the `req.headers.authorization` header.
  2. Check if it starts with `Bearer `.
  3. Extract the token using `req.headers.authorization.split(' ')[1]`.
  4. Verify the token using `jwt.verify(token, process.env.JWT_SECRET)`.
  5. Find the candidate in the database (or attach the decoded payload) to `req.user`.
  6. Call `next()` to proceed to the controller.
  7. If token is missing, invalid, or expired, return `res.status(401).json({ success: false, message: 'Not authorized, token missing or invalid' })`.

**Sample Code Structure**:
```javascript
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Contains candidate id / appNo
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
```

#### 3. Refine `backend/middleware/errorMiddleware.js`
Rasal has provided the initial baseline in `backend/middleware/errorMiddleware.js`. Verify and enhance it:
- Handle `CastError` (invalid MongoDB ObjectIds).
- Handle Mongoose validation errors (extract error message fields).
- Ensure standardized response format:
```json
{
  "success": false,
  "message": "Error description here",
  "stack": null
}
```

#### 4. Create `js/api.js` (Frontend API Helper)
Create `js/api.js` to provide teammates with a clean, centralized HTTP client:
- **Location**: `js/api.js`
- **Methods**:
  - `API.get(url)`: Performs `fetch` with stored JWT from `localStorage.getItem('token')`.
  - `API.post(url, data)`: Sends JSON body with headers.
  - `API.upload(url, formData)`: Sends `FormData` for multi-part file uploads (without manual `Content-Type` header so browser sets multipart boundary).
  - `API.put(url, data)`: Sends JSON update requests.
- **Auto-Logout & Redirect**:
  - If any response status is `401 Unauthorized`, remove the invalid token from `localStorage` and redirect to `login.html`:
  ```javascript
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('candidate');
    window.location.href = isSubpage ? 'login.html' : 'pages/login.html';
  }
  ```

#### 5. Include `js/api.js` in HTML Pages
Add `<script src="js/api.js"></script>` (or `../js/api.js` for subpages) right before page-specific scripts in:
- `pages/login.html`
- `pages/register.html`
- `pages/dashboard.html`
- `pages/application.html`
- `pages/admin.html`
- `pages/status.html`

---

## Testing Your Implementation

```bash
# 1. Test accessing protected endpoint without token (should return 401)
curl http://localhost:5000/api/application/my-application

# 2. Test accessing protected endpoint with valid token (should succeed)
curl -H "Authorization: Bearer <VALID_JWT_TOKEN>" http://localhost:5000/api/application/my-application

# 3. Test non-existent route for 404 handler
curl http://localhost:5000/api/non-existent-route
```

---

## Git Workflow for Pull Requests
1. Branch from `rasal` or `main`:
   ```bash
   git checkout -b feature/ayman-middleware
   ```
2. Commit your changes:
   ```bash
   git add backend/middleware/auth.js js/api.js
   git commit -m "feat(middleware): add JWT auth guard and shared frontend API client"
   ```
3. Push and create a Pull Request to Team Leader Rasal for code review.
