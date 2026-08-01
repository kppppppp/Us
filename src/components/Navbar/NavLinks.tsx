import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { navigationItems } from '../../constants/navigation';
import { NavDropdown } from './NavDropdown';

export const NavLinks: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Helper to determine if path matches item.href
  const getIsActive = (href: string) => {
    const currentPath = location.pathname;
    
    if (href === '/') {
      // Solutions link corresponds to home '/'
      return currentPath === '/';
    }

    if (href === '/services') {
      // Keep services active on sub-routes e.g., /services/web-development
      return currentPath.startsWith('/services');
    }

    return currentPath === href;
  };

  return (
    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
      {navigationItems.map((item) => {
        const hasDropdown = item.hasDropdown && item.dropdownItems;
        const isOpen = activeDropdown === item.label;
        const isActive = getIsActive(item.href);

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
            onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
          >
            <Link
              to={item.href}
              className={`flex items-center gap-1.5 text-base font-medium py-3 text-brand-text hover:text-brand-purple transition-colors duration-300 relative select-none`}
            >
              <span>{item.label}</span>
              
              {hasDropdown && (
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </motion.span>
              )}

              {/* Smooth growing underline on hover */}
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ originX: 0.5 }}
                whileHover={{ scaleX: 1 }}
              />

              {/* Show the dynamic premium layoutId purple dot active indicator */}
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-purple"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Dropdown Menu */}
            {hasDropdown && (
              <NavDropdown 
                isOpen={isOpen} 
                items={item.dropdownItems || []} 
                onClose={() => setActiveDropdown(null)} 
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

