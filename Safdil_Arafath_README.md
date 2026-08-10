# Safdil Arafath - README

## Profile
- **Name:** Safdil Arafath
- **Roll Number:** B24CSA54
- **Role:** Login & Registration Pages

## My Work
I built the Login and Registration pages (`login.html` & `register.html`). My pages include a random CAPTCHA generator, a 4-tier password strength meter, togglable password visibility, and full form validation -- all in pure JavaScript with no external libraries.

## JS & DOM Concepts Used

| Concept | How I Used It |
|---------|---------------|
| `Math.random()` | Generates random 5-character CAPTCHA strings |
| `setAttribute('data-captcha')` | Stores CAPTCHA answer on the DOM element |
| `input.type` swap | Toggles password field between text and password |
| `input` event listener | Evaluates password strength in real-time as user types |
| Regex | Checks for uppercase, digits, symbols, and length |
| `classList.add('active')` | Lights up strength meter bars based on score |
| `preventDefault()` | Intercepts form submit for client-side validation |
| `setTimeout` | Simulates server processing delay |
| `window.location.href` | Redirects to dashboard after successful login |

## DOM Flow

```
Page Loads
    |
    v
Generate random CAPTCHA, store in data-captcha
    |
    v
User types password --> strength meter updates live
    |
    v
User submits form
    |
    v
preventDefault() intercepts
    |
    v
+-- Fields empty? --+
|                    |
YES                  NO
|                    |
Show errors    +-- Email/password valid? --+
               |                           |
              NO                          YES
               |                           |
          Show errors        +-- CAPTCHA match? --+
                             |                    |
                            NO                   YES
                             |                    |
                        Regenerate          Show loading spinner
                        CAPTCHA             --> setTimeout delay
                                            --> Redirect to dashboard
```

## File Dependencies

```
style.css --> components.css --> login.css --> login.html & register.html
main.js   --> login.js  ----------------------^
navbar.js ---------------------------------->|
footer.js ---------------------------------->|
```
