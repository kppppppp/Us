import React, { useEffect, useRef } from 'react';
import { Orbit } from './Orbit/Orbit';
import { PromiseBar } from '../../../components/Promise/PromiseBar';
import DotField from '../../../components/ui/DotField';
import { UnderlineLink } from '../../../components/ui/UnderlineLink';
import { ArrowCircleButton } from '../../../components/ui/ArrowCircleButton';
import { BackgroundRibbon } from '../../../components/decorative/BackgroundRibbon';
import { PurpleGlow } from '../../../components/decorative/PurpleGlow';
import { BackgroundGrid } from '../../../components/decorative/BackgroundGrid';
import { createServicesTimeline } from '../../../animations/servicesTimeline';

export const DesktopServices: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timeline = createServicesTimeline(el);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
     className="relative min-h-[920px] w-full bg-[#F7F5FC] py-[100px] px-12 overflow-hidden flex flex-col justify-between items-center"
      id="services-section"
    >
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

      {/* Decorative Layer */}
      <BackgroundGrid />
      <BackgroundRibbon position="top-right" />
      <BackgroundRibbon position="bottom-left" />
      <PurpleGlow className="left-1/4 top-1/4" />

      {/* Main Grid */}
     <div className="max-w-[1600px] w-full grid grid-cols-12 items-center gap-4 relative">
        
        {/* Left Column (40%) */}
        <div className="col-span-4 flex flex-col justify-center z-20">
          {/* Label */}
          <span 
            data-reveal="label"
            className="text-[11px] font-extrabold tracking-[0.35em] uppercase text-brand-purple mb-6 select-none"
          >
            What We Do
          </span>

          {/* Large Editorial Heading */}
          <h2 
            data-reveal="heading"
            className="font-serif text-[72px] sm:text-[80px] font-normal leading-[1.05] text-brand-text mb-8 tracking-tight"
            style={{ fontFamily: "'Outfit', 'Cormorant Garamond', serif" }}
          >
            Services <br />
            designed to <br />
            <span className="bg-gradient-to-r from-brand-purple to-brand-deep bg-clip-text text-transparent">
              drive real <br />
              impact.
            </span>
          </h2>

          {/* Subtitle Description */}
          <p 
            data-reveal="body"
            className="text-neutral-500 text-base leading-relaxed max-w-[420px] mb-12 select-none"
          >
            End-to-end digital solutions crafted to elevate your brand, scale your business and create measurable growth.
          </p>

          {/* CTA Link & Button */}
          <div 
            data-reveal="cta"
            className="flex items-center gap-6"
          >
            <UnderlineLink 
              href="#services" 
              label="View All Services" 
              showArrow={false} 
              className="text-lg"
            />
            <ArrowCircleButton />
          </div>
        </div>

        {/* Right Column (60%) - Orbital graphic */}
        <div className="col-span-8 relative flex justify-end items-center overflow-visible pr-8">
    <div className="-translate-y-8">
        <Orbit />
    </div>
</div>

      </div>

      {/* Bottom Promise Bar */}
      <div className="w-full mt-24 relative z-20">
        <PromiseBar />
      </div>
    </section>
  );
};
export default DesktopServices;
