// frontend/src/components/dashboard/ProgressTimeline.jsx
// 7-Stage Application Pipeline Visualizer
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 23-24 (Conditional Class Names & Dynamic UI State)

import React from 'react';

const STAGES = [
  { id: 0, title: 'Registration', stepLabel: 'Step 1' },
  { id: 1, title: 'Application Submitted', stepLabel: 'Step 2' },
  { id: 2, title: 'Fee Payment', stepLabel: 'Step 3' },
  { id: 3, title: 'Admit Card', stepLabel: 'Step 4' },
  { id: 4, title: 'Examination', stepLabel: 'Step 5' },
  { id: 5, title: 'Results', stepLabel: 'Step 6' },
  { id: 6, title: 'Allotment', stepLabel: 'Step 7' }
];

function ProgressTimeline({ activeStepIndex = 1 }) {
  return (
    <section className="status-timeline">
      <h2 className="section-title">Application Progress</h2>
      <div className="timeline">
        {STAGES.map((stage) => {
          // Determine stage state based on activeStepIndex
          let stepClass = 'timeline__step';
          if (stage.id < activeStepIndex) {
            stepClass += ' timeline__step--completed';
          } else if (stage.id === activeStepIndex) {
            stepClass += ' timeline__step--active';
          }

          return (
            <div key={stage.id} className={stepClass}>
              <div className="timeline__dot"></div>
              <div className="timeline__step-title">{stage.title}</div>
              <div className="timeline__step-date">{stage.stepLabel}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProgressTimeline;
