import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CTAButtonProps {
  to?: string;
  onClick?: () => void;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ to = '/contact', onClick, className = '' }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <motion.button
      onClick={handlePress}
      className={`relative inline-flex items-center gap-3 bg-[#141414] hover:bg-[#242424] text-white text-[15px] font-medium py-3.5 px-7 rounded-full shadow-brand-sm cursor-pointer select-none transition-colors duration-300 ${className}`}
      whileHover={{ 
        y: -2,
        boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span>Let's Build Together</span>
      
      {/* Animated Arrow Icon */}
      <motion.span
        className="inline-flex"
        variants={{
          initial: { x: 0 },
          hover: { x: 4 }
        }}
        initial="initial"
        whileHover="hover"
      >
        <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.2} />
      </motion.span>
    </motion.button>
  );
};

