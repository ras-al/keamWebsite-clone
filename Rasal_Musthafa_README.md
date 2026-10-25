# Rasal Musthafa - README

## Profile
- **Name:** Rasal Musthafa
- **Roll Number:** B24CSA49
- **Role:** Team Leader | Landing Page / Home Page | Express Server & MongoDB Atlas | React App Architecture & Home Components

---

## Phase 1 - Frontend UI & Interactivity (✅ Completed)

### My Work
I built the main Home page (`index.html`) which includes the government header, notification ticker, course category tabs, and portal cards. When a user clicks a category, the page filters and shows only the relevant cards.

### JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `addEventListener` | Runs code only after page loads (`DOMContentLoaded`) |
| `querySelectorAll` | Selects all category tabs and portal cards |
| `preventDefault()` | Stops default link navigation on tab click |
| `classList.add/remove` | Toggles the active state on category tabs |
| `innerHTML` | Updates the welcome heading text and notification lists dynamically |
| `style.display` | Shows/hides portal cards (`'flex'` or `'none'`) |
| `getAttribute` | Reads `data-tags` from cards to match category |
| `fetch()` | Asynchronously retrieves live notifications from backend API |

### DOM Flow

```
Page Loads
    |
    v
Select all category tabs & portal cards
    |
    v
User clicks a category tab
    |
    v
Stop default link behavior
    |
    v
Update active tab styling
    |
    v
Read category from data-tags
    |
    v
Update heading text via innerHTML
    |
    v
Loop through all portal cards
    |
    +-- card matches category? --+
    |                            |
   YES                          NO
    |                            |
 show card                   hide card
    |                            |
    +----------------------------+
    |
    v
  Done
```

### File Dependencies

```
style.css --> components.css --> home.css --> index.html
main.js   --> home.js  ----------------------^
navbar.js ---------------------------------->|
footer.js ---------------------------------->|
```

---

## Phase 2 - Backend & MongoDB Integration (✅ Completed)

### Role: Team Leader, Express Server Architecture & MongoDB Atlas Setup

### Completed Files

1. **`backend/server.js`**
   - Express server entry point configuring core middleware (`cors`, `express.json()`, `express.urlencoded()`).
   - Serves all static frontend files (`index.html`, `pages/`, `css/`, `js/`, `assets/`, `components/`) directly using `express.static()`.
   - Mounts routes for notifications, stats, and health checks.
   - Provides central 404 and 500 error handling middleware.

2. **`backend/config/db.js`**
   - Mongoose connection utility connecting to MongoDB Atlas cloud cluster (`keam-cluster`).
   - Clean async/await structure with connection logging and error handling.

3. **`backend/.env` & `backend/.env.example`**
   - Environment configuration including `PORT`, `NODE_ENV`, `MONGO_URI`, and `JWT_SECRET`.
   - Atlas credentials and cluster parameters configured.

4. **`backend/package.json`**
   - Dependency management: `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `multer`.
   - Scripts:
     - `npm start`: Runs `node server.js`
     - `npm run dev`: Runs development server with `nodemon server.js`

5. **`backend/models/Notification.js`**
   - Mongoose schema for notices: `title`, `link`, `badge`, `category`, `isTicker`, `message`, `isRead`, and timestamps.

6. **`backend/controllers/notificationController.js`**
   - Full CRUD controller without hardcoded or predefined seed dependencies:
     - `getNotifications`: Retrieves real-time notifications with optional filtering (`?type=ticker`, `?type=list`, `?category=`, `?search=`).
     - `getNotificationById`: Retrieves announcement details by MongoDB ID.
     - `createNotification`: Adds a new announcement/ticker update published via the Admin Dashboard.
     - `updateNotification`: Modifies existing announcement title, link, category, badge, or toggles ticker placement.
     - `deleteNotification`: Permanently deletes an announcement from MongoDB Atlas.
     - `getStats`: Returns portal public statistics (active courses, total registrations, application counts, ticker and notice counts, helpline details).

7. **`backend/routes/notificationRoutes.js`**
   - Routes mounted at `/api/notifications` (`GET`, `POST`), `/api/notifications/:id` (`GET`, `PUT`, `DELETE`), and `/api/notifications/stats` (`GET`).
   - Also mounted under `/api/admin/notifications` for unified admin management.

8. **`backend/middleware/errorMiddleware.js`**
   - Standardized 404 Not Found and 500 Global Error JSON responses.

9. **`pages/admin.html` & `js/admin.js` Admin Notification Management**
   - Dedicated "Announcements & Live Ticker" management panel within the Admin Dashboard.
   - Live creation form for publishing new announcements with category and badge selection.
   - Interactive table with quick placement toggle between Scrolling Ticker and Notice Board.
   - Instant edit and delete actions connected directly to MongoDB Atlas via `API.put()` and `API.delete()`.

10. **`js/home.js` Integration**
   - Integrated live `fetch('/api/notifications')` to dynamically populate the scrolling announcement ticker and the Latest Notifications list directly from database records managed by the Admin.
   - Smooth infinite marquee looping and informative empty states when no notices are active.
   - Preserves offline/static fallback so the site works seamlessly both with and without the backend running.

---

## API Endpoints Implemented

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/health` | Backend server health status & timestamp | Public |
| `GET` | `/api/notifications` | Get all announcements (supports `?type=ticker` / `?type=list`, `?category=`, `?search=`) | Public |
| `GET` | `/api/notifications/:id` | Get announcement details by ID | Public / Admin |
| `POST` | `/api/notifications` | Add a new announcement or ticker update | Admin |
| `PUT` | `/api/notifications/:id` | Update announcement details or toggle ticker placement | Admin |
| `DELETE` | `/api/notifications/:id` | Permanently delete an announcement | Admin |
| `GET` | `/api/stats` | Get portal live statistics and announcement counters | Public |
| `GET` | `/` | Serves `index.html` frontend landing page | Public |

---

## How to Run & Test

1. **Navigate to the backend directory and install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   npm start
   ```

3. **Open the application**:
   - Web Portal: [http://localhost:5000](http://localhost:5000)
   - API Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)
   - Notifications: [http://localhost:5000/api/notifications](http://localhost:5000/api/notifications)
   - Stats: [http://localhost:5000/api/stats](http://localhost:5000/api/stats)

4. **Test via cURL**:
   ```bash
   # Test API Health
   curl http://localhost:5000/api/health

   # Test Portal Stats
   curl http://localhost:5000/api/stats

   # Test Notifications API
   curl http://localhost:5000/api/notifications
   ```

---

## Instructions for Teammates (Backend)

As Team Leader, I have set up the core backend foundation, MongoDB Atlas connection, and static serving. Please follow these guidelines:

1. **Where to place your code**:
   - Place models in `backend/models/<ModelName>.js`
   - Place controllers in `backend/controllers/<controllerName>.js`
   - Place routes in `backend/routes/<routeName>.js`
   - Place middleware in `backend/middleware/<middlewareName>.js`
2. **Mounting your routes in `backend/server.js`**:
   - Safdil: `app.use('/api/auth', require('./routes/authRoutes'));`
   - Faheem: `app.use('/api/application', require('./routes/applicationRoutes'));`
   - Shan: `app.use('/api/admin', require('./routes/adminRoutes'));`
3. **Coding Standards**:
   - Keep code simple, clean, and well-commented.
   - Always return consistent JSON: `{ success: true/false, message: '...', data: ... }`.
   - Use `try/catch` blocks in controllers and pass errors to `next(error)`.
4. **Git Workflow**:
   - Branch from `rasal` or `main`: `git checkout -b feature/<your-name>-backend`
   - Commit cleanly: `git commit -m "feat(backend): implement auth controller and routes"`
   - Open a Pull Request for review before merging into `main`.

---

## Phase 3 - React SPA Architecture & Home / Landing Page (✅ Completed)

### Role: Team Leader, React Setup, Application Routing & Landing Page Components

In Phase 3, we transitioned the KEAM Portal into a component-driven React Single Page Application (SPA). Following the course study material, our codebase prioritizes simple, clean, and readable functional components with modern React hooks. All of my assigned architecture, routing, and home components are fully implemented and structured.

### My Phase 3 Assigned Components & Files

| Component / File | Purpose & Responsibilities | Study Reference |
|---|---|---|
| `frontend/src/index.js` | Entry point binding React to the DOM using `ReactDOM.createRoot` and wrapping `<App />` with `<BrowserRouter>`. | Slides 8, 83 |
| `frontend/src/App.js` | Top-level application layout: mounts `Navbar`, declares `<Routes>` with `<Route>` for all pages, and mounts `Footer`. | Slides 14, 84–85 |
| `frontend/src/pages/HomePage.jsx` | Landing page coordinating header, announcement ticker, category tabs, portal cards, and live notifications. | Slide 14 |
| `frontend/src/components/home/Header.jsx` | Official Government of Kerala header banner with CEE emblem and title. | Slides 10–13 |
| `frontend/src/components/home/Ticker.jsx` | Dynamic announcement ticker fetching live updates from `/api/notifications?type=ticker` via `useEffect`. | Slides 36, 67, 71 |
| `frontend/src/components/home/CourseTabs.jsx` | Interactive course category selector (`Engineering`, `Medical`, `Architecture`, etc.) managing active tab state with `useState`. | Slides 31–32 |
| `frontend/src/components/home/PortalCards.jsx` | Grid container filtering and displaying portal cards based on selected category props. | Slides 48–49 |
| `frontend/src/components/home/PortalCard.jsx` | Reusable card receiving `title`, `desc`, `tag`, and `link` as props with destructuring. | Slides 50–51 |
| `frontend/src/components/home/NotificationList.jsx` | Live announcement board fetching notices via `useEffect` with clean conditional loading states. | Slides 56–62, 71–72 |

---

### React Concepts Used (from Study Material)

1. **Declarative Functional Components (Slides 10–15)**:
   - Writing UI with pure functional components returning clean JSX.
   - Using React Fragments (`<>...</>`) or single container tags to adhere to JSX rules.
2. **Client-Side Routing with `react-router-dom` (Slides 82–85)**:
   - Setting up `BrowserRouter`, `<Routes>`, `<Route path="..." element={<Component />} />`.
   - Replaces traditional multi-page navigation without reloading the browser.
3. **State Management with `useState` (Slides 31–35)**:
   - Managing active course tab: `const [activeCategory, setActiveCategory] = useState('All');`
   - Managing notifications array: `const [notifications, setNotifications] = useState([]);`
4. **Side Effects with `useEffect` (Slides 36, 65–72)**:
   - Fetching announcements from `/api/notifications` on component mount using an empty dependency array `[]`.
5. **Component Composition & Props (Slides 14, 42–51)**:
   - Passing data and handler functions to child components (`<PortalCard key={card.id} {...card} />`).
   - Destructuring props cleanly in function arguments: `function PortalCard({ title, tag, link }) { ... }`.
6. **Conditional Rendering (Slides 56–64)**:
   - Rendering loading indicators while fetching: `{loading ? <p>Loading notices...</p> : <NoticeList items={notices} />}`.

---

### Educational Code Style Reference for Home Components

```jsx
// Example of simple, readable structure matching course slides:
import React, { useState, useEffect } from 'react';

function Ticker() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple fetch on component mount (Slide 71)
    fetch('/api/notifications?type=ticker')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotices(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch ticker:', err);
        setLoading(false);
      });
  }, []); // Empty array runs once on mount

  if (loading) return <div className="ticker-bar">Loading announcements...</div>;

  return (
    <div className="ticker-bar">
      <span className="ticker-badge">LATEST</span>
      <div className="ticker-content">
        {notices.map((notice) => (
          <span key={notice._id} className="ticker-item">
            📢 {notice.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;
```

---

### Phase 3 Instructions for Teammates

1. **Coding Style**:
   - Keep code simple, readable, and consistent with the classroom study material.
   - Use **functional components** and **React Hooks** (`useState`, `useEffect`, `useContext`, `useRef`). Avoid class components.
   - Destructure props cleanly: `function Component({ propA, propB })`.
   - Prefer external CSS or CSS Modules (`ComponentName.module.css`).
2. **Directory Conventions**:
   - Shared/Common components (`Navbar`, `Footer`, `Button`, `InputField`) go in `src/components/common/` (Ayman).
   - Domain-specific components go in `src/components/<domain>/` (e.g. `src/components/dashboard/`, `src/components/auth/`).
   - Page containers go in `src/pages/`.
3. **Route Declaration in `App.js`**:
   - Home: `/` (`HomePage.jsx`)
   - Login: `/login` (`LoginPage.jsx`)
   - Register: `/register` (`RegisterPage.jsx`)
   - Dashboard: `/dashboard` (`DashboardPage.jsx` - protected)
   - Application: `/application` (`ApplicationPage.jsx` - protected)
   - Admin Panel: `/admin` (`AdminPage.jsx` - protected)
   - Public Status: `/status` (`StatusPage.jsx`)

