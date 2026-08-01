import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isIndustriesPage = location.pathname === '/industries' || location.pathname === '/industries/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Floating Glass Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      {!isIndustriesPage && <Footer />}
    </div>
  );
};
export default MainLayout;
