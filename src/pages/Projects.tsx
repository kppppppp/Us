import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../constants/projectsData';
import type { ProjectItem } from '../constants/projectsData';
import DotField from '../components/ui/DotField';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Lenis to top on mount
    window.scrollTo(0, 0);

    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia(container);

    // 1. Universal animations (Hero reveal)
    mm.add("all", () => {
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
      if (glow) {
        const onMouseMove = (e: MouseEvent) => {
          gsap.to(glow, {
            x: e.clientX - 250,
            y: e.clientY - 250,
            duration: 1.5,
            ease: 'power2.out'
          });
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
      }
    });

    // 2. Desktop Only Sticky Stack & Modern Transitions (Width >= 768px)
    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.project-section');
      
      sections.forEach((section: any, index: number) => {
        const imageWrapper = section.querySelector('.project-img-wrapper');
        const image = section.querySelector('.project-img');
        const content = section.querySelector('.project-content');
        const backgroundNum = section.querySelector('.bg-index-number');
        
        // Image Wrapper Clip-path Reveal & Inset Morph
        if (imageWrapper) {
          gsap.fromTo(
            imageWrapper,
            { clipPath: 'inset(10% 10% 10% 10% round 48px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              }
            }
          );
        }

        // Image Inner Parallax
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -15, scale: 1.1 },
            {
              yPercent: 15,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Parallax background number
        if (backgroundNum) {
          gsap.fromTo(
            backgroundNum,
            { yPercent: 40, opacity: 0 },
            {
              yPercent: -40,
              opacity: 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Staggered 3D Word-Rotate Reveal
        if (content) {
          const words = content.querySelectorAll('.reveal-word');
          const otherItems = content.querySelectorAll('[data-reveal]');
          
          const sectionTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 45%',
              toggleActions: 'play none none none',
            }
          });

          if (words.length > 0) {
            sectionTl.fromTo(
              words,
              { y: '100%', rotateX: -60, transformOrigin: 'top center', opacity: 0 },
              { y: '0%', rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' }
            );
          }

          if (otherItems.length > 0) {
            sectionTl.fromTo(
              otherItems,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
              '-=0.5'
            );
          }
        }

        // Card Deck scale down & fade out as next section stacks on top
        if (index > 0) {
          const prevSection = sections[index - 1] as HTMLElement;
          gsap.fromTo(
            prevSection,
            { scale: 1, opacity: 1 },
            {
              scale: 0.92,
              opacity: 0.15,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              }
            }
          );
        }
      });
    });

    // 3. Mobile Only (Width < 768px)
    mm.add("(max-width: 767px)", () => {
      // Ensure all elements are fully visible and not faded
      const sections = gsap.utils.toArray('.project-section');
      sections.forEach((section: any) => {
        const backgroundNum = section.querySelector('.bg-index-number');
        if (backgroundNum) {
          gsap.set(backgroundNum, { opacity: 0.08 });
        }
        
        // Ensure section and elements have full opacity on mobile
        gsap.set(section, { opacity: 1, scale: 1 });
      });
    });

    // 4. Magnetic CTA Buttons Interaction (Universal)
    const magneticButtons = container.querySelectorAll('.magnetic-button');
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
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Word-split generator
  const renderSplitTitle = (title: string) => {
    return title.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.2em] py-0.5">
        <span className="reveal-word inline-block">{word}</span>
      </span>
    ));
  };

  const renderProject = (project: ProjectItem, index: number) => {
    const layoutType = (index % 4) + 1; // 1, 2, 3, 4 layout rotation
    const numberStr = `0${index + 1}`;

    // Layout 1: Contained Image on top, detailed text grid below
    if (layoutType === 1) {
      return (
        <section 
          key={project.id} 
          className="project-section w-full h-auto md:h-screen md:sticky md:top-0 bg-transparent flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 border-b border-brand-border md:border-none relative overflow-hidden"
        >
          {/* Big outlined parallax index number in background */}
          <div className="bg-index-number absolute right-12 md:right-32 top-10 md:top-24 text-[120px] md:text-[220px] font-extrabold text-transparent select-none pointer-events-none font-serif leading-none tracking-tighter opacity-0" style={{ WebkitTextStroke: '2px rgba(93,70,216,0.12)' }}>
            {numberStr}
          </div>

          <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm relative z-10">
            {/* Top Large Contained Image wrapper */}
            <div 
              className="project-img-wrapper relative w-full h-[32vh] sm:h-[45vh] md:h-[40vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center p-2 sm:p-4 md:p-6 group cursor-pointer shrink-0"
              style={{ backgroundColor: `${project.accentColor}06` }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" 
              />
              <div 
                className="absolute inset-0 border-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ borderColor: project.accentColor }}
              />
            </div>

            {/* Bottom Editorial details */}
            <div className="project-content grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 px-2 shrink-0">
              <div className="md:col-span-4 text-left">
                <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight leading-tight">
                  {renderSplitTitle(project.title)}
                </h2>
              </div>
              
              <div className="md:col-span-5 flex flex-col justify-between text-left">
                <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mt-4" data-reveal>
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-[10px] md:text-xs font-semibold bg-white border border-brand-border rounded-full text-brand-text tracking-wider uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex md:justify-end items-end mt-4 md:mt-0" data-reveal>
                <a 
                  href={project.link}
                  className="magnetic-button group flex items-center gap-2 px-6 py-4 bg-brand-text text-white hover:bg-brand-purple rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 pointer-events-none" />
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Layout 2: Editorial split layout, Text left (45%), Contained Image right (55%)
    if (layoutType === 2) {
      return (
        <section 
          key={project.id} 
          className="project-section w-full h-auto md:h-screen md:sticky md:top-0 bg-transparent flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 border-b border-brand-border md:border-none relative overflow-hidden"
        >
          {/* Big outlined parallax index number in background */}
          <div className="bg-index-number absolute left-12 md:left-24 top-10 md:top-24 text-[120px] md:text-[220px] font-extrabold text-transparent select-none pointer-events-none font-serif leading-none tracking-tighter opacity-0" style={{ WebkitTextStroke: '2px rgba(93,70,216,0.12)' }}>
            {numberStr}
          </div>

          <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm relative z-10">
            {/* Left Details column */}
            <div className="project-content w-full md:w-[45%] flex flex-col items-start text-left">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5.5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight">
                {renderSplitTitle(project.title)}
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6 max-w-[480px]">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-8" data-reveal>
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 text-[10px] md:text-xs font-semibold bg-white border border-brand-border rounded-full text-brand-text tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div data-reveal>
                <a 
                  href={project.link}
                  className="magnetic-button group flex items-center gap-2 px-6 py-4 bg-transparent border border-brand-text text-brand-text hover:bg-brand-text hover:text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 pointer-events-none" />
                </a>
              </div>
            </div>

            {/* Right Contained Image column */}
            <div 
              className="project-img-wrapper w-full md:w-[55%] h-[35vh] sm:h-[50vh] md:h-[48vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center p-2 sm:p-4 md:p-6 group cursor-pointer relative"
              style={{ backgroundColor: `${project.accentColor}06` }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" 
              />
              <div 
                className="absolute inset-0 border-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ borderColor: project.accentColor }}
              />
            </div>
          </div>
        </section>
      );
    }

    // Layout 3: Editorial Centered Header, Large Contained Image below
    if (layoutType === 3) {
      return (
        <section 
          key={project.id} 
          className="project-section w-full h-auto md:h-screen md:sticky md:top-0 bg-transparent flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 border-b border-brand-border md:border-none relative overflow-hidden"
        >
          {/* Big outlined parallax index number in background */}
          <div className="bg-index-number absolute left-12 md:left-36 top-10 md:top-24 text-[120px] md:text-[220px] font-extrabold text-transparent select-none pointer-events-none font-serif leading-none tracking-tighter opacity-0" style={{ WebkitTextStroke: '2px rgba(93,70,216,0.12)' }}>
            {numberStr}
          </div>

          <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm relative z-10">
            {/* Top Details Center-Aligned */}
            <div className="project-content text-center max-w-[700px] mx-auto mb-8 shrink-0">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-[#5D46D8] block mb-1.5">
                {project.category} — {project.year}
              </span>
              <h2 className="text-3xl md:text-5.5xl font-serif font-bold text-brand-text tracking-tight mb-4">
                {renderSplitTitle(project.title)}
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-6" data-reveal>
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 text-[10px] md:text-xs font-semibold bg-white border border-brand-border rounded-full text-brand-text tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div data-reveal>
                <a 
                  href={project.link}
                  className="magnetic-button group inline-flex items-center gap-2 px-6 py-4 bg-brand-text text-white hover:bg-brand-purple rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 pointer-events-none" />
                </a>
              </div>
            </div>

            {/* Bottom Large Contained Image wrapper */}
            <div 
              className="project-img-wrapper relative w-full h-[32vh] sm:h-[45vh] md:h-[40vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center p-2 sm:p-4 md:p-6 group cursor-pointer shrink-0"
              style={{ backgroundColor: `${project.accentColor}06` }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" 
              />
              <div 
                className="absolute inset-0 border-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ borderColor: project.accentColor }}
              />
            </div>
          </div>
        </section>
      );
    }

    // Layout 4: Editorial split layout, Contained Image left (55%), Text right (45%)
    return (
      <section 
        key={project.id} 
        className="project-section w-full h-auto md:h-screen md:sticky md:top-0 bg-transparent flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 border-b border-brand-border md:border-none relative overflow-hidden"
      >
        {/* Big outlined parallax index number in background */}
        <div className="bg-index-number absolute right-12 md:right-24 top-10 md:top-24 text-[120px] md:text-[220px] font-extrabold text-transparent select-none pointer-events-none font-serif leading-none tracking-tighter opacity-0" style={{ WebkitTextStroke: '2px rgba(93,70,216,0.12)' }}>
          {numberStr}
        </div>

        <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm relative z-10">
          {/* Right Details column */}
          <div className="project-content w-full md:w-[45%] flex flex-col items-start text-left">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-5.5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight">
              {renderSplitTitle(project.title)}
            </h2>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6 max-w-[480px]">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-8" data-reveal>
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-[10px] md:text-xs font-semibold bg-white border border-brand-border rounded-full text-brand-text tracking-wider uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div data-reveal>
              <a 
                href={project.link}
                className="magnetic-button group flex items-center gap-2 px-6 py-4 bg-transparent border border-brand-text text-brand-text hover:bg-brand-text hover:text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 pointer-events-none" />
              </a>
            </div>
          </div>

          {/* Left Contained Image column */}
          <div 
            className="project-img-wrapper w-full md:w-[55%] h-[35vh] sm:h-[50vh] md:h-[48vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center p-2 sm:p-4 md:p-6 group cursor-pointer relative"
            style={{ backgroundColor: `${project.accentColor}06` }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-img max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" 
            />
            <div 
              className="absolute inset-0 border-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
              style={{ borderColor: project.accentColor }}
            />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#FAF9FC] overflow-x-hidden pt-28 md:pt-36 pb-12 select-none"
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
        <div 
          ref={heroRef}
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-start text-left"
        >
          <span className="hero-subtitle text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-5 block">
            <span className="hero-subtitle-char inline-block">Portfolio Showcase</span>
          </span>
          
          <h1 className="hero-title text-6xl md:text-[9vw] lg:text-[10vw] font-serif font-black text-brand-text tracking-tighter leading-[0.85] max-w-[1200px] mb-10 overflow-hidden">
            <span className="block mb-2">Selected</span>
            <span className="block text-brand-purple">Work</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-3xl font-sans font-light text-neutral-500 leading-relaxed max-w-[850px] mb-12">
            <span className="hero-subtitle-char inline-block">Crafting digital products and enterprise platforms with custom design systems and zero compromise.</span>
          </p>

          <div className="hero-cta" data-reveal>
            <a 
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-5 bg-brand-text text-white hover:bg-brand-purple rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
            >
              <span>Partner With Us</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Projects list in max-width container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="w-full relative">
          {projectsData.map((project, idx) => renderProject(project, idx))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
