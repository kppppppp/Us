import React from 'react';
import FlowingMenu from '../../../components/ui/FlowingMenu';
import visionImg from '../../../assets/about_vision.webp';
import philosophyImg from '../../../assets/about_philosophy.webp';
import peopleImg from '../../../assets/about_people.webp';
import influenceImg from '../../../assets/about_influence.webp';
import DotField from '../../../components/ui/DotField';

export const About: React.FC = () => {
  const aboutItems = [
    { link: '#vision', text: 'Our Vision', image: visionImg },
    { link: '#philosophy', text: 'Our Philosophy', image: philosophyImg },
    { link: '#people', text: 'Our People', image: peopleImg },
    { link: '#influence', text: 'Our Influence', image: influenceImg }
  ];

  return (
    <section className="relative w-full bg-[#F7F5FC] py-16 lg:py-[120px] overflow-hidden select-none" id="about-us">
      {/* Global Fixed DotField Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60">
        <DotField
          dotRadius={2.8}
          dotSpacing={16}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(0, 0, 0, 0.28)"
          gradientTo="rgba(0, 0, 0, 0.12)"
          glowColor="rgba(0, 0, 0, 0.02)"
        />
      </div>
      
      {/* Background decorations matching the premium theme */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#5d46d8_1px,transparent_1px),linear-gradient(to_bottom,#5d46d8_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Soft background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF9FFC]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 mb-16 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[11px] font-bold text-brand-purple tracking-[0.35em] uppercase block mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 font-bold leading-tight tracking-tight">
            Engineering unexpected breakthroughs.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:pl-12">
          <p className="text-xs md:text-sm leading-relaxed text-neutral-500 max-w-lg">
            We are a group of world-class design experts and systems engineers. We partner with ambitious organizations to build premium digital solutions, platforms, and intelligent integrations that redefine user experience.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="h-[400px] md:h-[450px] relative rounded-3xl overflow-hidden border border-brand-purple/10 shadow-lg">
          <FlowingMenu
            items={aboutItems}
            speed={18}
            textColor="#120F17"
            bgColor="#F7F5FC"
            marqueeBgColor="#5d46d8"
            marqueeTextColor="#ffffff"
            borderColor="rgba(93, 70, 216, 0.08)"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
