import React from 'react';
import { OrbitRings } from './OrbitRings';
import { OrbitDots } from './OrbitDots';
import { CenterObject } from './CenterObject';
import { ServiceNodes } from './ServiceNodes';

export const Orbit: React.FC = () => {
  return (
    <div 
      data-reveal="orbit"
      className="relative w-[760px] h-[760px] flex items-center justify-center select-none"
    >
      {/* Concentric orbital rings */}
      <OrbitRings />

      {/* Slowly rotating orbital dots */}
      <OrbitDots />

      {/* Floating abstract central glass sculpture */}
      <CenterObject />

      {/* Placed Service card nodes */}
      <ServiceNodes />
    </div>
  );
};
export default Orbit;
