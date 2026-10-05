// js/api.js
// Shared Frontend API Client - Ayman Riaz (B24CSA17)
// Provides a clean, reusable HTTP client for all pages to call backend APIs

/**
 * API - A simple object with methods for making HTTP requests to the backend.
 *
 * Why this exists:
 * - Every page needs to call the backend (login, submit application, etc.)
 * - Instead of writing fetch() calls with headers in every JS file,
 *   teammates can just use API.get(), API.post(), etc.
 * - Automatically attaches the JWT token from localStorage to every request
 * - Automatically handles 401 (expired/invalid token) by logging the user out
 *
 * Usage examples:
 *   const data = await API.get('/api/application/my-application');
 *   const result = await API.post('/api/auth/login', { email, password });
 */

const API = (() => {
  // Base URL for all API calls (targets port 5000 if opened on Live Server or alternate port)
  const BASE_URL = (typeof window !== 'undefined' && window.location.port && window.location.port !== '5000' && window.location.protocol.startsWith('http'))
    ? 'http://localhost:5000'
    : '';

  /**
   * getToken - Retrieves the saved JWT token from browser localStorage.
   * Returns the token string, or null if the user is not logged in.
   */
  function getToken() {
    return localStorage.getItem('token');
  }

  /**
   * isSubpage - Checks if the current page is inside the /pages/ folder.
   * This is needed so we redirect to the correct login.html path on 401.
   * Example: pages/dashboard.html → true, index.html → false
   */
  function isSubpage() {
    return window.location.pathname.includes('/pages/');
  }

  /**
   * handleUnauthorized - Called when the server returns 401.
   * Clears saved user data and redirects to the login page.
   * This ensures the user is forced to log in again with a fresh token.
   */
  function handleUnauthorized() {
    localStorage.removeItem('token');
    localStorage.removeItem('candidate');
    localStorage.removeItem('keam_candidate');
    // Redirect to login page (path depends on current page location)
    if (isSubpage()) {
      window.location.href = 'login.html';
    } else {
      window.location.href = 'pages/login.html';
    }
  }

  /**
   * handleResponse - Processes the fetch response.
   * - If status is 401 and user was logged in, triggers auto-logout
   * - Otherwise, parses and returns the JSON data
   *
   * @param {Response} response - The fetch Response object
   * @returns {Object} - The parsed JSON response body
   */
  async function handleResponse(response) {
    if (response.status === 401 && getToken()) {
      handleUnauthorized();
      return { success: false, message: 'Session expired. Please log in again.' };
    }
    // Parse JSON body from the response
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      return { success: false, message: 'Failed to parse server response.' };
    }
  }

  /**
   * get - Sends a GET request to the given URL.
   * Used for fetching data (applications, dashboard info, etc.)
   *
   * @param {string} url - The API endpoint (e.g. '/api/application/my-application')
   * @returns {Object} - The server's JSON response
   */
  async function get(url) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() ? 'Bearer ' + getToken() : '',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API GET Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  /**
   * post - Sends a POST request with JSON data in the body.
   * Used for creating new records (register, login, submit application, etc.)
   *
   * @param {string} url - The API endpoint (e.g. '/api/auth/register')
   * @param {Object} data - The request body as a plain JS object
   * @returns {Object} - The server's JSON response
   */
  async function post(url, data) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() ? 'Bearer ' + getToken() : '',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API POST Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  /**
   * put - Sends a PUT request with JSON data in the body.
   * Used for updating existing records (edit profile, update status, etc.)
   *
   * @param {string} url - The API endpoint (e.g. '/api/admin/applications/123/status')
   * @param {Object} data - The updated data as a plain JS object
   * @returns {Object} - The server's JSON response
   */
  async function put(url, data) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() ? 'Bearer ' + getToken() : '',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API PUT Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  /**
   * upload - Sends a POST request with FormData (for file uploads).
   * Used when candidates upload documents (photo, certificates, etc.)
   *
   * Note: We do NOT set Content-Type header here on purpose.
   * The browser automatically sets it to 'multipart/form-data' with
   * the correct boundary string when sending FormData.
   *
   * @param {string} url - The API endpoint (e.g. '/api/application/submit')
   * @param {FormData} formData - The FormData object containing files and fields
   * @returns {Object} - The server's JSON response
   */
  async function upload(url, formData) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          // No Content-Type here! Browser sets multipart boundary automatically
          Authorization: getToken() ? 'Bearer ' + getToken() : '',
        },
        body: formData,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API Upload Error:', error);
      return { success: false, message: 'Upload failed. Please try again.' };
    }
  }

  // Expose the public methods
  return { get, post, put, upload };
})();
