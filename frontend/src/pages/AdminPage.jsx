// frontend/src/pages/AdminPage.jsx
// Complete Admin Management Portal
// Author: Shan M A (B24CSA59) & Rasal Musthafa (B24CSA49)
// Study Reference: Slides 14, 71-72 (Lifecycle, Fetching, List Management)

import React, { useState, useEffect } from 'react';
import SearchFilter from '../components/admin/SearchFilter';
import ApplicationTable from '../components/admin/ApplicationTable';
import StatusModal from '../components/admin/StatusModal';
import AnnouncementManager from '../components/admin/AnnouncementManager';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'announcements'
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setApplications(data.data);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filtered applications computed in memory
  const filteredApplications = applications.filter((app) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (app.personalDetails?.candidateName || '').toLowerCase();
      const appNo = (app.applicationNumber || '').toLowerCase();
      if (!name.includes(q) && !appNo.includes(q)) return false;
    }

    // 2. Status Filter
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false;
    }

    // 3. Category/Course Filter
    if (categoryFilter !== 'all') {
      const courses = Array.isArray(app.courseSelections) ? app.courseSelections : [];
      if (!courses.includes(categoryFilter)) return false;
    }

    return true;
  });

  // Calculate quick stats
  const totalApps = applications.length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const defectiveCount = applications.filter((a) => a.status === 'Defective').length;
  const pendingCount = applications.filter((a) => a.status === 'Submitted').length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const handleStatusUpdated = (updatedApp) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
    );
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-navy)', fontSize: '1.75rem', marginBottom: '0.25rem' }}>
          CEE Administration & Verification Console
        </h1>
        <p style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-sm)' }}>
          Review candidate submissions, verify documents, and publish live portal notifications.
        </p>
      </div>

      {/* KPI Stats Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Applications</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 'bold', color: 'var(--color-navy)', marginTop: '4px' }}>{totalApps}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: '#0369A1', textTransform: 'uppercase', fontWeight: 'bold' }}>Pending Review</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 'bold', color: '#0284C7', marginTop: '4px' }}>{pendingCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: '#15803D', textTransform: 'uppercase', fontWeight: 'bold' }}>Approved</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 'bold', color: '#16A34A', marginTop: '4px' }}>{approvedCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: '#B45309', textTransform: 'uppercase', fontWeight: 'bold' }}>Defective / Corrections</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 'bold', color: '#D97706', marginTop: '4px' }}>{defectiveCount}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #E2E8F0', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'applications' ? '3px solid var(--color-navy)' : '3px solid transparent',
            color: activeTab === 'applications' ? 'var(--color-navy)' : 'var(--color-mid-gray)',
            fontWeight: activeTab === 'applications' ? 'bold' : 'normal',
            fontSize: 'var(--fs-sm)',
            cursor: 'pointer'
          }}
        >
          Applications Verification ({totalApps})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('announcements')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'announcements' ? '3px solid var(--color-navy)' : '3px solid transparent',
            color: activeTab === 'announcements' ? 'var(--color-navy)' : 'var(--color-mid-gray)',
            fontWeight: activeTab === 'announcements' ? 'bold' : 'normal',
            fontSize: 'var(--fs-sm)',
            cursor: 'pointer'
          }}
        >
          Announcements & Live Ticker
        </button>
      </div>

      {/* Tab 1: Applications Management */}
      {activeTab === 'applications' && (
        <div>
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            onReset={handleResetFilters}
          />

          <ApplicationTable
            applications={filteredApplications}
            onReview={(app) => setSelectedApp(app)}
            loading={loading}
          />
        </div>
      )}

      {/* Tab 2: Announcements & Ticker Management */}
      {activeTab === 'announcements' && <AnnouncementManager />}

      {/* Verification & Status Update Modal */}
      {selectedApp && (
        <StatusModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
}

export default AdminPage;
