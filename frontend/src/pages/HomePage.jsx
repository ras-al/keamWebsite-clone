// frontend/src/pages/HomePage.jsx
// Main Landing Page Component
// Author: Rasal Musthafa (B24CSA49)
// Study Reference: Slide 14 (Component Composition & Layout Orchestration)

import React, { useState } from 'react';
import Header from '../components/home/Header';
import Ticker from '../components/home/Ticker';
import CourseTabs from '../components/home/CourseTabs';
import PortalCards from '../components/home/PortalCards';
import NotificationList from '../components/home/NotificationList';

const WELCOME_DESCRIPTIONS = {
  'all courses': {
    heading: 'Welcome to the Candidate Portal',
    text: 'The Entrance Commissionerate, established by the State Government, is the statutory body responsible for conducting entrance examinations and managing centralized allotment for admission to professional courses in Kerala. This portal provides candidates with a single-window system for registration, exam management, allotment tracking, and document verification across all major professional streams.'
  },
  'engineering': {
    heading: 'Engineering (B.Tech) Admissions',
    text: 'Welcome to the dedicated portal for Engineering (B.Tech) admissions in Kerala. This single-window system allows candidates to seamlessly register for the KEAM entrance examination, verify academic credentials, download admit cards, check rank lists, and participate in the Centralized Allotment Process (CAP).'
  },
  'architecture': {
    heading: 'Architecture (B.Arch) Admissions',
    text: 'Welcome to the Architecture portal. Admission to B.Arch is managed through this interface for candidates who have qualified the National Aptitude Test in Architecture (NATA). Submit scores, upload necessary portfolio documents, and track seat allotment.'
  },
  'medical': {
    heading: 'Medical & Allied Health Sciences',
    text: 'Access the Medical candidate portal for MBBS, BDS, Nursing, and allied medical courses. Admissions are based on NEET merit. Submit state rank details, upload reservation certificates, and participate in state quota seat allotments.'
  },
  'law': {
    heading: 'Legal Studies (LLB & LLM) Admissions',
    text: 'Welcome to the integrated Law admission portal facilitating the application and allotment processes for 3-Year LLB, 5-Year Integrated LLB, and LLM PG programs.'
  }
};

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All Courses');

  const catKey = activeCategory.toLowerCase();
  const currentWelcome = WELCOME_DESCRIPTIONS[catKey] ||
    (catKey.includes('llb') || catKey === 'llm' ? WELCOME_DESCRIPTIONS['law'] : WELCOME_DESCRIPTIONS['all courses']);

  return (
    <div className="home-page">
      {/* 1. Official Header Banner & Top Info */}
      <Header />

      {/* 2. Dynamic Live Announcements Ticker */}
      <Ticker />

      {/* 3. Course Category Filter Strip */}
      <CourseTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 4. Welcome / Introduction Section */}
      <section className="welcome">
        <div className="container">
          <h2 className="welcome__heading">{currentWelcome.heading}</h2>
          <p className="welcome__text">{currentWelcome.text}</p>
        </div>
      </section>

      {/* 5. Filtered Portal Cards Grid */}
      <PortalCards activeCategory={activeCategory} />

      {/* 6. Live Announcements Board */}
      <NotificationList />

      {/* 7. Helpline Band */}
      <section className="helpline" id="helpline">
        <div className="container">
          <h4 className="helpline__title">Helpline &amp; Contact</h4>
          <div className="helpline__details">
            <div className="helpline__item">
              <span className="helpline__item-label">Phone:</span>
              <span className="helpline__item-value">0471-2525300</span>
            </div>
            <div className="helpline__item">
              <span className="helpline__item-label">Email:</span>
              <span className="helpline__item-value">caborhelp@cee.kerala.gov.in</span>
            </div>
            <div className="helpline__item">
              <span className="helpline__item-label">Office:</span>
              <span className="helpline__item-value">CEE, Housing Board Buildings, Santhi Nagar, Thiruvananthapuram</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
