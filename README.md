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

### **Phase 2: Express Server, MongoDB Atlas & REST APIs (🚀 Active & Foundation Complete)**
- ✅ **Backend Server Architecture & MongoDB Atlas Setup** (*Rasal Musthafa*) - Express server with CORS, JSON body parsers, static frontend serving, Mongoose database connection, and live `/api/notifications` & `/api/stats` endpoints connected with `index.html` and `js/home.js`.
- 🔄 **Shared Auth & Error Middleware** (*Ayman Riaz*) - JWT authentication guard (`backend/middleware/auth.js`) and frontend API client (`js/api.js`).
- 🔄 **Application Form & Document Upload API** (*Faheem Shan*) - `Application` schema, Multer storage, and submission endpoints.
- 🔄 **Authentication & Security API** (*Safdil Arafath*) - `Candidate` schema, Bcrypt password hashing, JWT generation, and login integration.
- 🔄 **Admin Management & Status Tracking API** (*Shan M A*) - `Admin` schema, application review endpoints, and public status tracking.

---

## Tech Stack

- **Backend:** Node.js, Express.js, Mongoose (MongoDB Atlas Cloud ODM)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Security & Utilities:** JSON Web Tokens (JWT), Bcrypt.js, CORS, Dotenv, Multer
- **Design:** Custom CSS Design System, Responsive Flexbox & Grid
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

## Team & Responsibilities

| Name | Roll Number | Phase 1 Role | Phase 2 Role | Status |
|------|-------------|--------------|--------------|--------|
| **Rasal Musthafa** | B24CSA49 | Team Lead, Landing page, Home page | Express Server Architecture, MongoDB Atlas Setup & Notifications API | ✅ Complete |
| **Ayman Riaz** | B24CSA17 | Shared Navbar, Footer & Button/Input CSS | JWT Auth Middleware, Error Handling & Frontend API Client | 🔄 In Progress |
| **Faheem Shan** | B24CSA20 | Student Dashboard & Multi-step Application UI | Application Model, Controller, Multer Uploads & Dashboard API | 🔄 In Progress |
| **Safdil Arafath** | B24CSA54 | Login & Registration Pages, Client Validation | Candidate Account Model, Bcrypt Auth & JWT Security | 🔄 In Progress |
| **Shan M A** | B24CSA59 | Admin Panel & Status Tracker UI | Admin Management Controller, Verification & Status Tracking API | 🔄 In Progress |

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
