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
- ✅ Admin Panel & Status Tracking pages (Shan M A) - complete (stats dashboard, datatable, and status progress tracker)

**Phase 2 (Planned):** Migrate the frontend to React (Vite) and integrate with the Express/MongoDB backend for a full MERN stack application.

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Design:** Custom CSS Design System, Responsive Flexbox & Grid
- **Version Control:** Git and GitHub
- **Tools:** VS Code, Antigravity, Live server

## Project Structure

```text
keam-clone/
├── index.html          # Landing/Home page (Rasal)
├── pages/
│   ├── login.html      # Safdil — login form, captcha, password toggle
│   ├── register.html   # Safdil — registration form, strength meter
│   ├── dashboard.html  # Faheem Shan 
│   ├── application.html# Faheem Shan 
│   ├── admin.html      # Shan M A
│   └── status.html     # Shan M A
├── assets/
│   └── logo.png        # CEE Kerala emblem
├── components/         # Shared navbar/footer (Ayman Riaz)
│   ├── README.html
│   ├── navbar.js       # JS injection for shared navbar
│   └── footer.js       # JS injection for shared footer
├── css/
│   ├── style.css       # Shared base styles & design tokens
│   ├── components.css  # Navbar, footer, button & input styles (Ayman Riaz)
│   ├── home.css        # Landing page styles
│   ├── dashboard.css   # Dashboard page styles (Faheem Shan)
│   ├── application.css # Application form styles (Faheem Shan)
│   ├── login.css       # Login & Register page styles (Safdil)
│   ├── admin.css       # Admin dashboard styles (Shan M A)
│   └── status.css      # Status tracking styles (Shan M A)
├── js/
│   ├── main.js         # Shared JS utilities
│   ├── home.js         # Landing page JS
│   ├── dashboard.js    # Dashboard page JS (Faheem Shan)
│   ├── application.js  # Application form JS (Faheem Shan)
│   ├── login.js        # Login & Register JS (Safdil)
│   ├── admin.js        # Admin page JS (Shan M A)
│   └── status.js       # Status tracking JS (Shan M A)
├── .gitignore
└── README.md
```

## Development

### Phase 1 - Static Frontend
Plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no libraries, no build tools.
- **Pages** (`pages/`): Individual HTML pages for each feature (login, dashboard, admin, etc.).
  - `index.html` (root) - *Rasal Musthafa*: Complete landing and home page featuring a government header, course category strip, scrolling notifications ticker, detailed candidate portal cards grouped by admission type, and a latest notifications list.
  - `pages/dashboard.html` - *Faheem Shan*: Full student dashboard with profile card, application progress timeline (7-step), quick action cards (admit card, rank card, allotment, documents, option registration, fee payment), important dates calendar, and recent notifications feed.
  - `pages/application.html` - *Faheem Shan*: Complete 6-step multi-step application form with step progress indicator, personal details, academic details, communication details, document upload (drag & drop with preview), fee payment (net banking / debit / credit / UPI), and review & submit sections.
  - `pages/login.html` - *Safdil Arafath*: Candidate login page with Application Number field, Password field with show/hide toggle, client-generated CAPTCHA with noise-line overlay and refresh button, Remember Me checkbox, Forgot Password link, and form-level validation with styled error messages. Simulates login flow with loading state and redirect to dashboard.
  - `pages/register.html` - *Safdil Arafath*: New candidate registration form with Full Name, Date of Birth, Email, Mobile Number (+91 addon), Gender and Category dropdowns, Password with real-time 4-bar strength meter (Weak/Fair/Good/Strong), Confirm Password match check, CAPTCHA verification, Terms & Conditions checkbox, and age validation (15–30). Generates a dummy application number on successful submission.
  - `pages/admin.html` - *Shan M A*: Complete Admin Dashboard with stats overview cards (total, pending, approved), responsive datatable for application management, search/filter functionality, and action buttons to dynamically approve/reject candidates.
  - `pages/status.html` - *Shan M A*: Application status tracking interface where candidates can enter their Application Number and DOB to view a visual timeline progress tracker (Registration -> Form -> Verification -> Payment -> Approval) and read specific remarks from the administration.
- **Components** (`components/`): Shared navbar and footer JS-based includes that inject HTML into `#navbar` and `#footer` on every page via `DOMContentLoaded`. Auto-detects root vs. subpage paths.
- **Shared Styles** (`css/style.css`): CSS reset, design tokens (colors, typography, spacing), and utility classes.
- **Component Styles** (`css/components.css`): Navbar, footer, button system, and form input system styles. See [Shared CSS Classes](#shared-css-classes-ayman-riaz) below.
- **Auth Styles** (`css/login.css`): Login and registration page-specific styles including auth card layout (Flexbox centering), card header with navy gradient and gold accent, CAPTCHA display widget with CSS noise lines, password strength meter bars, alert/notification boxes, responsive breakpoints, and two-column registration grid.
- **Page Styles**: Each page has its own CSS file (`home.css`, `dashboard.css`, `application.css`, `login.css`, `admin.css`, `status.css`) for page-specific rules.
- **Page Scripts**: Each page has its own JS file (`home.js`, `dashboard.js`, `application.js`, `login.js`, `admin.js`, `status.js`) for page-specific interactivity.
- Open `index.html` directly in a browser to preview.

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

## Getting Started

### Prerequisites

- Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari)

### Viewing the Website

No installation or build step needed. You can preview the project in two ways:

1. **Directly in Browser:**
   Open `index.html` directly in your preferred web browser.

2. **Using a Local Server (Recommended):**
   Run any static local server from the project root:
   ```bash
   # Using Python
   python3 -m http.server 3000

   # Or using Node.js npx
   npx serve .
   ```
   Then navigate to `http://localhost:3000` (or the port indicated).

## Team

| Name | Roll Number | Role | Phase 1 Status |
|------|-------------|------|----------------|
| Rasal Musthafa | B24CSA49 | Project setup, Landing page, Home page | ✅ Complete |
| Ayman Riaz | B24CSA17 | Shared components (Navbar, Footer, Button design, Input) | ✅ Complete |
| Faheem Shan | B24CSA20 | Student dashboard page, Application form UI | ✅ Complete |
| Safdil Arafath | B24CSA54 | Login & Registration page, Form validation UI | ✅ Complete |
| Shan M A | B24CSA59 | Admin Panel UI, Application status tracking page | ✅ Complete |

## Course Details

- **Course:** Advanced Web Technologies (AWT) - Project Oriented Course
- **Faculty Guide:** Dr. Reshma Sheikh
- **Department:** Computer Science and Engineering
- **College:** TKM College of Engineering, Kollam
- **Academic Year:** 2026 - 2027

## License

This project is intended for academic use only.
