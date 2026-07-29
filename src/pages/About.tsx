import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotField from '../components/ui/DotField';
import VariableProximity from '../components/ui/VariableProximity';
import ScrollRevealContentA from '../components/ui/scroll-reveal-content-a';
import type { ItemContent } from '../components/ui/scroll-reveal-content-a';

// Import local JPG visual assets
import aboutVision from '../assets/about_vision.jpg';
import aboutPhilosophy from '../assets/about_philosophy.jpg';
import aboutPeople from '../assets/about_people.jpg';
import aboutInfluence from '../assets/about_influence.jpg';

// Lazy-load the interactive Three.js Lanyard component for optimized performance
const Lanyard = React.lazy(() => import('../components/ui/Lanyard').then(m => ({ default: m.Lanyard })));

gsap.registerPlugin(ScrollTrigger);

const aboutPillars: ItemContent[] = [
  {
    title: "Aligned Velocity",
    description: "We don't just write code or assemble layouts. We align your product's architecture directly with your business goals, ensuring every screen, service, and database interaction is built to drive performance and real revenue momentum.",
    image: {
      url: aboutVision,
      width: 657,
      height: 715,
      alt: "Aligned Velocity"
    }
  },
  {
    title: "Zero Compromise",
    description: "From low-latency database schemas to pixel-perfect micro-animations, our philosophy is anchored in outstanding craft. We refuse compromises, ensuring your platform launches secure, responsive, and robust enough to scale exponentially.",
    image: {
      url: aboutPhilosophy,
      width: 657,
      height: 715,
      alt: "Zero Compromise"
    }
  },
  {
    title: "Senior-First Delivery",
    description: "We do not pass your project down to junior account executives or offshore teams. You partner directly with veteran product designers and senior software architects who have designed and deployed enterprise systems.",
    image: {
      url: aboutPeople,
      width: 657,
      height: 715,
      alt: "Senior-First Delivery"
    }
  },
  {
    title: "Measurable Momentum",
    description: "Our code translates to business scale. Whether optimizing direct checkout performance for global networks or deploying telemetry systems, we map design and architectural milestones directly to conversions and growth.",
    image: {
      url: aboutInfluence,
      width: 657,
      height: 715,
      alt: "Measurable Momentum"
    }
  }
];

export const About: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Lenis to top on mount
    window.scrollTo(0, 0);

    const container = pageContainerRef.current;
    if (!container) return;

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

  }, []);

  return (
    <div 
      ref={pageContainerRef}
      className="relative w-full bg-[#FAF9FC] pt-20 md:pt-24 pb-20 select-none"
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
        className="relative w-full overflow-hidden border-b border-brand-border/60 bg-white/10 pt-12 md:pt-16 pb-16 md:pb-24 mb-20 md:mb-32"
      >
        {/* Original Left-aligned text container (unmodified, same styling & padding) */}
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

        {/* Branded Three.js Lanyard (Floats absolutely on the right on larger desktop viewports, avoiding text collision) */}
        <div className="hidden lg:block absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 w-[35%] max-w-[420px] h-[550px] pointer-events-auto z-20">
          <Suspense fallback={null}>
            <Lanyard position={[0, 0, 20]} />
          </Suspense>
        </div>
      </div>

      {/* Dynamic Scroll Reveal Pillars Component */}
      <div className="relative z-10 w-full mb-20 md:mb-32">
        <ScrollRevealContentA 
          items={aboutPillars} 
          className="bg-transparent"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
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
