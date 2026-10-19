# KEAM Portal Clone - MERN Stack

## Description

This project is an academic clone of the KEAM (Kerala Engineering, Architecture and Medicine) official portal, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is developed as part of the Project Oriented Course (AWT) and aims to recreate the core functionalities of an online entrance exam admission system - including candidate registration, application submission, document upload, an admin panel, and application status tracking.

This project is developed purely for academic and educational purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations. Reference: [cee.kerala.gov.in](https://cee.kerala.gov.in/cee/index.php)

---

## Project Status

### **Phase 1: Frontend UI & Client Interactions (✅ Complete)**
The static frontend is fully built using plain HTML5, CSS3, and modern JavaScript (ES6+):
- ✅ **Landing / Home page** (*Rasal Musthafa*) - Government header, course category strip, scrolling ticker, portal cards, and latest notifications.
- ✅ **Student Dashboard page** (*Faheem Shan*) - Profile card, application progress timeline (7-step), quick actions, calendar, and notices.
- ✅ **Application Form page** (*Faheem Shan*) - 6-step multi-step form with personal, academic, communication, document upload, and payment sections.
- ✅ **Shared components** (*Ayman Riaz*) - Responsive navbar with mobile hamburger menu, multi-column footer, reusable `.btn` and `.form-*` CSS classes.
- ✅ **Login & Registration pages** (*Safdil Arafath*) - Login form with CAPTCHA & password toggle, registration with 4-bar strength meter & age validation.
- ✅ **Admin Panel & Status Tracking pages** (*Shan M A*) - Searchable datatable for applications, status updates, and milestone tracking.

### **Phase 2: Express Server, MongoDB Atlas & REST APIs (✅ Complete)**
- ✅ **Backend Server Architecture & MongoDB Atlas Setup** (*Rasal Musthafa*) - Express server with CORS, JSON body parsers, static frontend serving, Mongoose database connection, and live `/api/notifications` & `/api/stats` endpoints connected with `index.html` and `js/home.js`.
- ✅ **Shared Auth & Error Middleware** (*Ayman Riaz*) - JWT authentication guard (`backend/middleware/auth.js`) and frontend API client (`js/api.js`).
- ✅ **Application Form & Document Upload API** (*Faheem Shan*) - `Application` schema, Multer storage, and submission endpoints.
- ✅ **Authentication & Security API** (*Safdil Arafath*) - `Candidate` schema, Bcrypt password hashing, JWT generation, and login integration.
- ✅ **Admin Management & Status Tracking API** (*Shan M A*) - `Admin` schema, application review endpoints, and public status tracking.

### **Phase 3: React Frontend Migration & Single Page Application (SPA) (🚀 Next Phase - Planned & Work Split Defined)**
The application will transition from static multi-page HTML into a modern, component-driven React Single Page Application (SPA) utilizing:
- 🧩 **Pure Functional Components & React Hooks** (`useState`, `useEffect`, `useContext`, `useRef`).
- 🛣️ **Client-Side Routing** with `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`).
- 🌐 **Global Authentication State** via React Context API (`AuthContext`, `createContext`, `useContext`) to eliminate prop drilling.
- 📋 **Controlled Components** for all dynamic input forms & **Uncontrolled Components** with `useRef` for document/file uploads.
- 🎨 **Component-Scoped Styling** using CSS Modules & External CSS according to course study guidelines.

---

## Tech Stack

- **Frontend (Phase 3 - Upcoming):** React.js (v18+), React Router DOM (v6+), JSX, React Hooks, CSS Modules & External CSS
- **Frontend (Phase 1 - Baseline):** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Backend:** Node.js, Express.js, Mongoose (MongoDB Atlas Cloud ODM)
- **Security & Utilities:** JSON Web Tokens (JWT), Bcrypt.js, CORS, Dotenv, Multer
- **Design:** Custom CSS Design System, Responsive Flexbox & Grid, CSS Modules
- **Version Control:** Git & GitHub

---

## Project Structure

```text
keam-clone/
├── index.html                  # Landing/Home page (Rasal Musthafa)
├── pages/
│   ├── login.html              # Candidate login page (Safdil Arafath)
│   ├── register.html           # Candidate registration page (Safdil Arafath)
│   ├── dashboard.html          # Student dashboard page (Faheem Shan)
│   ├── application.html        # Multi-step application form (Faheem Shan)
│   ├── admin.html              # Admin management dashboard (Shan M A)
│   └── status.html             # Application status tracking (Shan M A)
├── assets/
│   └── logo.png                # Official CEE Kerala emblem
├── components/                 # Shared navbar & footer components (Ayman Riaz)
│   ├── README.html
│   ├── navbar.js               # Auto-detecting navbar injection
│   └── footer.js               # Auto-detecting footer injection
├── css/
│   ├── style.css               # Shared CSS reset & design tokens
│   ├── components.css          # Navbar, footer, buttons & inputs (Ayman Riaz)
│   ├── home.css                # Landing page styles (Rasal Musthafa)
│   ├── dashboard.css           # Dashboard styles (Faheem Shan)
│   ├── application.css         # Multi-step form styles (Faheem Shan)
│   ├── login.css               # Auth styles (Safdil Arafath)
│   ├── admin.css               # Admin table & badge styles (Shan M A)
│   └── status.css              # Status tracker styles (Shan M A)
├── js/
│   ├── main.js                 # Shared JS helper utilities (qs, qsa, dates)
│   ├── home.js                 # Landing page JS & live notifications fetch
│   ├── dashboard.js            # Dashboard JS (Faheem Shan)
│   ├── application.js          # Application form JS (Faheem Shan)
│   ├── login.js                # Login & register JS (Safdil Arafath)
│   ├── admin.js                # Admin table JS (Shan M A)
│   └── status.js               # Status tracking JS (Shan M A)
├── backend/                    # Node.js & Express REST API Server
│   ├── server.js               # Express entry point & static file server
│   ├── package.json            # Node.js dependencies & scripts
│   ├── .env                    # Environment variables (MongoDB URI, JWT secret)
│   ├── .env.example            # Environment template
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection with Mongoose
│   ├── controllers/
│   │   ├── notificationController.js  # Notifications & public stats logic
│   │   ├── authController.js          # Registration & login logic (Safdil)
│   │   ├── applicationController.js   # Application submission logic (Faheem)
│   │   └── adminController.js         # Admin & status tracking logic (Shan)
│   ├── models/
│   │   ├── Notification.js     # Notification schema (Rasal)
│   │   ├── Candidate.js        # Candidate account schema (Safdil)
│   │   ├── Application.js      # Multi-step application schema (Faheem)
│   │   └── Admin.js            # Admin account schema (Shan)
│   ├── routes/
│   │   ├── notificationRoutes.js      # Announcements & stats routes
│   │   ├── authRoutes.js              # Authentication routes (Safdil)
│   │   ├── applicationRoutes.js       # Application routes (Faheem)
│   │   └── adminRoutes.js             # Admin routes (Shan)
│   └── middleware/
│       ├── auth.js             # JWT authentication guard (Ayman)
│       ├── errorMiddleware.js  # Standardized 404 & 500 error handlers
│       └── upload.js           # Multer file upload configuration (Faheem)
├── frontend/                   # Phase 3: React Single Page Application (Planned)
│   ├── package.json            # React dependencies (react, react-dom, react-router-dom)
│   ├── public/
│   │   ├── index.html          # HTML template with <div id="root"></div>
│   │   └── assets/             # Static portal logos & icons
│   └── src/
│       ├── index.js            # React root & BrowserRouter mount (Rasal)
│       ├── App.js              # Central routes & page orchestration (Rasal)
│       ├── index.css           # Global typography & layout tokens
│       ├── context/
│       │   └── AuthContext.jsx # Global Auth state (token, user, login, logout) (Ayman)
│       ├── components/
│       │   ├── common/         # Shared reusable UI elements (Ayman)
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Button.jsx
│       │   │   ├── InputField.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── home/           # Landing page components (Rasal)
│       │   │   ├── Header.jsx
│       │   │   ├── Ticker.jsx
│       │   │   ├── CourseTabs.jsx
│       │   │   ├── PortalCards.jsx
│       │   │   └── NotificationList.jsx
│       │   ├── auth/           # Login & registration components (Safdil)
│       │   │   ├── CaptchaBox.jsx
│       │   │   ├── PasswordStrength.jsx
│       │   │   └── SuccessModal.jsx
│       │   ├── dashboard/      # Student dashboard components (Faheem)
│       │   │   ├── ProfileCard.jsx
│       │   │   ├── ProgressTimeline.jsx
│       │   │   └── DigitalClock.jsx
│       │   ├── application/    # 6-step multi-step form wizard (Faheem)
│       │   │   ├── StepPersonal.jsx
│       │   │   ├── StepAcademic.jsx
│       │   │   ├── StepCommunication.jsx
│       │   │   ├── StepUploads.jsx
│       │   │   ├── StepPayment.jsx
│       │   │   └── StepReview.jsx
│       │   ├── admin/          # Admin management components (Shan)
│       │   │   ├── ApplicationTable.jsx
│       │   │   ├── SearchFilter.jsx
│       │   │   └── StatusModal.jsx
│       │   └── status/         # Public application tracking components (Shan)
│       │       ├── StatusForm.jsx
│       │       └── MilestoneTracker.jsx
│       └── pages/              # Routed page components
│           ├── HomePage.jsx        # Landing page (Rasal)
│           ├── LoginPage.jsx       # Login view (Safdil)
│           ├── RegisterPage.jsx    # Registration view (Safdil)
│           ├── DashboardPage.jsx   # Candidate dashboard view (Faheem)
│           ├── ApplicationPage.jsx # Multi-step application view (Faheem)
│           ├── AdminPage.jsx       # Admin portal view (Shan)
│           └── StatusPage.jsx      # Application status tracker view (Shan)
├── .gitignore
├── Rasal_Musthafa_README.md    # Rasal's individual contribution & phase guide
├── Ayman_Riaz_README.md        # Ayman's individual contribution & phase guide
├── Faheem_Shan_README.md       # Faheem's individual contribution & phase guide
├── Safdil_Arafath_README.md    # Safdil's individual contribution & phase guide
├── Shan_MA_README.md           # Shan's individual contribution & phase guide
└── README.md                   # Main Project Documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Running the Full-Stack Application

The Express backend serves the static frontend alongside the REST API, meaning you only need to run one server:

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify Environment Variables**:
   Check `backend/.env` (or copy from `.env.example`). It is pre-configured with the MongoDB Atlas cloud connection:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or for standard execution:
   npm start
   ```

5. **Access the Application**:
   - Web Application: [http://localhost:5000](http://localhost:5000)
   - API Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)
   - Notifications API: [http://localhost:5000/api/notifications](http://localhost:5000/api/notifications)
   - Statistics API: [http://localhost:5000/api/stats](http://localhost:5000/api/stats)

---

## API Reference

### Notifications & Statistics (Rasal Musthafa)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/health` | Service health status check | Public |
| `GET` | `/api/notifications` | Get announcements (filter by `?type=ticker` or `?type=list`) | Public |
| `GET` | `/api/stats` | Portal live statistics | Public |
| `POST` | `/api/notifications` | Create announcement | Public / Admin |

### Authentication (Safdil Arafath)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register new candidate & generate App No. | Public |
| `POST` | `/api/auth/login` | Authenticate candidate & return JWT | Public |

### Application Form & Uploads (Faheem Shan)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/application/submit` | Submit multi-step application & documents | Candidate (JWT) |
| `GET` | `/api/application/my-application` | Get current candidate application & timeline | Candidate (JWT) |

### Admin & Status Tracking (Shan M A)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/admin/applications` | List applications with filter & search | Admin |
| `PUT` | `/api/admin/applications/:id/status` | Approve, reject, or mark defective with remarks | Admin |
| `GET` | `/api/admin/status/:appNo` | Public application milestone tracker | Public |

---

## Shared CSS Classes (Ayman Riaz)

The `css/components.css` stylesheet provides unified UI components:

**Buttons** (`.btn`):
- `.btn--primary`: Navy blue background, white text.
- `.btn--secondary`: Light neutral background, navy text.
- `.btn--gold`: Gold background, dark text for primary calls to action.
- `.btn--outline`: Transparent with navy border.
- `.btn--outline-white`: Transparent with white border (for dark hero/headers).
- `.btn--danger`: Red accent for rejection or destructive actions.
- `.btn--success`: Green accent for approvals and confirmations.

**Form Inputs**:
- `.form-group`: Standard vertical spacing wrapper.
- `.form-label`: Semibold label (`.form-label--required` adds red asterisk).
- `.form-input`: Styled text input with focus ring.
- `.form-select`: Styled dropdown with chevron.
- `.form-error` / `.form-success`: Validation feedback indicators.

---

## Phase 3: React Frontend Architecture & Implementation Plan

The objective of Phase 3 is to migrate the KEAM Portal into an idiomatic, modular React Single Page Application (SPA). Following the curriculum study material, all code will prioritize **readability, modularity, and clean educational patterns** using modern React features.

### 📚 Study Material Concepts & Architectural Alignment

| React Concept | Where & How It Is Applied in KEAM Clone | Study Material Reference |
|---|---|---|
| **Functional Components & JSX** | All pages and UI elements are written as pure functional components returning declarative JSX with single parent root or React Fragments (`<>...</>`). | Slides 10–15 |
| **Component Scoped Styling** | Styles organized with CSS Modules (`*.module.css`) and external stylesheets (`import './App.css'`) instead of monolithic inline hacks. | Slides 26–29 |
| **`useState` (State Hook)** | Used for local memory: category filtering, active step wizard, search queries, password strength score, and CAPTCHA code. | Slides 31–35 |
| **`useEffect` (Side Effects Hook)** | Handles data fetching from Express REST API on initial render using empty dependency array `[]`. Timers (e.g. digital clock) implement cleanup functions (`return () => clearInterval(...)`) to prevent memory leaks. | Slides 36, 65–72 |
| **Props & Component Reusability** | Configurable UI elements (`Button`, `InputField`, `PortalCard`, `TableRow`) receive read-only props with clean parameter destructuring (`{ text, onClick, color }`). | Slides 42–51 |
| **Lifting State Up** | State shared across child components (e.g., active category affecting portal cards, multi-step application wizard steps) is held in the parent and manipulated via handler callback props. | Slides 52–55 |
| **Conditional Rendering** | Dynamic UI toggles using the 4 standard methods from syllabus: ternary operator (`? :`), logical AND (`&&`), `if/else`, and `switch(status)` (loading, success, error, defect alerts). | Slides 56–64 |
| **Context API (`useContext`)** | Global `AuthContext` provides authenticated candidate/admin state and `login`/`logout` actions across all route components without prop drilling. | Slides 73–81 |
| **Client-Side Routing (`react-router-dom`)** | SPA page transitions using `BrowserRouter`, `<Routes>`, `<Route>`, `<Link>`, and `useNavigate()` without page reload. | Slides 82–85 |
| **Controlled Components** | Form inputs (Login, Registration, Application details, Admin search) bind directly to state via `value` and `onChange`. | Slides 86–88 |
| **Uncontrolled Components (`useRef`)** | Document and certificate file uploads in the application form use `useRef(null)` to access DOM file objects for `FormData` submission. | Slides 89–90 |

---

## Phase 3: Team Work Split & Component Assignments

Each team member is assigned specific components, pages, and React features mirroring their previous domain ownership:

### 1. Rasal Musthafa (B24CSA49) - Team Lead
- **Domain:** React Application Architecture, Routing Setup & Home / Landing Page
- **Assigned Components & Views:**
  - `src/index.js` & `src/App.js`: React root mount and `BrowserRouter` setup with route declarations (`/`, `/login`, `/register`, `/dashboard`, `/application`, `/admin`, `/status`).
  - `pages/HomePage.jsx`: Landing page assembly combining banner, ticker, course tabs, cards, and notice lists.
  - `components/home/Header.jsx`: Official CEE Government emblem banner.
  - `components/home/Ticker.jsx`: Dynamic scrolling announcement ticker fetching live announcements via `useEffect` with `fetch('/api/notifications?type=ticker')`.
  - `components/home/CourseTabs.jsx`: Category selector (`Engineering`, `Medical`, `Architecture`, `Pharmacy`) using `useState` and lifting state up to parent.
  - `components/home/PortalCards.jsx` & `PortalCard.jsx`: Reusable card components dynamically filtered based on selected category prop.
  - `components/home/NotificationList.jsx`: Live notices feed fetched with `useEffect` with loading & empty states.
- **Key Concepts:** `react-router-dom`, `useState`, `useEffect` with `[]`, Props destructuring, Conditional rendering.

### 2. Ayman Riaz (B24CSA17)
- **Domain:** Reusable UI Component Library & Global Authentication Context
- **Assigned Components & Views:**
  - `context/AuthContext.jsx`: Global authentication store created with `createContext` and provided via `AuthProvider`. Manages `token`, `user`, `login(token, user)`, `logout()` with `useState` and `localStorage` sync.
  - `components/common/Navbar.jsx`: Shared navigation bar with mobile menu toggle (`useState`), dynamic navigation links, and login/logout state reflecting `AuthContext`.
  - `components/common/Footer.jsx`: Multi-column CEE Kerala footer and copyright notice.
  - `components/common/Button.jsx`: Reusable button supporting configurable variants (`primary`, `secondary`, `gold`, `danger`, `outline`) via props.
  - `components/common/InputField.jsx` & `SelectField.jsx`: Standardized reusable inputs with label, required asterisk, and error message props.
  - `components/common/ProtectedRoute.jsx`: High-order route wrapper using `useContext(AuthContext)` to guard candidate & admin routes.
- **Key Concepts:** Context API (`createContext`, `useContext`), Reusable props, CSS Modules scoped styling, Conditional rendering.

### 3. Faheem Shan (B24CSA20)
- **Domain:** Student Dashboard & 6-Step Multi-Step Application Form
- **Assigned Components & Views:**
  - `pages/DashboardPage.jsx`: Authenticated student dashboard fetching profile and pipeline progress from `/api/application/my-application`.
  - `components/dashboard/ProfileCard.jsx`: Candidate profile card showing application number, course, category, and photo.
  - `components/dashboard/ProgressTimeline.jsx`: 7-stage application pipeline visualizer (Registration -> Defect Verification).
  - `components/dashboard/DigitalClock.jsx`: Live digital clock updating every second using `useState` and `useEffect` with `setInterval` + cleanup `clearInterval`.
  - `pages/ApplicationPage.jsx`: Multi-step form container managing `currentStep` and `formData` state (Lifting State Up).
  - Multi-Step Subcomponents:
    - `StepPersonal.jsx`: Controlled fields for personal details, gender, DOB.
    - `StepAcademic.jsx`: Controlled fields for qualifying exam, marks, and percentage.
    - `StepCommunication.jsx`: Address, district, and contact info.
    - `StepUploads.jsx`: Uncontrolled file inputs using `useRef(null)` for candidate photo, signature, and PDF certificates.
    - `StepPayment.jsx`: Payment simulation and fee breakdown.
    - `StepReview.jsx`: Final review screen and submission with `FormData` to `/api/application/submit`.
- **Key Concepts:** Lifting state up, Multi-step `switch(currentStep)`, Controlled inputs, `useRef` for file uploads, `useEffect` timer with cleanup.

### 4. Safdil Arafath (B24CSA54)
- **Domain:** Candidate Authentication, Security & Form Validation
- **Assigned Components & Views:**
  - `pages/LoginPage.jsx`: Candidate login page with application number, password, and CAPTCHA.
  - `pages/RegisterPage.jsx`: Candidate registration page with 8 controlled fields.
  - `components/auth/CaptchaBox.jsx`: Alphanumeric CAPTCHA generator with refresh button and verification state.
  - `components/auth/PasswordStrength.jsx`: Real-time 4-level password strength meter using state and dynamic CSS styling.
  - `components/auth/SuccessModal.jsx`: Modal popup displaying generated KEAM Application Number upon successful registration.
  - Authentication Integration: Consumes `useContext(AuthContext)` to log user in, stores credentials, and redirects with `useNavigate('/dashboard')`.
- **Key Concepts:** Controlled components (`value` & `onChange`), Form `onSubmit` with `e.preventDefault()`, `useState` for strength calculation, Dynamic styling, `useNavigate`.

### 5. Shan M A (B24CSA59)
- **Domain:** Admin Management Portal & Public Status Tracker
- **Assigned Components & Views:**
  - `pages/AdminPage.jsx`: Central admin dashboard fetching candidate applications from `/api/admin/applications` using `useEffect`.
  - `components/admin/ApplicationTable.jsx` & `TableRow.jsx`: Reusable tabular components rendering candidate applications via `Array.prototype.map()`.
  - `components/admin/SearchFilter.jsx`: Controlled search bar and status filter dropdown.
  - `components/admin/StatusModal.jsx`: Review modal for updating candidate status (`Approved`, `Defective`, `Rejected`) with admin remarks.
  - `pages/StatusPage.jsx`: Public application status tracking page.
  - `components/status/StatusForm.jsx`: Controlled lookup form for Application Number and Date of Birth.
  - `components/status/MilestoneTracker.jsx`: Stepper timeline displaying live verification status and defect alerts using conditional rendering.
- **Key Concepts:** `useEffect` with dependency tracking, Controlled inputs, List mapping with `key` props, Conditional rendering with `switch` cases, Dynamic status badge styles.

---

## Team & Responsibilities Summary

| Name | Roll Number | Phase 1 Role | Phase 2 Role | Phase 3 Role (React SPA) | Status |
|------|-------------|--------------|--------------|--------------------------|--------|
| **Rasal Musthafa** | B24CSA49 | Team Lead, Landing page, Home page | Express Server Architecture, MongoDB Atlas Setup & Notifications API | React App Architecture, Routing (`react-router-dom`) & Landing Page Components | 🚀 Planning Done |
| **Ayman Riaz** | B24CSA17 | Shared Navbar, Footer & Button/Input CSS | JWT Auth Middleware, Error Handling & Frontend API Client | Shared UI Library (`Button`, `Inputs`, `Navbar`, `Footer`) & Global `AuthContext` | 🚀 Planning Done |
| **Faheem Shan** | B24CSA20 | Student Dashboard & Multi-step Application UI | Application Model, Controller, Multer Uploads & Dashboard API | Student Dashboard & 6-Step Multi-Step Application Wizard (`useRef` Uploads) | 🚀 Planning Done |
| **Safdil Arafath** | B24CSA54 | Login & Registration Pages, Client Validation | Candidate Account Model, Bcrypt Auth & JWT Security | Controlled Auth Forms (`Login`, `Register`), CAPTCHA & Dynamic Password Strength | 🚀 Planning Done |
| **Shan M A** | B24CSA59 | Admin Panel & Status Tracker UI | Admin Management Controller, Verification & Status Tracking API | Admin Management Portal, Applications Table & Public Status Tracker | 🚀 Planning Done |

---

## Course Details

- **Course:** Advanced Web Technologies (AWT) - Project Oriented Course
- **Faculty Guide:** Dr. Reshma Sheikh
- **Department:** Computer Science and Engineering
- **College:** TKM College of Engineering, Kollam
- **Academic Year:** 2026 - 2027

---

## License

This project is intended strictly for academic and educational purposes.
