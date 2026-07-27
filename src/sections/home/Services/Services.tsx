import React from 'react';
import DesktopServices from './DesktopServices';
import MobileServices from './MobileServices';

export const Services: React.FC = () => {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:block">
        <DesktopServices />
      </div>

      {/* Mobile/Tablet view */}
      <div className="block lg:hidden">
        <MobileServices />
      </div>
    </>
  );
};
export default Services;
