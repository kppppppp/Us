import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../constants/projectsData';
import DotField from '../components/ui/DotField';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import DecayCard from '../components/ui/DecayCard';
import image4 from '../assets/image5.png';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Lenis to top on mount
    window.scrollTo(0, 0);

    const container = containerRef.current;
    if (!container) return;

    // 1. Hero Reveal Animations
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      '.hero-title span',
      { y: '100%', rotateX: -60, transformOrigin: 'top center', opacity: 0 },
      { y: '0%', rotateX: 0, opacity: 1, duration: 1.0, stagger: 0.08, ease: 'power4.out' }
    );
    heroTl.fromTo(
      '.hero-subtitle-char',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    );
    heroTl.fromTo(
      '.hero-cta',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.5'
    );

    // Subtle background lighting gradient follow
    const glow = container.querySelector('.bg-glow-gradient');
    let onMouseMoveGlow: ((e: MouseEvent) => void) | null = null;
    if (glow) {
      onMouseMoveGlow = (e: MouseEvent) => {
        gsap.to(glow, {
          x: e.clientX - 250,
          y: e.clientY - 250,
          duration: 1.5,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', onMouseMoveGlow);
    }

    // Magnetic CTA Buttons Interaction
    const magneticButtons = container.querySelectorAll('.magnetic-button');
    const cleanupButtons: Array<{ btn: any; onMove: any; onLeave: any }> = [];

    magneticButtons.forEach((btn: any) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.45,
          y: y * 0.45,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.4)'
        });
      };

      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
      cleanupButtons.push({ btn, onMove: onMouseMove, onLeave: onMouseLeave });
    });

    return () => {
      if (onMouseMoveGlow) {
        window.removeEventListener('mousemove', onMouseMoveGlow);
      }
      cleanupButtons.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#FAF9FC] overflow-x-hidden pt-28 md:pt-20 pb-12 select-none"
    >
      {/* Global Fixed DotField Canvas Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-95">
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

      {/* Editorial noise overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(93,70,216,0.03),transparent_50%)] pointer-events-none" />
      <div className="bg-glow-gradient absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,127,244,0.04)_0%,transparent_70%)] pointer-events-none hidden lg:block" />

      {/* Full-bleed Editorial Launch Hero banner */}
      <div className="relative w-full overflow-hidden border-b border-brand-border/60 bg-white/10 py-16 md:py-24 mb-20 md:mb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div 
            ref={heroRef}
            className="lg:col-span-7 flex flex-col items-start text-left relative z-10"
          >
            <span className="hero-subtitle text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-5 block">
              <span className="hero-subtitle-char inline-block">Portfolio Showcase</span>
            </span>
            
            <h1 className="hero-title text-6xl md:text-[6vw] lg:text-[7vw] font-serif font-black text-brand-text tracking-tighter leading-[0.85] max-w-[1200px] mb-8 overflow-hidden">
              <span className="block mb-2">Selected</span>
              <span className="block text-brand-purple">Work</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl font-sans font-light text-neutral-500 leading-relaxed max-w-[850px] mb-10">
              <span className="hero-subtitle-char inline-block">Crafting digital products and enterprise platforms with custom design systems and zero compromise.</span>
            </p>

            <div className="hero-cta" data-reveal>
              <a 
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-brand-text text-white hover:bg-brand-purple rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
              >
                <span>Partner With Us</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium DecayCard Interactive visual */}
          <div className="lg:col-span-5 flex items-center justify-center w-full relative z-20">
            <DecayCard 
              width={340} 
              height={410} 
              image={image4}
              baseFrequency={0.012}
              numOctaves={5}
              maxDisplacement={180}
              movementBound={40}
            >
              <h2 className="text-white text-3xl font-serif font-bold tracking-tight text-center select-none leading-none drop-shadow-md">
                CREATIVE<br />
                ARCHIVE
              </h2>
            </DecayCard>
          </div>
        </div>
      </div>

      {/* Projects list in max-width container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <ScrollStack 
          useWindowScroll={true}
          itemDistance={100}
          itemScale={0.02}
          itemStackDistance={25}
          stackPosition="15%"
          baseScale={0.92}
          blurAmount={1.5}
          className="w-full h-auto overflow-visible"
        >
          {projectsData.map((project, idx) => {
            const numberStr = String(idx + 1).padStart(2, '0');
            return (
              <ScrollStackItem key={project.id}>
                <div className="w-full flex flex-col lg:flex-row gap-0 text-left">
                  {/* Left Column: Image */}
                  <div className="w-full lg:w-[48%] flex-shrink-0 overflow-hidden rounded-2xl lg:rounded-3xl">
                    <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Index badge on image */}
                      <span className="absolute top-4 left-4 md:top-5 md:left-5 text-4xl md:text-6xl font-serif font-black text-white/25 select-none leading-none">
                        {numberStr}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Info */}
                  <div className="w-full lg:w-[52%] flex flex-col justify-between p-5 md:p-8 lg:pl-10">
                    {/* Top: Title & Meta */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-brand-light-purple/10 border border-brand-purple/15 text-brand-purple text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full">
                          {project.year}
                        </span>
                        <span className="text-xs md:text-sm font-semibold tracking-wider text-brand-purple/70 uppercase">
                          {project.category}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-text leading-tight mb-4 tracking-tight">
                        {project.title}
                      </h2>

                      <p className="text-sm md:text-base text-neutral-600 font-normal leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom: Tech + CTA */}
                    <div>
                      <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
                        Stack
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2.5 py-1 bg-[#FAF9FC] hover:bg-brand-light-purple/5 text-neutral-600 hover:text-brand-purple border border-brand-border/60 hover:border-brand-purple/25 rounded-lg text-[11px] font-medium transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <a 
                          href={project.link}
                          className="magnetic-button group inline-flex items-center gap-2 px-5 py-3 bg-brand-text hover:bg-brand-purple text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
                        >
                          <span>View Project</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full animate-pulse" 
                            style={{ backgroundColor: project.accentColor }} 
                          />
                          <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider hidden sm:inline">
                            Live
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </div>
  );
};

export default Projects;
