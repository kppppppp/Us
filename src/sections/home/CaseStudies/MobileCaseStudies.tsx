import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../../constants/caseStudies';
import Stack from '../../../components/ui/Stack';
import { createCaseStudiesTimeline } from '../../../animations/caseStudiesTimeline';

export const MobileCaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = CASE_STUDIES[activeIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = createCaseStudiesTimeline(containerRef.current);
    return () => {
      tl.kill();
    };
  }, []);

  // Memoize cards for Stack
  const stackCards = useMemo(() =>
    CASE_STUDIES.map((project, i) => (
      <div key={i} className="relative w-full h-full">
        <img 
          src={project.image} 
          alt={project.name} 
          className="card-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B39DFF]/90">
            {project.industry}
          </span>
          <h3 className="text-base font-serif font-bold text-white tracking-tight leading-tight">
            {project.name}
          </h3>
        </div>
      </div>
    )), []);

  return (
    <div 
      ref={containerRef}
      className="block lg:hidden w-full px-6 py-12"
    >
      {/* Section header */}
      <div data-reveal="label">
        <span className="text-[10px] font-bold text-brand-purple tracking-[0.3em] uppercase block mb-3">
          Selected Work
        </span>
      </div>

      <div data-reveal="heading">
        <h2 className="text-3xl font-serif text-neutral-900 font-bold leading-tight tracking-tight">
          Projects that<br />
          speak volumes.
        </h2>
      </div>

      {/* Stack card container */}
      <div 
        data-reveal="gallery"
        className="mt-8 relative w-full aspect-[3/4] max-w-[360px] mx-auto"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-br from-brand-purple/6 via-transparent to-[#FF9FFC]/4 blur-xl pointer-events-none" />
        
        <div className="relative w-full h-full select-none">
          <Stack
            randomRotation={true}
            sensitivity={100}
            sendToBackOnClick={true}
            mobileClickOnly={true}
            cards={stackCards}
            autoplay={true}
            autoplayDelay={5000}
            pauseOnHover={false}
            onCardChange={setActiveIndex}
          />
        </div>

        {/* Dot indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 rounded-full ${
                i === activeIndex 
                  ? 'w-6 h-1.5 bg-brand-purple' 
                  : 'w-1.5 h-1.5 bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active project details — animated */}
      <div data-reveal="panel" className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Counter + divider */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl font-serif font-bold text-brand-purple/15 leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-brand-purple/20 to-transparent" />
            </div>

            <span className="text-[9px] font-bold text-brand-purple tracking-[0.25em] uppercase block mb-2">
              {activeProject.industry}
            </span>

            <h3 className="text-2xl font-serif text-neutral-900 font-bold tracking-tight leading-tight mb-3">
              {activeProject.name}
            </h3>

            <p className="text-xs leading-relaxed text-neutral-500 mb-5">
              {activeProject.description}
            </p>

            {/* Services pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {activeProject.services.map((service) => (
                <span 
                  key={service} 
                  className="text-[10px] font-medium text-neutral-600 bg-neutral-50 border border-neutral-100 rounded-full px-3 py-1"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Visit CTA */}
            <a
              href={activeProject.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 self-start"
            >
              <span className="text-xs font-bold text-neutral-900 group-hover:text-brand-purple transition-colors">
                View Project
              </span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-purple text-white group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div data-reveal="stats" className="mt-12 pt-8 border-t border-neutral-200/60 grid grid-cols-3 gap-4">
        {[
          { value: '50+', label: 'Projects' },
          { value: '30+', label: 'Industries' },
          { value: '98%', label: 'Retention' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-2xl font-bold font-serif text-neutral-900 tracking-tight">
              {stat.value}
            </span>
            <span className="text-[9px] font-bold text-neutral-400 tracking-[0.15em] uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MobileCaseStudies;
