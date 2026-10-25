// frontend/src/components/home/PortalCards.jsx
// Grid Container for Candidate Portals with Category Filtering
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slides 48-49 (Rendering Lists & Conditional Props Filtering)

import React from 'react';
import PortalCard from './PortalCard';

const PORTAL_DATA = [
  {
    group: 'UG Admissions',
    cards: [
      {
        id: 'card-keam-2026',
        title: 'KEAM 2026 - Candidate Portal',
        desc: 'Engineering, Architecture & Medical',
        tags: ['engineering', 'architecture', 'medical'],
        link: '/login'
      },
      {
        id: 'card-llb3-2026',
        title: 'Three Year LL.B 2026',
        desc: 'Candidate Portal',
        tags: ['law', 'llb (3 year)'],
        link: '/login'
      },
      {
        id: 'card-llb5-2026',
        title: 'Integrated Five Year LL.B 2026',
        desc: 'Candidate Portal',
        tags: ['law', 'llb (5 year)'],
        link: '/login'
      },
      {
        id: 'card-bpharm-2026',
        title: 'B.Pharm (Lateral Entry) 2026',
        desc: 'Candidate Portal',
        tags: ['pharmacy', 'b.pharm (le)'],
        link: '/login'
      }
    ]
  },
  {
    group: 'PG Admissions',
    cards: [
      {
        id: 'card-pgm-2026',
        title: 'PG Medical 2026',
        desc: 'Candidate Portal',
        tags: ['medical', 'pg medical'],
        link: '/login'
      },
      {
        id: 'card-pgd-2026',
        title: 'PG Dental 2026',
        desc: 'Candidate Portal',
        tags: ['medical', 'pg dental'],
        link: '/login'
      },
      {
        id: 'card-pgn-2026',
        title: 'PG Nursing 2026',
        desc: 'Candidate Portal',
        tags: ['medical', 'pg nursing'],
        link: '/login'
      },
      {
        id: 'card-llm-2026',
        title: 'LL.M 2026',
        desc: 'Candidate Portal',
        tags: ['law', 'llm'],
        link: '/login'
      },
      {
        id: 'card-pga-2026',
        title: 'PG Ayurveda 2026',
        desc: 'Candidate Portal',
        tags: ['medical', 'pg ayurveda'],
        link: '/login'
      },
      {
        id: 'card-mpharm-2026',
        title: 'M.Pharm 2026',
        desc: 'Candidate Portal',
        tags: ['pharmacy', 'm.pharm'],
        link: '/login'
      }
    ]
  },
  {
    group: 'Other Links',
    cards: [
      {
        id: 'card-kmat-2026',
        title: 'K-MAT 2026 (Session 1)',
        desc: 'Management Aptitude Test',
        tags: ['other'],
        link: '#'
      },
      {
        id: 'card-kmat2-2026',
        title: 'K-MAT 2026 (Session 2)',
        desc: 'Management Aptitude Test',
        tags: ['other'],
        link: '#'
      },
      {
        id: 'card-nonutilization',
        title: 'Non-Utilization Certificate',
        desc: 'Defence Personnel & Ex-Servicemen',
        tags: ['other'],
        link: '#'
      }
    ]
  }
];

function PortalCards({ activeCategory }) {
  const normalizedCategory = (activeCategory || 'All Courses').toLowerCase();

  return (
    <section className="portal-cards">
      <div className="container">
        <h2 className="portal-cards__heading">Candidate Portals</h2>
        <p className="portal-cards__subtext">Select your course to access the dedicated candidate portal.</p>

        {PORTAL_DATA.map((group) => {
          // Filter cards matching the activeCategory (or all if 'all courses')
          const filteredCards = group.cards.filter((card) => {
            if (normalizedCategory === 'all courses' || normalizedCategory === 'all') return true;
            return card.tags.some((t) => t.toLowerCase() === normalizedCategory || normalizedCategory.includes(t.toLowerCase()));
          });

          if (filteredCards.length === 0) return null;

          return (
            <div key={group.group} className="portal-cards__group">
              <h3 className="portal-cards__group-title">{group.group}</h3>
              <div className="portal-cards__grid">
                {filteredCards.map((card) => (
                  <PortalCard key={card.id} {...card} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PortalCards;
