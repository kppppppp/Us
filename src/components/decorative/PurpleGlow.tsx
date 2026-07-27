import React from 'react';

interface PurpleGlowProps {
  className?: string;
  size?: string;
}

export const PurpleGlow: React.FC<PurpleGlowProps> = ({ className = '', size = 'w-[400px] h-[400px]' }) => {
  return (
    <div
      className={`absolute rounded-full bg-brand-purple/10 filter blur-[120px] pointer-events-none z-0 ${size} ${className}`}
    />
  );
};
export default PurpleGlow;
