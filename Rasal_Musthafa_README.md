# Rasal Musthafa - README

## Profile
- **Name:** Rasal Musthafa
- **Roll Number:** B24CSA49
- **Role:** Team Leader | Landing Page / Home Page | Express Server Architecture & MongoDB Atlas Setup

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
   - Mongoose schema for notices: `title`, `link`, `badge`, `category`, `isTicker`, and timestamps.

6. **`backend/controllers/notificationController.js`**
   - `getNotifications`: Retrieves notifications with optional filtering (`?type=ticker` or `?type=list`). Automatically seeds 12 default notices from the KEAM portal if collection is empty.
   - `getStats`: Returns portal public statistics (active courses, total registrations, application counts, helpline details).
   - `createNotification`: Adds a new announcement.

7. **`backend/routes/notificationRoutes.js`**
   - Routes mounted at `/api/notifications` and `/api/notifications/stats`.

8. **`backend/middleware/errorMiddleware.js`**
   - Standardized 404 Not Found and 500 Global Error JSON responses.

9. **`js/home.js` Integration**
   - Integrated live `fetch('/api/notifications')` to dynamically populate the scrolling announcement ticker and the Latest Notifications list.
   - Preserves offline/static fallback so the site works seamlessly both with and without the backend running.

---

## API Endpoints Implemented

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/health` | Backend server health status & timestamp | Public |
| `GET` | `/api/notifications` | Get all announcements (supports `?type=ticker` / `?type=list`) | Public |
| `GET` | `/api/stats` | Get portal live statistics | Public |
| `POST` | `/api/notifications` | Add a new announcement | Public / Admin |
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

## Instructions for Teammates

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
