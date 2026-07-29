import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import DotField from '../components/ui/DotField';
import VariableProximity from '../components/ui/VariableProximity';

// Import local JPG visual assets
import aboutVision from '../assets/about_vision.jpg';
import aboutPhilosophy from '../assets/about_philosophy.jpg';
import aboutPeople from '../assets/about_people.jpg';
import aboutInfluence from '../assets/about_influence.jpg';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Lenis to top on mount
    window.scrollTo(0, 0);

    const container = pageContainerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia(container);

    // Desktop only scroll-driven parallax and morph reveals
    mm.add("(min-width: 768px)", () => {
      // 1. Alternating pillar reveals
      const pillars = gsap.utils.toArray('.about-pillar');
      pillars.forEach((pillar: any) => {
        const imageWrapper = pillar.querySelector('.pillar-img-wrapper');
        const image = pillar.querySelector('.pillar-img');
        const textWrapper = pillar.querySelector('.pillar-text-wrapper');

        // Image morph/clipPath scroll trigger
        if (imageWrapper) {
          gsap.fromTo(
            imageWrapper,
            { clipPath: 'inset(8% 8% 8% 8% round 40px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              ease: 'none',
              scrollTrigger: {
                trigger: pillar,
                start: 'top bottom',
                end: 'top 30%',
                scrub: true,
              }
            }
          );
        }

        // Inner image subtle parallax slide
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -10, scale: 1.08 },
            {
              yPercent: 10,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: pillar,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Staggered text content entry
        if (textWrapper) {
          const elements = textWrapper.querySelectorAll('[data-reveal]');
          gsap.fromTo(
            elements,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillar,
                start: 'top 70%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });
    });

    // Mobile layout clean fade-in triggers
    mm.add("(max-width: 767px)", () => {
      const pillars = gsap.utils.toArray('.about-pillar');
      pillars.forEach((pillar: any) => {
        const textWrapper = pillar.querySelector('.pillar-text-wrapper');
        if (textWrapper) {
          const elements = textWrapper.querySelectorAll('[data-reveal]');
          gsap.fromTo(
            elements,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: pillar,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });
    });

    // Magnetic button effects (Universal)
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

  return (
    <div 
      ref={pageContainerRef}
      className="relative w-full bg-[#FAF9FC] overflow-x-hidden pt-28 md:pt-36 pb-20 select-none"
    >
      {/* Global Fixed Background Particles */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90">
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

      {/* Editorial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(93,70,216,0.02),transparent_50%)] pointer-events-none" />

      {/* Full-bleed Hero section */}
      <div 
        ref={heroContainerRef} 
        className="relative w-full overflow-hidden border-b border-brand-border/60 bg-white/10 py-20 md:py-32 mb-20 md:mb-32"
      >
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-start text-left">
          <span className="hero-subtitle text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-5 block">
            ABOUT US
          </span>
          
          <h1 className="hero-title text-4xl md:text-[5vw] lg:text-[5.5vw] font-serif font-black text-brand-text tracking-tight leading-[0.95] max-w-[1200px] mb-8 relative">
            <VariableProximity
              label="We Don't Just Build Digital Products. We Build Business Momentum."
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={heroContainerRef}
              radius={220}
              falloff="linear"
            />
          </h1>

          <p className="hero-description text-lg md:text-2xl font-sans font-light text-neutral-600 leading-relaxed max-w-[900px] mb-12">
            Every project is a combination of thoughtful strategy, premium design, scalable technology, and measurable outcomes—crafted to help businesses grow with confidence.
          </p>

          <div className="hero-cta">
            <a 
              href="/contact"
              className="magnetic-button group inline-flex items-center gap-2.5 px-8 py-5 bg-brand-text text-white hover:bg-brand-purple rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
            >
              <span>Explore Our Services</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Pillars Section Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 space-y-24 md:space-y-40">
        
        {/* Pillar 01: Vision (Image Left, Text Right) */}
        <div className="about-pillar w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm w-full">
            {/* Left Image column */}
            <div className="pillar-img-wrapper w-full md:w-[50%] h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center relative shrink-0">
              <img 
                src={aboutVision} 
                alt="Our Vision" 
                className="pillar-img w-full h-full object-cover" 
              />
            </div>

            {/* Right Details column */}
            <div className="pillar-text-wrapper w-full md:w-[50%] flex flex-col items-start text-left">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5" data-reveal>
                01 — VISION
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight" data-reveal>
                Aligned Velocity
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6" data-reveal>
                We don't just write code or assemble layouts. We align your product's architecture directly with your business goals, ensuring every screen, service, and database interaction is built to drive performance and real revenue momentum.
              </p>
              <div data-reveal>
                <a 
                  href="/projects" 
                  className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-purple hover:text-brand-deep transition-colors duration-300"
                >
                  <span>See selected work</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 02: Philosophy (Image Right, Text Left) */}
        <div className="about-pillar w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm w-full">
            {/* Right Image column */}
            <div className="pillar-img-wrapper w-full md:w-[50%] h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center relative shrink-0">
              <img 
                src={aboutPhilosophy} 
                alt="Our Philosophy" 
                className="pillar-img w-full h-full object-cover" 
              />
            </div>

            {/* Left Details column */}
            <div className="pillar-text-wrapper w-full md:w-[50%] flex flex-col items-start text-left">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5" data-reveal>
                02 — PHILOSOPHY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight" data-reveal>
                Zero Compromise
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6" data-reveal>
                From low-latency database schemas to pixel-perfect micro-animations, our philosophy is anchored in outstanding craft. We refuse compromises, ensuring your platform launches secure, responsive, and robust enough to scale exponentially.
              </p>
              <div data-reveal>
                <a 
                  href="/services" 
                  className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-purple hover:text-brand-deep transition-colors duration-300"
                >
                  <span>Explore core services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 03: People (Image Left, Text Right) */}
        <div className="about-pillar w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm w-full">
            {/* Left Image column */}
            <div className="pillar-img-wrapper w-full md:w-[50%] h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center relative shrink-0">
              <img 
                src={aboutPeople} 
                alt="Our People" 
                className="pillar-img w-full h-full object-cover" 
              />
            </div>

            {/* Right Details column */}
            <div className="pillar-text-wrapper w-full md:w-[50%] flex flex-col items-start text-left">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5" data-reveal>
                03 — TEAM
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight" data-reveal>
                Senior-First Delivery
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6" data-reveal>
                We do not pass your project down to junior account executives or offshore teams. You partner directly with veteran product designers and senior software architects who have designed and deployed enterprise systems.
              </p>
              <div data-reveal>
                <a 
                  href="/contact" 
                  className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-purple hover:text-brand-deep transition-colors duration-300"
                >
                  <span>Meet the architects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 04: Influence (Image Right, Text Left) */}
        <div className="about-pillar w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 justify-center bg-white rounded-[32px] p-6 md:p-10 border border-brand-border/60 shadow-brand-sm w-full">
            {/* Right Image column */}
            <div className="pillar-img-wrapper w-full md:w-[50%] h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden border border-brand-border/60 flex items-center justify-center relative shrink-0">
              <img 
                src={aboutInfluence} 
                alt="Our Influence" 
                className="pillar-img w-full h-full object-cover" 
              />
            </div>

            {/* Left Details column */}
            <div className="pillar-text-wrapper w-full md:w-[50%] flex flex-col items-start text-left">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-neutral-400 block mb-1.5" data-reveal>
                04 — IMPACT
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight" data-reveal>
                Measurable Momentum
              </h2>
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-6" data-reveal>
                Our code translates to business scale. Whether optimizing direct checkout performance for global networks or deploying telemetry systems, we map design and architectural milestones directly to conversions and growth.
              </p>
              <div data-reveal>
                <a 
                  href="/contact" 
                  className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-purple hover:text-brand-deep transition-colors duration-300"
                >
                  <span>Start your project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA / Momentum Footer Section */}
        <div className="w-full text-center py-20 bg-white rounded-[32px] border border-brand-border/60 shadow-brand-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,70,216,0.03),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 max-w-[800px] mx-auto px-6 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-text tracking-tight mb-6">
              Let's Build momentum.
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed font-light mb-10 max-w-[600px]">
              Ready to transform your business velocity and digital craft? Let's design and engineer your next platform together.
            </p>
            <div className="hero-cta">
              <a 
                href="/contact"
                className="magnetic-button group inline-flex items-center gap-2.5 px-8 py-5 bg-brand-text text-white hover:bg-brand-purple rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
              >
                <span>Let's Build Together</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
