# KEAM Portal Clone - MERN Stack

## Description

This project is an academic clone of the KEAM (Kerala Engineering, Architecture and Medicine) official portal, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is developed as part of the Project Oriented Course (AWT) and aims to recreate the core functionalities of an online entrance exam admission system - including candidate registration, application submission, document upload, an admin panel, and application status tracking.

This project is developed purely for academic and educational purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations. Reference: [cee.kerala.gov.in](https://cee.kerala.gov.in/cee/index.php)

## Status

**Phase 1 (Active):** Building the frontend UI using plain HTML, CSS, and JavaScript. The following pages are complete:
- ✅ Landing / Home page (Rasal Musthafa) - government header, course category strip, scrolling notifications, candidate portal cards, and latest notifications list
- ✅ Student Dashboard page (Faheem Shan) - profile card, application progress timeline, quick actions, important dates, and recent notifications
- ✅ Application Form page (Faheem Shan) - 6-step multi-step form with personal, academic, communication, document upload, payment, and review sections
- ✅ Shared components: Navbar & Footer, Button system, Input system (Ayman Riaz) - responsive navbar with mobile hamburger menu, multi-column footer, reusable `.btn` and `.form-*` CSS classes
- ✅ Login & Registration pages (Safdil Arafath) - login form with captcha & password toggle, registration with strength meter & full validation
- 🔧 Admin Panel & Status Tracking pages (Shan M A) - scaffolded, (in progress)

**Phase 2 (Planned):** Migrate the frontend to React (Vite) and integrate with the Express/MongoDB backend for a full MERN stack application.

## Tech Stack

- **Frontend:** React.js (Vite), HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Version Control:** Git and GitHub
- **Tools:** VS Code, Postman

## Project Structure

```text
keam-clone/
├── frontend/
│   ├── phase1/                 # Phase 1 - Plain HTML/CSS/JS
│   │   ├── index.html          # Landing/Home page (Rasal)
│   │   ├── pages/
│   │   │   ├── login.html      # Safdil — login form, captcha, password toggle
│   │   │   ├── register.html   # Safdil — registration form, strength meter
│   │   │   ├── dashboard.html  # Faheem Shan 
│   │   │   ├── application.html# Faheem Shan 
│   │   │   ├── admin.html      # Shan M A
│   │   │   └── status.html     # Shan M A
│   │   ├── assets/
│   │   │   └── logo.png        # CEE Kerala emblem
│   │   ├── components/         # Shared navbar/footer (Ayman Riaz)
│   │   │   ├── README.html
│   │   │   ├── navbar.js       # JS injection for shared navbar
│   │   │   └── footer.js       # JS injection for shared footer
│   │   ├── css/
│   │   │   ├── style.css       # Shared base styles & design tokens
│   │   │   ├── components.css  # Navbar, footer, button & input styles (Ayman Riaz)
│   │   │   ├── home.css        # Landing page styles
│   │   │   ├── dashboard.css   # Dashboard page styles (Faheem Shan)
│   │   │   ├── application.css # Application form styles (Faheem Shan)
│   │   │   └── login.css       # Login & Register page styles (Safdil)
│   │   └── js/
│   │       ├── main.js         # Shared JS utilities
│   │       ├── home.js         # Landing page JS
│   │       ├── dashboard.js    # Dashboard page JS (Faheem Shan)
│   │       ├── application.js  # Application form JS (Faheem Shan)
│   │       └── login.js        # Login & Register JS (Safdil)
│   ├── src/                    # Phase 2 - React (Vite) scaffold
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/                    # Express backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Development Phases

### Phase 1 - Static Frontend (Current)
Plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no libraries, no build tools.
- **Pages** (`phase1/pages/`): Individual HTML pages for each feature (login, dashboard, admin, etc.).
  - `index.html` (root) - *Rasal Musthafa*: Complete landing and home page featuring a government header, course category strip, scrolling notifications ticker, detailed candidate portal cards grouped by admission type, and a latest notifications list.
  - `dashboard.html` - *Faheem Shan*: Full student dashboard with profile card, application progress timeline (7-step), quick action cards (admit card, rank card, allotment, documents, option registration, fee payment), important dates calendar, and recent notifications feed.
  - `application.html` - *Faheem Shan*: Complete 6-step multi-step application form with step progress indicator, personal details, academic details, communication details, document upload (drag & drop with preview), fee payment (net banking / debit / credit / UPI), and review & submit sections.
  - `login.html` - *Safdil Arafath*: Candidate login page with Application Number field, Password field with show/hide toggle, client-generated CAPTCHA with noise-line overlay and refresh button, Remember Me checkbox, Forgot Password link, and form-level validation with styled error messages. Simulates login flow with loading state and redirect to dashboard.
  - `register.html` - *Safdil Arafath*: New candidate registration form with Full Name, Date of Birth, Email, Mobile Number (+91 addon), Gender and Category dropdowns, Password with real-time 4-bar strength meter (Weak/Fair/Good/Strong), Confirm Password match check, CAPTCHA verification, Terms & Conditions checkbox, and age validation (15–30). Generates a dummy application number on successful submission.
- **Components** (`phase1/components/`): Shared navbar and footer JS-based includes that inject HTML into `#navbar` and `#footer` on every page via `DOMContentLoaded`. Auto-detects root vs. subpage paths.
- **Shared Styles** (`phase1/css/style.css`): CSS reset, design tokens (colors, typography, spacing), and utility classes.
- **Component Styles** (`phase1/css/components.css`): Navbar, footer, button system, and form input system styles. See [Shared CSS Classes](#shared-css-classes-ayman-riaz) below.
- **Auth Styles** (`phase1/css/login.css`): Login and registration page-specific styles including auth card layout (Flexbox centering), card header with navy gradient and gold accent, CAPTCHA display widget with CSS noise lines, password strength meter bars, alert/notification boxes, responsive breakpoints, and two-column registration grid.
- **Page Styles**: Each page has its own CSS file (`home.css`, `dashboard.css`, `application.css`, `login.css`) for page-specific rules.
- **Page Scripts**: Each page has its own JS file (`home.js`, `dashboard.js`, `application.js`, `login.js`) for page-specific interactivity.
- Open `frontend/phase1/index.html` directly in a browser to preview.

#### Shared CSS Classes (Ayman Riaz)

The `components.css` file provides reusable CSS classes for the entire team:

**Buttons** - use the `.btn` base class with variant modifiers:
| Class | Description |
|-------|-------------|
| `.btn--primary` | Navy background, white text |
| `.btn--secondary` | Light background, navy text |
| `.btn--gold` | Gold background, dark text |
| `.btn--outline` | Transparent with navy border |
| `.btn--outline-white` | Transparent with white border (for dark backgrounds) |
| `.btn--danger` | Red background for destructive actions |
| `.btn--success` | Green background for confirmations |
| `.btn--sm` / `.btn--lg` | Size modifiers |
| `.btn--block` | Full-width button |

**Form Inputs** - consistent form styling:
| Class | Description |
|-------|-------------|
| `.form-group` | Wrapper with bottom margin |
| `.form-label` | Bold label, add `.form-label--required` for asterisk |
| `.form-input` | Text input with focus ring |
| `.form-select` | Dropdown select with custom arrow |
| `.form-textarea` | Multi-line text area |
| `.form-hint` | Helper text below input |
| `.form-error` / `.form-success` | Validation messages |
| `--error` / `--success` suffix | Validation border colors (e.g. `.form-input--error`) |
| `.form-check` | Checkbox/radio wrapper |

### Phase 2 - React + MERN Integration (Planned)
- Migrate the static pages into React components using the existing Vite scaffold (`frontend/src/`).
- Connect to the Express/MongoDB backend via REST APIs.
- Implement JWT authentication, form submissions, and dynamic data rendering.

## Getting Started

### Prerequisites

- A web browser (for Phase 1)
- Node.js v18+ and npm (for backend and Phase 2)
- MongoDB (local instance or Atlas connection string)

### Phase 1 - View the Static Frontend

No installation needed. Open the landing page directly:
```
frontend/phase1/index.html
```
Or use a local server (e.g., VS Code Live Server extension) for the best experience.

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ras-al/keam-clone.git
   cd keam-clone
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file inside `backend/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend
   ```bash
   npm run dev
   ```

   The backend API will run on `http://localhost:5000`.

### Phase 2 - React Frontend (when ready)

```bash
cd frontend
npm install
npm run dev
```

The React dev server will run on `http://localhost:5173`.

## Team

| Name | Roll Number | Role | Phase 1 Status |
|------|-------------|------|----------------|
| Rasal Musthafa | B24CSA49 | Project setup, Landing page, Home page | ✅ Complete |
| Ayman Riaz | B24CSA17 | Shared components (Navbar, Footer, Button design, Input) | ✅ Complete |
| Faheem Shan | B24CSA20 | Student dashboard page, Application form UI | ✅ Complete |
| Safdil Arafath | B24CSA54 | Login & Registration page, Form validation UI | ✅ Complete |
| Shan M A | B24CSA59 | Admin Panel UI, Application status tracking page | 🔧 In Progress |

## Course Details

- **Course:** Advanced Web Technologies (AWT) - Project Oriented Course
- **Faculty Guide:** Dr. Reshma Sheikh
- **Department:** Computer Science and Engineering
- **College:** TKM College of Engineering, Kollam
- **Academic Year:** 2026 - 2027

## License

This project is intended for academic use only.
