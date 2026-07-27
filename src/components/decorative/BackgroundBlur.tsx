import React from 'react';

interface BackgroundBlurProps {
  className?: string;
  children: React.ReactNode;
}

export const BackgroundBlur: React.FC<BackgroundBlurProps> = ({ className = '', children }) => {
  return (
    <div className={`backdrop-blur-md bg-white/40 border border-[rgba(0,0,0,0.06)] rounded-3xl ${className}`}>
      {children}
    </div>
  );
};
export default BackgroundBlur;
