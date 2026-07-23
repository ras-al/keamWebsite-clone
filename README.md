# KEAM Portal Clone - MERN Stack

## Description

This project is an academic clone of the KEAM (Kerala Engineering, Architecture and Medicine) official portal, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is developed as part of the Project Oriented Course (AWT) and aims to recreate the core functionalities of an online entrance exam admission system - including candidate registration, application submission, document upload, an admin panel, and application status tracking.

This project is developed purely for academic and educational purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations. Reference: [cee.kerala.gov.in](https://cee.kerala.gov.in/cee/index.php)

## Status

**Phase 1 (Active):** Building the frontend UI using plain HTML, CSS, and JavaScript. Landing page is complete; teammate pages are scaffolded and in progress.

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
│   ├── phase1/                 # Phase 1 — Plain HTML/CSS/JS
│   │   ├── index.html          # Landing/Home page (Rasal)
│   │   ├── pages/
│   │   │   ├── login.html      # Safdil
│   │   │   ├── register.html   # Safdil
│   │   │   ├── dashboard.html  # Faheem
│   │   │   ├── application.html# Faheem
│   │   │   ├── admin.html      # Shan
│   │   │   └── status.html     # Shan
│   │   ├── components/         # Shared navbar/footer (Ayman)
│   │   ├── css/
│   │   │   ├── style.css       # Shared base styles
│   │   │   └── home.css        # Landing page styles
│   │   └── js/
│   │       ├── main.js         # Shared JS utilities
│   │       └── home.js         # Landing page JS
│   ├── src/                    # Phase 2 — React (Vite) scaffold
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

### Phase 1 — Static Frontend (Current)
Plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no libraries, no build tools.
- **Pages** (`phase1/pages/`): Individual HTML pages for each feature (login, dashboard, admin, etc.).
- **Components** (`phase1/components/`): Shared navbar and footer HTML/JS snippets injected across all pages.
- **Shared Styles** (`phase1/css/style.css`): CSS reset, design tokens (colors, typography, spacing), and utility classes.
- **Page Styles**: Each page can add its own CSS file (e.g., `home.css`, `login.css`) for page-specific rules.
- Open `frontend/phase1/index.html` directly in a browser to preview.

### Phase 2 — React + MERN Integration (Planned)
- Migrate the static pages into React components using the existing Vite scaffold (`frontend/src/`).
- Connect to the Express/MongoDB backend via REST APIs.
- Implement JWT authentication, form submissions, and dynamic data rendering.

## Getting Started

### Prerequisites

- A web browser (for Phase 1)
- Node.js v18+ and npm (for backend and Phase 2)
- MongoDB (local instance or Atlas connection string)

### Phase 1 — View the Static Frontend

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

### Phase 2 — React Frontend (when ready)

```bash
cd frontend
npm install
npm run dev
```

The React dev server will run on `http://localhost:5173`.

## Team

| Name | Roll Number | Role |
|------|-------------|------|
| Rasal Musthafa | B24CSA49 | Project setup, Landing page, Home page |
| Ayman Riaz | B24CSA17 | Shared components (Navbar, Footer, Button design, Input) |
| Faheem Shan | B24CSA20 | Student dashboard page, Application form UI |
| Safdil Arafath | B24CSA54 | Login & Registration page, Form validation UI |
| Shan M A | B24CSA59 | Admin Panel UI, Application status tracking page |

## Course Details

- **Course:** Advanced Web Technologies (AWT) - Project Oriented Course
- **Faculty Guide:** Dr. Reshma Sheikh
- **Department:** Computer Science and Engineering
- **College:** TKM College of Engineering, Kollam
- **Academic Year:** 2026 - 2027

## License

This project is intended for academic use only.
