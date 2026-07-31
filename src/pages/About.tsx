import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotField from '../components/ui/DotField';
import VariableProximity from '../components/ui/VariableProximity';
import TeamShowcase from '../components/ui/team-showcase';
import ScrollReveal from '../components/ui/ScrollReveal';
import TestimonialsDemo from '../components/ui/demo';

// Prefetch Lanyard chunk immediately when About module loads (not when component renders).
// The import() starts the network fetch the instant the user navigates to /about,
// and the same promise is reused by React.lazy so there's no duplicate fetch.
const lanyardImport = import('../components/ui/Lanyard');
const Lanyard = React.lazy(() => lanyardImport.then(m => ({ default: m.Lanyard })));

// Import local JPG visual assets
import aboutVision from '../assets/about_vision.webp';
import aboutPhilosophy from '../assets/about_philosophy.webp';
import aboutPeople from '../assets/about_people.webp';
import aboutInfluence from '../assets/about_influence.webp';

gsap.registerPlugin(ScrollTrigger);

interface PillarItem {
  title: string;
  description: string;
  image: string;
}

const aboutPillars: PillarItem[] = [
  {
    title: "Aligned Velocity",
    description: "We don't just write code or assemble layouts. We align your product's architecture directly with your business goals, ensuring every screen, service, and database interaction is built to drive performance and real revenue momentum.",
    image: aboutVision
  },
  {
    title: "Zero Compromise",
    description: "From low-latency database schemas to pixel-perfect micro-animations, our philosophy is anchored in outstanding craft. We refuse compromises, ensuring your platform launches secure, responsive, and robust enough to scale exponentially.",
    image: aboutPhilosophy
  },
  {
    title: "Senior-First Delivery",
    description: "We do not pass your project down to junior account executives or offshore teams. You partner directly with veteran product designers and senior software architects who have designed and deployed enterprise systems.",
    image: aboutPeople
  },
  {
    title: "Measurable Momentum",
    description: "Our code translates to business scale. Whether optimizing direct checkout performance for global networks or deploying telemetry systems, we map design and architectural milestones directly to conversions and growth.",
    image: aboutInfluence
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

    // ============================================================
    // Smooth staggered hero entrance timeline
    // ============================================================
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.35'
      )
      .fromTo('.hero-description',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo('.hero-lanyard-container',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=0.7'
      );

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

      // Scroll reveal animations for principles card panels
      const cards = container.querySelectorAll('.about-pillar-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 40,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=10%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, container);

    return () => {
      ctx.revert();
    };
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
          <span className="hero-subtitle text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-5 block" style={{ opacity: 0 }}>
            ABOUT US
          </span>
          
          <h1 className="hero-title text-4xl md:text-[5vw] lg:text-[5.5vw] font-serif font-black text-brand-text tracking-tight leading-[0.95] max-w-[1200px] mb-8 relative" style={{ opacity: 0 }}>
            <VariableProximity
              label="We Don't Just Build Digital Products. We Build Business Momentum."
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={heroContainerRef}
              radius={220}
              falloff="linear"
            />
          </h1>

          <p className="hero-description text-lg md:text-2xl font-sans font-light text-neutral-600 leading-relaxed max-w-[900px] mb-12" style={{ opacity: 0 }}>
            Every project is a combination of thoughtful strategy, premium design, scalable technology, and measurable outcomes—crafted to help businesses grow with confidence.
          </p>

          <div className="hero-cta" style={{ opacity: 0 }}>
            <a 
              href="/contact"
              className="magnetic-button group inline-flex items-center gap-2.5 px-8 py-5 bg-brand-text text-white hover:bg-brand-purple rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
            >
              <span>Explore Our Services</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>

        {/* Branded Three.js Lanyard — prefetched on module load for near-instant rendering */}
        <div className="hero-lanyard-container hidden lg:block absolute right-0 top-0 h-full w-[60vw] max-w-[900px] pointer-events-none z-20" style={{ opacity: 0 }}>
          <Suspense fallback={null}>
            <Lanyard position={[0, 0, 20]} />
          </Suspense>
        </div>
      </div>

      {/* Pillars Section Content (Goated Compact Alternating Cards) */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mb-20 md:mb-32">
        <div className="text-center md:text-left mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-3 block">
            OUR PRINCIPLES
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-4">
            Built on Principles, Delivered with Precision
          </h2>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            containerClassName="max-w-[700px] mt-4"
            textClassName="text-base md:text-lg text-neutral-600 font-normal leading-relaxed font-sans"
          >
            Every decision we make is guided by a commitment to premium design, scalable engineering, senior-first partnership, and aligned velocity.
          </ScrollReveal>
        </div>

        <div className="space-y-6 md:space-y-8">
          {aboutPillars.map((pillar, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx}
                className={`about-pillar-card group w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10 bg-white/40 backdrop-blur-md rounded-[24px] p-5 md:p-6 border border-brand-border/60 hover:border-brand-purple/20 transition-all duration-500 hover:shadow-brand-sm`}
              >
                {/* Image column */}
                <div className="w-full md:w-[45%] h-[200px] md:h-[250px] rounded-xl overflow-hidden border border-brand-border/60 flex items-center justify-center relative shrink-0 bg-neutral-950">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Text details column */}
                <div className="w-full md:w-[55%] flex flex-col items-start text-left px-2 md:px-4">
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-extrabold text-brand-purple block mb-3">
                  {`0${idx + 1} — ${pillar.title.toUpperCase()}`}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-text tracking-tight mb-4 group-hover:text-brand-purple transition-colors duration-300">
                  {pillar.title}
                </h3>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={6}
                  containerClassName="mt-1"
                  textClassName="text-sm md:text-base text-neutral-600 font-normal leading-relaxed font-sans"
                >
                  {pillar.description}
                </ScrollReveal>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Team Showcase Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mb-20 md:mb-32">
        <div className="text-center md:text-left mb-10 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-3 block">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-4">
            The People Behind Unexpected Solutions
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-[700px]">
            A passionate team of strategists, designers, developers, and growth specialists dedicated to building digital experiences that help businesses grow with confidence.
          </p>
        </div>

        <TeamShowcase />
      </div>

      {/* Testimonials Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mb-20 md:mb-32 flex flex-col items-center">
        <div className="w-full text-center md:text-left mb-10 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-3 block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-4">
            Trusted by Builders & Visionaries
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed max-w-[700px]">
            Hear from founders, directors, and developers who have experienced our commitment to high-velocity engineering and premium craft.
          </p>
        </div>

        <TestimonialsDemo />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
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

