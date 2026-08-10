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
