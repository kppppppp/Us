import React from 'react';

export const Logo: React.FC = () => {
  return (
    <a href="#" className="flex items-center shrink-0 select-none">
      <img
        src="/unexpectedsolution.png"
        alt="Unexpected Solutions"
        className="h-19 w-auto object-contain"
      />
    </a>
  );
};

export default Logo;