import React, { useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES } from '../../../constants/caseStudies';
import Stack from '../../../components/ui/Stack';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { createCaseStudiesTimeline } from '../../../animations/caseStudiesTimeline';
import gsap from 'gsap';

interface DesktopCaseStudiesProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const DesktopCaseStudies: React.FC<DesktopCaseStudiesProps> = ({
  activeIndex,
  setActiveIndex
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeProject = CASE_STUDIES[activeIndex];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      createCaseStudiesTimeline(el);
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  // Memoize cards so they don't trigger re-renders on every parent render
  const stackCards = useMemo(() =>
    CASE_STUDIES.map((project, i) => (
      <div key={i} className="relative w-full h-full">
        <img 
          src={project.image} 
          alt={project.name} 
          loading="lazy"
          className="card-image"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        {/* Project info on card */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B39DFF]/90">
            {project.industry}
          </span>
          <h3 className="text-xl font-serif font-bold text-white tracking-tight leading-tight">
            {project.name}
          </h3>
        </div>
      </div>
    )), []);

  return (
    <div 
      ref={containerRef}
      className="hidden lg:block w-full max-w-[1440px] mx-auto px-12"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-16" data-reveal="label">
        <div>
          <span className="text-[11px] font-bold text-brand-purple tracking-[0.35em] uppercase block mb-4">
            Selected Work
          </span>
          <h2 className="text-5xl xl:text-6xl font-serif text-neutral-900 font-bold leading-[1.1] tracking-tight" data-reveal="heading">
            Projects that<br />
            speak volumes.
          </h2>
        </div>

        <div data-reveal="cta">
          <a 
            href="/projects"
            className="group inline-flex items-center gap-3 text-xs font-bold text-neutral-800 tracking-wider uppercase border border-neutral-200 rounded-full py-3.5 px-7 hover:border-brand-purple hover:text-brand-purple transition-all duration-300"
          >
            <span>All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Main content: Stack + Active project details */}
      <div className="grid grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Stack */}
        <div 
          data-reveal="gallery"
          className="col-span-6 relative"
        >
          <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto">
            {/* Ambient glow behind cards */}
            <div className="absolute inset-0 -m-8 rounded-[2rem] bg-gradient-to-br from-brand-purple/8 via-transparent to-[#FF9FFC]/6 blur-2xl pointer-events-none" />
            
            <div className="relative w-full h-full select-none">
              <Stack
                randomRotation={true}
                sensitivity={150}
                sendToBackOnClick={true}
                cards={stackCards}
                autoplay={true}
                autoplayDelay={4500}
                pauseOnHover={true}
                onCardChange={setActiveIndex}
              />
            </div>

            {/* Card counter pill */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === activeIndex 
                      ? 'w-8 h-2 bg-brand-purple' 
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`View project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active project details panel */}
        <div className="col-span-6 flex flex-col justify-center min-h-[580px] pl-18">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Project counter */}
              <div className="flex items-center gap-4 mb-8" data-reveal="panel">
                <span className="text-6xl xl:text-7xl font-serif font-bold text-brand-purple/15 leading-none">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-brand-purple/20 to-transparent" />
              </div>

              {/* Industry tag */}
              <span className="text-[10px] font-bold text-brand-purple tracking-[0.3em] uppercase block mb-3">
                {activeProject.industry}
              </span>

              {/* Project name */}
              <h3 className="text-3xl xl:text-4xl font-serif text-neutral-900 font-bold tracking-tight leading-tight mb-5">
                {activeProject.name}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-500 max-w-lg mb-7">
                {activeProject.description}
              </p>

              {/* Services */}
              <div className="mb-5">
                <span className="text-[9px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-3">
                  Services Delivered
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.services.map((service) => (
                    <span 
                      key={service} 
                      className="text-[11px] font-medium text-neutral-600 bg-neutral-50 border border-neutral-100 rounded-full px-3.5 py-1.5"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-8">
                <span className="text-[9px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-3">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[10px] font-semibold text-brand-purple/70 bg-brand-purple/5 border border-brand-purple/10 rounded-full px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit project CTA */}
              <a
                href={activeProject.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 self-start"
              >
                <span className="text-sm font-bold text-neutral-900 group-hover:text-brand-purple transition-colors duration-300">
                  View Live Project
                </span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-purple/25 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Statistics strip */}
      <div data-reveal="stats" className="mt-24 pt-12 border-t border-neutral-200/60">
        <div className="grid grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Industries Served' },
            { value: '98%', label: 'Client Retention' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="text-3xl xl:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DesktopCaseStudies;
