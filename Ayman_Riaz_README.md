# Ayman Riaz - README

## Profile
- **Name:** Ayman Riaz
- **Roll Number:** B24CSA17
- **Role:** Shared Components (Navbar & Footer)

## My Work
I built the reusable Navbar (`navbar.js`) and Footer (`footer.js`) components that get injected into every page via JavaScript. This avoids duplicating HTML across files. I also styled the global form inputs and buttons in `components.css`.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| IIFE | Wraps navbar logic to avoid polluting global scope |
| `getElementById` | Finds the `#navbar` container element |
| `window.location.pathname` | Detects if user is in root or subfolder |
| `innerHTML` | Injects the full navbar HTML into the container |
| `classList.toggle` | Shows/hides mobile menu on hamburger click |
| `setAttribute` | Updates `aria-expanded` for accessibility |
| `contains()` | Detects clicks outside navbar to auto-close menu |

## DOM Flow

```
Script loads (IIFE runs)
    |
    v
Find #navbar element
    |
    +-- Found? --+
    |             |
   NO            YES
    |             |
 stop         Check URL path
              |
              +-- In subfolder? --+
              |                   |
             YES                  NO
              |                   |
        prefix = '../'     prefix = 'pages/'
              |                   |
              +-------------------+
              |
              v
        Build HTML string with links
              |
              v
        navbar.innerHTML = HTML
              |
              v
        Attach hamburger click listener
              |
              v
          Done
```

## File Dependencies

```
style.css --> components.css --> All .html pages
navbar.js ----------------------^
footer.js ----------------------|
```
