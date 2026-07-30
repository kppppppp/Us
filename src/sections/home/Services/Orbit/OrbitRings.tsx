import React from 'react';
import { ORBIT_LAYOUT } from '../../../../constants/layout';

export const OrbitRings: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 1 }}>
      {/* Concentric rings — subtle guide circles */}
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.innerRing}
        fill="none"
        stroke="rgba(0,0,0,0.035)"
        strokeWidth="1"
      />
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.middleRing}
        fill="none"
        stroke="rgba(0,0,0,0.035)"
        strokeWidth="1"
      />
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.outerRing}
        fill="none"
        stroke="rgba(0,0,0,0.035)"
        strokeWidth="1"
      />
      {/* Service orbit guide ring (slightly more visible since services sit on it) */}
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.serviceRadius}
        fill="none"
        stroke="rgba(93, 70, 216, 0.04)"
        strokeWidth="1"
        strokeDasharray="3 8"
      />
    </svg>
  );
};
export default OrbitRings;
