# Faheem Shan - README

## Profile
- **Name:** Faheem Shan
- **Roll Number:** B24CSA20
- **Role:** Dashboard & Application Form

## My Work
I built the Student Dashboard (`dashboard.html`) and the 6-step Application Form (`application.html`). The dashboard shows student profile info, a progress timeline, and a live clock. The application form handles validation, drag-and-drop file uploads, and a final review summary.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `textContent` | Injects mock candidate data into the profile card |
| `classList.add/remove` | Marks timeline steps as completed or active |
| `setInterval` | Updates the live clock every 1 second |
| `createElement` | Dynamically creates a `<style>` tag for badge animation |
| `querySelectorAll('[required]')` | Finds all required fields for validation |
| Regex | Validates email and phone number formats |
| `FileReader.readAsDataURL` | Shows image preview without server upload |
| `scrollIntoView` | Scrolls to first error or top of form on step change |
| `style.display` | Toggles Next/Submit buttons based on current step |

## DOM Flow -- application.js

```
Page Loads
    |
    v
Show step 0 (first panel)
    |
    v
User clicks Next
    |
    v
Validate current step fields
    |
    +-- All fields valid? --+
    |                       |
   NO                      YES
    |                       |
 Show errors          Go to next step
 Scroll to error      Update progress bar
                            |
                            v
                    +-- Last step? --+
                    |                |
                   YES               NO
                    |                |
              Show review       Wait for
              summary           next click
```

## DOM Flow -- dashboard.js

```
Page Loads
    |
    v
Inject mock data into profile card via textContent
    |
    v
Loop through timeline steps
    |
    +-- step < currentStep? --> mark completed (green)
    +-- step = currentStep? --> mark active (highlighted)
    +-- step > currentStep? --> leave grey
    |
    v
Start live clock (setInterval every 1s)
    |
    v
Inject @keyframes animation for badges
    |
    v
Done
```

## File Dependencies

```
style.css --> components.css --> dashboard.css ----> dashboard.html
                             --> application.css --> application.html
main.js   --> dashboard.js  ----------------------> dashboard.html
          --> application.js ---------------------> application.html
navbar.js & footer.js --------> both pages
```
