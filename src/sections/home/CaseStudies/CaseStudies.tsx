import React from 'react';
import { useActiveProject } from '../../../hooks/useActiveProject';
import { DesktopCaseStudies } from './DesktopCaseStudies';
import { MobileCaseStudies } from './MobileCaseStudies';
import DotField from '../../../components/ui/DotField';

export const CaseStudies: React.FC = () => {
  const { activeIndex, setActiveIndex } = useActiveProject();

  return (
    <section id="case-studies" className="relative w-full bg-[#F5F2FA] py-16 lg:py-[120px] select-none">
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
      
      {/* Background decorations matching Services & Hero sections */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#5d46d8_1px,transparent_1px),linear-gradient(to_bottom,#5d46d8_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Soft background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF9FFC]/5 blur-[120px] pointer-events-none" />

      {/* Desktop split layout */}
      <DesktopCaseStudies activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {/* Touch-native mobile layout */}
      <MobileCaseStudies />
    </section>
  );
};

export default CaseStudies;
