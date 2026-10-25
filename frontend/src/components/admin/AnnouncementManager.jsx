// frontend/src/components/admin/AnnouncementManager.jsx
// Announcements & Live Scrolling Ticker Manager
// Author: Shan M A (B24CSA59) & Rasal Musthafa (B24CSA49)
// Allows admin to publish, preview, and delete live notices and ticker updates

import React, { useState, useEffect } from 'react';

function AnnouncementManager() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New notice form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [isTicker, setIsTicker] = useState(true);
  const [isNotice, setIsNotice] = useState(true);
  const [category, setCategory] = useState('Admission');
  const [submitting, setSubmitting] = useState(false);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle publishing announcement
  const handlePublish = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          link: link.trim() || '#',
          isTicker,
          isNotice,
          category
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('Announcement published live successfully!');
        setTitle('');
        setMessage('');
        setLink('');
        fetchAnnouncements();
      } else {
        setError(data.message || 'Failed to publish announcement.');
      }
    } catch (err) {
      setError('Communication error while publishing announcement.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle deleting announcement
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        setSuccess('Announcement removed.');
      }
    } catch (err) {
      setError('Failed to delete announcement.');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      {/* 1. Publish New Announcement Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <h3 style={{ color: 'var(--color-navy)', marginBottom: '1rem', fontSize: '1.15rem' }}>
          Publish Live Announcement / Ticker
        </h3>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.6rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1rem' }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#DCFCE7', color: '#16A34A', padding: '0.6rem', borderRadius: '4px', fontSize: 'var(--fs-sm)', marginBottom: '1rem' }}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Announcement Headline <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. KEAM 2026 Engineering Admissions Portal Now Live"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
              Detailed Description / Remarks
            </label>
            <textarea
              rows="2"
              placeholder="Candidate instructions or release info..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
                style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
              >
                <option value="Admission">Admission</option>
                <option value="Examination">Examination</option>
                <option value="Allotment">Allotment</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '4px' }}>
                Link URL (Optional)
              </label>
              <input
                type="text"
                placeholder="# or https://..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="form-input"
                style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'var(--border-light)', borderRadius: '4px', fontSize: 'var(--fs-sm)' }}
              />
            </div>
          </div>

          {/* Visibility Checkboxes */}
          <div style={{ display: 'flex', gap: '1.5rem', margin: '0.25rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--fs-xs)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isTicker}
                onChange={(e) => setIsTicker(e.target.checked)}
              />
              Show in <strong>Scrolling Ticker</strong>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--fs-xs)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isNotice}
                onChange={(e) => setIsNotice(e.target.checked)}
              />
              Show on <strong>Notice Board</strong>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ marginTop: '0.5rem', padding: '0.65rem' }}
            disabled={submitting}
          >
            {submitting ? 'Publishing...' : '📢 Publish Announcement Live'}
          </button>
        </form>
      </div>

      {/* 2. Active Announcements List */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-card)',
          maxHeight: '520px',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.15rem' }}>
            Live Announcements ({notifications.length})
          </h3>
          <button
            type="button"
            onClick={fetchAnnouncements}
            className="btn btn--secondary"
            style={{ fontSize: 'var(--fs-xs)', padding: '0.25rem 0.5rem' }}
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-mid-gray)', fontSize: 'var(--fs-sm)' }}>Loading announcements...</p>
        ) : notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-mid-gray)' }}>
            <p>No active announcements in database.</p>
            <p style={{ fontSize: 'var(--fs-xs)' }}>Publish your first announcement using the form.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notifications.map((item) => (
              <div
                key={item._id}
                style={{
                  padding: '0.85rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--color-navy)', fontSize: 'var(--fs-sm)' }}>
                    {item.title}
                  </div>
                  {item.message && (
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-dark-gray)', marginTop: '2px' }}>
                      {item.message}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '6px' }}>
                    {item.isTicker && (
                      <span style={{ fontSize: '10px', backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        TICKER
                      </span>
                    )}
                    {item.isNotice && (
                      <span style={{ fontSize: '10px', backgroundColor: '#DBEAFE', color: '#1D4ED8', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        NOTICE BOARD
                      </span>
                    )}
                    <span style={{ fontSize: '10px', backgroundColor: '#E2E8F0', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.category || 'General'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    padding: '0 4px'
                  }}
                  title="Delete Announcement"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementManager;
