import React from 'react';

interface BackgroundRibbonProps {
  position: 'top-right' | 'bottom-left';
  className?: string;
}

export const BackgroundRibbon: React.FC<BackgroundRibbonProps> = ({ position, className = '' }) => {
  const positionClasses = 
    position === 'top-right' 
      ? 'top-0 right-0 w-[500px] h-[500px] translate-x-20 -translate-y-20 bg-gradient-to-br from-brand-purple/10 to-transparent'
      : 'bottom-0 left-0 w-[600px] h-[600px] -translate-x-20 translate-y-20 bg-gradient-to-tr from-brand-purple/15 to-transparent';

  return (
    <div
      className={`absolute rounded-full filter blur-[100px] pointer-events-none z-0 mix-blend-multiply opacity-80 ${positionClasses} ${className}`}
    />
  );
};
export default BackgroundRibbon;
