// frontend/src/components/dashboard/DigitalClock.jsx
// Real-time Digital Clock with cleanup
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 69-70 (useEffect with cleanup clearInterval)

import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Start interval timer to tick every 1000ms (1 second)
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function when component unmounts to prevent memory leak (Slide 70)
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array -> runs once on mount

  return (
    <span className="live-clock" style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-gold-light)', fontWeight: 600 }}>
      🕒 {time}
    </span>
  );
}

export default DigitalClock;
