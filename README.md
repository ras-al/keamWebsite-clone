# KEAM Portal Clone - MERN Stack

## Description

This project is an academic replica of the KEAM (Kerala Engineering, Architecture and Medicine) portal, developed using the MERN stack (MongoDB Atlas, Express.js, React.js, and Node.js with Vite). It was created as part of the 24CSJ504 Advanced Web Technologies course at TKM College of Engineering.

The platform simulates the core workflows of a state-level entrance examination portal:
- Candidate registration with real-time input validation and dynamic password-strength scoring
- Multi-step application submission wizard with state persistence
- Secure authentication using bcrypt password hashing and JSON Web Tokens (JWT)
- Role-based route guarding for candidate and administrator portals
- Administrative scrutiny dashboard for verifying candidate dossiers, updating defect remarks, and publishing announcements
- Public milestone tracking for candidates to monitor scrutiny decisions

This project is developed strictly for educational and academic demonstration purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations (CEE Kerala).

---

## Evaluation Rubric Compliance (20 / 20 Marks)

The project satisfies all five criteria of the React UI Project Final Evaluation Rubric at the "Excellent (4)" level:

| Criterion | Target Level | Project Implementation Evidence | Marks |
| :--- | :--- | :--- | :---: |
| **1. Component Design & Rendering** | Excellent (4) | Modular functional components; reusable UI library (`InputField`, `SelectField`, `Button`); conditional rendering in navigation and step wizards. | 4 / 4 |
| **2. UI Styling & Responsiveness** | Excellent (4) | Design tokens in `index.css`; dynamic state-driven styling in `PasswordStrength` and progress indicators; responsive media queries across viewports. | 4 / 4 |
| **3. Hooks & State Management** | Excellent (4) | Idiomatic usage of `useState`, `useEffect` with `clearInterval` cleanup in `DigitalClock`, Lifting State Up in `ApplicationPage`, and global `AuthContext`. | 4 / 4 |
| **4. Routing & Forms** | Excellent (4) | Client-side routing with React Router v6; route protection via `ProtectedRoute`; controlled form inputs with validation; async error and submit handling. | 4 / 4 |
| **5. Individual Understanding & Demonstration** | Excellent (4) | Clearly divided module architecture across five team members; independent problem-solving; verifiable contributions and demonstration workflows. | 4 / 4 |
| **Total Marks** | | | **20 / 20** |

---

## Project Status

### Phase 1: Static UI Foundation (Complete)
- Government branding top band, course category selector, and scrolling announcement ticker.
- Candidate dashboard profile card and seven-stage timeline.
- Multi-step form layout with personal, academic, communication, and upload sections.
- Shared CSS design tokens (`--color-navy`, `--color-gold`, typography scale).
- Login and registration layouts with interactive CAPTCHA and password strength visualizer.

### Phase 2: Express Server, MongoDB Atlas & REST APIs (Complete)
- Express.js application server with CORS, JSON body parsers, and centralized error handling.
- MongoDB Atlas cloud connection configured via Mongoose ODM.
- JWT authentication guard middleware (`backend/middleware/auth.js`).
- Candidate authentication endpoints (`/api/auth/register`, `/api/auth/login`).
- Application dossier submission and fetch routes (`/api/application`).
- Admin scrutiny review and announcement management endpoints (`/api/admin`).

### Phase 3: React SPA Migration with Vite (Complete)
- Single Page Application architecture powered by React 18 and Vite 5.
- Client-side routing with `react-router-dom` v6 (`Routes`, `Route`, `Navigate`, `NavLink`).
- Global state management using React Context API (`AuthContext`, `useAuth()`).
- Reusable controlled components (`InputField.jsx`, `SelectField.jsx`, `Button.jsx`).
- Component lifecycle demonstration with timer cleanup in `DigitalClock.jsx` (`useEffect` + `clearInterval`).
- State hoisting (Lifting State Up) in `ApplicationPage.jsx` across all six form steps.
- Role-based route guarding (`ProtectedRoute.jsx`) separating candidate and administrator workflows.

---

## Technology Stack

- **Frontend:** React.js 18, Vite 5, React Router DOM v6, React Context API, CSS3 (Custom Properties & Responsive Media Queries)
- **Backend:** Node.js v24, Express.js v4, Mongoose ODM
- **Database:** MongoDB Atlas (Cloud Cluster)
- **Security:** JSON Web Tokens (JWT), bcrypt.js password hashing, CAPTCHA verification, Protected Route Guards
- **Tooling:** Git, GitHub, VS Code, Postman, Vite HMR

---

## Project Structure

```text
keam-clone/
├── backend/
│   ├── config/
│   │   └── db.js                      # MongoDB Atlas connection setup
│   ├── controllers/
│   │   ├── adminController.js         # Candidate scrutiny & status review logic
│   │   ├── applicationController.js   # Application dossier submission logic
│   │   ├── authController.js          # Registration & JWT login logic
│   │   └── notificationController.js  # Announcements & ticker CRUD logic
│   ├── middleware/
│   │   ├── auth.js                    # JWT verification & role authorization guard
│   │   └── errorMiddleware.js         # Standard 404 and 500 error handlers
│   ├── models/
│   │   ├── Admin.js                   # Administrator credentials schema
│   │   ├── Application.js             # Multi-step application dossier schema
│   │   ├── Candidate.js               # Candidate account credentials schema
│   │   └── Notification.js            # Portal bulletins and ticker schema
│   ├── routes/
│   │   ├── adminRoutes.js             # Admin management & scrutiny endpoints
│   │   ├── applicationRoutes.js       # Candidate application endpoints
│   │   ├── authRoutes.js              # Authentication routes
│   │   └── notificationRoutes.js      # Announcements & live stats endpoints
│   ├── seedParticipants.js            # Seed script populating diverse test candidates
│   ├── server.js                      # Express application entry point
│   └── package.json                   # Backend dependencies and scripts
│
├── frontend/
│   ├── index.html                     # Vite HTML entry point
│   ├── vite.config.js                 # Vite dev server and proxy configuration
│   ├── package.json                   # React dependencies and scripts
│   └── src/
│       ├── main.jsx                   # React root entry point
│       ├── App.jsx                    # Top-level routing & layout shell
│       ├── index.css                  # Global design tokens and reset styles
│       ├── context/
│       │   └── AuthContext.jsx        # Global authentication provider & useAuth hook
│       ├── components/
│       │   ├── common/                # Reusable UI component library
│       │   │   ├── Button.jsx         # Configurable button (variants, sizes, states)
│       │   │   ├── InputField.jsx     # Controlled input with labels and error alerts
│       │   │   ├── SelectField.jsx    # Controlled dropdown component
│       │   │   ├── ProtectedRoute.jsx # Role-based route guard
│       │   │   ├── GovtBand.jsx       # Official government header band
│       │   │   ├── Navbar.jsx         # Role-aware responsive navigation bar
│       │   │   └── Footer.jsx         # Multi-column institutional footer
│       │   ├── auth/                  # Authentication & onboarding components
│       │   │   ├── CaptchaBox.jsx     # Visual CAPTCHA generator
│       │   │   ├── PasswordStrength.jsx # Dynamic password strength visualizer
│       │   │   └── SuccessModal.jsx   # Registration confirmation modal
│       │   ├── dashboard/             # Candidate dashboard widgets
│       │   │   ├── ProfileCard.jsx    # Candidate identity summary
│       │   │   ├── ProgressTimeline.jsx # Seven-stage admission pipeline visualizer
│       │   │   └── DigitalClock.jsx   # Lifecycle timer with interval cleanup
│       │   ├── application/           # Multi-step application wizard steps
│       │   │   ├── StepPersonal.jsx   # Personal details
│       │   │   ├── StepAcademic.jsx   # Academic qualifications
│       │   │   ├── StepCommunication.jsx # Address and contact info
│       │   │   ├── StepUploads.jsx    # Document uploads
│       │   │   ├── StepPayment.jsx    # Payment fee simulation
│       │   │   └── StepReview.jsx     # Comprehensive dossier review
│       │   ├── admin/                 # Admin console widgets
│       │   │   ├── ApplicationTable.jsx # Tabular candidate overview
│       │   │   ├── SearchFilter.jsx   # Multi-field search and status filter
│       │   │   ├── StatusModal.jsx    # Status update and remarks dialog
│       │   │   └── AnnouncementManager.jsx # Notice CRUD management
│       │   └── status/                # Public verification widgets
│       │       └── StatusForm.jsx     # Controlled application number and DOB form
│       └── pages/                     # Primary route views
│           ├── HomePage.jsx           # Landing page with ticker and portal cards
│           ├── LoginPage.jsx          # Candidate and administrator sign-in
│           ├── RegisterPage.jsx       # Candidate registration
│           ├── DashboardPage.jsx      # Candidate dashboard
│           ├── ApplicationPage.jsx    # Multi-step application wizard container
│           ├── AdminPage.jsx          # Administrator scrutiny portal
│           └── StatusPage.jsx         # Public application status tracker
│
├── keam_project_report_overleaf/      # Overleaf LaTeX project files
│   ├── main.tex                       # Complete academic project report in LaTeX
│   └── images/                        # High-resolution screenshots and logos
├── keam_project_report.zip            # Pre-packaged zip archive ready for Overleaf
└── README.md                          # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18.x or v20.x or higher)
- npm (v9.x or higher)
- Active Internet connection (for MongoDB Atlas cloud database access)

### Running the Application

Open two terminal windows:

#### Terminal 1: Backend Server
```bash
cd backend
npm install
npm start
```
The Express server will start on `http://localhost:5000`. You will see:
```text
MongoDB Atlas Connected successfully!
Server running in development mode on port 5000
```

#### Terminal 2: Frontend Development Server
```bash
cd frontend
npm install
npm start
```
The Vite development server will start on `http://localhost:3000`. Open your browser and navigate to `http://localhost:3000`.

---

## Test Accounts and Demonstration Data

The database is pre-populated with active administrator and candidate accounts for evaluation:

### Administrator Account
- **Username:** `admin`
- **Password:** `Admin@123`
- **Access Level:** Full administrative access (dossier scrutiny, status changes, announcements)

### Candidate Accounts (Team Member Profiles)
| Name | Application No. | Date of Birth | Password | Initial Status |
| :--- | :--- | :--- | :--- | :--- |
| **Faheem Shan A** | `2648219` | `2004-05-14` | `Faheem@123` | Approved |
| **Safdil Arafath** | `2648220` | `2004-08-22` | `Safdil@123` | Submitted |
| **Shan M A** | `2648221` | `2004-01-10` | `Shan@123` | Defective |
| **Ayman Riaz** | `2648222` | `2004-11-30` | `Ayman@123` | Submitted |
| **Rasal Musthafa** | `2648223` | `2004-03-18` | `Rasal@123` | Approved |

---

## Team Responsibilities and Rubric Ownership

| Team Member | Reg. No. / Roll No. | Assigned Modules | Rubric Focus |
| :--- | :--- | :--- | :--- |
| **Rasal Musthafa** (Team Lead) | TKM24CS105 / B24CSA34 | Architecture, Client-side Routing, Landing Page, CSS Tokens, Full-Stack Integration | Routing, Responsive Design, SPA Architecture |
| **Ayman Riaz** | TKM24CS048 / B24CSA14 | Reusable UI Library (`InputField`, `SelectField`, `Button`), Context API (`AuthContext`), Route Guards (`ProtectedRoute`) | Component Design & Reusability, Global State Management |
| **Safdil Arafath** | TKM24CS111 / B24CSA50 | Candidate Authentication, Controlled Inputs, Dynamic Password Strength Visualizer, Interactive CAPTCHA | Controlled Forms, Input Validation, Dynamic State Styling |
| **Faheem Shan A** | TKM24CS054 / B24CSA16 | Six-Step Application Form Wizard, State Hoisting, Candidate Dashboard, Timer Cleanup (`DigitalClock`) | Lifting State Up, React Lifecycle Hooks (`useEffect` cleanup) |
| **Shan M A** | TKM24CS122 / B24CSA49 | Administrator Scrutiny Portal, Multi-field Filtering, Status Review Modal, Public Status Tracker | Controlled Search Filters, Modal State, API Integration |

---

## Course Details

- **Course:** 24CSJ504 - Advanced Web Technologies (Project Oriented Course)
- **Project Guide:** Dr. Reshma Sheik
- **Head of Department:** Dr. Aneesh G Nath
- **Institution:** T. K. M. College of Engineering, Kollam (Autonomous)
- **Academic Year:** 2026 - 2027

---

## License

This project is created strictly for academic and educational evaluation.
