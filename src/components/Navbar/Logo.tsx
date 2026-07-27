import React from 'react';

export const Logo: React.FC = () => {
  return (
    <a href="#" className="flex items-center gap-3 select-none group shrink-0">
      {/* Premium US Circular Logo */}
      <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-brand-deep to-brand-purple p-[1.5px] transition-transform duration-500 group-hover:rotate-12">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-light-purple to-transparent opacity-50" />
          {/* Logo letters */}
          <span className="font-bold text-lg tracking-tighter text-brand-deep font-sans z-10 flex items-center select-none">
            <span className="translate-x-[1px] translate-y-[-1px]">U</span>
            <span className="translate-x-[-1px] translate-y-[2px] text-brand-purple">S</span>
          </span>
        </div>
      </div>
      
      {/* Company Name */}
      <div className="flex flex-col justify-center leading-none text-brand-text">
        <span className="font-extrabold text-[13px] tracking-[0.14em] uppercase font-sans">
          Unexpected
        </span>
        <span className="font-light text-[13px] tracking-[0.18em] uppercase font-sans text-neutral-500 mt-[2px] transition-colors duration-300 group-hover:text-brand-purple">
          Solutions
        </span>
      </div>
    </a>
  );
};
