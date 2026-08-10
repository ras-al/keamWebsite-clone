# Shan M A - README

## Profile
- **Name:** Shan M A
- **Roll Number:** B24CSA59
- **Role:** Admin Panel & Status Tracking

## My Work
I built the Admin Panel (`admin.html`) for managing applications and the Status Tracking page (`status.html`) for applicants to check their progress. The admin page features a searchable data table built entirely from mock JSON data, and the status page renders a dynamic approval timeline.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| Template Literals | Builds multi-line HTML table rows from data objects |
| `Array.filter()` | Filters applications based on search input |
| `innerHTML = ''` | Clears old table rows before re-rendering |
| `forEach` | Loops through data to build and insert new rows |
| `window.updateStatus` | Binds functions to window for inline onclick handlers |
| `keyup` listener | Triggers search filter as user types |
| `e.key === 'Enter'` | Handles Enter key press in search input |

## DOM Flow

```
Page Loads
    |
    v
Create mock JSON array of applications
    |
    v
Build HTML table rows via template literals
    |
    v
Inject rows into tbody via innerHTML
    |
    v
User types in search box
    |
    v
keyup listener fires
    |
    v
Array.filter() on data
    |
    +-- name/number matches query? --+
    |                                |
   YES                               NO
    |                                |
 keep in results               exclude
    |                                |
    +--------------------------------+
    |
    v
Clear tbody, rebuild rows from filtered results
    |
    v
Done
```

## File Dependencies

```
style.css --> components.css --> admin.css / status.css --> admin.html & status.html
main.js   --> admin.js  ---------------------------------->^
          --> status.js ----------------------------------->|
navbar.js & footer.js ---------------------------------->|
```
