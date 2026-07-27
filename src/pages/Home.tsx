import React from 'react';
import { DesktopHero } from '../sections/home/Hero/DesktopHero';
import { MobileHero } from '../sections/home/Hero/MobileHero';
import { Services } from '../sections/home/Services/Services';

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

      <section className="py-24 px-6 md:px-8 max-w-[1500px] mx-auto text-center bg-neutral-50 rounded-3xl" id="case-studies">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Case Studies</h2>
        <p className="text-neutral-500 max-w-xl mx-auto mb-12">
          Read detailed breakdowns of how our digital platform designs scale core operations.
        </p>
      </section>

      <section className="py-24 px-6 md:px-8 max-w-[1500px] mx-auto text-center" id="about-us">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">About Us</h2>
        <p className="text-neutral-500 max-w-xl mx-auto mb-12">
          A team of world-class design experts and software developers focused on premium products.
        </p>
      </section>
    </main>
  );
};
export default Home;
