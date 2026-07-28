import React from 'react';
import { DesktopHero } from '../sections/home/Hero/DesktopHero';
import { MobileHero } from '../sections/home/Hero/MobileHero';
import { Services } from '../sections/home/Services/Services';
import { CaseStudies } from '../sections/home/CaseStudies/CaseStudies';
import { About } from '../sections/home/About/About';

export const Home: React.FC = () => {
  return (
    <main className="w-full">
      {/* Responsive Hero Sections */}
      <div className="hidden lg:block">
        <DesktopHero />
      </div>
      <div className="block lg:hidden">
        <MobileHero />
      </div>
      
      {/* Reusable Services Section */}
      <Services />

      {/* Case Studies Section */}
      <CaseStudies />

      {/* About Us Section with Flowing Menu */}
      <About />
    </main>
  );
};
export default Home;
