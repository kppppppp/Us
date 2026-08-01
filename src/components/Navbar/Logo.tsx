import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center shrink-0 select-none">
      <img
        src="/unexpectedsolution.png"
        alt="Unexpected Solutions"
        className="h-19 w-auto object-contain"
      />
       {/* Company Name */}
      <div className="flex flex-col justify-center leading-none text-brand-text">
        <span className="font-extrabold text-[13px] tracking-[0.14em] uppercase font-sans">
          Unexpected
        </span>
        <span className="font-light text-[13px] tracking-[0.18em] uppercase font-sans text-neutral-500 mt-[2px] transition-colors duration-300 group-hover:text-brand-purple">
          Solutions
        </span>
      </div>
    </Link>
  );
};

export default Logo;