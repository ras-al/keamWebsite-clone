// frontend/src/components/common/GovtBand.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GovtBand() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = days[now.getDay()];
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      setCurrentDateTime(`${day}, ${dd}-${mm}-${yyyy} ${hh}:${min}:${sec}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="govt-band">
      <div className="container">
        <span className="govt-band__label">Government of Kerala</span>
        <div className="govt-band__links">
          <span id="current-datetime" style={{ color: 'var(--color-gold-light)', marginRight: '0.75rem' }}>
            {currentDateTime}
          </span>
          <Link to="/">Home</Link>
          <Link to="/status">Track Status</Link>
          <a href="#helpline">Helpline &amp; Contact</a>
          <Link to="/login">Candidate Login</Link>
        </div>
      </div>
    </div>
  );
}

export default GovtBand;
