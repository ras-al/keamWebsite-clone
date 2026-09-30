/* ============================================================
   LOGIN.JS — Login & Registration page interactivity
   Author: Safdil Arafath (B24CSA54)
   Dependencies: js/main.js must be loaded first.

   Features:
   1. Captcha generation & validation
   2. Client-side form validation (login & register)
   3. Password visibility toggle
   4. Password strength meter (registration)
   5. Form submission handling with UI feedback
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================================
       1. CAPTCHA GENERATOR
       ========================================================== */

    /**
     * Generates a random alphanumeric captcha string.
     * Uses uppercase letters and digits, avoids ambiguous chars (0/O, 1/I/l).
     * @param {number} length - Number of captcha characters
     * @returns {string} The generated captcha code
     */
    function generateCaptcha(length) {
      var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    /**
     * Renders captcha text into the display element and stores
     * the current code in a data attribute for later validation.
     * @param {HTMLElement} displayEl - The captcha display container
     */
    function renderCaptcha(displayEl) {
      if (!displayEl) return;
      var code = generateCaptcha(5);
      displayEl.textContent = code;
      displayEl.setAttribute('data-captcha', code);
    }

    // --- Initialize captcha on login page ---
    var loginCaptchaDisplay = qs('#captcha-display');
    var loginCaptchaRefresh = qs('#captcha-refresh');

    if (loginCaptchaDisplay) {
      renderCaptcha(loginCaptchaDisplay);
    }

    if (loginCaptchaRefresh) {
      loginCaptchaRefresh.addEventListener('click', function () {
        renderCaptcha(loginCaptchaDisplay);
        // Spin animation
        loginCaptchaRefresh.classList.add('is-spinning');
        setTimeout(function () {
          loginCaptchaRefresh.classList.remove('is-spinning');
        }, 500);
        // Clear captcha input
        var captchaInput = qs('#login-captcha');
        if (captchaInput) {
          captchaInput.value = '';
          clearFieldError(captchaInput, qs('#login-captcha-error'));
        }
      });
    }

    // --- Initialize captcha on register page ---
    var regCaptchaDisplay = qs('#reg-captcha-display');
    var regCaptchaRefresh = qs('#reg-captcha-refresh');

    if (regCaptchaDisplay) {
      renderCaptcha(regCaptchaDisplay);
    }

    if (regCaptchaRefresh) {
      regCaptchaRefresh.addEventListener('click', function () {
        renderCaptcha(regCaptchaDisplay);
        regCaptchaRefresh.classList.add('is-spinning');
        setTimeout(function () {
          regCaptchaRefresh.classList.remove('is-spinning');
        }, 500);
        var captchaInput = qs('#reg-captcha');
        if (captchaInput) {
          captchaInput.value = '';
          clearFieldError(captchaInput, qs('#reg-captcha-error'));
        }
      });
    }


    /* ==========================================================
       2. PASSWORD VISIBILITY TOGGLE
       ========================================================== */

    /**
     * Sets up a password show/hide toggle button.
     * Swaps the input type between 'password' and 'text'
     * and updates the toggle icon (eye vs eye-off).
     * @param {string} toggleId - The ID of the toggle button
     * @param {string} inputId  - The ID of the password input
     */
    function setupPasswordToggle(toggleId, inputId) {
      var toggleBtn = qs('#' + toggleId);
      var input = qs('#' + inputId);
      if (!toggleBtn || !input) return;

      var eyeOpenSVG =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>' +
        '<circle cx="12" cy="12" r="3"/>' +
        '</svg>';

      var eyeClosedSVG =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>' +
        '<line x1="1" y1="1" x2="23" y2="23"/>' +
        '</svg>';

      toggleBtn.addEventListener('click', function () {
        var isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.innerHTML = isPassword ? eyeClosedSVG : eyeOpenSVG;
        toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    }

    // Wire up all password toggles
    setupPasswordToggle('login-pwd-toggle', 'login-password');
    setupPasswordToggle('reg-pwd-toggle', 'reg-password');
    setupPasswordToggle('reg-cpwd-toggle', 'reg-confirm-password');


    /* ==========================================================
       3. PASSWORD STRENGTH METER (Registration only)
       ========================================================== */

    var regPasswordInput = qs('#reg-password');
    var strengthBars = qsa('.password-strength__bar');
    var strengthText = qs('#reg-pwd-strength-text');

    /**
     * Evaluates the strength of a password string.
     * Returns a score from 0 (empty) to 4 (strong) based on:
     * - Length ≥ 8
     * - Contains lowercase letter
     * - Contains uppercase letter
     * - Contains digit
     * - Contains special character
     * @param {string} password - The password to evaluate
     * @returns {{ score: number, label: string, className: string }}
     */
    function evaluatePasswordStrength(password) {
      if (!password) return { score: 0, label: '', className: '' };

      var score = 0;
      if (password.length >= 8) score++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[^a-zA-Z0-9]/.test(password)) score++;

      var levels = [
        { label: '',         className: '' },
        { label: 'Weak',     className: 'strength-weak' },
        { label: 'Fair',     className: 'strength-fair' },
        { label: 'Good',     className: 'strength-good' },
        { label: 'Strong',   className: 'strength-strong' }
      ];

      return {
        score: score,
        label: levels[score].label,
        className: levels[score].className
      };
    }

    /**
     * Updates the strength meter UI bars and text label.
     * @param {number} score     - Strength score (0-4)
     * @param {string} label     - Human-readable strength label
     * @param {string} className - CSS class for color
     */
    function updateStrengthUI(score, label, className) {
      if (!strengthBars.length || !strengthText) return;

      strengthBars.forEach(function (bar, index) {
        // Remove all strength classes
        bar.classList.remove('is-active', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
        if (index < score) {
          bar.classList.add('is-active', className);
        }
      });

      strengthText.textContent = label;
      strengthText.className = 'password-strength-text';
      if (className) {
        strengthText.classList.add(className);
      }
    }

    if (regPasswordInput) {
      regPasswordInput.addEventListener('input', function () {
        var result = evaluatePasswordStrength(regPasswordInput.value);
        updateStrengthUI(result.score, result.label, result.className);
      });
    }


    /* ==========================================================
       4. FORM VALIDATION HELPERS
       ========================================================== */

    /**
     * Shows a validation error for a specific field.
     * Adds the error border class and sets the error message text.
     * @param {HTMLElement} inputEl - The input element
     * @param {HTMLElement} errorEl - The error message span
     * @param {string} message     - The error message to display
     */
    function showFieldError(inputEl, errorEl, message) {
      if (inputEl) inputEl.classList.add('form-input--error');
      if (errorEl) errorEl.textContent = message;
    }

    /**
     * Clears the validation error for a specific field.
     * Removes the error border class and clears the error text.
     * @param {HTMLElement} inputEl - The input element
     * @param {HTMLElement} errorEl - The error message span
     */
    function clearFieldError(inputEl, errorEl) {
      if (inputEl) inputEl.classList.remove('form-input--error');
      if (errorEl) errorEl.textContent = '';
    }

    /**
     * Shows a page-level alert with a specific type and message.
     * @param {string} alertId - The ID of the alert container
     * @param {string} textId  - The ID of the alert text span
     * @param {string} type    - Alert type: 'error', 'success', or 'info'
     * @param {string} message - The message to display
     */
    function showAlert(alertId, textId, type, message) {
      var alertEl = qs('#' + alertId);
      var textEl = qs('#' + textId);
      if (!alertEl || !textEl) return;

      // Remove all type classes
      alertEl.classList.remove('auth-alert--error', 'auth-alert--success', 'auth-alert--info');
      alertEl.classList.add('auth-alert--' + type, 'is-visible');
      textEl.textContent = message;
    }

    /**
     * Hides the page-level alert.
     * @param {string} alertId - The ID of the alert container
     */
    function hideAlert(alertId) {
      var alertEl = qs('#' + alertId);
      if (alertEl) alertEl.classList.remove('is-visible');
    }

    /**
     * Validates an email address using a standard regex pattern.
     * @param {string} email - The email string to validate
     * @returns {boolean} True if valid email format
     */
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Validates a 10-digit Indian mobile number.
     * @param {string} mobile - The mobile number string
     * @returns {boolean} True if valid 10-digit mobile
     */
    function isValidMobile(mobile) {
      return /^[6-9]\d{9}$/.test(mobile);
    }

    /* Clear field errors on input (real-time feedback) */
    qsa('.form-input, .form-select').forEach(function (el) {
      el.addEventListener('input', function () {
        var errorSpan = el.closest('.form-group, .captcha-group')
          ? el.closest('.form-group, .captcha-group').querySelector('.form-error')
          : null;
        clearFieldError(el, errorSpan);
      });
    });


    /* ==========================================================
       5. LOGIN FORM SUBMISSION
       ========================================================== */

    var loginForm = qs('#login-form');

    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAlert('login-alert');

        var appNo = qs('#login-appno');
        var password = qs('#login-password');
        var captchaInput = qs('#login-captcha');
        var isValid = true;

        // Validate Application Number
        if (!appNo.value.trim()) {
          showFieldError(appNo, qs('#login-appno-error'), 'Application number is required.');
          isValid = false;
        } else if (appNo.value.trim().length < 5) {
          showFieldError(appNo, qs('#login-appno-error'), 'Enter a valid application number.');
          isValid = false;
        }

        // Validate Password
        if (!password.value) {
          showFieldError(password, qs('#login-password-error'), 'Password is required.');
          isValid = false;
        } else if (password.value.length < 6) {
          showFieldError(password, qs('#login-password-error'), 'Password must be at least 6 characters.');
          isValid = false;
        }

        // Validate Captcha
        if (loginCaptchaDisplay) {
          var expectedCaptcha = loginCaptchaDisplay.getAttribute('data-captcha');
          if (!captchaInput.value.trim()) {
            showFieldError(captchaInput, qs('#login-captcha-error'), 'Please enter the captcha code.');
            isValid = false;
          } else if (captchaInput.value.trim().toUpperCase() !== expectedCaptcha) {
            showFieldError(captchaInput, qs('#login-captcha-error'), 'Captcha does not match. Please try again.');
            renderCaptcha(loginCaptchaDisplay);
            captchaInput.value = '';
            isValid = false;
          }
        }

        if (!isValid) {
          showAlert('login-alert', 'login-alert-text', 'error', 'Please fix the errors below and try again.');
          return;
        }

        // --- Simulate login (no backend in Phase 1) ---
        var submitBtn = qs('#login-submit');
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.textContent = 'Sign In';
          submitBtn.disabled = false;

          // Demo: show success and redirect
          showAlert('login-alert', 'login-alert-text', 'success',
            'Login successful! Redirecting to dashboard...');

          setTimeout(function () {
            window.location.href = 'dashboard.html';
          }, 1500);
        }, 1200);
      });
    }


    /* ==========================================================
       6. REGISTRATION FORM SUBMISSION
       ========================================================== */

    var registerForm = qs('#register-form');

    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAlert('register-alert');

        var fullname = qs('#reg-fullname');
        var dob = qs('#reg-dob');
        var email = qs('#reg-email');
        var mobile = qs('#reg-mobile');
        var gender = qs('#reg-gender');
        var category = qs('#reg-category');
        var password = qs('#reg-password');
        var confirmPassword = qs('#reg-confirm-password');
        var captchaInput = qs('#reg-captcha');
        var terms = qs('#reg-terms');
        var isValid = true;

        // Full Name
        if (!fullname.value.trim()) {
          showFieldError(fullname, qs('#reg-fullname-error'), 'Full name is required.');
          isValid = false;
        } else if (fullname.value.trim().length < 3) {
          showFieldError(fullname, qs('#reg-fullname-error'), 'Name must be at least 3 characters.');
          isValid = false;
        }

        // Date of Birth
        if (!dob.value) {
          showFieldError(dob, qs('#reg-dob-error'), 'Date of birth is required.');
          isValid = false;
        } else {
          var dobDate = new Date(dob.value);
          var today = new Date();
          var age = today.getFullYear() - dobDate.getFullYear();
          if (age < 15 || age > 30) {
            showFieldError(dob, qs('#reg-dob-error'), 'Age must be between 15 and 30 years.');
            isValid = false;
          }
        }

        // Email
        if (!email.value.trim()) {
          showFieldError(email, qs('#reg-email-error'), 'Email is required.');
          isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
          showFieldError(email, qs('#reg-email-error'), 'Enter a valid email address.');
          isValid = false;
        }

        // Mobile
        if (!mobile.value.trim()) {
          showFieldError(mobile, qs('#reg-mobile-error'), 'Mobile number is required.');
          isValid = false;
        } else if (!isValidMobile(mobile.value.trim())) {
          showFieldError(mobile, qs('#reg-mobile-error'), 'Enter a valid 10-digit mobile number.');
          isValid = false;
        }

        // Gender
        if (!gender.value) {
          showFieldError(gender, qs('#reg-gender-error'), 'Please select your gender.');
          isValid = false;
        }

        // Category
        if (!category.value) {
          showFieldError(category, qs('#reg-category-error'), 'Please select your category.');
          isValid = false;
        }

        // Password
        if (!password.value) {
          showFieldError(password, qs('#reg-password-error'), 'Password is required.');
          isValid = false;
        } else if (password.value.length < 8) {
          showFieldError(password, qs('#reg-password-error'), 'Password must be at least 8 characters.');
          isValid = false;
        } else {
          var strength = evaluatePasswordStrength(password.value);
          if (strength.score < 2) {
            showFieldError(password, qs('#reg-password-error'), 'Password is too weak. Add uppercase, numbers, or symbols.');
            isValid = false;
          }
        }

        // Confirm Password
        if (!confirmPassword.value) {
          showFieldError(confirmPassword, qs('#reg-confirm-password-error'), 'Please confirm your password.');
          isValid = false;
        } else if (confirmPassword.value !== password.value) {
          showFieldError(confirmPassword, qs('#reg-confirm-password-error'), 'Passwords do not match.');
          isValid = false;
        }

        // Captcha
        if (regCaptchaDisplay) {
          var expectedCaptcha = regCaptchaDisplay.getAttribute('data-captcha');
          if (!captchaInput.value.trim()) {
            showFieldError(captchaInput, qs('#reg-captcha-error'), 'Please enter the captcha code.');
            isValid = false;
          } else if (captchaInput.value.trim().toUpperCase() !== expectedCaptcha) {
            showFieldError(captchaInput, qs('#reg-captcha-error'), 'Captcha does not match.');
            renderCaptcha(regCaptchaDisplay);
            captchaInput.value = '';
            isValid = false;
          }
        }

        // Terms
        if (!terms.checked) {
          showFieldError(terms, qs('#reg-terms-error'), 'You must agree to the terms and conditions.');
          isValid = false;
        }

        if (!isValid) {
          showAlert('register-alert', 'register-alert-text', 'error', 'Please fix the errors highlighted below.');
          // Scroll to top of form to show alert
          qs('.auth-card__body').scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        // --- Simulate registration (no backend in Phase 1) ---
        var submitBtn = qs('#register-submit');
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.textContent = 'Create Account';
          submitBtn.disabled = false;

          // Generate a dummy application number
          var appNumber = 'KEAM2026' + Math.floor(10000 + Math.random() * 90000);

          showAlert('register-alert', 'register-alert-text', 'success',
            'Registration successful! Your Application Number is: ' + appNumber +
            '. Redirecting to login...');

          setTimeout(function () {
            window.location.href = 'login.html';
          }, 3000);
        }, 1500);
      });
    }


    /* ==========================================================
       7. FORGOT PASSWORD LINK (simple demo modal)
       ========================================================== */

    var forgotLink = qs('#forgot-password-link');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        var appNo = prompt('Enter your registered Application Number to receive a password reset link:');
        if (appNo && appNo.trim()) {
          showAlert('login-alert', 'login-alert-text', 'info',
            'Password reset link sent to the email associated with ' + appNo.trim() + '.');
        }
      });
    }

  }); // end DOMContentLoaded
})();
