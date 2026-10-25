// frontend/src/components/home/CourseTabs.jsx
// Interactive Course Category Selector Component
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 31-32 (State Management with useState)

import React from 'react';

const CATEGORIES = [
  'All Courses',
  'Engineering',
  'Architecture',
  'Medical',
  'LLB (3 Year)',
  'LLB (5 Year)',
  'LLM',
  'B.Pharm (LE)',
  'PG Medical',
  'PG Dental',
  'PG Nursing',
  'PG Ayurveda',
  'M.Pharm'
];

function CourseTabs({ activeCategory, onSelectCategory }) {
  return (
    <nav className="course-strip" aria-label="Course categories">
      <ul className="course-strip__list">
        {CATEGORIES.map((cat) => (
          <li key={cat} className="course-strip__item">
            <button
              type="button"
              className={`course-strip__link ${activeCategory === cat ? 'course-strip__link--active' : ''}`}
              onClick={() => onSelectCategory(cat)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CourseTabs;
