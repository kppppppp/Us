import React, { useState, useEffect, useRef } from 'react';
import { useNavbarScroll } from '../../hooks/useNavbarScroll';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { CTAButton } from './CTAButton';
import { MenuButton } from './MenuButton';
import { MobileMenu } from './MobileMenu';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const isScrolled = useNavbarScroll(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // GSAP Entry Animation
  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <>
      <div 
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 select-none pointer-events-none"
      >
        <div
          className={`
            w-full max-w-[1500px] flex items-center justify-between
            bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.06)]
            rounded-[40px] pointer-events-auto
            transition-all duration-[350ms] ease-in-out
            ${isScrolled 
              ? 'h-[76px] mt-4 px-6 shadow-navbar-scrolled backdrop-blur-[24px]' 
              : 'h-[92px] mt-5 px-8 shadow-navbar backdrop-blur-[16px]'
            }
          `}
        >
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Links (Desktop) */}
          <NavLinks />

          {/* Right Area */}
          <div className="flex items-center gap-4">
            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <CTAButton />
            </div>

            {/* Circular Menu Hamburger Button */}
            <MenuButton 
              isOpen={isMobileMenuOpen} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Sliding Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};
export default Navbar;
