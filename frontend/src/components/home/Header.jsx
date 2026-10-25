// frontend/src/components/home/Header.jsx
// Official Government Portal Title Component
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 10-13 (Functional Components & Clean JSX)

import React from 'react';

function Header() {
  return (
    <section className="portal-title">
      <div className="container">
        <img
          src="/assets/logo.png"
          alt="CEE Kerala Emblem"
          className="portal-title__emblem"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="portal-title__text">
          <h1>Office of the Commissioner for Entrance Examinations</h1>
          <p className="subtitle">Candidate Portal - Kerala Entrance Examination System</p>
        </div>
      </div>
    </section>
  );
}

export default Header;
