# Ayman Riaz - README

## Profile
- **Name:** Ayman Riaz
- **Roll Number:** B24CSA17
- **Role:** Shared Components (Navbar & Footer)

## My Work
I built the reusable Navbar (`navbar.js`) and Footer (`footer.js`) components that get injected into every page via JavaScript. This avoids duplicating HTML across files. I also styled the global form inputs and buttons in `components.css`.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| IIFE | Wraps navbar logic to avoid polluting global scope |
| `getElementById` | Finds the `#navbar` container element |
| `window.location.pathname` | Detects if user is in root or subfolder |
| `innerHTML` | Injects the full navbar HTML into the container |
| `classList.toggle` | Shows/hides mobile menu on hamburger click |
| `setAttribute` | Updates `aria-expanded` for accessibility |
| `contains()` | Detects clicks outside navbar to auto-close menu |

## DOM Flow

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

## File Dependencies

```
style.css --> components.css --> All .html pages
navbar.js ----------------------^
footer.js ----------------------|
```

## Phase 2 - Backend & MongoDB Integration

### Role: Shared Middleware, Error Handling & Frontend API Client

- **Assigned Files**:
  - `middleware/auth.js` (JWT authentication guard)
  - `middleware/errorMiddleware.js` (Centralized 404 & 500 error handlers)
  - `js/api.js` (Shared frontend HTTP client wrapper)
- **Key Responsibilities**:
  1. Build the JWT authentication middleware (`middleware/auth.js`) that verifies tokens from the `Authorization: Bearer <token>` header and attaches the candidate object to `req.user`.
  2. Implement global error handling middleware (`middleware/errorMiddleware.js`) providing standardized JSON error structures `{ success: false, message: ... }` for 404 and 500 status codes.
  3. Create a reusable frontend API helper (`js/api.js`) featuring `API.get()`, `API.post()`, `API.put()`, and automatic injection of the stored JWT token.
  4. Implement automatic token expiration handling in `js/api.js` (redirecting candidates to `login.html` upon 401 Unauthorized responses).
  5. Coordinate with team members to integrate `js/api.js` into their frontend scripts for consistent API communication.

