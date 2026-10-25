// frontend/src/components/common/Footer.jsx
// Shared Footer Component (Matching Ayman's components/footer.js exactly)
// Author: Ayman Riaz (B24CSA17) | React Migration: Rasal Musthafa

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer">
        <div className="footer__grid">
          {/* Column 1: Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Candidate Dashboard</Link></li>
              <li><Link to="/application">Application Form</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
              <li><Link to="/status">Application Status</Link></li>
            </ul>
          </div>

          {/* Column 2: Contact Information */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>0471-2525300 / 2338487</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span>caborhelp@cee.kerala.gov.in</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>
                Office of the Commissioner for Entrance Examinations,<br />
                Housing Board Buildings, Santhi Nagar,<br />
                Thiruvananthapuram - 695001
              </span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span>Mon - Sat: 10:00 AM - 5:00 PM</span>
            </div>
          </div>

          {/* Column 3: Important Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Important Portals</h4>
            <ul className="footer__list">
              <li><a href="https://kerala.gov.in" target="_blank" rel="noopener noreferrer">Government of Kerala</a></li>
              <li><a href="https://highereducation.kerala.gov.in" target="_blank" rel="noopener noreferrer">Higher Education Dept.</a></li>
              <li><a href="https://dtekerala.gov.in" target="_blank" rel="noopener noreferrer">Directorate of Technical Education</a></li>
              <li><a href="https://dme.kerala.gov.in" target="_blank" rel="noopener noreferrer">Directorate of Medical Education</a></li>
              <li><a href="https://cee.kerala.gov.in" target="_blank" rel="noopener noreferrer">CEE Official Website</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer / Academic notice */}
        <div className="footer__disclaimer">
          <p>
            <strong>Disclaimer:</strong> This website is an <em>academic project clone</em> created for educational purposes
            as part of the Application Web Technology coursework. It is <strong>not</strong> the official portal of CEE Kerala.
            For official information, visit <a href="https://cee.kerala.gov.in" target="_blank" rel="noopener noreferrer">cee.kerala.gov.in</a>.
          </p>
        </div>

        {/* Copyright bar */}
        <div className="footer__bottom">
          <p>&copy; {year} Commissioner for Entrance Examinations, Kerala. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Hyperlink Policy</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
