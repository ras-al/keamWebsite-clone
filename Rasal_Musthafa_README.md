# Rasal Musthafa - README

## Profile
- **Name:** Rasal Musthafa
- **Roll Number:** B24CSA49
- **Role:** Landing Page / Home Page

## My Work
I built the main Home page (`index.html`) which includes the notification ticker, course category tabs, and portal cards. When a user clicks a category, the page filters and shows only the relevant cards.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `addEventListener` | Runs code only after page loads (`DOMContentLoaded`) |
| `querySelectorAll` | Selects all category tabs and portal cards |
| `preventDefault()` | Stops default link navigation on tab click |
| `classList.add/remove` | Toggles the active state on category tabs |
| `innerHTML` | Updates the welcome heading text dynamically |
| `style.display` | Shows/hides portal cards (`'flex'` or `'none'`) |
| `getAttribute` | Reads `data-tags` from cards to match category |

## DOM Flow

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

## File Dependencies

```
style.css --> components.css --> home.css --> index.html
main.js   --> home.js  ----------------------^
navbar.js ---------------------------------->|
footer.js ---------------------------------->|
```

## Phase 2 - Backend & MongoDB Integration

### Role: Team Leader, Express Server Architecture & MongoDB Atlas Setup

- **Assigned Files**:
  - `server.js` (Express entry point)
  - `config/db.js` (MongoDB Atlas connection via Mongoose)
  - `.env` / `.env.example` (Environment variables configuration)
  - `package.json` (Scripts and dependency management)
- **Key Responsibilities**:
  1. Set up the MongoDB Atlas cloud cluster, database user credentials, and network access (IP whitelisting).
  2. Build the Express server in `server.js` with core middleware (`cors`, `express.json()`, `express.urlencoded()`) and static file serving for the HTML/CSS/JS frontend.
  3. Implement the database connection utility in `config/db.js` with error handling and reconnection logic.
  4. Create the public statistics/notifications API endpoint (`GET /api/notifications` or `GET /api/stats`) and connect it with `js/home.js` on the landing page (`index.html`).
  5. Provide project setup guidance for teammates, review Pull Requests, and manage Git merges into `main`.

