import React from 'react';
import { ORBIT_LAYOUT } from '../../../../constants/layout';

export const OrbitRings: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 1 }}>
      {/* Concentric rings */}
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.innerRing}
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1"
      />
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.middleRing}
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1"
      />
      <circle
        cx="50%"
        cy="50%"
        r={ORBIT_LAYOUT.outerRing}
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1"
      />
    </svg>
  );
};
export default OrbitRings;
