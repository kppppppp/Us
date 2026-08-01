import React from 'react';
import logo from '../../assets/logo1.png';
export const Logo: React.FC = () => {
  return (
    <a href="#" className="flex items-center gap-3 select-none group shrink-0">
      {/* Premium US Circular Logo */}
     <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
  <img
    src={logo}
    alt="Unexpected Solutions"
   className="h-14 md:h-18 lg:h-24 w-auto object-contain"
  />
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
