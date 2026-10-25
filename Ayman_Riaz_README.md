# Ayman Riaz - README

## Profile
- **Name:** Ayman Riaz
- **Roll Number:** B24CSA17
- **Role:** Shared Components (Navbar & Footer) | Backend Middleware & Shared API Client | Shared UI Library & Global AuthContext

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

## Phase 2 - Backend Middleware & Frontend API Client (✅ Completed)

### My Work
I created the JWT authentication middleware (`backend/middleware/auth.js`) that protects private API routes, enhanced the centralized error handler (`backend/middleware/errorMiddleware.js`) with Mongoose-specific error handling, and built a shared frontend HTTP client (`js/api.js`) that all teammates use for making API calls. I also added the `api.js` script tag to all 6 HTML pages.

### Implemented Files
- `backend/middleware/auth.js` — JWT authentication guard
- `backend/middleware/errorMiddleware.js` — Enhanced 404, CastError, ValidationError & 500 handlers
- `js/api.js` — Shared frontend HTTP client with auto-logout on 401

---

### JS & Node.js Concepts Used

| Concept | Where I Used It | What It Does |
|---------|-----------------|--------------|
| `require()` | `auth.js` line 1 | Imports the `jsonwebtoken` npm package into the file |
| `req.headers.authorization` | `auth.js` | Reads the Authorization header sent by the frontend |
| `.startsWith('Bearer')` | `auth.js` | Checks if the header follows the standard `Bearer <token>` format |
| `.split(' ')[1]` | `auth.js` | Extracts just the token string after `Bearer ` |
| `jwt.verify()` | `auth.js` | Decodes and validates the token using the secret key from `.env` |
| `req.user = decoded` | `auth.js` | Attaches the candidate's info to the request so controllers can use it |
| `next()` | `auth.js` | Passes control to the next middleware or route controller |
| `res.status(401).json()` | `auth.js` | Sends a 401 Unauthorized JSON response if token is bad |
| `err.name === 'CastError'` | `errorMiddleware.js` | Detects when an invalid MongoDB ObjectId is passed in the URL |
| `err.name === 'ValidationError'` | `errorMiddleware.js` | Detects when Mongoose validation fails (missing/wrong fields) |
| `Object.values().map()` | `errorMiddleware.js` | Extracts individual field error messages from the validation error |
| `process.env.NODE_ENV` | `errorMiddleware.js` | Checks if we're in development to show or hide the stack trace |
| IIFE `(() => { ... })()` | `api.js` | Wraps the entire API client to avoid polluting the global scope |
| `fetch()` | `api.js` | Browser's built-in function to make HTTP requests to the backend |
| `async / await` | `api.js` | Makes asynchronous fetch calls readable (wait for response before continuing) |
| `JSON.stringify()` | `api.js` | Converts JavaScript objects to JSON strings for the request body |
| `response.json()` | `api.js` | Parses the JSON response body from the server |
| `localStorage.getItem()` | `api.js` | Retrieves the saved JWT token from browser storage |
| `localStorage.removeItem()` | `api.js` | Clears stored token and candidate data on 401 (auto-logout) |
| `window.location.href` | `api.js` | Redirects the user to the login page on session expiry |
| `window.location.pathname` | `api.js` | Detects if user is in `/pages/` subfolder for correct redirect path |
| `try...catch` | `auth.js`, `api.js` | Catches errors from token verification and network failures |
| `module.exports` | `auth.js`, `errorMiddleware.js` | Exports functions so other files can `require()` them |

---

### Auth Middleware Flow (`backend/middleware/auth.js`)

```
HTTP Request arrives at protected route
    |
    v
Read req.headers.authorization
    |
    +-- Has "Bearer" prefix? --+
    |                          |
   NO                         YES
    |                          |
    v                          v
 Return 401              Extract token after "Bearer "
 "no token"                    |
                               v
                        jwt.verify(token, secret)
                               |
                        +-- Valid? --+
                        |            |
                       YES           NO
                        |            |
                        v            v
                  req.user =     Return 401
                  decoded        "invalid token"
                        |
                        v
                     next()
                  (proceed to controller)
```

### Error Middleware Flow (`backend/middleware/errorMiddleware.js`)

```
Error thrown in a controller
    |
    v
errorHandler(err, req, res, next)
    |
    +-- err.name === 'CastError'? ---> 400 "Invalid ID format"
    |
    +-- err.name === 'ValidationError'? ---> 400 + joined field messages
    |
    +-- Generic error? ---> 500 "Server error"
    |
    v
Send JSON: { success: false, message, stack (dev only) }
```

### Frontend API Client Flow (`js/api.js`)

```
Teammate calls API.post('/api/auth/login', { email, password })
    |
    v
getToken() from localStorage
    |
    v
Build fetch() request with:
  - Method: POST
  - Headers: Content-Type + Authorization: Bearer <token>
  - Body: JSON.stringify(data)
    |
    v
Send request to server
    |
    v
handleResponse(response)
    |
    +-- Status 401? --+
    |                  |
   NO                 YES
    |                  |
    v                  v
Parse JSON        Clear localStorage
Return data       Redirect to login.html
```

---

### File Dependencies

```
backend/middleware/auth.js -----> used by route files (applicationRoutes, adminRoutes)
                                  to protect private endpoints

backend/middleware/errorMiddleware.js -----> used by server.js
                                             catches all 404 and 500 errors

js/api.js -----> loaded in all 6 HTML pages (login, register, dashboard,
                 application, admin, status) before page-specific scripts
                 so teammates can call API.get(), API.post(), etc.
```

### Script Loading Order (in each HTML page)

```
<script src="../js/main.js">         ← Shared utilities (qs, qsa, dates)
<script src="../components/navbar.js"> ← Navbar injection
<script src="../components/footer.js"> ← Footer injection
<script src="../js/api.js">            ← My shared API client (NEW)
<script src="../js/<page>.js">         ← Page-specific logic
```

---

## How Teammates Use My Code

### Using `auth.js` (Backend - in route files)
```javascript
const { protect } = require('../middleware/auth');

// Any route that needs login protection:
router.get('/my-application', protect, getMyApplication);
// protect checks the token first, then getMyApplication runs
// The controller can access req.user.id to identify the candidate
```

### Using `api.js` (Frontend - in page scripts)
```javascript
// GET request (fetch data)
const data = await API.get('/api/application/my-application');

// POST request (send data)
const result = await API.post('/api/auth/login', { email, password });

// PUT request (update data)
const updated = await API.put('/api/admin/applications/123/status', { status: 'approved' });

// File upload
const formData = new FormData();
formData.append('photo', fileInput.files[0]);
const upload = await API.upload('/api/application/submit', formData);
```

---

## Testing

```bash
# 1. Test protected endpoint without token (should return 401)
curl http://localhost:5000/api/application/my-application

# 2. Test protected endpoint with valid token (should return data)
curl -H "Authorization: Bearer <VALID_JWT_TOKEN>" http://localhost:5000/api/application/my-application

# 3. Test non-existent route (should return 404 from notFound handler)
curl http://localhost:5000/api/non-existent-route
```

---

## Git Workflow
```bash
git checkout -b feature/ayman-middleware
git add backend/middleware/auth.js backend/middleware/errorMiddleware.js js/api.js
git commit -m "feat(middleware): add JWT auth guard, enhanced error handling and shared frontend API client"
git push origin feature/ayman-middleware
# Then create Pull Request to Team Leader Rasal for code review
```

---

## Phase 3 - Shared UI Design System & Global Authentication Context (🚀 Next Phase)

### Role: Shared Reusable UI Components & Global Authentication Context (`AuthContext`)

In Phase 3, my responsibility is to build the central UI component foundation and provide a seamless authentication context so the entire team can build their pages with consistent design and zero prop-drilling for authentication.

### My Phase 3 Assigned Components & Files

| Component / File | Purpose & Responsibilities | Study Reference |
|---|---|---|
| `frontend/src/context/AuthContext.jsx` | Authentication Context created with `createContext()`. Provides `user`, `token`, `isAuthenticated`, `login(token, user)`, and `logout()` to all components via `useContext(AuthContext)`. | Slides 73–81 |
| `frontend/src/components/common/Navbar.jsx` | Shared top navigation with logo, active link indicators, responsive mobile hamburger toggle, and conditional display of candidate name or Login/Register links. | Slides 14, 56–59 |
| `frontend/src/components/common/Footer.jsx` | Standardized government footer with important links, helpline numbers, and copyright. | Slides 10–14 |
| `frontend/src/components/common/Button.jsx` | Reusable button receiving props (`text`, `onClick`, `variant`, `disabled`, `type`) with clean styling. | Slides 50–51 |
| `frontend/src/components/common/InputField.jsx` | Standardized controlled text/number/date input with label, error display, and focus styles. | Slides 86–88 |
| `frontend/src/components/common/SelectField.jsx` | Standardized dropdown selector with label and error messages. | Slides 86–88 |
| `frontend/src/components/common/ProtectedRoute.jsx` | Route guard component that checks `isAuthenticated` from `AuthContext` and redirects to `/login` if not logged in. | Slides 73, 85 |

---

### React Concepts Used (from Study Material)

1. **Context API (`createContext`, `Provider`, `useContext`) (Slides 73–81)**:
   - Creating a centralized container for authentication state without prop-drilling through layers of components.
   - Using `useContext(AuthContext)` in any child component to check if a user is logged in or to trigger logout.
2. **Reusable Component Design with Props (Slides 50–51)**:
   - Designing modular components that accept configurable properties:
     `function Button({ text, onClick, color, variant }) { ... }`
3. **CSS Modules for Scoped Styling (Slides 27–29)**:
   - Using scoped stylesheets (`Navbar.module.css`, `Button.module.css`) to ensure styles do not clash across different teammates' pages.
4. **Conditional Rendering (Slides 56–64)**:
   - Displaying "Candidate Portal (Faheem)" vs "Login" buttons based on `isAuthenticated` state using the ternary operator.
5. **State Management (`useState`) (Slides 31–35)**:
   - Managing hamburger menu open/close boolean state: `const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);`

---

### Educational Code Style Reference

#### 1. Global AuthContext (`AuthContext.jsx`) - Slides 74–79 Pattern:
```jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('keam_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('keam_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('keam_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### 2. Reusable Button Component (`Button.jsx`) - Slides 50–51 Pattern:
```jsx
import React from 'react';

function Button({ text, onClick, variant = 'primary', type = 'button', disabled = false }) {
  // Configurable styling classes based on variant prop
  const className = `btn btn--${variant}`;

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
```

---

### How Teammates Will Consume My Code in Phase 3

#### 1. Consuming Authentication in Any Component:
```jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout ({user?.fullName})</button>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

#### 2. Protecting Candidate or Admin Routes:
```jsx
// In App.js
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

