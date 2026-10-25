// frontend/src/components/home/NotificationList.jsx
// Live Announcement Board Component
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 56-62, 71-72 (Conditional Rendering & Async useEffect Fetching)

import React, { useState, useEffect } from 'react';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications?type=list')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setNotifications(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch announcements:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="latest-notifications">
      <div className="container">
        <h2 className="latest-notifications__heading">Latest Notifications</h2>

        {/* Conditional Rendering: Loading State (Slides 56-57) */}
        {loading && (
          <p style={{ color: 'var(--color-mid-gray)', fontSize: 'var(--fs-sm)', padding: '1rem 0' }}>
            Loading latest announcements from database...
          </p>
        )}

        {/* Conditional Rendering: Empty State */}
        {!loading && notifications.length === 0 && (
          <p style={{ color: 'var(--color-mid-gray)', fontSize: 'var(--fs-sm)', padding: '1rem 0' }}>
            No public notifications published at this moment. Check back soon.
          </p>
        )}

        {/* Conditional Rendering: List State */}
        {!loading && notifications.length > 0 && (
          <ul className="latest-notifications__list">
            {notifications.map((item) => (
              <li key={item._id} className="latest-notifications__item">
                <span className="latest-notifications__bullet" aria-hidden="true"></span>
                <a href={item.link || '#'} className="latest-notifications__link">
                  {item.title}
                  {item.badge && (
                    <span className="latest-notifications__badge">{item.badge}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default NotificationList;
