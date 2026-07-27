import React from 'react';
import { useOrbitAnimation } from '../../../../hooks/useOrbitAnimation';
import { ORBIT_LAYOUT } from '../../../../constants/layout';

export const OrbitDots: React.FC = () => {
  const innerRef = useOrbitAnimation(25);  // Rotate inner ring dots in 25s
  const middleRef = useOrbitAnimation(30); // Rotate middle ring dots in 30s
  const outerRef = useOrbitAnimation(35);  // Rotate outer ring dots in 35s

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 2 }}>
      {/* Inner Ring Dots */}
      <div ref={innerRef as any} className="absolute inset-0 w-full h-full origin-center">
        {/* Place a dot at 45 degrees on inner ring */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-brand-purple"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos((45 * Math.PI) / 180) * ORBIT_LAYOUT.innerRing}px, ${Math.sin((45 * Math.PI) / 180) * ORBIT_LAYOUT.innerRing}px)`
          }}
        />
      </div>

      {/* Middle Ring Dots */}
      <div ref={middleRef as any} className="absolute inset-0 w-full h-full origin-center">
        {/* Place a dot at 135 degrees on middle ring */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-brand-purple/70"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos((135 * Math.PI) / 180) * ORBIT_LAYOUT.middleRing}px, ${Math.sin((135 * Math.PI) / 180) * ORBIT_LAYOUT.middleRing}px)`
          }}
        />
        {/* Place a dot at 285 degrees on middle ring */}
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-brand-purple/50"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos((285 * Math.PI) / 180) * ORBIT_LAYOUT.middleRing}px, ${Math.sin((285 * Math.PI) / 180) * ORBIT_LAYOUT.middleRing}px)`
          }}
        />
      </div>

      {/* Outer Ring Dots */}
      <div ref={outerRef as any} className="absolute inset-0 w-full h-full origin-center">
        {/* Place a dot at 220 degrees on outer ring */}
        <div 
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-purple/40"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos((220 * Math.PI) / 180) * ORBIT_LAYOUT.outerRing}px, ${Math.sin((220 * Math.PI) / 180) * ORBIT_LAYOUT.outerRing}px)`
          }}
        />
      </div>
    </div>
  );
};
export default OrbitDots;
