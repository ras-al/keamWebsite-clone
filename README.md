# KEAM Portal Clone — MERN Stack

## Description

This project is an academic clone of the KEAM (Kerala Engineering, Architecture and Medicine) official portal, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is developed as part of the Project Oriented Course (AWT) and aims to recreate the core functionalities of an online entrance exam admission system — including candidate registration, application submission, document upload, an admin panel, and application status tracking.

This project is developed purely for academic and educational purposes. It is not affiliated with, endorsed by, or connected to the Government of Kerala or the Commissioner for Entrance Examinations. Reference: [cee.kerala.gov.in](https://cee.kerala.gov.in/cee/index.php)

## Status

Project initialized. Core folder structure and dependencies are set up. Feature development is in progress.

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
| Rasal Musthafa | B24CSA49 | Team Lead — architecture, integration, deployment |
| Ayman Riaz | B24CSA17 | Frontend Development |
| Faheem Shan | B24CSA20 | Backend Development |
| Safdil Arafath | B24CSA54 | Admin Panel |
| Shan M A | B24CSA59 | Notifications, Testing & Documentation |

## Course Details

- **Course:** Advanced Web Technologies (AWT) — Project Oriented Course
- **Faculty Guide:** Dr. Reshma Sheikh
- **Department:** Computer Science and Engineering
- **College:** TKM College of Engineering, Kollam
- **Academic Year:** 2025 - 2026

## License

This project is intended for academic use only.
