import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ArrowCircleButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ArrowCircleButton: React.FC<ArrowCircleButtonProps> = ({ onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-14 h-14 rounded-full bg-brand-purple flex items-center justify-center text-white cursor-pointer select-none relative overflow-hidden ${className}`}
      whileHover={{
        scale: 1.08,
        boxShadow: '0 0 25px 4px rgba(93, 70, 216, 0.4)',
        backgroundColor: '#4E36C5'
      }}
      whileTap={{ scale: 0.95 }}
      initial="initial"
    >
      <motion.div
        variants={{
          initial: { x: 0 },
          hover: { x: 4 }
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
      </motion.div>
    </motion.button>
  );
};
export default ArrowCircleButton;
