# KEAM Portal Clone - MERN Stack

## Description

This project is an academic clone of the KEAM (Kerala Engineering, Architecture and Medicine) official portal, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is developed as part of the Project Oriented Course (AWT) and aims to recreate the core functionalities of an online entrance exam admission system - including candidate registration, application submission, document upload, an admin panel, and application status tracking.

This project is developed purely for academic and educational purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations. Reference: [cee.kerala.gov.in](https://cee.kerala.gov.in/cee/index.php)

## Status

🚧 Currently working on the frontend split. Core UI components and pages (like Home, Login, and Header) are being actively developed.

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
├── frontend/               # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/                # Express backend
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

## Frontend Split

The React application is modularized and split into the following logical boundaries:
- **Pages** (`src/pages/`): Container components mapping to application routes (e.g., `Home`, `Login`, `Dashboard`).
- **Components** (`src/components/`): Reusable, smaller UI blocks (e.g., Form elements, Buttons).
- **Layouts** (`src/components/layout/`): Structural templates used across multiple pages (e.g., `Header`).
- **Routing**: Client-side navigation handled by React Router mapping URLs to specific page components.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local instance or Atlas connection string)
- npm

### Installation

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

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables

   Create a `.env` file inside `backend/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Run the backend
   ```bash
   cd backend
   npm run dev
   ```

6. Run the frontend
   ```bash
   cd ../frontend
   npm run dev
   ```

The frontend will run on `http://localhost:5173` (Vite's default) and the backend API on `http://localhost:5000`.

## Team

| Name | Roll Number | Role |
|------|-------------|------|
| Rasal Musthafa | B24CSA49 | Project setup, Landing page, Home page |
| Ayman Riaz | B24CSA17 | Shared components (Navbar, Footer, Button design, Input) |
| Faheem Shan | B24CSA20 | Student dashboard page, Application form, UI |
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
