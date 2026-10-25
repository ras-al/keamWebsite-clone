// frontend/src/components/home/Ticker.jsx
// Dynamic Announcement Ticker Component
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 36, 67, 71 (Side Effects with useEffect & API fetch)

import React, { useState, useEffect } from 'react';

function Ticker() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple fetch on component mount (Slide 71)
    fetch('/api/notifications?type=ticker')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setNotices(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch ticker:', err);
        setLoading(false);
      });
  }, []); // Empty dependency array runs once on mount (Slide 67)

  if (loading) {
    return (
      <section className="notifications-ticker" aria-label="Loading updates">
        <div className="container">
          <span className="notifications-ticker__label">Updates</span>
          <div className="notifications-ticker__scroll">
            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-mid-gray)' }}>
              Loading live announcements...
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="notifications-ticker" aria-label="Live notifications">
      <div className="container">
        <span className="notifications-ticker__label">Updates</span>
        <div className="notifications-ticker__scroll">
          <div className="notifications-ticker__track">
            {notices.length > 0 ? (
              // Duplicate array items for seamless infinite marquee loop
              [...notices, ...notices].map((notice, index) => (
                <div key={`${notice._id || index}-${index}`} className="notifications-ticker__item">
                  <a href={notice.link || '#'}>
                    📢 {notice.title}
                  </a>
                </div>
              ))
            ) : (
              <div className="notifications-ticker__item">
                <span>Official Entrance Examinations Centralized Portal — Real-time Allotment &amp; Notification Updates</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ticker;
