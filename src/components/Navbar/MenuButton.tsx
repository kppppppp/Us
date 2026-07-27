import React from 'react';
import { motion } from 'framer-motion';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-12 h-12 rounded-full border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center cursor-pointer shadow-brand-sm select-none z-50 ${className}`}
      whileHover={{ 
        backgroundColor: '#F3EFFF', 
        scale: 1.05,
        boxShadow: '0 8px 16px -6px rgba(93, 70, 216, 0.12)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated Hamburger Icon */}
      <div className="w-5 h-4 flex flex-col justify-between items-center relative">
        <motion.span
          className="w-5 h-[2px] bg-brand-text rounded-full origin-left"
          animate={isOpen ? { rotate: 45, y: -0.5, x: 2 } : { rotate: 0, y: 0, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <motion.span
          className="w-5 h-[2px] bg-brand-text rounded-full"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-5 h-[2px] bg-brand-text rounded-full origin-left"
          animate={isOpen ? { rotate: -45, y: 0.5, x: 2 } : { rotate: 0, y: 0, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </motion.button>
  );
};
