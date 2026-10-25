/* ============================================================
   APPLICATION.JS — Page-specific JavaScript for application.html
   Author: Faheem Shan
   Dependencies: js/main.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== AUTH GUARD ===== */
  var token = localStorage.getItem('token');
  if (!token) {
    alert('Please sign in to access the KEAM Application form.');
    window.location.href = 'login.html';
    return;
  }

  /* ===== STEP NAVIGATION ===== */
  var currentStep = 0;
  var totalSteps = 6;
  var formSteps = qsa('.form-step');
  var progressItems = qsa('.step-progress__item');
  var btnPrev = qs('#btn-prev');
  var btnNext = qs('#btn-next');
  var btnSubmit = qs('#btn-submit');

  /**
   * Show the specified step and update progress indicator
   * @param {number} stepIndex
   */
  function showStep(stepIndex) {
    // Clamp within valid range
    stepIndex = Math.max(0, Math.min(stepIndex, totalSteps - 1));
    currentStep = stepIndex;

    // Show/hide form step panels
    formSteps.forEach(function (step, i) {
      if (i === currentStep) {
        step.classList.add('form-step--active');
      } else {
        step.classList.remove('form-step--active');
      }
    });

    // Update progress indicator
    progressItems.forEach(function (item, i) {
      item.classList.remove('step-progress__item--active', 'step-progress__item--completed');
      if (i < currentStep) {
        item.classList.add('step-progress__item--completed');
      } else if (i === currentStep) {
        item.classList.add('step-progress__item--active');
      }
    });

    // Update nav buttons
    if (btnPrev) {
      btnPrev.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    }

    if (btnNext && btnSubmit) {
      if (currentStep === totalSteps - 1) {
        btnNext.style.display = 'none';
        btnSubmit.style.display = 'inline-flex';
      } else {
        btnNext.style.display = 'inline-flex';
        btnSubmit.style.display = 'none';
      }
    }

    // If on review step, populate review data
    if (currentStep === totalSteps - 1) {
      populateReview();
    }

    // Scroll to top of form
    var formCard = qs('.form-card');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Navigation button events
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (validateCurrentStep()) {
        showStep(currentStep + 1);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      showStep(currentStep - 1);
    });
  }

  // Step progress indicator click
  progressItems.forEach(function (item, i) {
    var button = qs('.step-progress__button', item);
    if (button) {
      button.addEventListener('click', function () {
        // Only allow navigating to completed steps or the next step
        if (i <= currentStep) {
          showStep(i);
        }
      });
    }
  });

  // Initialize on first step
  showStep(0);


  /* ===== FORM VALIDATION ===== */

  /**
   * Validate the current step's required fields
   * @returns {boolean}
   */
  function validateCurrentStep() {
    var currentPanel = formSteps[currentStep];
    if (!currentPanel) return true;

    var isValid = true;
    var requiredFields = currentPanel.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      var errorEl = field.parentElement.querySelector('.form-error');
      var value = field.value.trim();

      if (!value) {
        isValid = false;
        field.classList.add('form-input--error', 'form-select--error');
        if (errorEl) {
          errorEl.classList.add('form-error--visible');
        }
      } else {
        field.classList.remove('form-input--error', 'form-select--error');
        if (errorEl) {
          errorEl.classList.remove('form-error--visible');
        }
      }
    });

    // Special validation: email format
    var emailField = currentPanel.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value.trim())) {
        isValid = false;
        emailField.classList.add('form-input--error');
        var emailError = emailField.parentElement.querySelector('.form-error');
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address';
          emailError.classList.add('form-error--visible');
        }
      }
    }

    // Special validation: phone number (10 digits)
    var phoneField = currentPanel.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
      var phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneField.value.trim())) {
        isValid = false;
        phoneField.classList.add('form-input--error');
        var phoneError = phoneField.parentElement.querySelector('.form-error');
        if (phoneError) {
          phoneError.textContent = 'Please enter a valid 10-digit mobile number';
          phoneError.classList.add('form-error--visible');
        }
      }
    }

    // Scroll to first error if invalid
    if (!isValid) {
      var firstError = currentPanel.querySelector('.form-input--error, .form-select--error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }

    return isValid;
  }

  // Clear error state on input
  document.addEventListener('input', function (e) {
    if (e.target.matches('.form-input, .form-select, .form-textarea')) {
      e.target.classList.remove('form-input--error', 'form-select--error');
      var errorEl = e.target.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.classList.remove('form-error--visible');
      }
    }
  });


  /* ===== FILE UPLOAD HANDLING ===== */
  var fileUploads = qsa('.file-upload');
  fileUploads.forEach(function (zone) {
    var input = qs('.file-upload__input', zone);
    var preview = qs('.file-upload__preview', zone);
    var previewImg = preview ? qs('img', preview) : null;
    var previewName = preview ? qs('.file-upload__preview-name', preview) : null;

    // Click to open file picker
    zone.addEventListener('click', function (e) {
      if (e.target !== input) {
        input.click();
      }
    });

    // Drag and drop
    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('file-upload--dragover');
    });

    zone.addEventListener('dragleave', function () {
      zone.classList.remove('file-upload--dragover');
    });

    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('file-upload--dragover');
      if (e.dataTransfer.files.length > 0) {
        input.files = e.dataTransfer.files;
        handleFileSelect(input.files[0], preview, previewImg, previewName);
      }
    });

    // File selected via picker
    if (input) {
      input.addEventListener('change', function () {
        if (input.files.length > 0) {
          handleFileSelect(input.files[0], preview, previewImg, previewName);
        }
      });
    }
  });

  /**
   * Handle file selection: show preview if image, show filename otherwise
   */
  function handleFileSelect(file, preview, previewImg, previewName) {
    if (!preview) return;

    preview.classList.add('file-upload__preview--visible');

    if (previewName) {
      previewName.textContent = '✓ ' + file.name + ' (' + formatFileSize(file.size) + ')';
    }

    // Show image preview for image files
    if (previewImg && file.type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else if (previewImg) {
      previewImg.style.display = 'none';
    }
  }

  /**
   * Format file size to human readable string
   */
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }


  /* ===== PAYMENT METHOD SELECTION ===== */
  var paymentMethods = qsa('.payment-method');
  paymentMethods.forEach(function (method) {
    method.addEventListener('click', function () {
      // Remove selected from all
      paymentMethods.forEach(function (m) {
        m.classList.remove('payment-method--selected');
      });
      // Select this one
      method.classList.add('payment-method--selected');
      var radio = qs('.payment-method__radio', method);
      if (radio) radio.checked = true;
    });
  });


  /* ===== REVIEW STEP POPULATION ===== */
  function populateReview() {
    // Personal details
    setReviewValue('review-name', getFieldValue('#full-name'));
    setReviewValue('review-dob', getFieldValue('#dob'));
    setReviewValue('review-gender', getSelectedRadio('gender'));
    setReviewValue('review-category', getSelectText('#category'));
    setReviewValue('review-religion', getSelectText('#religion'));
    setReviewValue('review-nationality', getFieldValue('#nationality'));
    setReviewValue('review-aadhaar', getFieldValue('#aadhaar'));
    setReviewValue('review-father', getFieldValue('#father-name'));
    setReviewValue('review-mother', getFieldValue('#mother-name'));

    // Academic details
    setReviewValue('review-qualifying', getSelectText('#qualifying-exam'));
    setReviewValue('review-board', getSelectText('#board'));
    setReviewValue('review-pass-year', getSelectText('#pass-year'));
    setReviewValue('review-school', getFieldValue('#school-name'));
    setReviewValue('review-marks', getFieldValue('#total-marks'));
    setReviewValue('review-percentage', getFieldValue('#percentage'));

    // Communication details
    setReviewValue('review-address', getFieldValue('#address'));
    setReviewValue('review-district', getSelectText('#district'));
    setReviewValue('review-state', getSelectText('#state'));
    setReviewValue('review-pincode', getFieldValue('#pincode'));
    setReviewValue('review-mobile', getFieldValue('#mobile'));
    setReviewValue('review-email', getFieldValue('#email'));

    // Payment
    var selectedPayment = qs('.payment-method--selected .payment-method__name');
    setReviewValue('review-payment', selectedPayment ? selectedPayment.textContent : 'Not selected');
  }

  function getFieldValue(selector) {
    var el = qs(selector);
    return el ? (el.value.trim() || '—') : '—';
  }

  function getSelectText(selector) {
    var el = qs(selector);
    if (!el) return '—';
    return el.selectedIndex > 0 ? el.options[el.selectedIndex].text : '—';
  }

  function getSelectedRadio(name) {
    var checked = qs('input[name="' + name + '"]:checked');
    return checked ? checked.parentElement.textContent.trim() : '—';
  }

  function setReviewValue(id, value) {
    var el = qs('#' + id);
    if (el) el.textContent = value;
  }

  // Review section edit links — go to specific step
  var editLinks = qsa('.review-section__edit');
  editLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var step = parseInt(this.getAttribute('data-step'));
      if (!isNaN(step)) {
        showStep(step);
      }
    });
  });


  /* ===== PREFILL EXISTING CANDIDATE DATA ===== */
  function prefillCandidateData() {
    try {
      // 1. Check local session first
      var storedCandidate = localStorage.getItem('keam_candidate');
      if (storedCandidate) {
        var candidate = JSON.parse(storedCandidate);
        if (candidate.fullName || candidate.name) {
          var nameInput = qs('#full-name');
          if (nameInput && !nameInput.value) nameInput.value = candidate.fullName || candidate.name;
        }
        if (candidate.dob) {
          var dobInput = qs('#dob');
          if (dobInput && !dobInput.value) dobInput.value = candidate.dob;
        }
        if (candidate.gender) {
          var genderRadio = qs('input[name="gender"][value="' + candidate.gender.toLowerCase() + '"]');
          if (genderRadio) genderRadio.checked = true;
        }
        if (candidate.category) {
          var categorySelect = qs('#category');
          if (categorySelect && !categorySelect.value) {
            categorySelect.value = candidate.category.toLowerCase();
          }
        }
        if (candidate.mobileNumber || candidate.phone || candidate.mobile) {
          var mobileInput = qs('#mobile');
          if (mobileInput && !mobileInput.value) {
            mobileInput.value = candidate.mobileNumber || candidate.phone || candidate.mobile;
          }
        }
        if (candidate.email) {
          var emailInput = qs('#email');
          if (emailInput && !emailInput.value) emailInput.value = candidate.email;
        }
      }

      // 2. Fetch existing application if user is logged in
      var token = localStorage.getItem('token');
      if (token && typeof API !== 'undefined') {
        API.get('/api/application/my-application').then(function (res) {
          if (res && res.success && res.data) {
            var app = res.data;
            if (app.personalDetails) {
              if (app.personalDetails.candidateName) qs('#full-name').value = app.personalDetails.candidateName;
              if (app.personalDetails.dob) qs('#dob').value = app.personalDetails.dob;
              if (app.personalDetails.gender) {
                var g = qs('input[name="gender"][value="' + app.personalDetails.gender.toLowerCase() + '"]');
                if (g) g.checked = true;
              }
              if (app.personalDetails.category) qs('#category').value = app.personalDetails.category.toLowerCase();
              if (app.personalDetails.religion) qs('#religion').value = app.personalDetails.religion.toLowerCase();
              if (app.personalDetails.nationality) qs('#nationality').value = app.personalDetails.nationality;
              if (app.personalDetails.aadhaarNumber) qs('#aadhaar').value = app.personalDetails.aadhaarNumber;
              if (app.personalDetails.fatherName) qs('#father-name').value = app.personalDetails.fatherName;
              if (app.personalDetails.motherName) qs('#mother-name').value = app.personalDetails.motherName;
              if (app.personalDetails.guardianName) qs('#guardian-name').value = app.personalDetails.guardianName;
              if (app.personalDetails.guardianOccupation) qs('#guardian-occupation').value = app.personalDetails.guardianOccupation;
            }
            if (app.academicDetails) {
              if (app.academicDetails.qualifyingExam) qs('#qualifying-exam').value = app.academicDetails.qualifyingExam;
              if (app.academicDetails.board) qs('#board').value = app.academicDetails.board;
              if (app.academicDetails.passYear) qs('#pass-year').value = app.academicDetails.passYear;
              if (app.academicDetails.schoolName) qs('#school-name').value = app.academicDetails.schoolName;
              if (app.academicDetails.schoolDistrict) qs('#school-district').value = app.academicDetails.schoolDistrict;
              if (app.academicDetails.totalMarks) qs('#total-marks').value = app.academicDetails.totalMarks;
              if (app.academicDetails.percentage) qs('#percentage').value = app.academicDetails.percentage;
            }
            if (app.communicationDetails) {
              if (app.communicationDetails.permanentAddress) qs('#address').value = app.communicationDetails.permanentAddress;
              if (app.communicationDetails.district) qs('#district').value = app.communicationDetails.district;
              if (app.communicationDetails.state) qs('#state').value = app.communicationDetails.state;
              if (app.communicationDetails.pincode) qs('#pincode').value = app.communicationDetails.pincode;
              if (app.communicationDetails.mobileNumber) qs('#mobile').value = app.communicationDetails.mobileNumber;
              if (app.communicationDetails.email) qs('#email').value = app.communicationDetails.email;
              if (app.communicationDetails.altPhone) qs('#alt-phone').value = app.communicationDetails.altPhone;
              if (app.communicationDetails.examCenterPref) qs('#exam-center-pref').value = app.communicationDetails.examCenterPref;
            }
          }
        }).catch(function (err) {
          console.warn('Could not fetch existing application:', err);
        });
      }
    } catch (err) {
      console.warn('Error pre-filling data:', err);
    }
  }

  // Run prefill on form load
  prefillCandidateData();


  /* ===== FORM SUBMISSION WITH BACKEND API ===== */
  if (btnSubmit) {
    btnSubmit.addEventListener('click', async function (e) {
      e.preventDefault();

      // Step 1: Check declaration checkbox
      var declaration = qs('#declaration-check');
      if (declaration && !declaration.checked) {
        declaration.focus();
        declaration.parentElement.style.color = 'var(--color-error)';
        setTimeout(function () {
          declaration.parentElement.style.color = '';
        }, 2000);
        return;
      }

      // Step 2: Show loading state on submit button
      var originalSubmitHtml = btnSubmit.innerHTML;
      btnSubmit.innerHTML = 'Submitting Application...';
      btnSubmit.disabled = true;

      // Step 3: Collect Form Data into FormData object
      var formData = new FormData();

      // Personal Details
      formData.append('candidateName', getFieldValue('#full-name'));
      formData.append('dob', getFieldValue('#dob'));
      formData.append('gender', getSelectedRadio('gender'));
      formData.append('category', getSelectText('#category'));
      formData.append('religion', getSelectText('#religion'));
      formData.append('nationality', getFieldValue('#nationality'));
      formData.append('aadhaarNumber', getFieldValue('#aadhaar'));
      formData.append('fatherName', getFieldValue('#father-name'));
      formData.append('motherName', getFieldValue('#mother-name'));
      formData.append('guardianName', getFieldValue('#guardian-name'));
      formData.append('guardianOccupation', getFieldValue('#guardian-occupation'));

      // Academic Details
      formData.append('qualifyingExam', getSelectText('#qualifying-exam'));
      formData.append('board', getSelectText('#board'));
      formData.append('passYear', getSelectText('#pass-year'));
      formData.append('totalMarks', getFieldValue('#total-marks'));
      formData.append('percentage', getFieldValue('#percentage'));
      formData.append('schoolName', getFieldValue('#school-name'));
      formData.append('schoolDistrict', getSelectText('#school-district'));

      var subjectCheckboxes = qsa('input[name="subjects"]:checked');
      subjectCheckboxes.forEach(function (cb) {
        formData.append('subjects', cb.value);
      });

      // Communication Details
      formData.append('permanentAddress', getFieldValue('#address'));
      formData.append('district', getSelectText('#district'));
      formData.append('state', getSelectText('#state'));
      formData.append('pincode', getFieldValue('#pincode'));
      formData.append('mobileNumber', getFieldValue('#mobile'));
      formData.append('email', getFieldValue('#email'));
      formData.append('altPhone', getFieldValue('#alt-phone'));
      formData.append('examCenterPref', getSelectText('#exam-center-pref'));

      // Payment Details
      var selectedPayment = qs('.payment-method--selected .payment-method__name');
      formData.append('paymentMethod', selectedPayment ? selectedPayment.textContent.trim() : 'Net Banking');
      formData.append('amount', '800');

      // Document Files
      var photoInput = qs('#photo-input');
      if (photoInput && photoInput.files && photoInput.files[0]) {
        formData.append('photo', photoInput.files[0]);
      }
      var signatureInput = qs('#signature-input');
      if (signatureInput && signatureInput.files && signatureInput.files[0]) {
        formData.append('signature', signatureInput.files[0]);
      }
      var sslcInput = qs('#sslc-input');
      if (sslcInput && sslcInput.files && sslcInput.files[0]) {
        formData.append('sslc', sslcInput.files[0]);
        formData.append('certificate', sslcInput.files[0]);
      }
      var plus2Input = qs('#plus2-input');
      if (plus2Input && plus2Input.files && plus2Input.files[0]) {
        formData.append('plus2', plus2Input.files[0]);
      }
      var communityInput = qs('#community-input');
      if (communityInput && communityInput.files && communityInput.files[0]) {
        formData.append('community', communityInput.files[0]);
      }
      var incomeInput = qs('#income-input');
      if (incomeInput && incomeInput.files && incomeInput.files[0]) {
        formData.append('income', incomeInput.files[0]);
      }

      // Step 4: Submit via API or fallback gracefully
      var appNumber = '-';
      var candidateUser = null;
      try {
        var stored = localStorage.getItem('keam_candidate');
        if (stored) {
          candidateUser = JSON.parse(stored);
          appNumber = candidateUser.applicationNo || candidateUser.applicationNumber || candidateUser.appNo || '-';
        }
      } catch (e) {}

      try {
        var token = localStorage.getItem('token');
        var response = null;

        if (token && typeof API !== 'undefined') {
          response = await API.upload('/api/application/submit', formData);
        }

        if (response && response.success && response.data) {
          // Live API succeeded
          var appData = response.data;
          appNumber = appData.applicationNumber || appNumber;
          localStorage.setItem('keam_application', JSON.stringify(appData));

          // Advance timeline and status in local candidate session
          if (candidateUser) {
            candidateUser.currentStep = 4;
            candidateUser.status = 'Submitted';
            localStorage.setItem('keam_candidate', JSON.stringify(candidateUser));
          }
        } else {
          // Offline / Client demo fallback
          var offlineApp = {
            applicationNumber: appNumber !== '-' ? appNumber : '26' + Math.floor(10000 + Math.random() * 90000),
            status: 'Submitted',
            currentStep: 4,
            personalDetails: {
              candidateName: getFieldValue('#full-name'),
              dob: getFieldValue('#dob'),
              gender: getSelectedRadio('gender'),
              category: getSelectText('#category'),
              fatherName: getFieldValue('#father-name'),
              motherName: getFieldValue('#mother-name')
            },
            paymentDetails: {
              amount: 800,
              status: 'Paid',
              transactionId: 'TXN' + Date.now()
            }
          };
          appNumber = offlineApp.applicationNumber;
          localStorage.setItem('keam_application', JSON.stringify(offlineApp));
          if (candidateUser) {
            candidateUser.currentStep = 4;
            candidateUser.status = 'Submitted';
            localStorage.setItem('keam_candidate', JSON.stringify(candidateUser));
          }
        }
      } catch (err) {
        console.warn('Network upload failed, using local persistence:', err);
        if (candidateUser) {
          candidateUser.currentStep = 4;
          candidateUser.status = 'Submitted';
          localStorage.setItem('keam_candidate', JSON.stringify(candidateUser));
        }
      } finally {
        // Step 5: Show success modal with application number
        btnSubmit.innerHTML = originalSubmitHtml;
        btnSubmit.disabled = false;

        var modal = qs('#success-modal');
        var appNoDisplay = qs('#modal-app-no');
        if (appNoDisplay) {
          appNoDisplay.textContent = appNumber !== '-' ? appNumber : 'KEAM2026';
        }
        if (modal) {
          modal.classList.add('modal-overlay--visible');
        }
      }
    });
  }

  // Modal close
  var modalCloseBtn = qs('#modal-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function (e) {
      var modal = qs('#success-modal');
      if (modal) {
        modal.classList.remove('modal-overlay--visible');
      }
    });
  }


  /* ===== DATE/TIME UPDATE ===== */
  var datetimeEl = qs('#current-datetime');
  if (datetimeEl) {
    datetimeEl.textContent = formatDateTime(new Date());
    setInterval(function () {
      datetimeEl.textContent = formatDateTime(new Date());
    }, 1000);
  }

});
