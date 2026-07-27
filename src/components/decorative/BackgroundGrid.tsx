import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] overflow-hidden select-none">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #141414 1px, transparent 1px),
            linear-gradient(to bottom, #141414 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};
export default BackgroundGrid;
