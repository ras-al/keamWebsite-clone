/* ============================================================
   HOME.JS — Page-specific JavaScript for index.html
   Author: Rasal Musthafa
   Dependencies: js/main.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Notification Ticker -----
     Duplicate the ticker items so the scroll animation
     loops seamlessly without a visible jump.
  */
  var track = qs('.notifications-ticker__track');
  if (track) {
    var items = track.innerHTML;
    // Append a copy so the animation wraps around
    track.innerHTML = items + items;
  }

  /* ----- Category Filtering for Portal Cards ----- */
  const courseLinks = document.querySelectorAll('.course-strip__link');
  const portalCards = document.querySelectorAll('.portal-card');
  const cardGroups = document.querySelectorAll('.portal-cards__group');
  
  if (courseLinks.length > 0) {
    courseLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active class on nav links
        document.querySelector('.course-strip__link--active')?.classList.remove('course-strip__link--active');
        this.classList.add('course-strip__link--active');
        
        // Get the clicked category text and normalize it for matching
        const category = this.textContent.trim().toLowerCase();
        
        // Define a simple mapping for tricky categories
        const categoryMap = {
          'engineering': 'engineering',
          'architecture': 'architecture',
          'medical': 'medical',
          'llb (3 year)': 'llb3',
          'llb (5 year)': 'llb5',
          'llm': 'llm',
          'b.pharm (le)': 'bpharm',
          'pg medical': 'pgmedical',
          'pg dental': 'pgdental',
          'pg nursing': 'pgnursing',
          'pg ayurveda': 'pgayurveda',
          'm.pharm': 'mpharm'
        };
        
        const targetTag = categoryMap[category];
        
        // Change welcome text dynamically
        const welcomeHeading = document.querySelector('.welcome__heading');
        const welcomeText = document.querySelector('.welcome__text');
        
        if (category === 'engineering') {
          welcomeHeading.textContent = 'Engineering (B.Tech) Admissions';
          welcomeText.innerHTML = 'Welcome to the dedicated portal for Engineering (B.Tech) admissions in Kerala. This single-window system allows candidates to seamlessly register for the KEAM entrance examination, verify their academic credentials, and participate in the Centralized Allotment Process (CAP). Candidates can also download admit cards, check their rank lists, and manage their college preferences across all participating government, aided, and self-financing engineering institutions in the state.';
        } else if (category === 'architecture') {
          welcomeHeading.textContent = 'Architecture (B.Arch) Admissions';
          welcomeText.innerHTML = 'Welcome to the Architecture portal. Admission to the B.Arch course is managed through this dedicated interface. Candidates who have qualified the National Aptitude Test in Architecture (NATA) can submit their scores, upload necessary portfolio documents, and participate in the centralized seat allotment. Explore institute profiles, track your application status, and secure your admission to top architecture colleges in Kerala.';
        } else if (category === 'medical' || category === 'pg medical' || category === 'pg dental' || category === 'pg nursing') {
          welcomeHeading.textContent = 'Medical & Allied Health Sciences';
          welcomeText.innerHTML = 'Access the Medical candidate portal for MBBS, BDS, Nursing, and allied medical courses. Admissions are strictly based on the merit of NEET-UG/PG scores. Candidates must use this portal to submit their state medical rank details, upload required reservation certificates, and participate in the highly regulated state quota seat allotments. Real-time notifications for counseling rounds and document rectification windows are provided here.';
        } else if (category.includes('llb') || category === 'llm') {
          welcomeHeading.textContent = 'Legal Studies (LLB & LLM) Admissions';
          welcomeText.innerHTML = 'Welcome to the integrated Law admission portal. This section facilitates the application and allotment processes for the 3-Year LLB, 5-Year Integrated LLB, and LLM PG programs. Candidates can download syllabus details, access mock tests, view published answer keys, submit grievances, and track their progressive seat allotments across government law colleges and recognized private institutions.';
        } else if (category.includes('pharm')) {
          welcomeHeading.textContent = 'Pharmacy (B.Pharm & M.Pharm)';
          welcomeText.innerHTML = 'The Pharmacy admissions portal handles both lateral entry (B.Pharm LE) and postgraduate (M.Pharm) applications. Eligible candidates can manage their profile, submit academic records, and monitor the seat matrix for pharmacy institutions. The portal ensures a transparent, merit-based selection process in alignment with the Directorate of Medical Education guidelines.';
        } else if (category.includes('ayurveda')) {
          welcomeHeading.textContent = 'Ayush & Ayurveda Admissions';
          welcomeText.innerHTML = 'Welcome to the PG Ayurveda and Ayush courses admission portal. This dedicated system manages applications for specialized postgraduate programs in Ayurvedic medicine. Candidates can submit their AIAPGET scores, verify their clinical experience certificates, and participate in the systematic counseling and allotment process for securing seats in premier Ayurveda colleges.';
        } else {
          welcomeHeading.textContent = 'Centralized Candidate Portal';
          welcomeText.innerHTML = 'The Entrance Commissionerate provides candidates with a comprehensive single-window system for registration, exam management, and allotment tracking. Our Centralized Allotment Process (CAP) ensures a transparent, merit-based admission procedure across all major professional streams in Kerala, including Engineering, Medical, Legal, and Paramedical courses. Select your specific discipline from the menu above to access dedicated resources.';
        }

        // Filter cards
        portalCards.forEach(card => {
          const tags = card.getAttribute('data-tags') || '';
          
          if (!targetTag || tags.includes(targetTag)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Hide empty groups
        cardGroups.forEach(group => {
          const visibleCards = group.querySelectorAll('.portal-card[style="display: flex;"], .portal-card:not([style*="display: none"])');
          if (visibleCards.length === 0) {
            group.style.display = 'none';
          } else {
            group.style.display = 'block';
          }
        });
      });
    });
  }

});
