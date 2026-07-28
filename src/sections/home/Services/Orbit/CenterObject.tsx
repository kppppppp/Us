import React from 'react';
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation';
import sculptureImg from '../../../../assets/image1.png';

export const CenterObject: React.FC = () => {
  const floatRef = useFloatingAnimation();

  return (
    <div 
      ref={floatRef} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[470px] flex items-center justify-center pointer-events-none select-none z-10"
    >
      {/* Background glow behind sculpture */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />
      
      {/* Glossy purple abstract ribbon sculpture image */}
      <img 
        src={sculptureImg} 
        alt="Translucent Ribbon Sculpture" 
        className="w-full h-full object-contain rounded-full border border-white/20 shadow-brand-lg bg-white/20 backdrop-blur-[2px]" 
      />
    </div>
  );
};
export default CenterObject;
